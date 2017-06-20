---
layout: post
title:  "符号演算"
date:   2017-06-19 16-29-44 +0800
categories: posts
---

前一阵在《SICP》课程的视频里看到了一个符号演算的示例。虽然它只是一个示例的程序，还不算完备，不过还是颇有趣味的。

首先是算式的表示方式。为了简介起见，我还是使用了lisp风格的前缀表示发，比如`1 + 1`就是`(+ 1 1)`。这样虽然造成了阅读上的一些不方便之处，但是遵循lisp风格的表示可以使得在编程中省去将字符串编码的过程，只用`(quote ≪expression≫)`就行了。

整个程序的思路大概是：准备一个包含有化简规则的表，将需要化简的表达式与表中的符号逐一匹配，如果匹配成功，就将匹配的符号所表达的内容放在另一个表达式里返回。这样说可能不太清楚，举个例子，如果有一个这样的表：

1. "Hi, ≪name≫" ↦ "Hello, ≪name≫"
2. "Goodbye, ≪name≫" ↦ "See you, ≪name≫"

…

如果我希望查询这张表更改问候的用词，就可以用原先的句子和表中的规则配对。例如，“Goodbye, Johnson”就可以与第二条规则前半部分匹配，并且得知≪name≫的值实际上是“Johnson”。然后，把它代入规则的后半部分，就造出了一个这样的句子：“See you, Johnson”。

对于符号演算的匹配，或者是这里使用的S-expression的匹配，也是类似的。不难写出一些规则：

```
(+ 0 (? e)) ↦ (: e)   ;; 任何表达式加上0的结果是该表达式本身
(* 1 (? e)) ↦ (: e)   ;; 任何表达式乘以1的结果是该表达式本身
(* 0 (? e)) ↦ 0       ;; 任何表达式乘以0的结果是0

(+ (? e) (? e)) ↦ (* 2 (: e)) ;; 任意表达式加上它本身是该表达式乘以2
(* (? a) (+ (? b) (? c))) ↦ (+ (* (: a) (: b)) (* (: a) (: c))) ;; 乘法分配律
```
等等。

这里，`(? e)`表示的就是任意的表达式`e`，而`(: e)`的意思就是把`e`所代表的对象插入在要返回的表达式中。

* * * * * *

然后就是具体的程序实现了。整体由3个过程组成：将需化简表达式与规则表中的符号匹配，将匹配的内容插入返回的表达式中，一个逐一尝试表达式中的规则的过程。这里我对视频中的程序只有少量的修改：

+   匹配:
```scheme
(define (match pat exp dict)
  (cond
    ((eq? dict 'failed) 'failed)
    ((atom? pat)
     (if (and (atom? exp)
              (eq? pat exp))
         dict
         'failed))
    ((and (null? pat)
          (null? exp))
     dict)
    ((null? pat) 'failed)
    ((null? exp) 'failed)
    ((arbitary-constant? pat)
     (if (constant? exp)
         (extend-dict pat exp dict)
         'failed))
    ((arbitary-variable? pat)
     (if (variable? exp)
         (extend-dict pat exp dict)
         'failed))
    ;; ... to handle more predicates ...
    ((arbitary-expression? pat)
     (extend-dict pat exp dict))
    ((atom? exp)
     'failed)
    (else
     (match (cdr pat)
            (cdr exp)
            (match (car pat)
                   (car exp)
                   dict)))))
```
    这里匹配的过程是递归进行的，比较原子时，只要表达式与符号由一个原子不匹配，那么就返回存有`'failed`的字典，比较S-expression时就再调用一次`match`过程，扩充字典，直到所有的元素都匹配了为止。

+   实例化:
```scheme
(define (instantiate skeleton dict)
  (define (sub-instantiate s)
    (cond
      ((atom? s) s)
      ((null? s) '())
      ((skeleton-evaluation? s)
       (skeleton-evaluate (cadr s) dict))
      (else (cons (sub-instantiate (car s))
                  (sub-instantiate (cdr s))))))
  (sub-instantiate skeleton))
```
    将匹配成功所得到的字典代入结果的过程，Sussman用了一个名词“实例化”(instantiate)，这里我也不太了解该词具体是什么意思。如果想要实例化的S-expression有满足`skeleton-evaluation?`的标记的化，那么就返回插值的结果。否则，就返回原来的原子或者递归地对该表达式的`car`部分以及`cdr`部分调用该过程。

+   在这些投入使用之前，我们先讨论一下它们实现的具体过程。`atom?`, `extend-dict`, `skeleton-evaluate`等等，都是尚未实现的过程。
    -   `atom?`。我有些不理解为什么语言的设计者不提供一个`atom?`过程。
    ```scheme
    (define (atom? x)
        (and (not (pair? x))
             (not (null? x))))
    ```
    -   `extend-dict`。为了方便起见，这里还是用list的结构储存字典，实际上可能哈希表之类会好一些。另外不要忘了比较同一个符号代表的新的值和旧的值是否一致，避免不必要的错误。
    ```scheme
    (define (extend-dict pat exp dict)
      (let ((name (cadr pat)))
        (let ((v (assq name dict)))
          (cond ((not v)
                 (cons (list name exp) dict))
                ((equal? (cadr v) exp) dict)
                (else 'failed)))))
    ```
    -   `skeleton-evaluate`。我们暂时可以写成这样：
    ```scheme
    (define (skeleton-evaluate s dict)
      (lookup s dict))
    ```
        确定了`extend-dict`的构建方法，lookup可能是这样：
    ```scheme
    (define (lookup s dict)
      (let ((t (assq s dict)))
        (if t
            (cadr t)
            s)))
    ```
    -   其它的一些过程取决于具体的符号选择，不过它们都很容易实现。本例中，沿用`?`表示任意表达式，`?c`表示任意常量，`?v`任意变量，`:`表示插值的标志。
+   除此之外，还需要一个能够一个个尝试表中的规则，并将成功匹配得的字典自动实例化的过程。由于我们的目的很明确，所以这不会太难：
```scheme
(define (simplifier the-rules)
  (define (simplify-exp exp)
    (try-rules (if (pair? exp)
                   (map simplify-exp exp)
                   exp)))
  (define (try-rules exp)
    (define (scan rules)
      (if (null? rules)
          exp
          (let ((dict (match (pattern-of (car rules))
                             exp
                             '())))
            (if (eq? dict 'failed)
                (scan (cdr rules))
                (instantiate
                    (skeleton-of (car rules))
                    dict))))))
    (scan the-rules))
  simplify-exp)
```
    不过这里的实现是将规则绑定到一个闭包（closure）里面，这样我们就可以制定并分别使用多重的规则。
    另外，对于每一条规则，由于我们使用了`(≪pattern≫ ≪skeleton≫)`的写法，所以`pattern-of`和`skeleton-of`分别就是`car`和`cadr`。

至此，上面提到的那些代数规则都能用了。按照《SICP》原来的示例，我们还可以定义一些求导的操作。
$$\def\ud{\mathrm d}$$
+   $\displaystyle{\frac{\ud c}{\ud v} = 0}$, where $c$ is constant
+   $\displaystyle{\frac{\ud v}{\ud v} = 1}$
+   $\displaystyle{\frac{\ud u}{\ud v} = 0}$, where $u$ is a varible not related to $v$
+   $\displaystyle{\frac{\ud(e_1+e_2)}{\ud v} = \frac{\ud e_1}{\ud v}+\frac{\ud e_2}{\ud v}}$
+   $\displaystyle{\frac{\ud(e_1 \cdot e_2)}{\ud v} = e_1\cdot\frac{\ud e_2}{\ud v}+e_2\cdot\frac{\ud e_1}{\ud v}}$

```scheme
((diff (?c c) (?v v)) 0)
((diff (?v v) (?v v)) 1)
((diff (?v u) (?v v)) 0)
((diff (+ (? e1) (? e2)) (?v v))
 (+ (diff (: e1) (: v)) (diff (: e2) (: v))))
((diff (* (? e1) (? e2)) (?v v))
 (+ (* (diff (: e1) (: v)) (: e2))
    (* (diff (: e2) (: v)) (: e1))
```

如果现在尝试的话大概是这样的结果：
```scheme
]=> (define dsimp (simplifier rules))
;Value: ...
]=> (dsimp '(diff (* x (* x x)) x))
;Value: (+ (* x x) (* 2 (* x x)))
```
显然`(+ (* x x) (* 2 (* x x)))`可以继续化简，不过我们的程序还没有这样的功能。为此，我按照视频中的方式扩展了`skeleton-evaluate`的过程，让它也能够将后面的符号求值处理之后再插入进去。

比如我希望两个常量的和表示成一个常量，而不是它原始的形式。如果`skeleton-evaluate`支持这样：`((+ (?c c1) (?c c2)) (: (+ c1 c2)))`，其中冒号后面的语句在scheme中执行，问题就解决了。我想到的一个方法是将字典中的值赋到求值环境中去，然后再调用`eval`函数，但不知道有没有更好的解决方案：

```scheme
(define (skeleton-evaluate s dict)
  (if (atom? s)
      (lookup s dict)
      (eval
       `(let ,(map (lambda (s)
                     (list (car s)
                           (list 'quote
                                 (cadr s))))
                   dict)
          ,s))))
```

然后添加相应的规则，就可以处理很多代数化简工作了。例如，原子和表达式之间交换顺序的规则，加法和乘法常量折叠的规则，等等。

* * * * * *

不过，现在这个程序的功能仍然不够完善。它可以处理加法和乘法，通过一些方式也可以让它能够处理减法和乘方运算。但是对于符号除法的化简，这样的逐一匹配方式可能就有些力不从心了。因为，两个算式的除法可能在因式分解之后才能消去相应的内容，而本程序已经有了乘法分配律的规则，如果添加因式分解的规则就会让程序进入死循环。所以，要进一步完善它还需要一个实现一个与原算式等效的集合，并有一个树状搜索的装置。

最后，这个项目可以在这里找到:<https://github.com/sclereid/collections/blob/master/scheme-learning/matcher.scm>。

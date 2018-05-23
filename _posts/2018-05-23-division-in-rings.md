---
layout: post
title:  "环中元素的整除"
date:   2018-05-23 10-03-18 +0800
categories: mathematics
invisible: true
---

在上一次讨论中，我们探讨了一下整除、因子分解在抽象代数结构中的定义，但是由于准备得不够充分还遗留下了一些信息。在此我将进行总结，尽力补全这些细节。

**1.** 代数结构


设 $+$ 是定义在集合$S$上的二元运算 $(+):S\times S\rightarrow S$。注意以下的一些公理：

- (+1) 加法单位元存在：
$$\exists 0 \in S \forall x \in S (x+0=x)$$  
- (+2) 对于任意的实数，存在一实数是它的相反数：
$$\forall x \in S \exists (-x)\in S (x+(-x)=0)$$
- (+3) 加法的结合律：
$$\forall x,y,z\in S(x+(y+z)=(x+y)+z)$$
- (+4) 加法的交换律：
$$\forall x,y\in S(x+y=y+x)$$

设乘法也确定了一个映射$(\cdot):S\times S\rightarrow S$。

- (⋅1) 乘法单位元存在：
$$\exists 1 \in S\backslash\{0\} \forall x \in S (x\cdot 1=x)$$
- (⋅2) 对于任意的非零实数，存在一实数是它的倒数：
$$\forall x \in S\backslash\{0\}\exists x^{-1}\in S (x\cdot x^{-1}=1)$$
- (⋅3) 乘法的结合律：
$$\forall x,y,z\in S(x\cdot(y\cdot z)=(x\cdot y)\cdot z)$$
- (⋅4) 乘法的交换律：
$$\forall x,y\in S(x\cdot y=y\cdot x)$$

加法和乘法还满足分配律：
- (+⋅)
$$\forall x,y,z \in S((x+y)\cdot z = x\cdot z+y\cdot z)$$

当运算满足以上的一些某一些要求时，就称 $S$ 形成了相应的代数结构。具体的关系如下表所示：

| 名称   | 满足的公理 |
|:------|:----------|
| 半群   | +3       |
| 幺半群 | +1, +3   |
| 群    | +1, +2, +3 |
| 交换群（阿贝尔群） | +1∼+4 |
| 环    | +1∼+4, ⋅3, +⋅ |
| 带1的环 | +1∼+4, ⋅1, ⋅3, +⋅ |
| 交换环 | +1∼+4, ⋅4, +⋅ |
| 斜域   | +1∼+4, ⋅1, ⋅2, ⋅3, +⋅ |
| 域    | +1∼+4, ⋅1∼⋅4, +⋅ |
|------|-------------------|

注：对于群而言，乘法运算事实上是不必要的。

可以从这些公理推导出很多结论，而只需要相应的公理被满足，便可以应用这些结论。记得老师上课的时候用酉空间的柯西不等式证明定积分中相关的结论吗？这里我们也将应用类似的思想，并证明整数和多项式中的两个重要的结论。

**2.** 一些重要的性质

+ 可逆：虽然在以上的定义中我们将环中一个元素$x$的逆记为$x^{-1}$，但事实上并非只有环中所有元素都有乘法逆时我们才能够谈论乘法逆。当$a\cdot b=1$时，我们称$a$是$b$的一个左逆，而$b$是$a$的一个右逆；特别地，当$a\cdot b=b\cdot a=1$时，称$a$、$b$可逆，并且互为逆。本文以下说的可逆性质主要是对于乘法可逆。

+ 零因子： 如果$a\cdot b=0$那么称$a$是一个左零因子，而$b$是一个右零因子。显然$0$是零因子，我们称之为平凡的零因子。在很多时候，非平凡的零因子是恼人的，例如在带有非平凡的零因子环中，以下关系式$ p\cdot s = q\cdot s$在$s\ne 0$时也不一定能推导出$p = q$。

我们称没有非平凡零因子且含有$1\ne 0$的交换环为整环。容易验证整数环和任意数域上的多项式环都是整环，此时我们有

$$
\begin{align}
p\cdot s &= q\cdot s \\
\Rightarrow (p-q)\cdot s& = 0 \\
\Rightarrow\;\;\;\;\;\;\;   p-q &= 0 \vee s = 0 
\end{align}
$$

若还知道$s\ne 0$，那么消去律成立，从而得出$p=q$。

**3.** 整除，Euclid算法和一些推论

+ 若对整环$(R, +, \cdot)$中的元素$a$,$b$有$c\in R$使得$c\cdot a = b$，那么称$a$整除$b$，$a$是$b$的因子，且记作$a\mid b$。

+ 最大公因子：$c$是$a$和$b$的最大公因子当且仅当$c$既是$a$的因子，又是$b$的因子，且任意$a$和$b$的公因子都整除$c$。此时记$c=\gcd(a,b)$。

+ 欧几里得环：为了规范带余除法的定义，我们引入下述定义。若有一个与环$(R,+,\cdot)$对应的函数$\delta:R\backslash\{0\}\rightarrow \mathbb{N}$满足以下条件：

$$\forall a, b\in R\backslash\{0\}(\delta(a) \le \delta(a\cdot b))$$

$\forall a, b\in R$，若$b\ne 0$，那么$\exists q, r\in R$使得$a=q\cdot b+r$且$\delta(r) < \delta(b)$或者$r=0$至少有一个成立。

此时，便称$R$是一个欧几里得环。注意到以上公式的形式与带余除法一致。如果我们只关心余数，也可以这样写：$r = a\mod b$。对于整数环$\mathbb{Z}$，另$\delta(a)=\| a\|$便得到了一个合适的$\delta$函数。当$R$是多项式环时，$\delta=\deg a$也是一个满足条件的取法。

+ 此外，素元和互素的定义也和自然数中相关的定义类似。多项式环中的素元被称作既约多项式。注意$r\in R$素元当且仅当$r$是不可逆的（在整数环$\mathbb{Z}$中，这对应着$r\ne 1$，在多项式环中这对应着常数），而且不能够表示成两个不可逆元(例如是$b$和$c$)的乘积。对于$b$，$c$中含有可逆元的情形，我们并不关心，因为此时若$b$可逆，那么从$a=b\cdot c$且$c = a\cdot a^{-1}$可以推导出$\delta(a) = \delta(c)$。这就像整数分解$3=1\cdot 3$一样，对素数的定义没有什么意义。此外，根据定义$0=0 \cdot 0$不是素元。

有了这些准备，我们便能够比较方便地讨论欧式环上的整除的性质了。

+ 素元分解的存在性：若$a\in R$不是素元，那么存在$b, c\in R$使得$a=b\cdot c$，而且$b$和$c$都不是$R$中的可逆元。于是根据以上讨论知$\delta(a)=\delta(b)$或者$\delta(a)=\delta(c)$都不可能成立，因此有$\delta(b)<\delta(a)$，且$\delta(c)<\delta(a)$。上式中$b$和$c$或者是素元，或者可以继续分解。这样的分解不会无穷地进行下去，因为$\delta$函数的值始终应大于$0$。所以任意的$a$总可以归结于一些素元的乘积，虽然这样分解的唯一性还没有被证明。

+ 欧几里得算法：这个算法是建立在一个事实的基础上的$\gcd(a, b) = \gcd(b, a\mod b)$。根据以上的定义，我们知道若$a\le b$，那么总会有$\delta(a\mod b) < \delta(b)$，于是重复利用以上规则，相应的$\delta$函数的值就构成了一个递减的序列，从而在某一项取模会得到$0$。使用由最大公因子定义得到的结论。

+ 接下来的过程就和上回讲述的内容一样了，首先我们将最大公因子依次带入辗转相处时依次产生的带余除法关系式，从而得出一个推论：若$p$,$q$的最大公因子是$d$，那么存在元素$m$,$n$使得$p\cdot m+q\cdot n=d$。然后，我们证明若素元$a$整除$p\cdot q$，那么$a\|p$或者$a\|q$。注意到上次在证明素元分解的唯一性的时候用到了整环的消去律。
---
layout: post
title:  "拓广复平面和Möbius变换"
date:   2019-05-14 18-30-05 +0800
categories: mathematics
---


$\newcommand{\P}{\mathbb{P}} \newcommand{\R}{\mathbb{R}} \newcommand{\C}{\mathbb{C}} \newcommand{\GL}{\mathrm{GL}} \newcommand{\PGL}{\mathrm{PGL}} \newcommand{\SL}{\mathrm{SL}} \newcommand{\PSL}{\mathrm{PSL}}$学习复分析的时候，经常会谈到拓广复平面的概念。但是，在初等的复变函数教材里，一般没有提及它是怎样构造出来的，对于它上面的一些运算的性质也没有给予非常充分的解释。而且，还容易想到一些相关的问题，例如为什么拓广复平面上可以定义交比，而且保持它们不变的是Möbius变换。这可能是因为$$\hat \C=\C\cup\{\infty\}$$确实太容易造出来，而且令人困扰的问题实际上非常显然，但我们在这里还是不妨用代数的方法尝试着做一下，并用构造的结果解释一些与Möbius变换相关的一些问题。

**1.** 首先回顾一下基础的射影几何概念。域$F$上的$n$维射影空间(记作$\P^n(F)$)是在向量空间$F^{n+1}$上引入一个等价关系得到的。这样，当我们谈论$n$维射影空间上的“点”时，实际上是在谈论$n+1$维向量空间的一维子空间，或者说是“过原点的直线”。形式上，以复数域上的射影直线（即复数域上的一维射影空间）可以这样构造：

$$\P^1(\C)=\left(\C^2\backslash\ \begin{pmatrix}0\\0\end{pmatrix}\right)/\approx$$

具体来说，它是由是二维复数空间去掉原点，并且对等价关系$\approx$作商集得到的。这里关系$\approx$按照如下方式定义：

$$\begin{pmatrix}a\\b\end{pmatrix}\approx \begin{pmatrix}c\\d\end{pmatrix} :\Leftrightarrow\exists\lambda\in\C^* , \begin{pmatrix}a\\b\end{pmatrix}= \lambda\begin{pmatrix}c\\d\end{pmatrix}$$

即两个向量等价当且仅当它们只相差一个非零纯量倍。容易验证这个关系确实具有自反性、对称性、传递性。因此，我们可以定义$\begin{bmatrix}a &b\end{bmatrix}^\dagger$为$\begin{pmatrix}a &b\end{pmatrix}^\dagger$作为代表元的等价类，它就是所谓射影直线上的“点”。容易看出，通过对$b$是否为零进行讨论，可以作出划分

$$\P^1(\C)=\left\{ \begin{bmatrix}z\\1\end{bmatrix}\middle|z\in\C \right\}\cup\left\{\begin{bmatrix}1\\0\end{bmatrix} \right\}$$

我们将这个集合看作是拓广复平面：左边的部分囊括了所有的“有限的复数”，而右边单独的一个向量则是“无穷远点”（$\infty$）。但是，在这种形式的定义中，$\infty$并没有显现出什么与其它点之间的本质上的不同。或许在对拓广复平面上的拓扑、范数等概念进行合适的定义之后，可以自然地解释“在$\infty$处解析”等概念。

这或多或少解释了拓广复平面与实射影平面的一个原因：相比而言，实射影平面有“一圈”无穷远点，然而拓广复平面上面只有一个（$\infty$）。由于纯量集合$\R$在某种程度上比$\C$要小一些，对比一下，实射影平面具有形式

$$\P^2(\R)=\left\{ \begin{bmatrix}a\\b\\1\end{bmatrix}\middle|a,b\in\R \right\}\cup\left\{ \begin{bmatrix}a\\1\\0\end{bmatrix}\middle|a\in\R \right\}\cup\left\{ \begin{bmatrix}1\\0\\0\end{bmatrix}\right\}$$

显然这与复射影直线相比是有本质区别的。

**2.** 接下来我们来探讨复射影直线之间的同构，即射影变换。一般来说，域$F$上的$n$维射影空间$\P^{n-1}(F)$上的射影变换构成了一般射影线性群

$$\PGL(n,F)=\GL(n,F)/Z(\GL(n,F))$$

这里$Z(\GL(n,F))$是$F$上所有$n$可逆矩阵构成的群的中心，它们都具有非零纯量乘以单位阵的形式。我们还是用

$$\begin{bmatrix}a &b\\c &d\end{bmatrix} = \left\{\lambda\begin{pmatrix}a &b\\c &d\end{pmatrix}\middle|\lambda\in\C^* \right\} \in \PGL(2,\C)$$

来代表相应的射影变换。通过简单的计算，得到

$$\begin{bmatrix}a &b\\c &d\end{bmatrix}\begin{bmatrix}z\\ 1\end{bmatrix} = \begin{bmatrix} az+b \\ cz+d \end{bmatrix} = \begin{cases}\begin{bmatrix} \frac{az+b}{cz+d} \\ 1 \end{bmatrix} &\text{ if } cz+d\ne 0\\ \begin{bmatrix} 1 \\ 0 \end{bmatrix} & \text{ otherwise }\end{cases}$$

$$
\begin{bmatrix}a &b\\c &d\end{bmatrix}\begin{bmatrix} 1\\ 0\end{bmatrix} = \begin{bmatrix} a \\ c \end{bmatrix}
$$

这与Möbius变换在复数$z$上和$\infty$上作用的结果是一致的。

**3.** 任意特征不为$2$的域上的射影空间上都有交比的概念（当$\mathrm{char}F=2$时，$\P^1(F)$上只有三个点）。具体的实现需要可能需要一些关于射影坐标的知识，这里我们略过不谈。按理说，交比是对$\P_n(F)$上的一维射影子空间上的四个不同的点定义的，但是拓广复平面本来就是射影直线，故它上面任意的四个点都可以定义交比。这一点也和实射影平面不同。此外，实射影平面上的射影变换只能将直线映为直线，但Möbius变换却可以将直线与圆互换。在我看来，这是因为所谓拓广复平面上的“直线”和“圆”不过是它的一些子集，并不是射影子空间，因此也不必在射影变换下保持不变。

但是一些通用的性质，例如射影变换保持交比不变，还是成立的。

**4.** 通过将拓广复平面看作是复数域上的射影直线，还可以研究Möbius变换的不动点。考虑方程

$$\begin{bmatrix}a &b\\c &d\end{bmatrix}\begin{bmatrix} u \\ v\end{bmatrix} = \begin{bmatrix} u \\ v\end{bmatrix}$$

它成立当且仅当$\exists \lambda\in\C^* $使得

$$A\begin{pmatrix} u \\ v\end{pmatrix} = \lambda\begin{pmatrix} u \\ v\end{pmatrix}$$

这里

 $$A=\begin{pmatrix}a &b\\c &d\end{pmatrix}$$

也就是说，$\begin{pmatrix}u &v\end{pmatrix}^\dagger$是矩阵$A$的特征向量。因此，Möbius的不动点个数归结于以下情形：
1. $A$的两个特征值相等，此时$$A\sim\begin{pmatrix}\lambda &0\\0 &\lambda\end{pmatrix}\approx\begin{pmatrix}1 &0\\0 &1\end{pmatrix}$$，相应的Möbius变换是恒等变换，$\hat\C$上的每一个点都是它的不动点。（$\sim$代表矩阵的相似关系）
2. $A$的两个特征值不等，此时$$A\sim\begin{pmatrix}\lambda &0\\0 &\mu\end{pmatrix}$$，$A$有两个不相等的特征向量，故相应的Möbius变换有两个不同的不动点。
3. $A$不可对角化，此时$$A\sim\begin{pmatrix}\lambda &1\\0 &\lambda\end{pmatrix}$$，$A$只有一个特征向量，故相应的Möbius变换只有一个不动点。

**5.** $\PGL(2,\C)\cong\PSL(2,\C)$，然而对于任意的一个包含不止三个元素的域$F$，特殊射影线性群$\PSL(2,F)$都是单群，故所有Möbius变换构成的群是一个单群。

---

总之，以上的讨论给出了一个拓广复平面$\hat\C$的形式化定义，对我而言消除了一些关于$\infty$的神秘感，并且统一了一部分关于Möbius变换和一般的射影变换的一些结果。尽管如此，关于Möbius主要的结果，例如对称原理(Symmetry Principle)、朝向原理(Orientation Principle)等，还是离不开对于复数域的具体论证。

希望本文能对大家有所帮助。

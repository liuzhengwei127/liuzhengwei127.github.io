---
title: 论文中奇怪的倒三角们
date: 2020-11-18 22:27:01
tags: 
- 数学
- 论文
categories:
- 数学
mathjax: true
---
最近在读siggraph里面关于流体的论文，涉及到数学推导的部分总是会有一些倒三角，实在是迷惑到我了，深感自己高数没有学好，正好最近实验室里讲流体课讲到了这块内容，找了些资料恶补一下。

<!--more-->

## 梯度

### 记法
$ \nabla $

### 数学解释
在向量微积分中，标量场的梯度是一个向量场。标
量场中某一点上的梯度指向标量场增长最快的方向，
梯度的长度是这个最大的变化率。

### 运算规则
$$\nabla f = (\frac {\partial f}{\partial x},\frac {\partial f}{\partial y},\frac {\partial f}{\partial z})$$

## 散度
### 记法
$ \nabla\cdot $

### 数学解释
散度是向量分析中的一个向量算子，将向量空间上
的一个向量场（矢量场）对应到一个标量场上。
散度描述的是向量场里一个点是汇聚点还是发源
点，形象地说，就是这包含这一点的一个微小体元中
的向量是“向外”居多还是“向内”居多。

### 运算规则
$$\nabla\cdot A = \frac {\partial P}{\partial x} + \frac {\partial Q}{\partial y} + \frac {\partial R}{\partial z}$$


## 旋度
### 记法
$ \nabla\times $

### 数学解释
旋度是向量分析中的一个向量算子，可以表示三维向量场对
某一点附近的微元造成的旋转程度。这个向量提供了向量场在
这一点的旋转性质。旋度向量的方向表示向量场在这一点附近
旋转度最大的环量的旋转轴，它和向量旋转的方向满足右手定
则。

### 运算规则
$$\nabla\times A =\left|
\begin{array}{ccc} 
    \vec i &  \vec j & \vec k \\ 
    \frac {\partial}{\partial x} &    \frac {\partial}{\partial y}   & \frac {\partial}{\partial z}\\ 
    P & Q & R
\end{array} \right| 
$$
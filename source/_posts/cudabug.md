---
title: 'BUG:cuda别碰cpu库'
tags:
  - bug
  - CUDA
categories:
  - CUDA
date: 2020-12-09 22:21:22
---


每天打开VS，右下角都有小红圈提示我要更新VS。手贱点了更新，更新完CUDA文件编译不了了。一直以为是更新完CUDA配置不对，重装VS+重装CUDA都没用。排了两天雷，最后发现是一个沙雕函数的问题。

<!--more-->
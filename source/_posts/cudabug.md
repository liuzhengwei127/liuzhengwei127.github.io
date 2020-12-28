---
title: 'BUG:cuda别用cpu的math库'
tags:
  - bug
  - CUDA
categories:
  - CUDA
date: 2020-12-09 22:21:22
---


每天打开VS，右下角都有小红圈提示我要更新VS。手贱点了更新，更新完CUDA文件编译不了了。一直以为是更新完CUDA配置不对，重装VS+重装CUDA都没用。排了两天雷，最后发现是一个调用的数学库函数的问题。

<!--more-->

CUDA代码部分如下（修改前）
```cpp
__device__
float poly6Kernel(float3 r)
{
	float ret = 0.0f;
	float r1 = sqrtf(r.x * r.x + r.y * r.y + r.z * r.z);
	float h1 = params.sphRadius;
	if (r1 > h1 || r1 <= 1e-6)
		return ret;
	float r2 = r1 * r1;
	float h2 = h1 * h1;

	ret = params.poly6Coff * pow((h2 - r2), 3);
	return ret;
}
```

报了一个MSB3721错误
![MSB3721](/images/MSB3721.png)
这个错误其实是一个只要CUDA部分代码编译失败都会报的错误，只是一般这个MSB3721错误之前会给出更具体的错误，比如
![MSB3721](/images/MSB3721Example.png)

最后偶然发现是
```cpp
ret = params.poly6Coff * pow((h2 - r2), 3);
```
这一行里面调用的pow函数的问题。
这里调用```pow()```的时候链接到了cpu上的math.h(cmath)里面的函数，在GPU里当然是跑不了。
因此要用```powf()```替代，像本函数前面使用的```sqrtf()```一样。
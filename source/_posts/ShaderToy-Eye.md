---
title: ShaderToy:眼睛
date: 2020-12-28 22:54:33
tags:
- shader
- eye
---

按照[youtube上iq大神的教学](https://www.youtube.com/watch?v=emjuqqyq_qc)，在unity上写的眼睛shader

## 效果
![ShaderToy-Eye](/images/ShaderToy-Eye.png)

## 基本思路

### 渲染
#### 上底色
```
col = float3(0.0, 0.3, 0.4);
float f = fbm(5*p);
col = lerp(col, float3(0.2, 0.5, 0.4), f);

f = 1.0 - smoothstep(0.2, 0.5, r);
col = lerp(col, float3(0.9, 0.6, 0.2), f);
```
代码的上半部分通过fbm()函数给眼白部分上蓝绿色的泼墨式的底色。

代码的下半部分画出眼睛中心黄色的晕。
smoothstep()来控制眼白到瞳孔中心过渡区域的大小。

#### 云烟特效
```
a += 0.4 * fbm(4 * p);

f = smoothstep(0.3, 1.0, fbm(float2(6*r, 16*a)));
col = lerp(col, float3(1.0, 1.0, 1.0), f);

f = smoothstep(0.4, 0.9, fbm(float2(5 * r, 8 * a)));
col *= 1.0 - 0.5 * f;
```
先通过fbm函数将像素的旋转角a打乱。

再通过smoothstep()和fbm()来画出云烟般的效果。

```
f = smoothstep(0.4, 0.9, r);
col *= 1.0 - 0.5 * f;
```
添加黑色细节（即整体调暗）

#### 瞳孔
```
f = smoothstep(0.2, 0.25, r);
col *= f;
```

#### 眼睛边缘过渡
```
f = smoothstep(0.75, 0.8, r);
col = lerp(col, float3(1.0, 1.0, 1.0), f);
```

#### 添加高光
```
f = 1.0 - smoothstep(0.1, 0.4, length(p - float2(0.2, 0.2)));
col += float3(0.9, 0.8, 0.7) * f * 0.8;
```

### 动态变化
```
float ss = 0.5 +  0.5 * sin(50*_Time);
float anim = 1.0 + 0.1 * ss * clamp(1.0 - r, 0.0, 1.0);
r *= anim;
```

## FBM
FBM(Fractional Brownian Noise)
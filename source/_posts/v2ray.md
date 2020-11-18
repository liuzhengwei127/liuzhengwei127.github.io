---
title: 面向小白的v2ray搭建指南，科学上网
tags:
- v2ray
- 科学上网
categories:
- 内功
---

作为爱学习的三有青年，科学上网能够帮助我们google查阅资料，youtube观看学习视频，在p站进行~~姿势~~知识学习🐶
本教程旨在帮助我们快速搭建属于自己的v2ray服务器来方便快速的科学上网
![youtube](/images/youtube.png)

<!--more-->

## 服务端（远端服务器）
### 获取一个境外VPS
VPS(Virtual Private Server)。获取VPS的意义在于作为我们的跳板，将我们的流量封装起来。
#### vultr 
选用的是vultr公司的服务器服务。 https://www.vultr.com/
优点如下：
1.拥有国外节点服务器且相对稳定，适合做跳板（目前用了几个月还没被墙）。
2.新用户有活动。我第一次注册的时候充值10刀送50刀。相当于10刀能够嫖一年的服务器服务。
（如果有其他更划算的国外服务器服务也可考虑
##### 节点(Server Location)
建议选用新加坡/韩国
##### 系统(Server Type)
Ubuntu 18.04及以上
##### 服务器配置(Server Size)
一般最便宜的价格配置都够用了，我用的是5刀/month
![vultr](/images/vultr.png)
### 远程连接到服务器
mac用户可以直接通过ssh连接到服务器
windows用户可以用各种工具(我用的是XShell)

### 部署v2ray服务
用ssh连接到VPS后即可开始部署v2ray服务
由于原来很多教程使用的脚本https://install.direct/go.sh 已被停用

#### 在服务器上安装v2ray
在命令行里输入以下指令安装v2ray

    $ bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
看到如下界面应该安装成功了
![v2ray_installscript](/images/v2ray_installscript.png)

#### 配置v2ray文件
用vim打开v2ray的配置文件config.json

    $ vi /usr/local/etc/v2ray/config.json
打开后里面是空的，修改为以下内容
```
{
    "inbounds": [
        {
            "port": 10086, //服务器监听端口
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": "5ac211e0-5183-454b-9521-836db728310b" //唯一标识符uuid
                    }
                ]
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom"
        }
    ]
}
```
注意⚠️：port与id均为自定义的（id不建议使用我这里给定的值）
##### port
建议使用5位数的端口，不易与系统本身使用的端口冲突
##### id
uuid随机生成器: 
https://www.uuidgenerator.net/
https://www.v2fly.org/awesome/tools.html
#### 启动v2ray服务
在shell里输入

    systemctl start v2ray
    systemctl enable v2ray

## 客户端（本机）
### mac端
#### 下载客户端
使用V2rayU客户端
下载地址：https://github.com/yanue/V2rayU/releases
#### 服务器设置
打开V2rayU的服务器设置
![v2rayU](/images/V2rayU.png)
服务器列表中新建一个服务器配置，并选择手动模式
##### addrss
输入VPS服务器的IP地址
##### port
冒号后面输入之前配置文件config.json中写入的port
##### id
输入之前配置文件config.json中写入的id
##### alterId
alterId设置为0
![v2rayU_config](/images/V2rayU_config.png)
点击确定后即可连接开始科学上网了！
### windows端
#### 下载客户端
使用V2rayN客户端
下载地址：https://github.com/2dust/v2rayN/releases

#### 服务器设置
打开V2rayN，选择“添加[VMess]服务器”
![v2rayN](/images/V2rayN.png)
##### addrss
输入VPS服务器的IP地址
##### port
冒号后面输入之前配置文件config.json中写入的port
##### id
输入之前配置文件config.json中写入的id
##### alterId
alterId设置为0
![v2rayN_config](/images/V2rayN_config.png)
点击确定后即可连接开始科学上网了！
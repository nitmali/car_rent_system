# 租车系统
## 一个大作业Demo
### 简单介绍
* 后端: Spring框架
* 数据库: MySql 
* ORM框架: Spring-Data-JPA
* 前端: Bootstrap + 简单的DIV+CSS + 一点点Vue.js
### 实现功能
* 用户
    1. 登录注册
    2. 预订车辆
    3. 个人中心(待完善)
* 管理员
    1. 登录注册
    2. 订单车辆统计
    3. 订单审核
    4. 车辆归还
    5. 订单信息查看
    6. 车辆信息管理
### 操作方法
1. 新建数据库
2. 修改application.properties内的参数
3. 运行Spring Boot主程序，自动生成表
4. 将工程根目录下的car.sql导入数据库
5. 将工程根目录下的车辆图片保存至对应的路径
6. 重新运行程序
### 工程打包
```mvn clean```  
```mvn package```
### Tips
1. 前端页面都是用最原始的方式写的有些问题很粗糙，参考价值比较低
2. Model层借用了生成表的Entity
3. 安全控制使用Session和Servlet过滤器(Spring Boot的拦截器默认不拦截静态文件)
4. 账号自行注册
5. 本项目已打包部署在阿里云 [没有备案的阿里云](http://101.132.133.43:8080)
### FLAG
> 下个版本将使用Vue重构前端 实现单页应用, 可能使用 .net core 重构后端
***
# Car Rental System
## a simple demo for Spring Boot
### Introduction
* Background: Spring 
* DataBase: MySql
* ORM: Spring-Data-JPA
* Front-end: Bootstrap+Vue.js

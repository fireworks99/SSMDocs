---
title: 1-责任链模式
lang: zh-CN
author: fireworks99
date: '2025-04-18'
---



# 责任链模式

[[toc]]

## 拦截器1

~~~java
package com.learn.ssm.chapter2.reflect.response;

import com.learn.ssm.chapter2.reflect.Interceptor;

import java.lang.reflect.Method;

public class Interceptor1 implements Interceptor {
    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器1】的before方法");
        return true;
    }

    @Override
    public void around(Object proxy, Object target, Method method, Object[] args) {

    }

    @Override
    public void after(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器1】的after方法");
    }
}
~~~



## 拦截器2

~~~java
package com.learn.ssm.chapter2.reflect.response;

import com.learn.ssm.chapter2.reflect.Interceptor;

import java.lang.reflect.Method;

public class Interceptor2 implements Interceptor {

    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器2】的before方法");
        return true;
    }

    @Override
    public void around(Object proxy, Object target, Method method, Object[] args) {

    }

    @Override
    public void after(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器2】的after方法");
    }
}
~~~



## 拦截器3

~~~java
package com.learn.ssm.chapter2.reflect.response;

import com.learn.ssm.chapter2.reflect.Interceptor;

import java.lang.reflect.Method;

public class Interceptor3 implements Interceptor {
    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器3】的before方法");
        return true;
    }

    @Override
    public void around(Object proxy, Object target, Method method, Object[] args) {

    }

    @Override
    public void after(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("【拦截器3】的after方法");
    }
}
~~~



## 主程序

~~~java
package com.learn.ssm.chapter2.reflect.response;

import com.learn.ssm.chapter2.reflect.HelloWorld;
import com.learn.ssm.chapter2.reflect.HelloWorldImpl;
import com.learn.ssm.chapter2.reflect.InterceptorJdkProxy;

public class Main {
    public static void main(String[] args) {
        HelloWorld proxy1 = (HelloWorld) InterceptorJdkProxy.bind(new HelloWorldImpl(),
                "com.learn.ssm.chapter2.reflect.response.Interceptor1");
        HelloWorld proxy2 = (HelloWorld) InterceptorJdkProxy.bind(proxy1,
                "com.learn.ssm.chapter2.reflect.response.Interceptor2");
        HelloWorld proxy3 = (HelloWorld) InterceptorJdkProxy.bind(proxy2,
                "com.learn.ssm.chapter2.reflect.response.Interceptor3");
        proxy3.sayHelloWorld();
        /**
         * 【拦截器3】的before方法
         * 【拦截器2】的before方法
         * 【拦截器1】的before方法
         * Hello World
         * 【拦截器1】的after方法
         * 【拦截器2】的after方法
         * 【拦截器3】的after方法
         */
      }
}
~~~



## 总结

~~~java
// Web请求处理链
class 请求过滤器 {
    public void 处理请求(HTTP请求 请求) {
        // 自动经过一系列过滤器：
        // 1. 身份认证过滤器 → 检查登录状态
        // 2. 权限检查过滤器 → 检查用户权限
        // 3. 参数验证过滤器 → 验证请求参数
        // 4. 业务处理过滤器 → 实际处理业务
        // 5. 日志记录过滤器 → 记录操作日志
        
        // 任何一个过滤器都可以决定是否继续传递
    }
}

// 使用时：
请求过滤器链.处理请求(用户请求);
// 用户不用关心经过了多少层过滤
~~~

其他例子：

* 客服电话

  ~~~java
  // 你打客服电话
  客服系统.处理问题(我的问题);
  
  // 自动转接：
  // 1级客服：处理简单问题（查询余额）
  // 2级客服：处理中等问题（业务办理）  
  // 3级客服：处理复杂问题（投诉建议）
  // 专家客服：处理疑难问题（技术故障）
  // 你不需要知道该找谁，系统自动找合适的人
  ~~~

* 垃圾邮件

  ~~~java
  // 收到一封邮件
  邮件过滤器.处理邮件(新邮件);
  
  // 层层过滤：
  // 规则1：黑名单过滤 → 直接删除
  // 规则2：关键词过滤 → 标记为垃圾邮件
  // 规则3：发件人验证 → 正常邮件
  // 规则4：内容分析 → 智能分类
  // 只要有一个过滤器处理了，流程就结束
  ~~~

* 游戏伤害

  ~~~java
  // 玩家受到攻击
  玩家.受到伤害(100点伤害);
  
  // 伤害经过层层减免：
  // 头盔：减免20点 → 剩余80点
  // 盔甲：减免30点 → 剩余50点  
  // 护盾：吸收40点 → 剩余10点
  // 最终：生命值减少10点
  ~~~

  

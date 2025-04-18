---
title: 责任链模式
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


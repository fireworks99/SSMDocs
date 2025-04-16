---
title: 动态代理模式
lang: zh-CN
author: fireworks99
date: '2025-04-11'
---

# 动态代理模式

[[toc]]

## 1.前言

Java有多种动态代理技术，比如JDK、CGLIB、Javassist、ASM，其中最常用的动态代理技术有两种：一种是 JDK 动态代理，这是 JDK 自带的功能；另一种是 CGLIB，这是第三方提供的一种技术。目前 Spring 常用 JDK和CGLIB，而 MyBatis 还使用 Javassist ，无论哪种代理其技术，它们的理念都是相似的。

> 反射与动态代理的关系：
>
> * 反射是基础技术
> * 动态代理是基于反射实现的**设计模式**



## 2.JDK动态代理

特点：基于Java自带的类（java.lang.reflect.Proxy）实现，这个类涉及到接口，这也意味着JDK动态代理只能代理**接口**，类不行，类要用CGLIB。

| JDK动态代理 | 说明                                             |
| ----------- | ------------------------------------------------ |
| 用途        | 给接口实现类“加壳”增强功能（如日志、安全、事务） |
| 原理        | 使用 Java 反射 + `Proxy` 动态生成代理对象        |
| 限制        | 只能代理**接口**（类不行，类要用 CGLIB）         |



~~~java
package com.learn.ssm.chapter2.reflect;

public interface HelloWorld {
    public void sayHelloWorld();
}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

public class HelloWorldImpl implements HelloWorld {
    @Override
    public void sayHelloWorld() {
        System.out.println("Hello World");
    }
}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JdkProxyExample implements InvocationHandler {

    // 真实对象
    private Object target = null;

    // 1.建立代理对象与真实对象的代理关系，并返回代理对象
    // Proxy.newProxyInstance第二个参数限制了JDK动态代理只适应接口类型，不能直接代理类
    public Object bind(Object target) {
        this.target = target;//本该放到构造函数中，这里顺便做了
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),
                target.getClass().getInterfaces(), this);
    }

    // 2.实现代理逻辑
    // 当调用代理对象的某个方法时，这个 invoke() 方法就会被触发。
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("在调度真实对象之前的服务");

        // 这行代码相当于调度真实对象的方法，只是通过反射实现而已。
        Object obj = method.invoke(target, args);//访问 当前类的成员变量 时，可省略this

        System.out.println("在调度真实对象之后的服务");
        return obj;
    }
}
~~~



~~~java
// 5.JDK动态代理
JdkProxyExample jdk = new JdkProxyExample();
HelloWorld proxy = (HelloWorld) jdk.bind(new HelloWorldImpl());
proxy.sayHelloWorld();//这行代码会去执行代理对象的invoke方法
/**
 * 在调度真实对象之前的服务
 * Hello World
 * 在调度真实对象之后的服务
 */
~~~



## 3.CGLIB动态代理

JDK 动态代理必须提供接口才能使用，在一些不能提供接口的环境中，只能采用其他第三方技术， 比如 CGLIB 动态代理。

~~~java
package com.learn.ssm.chapter2.reflect;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
import java.lang.reflect.Method;

public class CglibProxyExample implements MethodInterceptor {

    // 1.建立代理对象与真实对象的代理关系，并返回代理对象
    public Object getProxy(Class cls) {
        Enhancer enhancer = new Enhancer();

        //设置增强类型
        enhancer.setSuperclass(cls);

        //定义代理对象为当前对象，要求当前对象实现 MethodInterceptor 方法
        enhancer.setCallback(this);

        //生成并返回代理对象
        return enhancer.create();
    }

    // 2.实现代理逻辑
    @Override
    public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println("调用真实对象前");

        //CGLIB 反射调用真实对象方法
        Object result = methodProxy.invokeSuper(proxy, args);

        System.out.println("调用真实对象后");
        return result;
    }
}
~~~



~~~java
// 6.Cglib动态代理
CglibProxyExample cpe = new CglibProxyExample();
ReflectServiceImpl obj = (ReflectServiceImpl) cpe.getProxy(ReflectServiceImpl.class);
obj.sayHello("Wendy");//这行代码会去执行代理对象的intercept方法
/**
 * 调用真实对象前
 * Hello, Wendy
 * 调用真实对象后
 */
~~~



## 4.拦截器

> 反射与动态代理与拦截器的关系：
>
> * 反射是基础技术
> * 动态代理是**基于反射**实现的**设计模式**
> * 拦截器是**基于代理**实现的应用场景

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public interface Interceptor {
    public boolean before(Object proxy, Object target, Method method, Object[] args);
    public void around(Object proxy, Object target, Method method, Object[] args);
    public void after(Object proxy, Object target, Method method, Object[] args);
}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class InterceptorJdkProxy implements InvocationHandler {

    private Object target;//真实对象
    private String interceptorClass = null;//拦截器全限定名

    //类的构造函数
    public InterceptorJdkProxy(Object target, String interceptorClass) {
        this.target = target;
        this.interceptorClass = interceptorClass;
    }

    // 1.建立代理对象与真实对象的代理关系，并返回代理对象
    public static Object bind(Object target, String interceptorClass) {
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InterceptorJdkProxy(target, interceptorClass));
    }

    // 2.实现代理逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if(interceptorClass == null) {
            //没有拦截器则直接反射原有方法
            return method.invoke(target, args);
        }
        Object result = null;

        //通过反射生成拦截器对象
        Interceptor interceptor = (Interceptor) Class.forName(interceptorClass).newInstance();

        if(interceptor.before(proxy, target, method, args)) {//校验通过
            result = method.invoke(target, args);//调度真实对象的方法
        } else {//校验不通过
            interceptor.around(proxy, target, method, args);
        }
        interceptor.after(proxy, target, method, args);//finally
        return result;
    }
}
~~~



~~~java
// 7.拦截器
HelloWorld proxy2 = (HelloWorld) InterceptorJdkProxy.bind(new HelloWorldImpl(),
"com.learn.ssm.chapter2.reflect.MyInterceptor");
proxy2.sayHelloWorld();
/**
* 反射方法前逻辑
* 取代了被代理对象的方法
* 反射方法后逻辑
*/
~~~


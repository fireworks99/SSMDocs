---
title: 2-Java修饰符
lang: zh-CN
author: fireworks99
date: '2026-01-05'
---

[[toc]]

## 1.什么是修饰符

~~~java
// 基础类型版本
public static final volatile int MAX_COUNT = 100;  // + volatile

// 引用类型版本（可以更长）
public static final synchronized transient volatile List<String> LIST;
// ↑      ↑      ↑        ↑           ↑         ↑
// 访问   静态   不可变   同步的      瞬态      易变   类型  变量名

// 方法上的组合示例
public static final synchronized native abstract strictfp void method();
// ↑      ↑      ↑        ↑          ↑       ↑        ↑
// 最多可以有6个非访问修饰符 + 1个访问修饰符
~~~

## 2.修饰符种类

### ①.访问修饰符

控制其他类对成员的访问权限：

~~~java
// 从最严格到最宽松：
private   - 仅本类可见
(default) - 同包可见 (不写修饰符就是默认)
protected - 同包+子类可见
public    - 所有类可见
~~~

### ②.非访问修饰符

提供特殊功能：

~~~java
static   - 静态的，属于类
final    - 不可变的
abstract - 抽象的
synchronized - 同步的
volatile - 易变的
transient - 瞬态的
~~~

## 3.修饰符顺序规范

Java编译器**不关心非访问修饰符的顺序**，只要语法正确就会编译通过。**但有约定俗成的顺序，并且某些IDE/工具会强制按规范顺序排列。**

### Java语言规范

```java
[访问修饰符] [static] [final] [transient] [volatile] 类型 变量名
[访问修饰符] [static] [final] [abstract] [synchronized] [native] [strictfp] 返回类型 方法名
```

### 实际编码约定

```java
// 变量：访问修饰符 -> static -> final -> transient/volatile -> 类型
private static final transient Object obj;

// 方法：访问修饰符 -> static -> final/abstract -> synchronized -> native/strictfp -> 返回类型
public static final synchronized native void method();
```

## 4.特殊组合

### ①.互斥

~~~java
// 编译错误：final 和 abstract 冲突
final abstract class ErrorClass { }  // ❌

// 编译错误：abstract 不能用于变量
abstract int value;  // ❌

// 编译错误：abstract 和 private 冲突
private abstract void method();  // ❌
~~~

### ②.有特殊意义

~~~java
// 单例模式
private static final Singleton INSTANCE = new Singleton();

// 线程安全的延迟初始化
private static volatile Singleton instance;

// 序列化排除字段
private transient Object nonSerializableField;

// 多线程共享标志
private volatile boolean running = true;
~~~

## 5.常见组合

~~~java
// 各种常见修饰组合的意义：
private int count;                      // 普通实例变量
private static int totalCount;          // 类变量，所有实例共享
private final int MAX = 100;            // 实例常量，每个对象都有
private static final int LIMIT = 1000;  // 类常量，全局唯一
public static final String NAME = "App";// 公共常量
protected abstract void calculate();    // 供子类实现的抽象方法
public synchronized void safeMethod() { } // 线程安全的方法
~~~


---
title: Java反射技术
lang: zh-CN
author: fireworks99
date: '2025-04-11'
---

# Java反射技术

[[toc]]



> **反射**的核心思想之一就是允许程序在**运行时**动态地获取类的信息并操作类的成员，即使你对类的具体实现细节不了解。



应用场景：

1. **Ioc**：
   * IoC是一种设计原则，用于减少代码之间的耦合度。在传统的程序设计中，业务逻辑通常负责创建其所依赖的对象。而在IoC模式下，对象的创建与管理被转移到了外部容器（比如Spring容器），这个容器负责将这些依赖注入到需要它们的对象中。这种方式减少了类之间的直接依赖。
   * 在Spring的IoC容器中，依赖注入（DI）是其核心功能之一。依赖注入的过程涉及对象的创建、属性的赋值以及依赖关系的管理，这些操作大量依赖于反射机制。
   * 总结：用**配置**代替**new关键字**来实现对象的创建，实现组件间的松耦合。
2. **AOP**：
   * AOP的核心思想是将横切关注点（如日志记录、事务管理等）从业务逻辑中分离出来，并通过切面（Aspect）动态织入到目标方法中。
   * Spring AOP基于动态代理实现，而动态代理的两种方式（JDK动态代理和CGLIB）都依赖反射（详见后面的章节）。



缺点：

1. **性能问题**：反射操作比直接调用类的成员要慢，因为涉及额外的类型检查和安全控制。
2. **安全性问题**：反射可以绕过访问控制（如访问`private`成员），可能破坏封装性。
3. **复杂性**：代码可读性和维护性较差，容易出错。



## 1.生成对象（无参构造）

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public class ReflectServiceImpl {
    public String sayHello(String name) {
        System.out.println("Hello, " + name);
        return name;
    }

    // 1.通过反射，生成对象（无参构造）
    public static ReflectServiceImpl getInstance() {
        ReflectServiceImpl object = null;
        try {
            object = (ReflectServiceImpl) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl").newInstance();
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            ex.printStackTrace();
        }
        return object;
    }

}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

public class Main {
    public static void main(String[] args) {
        // 1.通过反射生成对象（无参构造）
        ReflectServiceImpl service = ReflectServiceImpl.getInstance();
        if(service != null) {
            service.sayHello("Joey");//Hello, Joey
        }
    }
}
~~~



## 2.生成对象（带参构造）

~~~java
package com.learn.ssm.chapter2.reflect;

public class ReflectServiceImpl2 {
    private String name;

    public ReflectServiceImpl2(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello, " + name);
    }

    // 2.通过反射，生成对象（含参构造）
    public static ReflectServiceImpl2 getInstance(String name) {
        ReflectServiceImpl2 object = null;
        try {
            object = (ReflectServiceImpl2) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl2").getConstructor(String.class).newInstance(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }
}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

public class Main {
    public static void main(String[] args) {
        // 2.通过反射生成对象（含参构造）
        ReflectServiceImpl2 serviceImpl2 = ReflectServiceImpl2.getInstance("Alice");
        if(serviceImpl2 != null) {
            serviceImpl2.sayHello();//Hello, Alice
        }
    }
}
~~~



## 3.调度方法

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public class ReflectServiceImpl {
    public String sayHello(String name) {
        System.out.println("Hello, " + name);
        return name;
    }

    // 3.通过反射，调度方法
    public Object reflectMethod() {
        Object returnObj = null;
        ReflectServiceImpl target = new ReflectServiceImpl();
        try {
            Method method = ReflectServiceImpl.class.getMethod("sayHello", String.class);
            returnObj = method.invoke(target, "Mike");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return returnObj;
    }
}
~~~



~~~java
package com.learn.ssm.chapter2.reflect;

public class Main {
    public static void main(String[] args) {
        // 3.通过反射调度方法
        Object o = service.reflectMethod();//Hello, Mike
        System.out.println(o);//Mike
    }
}
~~~



## 4.生成对象并调度方法

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public class ReflectServiceImpl {
    public String sayHello(String name) {
        System.out.println("Hello, " + name);
        return name;
    }
    
    // 4.通过反射，生成对象并调度方法
    public Object reflect() {
        ReflectServiceImpl object = null;
        try {
            object = (ReflectServiceImpl) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl").newInstance();
            Method method = object.getClass().getMethod("sayHello", String.class);
            method.invoke(object, "Tom");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }

}

~~~



~~~java
package com.learn.ssm.chapter2.reflect;

public class Main {
    public static void main(String[] args) {
        // 4.通过反射生成对象并调度方法
        Object oo = service.reflect();//Hello, Tom
        System.out.println(oo);//com.learn.ssm.chapter2.reflect.ReflectServiceImpl@34a245ab
    }
}

~~~



## 5.整体代码

### (1)ReflectServiceImpl

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public class ReflectServiceImpl {
    public String sayHello(String name) {
        System.out.println("Hello, " + name);
        return name;
    }

    // 1.通过反射，生成对象（无参构造）
    public static ReflectServiceImpl getInstance() {
        ReflectServiceImpl object = null;
        try {
            object = (ReflectServiceImpl) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl").newInstance();
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            ex.printStackTrace();
        }
        return object;
    }

    // 2.通过反射，调度方法
    public Object reflectMethod() {
        Object returnObj = null;
        ReflectServiceImpl target = new ReflectServiceImpl();
        try {
            Method method = ReflectServiceImpl.class.getMethod("sayHello", String.class);
            returnObj = method.invoke(target, "Mike");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return returnObj;
    }

    // 3.通过反射，生成对象并调度方法
    public Object reflect() {
        ReflectServiceImpl object = null;
        try {
            object = (ReflectServiceImpl) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl").newInstance();
            Method method = object.getClass().getMethod("sayHello", String.class);
            method.invoke(object, "Tom");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }

}
~~~

### (2).ReflectServiceImpl2

~~~java
package com.learn.ssm.chapter2.reflect;

public class ReflectServiceImpl2 {
    private String name;

    public ReflectServiceImpl2(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello, " + name);
    }

    // 通过反射，生成对象（含参构造）
    public static ReflectServiceImpl2 getInstance(String name) {
        ReflectServiceImpl2 object = null;
        try {
            object = (ReflectServiceImpl2) Class.forName("com.learn.ssm.chapter2.reflect.ReflectServiceImpl2").getConstructor(String.class).newInstance(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }
}
~~~

### (3).Main

~~~java
package com.learn.ssm.chapter2.reflect;

public class Main {
    public static void main(String[] args) {

        // 1.通过反射生成对象（无参构造）
        ReflectServiceImpl service = ReflectServiceImpl.getInstance();
        if(service != null) {
            service.sayHello("Joey");//Hello, Joey
        }

        // 2.通过反射调度方法
        Object o = service.reflectMethod();//Hello, Mike
        System.out.println(o);//Mike

        // 3.通过反射生成对象并调度方法
        Object oo = service.reflect();//Hello, Tom
        System.out.println(oo);//com.learn.ssm.chapter2.reflect.ReflectServiceImpl@34a245ab

        // 4.通过反射生成对象（含参构造）
        ReflectServiceImpl2 serviceImpl2 = ReflectServiceImpl2.getInstance("Alice");
        if(serviceImpl2 != null) {
            serviceImpl2.sayHello();//Hello, Alice
        }
    }
}
~~~


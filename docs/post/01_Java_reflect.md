---
title: Java反射技术
lang: zh-CN
author: fireworks99
date: '2025-04-11'
---

# Java反射技术

[[toc]]

## 1.生成对象（无参构造）

~~~java
package com.learn.ssm.chapter2.reflect;

import java.lang.reflect.Method;

public class ReflectServiceImpl {
    public String sayHello(String name) {
        System.err.println("Hello, " + name);
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
        System.err.println("Hello, " + name);
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
        System.err.println("Hello, " + name);
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
        System.err.println("Hello, " + name);
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
        System.err.println("Hello, " + name);
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
        System.err.println("Hello, " + name);
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


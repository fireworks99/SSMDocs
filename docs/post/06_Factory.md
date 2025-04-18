---
title: 工厂模式与抽象工厂模式
lang: zh-CN
author: fireworks99
date: '2025-04-18'
---

# 工厂模式与抽象工厂模式

[[toc]]

## 工厂模式

![工厂模式](img/factory.png)

### 产品接口

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public interface Computer {
    void start();
}
~~~



### 具体产品类

#### 产品1

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class Macbook implements Computer{

    @Override
    public void start() {
        System.out.println("Macbook starting...");
    }
}
~~~

#### 产品2

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class ThinkPad implements Computer{
    @Override
    public void start() {
        System.out.println("ThinkPad starting...");
    }
}
~~~



### 工厂类

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class ComputerFactory {
    public static Computer createComputer(String type) {
        if("Mac".equalsIgnoreCase(type)) {
            return new Macbook();
        } else if("ThinkPad".equalsIgnoreCase(type)) {
            return new ThinkPad();
        }
        return null;
    }
}
~~~



### 主程序

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class Main {
    public static void main(String[] args) {
        Computer computer = ComputerFactory.createComputer("Mac");
        computer.start();//Macbook starting...
    }
}
~~~



## 抽象工厂模式

![抽象工厂模式](img/abstract.png)

### 产品接口

#### 设备1

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public interface Phone {
    void call();
}
~~~

#### 设备2

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public interface Computer {
    void start();
}
~~~



### 具体产品类

#### 品牌1设备1

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class HuaweiPhone implements Phone{
    @Override
    public void call() {
        System.out.println("Huawei calling...");
    }
}
~~~

#### 品牌1设备2

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class HuaweiComputer implements Computer{
    @Override
    public void start() {
        System.out.println("Huawei starting...");
    }
}
~~~

#### 品牌2设备1

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class ApplePhone implements Phone{
    @Override
    public void call() {
        System.out.println("Apple calling...");
    }
}
~~~

#### 品牌2设备2

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class AppleComputer implements Computer{
    @Override
    public void start() {
        System.out.println("Apple starting...");
    }
}
~~~



### 工厂接口

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public interface ProductFactory {
    Phone createPhone();
    Computer createComputer();
}
~~~



### 具体工厂类

#### 品牌1工厂

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class HuaweiFactory implements ProductFactory{
    @Override
    public Phone createPhone() {
        return new HuaweiPhone();
    }

    @Override
    public Computer createComputer() {
        return new HuaweiComputer();
    }
}
~~~

#### 品牌2工厂

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class AppleFactory implements ProductFactory{
    @Override
    public Phone createPhone() {
        return new ApplePhone();
    }

    @Override
    public Computer createComputer() {
        return new AppleComputer();
    }
}
~~~



### 主程序

~~~java
package com.learn.ssm.chapter2.reflect.factory;

public class Main {
    public static void main(String[] args) {
        ProductFactory factory = new HuaweiFactory();
        Phone phone = factory.createPhone();
        phone.call();//Huawei calling...

        Computer computer1 = factory.createComputer();
        computer1.start();//Huawei starting...
    }
}
~~~






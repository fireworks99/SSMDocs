---
title: 建造者模式
lang: zh-CN
author: fireworks99
date: '2025-04-20'
---

# 建造者模式



## 传统方式 vs 建造者模式

| 对比维度           | 传统构建方式                   | 建造者模式                             |
| ------------------ | ------------------------------ | -------------------------------------- |
| **对象创建方式**   | 使用构造函数或 `setter` 方法   | 使用链式 `Builder` 类构建对象          |
| **适合场景**       | 简单对象，参数较少             | 复杂对象，参数多且可选组合多样         |
| **可读性**         | 差，参数过多时调用容易出错     | 高，链式调用清晰明了                   |
| **灵活性**         | 低，构造函数固定或需要多个重载 | 高，可自由组合构建                     |
| **代码扩展性**     | 差，添加参数需改多个构造方法   | 好，只需修改 `Builder`                 |
| **线程安全性**     | 一般需额外处理                 | `Builder` 可封装成不可变对象，便于控制 |
| **对象是否可变**   | 常为可变对象（有 `set` 方法）  | 可生成不可变对象（没有 `set` 方法）    |
| **构造逻辑封装**   | 分散在构造函数或外部           | 集中在 `Builder` 中，逻辑清晰          |
| **构造时校验能力** | 通常需要外部判断               | 可以在 `build()` 中集中校验            |



## 不使用建造者模式

~~~java
package com.learn.ssm.chapter2.reflect.builder;

public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;

    public Computer(String cpu, String ram, String storage, String gpu) {
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
        this.gpu = gpu;
    }

    public void showConfig() {
        System.out.println("CPU: " + cpu);
        System.out.println("RAM: " + ram);
        System.out.println("Storage: " + storage);
        System.out.println("GPU: " + gpu);
    }
}
~~~

~~~java
package com.learn.ssm.chapter2.reflect.builder;

public class Main {
    public static void main(String[] args) {
        Computer computer = new Computer("Intel i9", "32GB", "1TB SSD", "NVIDIA RTX 4090");
        computer.showConfig();
        /**
         * CPU: Intel i9
         * RAM: 32GB
         * Storage: 1TB SSD
         * GPU: NVIDIA RTX 4090
         */
    }
}
~~~



## 使用建造者模式

~~~java
package com.learn.ssm.chapter2.reflect.builder;

public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;

    // 构造方法私有，只能通过 Builder 创建
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
    }

    // 静态内部类 Builder
    public static class Builder {
        private String cpu;
        private String ram;
        private String storage;
        private String gpu;

        public Builder setCPU(String cpu) {
            this.cpu = cpu;
            return this;
        }

        public Builder setRAM(String ram) {
            this.ram = ram;
            return this;
        }

        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder setGPU(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }


    public void showConfig() {
        System.out.println("CPU: " + cpu);
        System.out.println("RAM: " + ram);
        System.out.println("Storage: " + storage);
        System.out.println("GPU: " + gpu);
    }
}
~~~

~~~java
package com.learn.ssm.chapter2.reflect.builder;

public class Main {
    public static void main(String[] args) {
        Computer builder = new Computer.Builder()
                .setCPU("Intel i9")
                .setRAM("32GB")
                .setStorage("1TB SSD")
                .setGPU("NVIDIA RTX 4090")
                .build();
        builder.showConfig();
        /**
         * CPU: Intel i9
         * RAM: 32GB
         * Storage: 1TB SSD
         * GPU: NVIDIA RTX 4090
         */
    }
}
~~~


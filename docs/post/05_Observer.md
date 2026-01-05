---
title: 1️⃣观察者模式
lang: zh-CN
author: fireworks99
date: '2025-04-18'
---



# 观察者模式

[[toc]]

## 被观察者

~~~java
package com.learn.ssm.chapter2.reflect.observer;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Observer;

public class ProductList extends Observable {

    private List<String> products = null;//产品列表

    private static ProductList instance;//此类的唯一实例(这里体现了单例模式)

    private ProductList() {}//构建方法私有化(不能在外部任意new实例，保证了单例)

    // get唯一实例
    public static ProductList getInstance() {
        if(instance == null) {
            instance = new ProductList();
            instance.products = new ArrayList<String>();
        }
        return instance;
    }

    // 增加一个观察者
    // Observable.addObserver(Observer observer)

    // 被观察者发生更新
    public void addProduct(String newProduct) {
        products.add(newProduct);
        System.out.println("产品列表新增了产品：" + newProduct);

        /**
         * 告知观察者当前被观察者发生了变化
         * Java的Observable类的notifyObservers方法会检查一个布尔值changed，
         * setChanged()就是把这个值设为true的。
         */
        this.setChanged();

        /**
         * 检查changed变量，如果为true，
         * 则遍历所有通过 addObserver(...) 注册进来的观察者，
         * 然后调用它们的 update(...) 方法，并把 newProduct 作为参数传给它们。
         * 调用clearChanged将changed置为false
         */
        this.notifyObservers(newProduct);
    }
}
~~~



## 观察者1

~~~java
package com.learn.ssm.chapter2.reflect.observer;

import java.util.Observable;
import java.util.Observer;

public class TaoBaoObserver implements Observer {
    @Override
    public void update(Observable o, Object product) {
        String newProduct = (String) product;
        System.out.println("发送新产品【" + newProduct + "】同步到淘宝商城");
    }
}
~~~



## 观察者2

~~~java
package com.learn.ssm.chapter2.reflect.observer;

import java.util.Observable;
import java.util.Observer;

public class JingDongObserver implements Observer {
    @Override
    public void update(Observable o, Object product) {
        String newProduct = (String) product;
        System.out.println("发送新产品【" + newProduct + "】同步到京东商城");
    }
}
~~~



## 主程序

~~~java
package com.learn.ssm.chapter2.reflect.observer;

public class Main {
    public static void main(String[] args) {
        ProductList observable = ProductList.getInstance();

        TaoBaoObserver taoBaoObserver = new TaoBaoObserver();
        observable.addObserver(taoBaoObserver);

        JingDongObserver jingDongObserver = new JingDongObserver();
        observable.addObserver(jingDongObserver);

        observable.addProduct("RedMi Note9 Pro");
        /**
         * 产品列表新增了产品：RedMi Note9 Pro
         * 发送新产品【RedMi Note9 Pro】同步到京东商城
         * 发送新产品【RedMi Note9 Pro】同步到淘宝商城
         */
    }
}
~~~



## 总结

观察者模式像订阅公众号一样：

**没有观察者模式：**

- 你每天主动去检查喜欢的公众号有没有更新
- 你要记住所有你关注的公众号
- 有时候忘了检查，就错过重要消息
- **太累了，需要主动去问**

**有观察者模式：**

- 你点击"关注"按钮
- 然后就不用管了
- 公众号一发新文章，自动推送到你微信
- **你不用主动去问，消息自动来找你**

> **让被观察者（公众号）在状态变化时，自动通知所有观察者（粉丝），观察者不用主动去查询状态变化**

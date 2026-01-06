---
title: 3-Bean
lang: zh-CN
author: fireworks99
date: '2026-01-06'
---

[[toc]]

## 1.Bean是什么

* Bean是Java对象
* Bean由Spring容器进行实例化、组装和管理

| 对比维度     | Spring Bean                                  | 普通 Java 对象（POJO）               |
| ------------ | -------------------------------------------- | ------------------------------------ |
| 对象创建     | Spring 容器通过 **反射** 创建                | `new` 关键字手动创建                 |
| 创建时机     | 容器启动时或首次使用时（懒加载）             | 代码执行到 `new` 时                  |
| 依赖获取     | **依赖注入（DI）**：自动注入                 | 手动 `new` 或传参                    |
| 对象组装     | 容器负责装配对象关系                         | 开发者自己组装                       |
| 生命周期管理 | 容器完整托管（创建 → 初始化 → 销毁）         | JVM 管理内存，逻辑生命周期由代码控制 |
| 单例管理     | 默认单例（容器级别）                         | 需手写单例模式                       |
| 作用域       | singleton / prototype / request / session 等 | 只能靠代码逻辑区分                   |
| 配置方式     | 注解 / XML / Java Config                     | 纯 Java 代码                         |
| 解耦能力     | **高**（面向接口编程）                       | **低**（强依赖具体实现）             |
| 可测试性     | 易于 Mock / 替换实现                         | 测试成本高                           |
| 资源释放     | 自动回调 `@PreDestroy`                       | 手动关闭、易遗漏                     |

## 2.Bean的生命周期

Spring容器负责Bean的完整生命周期：

> 实例化 → 属性注入 → 初始化 → 使用 → 销毁

## 3.创建Bean的方式

~~~java
// 方式1：注解（最常用）
@Component  // 通用组件
@Controller // Web控制器
@Service    // 业务逻辑层
@Repository // 数据访问层

// 方式2：Java配置类
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new DataSource();
    }
}

// 方式3：XML配置（传统方式）
// <bean id="userService" class="com.example.UserService"/>
~~~

## 4.使用Bean（依赖注入）

示例1

~~~java
@Service
public class OrderService {
    // Spring自动注入UserService Bean
    @Autowired
    private UserService userService;
    
    // 构造器注入（推荐）
    public OrderService(UserService userService) {
        this.userService = userService;
    }
}
~~~

示例2

~~~java
// 容器启动时：
1. 加载配置（XML/注解/Java配置）
2. 解析Bean定义（BeanDefinition）
3. 实例化Bean（调用构造器）
4. 注入依赖（@Autowired等）
5. 初始化Bean（@PostConstruct）
6. 将Bean放入容器Map中管理
7. 处理循环依赖等问题
8. 应用就绪，提供Bean查找服务

// 使用示例：
@RestController
public class MyController {
    // 容器启动时已经准备好了这个Bean
    @Autowired
    private MyService service;  // ← 从容器的Map中取出
}
~~~

## 5.Bean的作用域

Spring提供多种作用域：

- **Singleton**（默认）：整个应用只有一个实例
- **Prototype**：每次请求都创建新实例
- **Request**：每个HTTP请求一个实例（Web）
- **Session**：每个HTTP会话一个实例（Web）
- **Application**：整个ServletContext生命周期

## 6.Bean的意义

- **控制反转（IoC）**：将对象创建的控制权交给容器
- **依赖管理**：自动处理对象间的依赖关系
- **配置集中化**：便于管理和维护
- **促进松耦合**：面向接口编程，易于测试
- **生命周期管理**：统一的初始化和销毁机制

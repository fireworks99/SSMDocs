# Hello, SSM!

读《Java EE互联网轻量级框架整合开发 SSM框架（Spring MVC + Spring + Mybatis）和Redis实现》而作的笔记。



::: tip
Spring MVC 是 Spring 框架中的一个基于模型-视图-控制器（MVC）设计模式的 Web 应用开发框架，用于实现请求分发、业务处理和页面渲染的分离。
:::

::: warning
Spring 是一个开源的轻量级Java开发框架，提供了全面的基础设施支持，帮助开发者更简单地构建高效、松耦合的企业级应用。
:::

::: danger
MyBatis 是一款优秀的持久层框架，通过 XML 或注解方式将 SQL 语句与 Java 方法映射，实现对数据库的操作。Mybatis的本质是Java对数据库的操作。
:::

::: details
SSM 是由 Spring MVC、Spring 和 MyBatis 组成的主流 Java Web 开发框架组合，实现了表现层（Controller层）、业务逻辑层（Service层）、和持久层（DAO层）的分层开发。
:::



~~~
  前端生态              vs         Java后端生态
---------                        ------------
JavaScript语言          →        Java语言 + JVM
TypeScript (JS超集)     →        Kotlin (JVM语言)
  ↓                                  ↓
Vue/React/Angular       →        Spring Framework
(UI框架/库)                      (企业级框架)
  ↓                                  ↓
Vue CLI/CRA             →        Spring Boot
(项目脚手架)                     (项目快速启动器)
  ↓                                  ↓
Vite/Webpack            →        Maven/Gradle
(构建工具)                       (构建工具)
  ↓                                  ↓
Axios                   →        Spring RestTemplate / WebClient
(HTTP客户端)                     (HTTP客户端)
  ↓                                  ↓
Vue Router              →        Spring MVC
(路由)                           (Web层)
  ↓                                  ↓
Pinia/Vuex              →        Spring Data / JPA
(状态管理)                       (数据访问)
~~~



<SSMIntro />

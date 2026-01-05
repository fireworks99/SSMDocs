---
title: JDBC and ORM
lang: zh-CN
author: fireworks99
date: '2026-01-05'
---

[[toc]]

![JDBC ORM](img/JDBC.drawio.svg)



## JDBC

**JDBC** 是 **Java Database Connectivity** 的缩写，是 **Java 访问关系型数据库的标准 API**。

> **JDBC = Java 程序与数据库之间的“通用翻译官 / 规范接口”**

###  ①.为什么需要 JDBC？

不同数据库（MySQL / Oracle / PostgreSQL）**协议不同、语法细节不同**，
如果 Java 直接对接数据库会非常麻烦。

JDBC 的作用就是：

- Java **只认 JDBC 接口**
- 各数据库厂商 **实现 JDBC 驱动**
- 程序 **不用关心底层数据库差异**

```
Java 程序
   ↓ JDBC API
数据库驱动（MySQL / Oracle / PG）
   ↓
数据库
```

------

###  ②.JDBC 能做什么？

JDBC 允许 Java 程序：

- 连接数据库
- 执行 SQL（CRUD）
- 调用存储过程
- 管理事务
- 处理结果集

------

###  ③.JDBC 的核心组成

#### (1).Driver（驱动）

- 数据库厂商提供
- 负责和数据库“说话”

```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

（JDBC 4 以后一般自动加载）

------

#### (2).Connection（连接）

代表一次数据库连接：

```java
Connection conn = DriverManager.getConnection(
    url, username, password
);
```

------

#### (3).Statement / PreparedStatement / CallableStatement

Statement（不推荐）

```java
Statement stmt = conn.createStatement();
stmt.executeQuery("SELECT * FROM t_user");
```

❌ SQL 注入风险

------

PreparedStatement（最常用）

```java
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM t_user WHERE id = ?"
);
ps.setLong(1, 1L);
```

✔ 防 SQL 注入
✔ 性能更好（预编译）

------

CallableStatement（存储过程）

```java
CallableStatement cs =
    conn.prepareCall("{call get_user_count(?)}");
```

------

#### (4).ResultSet（结果集）

```java
ResultSet rs = ps.executeQuery();
while (rs.next()) {
    rs.getLong("id");
    rs.getString("username");
}
```

------

### ④.一个完整 JDBC 示例

```java
Connection conn = null;
PreparedStatement ps = null;
ResultSet rs = null;

try {
    conn = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/test",
        "root", "123456"
    );

    ps = conn.prepareStatement(
        "SELECT id, username FROM t_user WHERE id = ?"
    );
    ps.setLong(1, 1L);

    rs = ps.executeQuery();

    while (rs.next()) {
        System.out.println(rs.getString("username"));
    }
} finally {
    rs.close();
    ps.close();
    conn.close();
}
```

**代码冗长、易出错、资源管理麻烦**

------

### ⑤.JDBC 的事务管理

```java
conn.setAutoCommit(false);

ps.executeUpdate(...);
ps.executeUpdate(...);

conn.commit();
```

出错：

```java
conn.rollback();
```

------

### ⑥.JDBC 的缺点

| 问题       | 说明              |
| ---------- | ----------------- |
| SQL 写死   | 可读性差          |
| 模板代码多 | try-catch + close |
| 手动映射   | ResultSet → 对象  |
| 难维护     | 大量重复代码      |

**ORM 框架就是为了解决这些问题**

------

### ⑦.JDBC 与 MyBatis / Spring 的关系

JDBC vs MyBatis

| JDBC            | MyBatis       |
| --------------- | ------------- |
| 低层 API        | 封装 JDBC     |
| 手写 SQL + 映射 | 自动映射      |
| 手动事务        | 可交给 Spring |
| 易出错          | 更安全        |

**MyBatis 底层依然是 JDBC**

------

Spring JDBC / MyBatis / JPA 的层级

```
Spring Transaction
       ↓
MyBatis / JPA / JdbcTemplate
       ↓
JDBC
       ↓
数据库驱动
```

------

### ⑧.总结

> **JDBC 是 Java 访问数据库的底层标准 API，
> MyBatis、JPA、Spring JDBC 本质上都是对 JDBC 的封装。**

------





## ORM

**ORM** 是 **Object-Relational Mapping（对象关系映射）** 的缩写。

> **ORM = 把“数据库的表”映射成“程序里的对象”，
> 让你用操作对象的方式来操作数据库。**

------

### ①.ORM诞生背景

**面向对象世界** 和 **关系型数据库世界** 天然不一致。

| 面向对象（Java） | 关系型数据库（MySQL） |
| ---------------- | --------------------- |
| 类（Class）      | 表（Table）           |
| 对象（Object）   | 行（Row）             |
| 属性（Field）    | 列（Column）          |
| 继承、多态       | 没有                  |
| 引用关系         | 外键                  |

ORM 的作用就是：
**在这两个世界之间搭一座桥**

------

### ②.ORM 做了什么？

#### 1️⃣ 表 ↔ 类

```sql
t_user
class User {
    Long id;
    String username;
}
```

------

#### 2️⃣ 行 ↔ 对象

```sql
id | username
1  | Tom
User user = new User(1, "Tom");
```

------

#### 3️⃣ CRUD ↔ 对象操作

没有 ORM（JDBC）

```java
ResultSet rs = ps.executeQuery();
User u = new User();
u.setId(rs.getLong("id"));
```

有 ORM

```java
User u = userMapper.getById(1L);
```

------

### ③.常见 ORM 框架

(Java里的)

| 框架         | 特点         |
| ------------ | ------------ |
| Hibernate    | 全自动 ORM   |
| JPA          | ORM 规范     |
| MyBatis      | 半自动 ORM   |
| MyBatis-Plus | MyBatis 增强 |

------

### ④.MyBatis is ORM？

> **Mybatis是“半自动 ORM”**

| 能力         | MyBatis        |
| ------------ | -------------- |
| 对象映射     | ✅              |
| SQL 自动生成 | ❌（你写）      |
| 关系映射     | ✅（resultMap） |
| 缓存         | ✅              |
| 灵活性       | ⭐⭐⭐⭐⭐          |

**你控制 SQL，MyBatis 负责映射**

------

### ⑤.全自动 vs 半自动

| 对比项   | Hibernate / JPA | MyBatis  |
| -------- | --------------- | -------- |
| SQL 控制 | ❌               | ✅        |
| 学习成本 | 高              | 低       |
| 复杂 SQL | 痛苦            | 友好     |
| 性能可控 | 一般            | 高       |
| 适合场景 | 标准 CRUD       | 复杂业务 |

------

### ⑥.ORM 的优点

✔ 减少样板代码
✔ 提高开发效率
✔ 面向对象思维
✔ 更易维护

------

### ⑦.ORM 的缺点

❌ 抽象层过厚
❌ 复杂 SQL 难写
❌ 性能不可控（不当使用）
❌ 不适合极端性能场景

------

### ⑧.ORM应用场景

适合

- 业务系统
- CRUD 为主
- 中小型项目

不适合

- 超复杂报表
- 极致性能场景
- 数据库强绑定逻辑

------

### ⑨.总结

> **ORM 是让程序员“用对象思维操作数据库”的技术，
> 本质是对象世界与关系世界的桥梁。**


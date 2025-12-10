---
title: 映射器
lang: zh-CN
author: fireworks99
date: '2025-12-10'
---

# 映射器

[[toc]]



## 1.概述

~~~xml
<mapper namespace="xxx">
    <!-- 基础配置类元素 -->
    <cache />
    <cache-ref />
    <parameterMap />

    <!-- SQL 构建元素（可复用 SQL 片段） -->
    <sql />

    <!-- CRUD 元素（核心） -->
    <select />
    <insert />
    <update />
    <delete />

    <!-- 结果映射元素 -->
    <resultMap />
    <result />
    <id />
    <association />
    <collection />
    <discriminator />
</mapper>
~~~

## 2.select

### ①.常用属性

| 属性名            | 说明                                        | 示例                      |
| ----------------- | ------------------------------------------- | ------------------------- |
| **id**            | 对应 Mapper 接口的方法名                    | id="findUserById"         |
| **parameterType** | 入参类型，可写类全路径、别名、Map、基本类型 | parameterType="int"       |
| **resultType**    | 返回类型（对象/基本类型/Map）               | resultType="com.xx.User"  |
| **resultMap**     | 使用自定义映射时使用                        | resultMap="userResultMap" |
| **flushCache**    | 是否刷新缓存（查询默认 false）              | flushCache="false"        |
| **useCache**      | 是否使用二级缓存（默认 true）               | useCache="true"           |
| **timeout**       | 超时毫秒数，少用                            | timeout="5000"            |
| **fetchSize**     | 一次拉取多少条记录                          | fetchSize="100"           |

### ②.多个参数




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

1. Map传参
   * 优点：几乎适应所有场景
   * 缺点：
     * 可读性差
     * 不能限定参数的类型
2. 注解传参
   * 优点：
     * 可读性好
     * 可以限定参数的类型
   * 缺点：参数较多时写起来麻烦
3. Java Bean传参
   * 优点：即使参数多，只需传一个对象
   * 缺点：复杂场景可能另外需要注解传参
4. 混合传参（注解 + Java Bean）
   * 优点：可以应对复杂场景

~~~java
package com.learn.ssm.chapter5.mapper;

import com.learn.ssm.chapter5.pojo.PageParam;
import com.learn.ssm.chapter5.pojo.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RoleMapper {
    public Role getRole(Long id);
    public List<Role> findRolesByMap(Map<String,Object> parameterMap);
    public List<Role> findRolesByAnnotation(@Param("roleName") String roleName, @Param("note") String note) ;
    public List<Role> findRolesByBean(Role role);
    public List<Role> findByMix(@Param("params") Role role, @Param("page") PageParam PageParam) ;
}
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.ssm.chapter5.mapper.RoleMapper">

    <select id="getRole" parameterType="long" resultType="role5">
        select id, role_name as roleName, note from t_role where id = #{id}
    </select>

    <select id="findRolesByMap" parameterType="map" resultType="role5">
        select id, role_name as roleName, note from t_role
        where role_name like concat('%', #{roleName}, '%')
        and note like concat('%', #{note}, '%')
    </select>

    <select id="findRolesByAnnotation" resultType="role5">
        select id, role_name as roleName, note from t_role
        where role_name like concat('%', #{roleName}, '%')
        and note like concat('%', #{note}, '%')
    </select>

    <select id="findRolesByBean" parameterType="com.learn.ssm.chapter5.pojo.Role" resultType="role5">
        select id, role_name as roleName, note from t_role
        where role_name like concat('%', #{roleName}, '%')
        and note like concat('%', #{note}, '%')
    </select>

    <select id="findByMix" resultType="role5">
        <bind name="offset" value="(page.pageNo - 1) * page.pageSize"/>
        select id, role_name as roleName, note from t_role
        where role_name like concat('%', #{params.roleName}, '%')
        and note like concat('%', #{params.note}, '%')
        limit #{offset}, #{page.pageSize}
    </select>

</mapper>
~~~

~~~java
package com.learn.ssm.chapter5.main;

import com.learn.ssm.chapter5.pojo.PageParam;
import com.learn.ssm.chapter5.pojo.Role;
import com.learn.ssm.chapter5.utils.SqlSessionFactoryUtils;
import com.learn.ssm.chapter5.mapper.RoleMapper;
import org.apache.ibatis.session.SqlSession;

import java.util.HashMap;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        SqlSession sqlSession = null;

        try {
            sqlSession = SqlSessionFactoryUtils.openSqlSession();
            RoleMapper roleMapper = sqlSession.getMapper(RoleMapper.class);
            Role role = roleMapper.getRole(11L);
            System.out.println(role.toString());

            // 1.Map传参
            HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("roleName", "is");
            hashMap.put("note", "st");
            List<Role> rolesByMap = roleMapper.findRolesByMap(hashMap);
            System.out.println(rolesByMap.toString());

            // 2.注解传参
            List<Role> rolesByAnnotation = roleMapper.findRolesByAnnotation("is", "st");
            System.out.println(rolesByAnnotation.toString());

            // 3.Java Bean传参
            Role role1 = new Role();
            role1.setRoleName("is");
            role1.setNote("st");
            List<Role> rolesByBean = roleMapper.findRolesByBean(role1);
            System.out.println(rolesByBean.toString());

            // 4.混合传参(注解 + Java Bean)
            PageParam pageParam = new PageParam();
            pageParam.setPageNo(1);
            pageParam.setPageSize(1);
            List<Role> byMix = roleMapper.findByMix(role1, pageParam);
            System.out.println(byMix);

            //提交事务
            sqlSession.commit();
        } catch (Exception e) {
            if(sqlSession != null) {
                sqlSession.rollback();
            }
            e.printStackTrace();
        } finally {
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
~~~

### ③resultMap

> 有了resultType，为什么还需要resultMap？

使用 `resultType` 时，MyBatis 会直接把 **column → property** 自动转换，但这只适合：

- 字段名和属性名一致
- 一张表对应一个简单实体类
- 没有关联对象

但真实业务远比这个复杂。

当出现以下情况时，就必须使用 `resultMap`：

1. 多表联查
2. 一对多映射
3. 嵌套查询
4. 多态

User.java

~~~java
package com.learn.ssm.chapter5.pojo;

public class User {
    private Long id;
    private String username;
    private String password;
    private Integer sex;
    private Dept dept;
    // ...
}
~~~

Dept.java

~~~java
package com.learn.ssm.chapter5.pojo;

public class Dept {
    private Long id;
    private String name;
    // ...
}
~~~

UserMapper.java

~~~java
package com.learn.ssm.chapter5.mapper;

import com.learn.ssm.chapter5.pojo.User;

public interface UserMapper {
    User getUser(Long id);
}
~~~

UserMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.ssm.chapter5.mapper.UserMapper">

    <resultMap id="userMap" type="user5">
        <id column="id" property="id"/>
        <result column="username" property="username"/>

        <association property="dept" javaType="dept">
            <id column="deptId" property="id"/>
            <result column="deptName" property="name"/>
        </association>
    </resultMap>

    <select id="getUser" parameterType="long" resultMap="userMap">
        select u.id, u.username, d.id as deptId, d.name as deptName
        from t_user u join dept d on u.deptId = d.id where u.id = #{id}
    </select>

</mapper>
~~~

Main.java

~~~java
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
User user1 = userMapper.getUser(1L);
User user2 = userMapper.getUser(2L);
System.out.println(user1.toString());//User{id=1, username='admin', password='null', sex=null, deptId=1, deptName='技术部'}
System.out.println(user2.toString());//User{id=2, username='user', password='null', sex=null, deptId=2, deptName='业务部'}
~~~

### ④.RowBounds

Mybatis自带的**逻辑分页（内存分页）**，而非**物理分页（数据库分页）**。

~~~java
public interface UserMapper {
    User getUser(Long id);
    List<User> getUserRowBounds(RowBounds rowBounds);
}
~~~

~~~xml
<select id="getUser" parameterType="long" resultMap="userMap">
    select u.id, u.username, d.id as deptId, d.name as deptName
    from t_user u join dept d on u.deptId = d.id where u.id = #{id}
</select>

<select id="getUserRowBounds" resultMap="userMap">
    select u.id, u.username, d.id as deptId, d.name as deptName
    from t_user u join dept d on u.deptId = d.id
</select>
~~~

~~~java
// RowBounds
RowBounds rowBounds = new RowBounds(1, 1);
List<User> users = userMapper.getUserRowBounds(rowBounds);
System.out.println(users.toString());
~~~

![RowBounds](img/Rowbounds.png)

* 数据库分页：效果最佳
* 后端逻辑分页：
  * 若数据库与后端程序属于同一服务器，则从数据库取出数据后占用大量内存。
  * 若数据库与后端程序不在同一服务器，则数据库所在服务器占用大量内存，且传输大量数据，且占用后端服务器大量内存。
* 前端逻辑分页：
  * 传输大量数据，用户等待时间长，体验差。



## 3.insert

### ①.主键回填

> 什么是主键回填：MyBatis 中 `insert` 拿到数据库自动生成的主键（自增 id）

应用场景：insert 一条记录 => 拿到生成的 id => 用这个 id 插入子表 / 关联表

三种方式：

1. useGeneratedKeys
2. `<selectKey>`
3. Mapper 方法直接返回主键（原本返回影响行数）（不推荐）

~~~java
package com.learn.ssm.chapter5.mapper;

import com.learn.ssm.chapter5.pojo.Dept;

public interface DeptMapper {
    int insertDept(Dept dept);
    int insertDept2(Dept dept);
    int insertDeptBefore(Dept dept);
    int insertDeptAfter(Dept dept);
}
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.ssm.chapter5.mapper.DeptMapper">

    <insert id="insertDept" parameterType="dept">
        insert into dept(name) values(#{name})
    </insert>

    <insert id="insertDept2" parameterType="dept" useGeneratedKeys="true" keyProperty="id">
        insert into dept(name) values(#{name})
    </insert>

    <insert id="insertDeptBefore" parameterType="dept">
        <selectKey keyProperty="id" resultType="long" order="BEFORE">
            select if (max(id) = null, 1, max(id) + 3) from dept
        </selectKey>
        insert into dept(id, name) values(#{id}, #{name})
    </insert>

    <insert id="insertDeptAfter" parameterType="dept">
        insert into dept(name) values(#{name})
        <selectKey keyProperty="id" resultType="long" order="AFTER">
            select last_insert_id()
        </selectKey>
    </insert>

</mapper>
~~~

~~~java
// insert
DeptMapper deptMapper = sqlSession.getMapper(DeptMapper.class);
Dept dept = new Dept();
dept.setName("销售部");
deptMapper.insertDept(dept);
System.out.println(dept.toString());//Dept{id=null, name='销售部'}

Dept dept1 = new Dept();
dept1.setName("运维部");
deptMapper.insertDept2(dept1);
System.out.println(dept1.toString());//Dept{id=8, name='运维部'}

Dept deptBefore = new Dept();
deptBefore.setName("Before部");
deptMapper.insertDeptBefore(deptBefore);
System.out.println(deptBefore.toString());//Dept{id=11, name='Before部'}

Dept deptAfter = new Dept();
deptAfter.setName("After部");
deptMapper.insertDeptAfter(deptAfter);
System.out.println(deptAfter.toString());//Dept{id=12, name='After部'}
~~~

### ②自定义主键

上述例子中`insertDeptBefore`通过`selectKey`实现了自定义主键（最大id + 3）


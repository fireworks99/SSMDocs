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



## 4.resultType=map

> `resultType="map"` 是 MyBatis 的“**万金油返回类型**”，
>  适合“不规则结果集”，但不适合“核心业务模型”。

~~~java
List<Map<String,Object>> selectDynamicColumns(@Param("columns") String columns);
~~~

~~~xml
<select id="selectDynamicColumns" resultType="map">
    select ${columns} from t_user
</select>
~~~

~~~java
// Dynamic column + resultType=map
List<Map<String, Object>> list = userMapper.selectDynamicColumns("id,username,deptId");
System.out.println(list);
//[{deptId=1, id=1, username=admin}, {deptId=2, id=2, username=user}]
~~~

这里还用到了动态列，不过它有SQL注入风险，可通过Java层枚举白名单或xml choose白名单来避免。



## 5.sql

`<sql>` 标签用于 **定义可重用的 SQL 片段**，可以在其他 SQL 语句中通过 `<include>` 引用。

* **不单独执行**，只是“片段”
* 支持 **动态 SQL / 参数**
* 可以减少重复代码，增加可维护性



应用场景：

::: tabs 

@tab 复用列名

~~~xml
<sql id="baseColumns">
    id, username, age
</sql>

<select id="selectAll" resultType="User">
    SELECT <include refid="baseColumns"/> FROM t_user
</select>

<select id="selectById" resultType="User">
    SELECT <include refid="baseColumns"/> FROM t_user WHERE id = #{id}
</select>
~~~

@tab 复用条件

~~~xml
<sql id="userWhere">
    <where>
        <if test="username != null">
            username = #{username}
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
    </where>
</sql>

<select id="selectUser" resultType="User">
    SELECT * FROM t_user
    <include refid="userWhere"/>
</select>
~~~

@tab 复用JOIN

~~~xml
<sql id="joinDept">
    JOIN dept d ON u.dept_id = d.id
</sql>

<select id="selectUserDept" resultType="User">
    SELECT u.id, u.username, d.name AS deptName
    FROM t_user u
    <include refid="joinDept"/>
</select>
~~~

@tab 动态SQL

~~~xml
<sql id="dynamicColumns">
    <if test="includeAge">
        age,
    </if>
    username, id
</sql>

<select id="selectUserDynamic" resultType="User">
    SELECT <include refid="dynamicColumns"/> FROM t_user
</select>
~~~

:::

::: code-tabs 

@tab 复用列名

~~~xml
<sql id="baseColumns">
    id, username, age
</sql>

<select id="selectAll" resultType="User">
    SELECT <include refid="baseColumns"/> FROM t_user
</select>

<select id="selectById" resultType="User">
    SELECT <include refid="baseColumns"/> FROM t_user WHERE id = #{id}
</select>
~~~

@tab 复用条件

~~~xml
<sql id="userWhere">
    <where>
        <if test="username != null">
            username = #{username}
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
    </where>
</sql>

<select id="selectUser" resultType="User">
    SELECT * FROM t_user
    <include refid="userWhere"/>
</select>
~~~

@tab 复用JOIN

~~~xml
<sql id="joinDept">
    JOIN dept d ON u.dept_id = d.id
</sql>

<select id="selectUserDept" resultType="User">
    SELECT u.id, u.username, d.name AS deptName
    FROM t_user u
    <include refid="joinDept"/>
</select>
~~~

@tab 动态SQL

~~~xml
<sql id="dynamicColumns">
    <if test="includeAge">
        age,
    </if>
    username, id
</sql>

<select id="selectUserDynamic" resultType="User">
    SELECT <include refid="dynamicColumns"/> FROM t_user
</select>
~~~

:::



## 6.级联

### ①.示例

![表结构](img/Employee.svg)

~~~sql
use ssm;

CREATE TABLE t_employee (
  id INT(12) NOT NULL AUTO_INCREMENT, 
  real_name VARCHAR(60) NOT NULL, 
  sex INT(2) NOT NULL COMMENT '1-男 0-女',
  birthday DATE NOT NULL,
  mobile VARCHAR(20) NOT NULL, 
  email VARCHAR(60) NOT NULL, 
  POSITION VARCHAR(20) NOT NULL, 
  note VARCHAR (256),
  PRIMARY KEY (id)
);

CREATE TABLE t_employee_task (
  id INT(12) NOT NULL, 
  emp_id INT(12) NOT NULL, 
  task_id INT(12) NOT NULL, 
  task_name VARCHAR(60) NOT NULL, 
  note VARCHAR(256), 
  PRIMARY KEY (id)
);

CREATE TABLE t_female_health_form (
  id INT(12) NOT NULL AUTO_INCREMENT, 
  emp_id INT(12) NOT NULL, 
  heart VARCHAR(64) NOT NULL, 
  liver VARCHAR(64) NOT NULL, 
  spleen VARCHAR(64) NOT NULL, 
  lung VARCHAR(64) NOT NULL, 
  kidney VARCHAR(64) NOT NULL, 
  uterus VARCHAR(64) NOT NULL, 
  note VARCHAR(256), 
  PRIMARY KEY (id)
);

CREATE TABLE t_male_health_form (
  id INT(12) NOT NULL AUTO_INCREMENT, 
  emp_id INT (12) NOT NULL, 
  heart VARCHAR (64) NOT NULL, 
  liver VARCHAR (64) NOT NULL, 
  spleen VARCHAR(64) NOT NULL, 
  lung VARCHAR(64) NOT NULL, 
  kidney VARCHAR(64) NOT NULL, 
  prostate VARCHAR(64) NOT NULL, 
  note VARCHAR(256), 
  PRIMARY KEY (id)
);

CREATE TABLE t_task (
  id INT(12) NOT NULL, 
  title VARCHAR(60) NOT NULL, 
  context VARCHAR(256) NOT NULL, 
  note VARCHAR(256), 
  PRIMARY KEY (id)
);

create table t_work_card (
  id INT (12) not null auto_increment, 
  emp_id INT (12) not null, 
  real_name VARCHAR(60) not null, 
  department VARCHAR(20) not null, 
  mobile VARCHAR(20) not null, 
  position VARCHAR(30) not null, 
  note VARCHAR(256), 
  primary key (id)
);

ALTER TABLE t_employee_task 
ADD CONSTRAINT FK_Reference_4 FOREIGN KEY(emp_id) REFERENCES t_employee(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE t_employee_task 
ADD CONSTRAINT FK_Reference_8 FOREIGN KEY(task_id) REFERENCES t_task(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE t_female_health_form 
ADD CONSTRAINT FK_Reference_5 FOREIGN KEY(emp_id) REFERENCES t_employee(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE t_male_health_form 
ADD CONSTRAINT FK_Reference_6 FOREIGN KEY(emp_id) REFERENCES t_employee(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE t_work_card 
ADD CONSTRAINT FK_Reference_7 FOREIGN KEY(emp_id) REFERENCES t_employee(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



INSERT INTO t_employee (real_name, sex, birthday, mobile, email, POSITION, note)
VALUES
('张三', 1, '1990-05-12', '13800000001', 'zhangsan@test.com', '工程师', '技术骨干'),
('李四', 0, '1992-08-20', '13800000002', 'lisi@test.com', '测试工程师', '细心认真'),
('王五', 1, '1988-03-15', '13800000003', 'wangwu@test.com', '项目经理', '负责项目管理');


INSERT INTO t_task (id, title, context, note)
VALUES
(1, '系统开发', '完成核心模块开发', '优先级高'),
(2, '系统测试', '进行功能与性能测试', '需要详细记录'),
(3, '项目管理', '协调团队与进度', '定期汇报');


INSERT INTO t_employee_task (id, emp_id, task_id, task_name, note)
VALUES
(1, 1, 1, '系统开发', '负责后端模块'),
(2, 2, 2, '系统测试', '负责功能测试'),
(3, 3, 3, '项目管理', '整体项目把控');

INSERT INTO t_female_health_form
(emp_id, heart, liver, spleen, lung, kidney, uterus, note)
VALUES
(2, '正常', '正常', '正常', '正常', '正常', '正常', '体检情况良好');


INSERT INTO t_male_health_form
(emp_id, heart, liver, spleen, lung, kidney, prostate, note)
VALUES
(1, '正常', '轻度脂肪肝', '正常', '正常', '正常', '正常', '注意饮食'),
(3, '正常', '正常', '正常', '正常', '正常', '正常', '无异常');

INSERT INTO t_work_card
(emp_id, real_name, department, mobile, position, note)
VALUES
(1, '张三', '研发部', '13800000001', '工程师', '正式员工'),
(2, '李四', '测试部', '13800000002', '测试工程师', '正式员工'),
(3, '王五', '管理部', '13800000003', '项目经理', '部门负责人');
~~~

![文件](img/chapter5_cascade.png)

pojo / Task

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class Task {
    private Long id;
    private String title;
    private String context;
    private String note;

    //getter and setter

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", context='" + context + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / WorkCard

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class WorkCard {
    private Long id;
    private Long empId;
    private String realName;
    private String department;
    private String mobile;
    private String position;
    private String note;

    // getter and setter

    @Override
    public String toString() {
        return "WorkCard{" +
                "id=" + id +
                ", empId=" + empId +
                ", realName='" + realName + '\'' +
                ", department='" + department + '\'' +
                ", mobile='" + mobile + '\'' +
                ", position='" + position + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / HealthForm

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public abstract class HealthForm {
    protected Long id;
    protected Long empId;
    protected String heart;
    protected String liver;
    protected String spleen;
    protected String lung;
    protected String kidney;
    protected String note;

    // getter and setter

    @Override
    public String toString() {
        return "HealthForm{" +
                "id=" + id +
                ", empId=" + empId +
                ", heart='" + heart + '\'' +
                ", liver='" + liver + '\'' +
                ", spleen='" + spleen + '\'' +
                ", lung='" + lung + '\'' +
                ", kidney='" + kidney + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / MaleHealthForm

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class MaleHealthForm extends HealthForm {
    private String prostate;

    public String getProstate() {
        return prostate;
    }

    public void setProstate(String prostate) { this.prostate = prostate; }

    @Override
    public String toString() {
        return "MaleHealthForm{" +
                "id=" + id +
                ", empId=" + empId +
                ", heart='" + heart + '\'' +
                ", liver='" + liver + '\'' +
                ", spleen='" + spleen + '\'' +
                ", lung='" + lung + '\'' +
                ", kidney='" + kidney + '\'' +
                ", prostate='" + prostate + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / FemaleHealthForm

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class FemaleHealthForm extends HealthForm{
    private String uterus;

    public String getUterus() {
        return uterus;
    }

    public void setUterus(String uterus) {
        this.uterus = uterus;
    }

    @Override
    public String toString() {
        return "FemaleHealthForm{" +
                "uterus='" + uterus + '\'' +
                ", id=" + id +
                ", empId=" + empId +
                ", heart='" + heart + '\'' +
                ", liver='" + liver + '\'' +
                ", spleen='" + spleen + '\'' +
                ", lung='" + lung + '\'' +
                ", kidney='" + kidney + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / EmployeeTask

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class EmployeeTask {
    private Long id;
    private Long empId ;
    private Task task = null;
    private String taskName ;
    private String note ;

    // getter and setter

    @Override
    public String toString() {
        return "EmployeeTask{" +
                "id=" + id +
                ", empId=" + empId +
                ", task=" + task +
                ", taskName='" + taskName + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
~~~

pojo / Employee

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

import com.learn.ssm.chapter5_cascade.enumeration.SexEnum;

import java.util.Date;
import java.util.List;

public class Employee {
    private Long id;
    private String realName;
    private SexEnum sex = null;
    private Date birthday;
    private String mobile;
    private String email;
    private String position;
    private String note;
    //工牌按一对一级联
    private WorkCard workCard;
    //雇员任务，一对多级联
    private List<EmployeeTask> employeeTaskList = null;

    private HealthForm healthForm;

    // getter and setter

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", realName='" + realName + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                ", position='" + position + '\'' +
                ", note='" + note + '\'' +
                ", workCard=" + workCard +
                ", employeeTaskList=" + employeeTaskList +
                ", healthForm=" + healthForm +
                '}';
    }
}
~~~

pojo / MaleEmployee

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class MaleEmployee extends Employee {
    private MaleHealthForm maleHealthForm = null ;

    public MaleHealthForm getMaleHealthForm() {
        return maleHealthForm;
    }

    public void setMaleHealthForm(MaleHealthForm maleHealthForm) {
        this.maleHealthForm = maleHealthForm;
    }
}
~~~

pojo / FemaleEmployee

~~~java
package com.learn.ssm.chapter5_cascade.pojo;

public class FemaleEmployee extends Employee {
    private FemaleHealthForm femaleHealthForm = null;

    public FemaleHealthForm getFemaleHealthForm() {
        return femaleHealthForm;
    }

    public void setFemaleHealthForm(FemaleHealthForm femaleHealthForm) {
        this.femaleHealthForm = femaleHealthForm;
    }
}
~~~

mapper / EmployeeTaskMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.ssm.chapter5_cascade.mapper.EmployeeTaskMapper">

    <resultMap type="com.learn.ssm.chapter5_cascade.pojo.EmployeeTask" id="EmployeeTaskMap">
        <id column="id" property="id"/>
        <result column="emp_id" property="empId"/>
        <result column="task_name" property="taskName"/>
        <result column="note" property="note"/>
        <association property="task" column="task_id"
                     select="com.learn.ssm.chapter5_cascade.mapper.TaskMapper.getTaskById"/>
    </resultMap>

    <select id="getEmployeeTaskByEmpId" resultMap="EmployeeTaskMap">
        select id, emp_id, task_name, task_id, note from t_employee_task
        where emp_id = #{empId}
    </select>

</mapper>
~~~

**association**标签表示一对一级联，select属性表示采用哪个方法来拿到结果，column属性表示SQL中的列，同时作为参数传给select属性对应的方法（如果这里有多个参数，则需要通过逗号隔开），property属性表示将结果映射到POJO哪个属性上。



mapper / EmployeeMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.learn.ssm.chapter5_cascade.mapper.EmployeeMapper">

    <resultMap type="com.learn.ssm.chapter5_cascade.pojo.Employee" id="employee">
        <id column="id" property="id"/>
        <result column="real_name" property="realName"/>
        <result column="sex" property="sex" typeHandler="com.learn.ssm.chapter5_cascade.typeHandler.SexEnumTypeHandler"/>
        <result column="birthday" property="birthday"/>
        <result column="mobile" property="mobile"/>
        <result column="email" property="email"/>
        <result column="position" property="position"/>
        <result column="note" property="note"/>

        <association property="workCard" column="id" select="com.learn.ssm.chapter5_cascade.mapper.WorkCardMapper.getWorkCardByEmpId"/>

        <collection property="employeeTaskList" column="id" select="com.learn.ssm.chapter5_cascade.mapper.EmployeeTaskMapper.getEmployeeTaskByEmpId"/>

        <discriminator javaType="long" column="sex">
            <case value="1" resultMap="maleHealthFormMapper"/>
            <case value="0" resultMap="femaleHealthFormMapper"/>
        </discriminator>
    </resultMap>

    <resultMap type="com.learn.ssm.chapter5_cascade.pojo.FemaleEmployee" id="femaleHealthFormMapper" extends="employee">
        <association property="healthForm" column="id" select="com.learn.ssm.chapter5_cascade.mapper.FemaleHealthFormMapper.getFemaleHealthForm"/>
    </resultMap>

    <resultMap type="com.learn.ssm.chapter5_cascade.pojo.MaleEmployee" id="maleHealthFormMapper" extends="employee">
        <association property="healthForm" column="id" select="com.learn.ssm.chapter5_cascade.mapper.MaleHealthFormMapper.getMaleHealthForm"/>
    </resultMap>

    <select id="getEmployee" parameterType="long" resultMap="employee">
        select id, real_name as realName, sex, birthday, mobile, email, position, note from t_employee where id = #{id}
    </select>

</mapper>
~~~

**collection**标签表示一对多级联，select属性表示采用哪个方法来拿到结果，column属性表示SQL中的列，同时作为参数传给select属性对应的方法（如果这里有多个参数，则需要通过逗号隔开），property属性表示将结果映射到POJO哪个属性上。

**discriminator**标签表示**鉴别器**，column属性表示采用SQL中的哪一列来鉴别，而它的子元素case，则用于进行区分，类似于Java的switch...case..语句。而resultMap属性表示采用哪个ResultMap去映射，比如sex=1，则使用maleHealthFormMapper进行映射。

resultMap的extends属性的作用是：继承另一个 resultMap 的配置。 

输出：

~~~shell
DEBUG 2025-12-31 14:10:38,034 org.apache.ibatis.logging.LogFactory: Logging initialized using 'class org.apache.ibatis.logging.slf4j.Slf4jImpl' adapter.
DEBUG 2025-12-31 14:10:38,120 org.apache.ibatis.datasource.pooled.PooledDataSource: PooledDataSource forcefully closed/removed all connections.
DEBUG 2025-12-31 14:10:38,121 org.apache.ibatis.datasource.pooled.PooledDataSource: PooledDataSource forcefully closed/removed all connections.
DEBUG 2025-12-31 14:10:38,121 org.apache.ibatis.datasource.pooled.PooledDataSource: PooledDataSource forcefully closed/removed all connections.
DEBUG 2025-12-31 14:10:38,121 org.apache.ibatis.datasource.pooled.PooledDataSource: PooledDataSource forcefully closed/removed all connections.
DEBUG 2025-12-31 14:10:38,249 org.apache.ibatis.transaction.jdbc.JdbcTransaction: Opening JDBC Connection
DEBUG 2025-12-31 14:10:38,751 org.apache.ibatis.datasource.pooled.PooledDataSource: Created connection 1389509050.
DEBUG 2025-12-31 14:10:38,751 org.apache.ibatis.transaction.jdbc.JdbcTransaction: Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@52d239ba]
DEBUG 2025-12-31 14:10:38,752 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==>  Preparing: select id, real_name as realName, sex, birthday, mobile, email, position, note from t_employee where id = ? 
DEBUG 2025-12-31 14:10:38,773 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==> Parameters: 1(Long)
DEBUG 2025-12-31 14:10:38,787 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id as empId, heart, liver, spleen, lung, kidney, prostate, note from t_male_health_form where emp_id = ? 
DEBUG 2025-12-31 14:10:38,787 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 1(Long)
DEBUG 2025-12-31 14:10:38,790 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,792 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: SELECT id, emp_id as empId, real_name as realName, department, mobile, position, note FROM t_work_card where emp_id = ? 
DEBUG 2025-12-31 14:10:38,792 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 1(Long)
DEBUG 2025-12-31 14:10:38,794 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,795 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id, task_name, task_id, note from t_employee_task where emp_id = ? 
DEBUG 2025-12-31 14:10:38,795 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 1(Integer)
DEBUG 2025-12-31 14:10:38,796 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======>  Preparing: select id, title, context, note from t_task where id = ? 
DEBUG 2025-12-31 14:10:38,796 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======> Parameters: 1(Long)
DEBUG 2025-12-31 14:10:38,797 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <======      Total: 1
DEBUG 2025-12-31 14:10:38,797 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,797 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <==      Total: 1
 INFO 2025-12-31 14:10:38,799 com.learn.ssm.chapter5_cascade.main.Main: Employee{id=1, realName='张三', sex=MALE, birthday=Sat May 12 00:00:00 CDT 1990, mobile='13800000001', email='zhangsan@test.com', position='工程师', note='技术骨干', workCard=WorkCard{id=1, empId=1, realName='张三', department='研发部', mobile='13800000001', position='工程师', note='正式员工'}, employeeTaskList=[EmployeeTask{id=1, empId=1, task=Task{id=1, title='系统开发', context='完成核心模块开发', note='优先级高'}, taskName='系统开发', note='负责后端模块'}], healthForm=MaleHealthForm{id=1, empId=1, heart='正常', liver='轻度脂肪肝', spleen='正常', lung='正常', kidney='正常', prostate='正常', note='注意饮食'}}
DEBUG 2025-12-31 14:10:38,799 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==>  Preparing: select id, real_name as realName, sex, birthday, mobile, email, position, note from t_employee where id = ? 
DEBUG 2025-12-31 14:10:38,799 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==> Parameters: 2(Long)
DEBUG 2025-12-31 14:10:38,800 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id as empId, heart, liver, spleen, lung, kidney, uterus, note from t_female_health_form where emp_id = ? 
DEBUG 2025-12-31 14:10:38,800 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 2(Long)
DEBUG 2025-12-31 14:10:38,802 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,802 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: SELECT id, emp_id as empId, real_name as realName, department, mobile, position, note FROM t_work_card where emp_id = ? 
DEBUG 2025-12-31 14:10:38,803 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 2(Long)
DEBUG 2025-12-31 14:10:38,804 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,804 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id, task_name, task_id, note from t_employee_task where emp_id = ? 
DEBUG 2025-12-31 14:10:38,804 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 2(Integer)
DEBUG 2025-12-31 14:10:38,805 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======>  Preparing: select id, title, context, note from t_task where id = ? 
DEBUG 2025-12-31 14:10:38,805 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======> Parameters: 2(Long)
DEBUG 2025-12-31 14:10:38,805 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <======      Total: 1
DEBUG 2025-12-31 14:10:38,806 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,806 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <==      Total: 1
 INFO 2025-12-31 14:10:38,806 com.learn.ssm.chapter5_cascade.main.Main: Employee{id=2, realName='李四', sex=FEMALE, birthday=Thu Aug 20 00:00:00 CST 1992, mobile='13800000002', email='lisi@test.com', position='测试工程师', note='细心认真', workCard=WorkCard{id=2, empId=2, realName='李四', department='测试部', mobile='13800000002', position='测试工程师', note='正式员工'}, employeeTaskList=[EmployeeTask{id=2, empId=2, task=Task{id=2, title='系统测试', context='进行功能与性能测试', note='需要详细记录'}, taskName='系统测试', note='负责功能测试'}], healthForm=FemaleHealthForm{uterus='正常', id=1, empId=2, heart='正常', liver='正常', spleen='正常', lung='正常', kidney='正常', note='体检情况良好'}}
DEBUG 2025-12-31 14:10:38,806 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==>  Preparing: select id, real_name as realName, sex, birthday, mobile, email, position, note from t_employee where id = ? 
DEBUG 2025-12-31 14:10:38,806 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ==> Parameters: 3(Long)
DEBUG 2025-12-31 14:10:38,807 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id as empId, heart, liver, spleen, lung, kidney, prostate, note from t_male_health_form where emp_id = ? 
DEBUG 2025-12-31 14:10:38,807 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 3(Long)
DEBUG 2025-12-31 14:10:38,808 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,808 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: SELECT id, emp_id as empId, real_name as realName, department, mobile, position, note FROM t_work_card where emp_id = ? 
DEBUG 2025-12-31 14:10:38,808 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 3(Long)
DEBUG 2025-12-31 14:10:38,809 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,809 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====>  Preparing: select id, emp_id, task_name, task_id, note from t_employee_task where emp_id = ? 
DEBUG 2025-12-31 14:10:38,809 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ====> Parameters: 3(Integer)
DEBUG 2025-12-31 14:10:38,810 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======>  Preparing: select id, title, context, note from t_task where id = ? 
DEBUG 2025-12-31 14:10:38,810 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: ======> Parameters: 3(Long)
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <======      Total: 1
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <====      Total: 1
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.logging.jdbc.BaseJdbcLogger: <==      Total: 1
 INFO 2025-12-31 14:10:38,811 com.learn.ssm.chapter5_cascade.main.Main: Employee{id=3, realName='王五', sex=MALE, birthday=Tue Mar 15 00:00:00 CST 1988, mobile='13800000003', email='wangwu@test.com', position='项目经理', note='负责项目管理', workCard=WorkCard{id=3, empId=3, realName='王五', department='管理部', mobile='13800000003', position='项目经理', note='部门负责人'}, employeeTaskList=[EmployeeTask{id=3, empId=3, task=Task{id=3, title='项目管理', context='协调团队与进度', note='定期汇报'}, taskName='项目管理', note='整体项目把控'}], healthForm=MaleHealthForm{id=2, empId=3, heart='正常', liver='正常', spleen='正常', lung='正常', kidney='正常', prostate='正常', note='无异常'}}
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.transaction.jdbc.JdbcTransaction: Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@52d239ba]
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.transaction.jdbc.JdbcTransaction: Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@52d239ba]
DEBUG 2025-12-31 14:10:38,811 org.apache.ibatis.datasource.pooled.PooledDataSource: Returned connection 1389509050 to pool.

Process finished with exit code 0
~~~

**查询时流程：**

1. 执行 `getEmployee` 查询，使用基础的 `employee` resultMap
2. 根据 `sex` 字段的值（鉴别器 column）决定使用哪个**子 resultMap**
3. 如果是女性（sex=0），使用 `femaleHealthFormMapper`
   - 继承所有 `employee` 的基础映射
   - 额外添加 `healthForm` 关联（女性健康表）
4. 如果是男性（sex=1），使用 `maleHealthFormMapper`
   - 继承所有 `employee` 的基础映射
   - 额外添加 `healthForm` 关联（男性健康表）

**用代码模拟这个过程：**

~~~java
// 模拟 MyBatis 的内部处理逻辑
public Employee processResultSet(ResultSet rs) {
    // 1. 创建基础对象（根据type="Employee"）
    Employee emp = new Employee();
    
    // 2. 应用employee resultMap的所有基础映射
    emp.setId(rs.getLong("id"));
    emp.setRealName(rs.getString("real_name"));
    emp.setSex(sexTypeHandler.getResult(rs, "sex"));  // 使用TypeHandler转换
    // ... 映射其他基础字段
    
    // 3. 应用关联映射（workCard等）
    emp.setWorkCard(workCardMapper.getWorkCard(emp.getId()));
    
    // 4. 鉴别器判断
    long sexValue = rs.getLong("sex");
    if (sexValue == 1) {
        // 5. 转换为子类
        MaleEmployee maleEmp = new MaleEmployee();
        BeanUtils.copyProperties(emp, maleEmp);  // 复制所有已映射的属性
        
        // 6. 应用maleHealthFormMapper的额外配置
        maleEmp.setHealthForm(maleHealthFormMapper.getMaleHealthForm(maleEmp.getId()));
        
        return maleEmp;
    } else if (sexValue == 0) {
        // 同理，处理女性员工
        FemaleEmployee femaleEmp = new FemaleEmployee();
        BeanUtils.copyProperties(emp, femaleEmp);
        femaleEmp.setHealthForm(femaleHealthFormMapper.getFemaleHealthForm(femaleEmp.getId()));
        return femaleEmp;
    }
    
    return emp;  // 如果没有匹配的case，返回基础Employee
}
~~~

**查询开始时使用第一个resultMap（employee），但在处理过程中会根据sex值动态应用后两个resultMap之一，并且后两个resultMap继承了第一个的所有配置，同时添加了特有的健康表关联。**

这是一个**继承 + 多态**的设计模式，不是简单的"切换替换"。



### ②.DTO

级联是一种设计理念，实际工程开发中，若采用级联，则**SQL混乱、性能堪忧、N+1冗余**，所以企业级开发常用**DTO（数据传输对象）**来代替级联。

> DTO 方案 = 可控 SQL + 可预测性能 + 更贴近真实业务（灵活多变）
>
> DTO的思路是：接口要什么数据，就一次性查出来， 用一个 DTO 装好返回。

员工详情 DTO（示例）

```java
public class EmployeeDetailDTO {

    // ===== 员工基本信息 =====
    private Long empId;
    private String realName;
    private Integer sex;
    private Date birthday;
    private String mobile;
    private String email;
    private String position;

    // ===== 工作证 =====
    private String department;

    // ===== 体检信息（统一结构）=====
    private String heart;
    private String liver;
    private String spleen;
    private String lung;
    private String kidney;
    private String special;   // 男：prostate / 女：uterus
    private String healthNote;

    // ===== 任务 =====
    private List<TaskDTO> tasks;
}
```

子 DTO（任务）

```java
public class TaskDTO {
    private Long taskId;
    private String taskName;
    private String context;
}
```

 **DTO 是“为接口量身定制的结构”**。

Mapper：**多次 SQL + 手动组装**

EmployeeMapper.xml

```xml
<select id="getEmployeeBase"
        resultType="com.learn.ssm.chapter5_cascade.dto.EmployeeDetailDTO">
    SELECT
        e.id        AS empId,
        e.real_name AS realName,
        e.sex,
        e.birthday,
        e.mobile,
        e.email,
        e.position,
        wc.department
    FROM t_employee e
    LEFT JOIN t_work_card wc ON wc.emp_id = e.id
    WHERE e.id = #{id}
</select>
```

HealthMapper.xml（统一）

```xml
<select id="getMaleHealth"
        resultType="map">
    SELECT heart, liver, spleen, lung, kidney, prostate AS special, note AS healthNote
    FROM t_male_health_form
    WHERE emp_id = #{id}
</select>

<select id="getFemaleHealth"
        resultType="map">
    SELECT heart, liver, spleen, lung, kidney, uterus AS special, note AS healthNote
    FROM t_female_health_form
    WHERE emp_id = #{id}
</select>
```

TaskMapper.xml

```xml
<select id="getTasksByEmpId"
        resultType="com.learn.ssm.chapter5_cascade.dto.TaskDTO">
    SELECT
        t.id        AS taskId,
        et.task_name AS taskName,
        t.context
    FROM t_employee_task et
    JOIN t_task t ON t.id = et.task_id
    WHERE et.emp_id = #{empId}
</select>
```

Service 层（真正的“组装者”）

```java
EmployeeDetailDTO dto = employeeMapper.getEmployeeBase(id);

if (dto.getSex() == 1) {
    Map<String, Object> health = healthMapper.getMaleHealth(id);
    BeanUtils.copyProperties(health, dto);
} else {
    Map<String, Object> health = healthMapper.getFemaleHealth(id);
    BeanUtils.copyProperties(health, dto);
}

List<TaskDTO> tasks = taskMapper.getTasksByEmpId(id);
dto.setTasks(tasks);
```

DTO 的作用是：

- 不暴露表结构
- 不被实体关系绑架
- 前端想要什么就给什么

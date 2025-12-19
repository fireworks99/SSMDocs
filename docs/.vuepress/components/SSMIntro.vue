<template>
  <div class="ssm-card">
    <h2>SSM 框架交互式介绍</h2>

    <!-- 框架切换 -->
    <div class="tabs">
      <button
        v-for="f in frameworks"
        :key="f.key"
        :class="{ active: current === f.key }"
        @click="current = f.key"
      >
        {{ f.name }}
      </button>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <h3>{{ currentInfo.title }}</h3>
      <p>{{ currentInfo.desc }}</p>

      <ul>
        <li v-for="item in currentInfo.points" :key="item">
          ✔ {{ item }}
        </li>
      </ul>
    </div>

    <!-- 请求流程 -->
    <div class="flow">
      <h4>一次 HTTP 请求在 SSM 中的流转</h4>

      <div class="flow-line">
        <span
          v-for="(step, index) in flowSteps"
          :key="step"
          :class="{ active: index <= flowIndex }"
        >
          {{ step }}
        </span>
      </div>

      <button class="flow-btn" @click="nextStep">
        ▶ 推进流程
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SSMIntro',

  data() {
    return {
      current: 'spring',
      flowIndex: 0,

      frameworks: [
        { key: 'spring', name: 'Spring' },
        { key: 'mvc', name: 'Spring MVC' },
        { key: 'mybatis', name: 'MyBatis' }
      ],

      infoMap: {
        spring: {
          title: 'Spring —— 容器与解耦核心',
          desc: 'Spring 是整个 SSM 的基础，负责对象管理和依赖注入。',
          points: [
            'IOC / DI 管理 Bean 生命周期',
            '解耦 Controller / Service / DAO',
            '统一事务管理（声明式事务）'
          ]
        },
        mvc: {
          title: 'Spring MVC —— Web 层核心',
          desc: 'Spring MVC 负责请求接收、参数绑定与响应返回。',
          points: [
            'DispatcherServlet 统一入口',
            '@Controller / @RequestMapping',
            '参数自动绑定与校验'
          ]
        },
        mybatis: {
          title: 'MyBatis —— 持久层框架',
          desc: 'MyBatis 负责 Java 对象与数据库之间的映射。',
          points: [
            'SQL 与代码分离',
            '动态 SQL',
            'ResultMap / Mapper 接口'
          ]
        }
      },

      flowSteps: [
        '浏览器请求',
        'DispatcherServlet',
        'Controller',
        'Service',
        'Mapper',
        '数据库',
        '返回响应'
      ]
    }
  },

  computed: {
    currentInfo() {
      return this.infoMap[this.current]
    }
  },

  methods: {
    nextStep() {
      if (this.flowIndex < this.flowSteps.length - 1) {
        this.flowIndex++
      } else {
        this.flowIndex = 0
      }
    }
  }
}
</script>

<style scoped>
.ssm-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tabs button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
}

.tabs button.active {
  background: #3b82f6;
  color: #fff;
}

.content {
  margin-bottom: 16px;
}

.flow-line {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}

.flow-line span {
  padding: 4px 8px;
  border-radius: 4px;
  background: #e5e7eb;
  font-size: 12px;
}

.flow-line span.active {
  background: #10b981;
  color: #fff;
}

.flow-btn {
  margin-top: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #6366f1;
  color: #fff;
  cursor: pointer;
}
</style>

<template><div><h1 id="web开发历史" tabindex="-1"><a class="header-anchor" href="#web开发历史"><span>Web开发历史</span></a></h1>
<nav class="table-of-contents"><ul><li><router-link to="#web-技术与框架演进-按时间">Web 技术与框架演进（按时间）</router-link><ul><li><router-link to="#_1990s-—-web-1-0-静态页面时代">1990s — Web 1.0 静态页面时代</router-link></li><li><router-link to="#_2000s-—-web-2-0-动态交互、mvc">2000s — Web 2.0 动态交互、MVC</router-link></li><li><router-link to="#_2010s-—-前后端分离与-spa-盛行">2010s — 前后端分离与 SPA 盛行</router-link></li><li><router-link to="#_2020s-—-现代化工具与全栈趋势">2020s — 现代化工具与全栈趋势</router-link></li></ul></li><li><router-link to="#技术出现的动因与影响总结">技术出现的动因与影响总结</router-link></li></ul></nav>
<h2 id="web-技术与框架演进-按时间" tabindex="-1"><a class="header-anchor" href="#web-技术与框架演进-按时间"><span>Web 技术与框架演进（按时间）</span></a></h2>
<h3 id="_1990s-—-web-1-0-静态页面时代" tabindex="-1"><a class="header-anchor" href="#_1990s-—-web-1-0-静态页面时代"><span>1990s — Web 1.0 静态页面时代</span></a></h3>
<ul>
<li>
<p><strong>1991 - HTML 诞生</strong></p>
<ul>
<li><em>背景：</em> Tim Berners-Lee 发明 HTML，作为 Web 的标记语言，用于创建超文本页面。</li>
<li><em>影响：</em> 开启了网页开发时代，页面是完全静态的。</li>
</ul>
</li>
<li>
<p><strong>1995 - JavaScript 诞生</strong></p>
<ul>
<li><em>背景：</em> Netscape 为浏览器添加脚本语言，使网页具有交互能力。</li>
<li><em>影响：</em> 静态页面变得可动态交互。</li>
</ul>
</li>
<li>
<p><strong>1996 - CSS 发布</strong></p>
<ul>
<li><em>背景：</em> 为了解决 HTML 中样式与结构混杂的问题，引入了层叠样式表。</li>
<li><em>影响：</em> 分离结构和样式，前端展示能力增强。</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_2000s-—-web-2-0-动态交互、mvc" tabindex="-1"><a class="header-anchor" href="#_2000s-—-web-2-0-动态交互、mvc"><span>2000s — Web 2.0 动态交互、MVC</span></a></h3>
<ul>
<li>
<p><strong>1999 - Ajax 概念提出</strong></p>
<ul>
<li><em>背景：</em> 为了避免页面刷新，实现局部异步更新。</li>
<li><em>影响：</em> 后来成为现代前端异步交互核心方式。</li>
</ul>
</li>
<li>
<p><strong>1999 - Java Servlet / JSP / Java EE 发布</strong></p>
<ul>
<li><em>背景：</em> 为了构建动态网页内容，Java 推出服务端组件。</li>
<li><em>影响：</em> Java 成为早期企业 Web 后端主流语言。</li>
</ul>
</li>
<li>
<p><strong>2002 - Spring Framework 发布</strong></p>
<ul>
<li><em>背景：</em> 为了解决 Java EE 笨重、配置复杂的问题，Rod Johnson 推出轻量级框架。</li>
<li><em>影响：</em> 推动后端开发走向 IoC / AOP、解耦模块。</li>
</ul>
</li>
<li>
<p><strong>2003 - SpringMVC 发布</strong></p>
<ul>
<li>
<p><strong>背景</strong>：</p>
<ul>
<li>
<p>Java EE 中的 Servlet、JSP 技术开发复杂、耦合度高，不易维护；</p>
</li>
<li>
<p>Spring 框架提出了 IOC 与 AOP 编程模型，为了支持 Web 开发，推出 SpringMVC 模块。</p>
</li>
</ul>
</li>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>实现了基于注解和配置的解耦式 Web 控制器；</p>
</li>
<li>
<p>成为 Java Web MVC 开发的主流方案；</p>
</li>
<li>
<p>构成 Spring 全家桶的重要基础之一。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2006 - jQuery 发布</strong></p>
<ul>
<li><em>背景：</em> 原生 JavaScript 操作 DOM 复杂且兼容性差，jQuery 封装 DOM 与 Ajax 操作。</li>
<li><em>影响：</em> 成为 Web 2.0 时代最主流的前端库。</li>
</ul>
</li>
<li>
<p><strong>2008 - Google V8 引擎发布</strong></p>
<ul>
<li><em>背景：</em> 提升 JavaScript 执行效率，推动 JS 性能飞跃。</li>
<li><em>影响：</em> 为 Node.js 和前端框架打下基础。</li>
</ul>
</li>
<li>
<p><strong>2009 - Node.js 发布</strong></p>
<ul>
<li><em>背景：</em> 将 JavaScript 引入服务器端，实现前后端统一语言开发。</li>
<li><em>影响：</em> 开启全栈 JavaScript 开发模式，NPM 生态崛起。</li>
</ul>
</li>
<li>
<p><strong>2009 - Redis 发布</strong></p>
<ul>
<li>
<p><strong>背景</strong>：</p>
<ul>
<li>在 Web 应用中，频繁访问数据库会成为性能瓶颈；</li>
<li>传统关系型数据库在处理高并发读写、缓存、计数器等场景下效率不足；</li>
<li>Redis 由 Salvatore Sanfilippo 为了解决 LLOOGG.com 的性能问题而开发。</li>
</ul>
</li>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>成为现代后端架构的核心组件之一；</li>
<li>被广泛用于缓存、排行榜、会话存储、发布订阅、分布式锁等场景；</li>
<li>带动了 NoSQL 技术的发展。</li>
</ul>
</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_2010s-—-前后端分离与-spa-盛行" tabindex="-1"><a class="header-anchor" href="#_2010s-—-前后端分离与-spa-盛行"><span>2010s — 前后端分离与 SPA 盛行</span></a></h3>
<ul>
<li><strong>2010 - MyBatis（前身 iBATIS，2002）</strong>
<ul>
<li><strong>背景</strong>：
<ul>
<li>Hibernate 等 ORM 框架虽然强大但复杂，不适合一些简单或高度定制 SQL 场景；</li>
<li>开发者希望更灵活地编写 SQL，同时避免 JDBC 冗余代码。</li>
</ul>
</li>
<li><strong>影响</strong>：
<ul>
<li>简化数据库访问层开发，支持自定义 SQL 和对象映射；</li>
<li>灵活度高，适用于中小型项目和对 SQL 可控性要求高的系统；</li>
<li>与 Spring 框架深度整合，成为 Java 持久层开发常用选择。</li>
</ul>
</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>2010 - AngularJS（Google）发布</strong></p>
<ul>
<li><em>背景：</em> 为了构建大型前端应用，提出 MVC 模型、数据绑定等理念。</li>
<li><em>影响：</em> 开启“前端框架”时代，但学习曲线较陡。</li>
</ul>
</li>
<li>
<p><strong>2013 - React（Facebook）发布</strong></p>
<ul>
<li><em>背景：</em> 为了解决复杂 UI 状态管理问题，引入组件化、虚拟 DOM。</li>
<li><em>影响：</em> 几乎重塑了前端开发范式，组件驱动成为主流。</li>
</ul>
</li>
<li>
<p><strong>2014 - Vue.js （尤雨溪）发布</strong></p>
<ul>
<li><em>背景：</em> 受 Angular 与 React 启发，目标是更轻量、更易上手。</li>
<li><em>影响：</em> 中国及亚洲市场快速普及，成为主流框架之一。</li>
</ul>
</li>
<li>
<p><strong>2014 - Spring Boot 发布</strong></p>
<ul>
<li><strong>背景</strong>：
<ul>
<li>Spring 虽功能强大，但配置复杂、上手门槛高；</li>
<li>为了提升开发效率，简化项目搭建流程，Pivotal 推出了 Spring Boot。</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>提供“约定优于配置”的自动化开发体验；</p>
</li>
<li>
<p>内嵌 Tomcat/Jetty，项目无需外部容器即可运行；</p>
</li>
<li>
<p>成为现代 Java 后端项目的默认标准架构。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2015 - Spring Cloud 发布</strong></p>
<ul>
<li><strong>背景</strong>：
<ul>
<li>微服务架构兴起，系统需要支持服务注册发现、配置中心、负载均衡、链路追踪等分布式基础设施；</li>
<li>Spring Boot 单体系统架构无法满足微服务需求。</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>提供一整套微服务解决方案（与 Netflix OSS、Consul、Alibaba Cloud 等生态集成）；</p>
</li>
<li>
<p>降低企业落地微服务的门槛；</p>
</li>
<li>
<p>推动 Java 后端从单体系统向云原生架构过渡。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2015 - Redux 发布</strong></p>
<ul>
<li><em>背景：</em> React 组件间状态管理混乱，需要统一管理机制。</li>
<li><em>影响：</em> Flux 架构推广，影响 Vuex、Pinia 等状态管理库。</li>
</ul>
</li>
<li>
<p><strong>2015 - ES6（ECMAScript 2015）发布</strong></p>
<ul>
<li><em>背景：</em> JavaScript 长期缺乏模块化等现代语言特性。</li>
<li><em>影响：</em> 引入 <code v-pre>let/const</code>, 模块、类、箭头函数等，现代 JS 成熟。</li>
</ul>
</li>
<li>
<p><strong>2016 - Vue 2 发布</strong></p>
<ul>
<li><em>背景：</em> 更强的响应式系统、更好性能、更稳定。</li>
<li><em>影响：</em> 在国内外得到广泛使用，配合 Vue CLI 形成生态。</li>
</ul>
</li>
<li>
<p><strong>2016 - Nuxt.js 发布</strong></p>
<ul>
<li><em>背景：</em> Vue 用于构建 SSR（服务端渲染）或静态站点（优化 SEO）。</li>
<li><em>影响：</em> 解决 SPA SEO 问题，推动前端向“全栈前端”进化。</li>
</ul>
</li>
<li>
<p><strong>2016 - Next.js 发布</strong></p>
<ul>
<li><em>背景：</em> 类似于 Nuxt.js，为 React 提供 SSR 与 SSG 支持。</li>
<li><em>影响：</em> 成为 React SSR 项目的首选，广泛用于企业级项目。</li>
</ul>
</li>
<li>
<p><strong>2013~2017 - Docker 普及与容器化兴起</strong></p>
<ul>
<li>
<p><strong>背景</strong>：</p>
<ul>
<li>
<p>软件开发过程中常见“在我机器上没问题”的环境不一致问题；</p>
</li>
<li>
<p>虚拟机过于臃肿，启动慢，资源占用高；</p>
</li>
<li>
<p>Docker 采用容器技术，实现轻量级隔离，极大简化部署流程。</p>
</li>
</ul>
</li>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>推动 DevOps、CI/CD、微服务等现代开发流程的兴起；</p>
</li>
<li>
<p>成为部署和交付应用的事实标准；</p>
</li>
<li>
<p>促成了容器生态的繁荣（如镜像仓库、监控、编排等）。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2015 - Kubernetes（K8s）发布（Google）</strong></p>
<ul>
<li>
<p><strong>背景</strong>：</p>
<ul>
<li>使用 Docker 部署后，运维管理仍然繁琐（扩容、负载均衡、故障恢复等）；</li>
<li>Google 总结 Borg 系统经验，推出 Kubernetes 作为开源容器编排平台。</li>
</ul>
</li>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>成为容器集群调度的标准平台；</p>
</li>
<li>
<p>促进云原生（Cloud Native）架构落地；</p>
</li>
<li>
<p>与 DevOps、微服务、Serverless 技术深度融合。</p>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<hr>
<h3 id="_2020s-—-现代化工具与全栈趋势" tabindex="-1"><a class="header-anchor" href="#_2020s-—-现代化工具与全栈趋势"><span>2020s — 现代化工具与全栈趋势</span></a></h3>
<ul>
<li>
<p><strong>2020 - Vue 3 发布</strong></p>
<ul>
<li><em>背景：</em> 为了更好组织逻辑、更强性能，支持 TypeScript。</li>
<li><em>影响：</em> 提升可维护性与开发体验，Composition API 推动大型项目发展。</li>
</ul>
</li>
<li>
<p><strong>2020 - Vite 发布</strong></p>
<ul>
<li><em>背景：</em> Webpack 构建缓慢，Vite 用 ES Module + 原生 HMR 提升开发体验。</li>
<li><em>影响：</em> 快速构建工具成为新标准。</li>
</ul>
</li>
<li>
<p><strong>2022 - Nuxt 3 发布</strong></p>
<ul>
<li><em>背景：</em> Node.js 存在启动慢、模块系统旧等问题。</li>
<li><em>影响：</em> 以更快启动、更现代特性挑战 Node.js 地位。</li>
</ul>
</li>
<li>
<p><strong>2022 - Next.js 13 发布</strong></p>
<ul>
<li><strong>背景</strong>：
<ul>
<li>React 社区希望实现“前端+后端+部署”一体化（全栈统一）；</li>
<li>原有 Next.js 页面路由和数据获取方式难以满足现代需求；</li>
<li>Next.js 13 引入全新的 App Router、布局系统、Server Component、边缘渲染。</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>推动 React 全栈开发进一步标准化；</p>
</li>
<li>
<p>加速边缘计算（Edge Rendering）与动态网页性能优化的落地；</p>
</li>
<li>
<p>成为企业构建现代 Web 应用的首选方案之一。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2021 - Deno（Node.js 作者新作）</strong></p>
<ul>
<li><strong>背景</strong>：
<ul>
<li>Node.js 虽成功但早期设计存在历史包袱（如回调地狱、依赖管理、权限控制等）；</li>
<li>Node.js 创始人 Ryan Dahl 为了修复这些问题，重新设计并开发 Deno；</li>
<li>使用 TypeScript 支持原生运行、安全沙箱、去中心化依赖导入等特性。</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>启发开发者思考 JavaScript 运行时的现代化设计；</p>
</li>
<li>
<p>成为“安全的、现代的 JS/TS 运行时”代表；</p>
</li>
<li>
<p>逐渐用于边缘函数、脚本工具、Serverless 函数等场景。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>2022 - Bun 发布</strong></p>
<ul>
<li><strong>背景</strong>：
<ul>
<li>Node.js 和 npm 性能有限，生态复杂且启动慢；</li>
<li>JavaScript 工具链（打包器、包管理器、测试器）碎片化；</li>
<li>Bun 由 Jarred Sumner 使用 Zig 语言开发，目标是打造<strong>一体化高性能 JS 运行时</strong>。</li>
</ul>
</li>
</ul>
<ul>
<li>
<p><strong>影响</strong>：</p>
<ul>
<li>
<p>提供超快的运行速度（内置 bundler、transpiler、test runner、npm client）；</p>
</li>
<li>
<p>逐渐挑战 Node.js 与 Deno 的运行时地位；</p>
</li>
<li>
<p>推动 JavaScript 开发生态的性能革新与整合。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>全栈框架（Fullstack Framework）</strong></p>
<ul>
<li><em>如：Nuxt 3、Next 13+、Remix、SvelteKit、Astro</em></li>
<li><em>背景：</em> 将“前端框架 + 路由 + SSR + API Server”集于一身，提升效率。</li>
<li><em>影响：</em> 前端工程师掌握后端接口编写能力，全栈趋势加强。</li>
</ul>
</li>
</ul>
<hr>
<h2 id="技术出现的动因与影响总结" tabindex="-1"><a class="header-anchor" href="#技术出现的动因与影响总结"><span>技术出现的动因与影响总结</span></a></h2>
<table>
<thead>
<tr>
<th>技术/框架</th>
<th>出现时间</th>
<th>诞生背景</th>
<th>影响</th>
</tr>
</thead>
<tbody>
<tr>
<td>HTML</td>
<td>1991</td>
<td>创建网页结构</td>
<td>万维网基础</td>
</tr>
<tr>
<td>CSS</td>
<td>1996</td>
<td>样式与结构分离</td>
<td>美化网页</td>
</tr>
<tr>
<td>JavaScript</td>
<td>1995</td>
<td>网页交互</td>
<td>网页动态行为</td>
</tr>
<tr>
<td>Ajax</td>
<td>1999</td>
<td>局部更新需求</td>
<td>无刷新交互</td>
</tr>
<tr>
<td>jQuery</td>
<td>2006</td>
<td>DOM 操作复杂</td>
<td>简化前端开发</td>
</tr>
<tr>
<td>JavaWeb (Servlet/JSP)</td>
<td>1999</td>
<td>后端动态网页</td>
<td>Java 企业开发流行</td>
</tr>
<tr>
<td>Spring</td>
<td>2002</td>
<td>Java EE 复杂</td>
<td>解耦后端逻辑</td>
</tr>
<tr>
<td>Node.js</td>
<td>2009</td>
<td>JS 服务端化</td>
<td>全栈 JS 诞生</td>
</tr>
<tr>
<td>Redis</td>
<td>2009</td>
<td>高速缓存需求</td>
<td>提升访问效率</td>
</tr>
<tr>
<td>Docker</td>
<td>2013</td>
<td>环境不一致</td>
<td>容器化部署标准</td>
</tr>
<tr>
<td>Kubernetes</td>
<td>2015</td>
<td>容器管理难</td>
<td>自动化运维利器</td>
</tr>
<tr>
<td>AngularJS</td>
<td>2010</td>
<td>构建大型 SPA</td>
<td>前端 MVC 框架</td>
</tr>
<tr>
<td>React</td>
<td>2013</td>
<td>UI 状态复杂</td>
<td>组件化 + 虚拟 DOM</td>
</tr>
<tr>
<td>Vue.js</td>
<td>2014</td>
<td>更易用框架</td>
<td>中国开发者主流框架</td>
</tr>
<tr>
<td>Redux</td>
<td>2015</td>
<td>状态混乱</td>
<td>统一状态管理</td>
</tr>
<tr>
<td>Nuxt.js</td>
<td>2016</td>
<td>Vue SEO 问题</td>
<td>Vue SSR 解决方案</td>
</tr>
<tr>
<td>Next.js</td>
<td>2016</td>
<td>React SEO 问题</td>
<td>React SSR/全栈框架</td>
</tr>
<tr>
<td>Vite</td>
<td>2020</td>
<td>构建缓慢</td>
<td>快速原型开发</td>
</tr>
<tr>
<td>Vue 3</td>
<td>2020</td>
<td>性能优化 + TS</td>
<td>新一代 Vue 生态核心</td>
</tr>
</tbody>
</table>
</div></template>



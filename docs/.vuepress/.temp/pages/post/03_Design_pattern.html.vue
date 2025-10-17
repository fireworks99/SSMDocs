<template><div><h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式"><span>设计模式</span></a></h1>
<nav class="table-of-contents"><ul><li><router-link to="#按目的分为三大类">按目的分为三大类</router-link></li><li><router-link to="#_23种设计模式">23种设计模式</router-link></li><li><router-link to="#记忆小技巧">记忆小技巧</router-link></li><li><router-link to="#原则-solid-五大原则">原则：SOLID 五大原则</router-link></li></ul></nav>
<h2 id="按目的分为三大类" tabindex="-1"><a class="header-anchor" href="#按目的分为三大类"><span>按目的分为三大类</span></a></h2>
<table>
<thead>
<tr>
<th>分类</th>
<th>中文名</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>创建型（Creational）</strong></td>
<td>创建对象的模式</td>
<td>主要关注对象的创建过程，封装了对象的实例化过程，使其与使用方式分离。</td>
</tr>
<tr>
<td><strong>结构型（Structural）</strong></td>
<td>组装类或对象的模式</td>
<td>关注类和对象的组合方式，用来创建更大结构的灵活解决方案。</td>
</tr>
<tr>
<td><strong>行为型（Behavioral）</strong></td>
<td>对象间通信和职责分配的模式</td>
<td>关注对象之间的通信、职责划分、算法封装等行为层面的实现。</td>
</tr>
</tbody>
</table>
<h2 id="_23种设计模式" tabindex="-1"><a class="header-anchor" href="#_23种设计模式"><span>23种设计模式</span></a></h2>
<table>
<thead>
<tr>
<th>分类</th>
<th>模式名称（中文）</th>
<th>模式名称（英文）</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>创建型</strong></td>
<td><strong>单例模式</strong></td>
<td>Singleton</td>
</tr>
<tr>
<td></td>
<td><strong>工厂方法模式</strong></td>
<td>Factory Method</td>
</tr>
<tr>
<td></td>
<td>抽象工厂模式</td>
<td>Abstract Factory</td>
</tr>
<tr>
<td></td>
<td><strong>建造者模式</strong></td>
<td>Builder</td>
</tr>
<tr>
<td></td>
<td>原型模式</td>
<td>Prototype</td>
</tr>
<tr>
<td><strong>结构型</strong></td>
<td>适配器模式</td>
<td>Adapter</td>
</tr>
<tr>
<td></td>
<td>装饰器模式</td>
<td>Decorator</td>
</tr>
<tr>
<td></td>
<td><strong>代理模式</strong></td>
<td>Proxy</td>
</tr>
<tr>
<td></td>
<td>外观模式</td>
<td>Facade</td>
</tr>
<tr>
<td></td>
<td>桥接模式</td>
<td>Bridge</td>
</tr>
<tr>
<td></td>
<td>组合模式</td>
<td>Composite</td>
</tr>
<tr>
<td></td>
<td>享元模式</td>
<td>Flyweight</td>
</tr>
<tr>
<td><strong>行为型</strong></td>
<td><strong>观察者模式</strong></td>
<td>Observer</td>
</tr>
<tr>
<td></td>
<td>策略模式</td>
<td>Strategy</td>
</tr>
<tr>
<td></td>
<td>状态模式</td>
<td>State</td>
</tr>
<tr>
<td></td>
<td><strong>责任链模式</strong></td>
<td>Chain of Responsibility</td>
</tr>
<tr>
<td></td>
<td>命令模式</td>
<td>Command</td>
</tr>
<tr>
<td></td>
<td>模板方法模式</td>
<td>Template Method</td>
</tr>
<tr>
<td></td>
<td>访问者模式</td>
<td>Visitor</td>
</tr>
<tr>
<td></td>
<td>解释器模式</td>
<td>Interpreter</td>
</tr>
<tr>
<td></td>
<td>备忘录模式</td>
<td>Memento</td>
</tr>
<tr>
<td></td>
<td>中介者模式</td>
<td>Mediator</td>
</tr>
<tr>
<td></td>
<td>迭代器模式</td>
<td>Iterator</td>
</tr>
</tbody>
</table>
<h2 id="记忆小技巧" tabindex="-1"><a class="header-anchor" href="#记忆小技巧"><span>记忆小技巧</span></a></h2>
<ul>
<li><strong>创建型</strong> 关注“怎么创建对象”，像“造房子”：工厂、建造者、原型。</li>
<li><strong>结构型</strong> 关注“怎么组合结构”，像“装修”：装饰器、桥接、外观。</li>
<li><strong>行为型</strong> 关注“怎么协作交互”，像“管理”：策略、命令、观察者等。</li>
</ul>
<h2 id="原则-solid-五大原则" tabindex="-1"><a class="header-anchor" href="#原则-solid-五大原则"><span>原则：SOLID 五大原则</span></a></h2>
<table>
<thead>
<tr>
<th>原则</th>
<th>英文名</th>
<th>核心思想</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>S：单一职责原则 (SRP)</strong></td>
<td>Single Responsibility Principle</td>
<td>一个类只负责一项职责（变化的原因只有一个）</td>
<td>日志类不应该同时负责“日志记录”和“日志显示”</td>
</tr>
<tr>
<td><strong>O：开闭原则 (OCP)</strong></td>
<td>Open-Closed Principle</td>
<td>对扩展开放，对修改关闭</td>
<td>新增支付方式时，只需增加一个类，而不修改原有逻辑</td>
</tr>
<tr>
<td><strong>L：里氏替换原则 (LSP)</strong></td>
<td>Liskov Substitution Principle</td>
<td>子类必须能替换父类而程序行为不变</td>
<td>“长方形继承正方形”违反此原则</td>
</tr>
<tr>
<td><strong>I：接口隔离原则 (ISP)</strong></td>
<td>Interface Segregation Principle</td>
<td>不要让类依赖它不需要的接口</td>
<td>将“大接口”拆成多个小接口</td>
</tr>
<tr>
<td><strong>D：依赖倒置原则 (DIP)</strong></td>
<td>Dependency Inversion Principle</td>
<td>依赖抽象，不依赖具体实现</td>
<td>使用接口或抽象类作为依赖注入点</td>
</tr>
</tbody>
</table>
<p>了解更多信息，可查阅<a href="https://www.runoob.com/design-pattern/design-pattern-intro.html" target="_blank" rel="noopener noreferrer">菜鸟教程</a>。</p>
</div></template>



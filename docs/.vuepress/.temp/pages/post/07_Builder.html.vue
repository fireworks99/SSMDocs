<template><div><h1 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式"><span>建造者模式</span></a></h1>
<nav class="table-of-contents"><ul><li><router-link to="#传统方式-vs-建造者模式">传统方式 vs 建造者模式</router-link></li><li><router-link to="#不使用建造者模式">不使用建造者模式</router-link></li><li><router-link to="#使用建造者模式">使用建造者模式</router-link></li><li><router-link to="#总结">总结</router-link></li></ul></nav>
<h2 id="传统方式-vs-建造者模式" tabindex="-1"><a class="header-anchor" href="#传统方式-vs-建造者模式"><span>传统方式 vs 建造者模式</span></a></h2>
<table>
<thead>
<tr>
<th>对比维度</th>
<th>传统构建方式</th>
<th>建造者模式</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>对象创建方式</strong></td>
<td>使用构造函数或 <code v-pre>setter</code> 方法</td>
<td>使用链式 <code v-pre>Builder</code> 类构建对象</td>
</tr>
<tr>
<td><strong>适合场景</strong></td>
<td>简单对象，参数较少</td>
<td>复杂对象，参数多且可选组合多样</td>
</tr>
<tr>
<td><strong>可读性</strong></td>
<td>差，参数过多时调用容易出错</td>
<td>高，链式调用清晰明了</td>
</tr>
<tr>
<td><strong>灵活性</strong></td>
<td>低，构造函数固定或需要多个重载</td>
<td>高，可自由组合构建</td>
</tr>
<tr>
<td><strong>代码扩展性</strong></td>
<td>差，添加参数需改多个构造方法</td>
<td>好，只需修改 <code v-pre>Builder</code></td>
</tr>
<tr>
<td><strong>线程安全性</strong></td>
<td>一般需额外处理</td>
<td><code v-pre>Builder</code> 可封装成不可变对象，便于控制</td>
</tr>
<tr>
<td><strong>对象是否可变</strong></td>
<td>常为可变对象（有 <code v-pre>set</code> 方法）</td>
<td>可生成不可变对象（没有 <code v-pre>set</code> 方法）</td>
</tr>
<tr>
<td><strong>构造逻辑封装</strong></td>
<td>分散在构造函数或外部</td>
<td>集中在 <code v-pre>Builder</code> 中，逻辑清晰</td>
</tr>
<tr>
<td><strong>构造时校验能力</strong></td>
<td>通常需要外部判断</td>
<td>可以在 <code v-pre>build()</code> 中集中校验</td>
</tr>
</tbody>
</table>
<h2 id="不使用建造者模式" tabindex="-1"><a class="header-anchor" href="#不使用建造者模式"><span>不使用建造者模式</span></a></h2>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>builder</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> ram<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> storage<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> gpu<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token class-name">String</span> cpu<span class="token punctuation">,</span> <span class="token class-name">String</span> ram<span class="token punctuation">,</span> <span class="token class-name">String</span> storage<span class="token punctuation">,</span> <span class="token class-name">String</span> gpu<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>cpu <span class="token operator">=</span> cpu<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>ram <span class="token operator">=</span> ram<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>storage <span class="token operator">=</span> storage<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>gpu <span class="token operator">=</span> gpu<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"CPU: "</span> <span class="token operator">+</span> cpu<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"RAM: "</span> <span class="token operator">+</span> ram<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Storage: "</span> <span class="token operator">+</span> storage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"GPU: "</span> <span class="token operator">+</span> gpu<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>builder</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Computer</span> computer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token string">"Intel i9"</span><span class="token punctuation">,</span> <span class="token string">"32GB"</span><span class="token punctuation">,</span> <span class="token string">"1TB SSD"</span><span class="token punctuation">,</span> <span class="token string">"NVIDIA RTX 4090"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        computer<span class="token punctuation">.</span><span class="token function">showConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token doc-comment comment">/**</span>
<span class="line">         * CPU: Intel i9</span>
<span class="line">         * RAM: 32GB</span>
<span class="line">         * Storage: 1TB SSD</span>
<span class="line">         * GPU: NVIDIA RTX 4090</span>
<span class="line">         */</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用建造者模式" tabindex="-1"><a class="header-anchor" href="#使用建造者模式"><span>使用建造者模式</span></a></h2>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>builder</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> ram<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> storage<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> gpu<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 构造方法私有，只能通过 Builder 创建</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>cpu <span class="token operator">=</span> builder<span class="token punctuation">.</span>cpu<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>ram <span class="token operator">=</span> builder<span class="token punctuation">.</span>ram<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>storage <span class="token operator">=</span> builder<span class="token punctuation">.</span>storage<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>gpu <span class="token operator">=</span> builder<span class="token punctuation">.</span>gpu<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 静态内部类 Builder</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token class-name">String</span> ram<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token class-name">String</span> storage<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token class-name">String</span> gpu<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setCPU</span><span class="token punctuation">(</span><span class="token class-name">String</span> cpu<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">this</span><span class="token punctuation">.</span>cpu <span class="token operator">=</span> cpu<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setRAM</span><span class="token punctuation">(</span><span class="token class-name">String</span> ram<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">this</span><span class="token punctuation">.</span>ram <span class="token operator">=</span> ram<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setStorage</span><span class="token punctuation">(</span><span class="token class-name">String</span> storage<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">this</span><span class="token punctuation">.</span>storage <span class="token operator">=</span> storage<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setGPU</span><span class="token punctuation">(</span><span class="token class-name">String</span> gpu<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">this</span><span class="token punctuation">.</span>gpu <span class="token operator">=</span> gpu<span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token class-name">Computer</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"CPU: "</span> <span class="token operator">+</span> cpu<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"RAM: "</span> <span class="token operator">+</span> ram<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Storage: "</span> <span class="token operator">+</span> storage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"GPU: "</span> <span class="token operator">+</span> gpu<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>builder</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Computer</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Computer<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">setCPU</span><span class="token punctuation">(</span><span class="token string">"Intel i9"</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">setRAM</span><span class="token punctuation">(</span><span class="token string">"32GB"</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">setStorage</span><span class="token punctuation">(</span><span class="token string">"1TB SSD"</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">setGPU</span><span class="token punctuation">(</span><span class="token string">"NVIDIA RTX 4090"</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        builder<span class="token punctuation">.</span><span class="token function">showConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token doc-comment comment">/**</span>
<span class="line">         * CPU: Intel i9</span>
<span class="line">         * RAM: 32GB</span>
<span class="line">         * Storage: 1TB SSD</span>
<span class="line">         * GPU: NVIDIA RTX 4090</span>
<span class="line">         */</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>优点：如果对象的属性较多，创建实例传参时不需要记住顺序。</p>
</div></template>



<template><div><h1 id="工厂模式与抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式与抽象工厂模式"><span>工厂模式与抽象工厂模式</span></a></h1>
<nav class="table-of-contents"><ul><li><router-link to="#工厂模式">工厂模式</router-link><ul><li><router-link to="#产品接口">产品接口</router-link></li><li><router-link to="#具体产品类">具体产品类</router-link></li><li><router-link to="#工厂类">工厂类</router-link></li><li><router-link to="#主程序">主程序</router-link></li></ul></li><li><router-link to="#抽象工厂模式">抽象工厂模式</router-link><ul><li><router-link to="#产品接口-1">产品接口</router-link></li><li><router-link to="#具体产品类-1">具体产品类</router-link></li><li><router-link to="#工厂接口">工厂接口</router-link></li><li><router-link to="#具体工厂类">具体工厂类</router-link></li><li><router-link to="#主程序-1">主程序</router-link></li></ul></li><li><router-link to="#总结">总结</router-link><ul><li><router-link to="#工厂模式-1">工厂模式</router-link></li><li><router-link to="#抽象工厂模式-1">抽象工厂模式</router-link></li></ul></li></ul></nav>
<h2 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式"><span>工厂模式</span></a></h2>
<p><img src="@source/post/img/factory.png" alt="工厂模式"></p>
<h3 id="产品接口" tabindex="-1"><a class="header-anchor" href="#产品接口"><span>产品接口</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="具体产品类" tabindex="-1"><a class="header-anchor" href="#具体产品类"><span>具体产品类</span></a></h3>
<h4 id="产品1" tabindex="-1"><a class="header-anchor" href="#产品1"><span>产品1</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Macbook</span> <span class="token keyword">implements</span> <span class="token class-name">Computer</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Macbook starting..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="产品2" tabindex="-1"><a class="header-anchor" href="#产品2"><span>产品2</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThinkPad</span> <span class="token keyword">implements</span> <span class="token class-name">Computer</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ThinkPad starting..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工厂类" tabindex="-1"><a class="header-anchor" href="#工厂类"><span>工厂类</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ComputerFactory</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Computer</span> <span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"Mac"</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Macbook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"ThinkPad"</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThinkPad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主程序" tabindex="-1"><a class="header-anchor" href="#主程序"><span>主程序</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Computer</span> computer <span class="token operator">=</span> <span class="token class-name">ComputerFactory</span><span class="token punctuation">.</span><span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token string">"Mac"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        computer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Macbook starting...</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式"><span>抽象工厂模式</span></a></h2>
<p><img src="@source/post/img/abstract.png" alt="抽象工厂模式"></p>
<h3 id="产品接口-1" tabindex="-1"><a class="header-anchor" href="#产品接口-1"><span>产品接口</span></a></h3>
<h4 id="设备1" tabindex="-1"><a class="header-anchor" href="#设备1"><span>设备1</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设备2" tabindex="-1"><a class="header-anchor" href="#设备2"><span>设备2</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="具体产品类-1" tabindex="-1"><a class="header-anchor" href="#具体产品类-1"><span>具体产品类</span></a></h3>
<h4 id="品牌1设备1" tabindex="-1"><a class="header-anchor" href="#品牌1设备1"><span>品牌1设备1</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaweiPhone</span> <span class="token keyword">implements</span> <span class="token class-name">Phone</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Huawei calling..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="品牌1设备2" tabindex="-1"><a class="header-anchor" href="#品牌1设备2"><span>品牌1设备2</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaweiComputer</span> <span class="token keyword">implements</span> <span class="token class-name">Computer</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Huawei starting..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="品牌2设备1" tabindex="-1"><a class="header-anchor" href="#品牌2设备1"><span>品牌2设备1</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplePhone</span> <span class="token keyword">implements</span> <span class="token class-name">Phone</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Apple calling..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="品牌2设备2" tabindex="-1"><a class="header-anchor" href="#品牌2设备2"><span>品牌2设备2</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppleComputer</span> <span class="token keyword">implements</span> <span class="token class-name">Computer</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Apple starting..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工厂接口" tabindex="-1"><a class="header-anchor" href="#工厂接口"><span>工厂接口</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ProductFactory</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Phone</span> <span class="token function">createPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token class-name">Computer</span> <span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="具体工厂类" tabindex="-1"><a class="header-anchor" href="#具体工厂类"><span>具体工厂类</span></a></h3>
<h4 id="品牌1工厂" tabindex="-1"><a class="header-anchor" href="#品牌1工厂"><span>品牌1工厂</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HuaweiFactory</span> <span class="token keyword">implements</span> <span class="token class-name">ProductFactory</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Phone</span> <span class="token function">createPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HuaweiPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Computer</span> <span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HuaweiComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="品牌2工厂" tabindex="-1"><a class="header-anchor" href="#品牌2工厂"><span>品牌2工厂</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppleFactory</span> <span class="token keyword">implements</span> <span class="token class-name">ProductFactory</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Phone</span> <span class="token function">createPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ApplePhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">Computer</span> <span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AppleComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主程序-1" tabindex="-1"><a class="header-anchor" href="#主程序-1"><span>主程序</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre v-pre><code class="language-java"><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>learn<span class="token punctuation">.</span>ssm<span class="token punctuation">.</span>chapter2<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span>factory</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ProductFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HuaweiFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">Phone</span> phone <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        phone<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Huawei calling...</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Computer</span> computer1 <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        computer1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Huawei starting...</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<h3 id="工厂模式-1" tabindex="-1"><a class="header-anchor" href="#工厂模式-1"><span>工厂模式</span></a></h3>
<blockquote>
<p>就像你去奶茶店点单</p>
</blockquote>
<p><strong>没有工厂模式的情况：</strong></p>
<ul>
<li>你想喝奶茶，得自己：
<ol>
<li>去找茶叶</li>
<li>去找牛奶</li>
<li>去找糖</li>
<li>自己调配比例</li>
<li>自己煮</li>
</ol>
</li>
<li><strong>太麻烦了，而且如果你不懂配方，根本做不出来</strong></li>
</ul>
<p><strong>有工厂模式的情况：</strong></p>
<ul>
<li>你直接去奶茶店：
<ul>
<li>说&quot;我要一杯珍珠奶茶&quot;</li>
<li>店员给你做好的奶茶</li>
</ul>
</li>
<li><strong>你不用关心怎么做，只要说要什么就行了</strong></li>
</ul>
<p><strong>工厂模式的意义：</strong></p>
<blockquote>
<p><strong>你不用知道对象是怎么创建的，只要告诉工厂&quot;我要什么&quot;，工厂就给你造出来</strong></p>
</blockquote>
<hr>
<h3 id="抽象工厂模式-1" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式-1"><span>抽象工厂模式</span></a></h3>
<blockquote>
<p>就像你买整套家电</p>
</blockquote>
<p><strong>场景：你要装修新房，买一整套家电</strong></p>
<p><strong>没有抽象工厂模式：</strong></p>
<ul>
<li>你去国美买海尔冰箱</li>
<li>去苏宁买格力空调</li>
<li>去京东买小米电视</li>
<li>去实体店买美的洗衣机</li>
<li><strong>结果：每个家电操作方式不同，遥控器一堆，风格也不统一</strong></li>
</ul>
<p><strong>有抽象工厂模式：</strong></p>
<ul>
<li>
<p><strong>方案A</strong>：全部买小米智能家居</p>
<ul>
<li>小米冰箱 + 小米空调 + 小米电视 + 小米洗衣机</li>
<li>全部可以用小爱同学控制，风格统一</li>
</ul>
</li>
<li>
<p><strong>方案B</strong>：全部买海尔智能家居</p>
<ul>
<li>海尔冰箱 + 海尔空调 + 海尔电视 + 海尔洗衣机</li>
<li>全部可以用海尔APP控制</li>
</ul>
</li>
</ul>
<p><strong>抽象工厂模式的意义：</strong></p>
<blockquote>
<p><strong>保证你得到的一整套产品都是相互兼容、风格一致的，不会出现&quot;小米遥控器控制不了海尔空调&quot;的问题</strong></p>
</blockquote>
<p>总结一下，就是单个产品 vs 成套产品的区别。</p>
</div></template>



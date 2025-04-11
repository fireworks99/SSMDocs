---
title: 动态代理模式
lang: zh-CN
author: fireworks99
date: '2025-04-11'
---

# 动态代理模式



Java有多种动态代理技术，比如JDK、CGLIB、Javassist、ASM，其中最常用的动态代理技术有两种：一种是 JDK 动态代理，这是 JDK 自带的功能；另 一种是 CGLIB，这是第三方提供的一种技术。目前 Spring 常用 JDK和CGLIB，而 MyBatis 还使用 Javassist ，无论哪种代理其技术，它们的理念都是相似的。

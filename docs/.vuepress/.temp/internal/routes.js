export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello, SSM!"} }],
  ["/post/01_Java_reflect.html", { loader: () => import(/* webpackChunkName: "post_01_Java_reflect.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/01_Java_reflect.html.js"), meta: {"title":"Java反射技术"} }],
  ["/post/02_Dynamic_proxy.html", { loader: () => import(/* webpackChunkName: "post_02_Dynamic_proxy.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/02_Dynamic_proxy.html.js"), meta: {"title":"动态代理模式"} }],
  ["/post/03_Design_pattern.html", { loader: () => import(/* webpackChunkName: "post_03_Design_pattern.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/03_Design_pattern.html.js"), meta: {"title":"设计模式简介"} }],
  ["/post/04_Responce.html", { loader: () => import(/* webpackChunkName: "post_04_Responce.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/04_Responce.html.js"), meta: {"title":"责任链模式"} }],
  ["/post/05_Observer.html", { loader: () => import(/* webpackChunkName: "post_05_Observer.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/05_Observer.html.js"), meta: {"title":"观察者模式"} }],
  ["/post/06_Factory.html", { loader: () => import(/* webpackChunkName: "post_06_Factory.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/06_Factory.html.js"), meta: {"title":"工厂模式与抽象工厂模式"} }],
  ["/post/07_Builder.html", { loader: () => import(/* webpackChunkName: "post_07_Builder.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/07_Builder.html.js"), meta: {"title":"建造者模式"} }],
  ["/post/08_Web_history.html", { loader: () => import(/* webpackChunkName: "post_08_Web_history.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/08_Web_history.html.js"), meta: {"title":"Web开发历史"} }],
  ["/post/09_Mybatis_core.html", { loader: () => import(/* webpackChunkName: "post_09_Mybatis_core.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/09_Mybatis_core.html.js"), meta: {"title":"Mybatis核心组件"} }],
  ["/post/10_Mybatis_config.html", { loader: () => import(/* webpackChunkName: "post_10_Mybatis_config.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/post/10_Mybatis_config.html.js"), meta: {"title":"Mybatis配置"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Code/SSMDocs/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

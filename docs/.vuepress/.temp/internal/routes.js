export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello, SSM!"} }],
  ["/post/01_Java_reflect.html", { loader: () => import(/* webpackChunkName: "post_01_Java_reflect.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/01_Java_reflect.html.js"), meta: {"title":"Java反射技术"} }],
  ["/post/02_Dynamic_proxy.html", { loader: () => import(/* webpackChunkName: "post_02_Dynamic_proxy.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/02_Dynamic_proxy.html.js"), meta: {"title":"动态代理模式"} }],
  ["/post/03_Design_pattern.html", { loader: () => import(/* webpackChunkName: "post_03_Design_pattern.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/03_Design_pattern.html.js"), meta: {"title":"设计模式简介"} }],
  ["/post/04_Responce.html", { loader: () => import(/* webpackChunkName: "post_04_Responce.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/04_Responce.html.js"), meta: {"title":"责任链模式"} }],
  ["/post/05_Observer.html", { loader: () => import(/* webpackChunkName: "post_05_Observer.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/05_Observer.html.js"), meta: {"title":"观察者模式"} }],
  ["/post/06_Factory.html", { loader: () => import(/* webpackChunkName: "post_06_Factory.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/06_Factory.html.js"), meta: {"title":"工厂模式与抽象工厂模式"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}

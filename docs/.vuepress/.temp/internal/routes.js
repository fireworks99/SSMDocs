export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello, SSM!"} }],
  ["/post/01_Java_reflect.html", { loader: () => import(/* webpackChunkName: "post_01_Java_reflect.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/01_Java_reflect.html.js"), meta: {"title":"Java反射技术"} }],
  ["/post/02_Dynamic_proxy.html", { loader: () => import(/* webpackChunkName: "post_02_Dynamic_proxy.html" */"C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/02_Dynamic_proxy.html.js"), meta: {"title":"动态代理模式"} }],
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

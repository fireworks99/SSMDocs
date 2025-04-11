import comp from "C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/post/02_Dynamic_proxy.html.vue"
const data = JSON.parse("{\"path\":\"/post/02_Dynamic_proxy.html\",\"title\":\"动态代理模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"动态代理模式\",\"lang\":\"zh-CN\",\"author\":\"fireworks99\",\"date\":\"2025-04-11\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"post/02_Dynamic_proxy.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

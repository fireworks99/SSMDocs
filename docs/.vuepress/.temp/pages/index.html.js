import comp from "C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Hello, SSM!\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1744334635000,\"contributors\":[{\"name\":\"fireworks99\",\"username\":\"fireworks99\",\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"commits\":1,\"url\":\"https://github.com/fireworks99\"}],\"changelog\":[{\"hash\":\"5b067c19d6c0a862babfcde14e2353da4673ce0a\",\"time\":1744334635000,\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"author\":\"fireworks99\",\"message\":\"Initial\"}]},\"filePathRelative\":\"README.md\"}")
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

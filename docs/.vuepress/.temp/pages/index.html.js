import comp from "E:/Projects/Code/SSMDocs/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Hello, SSM!\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"git\":{\"updatedTime\":1766114484000,\"contributors\":[{\"name\":\"fireworks99\",\"username\":\"fireworks99\",\"email\":\"2639237361@qq.com\",\"commits\":3,\"url\":\"https://github.com/fireworks99\"}],\"changelog\":[{\"hash\":\"7a9b3748bdb0d88bdaed2651eef1ac2667ccd5ca\",\"time\":1766114484000,\"email\":\"2639237361@qq.com\",\"author\":\"fireworks99\",\"message\":\"'TestDynammic'\"},{\"hash\":\"09503fe579033e65bc105cda40f428cb3abd7e39\",\"time\":1760683894000,\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"author\":\"fireworks99\",\"message\":\"'readme'\"},{\"hash\":\"5b067c19d6c0a862babfcde14e2353da4673ce0a\",\"time\":1744334635000,\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"author\":\"fireworks99\",\"message\":\"Initial\"}]},\"filePathRelative\":\"README.md\"}")
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

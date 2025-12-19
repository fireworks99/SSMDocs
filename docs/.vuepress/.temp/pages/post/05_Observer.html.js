import comp from "E:/Projects/Code/SSMDocs/docs/.vuepress/.temp/pages/post/05_Observer.html.vue"
const data = JSON.parse("{\"path\":\"/post/05_Observer.html\",\"title\":\"观察者模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"观察者模式\",\"lang\":\"zh-CN\",\"author\":\"fireworks99\",\"date\":\"2025-04-18\"},\"git\":{\"updatedTime\":1760601950000,\"contributors\":[{\"name\":\"fireworks99\",\"username\":\"fireworks99\",\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"commits\":2,\"url\":\"https://github.com/fireworks99\"}],\"changelog\":[{\"hash\":\"c16da419fcbcd6bbf5cceb621999cd2521ea522a\",\"time\":1760601950000,\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"author\":\"fireworks99\",\"message\":\"'总结'\"},{\"hash\":\"2222baa47c74da8e8ac44ac0600f4fd1e6d0d7ec\",\"time\":1744965496000,\"email\":\"46671672+fireworks99@users.noreply.github.com\",\"author\":\"fireworks99\",\"message\":\"update factory\"}]},\"filePathRelative\":\"post/05_Observer.md\"}")
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

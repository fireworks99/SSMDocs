export const siteData = JSON.parse("{\"base\":\"/SSMDocs/\",\"lang\":\"zh-CN\",\"title\":\"SSM\",\"description\":\"SSM Exercise\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/SSMDocs/img/favicon.png\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}

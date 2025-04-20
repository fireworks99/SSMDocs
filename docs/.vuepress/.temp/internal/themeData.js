export const themeData = JSON.parse("{\"logo\":\"/img/logo.gif\",\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"selectLanguageName\":\"English\"}},\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"友链\",\"children\":[{\"text\":\"我的博客\",\"link\":\"https://fireworks99.github.io/\"},{\"text\":\"我的Github\",\"link\":\"https://github.com/fireworks99\"}]}],\"sidebar\":[\"/post/01_Java_reflect\",\"/post/02_Dynamic_proxy\",\"/post/03_Design_pattern\",\"/post/04_Responce\",\"/post/05_Observer\",\"/post/06_Factory\",\"/post/07_Builder\"],\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}

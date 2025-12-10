import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'SSM',
  description: 'SSM Exercise',
  base: "/SSMDocs/",

  theme: defaultTheme({
    logo: '/img/logo.gif',
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    navbar: [
      { text: "首页", link: '/' },
      {
        text: "友链", 
        children: [
          { text: "我的博客", link: "https://fireworks99.github.io/" },
          { text: "我的Github", link: "https://github.com/fireworks99" },
        ]
      }
    ],

    sidebar: [
      "/post/01_Java_reflect",
      "/post/02_Dynamic_proxy",
      "/post/03_Design_pattern",
      "/post/04_Responce",
      "/post/05_Observer",
      "/post/06_Factory",
      "/post/07_Builder",
      "/post/08_Web_history",
      "/post/09_Mybatis_core",
      "/post/09_Mybatis_reflect",
      "/post/10_Mybatis_config",
      "/post/11_Mapper"
    ]
  }),

  bundler: viteBundler(),
  plugins: [
    searchPlugin({})
  ]
})

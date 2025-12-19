import { defineClientConfig } from '@vuepress/client'
import SSMIntro from './components/SSMIntro.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('SSMIntro', SSMIntro)
  }
})

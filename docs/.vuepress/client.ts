import { defineClientConfig } from '@vuepress/client'
import SSMIntro from './components/SSMIntro.vue'
import './styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.component('SSMIntro', SSMIntro)
  }
})

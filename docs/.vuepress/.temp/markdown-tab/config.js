import { CodeTabs } from "C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_l7htwol553ed52uqniatpu5dkm/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_l7htwol553ed52uqniatpu5dkm/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/Administrator/Documents/Web_FE/VuePress/ssm-vuepress/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuepress+b_l7htwol553ed52uqniatpu5dkm/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};

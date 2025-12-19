import { CodeTabs } from "E:/Projects/Code/SSMDocs/node_modules/.pnpm/@vuepress+plugin-markdown-t_9da05bc45b844f5a742dfd59349e6cf7/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "E:/Projects/Code/SSMDocs/node_modules/.pnpm/@vuepress+plugin-markdown-t_9da05bc45b844f5a742dfd59349e6cf7/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "E:/Projects/Code/SSMDocs/node_modules/.pnpm/@vuepress+plugin-markdown-t_9da05bc45b844f5a742dfd59349e6cf7/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};

import { GitContributors } from "E:/Projects/Code/SSMDocs/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_39f7c1cb699e016b5d2e10394971cde5/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "E:/Projects/Code/SSMDocs/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_39f7c1cb699e016b5d2e10394971cde5/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};

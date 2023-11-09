import { createApp } from "vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "virtual:windi.css";
import { router } from "@/router/index.js";
import Pinia from "@/store/index.js";
import "./permission";
import "nprogress/nprogress.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import permission from "@/directives/permission.js";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(Pinia);
app.use(router);
app.use(permission);
app.mount("#app");

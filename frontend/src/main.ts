import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './output.css';
import "./assets/main.css";
import { SuperTokensConfig } from "./config";
import '../node_modules/flowbite-vue/dist/index.css'

// SuperTokens.init(SuperTokensConfig);
console.log(SuperTokensConfig);
const app = createApp(App);

app.use(router);

app.mount("#app");

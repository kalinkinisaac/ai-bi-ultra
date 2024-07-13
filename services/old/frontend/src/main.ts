import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './output.css';
import "./assets/main.css";
import { SuperTokensConfig } from "./config";

// SuperTokens.init(SuperTokensConfig);
console.log(SuperTokensConfig);
const app = createApp(App);

app.use(router);

app.mount("#app");

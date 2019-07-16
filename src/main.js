import Vue from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import "./plugins/element";
import { PUBLICURL } from "./publicurl";
Vue.prototype.$publicUrl = PUBLICURL;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");

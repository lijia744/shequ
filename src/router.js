import Vue from "vue";
import VueRouter from "vue-router";
import Topics from "./components/Topics.vue";
import Home from "./components/Home.vue";
import User from "./components/User.vue";
import PublishTopic from "./components/PublishTopic.vue";
import Message from "./components/Message.vue";
Vue.use(VueRouter);
const routes = [
  {
    component: Home,
    path: "/shequ"
  },
  {
    component: Topics,
    path: "/shequ/topic/:id"
  },
  {
    component: User,
    path: "/shequ/user/:loginname"
  },
  {
    component: PublishTopic,
    path: "/shequ/topics/create"
  },
  {
    component: Message,
    path: "/shequ/my/message"
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});
export default router;

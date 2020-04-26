import Vue from "vue";
import VueRouter from "vue-router";
import ThreadList from "../views/ThreadList.vue";
import Thread from "../views/Thread.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ThreadList",
    component: ThreadList,
  },
  {
    path: "/:threadName",
    name: "Thread",
    component: Thread,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

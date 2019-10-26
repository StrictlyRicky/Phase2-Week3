import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/room",
    name: "room",
    component: () =>
      import(/* webpackChunkName: "room" */ "@/views/RoomList.vue")
  },
  {
    path: "/play",
    name: "play",
    component: () => import(/* webpackChunkName: "home" */ "../views/Play.vue")
  },
  {
    path: "/game",
    name: "game",
    component: () =>
      import(/* webpackChunkName: "game" */ "@/components/Board.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

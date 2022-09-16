import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../views/home.vue";
import Classify from "../views/classify.vue";
import Shopping from "../views/shopping.vue";
import MyHome from "../views/myhome.vue";
import Search from "../views/Search.vue";

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
}
Vue.use(VueRouter);

const routes = [
  {
  path: "/home",
  component: Home,
  children: [
    {
      path:"classify",
      name:"classify",
      component: Classify
    },
    {
      path:"shopping",
      component:Shopping
    },
    {
      path:"myhome",
      component:MyHome
    }
  ]
  },
  {
    path: "/",
    component:Home
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

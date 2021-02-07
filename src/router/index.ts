import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LinkBonusSelect from "@/components/LinkBonusSelect.vue";
import LinkBonusSearch from "@/components/LinkBonusSearch.vue";
import Settings from "@/components/Settings.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: LinkBonusSearch,
  },
  {
    path: "/active-link-bonus",
    name: "LinkBonusSelect",
    component: LinkBonusSelect,
  },
  {
    path: "/link-bonus-search",
    name: "LinkBonusSearch",
    component: LinkBonusSearch,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

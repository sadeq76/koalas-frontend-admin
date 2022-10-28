import { createRouter, createWebHistory } from "vue-router";

//pages
import TheLogin from "../pages/TheLogin.vue";
import TheCreateProduct from "../pages/TheCreateProduct.vue";
import TheCreateBlog from "../pages/TheCreateBlog.vue";

//middleware
import auth from "../middleware/auth.js";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: TheLogin, name: "login" },
    {
      path: "/",
      component: TheCreateProduct,
      name: "create-product",
    },
    { path: "/create-blog", component: TheCreateBlog, name: "create-blog" },
  ],
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

auth(router);

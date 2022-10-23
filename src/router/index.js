import { createRouter, createWebHistory } from "vue-router";

//pages
import TheLogin from "../pages/TheLogin.vue";
import TheDashboard from "../pages/TheDashboard.vue";
import TheCreateProduct from "../pages/TheCreateProduct.vue";
import TheProductsList from "../pages/TheProductsList.vue";
import TheBlogsList from "../pages/TheBlogsList.vue";
import TheCreateBlog from "../pages/TheCreateBlog.vue";

//middleware
import auth from "../middleware/auth.js";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: TheLogin, name: "login" },
    {
      path: "/",
      component: TheDashboard,
      name: "dashboard",
    },
    {
      path: "/create-product",
      component: TheCreateProduct,
      name: "create-product",
    },
    {
      path: "/products-list",
      component: TheProductsList,
      name: "products-list",
    },
    { path: "/blog-list", component: TheBlogsList, name: "blog-list" },
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

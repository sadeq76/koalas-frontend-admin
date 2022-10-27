import { createRouter, createWebHistory } from "vue-router";

//pages
import TheLogin from "../pages/TheLogin.vue";
import TheCustomersList from "../pages/TheCustomersList.vue";
import TheCreateProduct from "../pages/TheCreateProduct.vue";
import TheProductsList from "../pages/TheProductsList.vue";
import TheBlogsList from "../pages/TheBlogsList.vue";
import TheCreateBlog from "../pages/TheCreateBlog.vue";
import TheTicketsList from "../pages/TheTicketsList.vue";
import TheOrdersList from "../pages/TheOrdersList.vue";

//middleware
import auth from "../middleware/auth.js";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: TheLogin, name: "login" },
    { path: "/customers", component: TheCustomersList, name: "customers" },
    {
      path: "/create-product",
      component: TheCreateProduct,
      name: "create-product",
    },
    {
      path: "/products",
      component: TheProductsList,
      name: "products",
    },
    { path: "/blogs", component: TheBlogsList, name: "blogs" },
    { path: "/create-blog", component: TheCreateBlog, name: "create-blog" },
    { path: "/tickets", component: TheTicketsList, name: "tickets" },
    { path: "/orders", component: TheOrdersList, name: "orders" },
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

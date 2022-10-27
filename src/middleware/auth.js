export default function auth(router) {
  router.beforeEach((to) => {
    if (to.name !== "login" && !localStorage.getItem("token")) {
      return { name: "login" };
    }
    if (to.name === "login" && localStorage.getItem("token")) {
      return { name: "customers" };
    }
  });
}

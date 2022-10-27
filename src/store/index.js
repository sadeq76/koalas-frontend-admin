import { defineStore } from "pinia";
import actions from "./actions";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    snackbar: false,
    snackbarMessage: "",
    snackbarStatus: "",
    snackbarTimeout: 3000,
    isLoggedIn: !!localStorage.getItem("token"),
    categories: [
      { title: "قهوه های تک خواستگاه", value: "bean-single" },
      { title: "قهوه های ترکیبی", value: "bean-multi" },
      { title: "قهوه های ترک", value: "bean-turk" },
      { title: "قهوه فوری", value: "powder" },
      { title: "سایر محصولات", value: "other" },
      { title: "اکسسوری های قهوه", value: "accessories" },
      { title: "ماگ", value: "mug" },
      { title: "جعبه هدیه", value: "gift" },
    ],
  }),
  actions,
});

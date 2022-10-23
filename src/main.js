//styles
import "./assets/styles/utilities.scss";

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

//router
import { router } from "./router";

//store
import { createPinia } from "pinia";

//ckeditor
import CKEditor from "@ckeditor/ckeditor5-vue";

loadFonts();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(vuetify);

app.use(router);

app.use(CKEditor);

app.mount("#app");

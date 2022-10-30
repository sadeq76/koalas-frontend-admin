<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app>
    <v-layout>
      <v-app-bar
        v-if="$route.path !== '/login'"
        elevation="0"
        order="1"
        color="background"
      >
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{
          $route.name?.toUpperCase().replace("-", " ")
        }}</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-if="$route.path !== '/login'"
        v-model="drawer"
        color="primary"
        permanent
      >
        <v-list density="compact" nav>
          <div :class="[main.logo, 'pa-2 d-flex justify-center align-center']">
            <img src="./assets/logo.png" alt="logo" />
          </div>
        </v-list>
        <v-list
          v-model:opened="open.value"
          :lines="false"
          density="compact"
          nav
        >
          <div class="my-4" v-for="(item, i) in items" :key="i">
            <v-list-group v-if="item.subs" :value="item.value">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="(sub, index) in item.subs"
                :key="index"
                :title="sub.title"
                :value="sub.value"
                @click="goToPage(sub.path)"
              ></v-list-item>
            </v-list-group>

            <v-list-item
              v-else
              :value="item.value"
              active-color="secondary"
              @click="goToPage(item.path)"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <RouterView class="pa-4" />
      </v-main>
    </v-layout>
    <BaseSnackbar />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

//components
import BaseSnackbar from "./components/overlay/BaseSnackbar.vue";

const router = useRouter();

// reactive state
const drawer = ref(true);
let open = ref(["blog", "product"]);

const items = [
  {
    title: "Create product",
    value: "create-product",
    icon: "mdi-coffee",
    path: "/",
  },
  {
    title: "Create blog",
    value: "create-blog",
    icon: "mdi-sticker",
    path: "/create-blog",
  },
];
const goToPage = function (path) {
  router.push(path);
};
</script>

<style lang="scss" module="main">
.logo {
  height: 64px;

  img {
    height: 100%;
    object-fit: contain;
  }
}
</style>

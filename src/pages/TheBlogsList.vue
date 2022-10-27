<template>
  <v-table fixed-header height="100%">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header" class="text-left">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="blog in blogs" :key="blog.id">
        <td v-for="(value, key, index) in blog" :key="index">
          <v-img
            v-if="key === 'cover'"
            size="x-large"
            color="secondary"
            class="pa-4"
            :src="value"
          ></v-img>
          <a v-else-if="key === 'video'" :href="value" target="_blank">{{
            value
          }}</a>
          <span v-else-if="key === 'date_created'">
            {{ convertToShamsi(value) }}
          </span>
          <v-icon
            v-else-if="typeof value == 'boolean'"
            :icon="value === true ? 'mdi-check' : 'mdi-window-close'"
            :color="value === true ? 'success' : 'error'"
          ></v-icon>
          <span v-else
            >{{ value?.toString().substring(0, 40) }}
            {{ value.length >= 40 ? "..." : "" }}
          </span>
        </td>
        <td>
          <v-btn
            class="ma-4"
            icon="mdi-pencil"
            color="info"
            size="small"
            variant="outlined"
            :loading="loading"
            @click="editBlog"
          ></v-btn>
          <v-btn
            class="ma-4"
            icon="mdi-delete"
            color="error"
            size="small"
            variant="outlined"
            :loading="loading"
            @click="toggleModal(blog.id)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <BaseConfirmModal
    :dialog="isOpen"
    @confirm="deleteBlog"
    @close="toggleModal"
  />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRequest } from "../store/request";
import { useStore } from "../store";
import { convertToShamsi } from "../helpers/text.js";
import BaseConfirmModal from "../components/ui/overlay/BaseConfirmModal.vue";

const request = useRequest();
const store = useStore();
const loading = ref(false);
const isOpen = ref(false);
const selectedId = ref([]);
let blogs = ref([]);
let headers = reactive([]);

const getBlogs = async function () {
  loading.value = true;
  blogs.value = [];
  request
    .fetchData({
      url: "/blog/",
      params: { category: store.categories[0].value },
    })

    .then((response) => {
      for (const item in response.result[0]) {
        headers.push(item);
      }
      blogs.value = response.result;
    })
    .finally(() => (loading.value = false));
};

const deleteBlog = async function () {
  loading.value = true;
  request
    .fetchData({
      url: `/blog/${selectedId.value}/`,
      method: "DELETE",
    })
    .then(() => {
      blogs.value = blogs.value.filter((item) => item.id !== selectedId.value);
    })
    .finally(() => (loading.value = false));
};

const toggleModal = function (id) {
  if (id) {
    selectedId.value = id;
  }
  isOpen.value = !isOpen.value;
};

//lifecycles
onMounted(() => {
  getBlogs();
});
</script>

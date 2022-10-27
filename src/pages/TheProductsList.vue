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
      <tr v-for="product in products" :key="product.id">
        <td v-for="(value, key, index) in product" :key="index">
          <v-avatar
            v-if="key === 'image'"
            size="x-large"
            color="secondary"
            class="pa-4"
          >
            <v-img :src="value"></v-img>
          </v-avatar>
          <span v-else-if="typeof value !== 'boolean' && !isNaN(+value)">
            {{ convertToRls(value) }}
          </span>
          <v-icon
            v-else-if="typeof value == 'boolean'"
            :icon="value === true ? 'mdi-check' : 'mdi-window-close'"
            :color="value === true ? 'success' : 'error'"
          ></v-icon>
          <span v-else
            >{{ value.substring(0, 40) }}
            {{ value.length >= 40 ? "..." : "" }}
          </span>
        </td>
        <td>
          <v-btn
            class="ma-4"
            icon="mdi-delete"
            color="error"
            size="small"
            variant="outlined"
            :loading="loading"
            @click="toggleModal(product.id)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <BaseConfirmModal
    :dialog="isOpen"
    @confirm="deleteProduct"
    @close="toggleModal"
  />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRequest } from "../store/request";
import { useStore } from "../store";
import { convertToRls } from "../helpers/text";
import BaseConfirmModal from "../components/ui/overlay/BaseConfirmModal.vue";

const request = useRequest();
const store = useStore();
const loading = ref(false);
const isOpen = ref(false);
const selectedId = ref([]);
let products = ref([]);
let headers = reactive([]);

const getProducts = async function () {
  loading.value = true;
  products.value = [];
  request
    .fetchData({
      url: "/product/",
      params: { category: store.categories[0].value },
    })

    .then((response) => {
      for (const item in response.result[0]) {
        headers.push(item);
      }
      products.value = response.result;
    })
    .finally(() => (loading.value = false));
};

const deleteProduct = async function () {
  loading.value = true;
  request
    .fetchData({
      url: `/product/${selectedId.value}/`,
      method: "DELETE",
    })
    .then(() => {
      products.value = products.value.filter((item) => item.id !== selectedId.value);
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
  getProducts();
});
</script>

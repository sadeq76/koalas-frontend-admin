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
      <tr v-for="order in orders" :key="order.id">
        <td v-for="(value, key, index) in order" :key="index">
          <v-avatar
            v-if="key === 'image'"
            size="x-large"
            color="secondary"
            class="pa-4"
          >
            <v-img :src="value"></v-img>
          </v-avatar>
          <span v-else-if="key === 'date_created'">
            {{ convertToShamsi(value) }}
          </span>
          <v-chip v-else-if="key === 'status'" :color="statusColor(value)">
            {{ statusTitle(value) }}
          </v-chip>
          <span v-else-if="typeof value !== 'boolean' && !isNaN(+value)">
            {{ convertToRls(value) }}
          </span>
          <span v-else-if="key === 'products' || key === 'user_id'">
            <v-btn
              class="ma-4"
              icon="mdi-eye"
              color="info"
              size="small"
              variant="outlined"
              :loading="loading"
              @click="openModal(value, key)"
            ></v-btn>
          </span>
          <v-icon
            v-else-if="typeof value == 'boolean'"
            :icon="value === true ? 'mdi-check' : 'mdi-window-close'"
            :color="value === true ? 'success' : 'error'"
          ></v-icon>
          <span v-else>{{ value }} </span>
        </td>
        <td>
          <v-btn
            v-if="order.status === 'InProgress' || order.status === 'sent'"
            class="ma-4"
            icon="mdi-skip-next"
            color="error"
            size="small"
            variant="outlined"
            :loading="loading"
            @click="nextStatus(order.id, order.status)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog width="60%" v-model="dialog">
    <v-card class="pa-4">
      <v-card-title class="text-h5"> {{ header }} </v-card-title>
      <div v-if="header === 'products'">
        <div class="my-4 d-flex align-center" v-for="item in items" :key="item">
          <v-avatar size="x-large" color="secondary" class="pa-4 mx-4">
            <v-img :src="item.image"></v-img>
          </v-avatar>
          {{ item.title || "بدون نام" }}
          <div class="pa-4 mx-4">
            {{ convertToRls(item.price) }}
          </div>

          <div class="pa-4 mx-4">X{{ item.qty }}</div>
        </div>
      </div>
      <div v-else>
        <div v-for="(value, key) in items" :key="key">
          {{ key }} : {{ value }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRequest } from "../store/request";
import { useStore } from "../store";
import { convertToRls, convertToShamsi } from "../helpers/text";
import { statusColor, statusTitle } from "../helpers/status";

const request = useRequest();
const store = useStore();
const loading = ref(false);
const dialog = ref(false);
let header = ref("");
let items = ref([]);
let orders = ref([]);
let headers = reactive([]);

const getOrders = async function () {
  loading.value = true;
  orders.value = [];
  request
    .fetchData({
      url: "/product/order/",
      params: { category: store.categories[0].value },
    })

    .then((response) => {
      for (const item in response[0]) {
        headers.push(item);
      }
      orders.value = response;
    })
    .finally(() => (loading.value = false));
};

const nextStatus = async function (id, value) {
  loading.value = true;
  const body = new FormData();
  body.append("status", value === "InProgress" ? "sent" : "done");
  request
    .fetchData({
      url: `/product/order/${id}/`,
      method: "PUT",
      body,
    })
    .then(() => {
      getOrders();
    })
    .finally(() => (loading.value = false));
};

const openModal = function (value, key) {
  dialog.value = true;
  items.value = value;
  header.value = key;
};

//lifecycles
onMounted(() => {
  getOrders();
});
</script>

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
      <tr v-for="customer in customers" :key="customer.id">
        <td v-for="(value, key, index) in customer" :key="index">
          <v-avatar
            v-if="key === 'image'"
            size="x-large"
            color="secondary"
            class="pa-4"
          >
            <v-img :src="value"></v-img>
          </v-avatar>
          <span v-else-if="key === 'last_login'">
            {{ convertToShamsi(value) }}
          </span>
          <span v-else-if="key === 'addresses'">
            <v-btn
              class="ma-4"
              icon="mdi-eye"
              color="info"
              size="small"
              variant="outlined"
              @click="showAddresses(value)"
            ></v-btn>
          </span>
          <v-icon
            v-else-if="typeof value == 'boolean'"
            :icon="value === true ? 'mdi-check' : 'mdi-window-close'"
            :color="value === true ? 'success' : 'error'"
          ></v-icon>
          <span v-else>{{ value || "-" }} </span>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog width="60%" v-model="dialog">
    <v-card class="pa-4">
      <v-card-title class="text-h5"> Addresses </v-card-title>
        <div v-for="item in addresses" :key="item">
          {{ item.title }} : {{ item.address }}
        </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRequest } from "../store/request";
import { useStore } from "../store";
import { convertToShamsi } from "../helpers/text";

const request = useRequest();
const store = useStore();
const loading = ref(false);
const dialog = ref(false);
let customers = ref([]);
let addresses = ref([]);
let headers = reactive([]);

const getCustomers = async function () {
  loading.value = true;
  customers.value = [];
  request
    .fetchData({
      url: "/user/",
      params: { category: store.categories[0].value },
    })

    .then((response) => {
      for (const item in response[0]) {
        headers.push(item);
      }
      customers.value = response;
    })
    .finally(() => (loading.value = false));
};

const showAddresses = function (value) {
  dialog.value = true;
  addresses.value = value;
};

//lifecycles
onMounted(() => {
  getCustomers();
});
</script>

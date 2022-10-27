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
      <tr v-for="ticket in tickets" :key="ticket.id">
        <td v-for="(value, key, index) in ticket" :key="index">
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
          <v-icon
            v-else-if="typeof value == 'boolean'"
            :icon="value === true ? 'mdi-check' : 'mdi-window-close'"
            :color="value === true ? 'success' : 'error'"
          ></v-icon>
          <span v-else-if="value"
            >{{ value.toString().substring(0, 40) || "-" }}
            {{ value.length >= 40 ? "..." : "" }}
          </span>
        </td>
        <td>
          <v-btn
            class="ma-4"
            icon="mdi-send"
            color="info"
            size="small"
            variant="outlined"
            :loading="loading"
            @click="openModal(ticket.id, ticket.message)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog persistent width="300px" v-model="dialog">
    <v-card>
      <v-card-title class="text-h5"> Confirm </v-card-title>
      <v-card-text> {{ message }} </v-card-text>
      <v-textarea label="message" auto-grow v-model="response"></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="sendMessage">
          SEND
        </v-btn>
        <v-btn color="primary" @click="close"> CANCEL </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { convertToShamsi } from "../helpers/text";
import { useRequest } from "../store/request";

const request = useRequest();
const loading = ref(false);
const dialog = ref(false);
const message = ref("");
const response = ref("");
const selectedTicketId = ref("");
let tickets = ref([]);
let headers = reactive([]);

const getTickets = async function () {
  loading.value = true;
  tickets.value = [];
  request
    .fetchData({
      url: "/user/support/",
    })

    .then((response) => {
      for (const item in response[0]) {
        headers.push(item);
      }
      tickets.value = response;
    })
    .finally(() => (loading.value = false));
};

const openModal = async function (id, value) {
  message.value = value;
  selectedTicketId.value = id;
  dialog.value = true;
};

const close = function () {
  dialog.value = false;
};

const sendMessage = function () {
  const body = new FormData();
  body.append("answer", response);
  request
    .fetchData({
      url: `/user/support/${selectedTicketId.value}/`,
      method: "PUT",
      body,
    })

    .then(() => {
      close();
    })
    .finally(() => (loading.value = false));
};

//lifecycles
onMounted(() => {
  getTickets();
});
</script>

<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="12" sm="12" md="4">
        <v-file-input
          clearable
          v-model="image"
          prepend-icon="mdi-image"
          accept="image/*"
          label="image"
          variant="outlined"
          bg-color="white"
        ></v-file-input>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          class="mb-4"
          label="Title"
          v-model="title"
          variant="outlined"
          required
          bg-color="white"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-file-input
          class="mb-4"
          label="Qty"
          v-model="qty"
          variant="outlined"
          required
          bg-color="white"
          type="number"
        ></v-file-input>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          class="mb-4"
          label="price"
          type="number"
          bg-color="white"
          variant="outlined"
          v-model="price"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-select
          class="mb-4"
          label="category"
          :items="store.categories"
          item-title="title"
          item-value="value"
          v-model="category"
          variant="outlined"
          required
          bg-color="white"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <v-text-field
          class="mb-4"
          label="description"
          v-model="description"
          variant="outlined"
          required
          bg-color="white"
          maxLength="350"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      class="mt-4"
      block
      v-bind="{ loading }"
      color="primary"
      @click="submit"
    >
      submit
    </v-btn>
  </div>
</template>

<script setup>
import { persianToEnglish } from "../helpers/text";
import { ref } from "vue";
import { useRequest } from "../store/request";
import { useStore } from "../store";

const request = useRequest();
const store = useStore();
const loading = ref(false);

const title = ref("");
const price = ref("");
const qty = ref(0);
const category = ref("");
const description = ref("");
let image = ref([]);

const submit = async function () {
  loading.value = true;
  let body = new FormData();
  body.append("image", image.value[0]);
  body.append("title", title.value);
  body.append("price", persianToEnglish(price.value));
  body.append("qty", qty.value);
  body.append("category", category.value);
  body.append("description", description.value);

  request
    .fetchData({ url: "/product/", method: "POST", body })
    .then(() => {
      title.value = "";
      price.value = "";
      category.value = "";
      description.value = "";
      image.value = "";
    })
    .finally(() => (loading.value = false));
};
</script>

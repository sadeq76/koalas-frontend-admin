<template>
  <div>
    <v-text-field
      class="mb-4"
      label="Title"
      v-model="title"
      variant="outlined"
      required
      bg-color="white"
    ></v-text-field>
    <v-text-field
      class="mb-4"
      label="Summary"
      v-model="summary"
      variant="outlined"
      required
      bg-color="white"
    ></v-text-field>
    <ckeditor
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    ></ckeditor>
    <v-row class="mt-4">
      <v-col sm="12" md="6">
        <v-file-input
          clearable
          v-model="cover"
          prepend-icon="mdi-image"
          accept="image/*"
          label="Cover"
          variant="outlined"
          bg-color="white"
        ></v-file-input>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-file-input
          clearable
          v-model="video"
          prepend-icon="mdi-video"
          accept="video/*"
          label="video"
          variant="outlined"
          bg-color="white"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-btn
      class="full-width mt-4"
      v-bind="{ loading }"
      color="primary"
      @click="submit"
    >
      submit
    </v-btn>
  </div>
</template>

<script setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchData } from "../helpers/functions";
import { ref } from "vue";
import { useStore } from "../store";

const store = useStore();
const loading = ref(false);

const title = ref("");
const summary = ref("");
let cover = ref([]);
let video = ref([]);
const editor = ClassicEditor;
const editorData = ref("<p>متن بلاگ را در اینجا تایپ کنید</p>");
const editorConfig = {
  language: {
    ui: "en",
    content: "ar",
    inputView: {
      height: "200px",
    },
  },
};

const submit = async function () {
  loading.value = true;
  let body = new FormData();
  body.append("cover", cover.value[0]);
  body.append("title", title.value);
  body.append("summary", summary.value);
  body.append("description", editorData.value);
  if (video.value[0]) {
    body.append("video", video.value[0]);
  }

  await fetchData({ url: "/blog/", method: "POST", body })
    .then(() => {
      title.value = "";
      summary.value = "";
      editorData.value = "";
      cover.value = "";
      video.value = "";
    })
    .catch((error) => {
      store.toggleSnackbar({ status: "error", message: error });
    })
    .finally(() => (loading.value = false));
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 200px;
}
</style>

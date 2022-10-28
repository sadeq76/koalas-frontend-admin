<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog persistent width="300px" v-model="props.dialog" activator="parent">
    <v-card>
      <v-card-title class="text-h5"> Confirm </v-card-title>
      <v-card-text> are you sure ? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="confirm">
          CONFIRM
        </v-btn>
        <v-btn color="primary" @click="close"> CANCEL </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
});
const emits = defineEmits(["confirm", "close"]);

const confirm = function () {
  emits("confirm");
  emits("close");
};
const close = function () {
  emits("close");
};
</script>

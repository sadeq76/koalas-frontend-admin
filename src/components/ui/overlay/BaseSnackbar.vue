<template>
  <v-snackbar
    class="d-flex"
    :timeout="store.snackbarTimeout"
    :color="store.snackbarStatus"
    v-model="store.snackbar"
  >
    <span class="fit-width secondary-color">
      {{ store.snackbarMessage }}
    </span>
    <v-spacer></v-spacer>
    <template v-slot:actions>
      <v-btn
        color="secondary"
        variant="text"
        icon="mdi-close"
        @click="store.toggleSnackbar"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useStore } from "../../../store";

const store = useStore();
</script>

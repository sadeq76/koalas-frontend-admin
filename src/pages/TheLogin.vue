<template>
  <div class="full-width full-height d-flex justify-center align-center">
    <v-card
      class="pa-4"
      :width="$vuetify.display.mobile ? '100%' : '50%'"
      :height="$vuetify.display.mobile ? '100%' : '80%'"
      max-width="500px"
      variant="outlined"
    >
      <v-form @submit.prevent>
        <h1 class="text-h1 font-weight-black mb-8">log in</h1>
        <v-text-field
          class="mb-4"
          v-bind="{ ...textField }"
          v-model="inputText"
          variant="outlined"
          required
          @keydown.enter="submit"
        ></v-text-field>
        <v-btn
          block
          v-bind="{ loading }"
          color="primary"
          @click="submit"
          :disabled="!isValid"
        >
          next
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "../store/request";
import { useStore } from "../store";

const router = useRouter();
const request = useRequest();
const store = useStore();

const step = ref(1);
let loading = ref(false);
const inputText = ref("");
const phoneNumber = ref("");

const textField = computed(() => {
  return {
    rules: step.value === 1 ? phoneNumberRules : OTPRules,
    maxLength: step.value === 1 ? "11" : "4",
    label: step.value === 1 ? "phone number" : "OTP",
  };
});

const phoneNumberRules = [
  (v) => !!v || "phone number is required",
  (v) => v.length == 11 || "phone number must be 11 characters",
];
const OTPRules = [
  (v) => !!v || "OTP is required",
  (v) => v.length == 11 || "OTP must be 4 characters",
];

const isValid = computed(() =>
  step.value === 1
    ? inputText.value.length === 11
    : inputText.value.length === 4
);

const submit = function () {
  if (step.value === 1) {
    sendPhoneNumber();
  } else {
    sendOTP();
  }
};

const sendPhoneNumber = async function () {
  loading.value = true;
  let body = new FormData();
  body.append("phone_number", inputText.value);

  request
    .fetchData({ url: "/user/login/", method: "POST", body })
    .then(() => {
      phoneNumber.value = inputText.value;
      inputText.value = "";
      step.value = 2;
    })
    .finally(() => (loading.value = false));
};

const sendOTP = async function () {
  loading.value = true;
  let body = new FormData();
  body.append("phone_number", phoneNumber.value);
  body.append("otp", inputText.value);

  request
    .fetchData({ url: "/user/otp/", method: "POST", body })
    .then((response) => {
      if (response.is_admin) {
        store.isLoggedIn = true;
        localStorage.setItem("token", response.token);
        router.push({
          name: "customers",
        });
      } else {
        store.toggleSnackbar({ status: "error", message: "You are not admin" });
      }
    })
    .finally(() => (loading.value = false));
};
</script>

<template>
  <div class="vh-100 d-flex align-items-center" novalidate>
    <transition name="welcome" @after-leave="appState.currentScreen = markRaw(MainScreen)">
      <form
        @input="formValid = form.checkValidity()"
        @submit.prevent="onFormSubmit"
        ref="form"
        v-if="notLoggedIn"
        class="mx-auto bg-light border rounded p-3 shadow-lg col-11 col-md-auto"
      >
        <h1 class="fw-light text-center">
          Welcome to <br class="d-md-none" />
          <b>FOHS ScoreTracker</b>
        </h1>
        <hr />
        <Alert class="position-absolute top-0 start-0 end-0 m-1" type="danger" v-model="serverError">
          <i-fa-solid:exclamation-triangle class="fs-5 me-2" />
          Can't connect to server.
        </Alert>
        <fieldset :disabled="appState.requestPending">
          <div class="mb-3">
            <label class="form-label">
              <i-fa-solid:envelope />
              Email
            </label>
            <input
              required
              v-model="email"
              placeholder="Enter your email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': invalidLogin == 'email' }"
            />
            <div class="invalid-feedback">Account does not exist.</div>
          </div>
          <div class="mb-1 mb-md-3">
            <label class="form-label">
              <i-fa-solid:key />
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              v-model="password"
              class="form-control"
              :class="{ 'is-invalid': invalidLogin == 'password' }"
            />
            <span class="invalid-feedback">Incorrect password.</span>
          </div>
          <div class="row m-0 align-items-center gy-2 gy-md-0">
            <div class="form-check col-auto order-2" title="Currently unimplemented">
              <input disabled type="checkbox" class="form-check-input" id="rememberMe" />
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <button
              :disabled="!formValid || appState.requestPending"
              type="submit"
              class="col-12 col-md-auto btn btn-primary me-3 order-3 order-md-0"
            >
              <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == 'GET /users/me'" />
              <i-fa-solid:sign-in-alt v-else />
              Login
            </button>
            <button
              :disabled="appState.requestPending"
              type="button"
              class="col-12 col-md-auto btn btn-secondary me-3 order-3 order-md-1"
              data-bs-toggle="collapse"
              data-bs-target="#loginSettings"
            >
              <i-fa-solid:bars /> Settings
            </button>
          </div>
          <div class="collapse rounded border shadow-sm mt-2 p-2" id="loginSettings">
            <div class="text-danger text-center mb-1"><i-fa-solid:exclamation-triangle /> Developer Options</div>
            <label class="form-label">
              <i-fa-solid:database />
              API Base
            </label>
            <input type="url" class="form-control font-monospace" required v-model="appState.apiBase" />
          </div>
        </fieldset>
      </form>
    </transition>
  </div>
</template>

<script setup>
import { defineEmit, inject, onMounted, onUnmounted, ref, markRaw } from "vue";
import MainScreen from "./MainScreen.vue";

const apiCall = inject("apiCall");
const appState = inject("state");

const form = ref(null);
const email = ref("");
const password = ref("");

const notLoggedIn = ref(false);
const serverError = ref(false);
const formValid = ref(false);
const invalidLogin = ref("");

async function onFormSubmit() {
  let emailElement = email.value;
  let passwordElement = password.value;

  invalidLogin.value = "";

  appState.authHeader = "Basic " + btoa(`${email.value}:${password.value}`);
  try {
    var response = await apiCall("/users/me");
  } catch {
    serverError.value = true;
  }
  var data = await response.json();
  if (response.status == 401) {
    if (data.detail.toLowerCase().includes("password")) {
      invalidLogin.value = "password";
    } else {
      invalidLogin.value = "email";
    }
  } else {
    notLoggedIn.value = false;
  }
}

onMounted(function () {
  document.body.classList.remove("bg-light");
  document.body.classList.add("bg-primary");
  notLoggedIn.value = true;
});
onUnmounted(function () {
  document.body.classList.remove("bg-primary");
  document.body.classList.add("bg-light");
});
</script>

<style scoped>
form {
  transition: all 1s;
}

.welcome-enter-active {
  transition: 0.6s;
}

.welcome-leave-active {
  transition: 0.4s;
}

.welcome-enter-from,
.welcome-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

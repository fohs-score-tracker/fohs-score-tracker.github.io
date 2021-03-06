<template>
  <div class="h-100 d-flex align-items-center" novalidate>
    <transition name="welcome" @after-leave="appState.currentScreen = markRaw(HomeScreen)">
      <form
        @input="formValid = form.checkValidity()"
        @submit.prevent="onFormSubmit"
        ref="form"
        v-if="notLoggedIn"
        class="mx-auto bg-light border rounded p-3 shadow-lg col-11 col-md-auto"
      >
        <h1 class="fw-light text-center">
          Welcome to
          <br class="d-md-none" />
          <b>FOHS ScoreTracker</b>
        </h1>
        <hr />
        <Alert class="position-absolute top-0 start-0 end-0 m-1" type="danger" v-model="serverError">
          <i-fa-solid:exclamation-triangle class="fs-5 me-2" />Can't connect to server.
        </Alert>
        <fieldset :disabled="appState.requestPending">
          <div class="mb-3">
            <label class="form-label"> <i-fa-solid:envelope />Email </label>
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
          <div class="mb-1 mb-md-2">
            <label class="form-label"> <i-fa-solid:key />Password </label>
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
          <div class="d-flex justify-content-between mb-1 mb-md-2">
            <div class="form-check col-auto mb-0">
              <input v-model="rememberMe" type="checkbox" class="form-check-input" id="rememberMe" />
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <a href="#" @click="showRestToast = true">reset password</a>
          </div>
          <div class="d-flex flex-wrap">
            <button
              :disabled="!formValid || appState.requestPending"
              type="submit"
              class="btn btn-primary col-md-auto col-12 mb-2 mb-md-0 me-0 me-md-2"
            >
              <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == 'POST /token'" />
              <i-fa-solid:sign-in-alt v-else />Login
            </button>
            <button
              :disabled="appState.requestPending"
              type="button"
              class="btn btn-secondary col-md-auto col-12"
              data-bs-toggle="collapse"
              data-bs-target="#loginSettings"
            >
              <i-fa-solid:bars />Settings
            </button>
          </div>
          <div class="collapse rounded border shadow-sm mt-2 p-2" id="loginSettings">
            <div class="text-danger text-center mb-1"><i-fa-solid:exclamation-triangle />Developer Options</div>
            <label class="form-label"> <i-fa-solid:database />API Base </label>
            <input type="url" class="form-control font-monospace" required v-model="appState.apiBase" />
          </div>
        </fieldset>
      </form>
    </transition>
  </div>
  <ReloadPrompt />
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref, markRaw } from "vue";
import HomeScreen from "./HomeScreen.vue";

const apiCall = inject("apiCall");
const appState = inject("state");

const form = ref(null);
const email = ref("");
const password = ref("");

const notLoggedIn = ref(false);
const serverError = ref(false);
const formValid = ref(false);
const invalidLogin = ref("");
const rememberMe = ref(false);

async function onFormSubmit() {
  invalidLogin.value = "";

  let formData = new FormData();
  formData.append("username", email.value);
  formData.append("password", password.value);
  try {
    var response = await apiCall("/token", { method: "POST", body: formData });
  } catch {
    serverError.value = true;
  }
  var data = await response.json();
  if (!response.ok) {
    if (data.detail.toLowerCase().includes("password")) {
      invalidLogin.value = "password";
    } else {
      invalidLogin.value = "email";
    }
  } else {
    appState.token = data["access_token"];
    const savedLogin = JSON.stringify({
      host: appState.apiBase,
      token: appState.token,
    });
    if (rememberMe.value) {
      localStorage.setItem("score-tracker-session", savedLogin);
    } else {
      sessionStorage.setItem("score-tracker-session", savedLogin);
    }
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

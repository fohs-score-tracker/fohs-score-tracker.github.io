<template>
  <a id="sideMenuButton" class="text-muted p-2 position-fixed start-0 top-0" data-bs-toggle="offcanvas" href="#sideMenu">
    <i-fa-solid:bars />
  </a>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="sideMenu">
    <div class="offcanvas-header bg-light border-bottom">
      <h5 class="offcanvas-title fw-bold">Menu</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="p-2">
      <div class="mb-2 fs-4 fw-bold text-truncate text-center">
        <i-fa-solid:user-circle class="text-secondary" />
        {{ userData.name }}
      </div>
      <div class="row gy-2">
        <!-- the buttons go here -->
        <div class="col-12 d-grid">
          <button :disabled="appState.requestPending" class="btn btn-danger" @click="logout">
            <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == 'POST /token/revoke'" />
            <i-fa-solid:sign-out-alt v-else />
            Logout
          </button>
        </div>
        <div class="col-12 d-grid">
          <button disabled class="btn btn-secondary">
            <i-fa-solid:cog />
            Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, inject, ref, onMounted } from "@vue/runtime-core";
import WelcomeScreen from "../screens/WelcomeScreen.vue";

const apiCall = inject("apiCall");
const appState = inject("state");

const userData = ref({});
onMounted(async function () {
  userData.value = await apiCall("/users/me").then((r) => r.json());
});

async function logout() {
  await apiCall("/token/revoke", { method: "POST" });

  // lol
  localStorage.removeItem("score-tracker-session");
  sessionStorage.removeItem("score-tracker-session");

  appState.token = null;
  appState.currentScreen = WelcomeScreen;
}
</script>

<style scoped>
#sideMenuButton {
  /* lol */
  z-index: 1024;
}
</style>
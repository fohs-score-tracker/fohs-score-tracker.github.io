<template>
  <component v-if="state.currentScreen != null" :is="state.currentScreen"></component>
  <div v-else class="d-flex flex-column align-items-center justify-content-center h-100 bg-primary bg-gradient text-white">
    <div class="fw-bold fs-5">FOHS ScoreTracker is loading...</div>
    <span class="mt-2 spinner-border" />
  </div>
</template>

<script setup>
import { markRaw, onMounted, provide, reactive } from "vue";
import WelcomeScreen from "./screens/WelcomeScreen.vue";
import HomeScreen from "./screens/HomeScreen.vue";

const state = reactive({
  apiBase: "https://fohs-score-tracker.herokuapp.com",
  requestPending: null,
  token: null,
  currentGame: null,
  isCurrentGameSet: false,
  teamId: null,
});

async function apiCall(path, args = {}) {
  if (!args.headers) args.headers = {};
  if (!args.method) args.method = "GET";
  if (state.token) args.headers["Authorization"] = "Bearer " + state.token;
  // show login spinner if waiting for GET /users/me, etc
  state.requestPending = `${args.method} ${path}`;
  try {
    var response = await fetch(state.apiBase + path, args);
  } catch (e) {
    state.requestPending = null;
    throw e;
  }
  state.requestPending = null;
  return response;
}

provide("state", state);
provide("apiCall", apiCall);
provide("transitionListFix", function (el) {
  // fix annoying bug
  // https://forum.vuejs.org/t/transition-group-leave-transition-w-position-absolute-jumping-to-top-left-flip/12258/4
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
  el.style.width = width;
  el.style.height = height;
});

onMounted(async function () {
  if ((await tryToken(sessionStorage)) || (await tryToken(localStorage))) {
    state.currentScreen = markRaw(HomeScreen);
  } else {
    state.currentScreen = markRaw(WelcomeScreen);
  }
});

async function tryToken(storage) {
  let sessionJson = JSON.parse(storage.getItem("score-tracker-session"));
  if (sessionJson == null) return false;

  let { host, token } = sessionJson;
  state.apiBase = host;
  state.token = token;
  let response = await apiCall("/users/me");
  if (response.ok) {
    return true;
  } else {
    state.apiBase = "https://fohs-score-tracker.herokuapp.com";
    state.token = null;
    return false;
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
body {
  background-repeat: no-repeat;
  caret-color: var(--bs-primary);
}
::selection {
  color: var(--bs-white);
  background-color: var(--bs-primary);
}
</style>

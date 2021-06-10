<template>
  <component :is="state.currentScreen"> </component>
</template>

<script setup>
import { markRaw, onMounted, provide, reactive } from "vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

const state = reactive({
  apiBase: "https://fohs-score-tracker.herokuapp.com",
  requestPending: null,
});

provide("state", state);
provide("apiCall", async function (path, args = {}) {
  if (!args.headers) args.headers = {};
  if (!args.method) args.method = "GET";
  args.headers["Authorization"] = state.authHeader;
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
});
provide("transitionListFix", function (el) {
  // fix annoying bug
  // https://forum.vuejs.org/t/transition-group-leave-transition-w-position-absolute-jumping-to-top-left-flip/12258/4
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
  el.style.width = width;
  el.style.height = height;
});

// TODO: store password and skip login
onMounted(() => (state.currentScreen = markRaw(WelcomeScreen)));
</script>

<style>
body {
  background-repeat: no-repeat;
}
::selection {
  color: var(--bs-white);
  background-color: var(--bs-primary);
}
</style>
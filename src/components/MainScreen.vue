<template>
  <transition name="main-screen-bar">
    <div id="mainScreenBar" class="overflow-hidden bg-light border-bottom shadow-sm" v-if="Object.keys(userData).length > 0">
      <div class="text-secondary text-center mt-2 pb-2">
        <div class="text-truncate mb-1">
          Logged in as
          <b>{{ userData.name }}</b>
        </div>
        <button disabled class="btn btn-secondary">
          <i-fa-solid:cog />
          Settings
        </button>
        <button :disabled="appState.requestPending" class="btn btn-danger ms-1" @click="logout">
          <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == 'POST /token/revoke'" />
          <i-fa-solid:sign-out-alt v-else />
          Logout
        </button>
      </div>
    </div>
  </transition>
  <div class="alert alert-warning" v-if="test.isMaxLimit" role="alert">This is a warning alert—check it out!</div>
  <div class="container">
    <h1 class="mt-2 text-secondary text-center">
      <b class="text-primary">FOHS</b>
      ScoreTracker
    </h1>
    <div class="text-center">
      <CourtSvg class="d-inline-block bg-dark p-1 mw-100 col-12 col-lg-6 mb-2 shadow" @click="startRecordingShot" />
    </div>
    <div class="text-muted text-center">Tap a spot on the court to record a shot there.</div>
    <hr />
    <h2>Players</h2>
    <form @submit.prevent="addPlayer" class="input-group mb-2">
      <input
        :disabled="appState.requestPending == 'POST /players/new'"
        required
        class="form-control"
        placeholder="New player name"
        v-model.trim="newPlayer.name"
      />
      <button :disabled="!newPlayer.name || appState.requestPending" type="submit" class="btn btn-primary" title="Add a player">
        <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == 'POST /players/new'" />
        <i-fa-solid:user-plus v-else />
      </button>
    </form>
    <div class="row g-2 position-relative">
      <transition-group name="players" @before-leave="beforeLeave">
        <Player v-for="(player, index) in appState.players" v-bind="player" :key="player.id" :index="index" />
      </transition-group>
    </div>
  </div>
  <button class="d-none" data-bs-toggle="modal" data-bs-target="#shotModal" ref="shotModalButton"></button>
  <ShotModal id="shotModal" />
</template>

<script setup>
import { inject, onMounted, provide, reactive, ref } from "@vue/runtime-core";
import WelcomeScreen from "./WelcomeScreen.vue";

const appState = inject("state");
const apiCall = inject("apiCall");
const beforeLeave = inject("transitionListFix");

const shotModalButton = ref(null);

const newPlayer = reactive({ name: "" });
const newShot = reactive({
  x: 0,
  y: 0,
  points: 0,
  teamId: 0,
  missed: true,
});

const test = reactive({
  activePlayers: [],
  maxLimit: 5,
  isMaxLimit: false,
});

provide("courtWidth", 549);
provide("courtHeight", 320);
provide("newShot", newShot);
provide("activePlayers", test);

const userData = ref({});
onMounted(async function () {
  appState.players = await apiCall("/players").then((r) => r.json());
  userData.value = await apiCall("/users/me").then((r) => r.json());
});

async function addPlayer() {
  let player = await apiCall("/players/new", {
    method: "POST",
    body: JSON.stringify(newPlayer),
  }).then((plr) => plr.json());
  newPlayer.name = "";
  appState.players.push(player);
}

async function logout() {
  await apiCall("/token/revoke", { method: "POST" });

  // lol
  localStorage.removeItem("score-tracker-session");
  sessionStorage.removeItem("score-tracker-session");

  appState.token = null;
  appState.currentScreen = WelcomeScreen;
}

function startRecordingShot() {
  shotModalButton.value.click();
}
</script>

<style scoped>
.main-screen-bar-enter-active {
  transition: all 0.2s ease-in;
  max-height: 10em;
}

.main-screen-bar-enter-from {
  max-height: 0em;
  opacity: 0;
}

.players-leave-active {
  position: absolute;
}

.players-enter-active,
.players-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.players-leave-to,
.players-enter-from {
  opacity: 0%;
  transform: scale(80%);
}

.players-move {
  transition: transform 0.4s ease;
}
</style>

<template>
  <SideMenu />
  <div class="container pb-3">
    <h1 class="mt-2 text-secondary text-center">
      <b class="text-primary">FOHS</b>
      ScoreTracker
    </h1>
    <div class="text-center">
      <CourtSvg class="d-inline-block bg-dark p-1 mw-100 col-12 col-lg-6 mb-2 shadow" @click="startRecordingShot" />
    </div>
    <div class="text-muted text-center">Tap a spot on the court to record a shot there.</div>
    <hr />
    <h2>
      Players <small :class="'text-' + activePlayerColor">({{ activePlayerList.length }} active)</small>
    </h2>
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
  <!-- Modals -->
  <button class="d-none" data-bs-toggle="modal" data-bs-target="#shotModal" ref="shotModalButton"></button>
  <ShotModal id="shotModal" />
  <DeletePlayerModal v-for="(player, index) in appState.players" v-bind="player" :key="player.id" :index="index" />
</template>

<script setup>
import { inject, onMounted, provide, reactive, ref, computed } from "@vue/runtime-core";
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

provide("courtWidth", 549);
provide("courtHeight", 320);
provide("newShot", newShot);

const activePlayerList = computed(() => (appState.players || []).filter((p) => p.active === true));
provide("activePlayerList", activePlayerList);

onMounted(async function () {
  appState.players = await apiCall("/players").then((r) => r.json());
});

const activePlayerColor = computed(function () {
  switch (activePlayerList.value.length) {
    case 0:
      return "danger";
    case 5:
      return "success";
    default:
      return "muted";
  }
});

async function addPlayer() {
  let player = await apiCall("/players/new", {
    method: "POST",
    body: JSON.stringify(newPlayer),
  }).then((plr) => plr.json());
  newPlayer.name = "";
  appState.players.push(player);
}

function startRecordingShot() {
  if (activePlayerList.value.length > 0) shotModalButton.value.click();
}
</script>

<style scoped>
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

<template>
  <div class="col-md-6">
    <div class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ gameName }}</span>
      <div>
        points made:
        <b>{{ addScores }}</b>
      </div>

      <div class="row gx-1">
        <div class="col d-grid">
          <button
            :disabled="appState.requestPending"
            class="btn btn-sm btn-danger"
            data-bs-toggle="modal"
            :data-bs-target="`#delete-game-${id}`"
          >
            <i-fa-solid:user-minus />Delete Team
          </button>
        </div>

        <div class="col d-grid">
          <button :disabled="appState.requestPending" class="btn btn-sm btn-secondary" @click="updateCurrentGame(gameData)">select</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, computed } from "@vue/runtime-core";

const apiCall = inject("apiCall");
const appState = inject("state");

function updateCurrentGame(gameData) {
  appState.currentGame = gameData;
  appState.isCurrentGameSet = true;
  console.log("game is pressed");
}

const addScores = computed(() => {
  let overallScore = 0;
  props.playerList.forEach((player) => {
    player.shots.forEach((shot) => {
      if (shot.game_id === props.gameData.id && !shot.missed) overallScore += shot.points;
    });
  });
  return overallScore;
});

const props = defineProps({
  gameName: String,
  playerList: Object,
  id: Number,
  gameData: Object,
});
</script>

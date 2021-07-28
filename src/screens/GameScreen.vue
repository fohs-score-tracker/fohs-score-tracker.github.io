<template>
  <div class="container">
    <SideMenu />
    <h1 class="mt-2 text-secondary text-center">Your games</h1>
    <div class="row g-2 position-relative">
      <transition-group name="Game" @before-leave="beforeLeave">
        <Game
          v-for="game in appState.userGame"
          v-bind="game"
          :key="game.id"
          :gameName="game.id"
          :numberOfPoints=" addScores(game.team.players)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed } from "@vue/runtime-core";

const appState = inject("state");
const apiCall = inject("apiCall");
const userData = ref({});
const GameList = ref([]);

appState.usersGames = [];

const addScores = (player) => {
    player.shots.forEach((shot) => {
      overallScore += shot.points;
    });

  return overallScore;

  };

onMounted(async function () {
  userData.value = await apiCall("/users/me").then((r) => r.json());
  GameList.value = await apiCall("/games").then((k) => k.json());
  for (let game of GameList.value) {
    game.team.coaches.forEach((coach) => {
      console.log("coachID = %o, userID = %o", coach.id, userData.value.id);
      console.log(userData.value.id == coach.id);
      if (coach.id === userData.value.id) {
        appState.usersGames.push(game);
      }
    });
  }
});
</script>
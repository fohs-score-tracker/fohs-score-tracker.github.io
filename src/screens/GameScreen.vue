<template>
  <div class="container">
    <SideMenu />
    <h1 class="mt-2 text-secondary text-center">Your games</h1>
    <div class="row g-2 position-relative">
      <transition-group name="Game" @before-leave="beforeLeave">
        <Game
          v-for="game in appState.usersGames"
          v-bind="game"
          :key="game.id"
          :gameName="game.id"
          :numberOfPoints="addScores(game.team.players)"
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
const gameList = ref([]);
appState.usersGames = [];

const addScores = (players) => {
  let overallScore = 0;
  players.forEach((player) => {
    player.shots.forEach((shot) => {
      overallScore += shot.points;
      console.log(shot.points);
    });
  });
  return overallScore;
};

onMounted(async function () {
  userData.value = await apiCall("/users/me").then((r) => r.json());
  gameList.value = await apiCall("/games").then((k) => k.json());
  for (let game of gameList.value) {
    game.team.coaches.forEach((coach) => {
      console.log("coachID = %o, userID = %o", coach.id, userData.value.id);
      console.log(userData.value.id == coach.id);
      if (coach.id === userData.value.id) {
        appState.usersGames.push(game);
        console.log(game.team.players);
      }
    });
  }
});
</script>

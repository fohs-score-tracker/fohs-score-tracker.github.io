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
          :gameName="game.name"
          :id="game.id"
          :gameData="game"
          :playerList="game.team.players"
        />
      </transition-group>
    </div>

    <button id="addPlayerBtn"  data-bs-toggle="modal" data-bs-target="#addTeam"  class="btn  btn-danger rounded-circle"> <i-fa-solid:plus-circle/> </button>
  </div>
  <DeletePlayerModal
    v-for="(game, index) in appState.usersGames"
    v-bind="game"
    :key="game.id"
    :index="index"
    type="game"
  />
  
  <AddGameModal id="addTeam"/>


</template>

<script setup>
import { inject, onMounted, ref, computed } from "@vue/runtime-core";
import DeletePlayerModal from "../components/DeletePlayerModal.vue";
import Game from "../components/Game.vue";
import AddGameModal from "../components/addGameModal.vue";

const appState = inject("state");
const apiCall = inject("apiCall");
const userData = ref({});
const gameList = ref([]);




appState.usersGames = [];



onMounted(async function () {
  userData.value = await apiCall("/users/me").then((r) => r.json());
  gameList.value = await apiCall("/games").then((k) => k.json());
  for (let game of gameList.value) {
    game.team.coaches.forEach((coach) => {
      if (coach.id === userData.value.id && game.team.id === appState.teamId) {
        appState.usersGames.push(game);
      }
    });
  }
});
</script>



<style>

#addPlayerBtn{
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}


</style>
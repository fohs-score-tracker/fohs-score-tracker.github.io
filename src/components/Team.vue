<template>
  <div class="col-md-6" @click="moveScreen">
    <div  class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ teamName }}</span>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, computed, defineProps, markRaw } from "@vue/runtime-core";
import GameScreen from "../screens/GameScreen.vue";

const appState = inject("state");
const apiCall = inject("apiCall");

function moveScreen(){

  appState.team =  props.teamId
  appState.currentScreen = markRaw(GameScreen)

}


const props = defineProps({
  teamName: String,
  teamId: Number
});
</script>

<template>
  <div class="col-md-6">
    <div class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead"> {{ gameName }} </span>
      <div>
        points made: <b> {{ addScores }} </b>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, inject, computed } from "@vue/runtime-core";

const apiCall = inject("apiCall");
const appState = inject("state");

const addScores = computed(() => {
  let overallScore = 0;
  props.playerList.forEach((player) => {
    player.shots.forEach((shot) => {
      overallScore += shot.points;
    });
  });
  return overallScore;
});

const props = defineProps({
  gameName: String,
  playerList: Object,
});
</script>
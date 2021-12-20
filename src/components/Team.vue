<template>
  <div class="col-md-6">
    <div  class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ teamName }}</span>
      <div class="row gx-1">
          <div class="col d-grid">
            <button :disabled="appState.requestPending"
            class="btn btn-sm btn-danger" data-bs-toggle="modal"
            :data-bs-target="`#delete-team-${teamId}`"
            >
             <i-fa-solid:user-minus />
            Delete Team
            </button>
          </div>
          <div class="col d-grid">
           <button :disabled="appState.requestPending"
          class="btn btn-sm btn-secondary"   @click="moveScreen() ">select </button>
          </div>
          
          </div>
      </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref, computed, defineProps, markRaw } from "@vue/runtime-core";
import GameScreen from "../screens/GameScreen.vue";

const appState = inject("state");
const apiCall = inject("apiCall");

function moveScreen(){

  appState.teamId =  props.teamId
  appState.currentScreen = markRaw(GameScreen)

}


const props = defineProps({
  teamName: String,
  teamId: Number
});
</script>

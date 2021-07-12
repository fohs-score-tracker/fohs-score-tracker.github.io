<template>
  <div class="col-md-6">
    <div class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ name }}</span>
      <div>
        Points: <b>{{ points.total }}</b>
      </div>
      <div v-if="points.shots > 0">
        Shots: made <b>{{ points.madeShots }}</b> out of <b>{{ points.shots }}</b>
      </div>
      <div v-else>Shots: <b class="text-muted">None</b></div>
      <div class="btn-group float-end">
        <button
          :disabled="appState.requestPending"
          class="btn btn-danger"
          :title="'Delete ' + name"
          data-bs-toggle="modal"
          :data-bs-target="'#' + deleteModalId"
        >
          <i-fa-solid:user-minus />
        </button>
        <button
          class="btn"
          :class="playerRef.active ? 'btn-success' : 'btn-secondary'"
          :disabled="appState.requestPending || (activePlayerList.length >= 5 && !playerRef.active)"
          @click="toggleActive"
          :title="playerRef.active ? 'Activate' : 'Deactivate'"
        >
          <i-fa-solid:minus v-if="playerRef.active" />
          <i-fa-solid:plus v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, inject, ref } from "@vue/runtime-core";

const appState = inject("state");
const apiCall = inject("apiCall");
const activePlayerList = inject("activePlayerList");

const props = defineProps({
  name: String,
  id: Number,
  index: Number,
  shots: Array,
});

const points = computed(function () {
  let result = {
    total: 0,
    shots: 0,
    madeShots: 0,
  };

  for (let shot of props.shots) {
    result.shots++;
    if (!shot.missed) {
      result.madeShots++;
      result.total += shot.points;
    }
  }

  return result;
});

const playerRef = computed(() => appState.players[props.index]);

const deleteModalId = computed(() => `delete-player-${playerRef.value.id}`);

function toggleActive() {
  playerRef.value.active = !playerRef.value.active;
}
</script>

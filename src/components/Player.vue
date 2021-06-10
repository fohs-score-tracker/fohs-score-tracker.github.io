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
        <button :disabled="appState.requestPending" class="btn btn-danger" @click="deleteSelf" :title="'Delete ' + name">
          <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == `DELETE /players/${id}`" />
          <i-fa-solid:user-minus v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, inject } from "@vue/runtime-core";

const appState = inject("state");
const apiCall = inject("apiCall");

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

async function deleteSelf() {
  await apiCall(`/players/${props.id}`, { method: "DELETE" });
  appState.players.splice(props.index, 1);
}
</script>
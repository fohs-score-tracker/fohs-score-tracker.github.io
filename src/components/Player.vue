<template>
  <div class="col-md-6">
    <div class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ name }}</span>
      <div class="btn-group float-end" v-if="isNotActive">
        <button :disabled="appState.requestPending" class="btn btn-success" @click="addActivePlayer">
          <i-fa-solid:play />
        </button>
      </div>
      <!-- <div class="btn-group float-end" v-else>
        <button :disabled="appState.requestPending" class="btn btn-dark" @click="removePlayerActive">
          <i-fa-soild:pause />
        </button>
      </div> -->
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
import { computed, defineProps, inject, reactive, ref } from "@vue/runtime-core";

const appState = inject("state");
const apiCall = inject("apiCall");
const test = inject("activePlayers");
const isNotActive = ref(true);

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
function addActivePlayer() {
  if (test.activePlayers.length < 5) {
    test.activePlayers.push(props.id);
    isNotActive = ref(false);
  } else {
    test.isMaxLimit = true;
  }
  console.log(test);
}

function removeActivePlayer() {
  let pos = test.activePlayers.indexOf(props.id);
  test.activePlayers = test.activePlayers.splice(pos, 1);
  isNotActive = true;
}
</script>

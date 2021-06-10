<template>
  <div class="col-md-6">
    <div class="border bg-white p-1 clearfix rounded shadow-sm">
      <span class="lead">{{ name }}</span>
      <div>
        ID: <b>{{ id }}</b>
      </div>
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
import { defineProps, inject } from "@vue/runtime-core";

const appState = inject("state");
const apiCall = inject("apiCall");

const props = defineProps({
  name: String,
  id: Number,
  index: Number,
  shots: Array,
});

async function deleteSelf() {
  await apiCall(`/players/${props.id}`, { method: "DELETE" });
  appState.players.splice(props.index, 1);
}
</script>
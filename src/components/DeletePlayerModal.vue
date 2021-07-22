<template>
  <div class="modal fade" :id="`delete-player-${id}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-white bg-secondary justify-content-start">
          <i-fa-solid:user-minus class="me-1" />
          Delete {{ name }}
        </div>
        <div class="modal-body">
          Are you sure you want to
          <b class="text-danger">delete</b>
          this player?
        </div>
        <div class="modal-footer bg-light">
          <button class="btn btn btn-primary" @click="deletePlayer" :disabled="appState.requestPending">
            <span class="spinner-border spinner-border-sm" v-if="appState.requestPending == `DELETE /players/${id}`" />
            <i-fa-solid:check v-else />
            Delete
          </button>
          <button class="btn btn btn-secondary" data-bs-dismiss="modal" ref="closeDeleteModal" :disabled="appState.requestPending">
            <i-fa-solid:times />
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, computed } from "vue";

const apiCall = inject("apiCall");
const appState = inject("state");

const props = defineProps({
  index: Number,
  name: String,
  id: Number,
});

const closeDeleteModal = ref(null);

async function deletePlayer() {
  await apiCall(`/players/${props.id}`, { method: "DELETE" });
  appState.players.splice(props.index, 1);
  closeDeleteModal.value.click();
}
</script>

<template>
  <div class="modal fade" :id="`delete-${type}-${id}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-white bg-secondary justify-content-start">
          <i-fa-solid:user-minus class="me-1" />
          Delete {{ name }} 
        </div>
        <div class="modal-body">
          Are you sure you want to
          <b class="text-danger">delete</b>
          this {{needAGoodVarName }}?
        </div>
        <div class="modal-footer bg-light">
          <button class="btn btn btn-primary" @click="deleteSelector" :disabled="appState.requestPending">
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
  type: String
});

const closeDeleteModal = ref(null);

function deleteSelector(){
  if (props.type === "player")
      deletePlayer();
  else if (props.type === "game")
    deleteGame();
  else
      deleteTeam();




} 

const needAGoodVarName = computed(() => `${ props.type} ${props.name}`);

async function deleteGame(){
  await apiCall(`/games/${props.id}`, {method:"DELETE"});
  appState.usersGames.splice(props.index,1)
  closeDeleteModal.value.click();
}

async function deletePlayer() {
  await apiCall(`/players/${props.id}`, { method: "DELETE" });
  appState.players.splice(props.index, 1);
  closeDeleteModal.value.click();
}

async function deleteTeam(){
   await apiCall(`/teams/${props.id}`, {method: "DELETE"});
   appState.userTeams.splice(props.index, 1);
    closeDeleteModal.value.click();
}

</script>

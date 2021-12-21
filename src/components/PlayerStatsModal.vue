<template>
  <div class="modal fade" :id="`stats-player-${id}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-white bg-secondary justify-content-start">
          <i-fa-solid:chart-area class="me-1" />
          Stats for {{ name }}
        </div>
        <div class="modal-body">
          <CourtSvg class="bg-secondary p-1 mb-2" ignore-clicks :circles="gameShots" />
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Shot type</th>
                <th>Made shots</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free throw</td>
                <td>{{ calculatePoints(1, false) }}</td>
                <td>{{ calculatePoints(1, true) }}</td>
              </tr>
              <tr>
                <td>Two pointer</td>
                <td>{{ calculatePoints(2, false) }}</td>
                <td>{{ calculatePoints(2, true) }}</td>
              </tr>
              <tr>
                <td>Three pointer</td>
                <td>{{ calculatePoints(3, false) }}</td>
                <td>{{ calculatePoints(3, true) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer bg-light">
          <button class="btn btn btn-secondary" data-bs-dismiss="modal" ref="closeDeleteModal" :disabled="appState.requestPending">
            <i-fa-solid:times />
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, computed, reactive } from "vue";

const apiCall = inject("apiCall");
const appState = inject("state");

const props = defineProps({
  index: Number,
  name: String,
  id: Number,
  shots: Array,
});

const closeDeleteModal = ref(null);



const gameShots = computed(() =>{
    const tempArr = reactive([])
    for (let shot of props.shots){
      if(shot.game_id == appState.currentGame.id ){
        tempArr.push(shot);
      }
    }
      return tempArr;

})










async function deletePlayer() {
  await apiCall(`/players/${props.id}`, { method: "DELETE" });
  appState.players.splice(props.index, 1);
  closeDeleteModal.value.click();
}

function calculatePoints(points, total) {
  let count = 0;
  for (let shot of props.shots) {
    if (shot.points == points && shot.game_id == appState.currentGame.id && (total || !shot.missed)) count++;
  }
  return count;
}
</script>

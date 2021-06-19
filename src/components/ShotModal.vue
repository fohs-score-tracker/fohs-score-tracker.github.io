<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title">Record Shot</h5>
        </div>
        <div class="modal-body">
          <CourtSvg show-circle class="p-1 bg-primary mb-2" />
          <p class="text-primary text-center">The red circle shows where the shot was made from.</p>
          <form ref="form" @submit.prevent="onSubmit" id="shotForm" @input="formValid = form.checkValidity()">
            <fieldset :disabled="appState.requestPending">
              <b>Game ID</b>
              <input class="form-control font-monospace" required type="number" v-model="newShot.game_id" placeholder="Game ID" />
              <div class="form-text">TODO: select game from dropdown</div>
              <hr />
              <b>Which player threw the shot?</b>
              <div class="form-check" v-for="player in activePlayerData" :key="player">
                <input
                  required
                  :id="`shotRadioPlayer${player.id}`"
                  class="form-check-input"
                  type="radio"
                  :value="player.id"
                  name="player"
                  v-model="playerId"
                />
                <label :for="`shotRadioPlayer${player.id}`" class="form-check-label">{{ player.name }}</label>
              </div>
              <hr />
              <b>What kind of shot was it?</b>
              <div class="row">
                <div class="col-12 col-md-auto">
                  <div class="form-check">
                    <input
                      id="shotRadioFreeThrow"
                      required
                      type="radio"
                      class="form-check-input"
                      value="1"
                      v-model="newShot.points"
                      name="points"
                    />
                    <label for="shotRadioFreeThrow" class="form-check-label">Free throw</label>
                  </div>
                </div>
                <div class="col-12 col-md-auto">
                  <div class="form-check">
                    <input
                      id="shotRadio2Pointer"
                      required
                      type="radio"
                      class="form-check-input"
                      value="2"
                      v-model="newShot.points"
                      name="points"
                    />
                    <label for="shotRadio2Pointer" class="form-check-label">2 pointer</label>
                  </div>
                </div>
                <div class="col-12 col-md-auto">
                  <div class="form-check">
                    <input
                      id="shotRadio3Pointer"
                      required
                      type="radio"
                      class="form-check-input"
                      value="3"
                      v-model="newShot.points"
                      name="points"
                    />
                    <label for="shotRadio3Pointer" class="form-check-label">3 pointer</label>
                  </div>
                </div>
              </div>
              <hr />
              <div class="form-check">
                <input id="shotCheckboxMissed" type="checkbox" class="form-check-input" v-model="newShot.missed" />
                <label for="shotCheckboxMissed" class="form-check-label">Shot was missed</label>
              </div>
            </fieldset>
            <!-- TODO: add team -->
          </form>
        </div>
        <div class="modal-footer bg-light">
          <button :disabled="!formValid || appState.requestPending" class="btn btn-primary" form="shotForm" type="submit">
            <div class="spinner-border spinner-border-sm" v-if="appState.requestPending == `POST /players/${playerId}/shots/new`" />
            Record Shot
          </button>
          <button
            :disabled="appState.requestPending"
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            data-bs-target="#shotModal"
            ref="closeButton"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "@vue/runtime-core";

const apiCall = inject("apiCall");
const appState = inject("state");
const newShot = inject("newShot");
const test = inject("activePlayers");
const modal = ref(null);
const form = ref(null);
const closeButton = ref(null);
const activePlayerData = ref([]);

const formValid = ref(false);
const playerId = ref(0);

async function onSubmit() {
  let plr = await apiCall(`/players/${playerId.value}/shots/new`, {
    method: "POST",
    body: JSON.stringify(newShot),
  }).then((r) => r.json());
  appState.players.find((p) => p.id == playerId.value).shots = plr.shots;
  // reset values
  newShot.x = 0;
  newShot.y = 0;
  newShot.missed = true;
  newShot.gameId = 0;
  newShot.points = 0;
  closeButton.value.click();
}
</script>

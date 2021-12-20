<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-white bg-secondary justify-content-start">
          <i-fa-solid:user-plus class="me-1" />Add a Game
        </div>
        <div class="modal-body">
          <form
            ref="form"
            @submit.prevent="onSubmit"
            id="gameForm"
            @input="formValid = form.checkValidity()"
          >
            <fieldset :disabled="appState.requestPending">
              <div class="form-check">
                <label for="gameNameInput" class="form-check-label">Game Name</label>
                <input required type="text" class="form-control" v-model="gameTemp.name" />
                <br />

                <label for="otherTeamName" class="form-check-label">Other Team</label>
                <input
                  required
                  type="text"
                  id="otherTeamName"
                  v-model="gameTemp.other_team"
                  class="form-control"
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer bg-light">
        <button
          :disabled="!formValid || appState.requestPending"
          class="btn btn-primary"
          form="gameForm"
          type="submit"
        >
          <div
            class="spinner-border spinner-border-sm"
            v-if="appState.requestPending == `POST /games/new`"
          />Create game
        </button>

        <button
          :disabled="appState.requestPending"
          type="button"
          class="btn btn-outline-secondary"
          ref="closeButton"
          data-bs-dismiss="modal"
          data-bs-target="#addTeam"
        >Cancel</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, reactive, defineProps } from "@vue/runtime-core";


const formValid = ref(false);
const form = ref(null);
const apiCall = inject("apiCall");
const appState = inject("state");
const gameTemp = reactive({ name: "", team_id: 0, other_team: "", data: "" });
const closeButton = ref(null);



async function onSubmit() {
  gameTemp.data = Date.now().toString()
  gameTemp.team_id = appState.teamId
  console.log(gameTemp);
  let newGame = await apiCall(`/games/new`, {
    method: "POST",
    body: JSON.stringify(gameTemp)
  }).then((r) => r.json());

  appState.usersGames.push(newGame)
  closeButton.value.click();
  formValid.value = false;
}





</script>

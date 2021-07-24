<template>
  <div class="toast-container position-absolute bottom-0 end-0 p-3" id="toastPlacement">
    <div class="toast showing" v-if="needRefresh">
      <div class="toast-header">
        <strong class="me-auto">FOHS ScoreTracker</strong>
      </div>
      <div class="toast-body">
        An update is available
        <div class="row gx-1 pt-2">
          <div class="col d-grid">
            <button type="button" class="btn btn-primary btn-sm" @click="updateServiceWorker()">Reload</button>
          </div>
          <div class="col d-grid">
            <button type="button" class="btn btn-secondary btn-sm" @click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();
async function close() {
  needRefresh.value = false;
}
</script>

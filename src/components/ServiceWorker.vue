

<template>
    <div v-if="offlineReady"
    class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <strong> PWA message </strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
        The web app is offline ready.
    </div>
    </div>

    <div v-if="needRefresh" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <strong> PWA message </strong>
       <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
       <div class="toast-body">
         The web app needs to refresh.
         <button @click="updateServiceWorker()"> Reload </button> 
    </div>
    </div>
</template>





<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue"
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

</script>
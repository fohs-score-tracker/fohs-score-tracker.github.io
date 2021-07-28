<template>
      <div class="col-md-6">
          <div class="border bg-white p-1 clearfix rounded shadow-sm">
              <span class="lead"> {{gameName}} </span>
              <div>
                  points made: <b> {{numberOfPoints}} </b>
              </div>
          </div>
      </div>

</template>


<script setup>
import { defineProps, inject} from "@vue/runtime-core";

const apiCall = inject("apiCall");
const appState = inject("state");

const props = defineProps({
gameName: String,
numberOfPoints: Number,
})


</script>
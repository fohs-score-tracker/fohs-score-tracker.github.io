<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" :view-box.camel="`0 0 ${courtWidth} ${courtHeight}`" ref="court" @click="clicked">
      <image href="/src/assets/court.png" width="100%" height="100%" />
      <circle
        v-if="showCircle"
        :cx="(coords.x / 100) * courtWidth"
        :cy="(coords.y / 50) * courtHeight"
        r="15"
        fill="var(--bs-primary)"
        class="pe-none"
      />
    </svg>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, inject, ref } from "@vue/runtime-core";

const emit = defineEmit(["click"]);
const props = defineProps({
  showCircle: { type: Boolean },
});

const court = ref(null);
const courtWidth = inject("courtWidth");
const courtHeight = inject("courtHeight");

function clicked(e) {
  var rect = e.target.getBoundingClientRect();
  var styles = getComputedStyle(court.value);

  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  setCoords(styles, x, y);
}

const coords = inject("newShot");
function setCoords(styles, x, y) {
  x /= parseInt(styles.getPropertyValue("width"));
  y /= parseInt(styles.getPropertyValue("height"));

  coords.x = Math.round(x * 100);
  coords.y = Math.round(y * 50);
  emit("click");
}
</script>
<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :view-box.camel="`0 0 ${courtWidth} ${courtHeight}`"
      ref="court"
      @click="clicked"
      :style="{ cursor: ignoreClicks ? 'initial' : (!requireActive || activePlayerList.length) > 0 ? 'crosshair' : 'not-allowed' }"
    >
      <image href="/src/assets/court.png" width="100%" height="100%" />
      <template v-if="!hideCircles">
        <circle
          v-for="circle in circles"
          :key="circle"
          :cx="(circle.x / 100) * courtWidth"
          :cy="(circle.y / 50) * courtHeight"
          r="10"
          :fill="`var(${circle.missed === false ? '--bs-success' : '--bs-primary'})`"
          class="pe-none"
        />
      </template>
    </svg>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, inject, ref, reactive } from "@vue/runtime-core";

const activePlayerList = inject("activePlayerList");

const emit = defineEmit(["click"]);
const props = defineProps({
  requireActive: Boolean,
  hideCircles: Boolean,
  ignoreClicks: Boolean,
  circles: Array,
});

const court = ref(null);
const courtWidth = 549;
const courtHeight = 320;

function clicked(e) {
  if (props.ignoreClicks) return;

  var rect = e.target.getBoundingClientRect();
  var styles = getComputedStyle(court.value);

  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  x /= parseInt(styles.getPropertyValue("width"));
  y /= parseInt(styles.getPropertyValue("height"));

  props.circles[0].x = Math.round(x * 100);
  props.circles[0].y = Math.round(y * 50);

  emit("click");
}
</script>

<template>
  <transition name="alert">
    <div v-if="modelValue" class="alert alert-dismissible d-flex align-items-center" :class="['alert-' + props.type]">
      <slot>Something went wrong</slot>
      <button type="button" class="btn-close" @click="emit('update:modelValue', false)"></button>
    </div>
  </transition>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

var props = defineProps({
  type: String,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: 0.3s;
}

.alert-enter-from,
.alert-leave-to {
  transform: scale(80%);
  opacity: 0;
}
</style>

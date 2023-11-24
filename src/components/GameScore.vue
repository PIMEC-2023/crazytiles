<script setup>
defineProps(["score", "text"]);
</script>

<template>
  <p class="counter">
    {{ text }}: <span>{{ score }}</span>
  </p>
</template>

<style scoped>
.counter {
  padding: 10px 12px 10px 12px;
  background-color: var(--game-stats-bg);
  border-radius: 7px;
  margin: 0;

  color: white;
  font-weight: 700;
  font-size: 18px;
}

.counter span {
  color: var(--black);
}
</style>

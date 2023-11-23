<script setup>
defineProps(["imageUrl", "number"]);
</script>

<template>
  <div>
    <button :style="{ backgroundImage: `url(${imageUrl})` }" class="tile">
      <span class="number" v-show="!imageUrl">{{ number }}</span>
    </button>
  </div>
</template>

<style scoped>
div {
  width: 100px;
  height: 100px;
}

.tile {
  width: 100%;
  height: 100%;
  background: url("src/assets/imgs/tile-back.svg") no-repeat;
  background-size: cover;
  background-position: center;
}

.number {
    font-size: 3rem;
}
</style>

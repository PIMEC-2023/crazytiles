<script setup>

defineProps(["isRevealed", 'isDisabled']);
</script>

<template>
  <div class="card-tile">
    <button :disabled="isDisabled" class="tile" :class="{ revealed: isRevealed }">
      <span v-show="isRevealed" class="card">
        <slot />
      </span>
    </button>
  </div>
</template>

<style scoped>
.card-tile {
  width: 100px;
  height: 100px;
}

.tile {
  width: 100%;
  height: 100%;
  background: url("@/assets/imgs/tile-back.svg") no-repeat;
  background-size: cover;
  background-position: center;
}

.revealed {
  background: transparent;
}

@media screen and (min-width:360px) and (max-width:480px){
  .card-tile {
    width: 80px;
    height: 80px;
  }
}

</style>

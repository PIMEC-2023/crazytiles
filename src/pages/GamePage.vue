<script setup>
import GameBoard from "@/components/GameBoard.vue";
import { changePage, store, difficultyLevels } from "@/store";
import { computed } from "vue";
import { fruitsArray } from "../store";

const handleEndGame = (totalTime, attempts) => {
  console.log(totalTime, attempts);
  changePage("VictoryPage");
  store.finalScore.elapsedTime = totalTime;
  store.finalScore.attempts = attempts;
};

const handleUploadedImgs = computed(() => {
  if (store.gameConfig.themeSelected === "fruits") {
    return fruitsArray;
  } else if (store.gameConfig.themeSelected === "images") {
    return store.gameConfig.uploadedImgs;
  } else {
    return [];
  }
});
</script>

<template>
  <div>
    <GameBoard
      :audio="store.gameConfig.sound"
      :difficulty="store.gameConfig.difficulty"
      :difficulty-levels="difficultyLevels"
      :urls-array="handleUploadedImgs"
      @game-ended="handleEndGame"
    />
  </div>
</template>

<style scoped></style>

<script setup>
import GameBoard from "@/components/GameBoard.vue";
import { changePage, store } from "@/store";

const handleEndGame = (totalTime, attempts) => {
  console.log(totalTime, attempts);
  changePage("StartPage"); // TODO: tenemos que en realidad ir a VictoryPage y ver como le pasamos totalTime y attemps
  store.finalScore.elapsedTime = totalTime;
  store.finalScore.attempts = attempts;
};
</script>

<template>
  <div>
    <!-- Para subir imágenes custom -->
    <!-- <button @click="widget.open()">Subir imágenes</button> -->
    <GameBoard
      :audio="true"
      difficulty="easy"
      :urls-array="fruitsArray"
      @game-ended="handleEndGame"
    />
    <!-- <GameBoard :audio="true" difficulty="easy" @game-ended="handleEndGame" /> -->
    <!-- <GameBoard
      :audio="true"
      difficulty="easy"
      :urls-array="photosUls"
      @game-ended="handleEndGame"
    /> -->
  </div>
</template>

<style scoped></style>

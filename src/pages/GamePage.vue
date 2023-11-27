<script setup>
import GameBoard from "@/components/GameBoard.vue";
import { changePage, store } from "@/store";

import strawberry from "@/assets/imgs/frutas/maduixa.svg";
import banana from "@/assets/imgs/frutas/platan.svg";
import orange from "@/assets/imgs/frutas/taronja.svg";
import peach from "@/assets/imgs/frutas/pressec.svg";
import blueberries from "@/assets/imgs/frutas/nabius.svg";
import pear from "@/assets/imgs/frutas/pera.svg";
import cherries from "@/assets/imgs/frutas/cireres.svg";
import lemon from "@/assets/imgs/frutas/llimona.svg";
import grapes from "@/assets/imgs/frutas/raim.svg";
import kiwi from "@/assets/imgs/frutas/kiwi.svg";

const fruitsArray = [
  strawberry,
  banana,
  orange,
  peach,
  blueberries,
  pear,
  cherries,
  lemon,
  grapes,
  kiwi,
];

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

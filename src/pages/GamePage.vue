<script setup>
import GameBoard from "@/components/GameBoard.vue"
import { changePage, store } from "@/store";

const handleEndGame = (totalTime, attempts) => {
    console.log(totalTime, attempts);
    changePage("StartPage") // TODO: tenemos que en realidad ir a EndingPage y ver como le pasamos totalTime y attemps
    store.finalScore.elapsedTime = totalTime
    store.finalScore.attempts = attempts;
}

</script>

<template>
    <div>
        <!-- <GameBoard difficulty="easy" :urls-array="fruitsArray" /> -->
        <GameBoard :audio="store.gameConfig.sound" :difficulty="store.gameConfig.difficulty" :urls-array="store.gameConfig.urlsArray" @game-ended="handleEndGame" />
        <!-- <GameBoard difficulty="easy" :urls-array="uploadedPhotos" /> -->
    </div>
</template>

<style scoped></style>
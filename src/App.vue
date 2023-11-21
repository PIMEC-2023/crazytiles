<script setup>
import { ref, computed } from 'vue';

// Dimensiones del tablero
const dimensions = ref(4)

// Valores de las cartas
const cards = ref([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8])

// Variable que designa si estamos jugando o no
const isPlaying = ref(false)

// Variable que designa si debemos girar una carta o no
// const isFlipped = ref(false)

// Referencia a la primera carta volteada
const firstSelectedCard = ref(0)

// Referencia a la segunda carta volteada
const secondSelectedCard = ref(14)

const newGame = () => {
  if (dimensions.value % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }
  console.log("Game starts");
  isPlaying.value = true
}


</script>

<template>
  <main>
    <h1>Crazy Tiles</h1>
    <section v-if="isPlaying"  class="game" >
      <article v-for="(card, index) in cards" :key="index">
        <div><span>{{ card }}</span></div>
      </article>
    </section>
    <section v-else>
      <button @click="newGame">Start Game</button>
    </section>
  </main>
</template>

<style scoped>
    .game {
      display: flex;
      width: 50%;
    }
    div { 
      box-sizing: border-box;
      width: 50px; 
      height: 50px; 
      margin: 0;
      padding: 0;  
      border: 1px solid #404040; 
    }
    span{
      visibility: hidden;
    }
</style>

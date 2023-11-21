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
const firstSelectedCard = ref(null)

// Referencia a la segunda carta volteada
const secondSelectedCard = ref(null)

// Array con cartas acertadas

const matches = ref([])

const newGame = () => {
  if (dimensions.value % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }
  console.log("Game starts");
  isPlaying.value = true
}

const checkCards = (card, index) => {
  
  
  if (firstSelectedCard.value === null) {
    //First click
    firstSelectedCard.value = index
  }
  else {
    secondSelectedCard.value = index
   
  }
  if (firstSelectedCard.value !== null && secondSelectedCard.value !== null) {
    console.log('Ninguno es null');
    
    if (cards.value[firstSelectedCard.value] === cards.value[secondSelectedCard.value] ) {
      console.log('Hago push?');
      matches.value.push(card)
    }
   
    firstSelectedCard.value = null
    secondSelectedCard.value = null
    //Falta comprobar si ha acabado el juego
  }

}


</script>

<template>
  <main>
    <h1>Crazy Tiles</h1>
    <section v-if="isPlaying"  class="game" >
      <article v-for="(card, index) in cards" :key="index">
        <button @click="checkCards(card, index)"><span v-if="firstSelectedCard == index || secondSelectedCard == index">{{ card }}</span></button>
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
    button { 
      box-sizing: border-box;
      width: 50px; 
      height: 50px; 
      margin: 0;
      padding: 0;  
      border: 1px solid #404040; 
    }

   
   
</style>

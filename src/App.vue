<script setup>
import { ref } from "vue";

// Dimensiones del tablero
const dimensionsX = ref(4);
const dimensionsY = ref(4);

// en el caso de que se aplique que el usuario elija el tamaño del tablero X - Y:
const board = () => {
  // aquí realmente se pondra el array de fotos o símbolos
  const tilesArray = [];
  const totalTiles = dimensionsX.value * dimensionsY.value;
  for (let i = 1; i <= totalTiles / 2; i++) {
    tilesArray.push(i);
  }
  for (let i = 1; i <= totalTiles / 2; i++) {
    tilesArray.push(i);
  }
  return tilesArray;
};

// Valores de las cartas
const cards = ref(board());

// Variable que designa si estamos jugando o no
const isPlaying = ref(false);

// Variable que designa si debemos girar una carta o no
// const isFlipped = ref(false)

// Referencia a la primera carta volteada
const firstSelectedCard = ref(null);

// Referencia a la segunda carta volteada
const secondSelectedCard = ref(null);

// Array con cartas acertadas (quizás no necesitamos que sea ref.)
const matches = ref([]);

const newGame = () => {
  // SI FINALMENTE IMPLEMENTAMOS ELECCION TABLERO (X, Y) NO SE NECESITA:
  // if (dimensions.value % 2 !== 0) {
  //   throw new Error("The dimension of the board must be an even number.");
  // }
  console.log("Game starts");
  isPlaying.value = true;
};

let firstClick = false;
let isTimeoutActive = false;

const checkCards = (card, index) => {
  if (isTimeoutActive) {
    return;
  }

  if (firstClick === false) {
    firstSelectedCard.value = index;
    firstClick = true;
  } else {
    secondSelectedCard.value = index;
    firstClick = false;
  }

  if (firstSelectedCard.value !== null && secondSelectedCard.value !== null) {
    if (
      cards.value[firstSelectedCard.value] ===
      cards.value[secondSelectedCard.value]
    ) {
      matches.value.push(card);
    }

    isTimeoutActive = true;

    setTimeout(() => {
      firstSelectedCard.value = null;
      secondSelectedCard.value = null;
      isTimeoutActive = false;
    }, 1000);

    // comprobación end game
    if (matches.value.length * 2 === cards.value.length) {
      isPlaying.value = false;
      matches.value = [];
    }
  }
};

const disappearCard = (card) => {
  return {
    opacity: matches.value.includes(card) ? "0" : "1",
    transition: "opacity 1s",
  };
};
</script>

<template>
  <main>
    <h1>Crazy Tiles</h1>
    <section
      v-if="isPlaying"
      class="game"
      :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }"
    >
      <article v-for="(card, index) in cards" :key="index">
        <button
          class="tile"
          @click="checkCards(card, index)"
          :disabled="matches.includes(card)"
          :style="disappearCard(card)"
        >
          <!-- v-show="!matches.includes(card)" -->
          <span
            v-show="firstSelectedCard == index || secondSelectedCard == index"
            >{{ card }}</span
          >
        </button>
      </article>
    </section>
    <section v-else>
      <button @click="newGame">Start Game</button>
    </section>
  </main>
</template>

<style scoped>
.game {
  display: grid;
  justify-content: center;
}

article {
  width: 50px;
  height: 50px;
}
.tile {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #404040;
  color: red;
  /* background-image: url(./assets/images/perro.jpeg); */
}
</style>

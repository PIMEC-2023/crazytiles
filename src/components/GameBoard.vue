<script setup>
import { ref } from "vue";
import CardTile from "./CardTile.vue";

// Dimensiones del tablero
const dimensionsX = ref(3);
const dimensionsY = ref(4);

const tileBackPic = "src/assets/imgs/tile-back.svg";

const fruitsRute = "src/assets/imgs/frutas/";
const fruitsArray = ref([
  "cireres.svg",
  "kiwi.svg",
  "llimona.svg",
  "maduixa.svg",
  "nabius.svg",
  "pera.svg",
  "platan.svg",
  "pressec.svg",
  "raim.svg",
  "taronja.svg",
]);

// en el caso de que se aplique que el usuario elija el tamaño del tablero X - Y:
const board = () => {
  // aquí realmente se pondra el array de fotos o símbolos
  const tilesArray = [];
  const totalTiles = dimensionsX.value * dimensionsY.value;
  shuffleArray(fruitsArray.value);
  for (let i = 0; i < totalTiles / 2; i++) {
    tilesArray.push(`${fruitsRute}${fruitsArray.value[i]}`);
  }
  tilesArray.push(...tilesArray);
  shuffleArray(tilesArray);

  // fruitsAray.forEach((f) => tilesArray.push(f))
  // este sería para los números, se puede poner un if al principio de la funcion
  //   for (let i = 1; i <= totalTiles / 2; i++) {
  //     tilesArray.push(i);
  //   }
  //   for (let i = 1; i <= totalTiles / 2; i++) {
  //     tilesArray.push(i);
  return tilesArray;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

let cardBoard = board();

// Valores de las cartas
const cards = ref(cardBoard);

// Variable que designa si estamos jugando o no
const isPlaying = ref(false);

// Variable que designa si hemos terminado la partida
const isFinished = ref(false);

// Variable que designa si debemos girar una carta o no
// const isFlipped = ref(false)

// Referencia a la primera carta volteada
const firstSelectedCard = ref(null);

// Referencia a la segunda carta volteada
const secondSelectedCard = ref(null);

// Array con cartas acertadas (quizás no necesitamos que sea ref.)
const matches = ref([]);

const newGame = () => {
  console.log("Game starts");
  isPlaying.value = true;
  isFinished.value = false;
  cardBoard = board();
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
  } else if (firstClick === true && firstSelectedCard.value === index) {
    return;
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
      isFinished.value = true;
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
  <h1>Crazy Tiles</h1>
  <main>
    <section
      v-if="isPlaying"
      class="game"
      :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }"
    >
      <article v-for="(card, index) in cards" :key="index">
        <CardTile
          :imageUrl="
            firstSelectedCard == index || secondSelectedCard == index
              ? card
              : tileBackPic
          "
          @click="checkCards(card, index)"
          :disabled="matches.includes(card)"
          :style="disappearCard(card)"
        />
      </article>
    </section>
    <section v-else>
      <button @click="newGame">
        {{ isFinished ? "New Game" : "Start Game" }}
      </button>
    </section>
    <section v-show="isFinished">
      <h2>Has ganado</h2>
    </section>
  </main>
</template>

<style scoped>
.game {
  display: grid;
  justify-content: center;
}
</style>

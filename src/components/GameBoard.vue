<script setup>
import { ref } from "vue";
import CardTile from "./CardTile.vue";
import GameScore from "./GameScore.vue";
import GameTimer from "./GameTimer.vue";

import { shuffleArray } from "@/assets/utils.js";

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

// Dimensiones del tablero
const dimensionsX = ref(5);
const dimensionsY = ref(4);

const fruitsArray = ref([
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
]);

const chooseTheme = ref("");

// en el caso de que se aplique que el usuario elija el tamaño del tablero X - Y:
const board = () => {
  // aquí realmente se pondra el array de fotos o símbolos
  const tilesArray = [];
  const totalTiles = dimensionsX.value * dimensionsY.value;

  if (chooseTheme.value === "numbers") {
    for (let i = 1; i <= totalTiles / 2; i++) {
      tilesArray.push(i);
    }
    tilesArray.push(...tilesArray);
  }
  if (chooseTheme.value === "fruits") {
    shuffleArray(fruitsArray.value);
    for (let i = 0; i < totalTiles / 2; i++) {
      tilesArray.push(fruitsArray.value[i]);
    }
    tilesArray.push(...tilesArray);
  }
  shuffleArray(tilesArray);
  return tilesArray;
};

// Valores de las cartas
const cards = ref([]);

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
  cards.value = board();
  matches.value = [];
  attempts.value = 0;
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
    attempts.value++;
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

    if (matches.value.length * 2 === cards.value.length) {
      isFinished.value = true;
      isPlaying.value = false;
    }
  }
};

const disappearCard = (card) => {
  return {
    opacity: matches.value.includes(card) ? "0" : "1",
    transition: "opacity 1s",
  };
};

const attempts = ref(0);
</script>

<template>
  <h1>Crazy Tiles</h1>
  <main>
    <div v-if="isPlaying" class="main-page-game">
      <GameTimer :start="isPlaying" />
      <section
        class="game"
        :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }"
      >
        <article v-for="(card, index) in cards" :key="index">
          <div>
            <CardTile
              :is-revealed="
                firstSelectedCard === index || secondSelectedCard === index
              "
              :disabled="matches.includes(card)"
              :style="disappearCard(card)"
              @click="checkCards(card, index)"
            >
              <img
                v-if="chooseTheme === 'fruits'"
                :src="card"
                :alt="card.substr(24)"
              />
              <span v-else-if="chooseTheme === 'numbers'">{{ card }}</span>
            </CardTile>
          </div>
        </article>
      </section>
      <div class="score">
        <GameScore :score="attempts" text="Intentos"></GameScore>
        <GameScore :score="matches.length" text="Aciertos"></GameScore>
      </div>
    </div>
    <section v-else>
      <button @click="newGame">
        {{ isFinished ? "New Game" : "Start Game" }}
      </button>
      <h3>Temàtica</h3>
      <input type="radio" v-model="chooseTheme" value="numbers" />números
      <input type="radio" v-model="chooseTheme" value="fruits" />fruites
      <input type="radio" v-model="chooseTheme" value="pics" />personalitzat
    </section>
    <section v-show="isFinished">
      <h2>¡Has ganado!</h2>
      <p>Tiempo transcurrido: <GameTimer /></p>
      <p>Intentos: {{ attempts }}</p>
      <p>Aciertos: {{ matches.length }}</p>
    </section>
  </main>
</template>

<style scoped>
.main-page-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.game {
  display: grid;
  justify-content: center;
  gap: 2px;
}

.score {
  display: flex;
  gap: 10px;
}

span.card span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
span.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

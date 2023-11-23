<script setup>
import { ref } from "vue";
import CardTile from "./CardTile.vue";
import { computed } from "@vue/reactivity";

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
      tilesArray.push(`${fruitsRute}${fruitsArray.value[i]}`);
    }
    tilesArray.push(...tilesArray);
  }
  shuffleArray(tilesArray);
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
  totalSeconds.value = 0;
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

const totalSeconds = ref(0);
const minutes = ref("00");
const colon = ref(":");
const seconds = ref("00");
const showColon = ref(true);

const setTime = () => {
  if (isPlaying.value) {
    ++totalSeconds.value;
    showColon.value = !showColon.value;
  }
};

setInterval(setTime, 1000);

const pad = (value) => {
  const valString = value + "";
  return valString.length < 2 ? "0" + valString : valString;
};

const formattedTime = computed(() => {
  const sec = totalSeconds.value % 60;
  const min = Math.floor(totalSeconds.value / 60);

  seconds.value = pad(sec);
  minutes.value = pad(min);

  return `${minutes.value}${showColon.value ? colon.value : " "}${
    seconds.value
  }`;
});
</script>

<template>
  <h1>Crazy Tiles</h1>
  <main>
    <div v-if="isPlaying" class="main-page-game">
      <div class="timer">⏰ {{ formattedTime }}</div>
      <section
        class="game"
        :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }"
      >
        <article v-for="(card, index) in cards" :key="index">
          <div v-if="chooseTheme === 'fruits'">
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
          </div>
          <div v-else-if="chooseTheme === 'numbers'">
            <CardTile
              :imageUrl="
                firstSelectedCard == index || secondSelectedCard == index
                  ? null
                  : tileBackPic
              "
              :number="card"
              @click="checkCards(card, index)"
              :disabled="matches.includes(card)"
              :style="disappearCard(card)"
            />
          </div>
        </article>
      </section>
      <div>
        <div>Intentos: {{ attempts }}</div>
        <div>Aciertos: {{ matches.length }}</div>
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
      <p>Tiempo transcurrido: {{ minutes + colon + seconds }}</p>
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
}
</style>

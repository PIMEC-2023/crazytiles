<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";

// Dimensiones del tablero
const dimensionsX = ref(2);
const dimensionsY = ref(2);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

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
  shuffleArray(tilesArray);
  return tilesArray;
};

// intentos
const attempts = ref(0);

// timer
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

const pad = (val) => {
  const valString = val + "";
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

// Valores de las cartas
const cards = ref(board());

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

const withSound = ref(true);

const playSound = (sound) => {
  if (sound && withSound.value) {
    var audio = new Audio(sound);
    return audio;
  }
};

const gameMusicSound = playSound("src/assets/sounds/game-music.wav");
const clickTileSound = playSound("src/assets/sounds/click-tile.wav");
const matchSound = playSound("src/assets/sounds/match.wav");
const winSound = playSound("src/assets/sounds/win.wav");

const newGame = () => {
  // SI FINALMENTE IMPLEMENTAMOS ELECCION TABLERO (X, Y) NO SE NECESITA:
  // if (dimensions.value % 2 !== 0) {
  //   throw new Error("The dimension of the board must be an even number.");
  // }
  console.log("Game starts");
  isPlaying.value = true;
  isFinished.value = false;
  matches.value = [];
  attempts.value = 0;
  gameMusicSound.play();
  gameMusicSound.loop = true;
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
    clickTileSound.play();
  } else {
    secondSelectedCard.value = index;
    firstClick = false;
    attempts.value++;
    clickTileSound.play();
  }

  if (firstSelectedCard.value !== null && secondSelectedCard.value !== null) {
    if (
      cards.value[firstSelectedCard.value] ===
      cards.value[secondSelectedCard.value]
    ) {
      matches.value.push(card);
      matchSound.play();
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
      winSound.play();
      gameMusicSound.pause();
      gameMusicSound.currentTime = 0;
    }
  }
};

const disappearCard = (card) => {
  return {
    opacity: matches.value.includes(card) ? "0" : "1",
    transition: "opacity 1s",
  };
};

const handleSound = () => {
  withSound.value = !withSound.value;

  // Assuming you have a ref for the gameMusicSound audio element
  if (gameMusicSound) {
    gameMusicSound.muted = !withSound.value;
  }
  if (clickTileSound) {
    clickTileSound.muted = !withSound.value;
  }
};
</script>

<template>
  <main>
    <h1>Crazy Tiles</h1>
    <div class="main-page-game" v-if="isPlaying">
      <div class="timer">⏰ {{ formattedTime }}</div>
      <section
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
      <div>
        <div>Intentos: {{ attempts }}</div>
        <div>Aciertos: {{ matches.length }}</div>
        <button @click="handleSound">
          {{ withSound ? "🔇" : "🔊" }}
        </button>
      </div>
    </div>
    <section v-else>
      <button @click="newGame">
        {{ isFinished ? "New Game" : "Start Game" }}
      </button>
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

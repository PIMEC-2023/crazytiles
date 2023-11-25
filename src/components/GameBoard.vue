<script setup>
import { ref } from "vue";
import CardTile from "./CardTile.vue";
import GameScore from "./GameScore.vue";
import GameTimer from "./GameTimer.vue";

import { board } from "@/assets/utils.js";
import { formatTime } from "../assets/utils";

const props = defineProps([
  "urlsArray",
  "difficulty", // easy, medium, hard
]);

const difficultyLevels = {
  easy: {
    x: 2,
    y: 2,
  },
  medium: {
    x: 4,
    y: 5,
  },
  hard: {
    x: 4,
    y: 7,
  },
};

const dimensionsX = ref(difficultyLevels[props.difficulty].x);
const dimensionsY = ref(difficultyLevels[props.difficulty].y);

const cards = ref([]);

const isPlaying = ref(false);

const isFinished = ref(false);

const firstSelectedCard = ref(null);

const secondSelectedCard = ref(null);

const matches = ref([]);

const newGame = () => {
  console.log("Game starts");
  isPlaying.value = true;
  isFinished.value = false;
  cards.value = board(dimensionsX.value, dimensionsY.value, [
    ...props.urlsArray,
  ]);
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
      // TODO hay que guardarlo en una variable:
      handleCounter();
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

const counter = ref(0);

const handleCounter = () => {
  const totalSeconds = counter.value.totalSeconds;
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${formatTime(min)}:${formatTime(sec)}`;
};
</script>

<template>
  <h1>Crazy Tiles</h1>
  <main>
    <div v-if="isPlaying" class="main-page-game">
      <GameTimer ref="counter" :start="isPlaying" />
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
              <span v-if="!urlsArray">{{ card }}</span>
              <img v-else :src="card" />
              <!-- :alt="card.substr(24)" -->
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
      <!-- <h3>Temàtica</h3>
      <input type="radio" v-model="chooseTheme" value="numbers" />números
      <input type="radio" v-model="chooseTheme" value="fruits" />fruites
      <input type="radio" v-model="chooseTheme" value="pics" />personalitzat -->
    </section>
    <section v-if="isFinished">
      <h2>¡Has ganado!</h2>
      <p>Tiempo transcurrido:</p>
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

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import CardTile from "./CardTile.vue";
import GameScore from "./GameScore.vue";
import GameTimer from "./GameTimer.vue";

import { board } from "@/assets/utils.js";
import { formatTime } from "../assets/utils";
import { playAudioFile } from "../utils";

import errorAudio from "@/assets/audio/error.mp3";
import flipCardAudio from "@/assets/audio/flipcard.mp3";
import successAudio from "@/assets/audio/success_bell.mp3";
import victoryAudio from "@/assets/audio/victory.mp3";

// props

const props = defineProps({
  audio: Boolean,
  difficulty: String,
  urlsArray: Array
});

const emit = defineEmits(['gameEnded'])


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

// Variable que designa si hemos acertado o no la pareja
const success = ref(false)

// Variable que designa si debemos girar una carta o no
// const isFlipped = ref(false)

// Referencia a la primera carta volteada
const firstSelectedCard = ref(null);

const secondSelectedCard = ref(null);

const matches = ref([]);

const newGame = () => {
  console.log("Game starts");
  isPlaying.value = true;
  isFinished.value = false;
  cards.value = board(dimensionsX.value, dimensionsY.value,
    props.urlsArray);
  matches.value = [];
  attempts.value = 0;
};

let firstClick = false;
let isTimeoutActive = false;

const checkCards = (card, index) => {
  if (isTimeoutActive) {
    return;
  }

  // TODO: Este tipo de comparaciones cambiarlo por !firstClick
  if (firstClick === false) {
    firstSelectedCard.value = index;
    firstClick = true;
  } else if (firstClick === true && firstSelectedCard.value === index) {
    return; // TODO: Los returns tempranos que sean la primera opción de la rama condicional
  } else {
    secondSelectedCard.value = index;
    firstClick = false;
    attempts.value++;
  }

  playAudio(flipCardAudio, 0.1);


  // if (firstSelectedCard.value !== null && secondSelectedCard.value !== null) {
  //   if (
  //     cards.value[firstSelectedCard.value] ===
  //     cards.value[secondSelectedCard.value]
  //   ) {
  //     matches.value.push(card);
  //   }



  if (secondSelectedCard.value !== null) {
    if (cards.value[firstSelectedCard.value] === cards.value[secondSelectedCard.value]) {
      success.value = true //TODO: creo que mirando si 'card' está en matches, podemos reporoducir más tarde el audio de acierto
      matches.value.push(card);
    } else {
      success.value = false;
    }
    isTimeoutActive = true;

    setTimeout(() => {
      // comprobación end game
      if (matches.value.length * 2 === cards.value.length) {
        playAudio(victoryAudio, 0.3);
        isFinished.value = true;
        isPlaying.value = false;
        // TODO hay que enviar este tiempo total de alguna forma a EndingPage.vue
        //   Opción 1: en store.js, crear una variable de estado global
        //   Opción 2: exponerla con defineExpose , como el GameTimer.vue
        // Opción 3: emitir un evento para indicar a GamePage que he acabado con el totalTime y numero de intentos
        let totalTime = handleCounter();
        emit('gameEnded', totalTime, attempts.value)
        return
      }
      success.value ? playAudio(successAudio, 0.4) : playAudio(errorAudio, 0.1);
      firstSelectedCard.value = null;
      secondSelectedCard.value = null;
      isTimeoutActive = false;
    }, 1000);
  }
}
  ;

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

function playAudio(audioFile, volume) {
  if (!props.audio) { return }
  playAudioFile(audioFile, volume)
}

onMounted(() => {
  newGame()
})

</script>

<template>
  <h1>Crazy Tiles</h1>
  <main>
    <div class="main-page-game">
      <GameTimer ref="counter" :start="isPlaying" />
      <section class="game" :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }">
        <article v-for="(card, index) in cards" :key="index">
          <div>
            <CardTile :is-revealed="
              firstSelectedCard === index || secondSelectedCard === index
            " :disabled="matches.includes(card)" :style="disappearCard(card)" @click="checkCards(card, index)">
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

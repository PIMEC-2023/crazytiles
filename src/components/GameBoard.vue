<script setup>
import { onMounted, ref } from "vue";
import { useSound } from "@vueuse/sound";
import { useFullscreen } from '@vueuse/core';
import CardTile from "./CardTile.vue";
import GameScore from "./GameScore.vue";
import GameTimer from "./GameTimer.vue";



import { board } from "@/utils.js";
import { formatTime } from "@/utils.js";

import errorAudio from "@/assets/audio/error.mp3";
import flipCardAudio from "@/assets/audio/flipcard.mp3";
import successAudio from "@/assets/audio/success_bell.mp3";
import victoryAudio from "@/assets/audio/victory.mp3";

const props = defineProps({
  audio: Boolean,
  difficulty: String,
  urlsArray: Array,
});

const emit = defineEmits(["gameEnded"]);

const errorAudioSound = useSound(errorAudio, { volume: 0.1, soundEnabled: props.audio })
const flipCardAudioSound = useSound(flipCardAudio, { volume: 0.1, soundEnabled: props.audio })
const successAudioSound = useSound(successAudio, { volume: 0.4, soundEnabled: props.audio })
const victoryAudioSound = useSound(victoryAudio, { volume: 0.3, soundEnabled: props.audio })

const difficultyLevels = {
  easy: {
    x: 2,
    y: 2,
  },
  medium: {
    x: 4,
    y: 6,
  },
  hard: {
    x: 4,
    y: 8,
  },
};

const dimensionsX = ref(null);
const dimensionsY = ref(null);
const cards = ref([]);
const { toggle: toggleFullScreen, exit: exitFullScreen } = useFullscreen();

const firstSelectedCardIndex = ref(null);
const secondSelectedCardIndex = ref(null);
const matches = ref([]);
const attempts = ref(0);
const counter = ref(0);

const newGame = () => {
  console.log("Game starts");
  cards.value = board(dimensionsX.value, dimensionsY.value, props.urlsArray);
  matches.value = [];
  attempts.value = 0;
};

const selectedCards = ref({
  clickedCards: [],
  addCard(card) {
    this.clickedCards.push(card);
  },
  reset() {
    this.clickedCards = [];
  },
  isMatch() {
    if (this.clickedCards.length !== 2) {
      return;
    }
    return this.clickedCards[0] === this.clickedCards[1];
  },
});

let isTimeoutActive = false;
const checkCards = (card, index) => {
  if (isTimeoutActive) {
    return;
  }
  if (
    selectedCards.value.clickedCards.length === 1 &&
    firstSelectedCardIndex.value === index
  ) {
    return;
  } else if (selectedCards.value.clickedCards.length === 0) {
    firstSelectedCardIndex.value = index;
    selectedCards.value.addCard(card);
  } else if (selectedCards.value.clickedCards.length === 1) {
    secondSelectedCardIndex.value = index;
    attempts.value++;
    selectedCards.value.addCard(card);
  }

  flipCardAudioSound.play();

  if (selectedCards.value.clickedCards.length === 2) {
    if (selectedCards.value.isMatch()) {
      matches.value.push(card);
    }
    isTimeoutActive = true;
    setTimeout(() => {
      if (matches.value.length * 2 === cards.value.length) {
        victoryAudioSound.play();
        let totalTime = handleCounter();
        emit('gameEnded', totalTime, attempts.value)
        exitFullScreen();
        return
      }
      matches.value.includes(card)
        ? successAudioSound.play()
        : errorAudioSound.play();
      firstSelectedCardIndex.value = null;
      secondSelectedCardIndex.value = null;
      isTimeoutActive = false;
    }, 1000);
    selectedCards.value.reset();
  }
};

const disappearCard = (card) => {
  return {
    opacity: matches.value.includes(card) ? "0" : "1",
    transition: "opacity 1s",
  };
};

const handleCounter = () => {
  const totalSeconds = counter.value.totalSeconds;
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${formatTime(min)}:${formatTime(sec)}`;
};

onMounted(() => {
  const { x, y } = difficultyLevels[props.difficulty];
  dimensionsX.value = x;
  dimensionsY.value = y;
  newGame();
});
</script>

<template>
  <main>
    <div class="main-page-game">
      <div style="display: flex;">
        <GameTimer ref="counter" />
        <button @click="toggleFullScreen" style="padding-top: auto; padding-left: 10px;"><img
            src="src\assets\imgs\icon-full_screen.svg" alt=""></button>
      </div>

      <section class="game" :style="{ gridTemplateColumns: 'auto '.repeat(dimensionsX) }">
        <article v-for="(card, index) in cards" :key="index">
          <div>
            <CardTile :is-revealed="
              firstSelectedCardIndex === index ||
              secondSelectedCardIndex === index
            " :is-disabled="matches.includes(card)" :style="disappearCard(card)" @click="checkCards(card, index)">
              <span v-if="!urlsArray">{{ card }}</span>
              <img v-else :src="card" />
              <!-- :alt="card.substr(24)" -->
            </CardTile>
          </div>
        </article>
      </section>
      <div class="score">
        <GameScore :score="attempts" text="Intents"></GameScore>
        <GameScore :score="matches.length" text="Encerts"></GameScore>
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

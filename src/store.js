// store.js
import StartPage from "@/pages/StartPage.vue"
import GamePage from "@/pages/GamePage.vue"
import VictoryPage from "@/pages/VictoryPage.vue"

const pages = {
    StartPage,
    GamePage,
    VictoryPage,
}

import { reactive } from 'vue'

/**
 * 
 * @param {string} page Página a la que queremos cambiar la app "" 
 */
export const changePage = (page) => {
    store.currentPage = pages[page]
}

export const getCurrentPage = () => store.currentPage

export const setGameConfig = (difficulty, gameType, sound) => {
  store.gameConfig = {difficulty, gameType, sound}
}

export const store = reactive({
  currentPage: pages["StartPage"],
  finalScore: {
    elapsedTime: undefined,
    attempts: undefined
  },
  gameConfig: {
    difficulty: 'easy', // 'easy' | 'medium' | 'hard'
    gameType: 'numbers', // 'numbers' | 'images' | 'custom-images'
    sound: true,

  }
})
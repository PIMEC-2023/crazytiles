// store.js
import StartPage from "@/pages/StartPage.vue"
import GamePage from "@/pages/GamePage.vue"

const pages = {
    StartPage,
    GamePage
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
  gameConfig: {
    difficulty: 'easy', // 'easy' | 'medium' | 'hard'
    gameType: 'numbers', // 'numbers' | 'images' | 'custom-images'
    sound: true,

  }
})
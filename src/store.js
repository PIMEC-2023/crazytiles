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

export const setGameConfig = (difficulty, urlArrays, sound) => {
  store.gameConfig = {difficulty, urlArrays, sound}
}

export const store = reactive({
  currentPage: pages["StartPage"],
  finalScore: {
    elapsedTime: undefined,
    attempts: undefined
  },
  gameConfig: {
    difficulty: 'medium', // 'easy' | 'medium' | 'hard'
    urlArrays: [],
    sound: true,

  }
})
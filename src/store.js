// store.js
import ConfigPage from "@/components/ConfigPage.vue"
import GameBoard from "@/components/GameBoard.vue"

const pages = {
    ConfigPage,
    GameBoard
}

import { reactive } from 'vue'

export const changePage = (page) => {
    store.currentPage = pages[page]
}

export const store = reactive({
  currentPage: pages["GameBoard"]
})
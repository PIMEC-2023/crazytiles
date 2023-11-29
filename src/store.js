// store.js
import StartPage from "@/pages/StartPage.vue";
import GamePage from "@/pages/GamePage.vue";
import VictoryPage from "@/pages/VictoryPage.vue";
import { useLocalStorage } from "vue-composable";

const key = "uploadedPhotos";

const { storage } = useLocalStorage(key);

const pages = {
  StartPage,
  GamePage,
  VictoryPage,
};

import { reactive } from "vue";

/**
 *
 * @param {string} page Página a la que queremos cambiar la app ""
 */
export const changePage = (page) => {
  store.currentPage = pages[page];
};

export const getCurrentPage = () => store.currentPage;

export const setGameConfig = (difficulty, urlsArray, sound, themeSelected) => {
  store.gameConfig = { difficulty, urlsArray, sound, themeSelected };
};

export const store = reactive({
  currentPage: pages["StartPage"],
  finalScore: {
    elapsedTime: undefined,
    attempts: undefined,
  },
  gameConfig: {
    difficulty: "easy", // 'easy' | 'medium' | 'hard'
    urlsArray: [],
    sound: true,
    themeSelected: "numbers",
  },
});

export const setUrlsPhotos = (photosArray) => {
  storage.value = photosArray;
  store.gameConfig.urlsArray = photosArray;
};

export const getUrlPhotos = () => {
  if (storage.value == "undefined") {
    console.log("estoy dentro del if: ", storage.value);
    return [];
  }
  console.log("estoy FUERA del if: ", storage.value);
  return storage.value;
};

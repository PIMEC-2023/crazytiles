import { shallowReactive } from "vue";
import { useLocalStorage } from "vue-composable";
import StartPage from "@/pages/StartPage.vue";
import GamePage from "@/pages/GamePage.vue";
import VictoryPage from "@/pages/VictoryPage.vue";

import strawberry from "@/assets/imgs/frutas/maduixa.svg";
import banana from "@/assets/imgs/frutas/platan.svg";
import orange from "@/assets/imgs/frutas/taronja.svg";
import peach from "@/assets/imgs/frutas/pressec.svg";
import blueberries from "@/assets/imgs/frutas/nabius.svg";
import pear from "@/assets/imgs/frutas/pera.svg";
import cherries from "@/assets/imgs/frutas/cireres.svg";
import lemon from "@/assets/imgs/frutas/llimona.svg";
import grapes from "@/assets/imgs/frutas/raim.svg";
import kiwi from "@/assets/imgs/frutas/kiwi.svg";
import avocado from "@/assets/imgs/frutas/avocat.svg";
import raspberries from "@/assets/imgs/frutas/gerds.svg";
import pomegranate from "@/assets/imgs/frutas/magrana.svg";
import redCurrant from "@/assets/imgs/frutas/nabius-vermells.svg";
import pineapple from "@/assets/imgs/frutas/pinya.svg";
import apple from "@/assets/imgs/frutas/poma.svg";
import redApple from "@/assets/imgs/frutas/poma-vermella.svg";
import watermelon from "@/assets/imgs/frutas/sindria.svg";

export const fruitsArray = [
  strawberry,
  banana,
  orange,
  peach,
  blueberries,
  pear,
  cherries,
  lemon,
  grapes,
  kiwi,
  avocado,
  raspberries,
  pomegranate,
  redCurrant,
  pineapple,
  apple,
  redApple,
  watermelon,
];

const key = "uploadedPhotos";
const { storage } = useLocalStorage(key, []);

const pages = {
  StartPage,
  GamePage,
  VictoryPage,
};

/**
 *
 * @param {string} page Página a la que queremos cambiar la app ""
 */
export const changePage = (page) => {
  store.currentPage = pages[page];
};

export const getCurrentPage = () => store.currentPage;

export const store = shallowReactive({
  currentPage: pages["StartPage"],
  finalScore: {
    elapsedTime: undefined,
    attempts: undefined,
  },
  gameConfig: {
    difficulty: "easy", // 'easy' | 'medium' | 'hard'
    uploadedImgs: [],
    sound: true,
    themeSelected: "numbers",
  },
});

export const difficultyLevels = {
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

export const setGameConfig = (
  difficulty,
  uploadedImgs,
  sound,
  themeSelected
) => {
  store.gameConfig = {
    difficulty,
    uploadedImgs,
    sound,
    themeSelected,
  };
};

export const setUrlsPhotos = (photosArray) => {
  storage.value = photosArray;
  store.gameConfig.uploadedImgs = photosArray;
};

export const getUrlPhotos = () => {
  if (storage.value == 'undefined') {
    return []
  }
  return storage.value;
};

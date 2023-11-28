<script setup>
import { ref } from "vue";
import { useLocalStorage } from "vue-composable";
import UploadWidget from "@/components/UploadWidget.vue";
import { store } from "../store";

// TODO importar el resto de frutas
// TODO Poner esto en configuración

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

const fruitsArray = [
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
];

const photosUrls = ref([]);

const key = "localStorage";

const { storage } = useLocalStorage(key);

const handleUploadedPhotos = (uploadedPhotos) => {
  storage.value = [];
  photosUrls.value = uploadedPhotos.map((u) =>
    u.secure_url.replace("/upload/", "/upload/c_crop,g_custom/")
  );
  storage.value = photosUrls.value;
  store.gameConfig.urlsArray = storage.value;
};
</script>

<template>
  <div>
    <UploadWidget @photos="handleUploadedPhotos">
      <button>Subir imágenes</button>
    </UploadWidget>
  </div>
  <div class="thubnail-photos">
    <img :key="u.id" v-for="u in photosUrls" :src="u" alt="uploaded photo" />
  </div>
  <div>{{ storage }}</div>
</template>

<style scoped>
.thubnail-photos {
  display: flex;
  gap: 4px;
}

.thubnail-photos img {
  width: 50px;
}
</style>

<script setup>
// import DesignGuides from './components/DesignGuides.vue';
import ConfigPage from "@/components/ConfigPage.vue";
import GameBoard from "@/components/GameBoard.vue";

// esto se pondrá en configuración y se pasará como props:
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
import { ref } from "vue";

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

const uploadedPhotos = ref([]);

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
    upload_preset: import.meta.env.VITE_APP_UPLOAD_PRESET,
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done uploading...", result.info);
      uploadedPhotos.value.push(result.info.secure_url);
    }
  }
);
</script>

<template>
  <div>
    <!-- Descomentar el componente si quereis ver la guía de estilos de la app  -->
    <!-- <DesignGuides /> -->
    <ConfigPage />
    <!-- <GameBoard difficulty="easy" :urls-array="uploadedPhotos" /> -->
    <GameBoard difficulty="easy" :urls-array="fruitsArray" />
    <!-- <GameBoard difficulty="easy" /> -->
    <button @click="widget.open()">Subir imágenes</button>
  </div>
</template>

<style scoped></style>

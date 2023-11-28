<script setup>
import { ref } from "vue";
import UploadWidget from "@/components/UploadWidget.vue";

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
const handleUploadedPhotos = (uploadedPhotos) => {
  //
  console.log("handleUploadedPhotos: ", uploadedPhotos);
  photosUrls.value = uploadedPhotos.map((u) =>
    u.secure_url.replace("/upload/", "/upload/c_crop,g_custom/")
  );
};
</script>

<template>
  <div>
    <UploadWidget @photos="handleUploadedPhotos" />
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
// import DesignGuides from './components/DesignGuides.vue';
import { setGameConfig, changePage, getCurrentPage } from "@/store";
import NavBurguer from "./components/NavBurguer.vue";
import Logo from "@/assets/imgs/logo-isotype.svg"

// Para cambiar a otra página
//changePage("GamePage")

// Para configurar el juego. Ver fichero src/store.js
// setGameConfig("medium", "images", false)
</script>

<template>
  <div>
    <!-- Descomentar el componente si quereis ver la guía de estilos de la app  -->
    <!-- <DesignGuides /> -->
    <NavBurguer />
    <component :is="getCurrentPage()" />
  </div>
</template>

<style scoped></style>

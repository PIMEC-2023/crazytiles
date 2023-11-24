<script setup>
// import DesignGuides from './components/DesignGuides.vue';
import ConfigPage from "@/components/ConfigPage.vue";
import GameBoard from "@/components/GameBoard.vue";
import CardTile from "./components/CardTile.vue";
</script>

<template>
  <div>
    <!-- Descomentar el componente si quereis ver la guía de estilos de la app  -->
    <!-- <DesignGuides /> -->
    <ConfigPage />
    <GameBoard />
    <!-- <CardTile :is-revealed="true"><span><img src="./assets/imgs/frutas/cireres.svg" alt=""></span></CardTile> -->
  </div>
</template>

<style scoped></style>

<script setup>

// import DesignGuides from './components/DesignGuides.vue';
import { store } from "./store";


</script>

<template>
  <div>
    <!-- Descomentar el componente si quereis ver la guía de estilos de la app  -->
    <!-- <DesignGuides /> -->
    <component :is="store.currentPage" />
  </div>
</template>

<style scoped></style>

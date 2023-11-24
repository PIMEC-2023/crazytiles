<script setup>

// import DesignGuides from './components/DesignGuides.vue';
import { setGameConfig, changePage } from "@/store";

</script>

<template>
  <div>
    <!-- Descomentar el componente si quereis ver la guía de estilos de la app  -->
    <!-- <DesignGuides /> -->
    <component :is="store.currentPage" />
  </div>
</template>

<style scoped></style>

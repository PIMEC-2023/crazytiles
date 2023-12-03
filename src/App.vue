<script setup>
import { getCurrentPage } from "@/store";
import NavBurguer from "./components/NavBurguer.vue";

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

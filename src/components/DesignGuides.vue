<script setup>

import logo from "../assets/imgs/logo-crazytiles.svg";
import isotype from "../assets/imgs/logo-isotype.svg";
import { ColorBox } from "./ColorBox.vue";

</script>

<template>
  <!--LOGO: Isotipo y logotipo-->
  <section>
    <h2>Logo</h2>
    <img :src="logo" alt="">

    <h2>Isotype</h2>
    <img :src="isotype" alt="">
  </section>

  <!--Tipografía-->
  <section>
    <h2>Typography</h2>
    <ul>
      <li class="regular">
        Inter Regular
      </li>
      <li class="semi">
        Inter Semi Bold
      </li>
      <li class="bold">
        Inter Bold
      </li>
    </ul>
  </section>

  <!--Paleta de colors-->
  <section>
    <h2>Colors</h2>
    <div class="palette">
      <!--Color Box-->
      <ColorBox />
    </div>
  </section>
</template>

<style scoped></style>
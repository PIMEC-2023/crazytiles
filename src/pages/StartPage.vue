<script setup>
import { setGameConfig, changePage, store } from "@/store";

</script>

<template>
  <main>
    <div id="optionAccess">
      <img src="../assets/imgs/logo-isotype.svg" alt="" class="logo-iso" />
      <button @click="changePage('GamePage')" id="button__start">
        Iniciar el joc
      </button>
      <div id="button__config">Configuració</div>
    </div>
    <div>
      <setGameConfig />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--config-bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#menu {
  display: flex;
  justify-content: right;
  position: fixed;
  top: 25px;
  right: 25px;
}

.burger-icon {
  width: 24px;
}

#optionAccess {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-iso {
  width: 100px;
  margin-bottom: 44px;
}

#button__start {
  width: 300px;
  height: 80px;
  border-radius: 4px;
  background-color: white;
  font-family: "Inter";
  font-weight: 600;
  font-size: 32px;
  text-transform: uppercase;
  color: var(--config-bg);
  border-color: var(--white);
  margin-bottom: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  appearance: inherit;
}

#button__start:hover {
  transform: scale(1.05);
  transition-duration: 500ms;
  cursor: pointer;
}

#button__config {
  color: var(--white);
  font-family: "Inter";
  font-size: 24px;
}

#button__config:hover {
  cursor: pointer;
}
</style>

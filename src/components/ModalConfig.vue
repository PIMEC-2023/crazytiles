<script setup>
import { ref } from "vue";
import { store, setGameConfig } from "@/store.js"
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
import avocado from "@/assets/imgs/frutas/avocat.svg";
import raspberries from "@/assets/imgs/frutas/gerds.svg";
import pomegranate from "@/assets/imgs/frutas/magrana.svg";
import redCurrant from "@/assets/imgs/frutas/nabius-vermells.svg";
import pineapple from "@/assets/imgs/frutas/pinya.svg";
import apple from "@/assets/imgs/frutas/poma.svg";
import redApple from "@/assets/imgs/frutas/poma-vermella.svg";
import watermelon from "@/assets/imgs/frutas/sindria.svg";


defineProps({
  show: Boolean
});

const emit = defineEmits(['close'])



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
  avocado,
  raspberries,
  pomegranate,
  redCurrant,
  pineapple,
  apple,
  redApple,
  watermelon

];

const difficultySelected = ref(store.gameConfig.difficulty);
const soundSelected = ref(store.gameConfig.sound);
const themeSelected = ref(store.gameConfig.themeSelected);

const handleSubmit = () => {
  console.log("Configuració formulari: ", difficultySelected.value, soundSelected.value, themeSelected.value);



  if (themeSelected.value == 'fruits') {
    setGameConfig(difficultySelected.value, fruitsArray, soundSelected.value, themeSelected.value)
  } else if (themeSelected.value == 'numbers') {
    setGameConfig(difficultySelected.value, undefined, soundSelected.value, themeSelected.value)
  }

  emit('close');

}

</script>

<template>
  <Transition name="modal">
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <div class="modal-menu">
          <!-- creu -->
          <div class="modal-header">
            <button class="modal-default-button" @click="$emit('close')">
              <img src="../assets/imgs/icon-menu-close.svg" alt="">
            </button>
          </div>
          <!-- Inicio FORM -->
          <form @submit.prevent="handleSubmit" class="container">
            <!-- dficultat -->
            <div>
              <slot name="dificultat">

                <fieldset class="dificultat">
                  <legend class="headers">Dificultat</legend>
                  <!-- <h2 class="headers">Dificultat</h2> -->
                  <ul>
                    <li>
                      <input id="facil" type="radio" value="easy" v-model="difficultySelected" name="dificultat">
                      <label for="facil">Fàcil</label>
                    </li>
                    <li>
                      <input id="mitjana" type="radio" value="medium" v-model="difficultySelected" name="dificultat">
                      <label for="mitjana">Mitjana</label>
                    </li>
                    <li>
                      <input id="dificil" type="radio" value="hard" v-model="difficultySelected" name="dificultat">
                      <label for="dificil">Difícil</label>
                    </li>
                  </ul>
                </fieldset>

              </slot>
            </div>
            <!-- so -->
            <div class="so">
              <slot name="so">
                <fieldset class="so">
                  <legend class="headers">So</legend>
                  <!-- <h2 class="headers">So</h2> -->
                  <ul>
                    <li>
                      <input id="on" type="radio" :value="true" v-model="soundSelected" name="so">
                      <label for="on">On</label>
                    </li>
                    <li>
                      <input id="off" type="radio" :value="false" v-model="soundSelected" name="so">
                      <label for="off">Off</label>
                    </li>
                    <li>
                      <span>El so està: {{ soundSelected ? 'activat' : 'desactivat' }}</span>
                    </li>
                  </ul>
                </fieldset>
              </slot>
            </div>

            <!-- tematica -->
            <div>
              <fieldset class="tema">
                <legend class="headers">Temàtica</legend>
                <!-- <h2 class="headers">Temàtica</h2> -->
                <ul>
                  <li>
                    <input id="numeros" type="radio" value="numbers" name="tema" v-model="themeSelected">
                    <label for="numeros">Números</label>
                  </li>
                  <li>
                    <input id="fruites" type="radio" value="fruits" name="tema" v-model="themeSelected">
                    <label for="fruites">Fruites</label>
                  </li>
                  <!-- <li>
                              <input id="images" type="radio" value="images" name="tema" v-model="themeSelected">
                              <label for="images">Imatges</label>
                            </li> -->
                </ul>
              </fieldset>
            </div>

            <!-- imatges -->
            <div :style="{ visibility: themeSelected == 'images' ? 'visible' : 'hidden' }">
              <fieldset class="tema">
                <legend class="headers">Personalitzar imatges</legend>
                <!-- <h2 class="headers">Temàtica</h2> -->
                <ul>
                  <li>
                    <input id="numeros" type="file">
                  </li>
                </ul>
              </fieldset>
            </div>

            <!-- Botón "Guardar Configuración" -->
            <div class="button-container">
              <button class="button-configuration">Guardar Configuració</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* RESET */
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

/* Les mides tipogràfiques al disseny son molt petites, poder caldria repensar-ho */
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 15px;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  font-family: 'Inter', Helvetica, Arial;
  font-weight: 500;
  font-size: 18px;
}

.headers {
  text-align: left;
  font-size: 24px;
  font-weight: 700;
}

fieldset {
  border: 0;
  -webkit-appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  -moz-appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  width: 95%;
  margin: 0 auto;
  padding-bottom: 20px;
}

legend {
  padding: 0;
}

ul {
  display: flex;
  gap: 30px;
}

/* Estilización de los radio buttons personalizados */
ul li {
  list-style-type: none;
  /* Quita los marcadores de lista */

  display: flex;
  align-items: center;
  gap: 5px;

  -webkit-user-select: none;
  /* Evita la selección de texto en navegadores WebKit */
  -moz-user-select: none;
  /* Evita la selección de texto en navegadores Firefox */
  -ms-user-select: none;
  /* Evita la selección de texto en navegadores IE/Edge */
  user-select: none;
  /* Evita la selección de texto en navegadores */
}

/* Estilos para los botones de radio */
input[type="radio"] {
  accent-color: var(--config-bg);
  width: 30px;
  height: 30px;

  -webkit-appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  -moz-appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  appearance: none;
  /* Elimina los estilos predeterminados del navegador */
  outline: none;
  /* Quita el contorno predeterminado al enfocar */

  border: 2px solid var(--config-bg);
  border-radius: 50%;
  background-color: white;
  position: relative;
}

/* Creación del círculo central para el botón de radio */
input[type="radio"]::before {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--config-bg);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Centra el círculo */
  opacity: 0;
  /* Inicialmente oculta el círculo central */
}

/* Mostrar el círculo central cuando el botón de radio está seleccionado */
input[type="radio"]:checked::before {
  opacity: 1;
  /* Muestra el círculo central cuando el botón está marcado */
}

/* Estilo para el contenedor del botón */
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* Estilo para el botón "Guardar Configuración" */
.button-configuration {
  border-radius: 4px;
  background: var(--action-button-bg);
  padding: 8px 16px;
  color: white;
  font-size: 24px;
  font-weight: 700;
}

.button-configuration:hover {
  background: var(--action-buttton-bg-hover);
}
</style>

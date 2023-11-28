<script setup>
import { ref } from "vue";

const props = defineProps({
  show: Boolean
});

const difficultySelected = ref("");
const soundSelected = ref("");
const themeSelected = ref("");



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
          <form class="container">
            <!-- dficultat -->
            <div>
              <slot name="footer">
                <h2 class="headers">Dificultat</h2>
                <ul>
                  <li>
                    <input id="facil" type="radio" value="facil" v-model="difficultySelected" name="dificultat">
                    <label for="facil">Fàcil</label>
                  </li>
                  <li>
                    <input id="mitjana" type="radio" value="mitjana" v-model="difficultySelected" name="dificultat">
                    <label for="mitjana">Mitjana</label>
                  </li>
                  <li>
                    <input id="dificil" type="radio" value="dificil" v-model="difficultySelected" name="dificultat">
                    <label for="dificil">Difícil</label>
                  </li>
                </ul>
              </slot>
            </div>
            <!-- so -->
            <div class="modal-credits">
              <slot name="Crèdits">
                <h2 class="headers">So</h2>
                <ul>
                  <li>
                    <input id="on" type="radio" value="on" v-model="soundSelected" name="so">
                    <label for="on">On</label>
                  </li>
                  <li>
                    <input id="off" type="radio" value="off" v-model="soundSelected" name="so">
                    <label for="off">Off</label>
                  </li>
                  <li>
                    <span>El so està {{ soundSelected }}</span>
                  </li>
                </ul>
              </slot>
            </div>
            <!-- tematica -->
            <div>
              <h2 class="headers">Temàtica</h2>
              <ul>
                <li>
                  <input id="numeros" type="radio" value="numbers" name="tema" v-model="themeSelected">
                  <label for="numeros">Números</label>
                </li>
                <li>
                  <input id="fruites" type="radio" value="fruits" name="tema" v-model="themeSelected">
                  <label for="fruites">Fruites</label>
                </li>
              </ul>
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
  max-width: 330px;
  width: 100%;
  margin: 0 auto;
  font-family: 'Inter', Helvetica, Arial;
  font-weight: 500;
  font-size: 18px;
}

.headers {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
}

ul {
  display: flex;
  gap: 30px;
}

/* Estilización de los radio buttons personalizados */
ul li {
  list-style-type: none;  /* Quita los marcadores de lista */

  display: flex;
  align-items: center;
  gap: 5px;

  -webkit-user-select: none;  /* Evita la selección de texto en navegadores WebKit */
  -moz-user-select: none;  /* Evita la selección de texto en navegadores Firefox */
  -ms-user-select: none;  /* Evita la selección de texto en navegadores IE/Edge */
  user-select: none;  /* Evita la selección de texto en navegadores */
}

/* Estilos para los botones de radio */
input[type="radio"] {
  accent-color: var(--config-bg);
  width: 30px;
  height: 30px;
  -webkit-appearance: none;  /* Elimina los estilos predeterminados del navegador */
  -moz-appearance: none;  /* Elimina los estilos predeterminados del navegador */
  appearance: none;  /* Elimina los estilos predeterminados del navegador */
  outline: none;  /* Quita el contorno predeterminado al enfocar */
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
  transform: translate(-50%, -50%);  /* Centra el círculo */
  opacity: 0;  /* Inicialmente oculta el círculo central */
}

/* Mostrar el círculo central cuando el botón de radio está seleccionado */
input[type="radio"]:checked::before {
  opacity: 1;  /* Muestra el círculo central cuando el botón está marcado */
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
  background: var(--blau, #1747E7);
  padding: 8px 16px;
  color: white;
  font-size:18px;
}
</style>

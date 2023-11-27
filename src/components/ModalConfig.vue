<script setup>
import { ref } from "vue";

const props = defineProps({
  show: Boolean
})

const difficultySelected = ref("");
const soSelected = ref("");

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-menu">
        <!--creu-->
        <div class="modal-header">
          <button
              class="modal-default-button"
              @click="$emit('close')"
            ><img src="../assets/imgs/icon-menu-close.svg" alt=""></button>
        </div>
        <!--Inicio FORM-->
        <form>
        
        <!--dficultat-->
        <div class="">
          <slot name="footer">
            <h2>Dificultat</h2>
              <ul>
                <li>
                  <input id="facil" type="radio" value="easy" v-model="difficultySelected">
                  <label for="facil">Fàcil</label>
                </li>
                <li>
                  <input id="mitjana" type="radio" value="medium" v-model="difficultySelected">
                  <label for="mitjana">Mitjana</label>
                </li>
                <li>
                  <input id="dificil" type="radio" value="hard" v-model="difficultySelected">
                  <label for="dificil">Difícil</label>
                </li>
              </ul>
            </slot>
        </div>

        <!--so-->
        <div class="modal-credits">
          <slot name="Crèdits">
            <h2>So</h2>
            <ul>
              <li>
                <input id="on" type="radio" value="on" v-model="soSelected">
                <label for="on">On</label>
              </li>
              <li>
                <input id="off" type="radio" value="off" v-model="soSelected">
                <label for="off">Off</label>
              </li>
              <li>
                <span>El so està {{ soSelected }}</span>
              </li>
            </ul>
          </slot>
        </div> 
        
        <!--tematica-->
        <div>
        <h2>Temàtica</h2>
              <ul>
                <li>
                  <input id="numeros" type="radio" value="numbers">
                  <label for="numeros">Números</label>
                </li>
                <li>
                  <input id="fruites" type="radio" value="fruits">
                  <label for="fruites">Fruites</label>
                </li>
              </ul>
        </div>
        </form>

        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/*RESET*/
* {
  margin:0;
  padding:0;
  border:0;
  box-sizing: border-box;
}

ul li {
  list-style-type:none;
}

</style>
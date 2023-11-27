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
        <form class="container">
        
        <!--dficultat-->
        <div class="">
          <slot name="footer">
            <h2>Dificultat</h2>
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
            </slot>
        </div>

        <!--so-->
        <div class="modal-credits">
          <slot name="Crèdits">
            <h2>So</h2>
            <ul>
              <li>
                <span class="custom"></span>
                <input id="on" type="radio" value="on" v-model="soSelected" name="so">
                <label for="on">On</label>
              </li>
              <li>
                <input id="off" type="radio" value="off" v-model="soSelected" name="so">
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
                  <input id="numeros" type="radio" value="numbers" name="tema">
                  <label for="numeros">Números</label>
                </li>
                <li>
                  <input id="fruites" type="radio" value="fruits" name="tema">
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

/*Les mides tipogràfiques al disseny son molt petites, poder caldria repensar-ho*/
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap:12px;
  
  max-width: 330px;
  width:100%;
  margin:0 auto;

  font-family: 'Inter', Helvetica, Arial;
  font-weight: 500;
  font-size: 14px;
}

.container h2 {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
}

ul {
  display: flex;
}

/*He estat fent una ullada aquí: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio*/

ul li {
  list-style-type:none;
  display:flex;
  align-items: center;
  gap:9px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/*Amaga els type="radio" dels navegadors, no els renderitza*/
input[type="radio"]{
  accent-color: var(--config-bg);
  width: 0px;
  height: 0px;
  visibility:collapse;
}
/*Aquesta class crea un radio "fals" seguir el disseny*/
.custom {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  padding:1px;
  border:1px solid var(--config-bg);
  outline-offset: 1px solid var(--config-bg);
}
/*Estic intentant que en estat marcat, aparegui la rodona.svg*/
.custom:checked {
  background-image: url(../assets/imgs/rodona.svg) center;
  background-size: cover;
}


</style>
<script setup>
import { onMounted, ref, computed } from "vue";
import {
  store,
  setGameConfig,
  setUrlsPhotos,
  getUrlPhotos,
  fruitsArray,
} from "@/store.js";
import UploadWidget from "@/components/UploadWidget.vue";

import crossIcon from "@/assets/imgs/circle-xmark-solid.svg";

import { difficultyLevels } from "../store";
import { shuffleArray } from "../utils";

import iconSubmit from "@/assets/imgs/icon-submit-imgs.svg";

defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const difficultySelected = ref(store.gameConfig.difficulty);
const soundSelected = ref(store.gameConfig.sound);
const themeSelected = ref(store.gameConfig.themeSelected);

const remainingPhotos = computed(() => {
  return (
    (difficultyLevels[difficultySelected.value].x *
      difficultyLevels[difficultySelected.value].y) /
      2 -
    photosUrls.value.length
  );
});

const handleSubmit = () => {
  console.log(
    "Configuració formulari: ",
    difficultySelected.value,
    soundSelected.value,
    themeSelected.value
  );
  if (themeSelected.value == "fruits") {
    setGameConfig(
      difficultySelected.value,
      [],
      soundSelected.value,
      themeSelected.value
    );
  } else if (themeSelected.value == "numbers") {
    setGameConfig(
      difficultySelected.value,
      [],
      [],
      soundSelected.value,
      themeSelected.value
    );
  } else if (themeSelected.value == "images") {
    if (remainingPhotos.value !== 0) {
      shuffleArray(fruitsArray);
      while (remainingPhotos.value !== 0) {
        photosUrls.value.push(fruitsArray[remainingPhotos.value]);
      }
    }
    setGameConfig(
      difficultySelected.value,
      photosUrls.value,
      soundSelected.value,
      themeSelected.value
    );
    photosUrls.value = store.gameConfig.uploadedImgs;
  }
  emit("close");
};

const photosUrls = ref([]);

const handleUploadedPhotos = (uploadedPhotos) => {
  const newPhotos = uploadedPhotos.map((u) =>
    u.secure_url.replace("/upload/", "/upload/c_crop,g_custom/")
  );
  photosUrls.value = [...photosUrls.value, ...newPhotos];
  setUrlsPhotos(photosUrls.value);
};

const removeImage = (image) => {
  photosUrls.value = photosUrls.value.filter((img) => img !== image);
  setUrlsPhotos(photosUrls.value);
};

onMounted(() => {
  console.log("Ejecutando onMounted");
  photosUrls.value = getUrlPhotos();
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-menu">
          <!-- creu -->
          <div class="modal-header">
            <button class="modal-default-button" @click="$emit('close')">
              <img src="../assets/imgs/icon-menu-close.svg" alt="" />
            </button>
          </div>
          <!-- Inicio FORM -->
          <form @submit.prevent="handleSubmit" class="container">
            <!-- dficultat -->
            <div>
              <slot name="dificultat">
                <fieldset class="dificultat">
                  <legend class="headers">Dificultat</legend>
                  <ul>
                    <li>
                      <input
                        id="facil"
                        type="radio"
                        value="easy"
                        v-model="difficultySelected"
                        name="dificultat"
                      />
                      <label for="facil">Fàcil</label>
                    </li>
                    <li>
                      <input
                        id="mitjana"
                        type="radio"
                        value="medium"
                        v-model="difficultySelected"
                        name="dificultat"
                      />
                      <label for="mitjana">Mitjana</label>
                    </li>
                    <li>
                      <input
                        id="dificil"
                        type="radio"
                        value="hard"
                        v-model="difficultySelected"
                        name="dificultat"
                      />
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
                  <ul>
                    <li>
                      <input
                        id="on"
                        type="radio"
                        :value="true"
                        v-model="soundSelected"
                        name="so"
                      />
                      <label for="on">On</label>
                    </li>
                    <li>
                      <input
                        id="off"
                        type="radio"
                        :value="false"
                        v-model="soundSelected"
                        name="so"
                      />
                      <label for="off">Off</label>
                    </li>
                    <li>
                      <span
                        >El so està:
                        {{ soundSelected ? "activat" : "desactivat" }}</span
                      >
                    </li>
                  </ul>
                </fieldset>
              </slot>
            </div>

            <!-- tematica -->
            <div>
              <fieldset class="tema">
                <legend class="headers">Temàtica</legend>
                <ul>
                  <li>
                    <input
                      id="numeros"
                      type="radio"
                      value="numbers"
                      name="tema"
                      v-model="themeSelected"
                    />
                    <label for="numeros">Números</label>
                  </li>
                  <li>
                    <input
                      id="fruites"
                      type="radio"
                      value="fruits"
                      name="tema"
                      v-model="themeSelected"
                    />
                    <label for="fruites">Fruites</label>
                  </li>
                  <li>
                    <input
                      id="images"
                      type="radio"
                      value="images"
                      name="tema"
                      v-model="themeSelected"
                    />
                    <label for="images">Imatges</label>
                  </li>
                </ul>
              </fieldset>
            </div>

            <!-- imatges -->
            <div
              :style="{
                visibility: themeSelected == 'images' ? 'visible' : 'hidden',
              }"
            >
              <fieldset class="tema">
                <legend class="headers">Personalitzar imatges</legend>
                <ul>
                  <li class="image-upload">
                    <UploadWidget @photos="handleUploadedPhotos">
                      <img
                        class="down-icon"
                        :src="iconSubmit"
                        alt="pujar imatges"
                      />
                      <div>Pujar imatges</div>
                    </UploadWidget>
                  </li>
                  <li>
                    <div class="thumbnail-photos">
                      <div
                        class="thumbnail-container"
                        :key="u.id"
                        v-for="u in photosUrls"
                      >
                        <img
                          @click="removeImage(u)"
                          class="remove-icon"
                          :src="crossIcon"
                          alt="remove img"
                        />
                        <img
                          class="thumbnail-img"
                          alt="uploaded photo"
                          :src="u"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
                <p v-show="remainingPhotos > 0">
                  Et falten per pujar
                  <span>{{ remainingPhotos }}</span> foto<span
                    v-show="remainingPhotos != 1"
                    >s</span
                  >
                </p>
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
  font-family: "Inter", Helvetica, Arial;
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

.down-icon {
  width: 25px;
  fill: var(--config-bg);
}
.image-upload > input {
  display: none;
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

.thumbnail-photos {
  display: flex;
  gap: 6px;
}

.thumbnail-img {
  width: 60px;
}

.thumbnail-container {
  position: relative;
}

.remove-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
}
/*Prueba*/
@media screen and (min-width: 360px) {
  ul {
    gap: 10px;
  }

  li {
    gap: 10px;
  }

  .container {
    font-size: 14px;
  }
}
</style>

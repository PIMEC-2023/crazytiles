<script setup>
import { setGameConfig, changePage, store } from "@/store";
import NavConfig from "@/components/NavConfig.vue";

// esto se pondrá en configuración y se pasará como props:
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
import { ref } from "vue";

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
];

const uploadedPhotos = ref([]);

const widget = window.cloudinary.createUploadWidget(
    {
        cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
        upload_preset: import.meta.env.VITE_APP_UPLOAD_PRESET,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 1,
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done uploading...", result.info);
            uploadedPhotos.value.push(result.info.secure_url);
        }
    }
);
</script>

<template>
    <div>

        <!-- Para subir imágenes custom -->
        <!-- <button @click="widget.open()">Subir imágenes</button> -->
    </div>
    <main>

        <div id="optionAccess">
            <img src="../assets/imgs/logo-isotype.svg" alt="" class="logo-iso">
            <button @click="changePage('GamePage')" id="button__start">Iniciar el joc</button>
            <!-- <div id="button__config">Configuració</div> -->
            <NavConfig />

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
    font-family: 'Inter';
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
    font-family: 'Inter';
    font-size: 24px;
}

#button__config:hover {
    cursor: pointer;
}
</style>
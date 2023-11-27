<template>
    <div>
        <!--Botón para alternar pantallacompleta-->
        <button @click="toggleFullscreen" style="padding-top: 100%;"><img src="src\assets\imgs\icon-full_screen.svg" alt=""></button>
        <!-- Contenedor que se muestra en pantalla completa-->
        <div v-if="isFullscreen" @fullscreenchange="handleFullscreenChange">
        <slot></slot> <!-- Permite pasar contenido adicional a un componente desde el componente padre-->
        </div>
    </div>
</template>
<script>
import {ref, onMounted } from "vue";

export default {
    setup() {
        //Estado de pantalla completa
        const isFullscreen = ref(false);
        //Función para alternar pantalla completa
        const toggleFullscreen = () => {
            const element = document.documentElement;

            if (!isFullscreen.value) {
                //Entramos en modo pantalla completa
                if (element.requestFullscreen) {
                    element.requestFullscreen().then(() => {
                        isFullscreen.value = true;
                    });
                } else
                //Salimos del modo pantalla completa
                if (document.exitFullscreen) {
                    document.exitFullscreen().then(() => {
                        isFullscreen.value = false;
                    });
                }
            }
        }; 
        //Manejamos el cambio en el estado de pantalla completa
        const handleFullscreenChange = () => {
            isFullscreen.value = !isFullscreen.value;
        }; 
        //Suscribimos al evento de montaje para manejar eventos de pantalla completa
        onMounted(() => {
            document.addEventListener("fullscreenchange", handleFullscreenChange);
        });
        //Devuelve variable y funciones 
        return {
            isFullscreen,
            toggleFullscreen,
        };
    },
};
</script>
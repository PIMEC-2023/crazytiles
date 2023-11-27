<template>
    <div>
        <!--Botón para alternar pantallacompleta-->
        <button @click="toggleFullscreen" style="padding-top: 100%;"><img src="src\assets\imgs\icon-full_screen.svg"
                alt=""></button>
        <!-- Contenedor que se muestra en pantalla completa-->
        <div v-if="isFullscreen" @fullscreenchange="handleFullscreenChange">
            <slot></slot> <!-- Permite pasar contenido adicional a un componente desde el componente padre-->
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";

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
                } else if (document.exitFullscreen) {
                    document.exitFullscreen().then(() => {
                        isFullscreen.value = false;

                    });
                }
            //subscribimos al evento keydown para salir de pantalla completa 
            window.addEventListener("keydown", handleKeydown);
            } else {
                //salimos de pantalla completa
                document.exitFullscreen().then(() => {
                    isFullscreen.value = false;
                    //descubrimos el evento keydown al salir de pantalla completa
                    window.removeEventListener("keydown", handleKeydown);

                });
            }
        };
        //manejamos el evento keydown para salir de pantalla al presionar  "Escape"
        const handleKeydown = (event) => {
            if (event.key === "Escape") {
                document.exitFullscreen();
            }
        };

        //Manejamos el cambio en el estado de pantalla completa
        const handleFullscreenChange = () => {
            isFullscreen.value =!!document.fullscreenElement;
        };

        //Suscribimos al evento de montaje para manejar eventos de pantalla completa
         onMounted(() => {
            document.addEventListener("fullscreenchange", handleFullscreenChange);
        });
        //descubrimos el evento al desmontar el componente
        onUnmounted(() => {
            window.addEventListener("keydown", handleKeydown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);

        });
       
        //Devolvemos variable y funciones 
        return {
            isFullscreen,
            toggleFullscreen,
        };
    },
};
</script>
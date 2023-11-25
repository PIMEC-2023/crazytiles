<script setup>
import { changePage } from "@/store";
</script>

<template>

<body>
    <section>
        <img src="@/assets/imgs/logo-isotype.svg" alt="logo">
        <h1>FELICITATS!</h1>

        <p>Has finalitzat el joc!</p>
        <p><span>TEMPS: </span>  minuts</p>
        <p><span>INTENTS: </span>   </p>

        <div class="buttons">
        <button @click="changePage('GamePage')" class="restart__button">Reiniciar</button>
        <button @click="changePage('StartPage')" class="new__game">Nou joc</button>
        </div>
    </section>
</body>

</template>


<style scoped>

body {
    background-color: #D2D9FA;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

section{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    padding: 30px;
    border-radius: 15px;
}

h1{
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 40px;
    color: var(--ge-h1);
}

p {
    font-size: 20px;
}

span{
    font-weight: bold;
}

.buttons {
    margin-top: 20px;
    display: flex;
}

button{
    margin: 10px;
    width: 75px;
    height: 30px;
    border-radius: 5px;
    border: none;
   
}

button:hover{
    cursor: pointer;
}

.restart__button {
    background-color: var(--restart-button-bg);
    color: var(--restart-button-type-color);
}

.new__game {
    background-color: var(--action-button-bg);
    color: white;
}

.restart__button:hover{
    background-color: var(--restart-button-bg-hover);
}

.new__game:hover {
    background-color: var(--action-buttton-bg-hover);
    color: white;
}
</style>
<script setup>
import GameBoard from "@/components/GameBoard.vue"
import { changePage, store } from "@/store";

</script>

<template>
    <div>
        <GameBoard :audio="true" />
    </div>
</template>

<style scoped></style>
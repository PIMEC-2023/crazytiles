<script setup>
import { ref } from 'vue'
import Modal from './ModalConfig.vue'
const showModal = ref(false)
</script>

<template>
  <div id="button__config" @click="showModal=true">Configuració</div>
  
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal=false">

    </modal>
  </Teleport>
</template>

<style scoped>

#button__config {
    color: var(--white);
    font-family: 'Inter';
    font-size: 24px;
}

#button__config:hover {
    cursor: pointer;
}
</style>

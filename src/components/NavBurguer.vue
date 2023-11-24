<script setup>
import Modal from './ModalNav.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true"><img src="../assets/imgs/icon-menu.svg" alt=""></button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <!-- <template #header>
        
      </template> -->
    </modal>
  </Teleport>
</template>

<style>
#show-modal {
    border: none;
    background: none;
    display: flex;
    justify-content: right;
    position: fixed;
    top: 25px;
    right: 25px;
}
</style>
<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<template>
<!-- <div id="menu"><img src="../assets/imgs/icon-menu.svg" alt="burger-icon" class="burger-icon"></div>

<div class="container">
    <div><img src="" alt=""></div>
    <div>Repositori</div>
    <div>Equip</div>
    <div>Crèdits</div>
    <div>CA</div>
    <div>ES</div>
</div>     -->

<Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-menu">
        <div class="modal-header">
          <button
              class="modal-default-button"
              @click="$emit('close')"
            ><img src="../assets/imgs/icon-menu-close.svg" alt=""></button>
        </div>

        <div class="modal-body">
            <span><slot name="body">Repositori </slot><svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" fill="currentColor" cl ass="bi bi-github" viewBox="0 0 16 16">                                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></span>
        </div>

        <div class="modal-footer">
          <slot name="footer"><span>Equip</span></slot>
        </div>
        <div class="modal-credits">
          <slot name="Crèdits"><span>Crèdits</span></slot>
        </div>
        <!-- <div class="modal-ca">
          <slot name="CA"><span>CA</span></slot>
        </div>
        <div class="modal-es">
          <slot name="ES"><span>ES</span></slot>
        </div> -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }
  
  .modal-container {
    min-height: 100vh;
    /* min-width: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffffdc;    
    transition: all 0.3s ease;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 24px;
            
  }

  .modal-menu {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .modal-menu span {
    cursor: pointer;
  }
  
  
  /* .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  } */
  
  /* .modal-body {
    margin: 20px 0;
  } */
  
  .modal-default-button {
    border: none;
    background: none;
    
}
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter-from {
    opacity: 0;
  }
  
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  </style>
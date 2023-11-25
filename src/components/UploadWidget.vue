<script setup>
import { ref } from 'vue'

const uploadedPhotos = ref([])

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
    upload_preset: import.meta.env.VITE_APP_UPLOAD_PRESET,
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done uploading...', result.info)
      uploadedPhotos.value.push(result.info)
    }
  }
)
</script>

<template>
  <button @click="widget.open()">Subir imágenes</button>
  <p>{{ uploadedPhotos.map((u) => u.secure_url) }}</p>
  <img
    :key="u.id"
    v-for="u in uploadedPhotos"
    :src="u.secure_url.replace('/upload/', '/upload/c_crop,g_custom/')"
    alt=""
  />
</template>

<style scoped></style>

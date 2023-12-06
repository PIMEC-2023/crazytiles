<script setup>
import { ref } from "vue";

const emit = defineEmits(["photos"]);

const uploadedPhotos = ref([]);

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
    upload_preset: import.meta.env.VITE_APP_UPLOAD_PRESET,
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    minImageWidth: 200,
    croppingValidateDimensions: true,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done uploading...", result.info);
      uploadedPhotos.value.push(result.info);
      emit("photos", uploadedPhotos.value);
    }
  }
);
</script>

<template>
  <div @click.stop="widget.open()">
    <slot />
  </div>
</template>

<style scoped></style>

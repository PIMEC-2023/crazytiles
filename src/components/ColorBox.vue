<script setup>

const colors = ["FEF5CC", "02C4AC", "1747E7", "FDBE11", "fa9c81", "F75A2D", "d1dafa", "white", "161920" ]

</script>

<template>
  <div v-for="color in colors" class="box" :style="{ backgroundColor: `#${color}` }" :key="color">
    <!--Color HEX-->
    <span style="color:darkslategray">{{ `#${color}` }}</span>
  </div>
</template>

<style scoped></style>
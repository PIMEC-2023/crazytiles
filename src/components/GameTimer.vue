<script setup>
import { ref, computed } from "vue";
import timerIcon from "@/assets/imgs/icon-clock.svg";
import { formatTime } from "@/utils";

const props = defineProps(["start"]);

const totalSeconds = ref(0);

const setTime = () => {
  if (props.start) {
    ++totalSeconds.value;
  }
};

setInterval(setTime, 1000);

const minutes = computed(() => {
  const min = Math.floor(totalSeconds.value / 60);
  return formatTime(min);
});

const colon = computed(() => {
  return totalSeconds.value % 2 ? ":" : " ";
});

const seconds = computed(() => {
  const sec = totalSeconds.value % 60;
  return formatTime(sec);
});

defineExpose({
  totalSeconds,
});
</script>

<template>
  <div class="timerstyle">
    <div class="timer">
      <img :src="timerIcon" alt="timer" />
      {{ minutes }}{{ colon }}{{ seconds }}
    </div>
  </div>
</template>

<style scoped>
.timerstyle {
  border: 3px solid var(--game-stats-bg);
  border-radius: 10px;
}
.timer {
  background-color: var(--white);
  color: var(--time-type-color);
  border-radius: 6px;
  border: 3px solid rgba(209, 213, 219, 0.5);
  padding: 4px 12px 4px 12px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  font-size: 18px;
  font-weight: 700;
}
.timer img {
  width: 38px;
  height: 38px;
}
</style>

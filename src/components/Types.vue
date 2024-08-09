<template>
  <div
    class="w-full text-center uppercase rounded-lg font-bold"
    :style="{ background : colorByType || '' }"
  >
    {{ nameType }}
  </div>
</template>
<script setup lang="ts">
import { COLOR_TYPE } from '@/constants';
import { computed } from 'vue';

let colorType = COLOR_TYPE;
const props = defineProps<{
  nameType: string,
}>();

const colorByType = computed(() => {
  return colorType.find(item => item.type === props.nameType)?.color;
});

</script>
<template>
  <div class="flex-1 grid auto-cols-auto gap-4 p-5" :key="componentKey">
    <h1 class="text-center">My Team</h1>
    <Detail
      v-for="(item, index) in storePokemon.selectedPokemon"
      :key="index"
      :pokemon-info="item"
    ></Detail>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePokemonStore } from '@/store/store';
import Detail from '@/components/Detail.vue';

const componentKey = ref(0);
const storePokemon = usePokemonStore();

watch(
  storePokemon.selectedPokemon,
  () => {
    forceRender();
  },
  { deep: true }
);

const forceRender = () => {
  return componentKey.value += 1;
};

</script>
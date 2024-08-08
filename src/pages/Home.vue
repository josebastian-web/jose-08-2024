<template>
  <div class="flex-1">
    <Card
      v-for="(item, index) in pokemonStore.listPokemon"
      :pokemon-info="item"
      :key="index"
    ></Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getListPokemon } from '@/services';
import { BASE_URL } from '@/constants';
import { IResponse } from '@/interfaces/interfaces';
import { usePokemonStore } from '@/store/store';
import Card from '@/components/Card.vue';

const pokemonStore = usePokemonStore()

onMounted(() => {
  getListPokemon(
    `${BASE_URL.LIST_POKEMON}/pokemon`,
    {
      params: {
        limit: 151,
        offset: 25,
      }
    }
  ).then((data: IResponse) => {
    pokemonStore.setListPokemon(data.results);
  })
})



</script>
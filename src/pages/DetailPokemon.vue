<template>
  <div>
    <Detail
      :pokemon-info="findSelectedPokemon()"
      detailed
    ></Detail>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import Detail from '@/components/Detail.vue';
import { usePokemonStore } from '@/store/store';

const route = useRoute();

const storePokemon = usePokemonStore();
const listSelected = storePokemon.getSelectedPokemons;

const findSelectedPokemon = (): any  => {
  return listSelected.find(item => {
    let urlSplit = item.url.split('/');
    return urlSplit[urlSplit.length - 2] === route.params.id;
  });
};

</script>
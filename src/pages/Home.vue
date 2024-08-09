<template>
  <h1 class="text-center">Choose Pokemons!!</h1>
  <div class="flex-1 flex flex-wrap gap-4 p-5" v-if="!loading">
    <Card
      v-for="(item, index) in getPokemons"
      :pokemon-info="item"
      :key="index"
      :selected="findSelectedPokemon(item.name)"
      class="w-40"
    >
      <template #extra>
        <div class="mx-auto">
          <button
            v-if="!findSelectedPokemon(item.name)"
            @click="addToTeam(item)"
            alt="Atras"
            class="rounded border-solid border border-indigo-500/75 bg-white hover:bg-indigo-600 px-2 w-24 h-10 mb-3"
          >
            Añadir
          </button>
        </div>
      </template>
    </Card>
  </div>
  <div class="flex justify-between py-8 px-5">
    <button
      @click="goBack()"
      alt="Atras"
      class="rounded border-solid border border-indigo-500/75 bg-indigo-500 hover:bg-indigo-600 px-2 w-24 h-10"
    >
      <img class="h-5 w-10 my-0 mx-auto" src="../assets/arrow-left.svg" alt="">
    </button>
    <button
      @click="goForward()"
      class="rounded border-solid border border-indigo-500/75 bg-indigo-500 hover:bg-indigo-600 px-2 w-24 h-10"
    >
      <img class="h-5 w-10 my-0 mx-auto" src="../assets/arrow-right.svg" alt="">
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getListPokemon } from '@/services';
import { IResponse } from '@/interfaces/interfaces';
import { usePokemonStore } from '@/store/store';
import { BASE_URL } from '@/constants';
import { storeToRefs } from 'pinia';
import Card from '@/components/Card.vue';

const pokemonStore = usePokemonStore();
const { getPokemons } = storeToRefs(pokemonStore);
const loading = ref(false);

onMounted(() => {
  callListPokemon();
})

const findSelectedPokemon = (name: string) => {
  return pokemonStore.getSelectedPokemons.some(item => item.name === name);
  
};

const goBack = ():void => {
  callListPokemon(pokemonStore.prevLink);
}

const goForward = () :void => {
  callListPokemon(pokemonStore.nextLink);
}

const addToTeam = (pokemon: {name: string, url: string}):void => {
  let lengthSelected = pokemonStore.getSelectedPokemons.length;
  if (lengthSelected < 6) {
    pokemonStore.setSelectedPokemon(pokemon);
  }
}

const callListPokemon = (urlModified?: string) => {
  let url: any = `${BASE_URL.LIST_POKEMON}/pokemon`; 
  if (urlModified) {
    url = urlModified;
  }
  loading.value = true;
  getListPokemon(
    url,
    {
      params: {
        limit: 25,
        offset: 0,
      }
    }
  ).then((data: IResponse) => {
    pokemonStore.setListPokemon(data.results!);
    pokemonStore.setPrevLink(data.previous!);
    pokemonStore.setNextLink(data.next!);
    loading.value = false;
  })
}

</script>
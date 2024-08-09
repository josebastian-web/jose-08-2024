<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden"
    :class="{
      'border-solid border-2 border-indigo-600' : props.selected,
      'rounded-full': rounded
    }"
  >
    <div class="flex flex-col">
      <div class="text-center">
        <img
          class="h-30 w-full my-0 rounded-full"
          :alt="pokemonName"
          :src="imagePokemon"
        >
      </div>
      <div class="py-2">
        <div class="uppercase tracking-wide text-center text-sm text-indigo-500 font-semibold">
          {{ pokemonName }}
        </div>
       </div>
       <slot name="extra"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IInfoPokemon, IResultPokemon } from "@/interfaces/interfaces";
import { getPokemon } from "@/services";
import { BASE_URL } from '@/constants';

const props = defineProps<{
  pokemonInfo?: IResultPokemon,
  url?: string,
  selected?: boolean,
  rounded?: boolean,
}>();

let imagePokemon = ref('');
let pokemonName = ref('');
let idPokemon = ref(0);

onMounted(async () => {
  idPokemon.value = getIdFromUrl();
  await getPokemon(`${BASE_URL.LIST_POKEMON}/pokemon/${idPokemon.value}/`)
  .then((data: IInfoPokemon) => {
    imagePokemon.value = data.sprites.front_default;
    pokemonName.value = data.name;
  })
});

const getIdFromUrl = () => {
  let urlSplit: any[] = [];
  if (props.url) {
    urlSplit = props.url.split('/');
  } else {
    urlSplit = props.pokemonInfo?.url.split('/') || [];
  }
  return Number(urlSplit[urlSplit.length - 2]);
};

</script>
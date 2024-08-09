<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden p-4">
    <div class="flex flex-col md:flex-row">
      <div
        :class="{
          'w-full': detailed,
          'w-full sm:w-3/4': !detailed
        }"
      >
        <h1 class="uppercase tracking-wide text-center text-xl font-semibold">
          {{ pokemonDetail?.name }}
        </h1>
      </div>
      <div v-if="!detailed" class="w-full sm:w-1/4: justify-center sm:justify-end flex pr-5">
        <button
          @click="goToDetail()"
          class="w-full rounded-full border-solid border border-indigo-500/75 bg-white hover:bg-indigo-600 px-2 w-10 h-10 mr-2"
        >
          <img class="w-full h-full my-0" src="@/assets/eye.svg">
        </button>
        <button
          @click="deletePokemon()"
          class="w-full rounded-full border-solid border border-indigo-500/75 bg-white hover:bg-indigo-600 px-2 w-10 h-10"
        >
          <img class="w-full h-full my-0" src="@/assets/trash.svg">
        </button>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-2/5">
        <div class="w-60 h-60  mx-auto">
          <img
            :src="pokemonDetail?.sprites.front_default"
            alt=""
            class="w-full"
          >
        </div>
        <div class="px-2 mb-4">
          <h4>Stats</h4>
          <Chart
            :chart-data="infoChart"
          ></Chart>
        </div>
      </div>
      <div class="w-full sm:w-3/5">
        <p v-if="detailed">
          {{ description?.flavor_text_entries[0].flavor_text }}
        </p>
        <div class="">
          <h4>Types</h4>
          <div class="grid grid-cols-4 gap-4">
            <Types
              v-for="(item, index) in pokemonDetail?.types"
              :key="index"
              :name-type="item.type.name"
            ></Types>
          </div>
        </div>
        <div v-if="detailed" class="my-4 pr-0 sm:pr-4">
          <div class="grid grid-cols-6 gap-4 w-full sm:w-3/4 rounded bg-indigo-500 pb-4">
            <div class="col-start-1 col-end-3 pl-4"> 
              <h4 class="text-white">Height</h4>
              <span class="text-zinc-950 text-lg">
                {{ pokemonDetail?.height }}
              </span>
            </div>
            <div class="col-end-7 col-span-2"> 
              <h4 class="text-white">Weight</h4>
              <span class="text-zinc-950 text-lg">
                {{ pokemonDetail?.weight }}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4>Cries</h4>
          <audio controls :src="pokemonDetail?.cries.legacy"></audio>
        </div>
      </div>
    </div>
    <div v-if="detailed" class="px-5 pb-5">
      <h4>Evolution</h4>
      <Evolution
        :id="getIdFromUrl()"
      ></Evolution>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getPokemon, getDescription } from '@/services';
import { Dataset, IInfoPokemon, IResultPokemon } from '@/interfaces/interfaces';
import { ISpecies } from '@/interfaces/Species';
import { router } from '@/routes/route';
import { usePokemonStore } from '@/store/store';
import Chart from '@/components/Chart.vue';
import Types from '@/components/Types.vue';
import Evolution from '@/components/Evolution.vue';

const props = defineProps<{
  pokemonInfo: IResultPokemon,
  detailed?: boolean,
}>();

let pokemonDetail = ref<IInfoPokemon>();
let description = ref<ISpecies>();
const pokemonStore = usePokemonStore();

onMounted(async () => {
  await getPokemon(props.pokemonInfo.url)
  .then((data: IInfoPokemon) => {
    pokemonDetail.value = data;
  })

  getDescription(
    pokemonDetail.value?.id
  ).then((data: ISpecies) => {
    description.value = data
  })
});

const infoChart = computed(() => {
  let labels: string[] = [];
  let datasets: Dataset[] = [
    {
      data: []
    }
  ];
  pokemonDetail.value?.stats.forEach(element => {
    labels.push(element.stat.name);
    datasets[0].data.push(element.base_stat)
  });
  return { labels, datasets };
});

const getIdFromUrl = (): number => {
  let urlSplit = props.pokemonInfo.url.split('/');
  return Number(urlSplit[urlSplit.length - 2]);
};

const goToDetail = (): void => {
  router.push({
    name: 'DetailPokemon',
    params: {
      id: getIdFromUrl()
    }
  })
}

const deletePokemon = () => {
  pokemonStore.deletePokemon(pokemonDetail.value!.name);
}

</script>

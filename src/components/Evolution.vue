<template>
  <div class="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-3 pl-0 sm:pl-16">
    <div
      v-for="(item, index) in evolutionFormated()"
      :key="index"
      class="flex flex-wrap"
    >
      <div class="flex-1 w-auto sm:w-full">
        <Card
          :url="item.species_url"
          rounded
        >
        </Card>
      </div>
      <div class="flex-1 content-center invisible  sm:visible">
        <img
          v-if="(index + 1) < evolutionFormated().length " 
          lass="w-50 h-50"
          src="@/assets/arrow-right.svg"
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IEvolution } from '@/interfaces/evolution';
import { getEvolution } from '@/services';
import Card from './Card.vue';

const props = defineProps<{
  id: number
}>();

let evolution = ref<IEvolution>();

onMounted(async () => {
  await getEvolution(
    props.id
  ).then((data: IEvolution) => {
    evolution.value = data
  })
});

const evolutionFormated =  () => {
  let evoChain = [];
  let evoData = evolution.value?.chain;

  if (evoData) {
    do {
      var evoDetails = evoData['evolution_details'][0];
      evoChain.push({
        "species_name": evoData.species.name,
        "species_url": evoData.species.url,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "item": !evoDetails ? null : evoDetails.item
      });
  
      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  }

  return evoChain;
  
}

</script>
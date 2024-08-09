<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 divide-y">
    <div
      v-for="(item, index) in listRoute"
      :key="index"
      @click="goTo(item.nameRoute)"
      class="block px-4 py-2 text-xl text-gray-700 border-r-4 text-left cursor-pointer sm:border-r-0"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { IListRoute } from '@/interfaces/interfaces';
import { router } from '@/routes/route';

const listRoute: IListRoute[] = [
  {
    title: 'Home',
    nameRoute: 'Home',
  },
  {
    title: 'My Team',
    nameRoute: 'Team',
  },
];

function goTo(nameRoute: string): void {
  router.push({ name: nameRoute })
}
</script>
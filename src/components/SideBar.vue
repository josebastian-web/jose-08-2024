<template>
  <div class="grid grid-cols-1 divide-y border-r-4">
    <div
      v-for="(item, index) in listRoute"
      :key="index"
      @click="goTo(item.nameRoute)"
      class="text-left cursor-pointer"
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
    title: 'Inicio',
    nameRoute: 'Home',
  },
  {
    title: 'Mi Grupo',
    nameRoute: 'Team',
  },
];

function goTo(nameRoute: string): void {
  router.push({ name: nameRoute })
}
</script>
<template>
  <div class="flex flex-col sm:flex-row h-full w-full">
    <div class="flex-none w-full sm:w-1/6 border-r-4 sm:border-r-0">
      <SideBar></SideBar>
    </div>
    <div class="flex-1">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';

</script>
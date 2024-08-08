<template>
  <div class="flex flex-row h-full w-full">
    <div class="flex-none w-40">
      <SideBar></SideBar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';

</script>
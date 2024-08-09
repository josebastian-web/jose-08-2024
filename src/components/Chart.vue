<template>
  <div class="w-80">
    <Bar
      :options="chartOptions"
      :data="chartData"
    ></Bar>
  </div>
</template>
<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { IChartData, IOptions } from '@/interfaces/interfaces';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps<{
  chartData: IChartData,
}>();

let chartOptions: IOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};

</script>
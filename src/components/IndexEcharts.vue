<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">订单统计</span>
        <div>
          <el-check-tag v-for="(item,index) in options" :key="index" :checked="current===item.value"
                        @click="changeHandler(item.value)">{{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div ref="chart" style="width: 100%;height: 300px;"></div>
  </el-card>
</template>
<script setup>
import * as echarts from "echarts"
import {ref, onMounted,onBeforeUnmount} from 'vue'
import {useIndexStore} from "@/store/module/index.js";
import {useResizeObserver} from "@vueuse/core";

const chart = ref()
let myChart
let option
const indexStore = useIndexStore()
const current = ref('week')
const options = ref([
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近一小时",
    value: "hour",
  },
])
const changeHandler = (value) => {
  current.value = value
  getData();
}


const getData = async () => {
  option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar'
      }
    ]
  };
  myChart.showLoading()
  const {x, y} = await indexStore.getThirdStatistics(current.value)
  option.xAxis.data = x
  option.series[0].data = y
  option && myChart.setOption(option);
  myChart.hideLoading();
}
onMounted(() => {
  myChart = echarts.init(chart.value);
  console.log(chart)
  console.log(myChart)
    getData();
})
onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})
useResizeObserver(chart, entries => {
myChart.resize()
})
</script>

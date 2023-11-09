<script setup>
import {useIndexStore} from "@/store/module/index.js";
import {ref, onMounted, onBeforeMount} from "vue";
import CountTo from "@/components/CountTo.vue";
import IndexNavs from "@/components/IndexNavs.vue";
import IndexEcharts from "@/components/IndexEcharts.vue";
import IndexCard from "@/components/IndexCard.vue";
import {hashPermissions} from '../directives/permission.js'

const indexStore = useIndexStore()
const panels = ref()
const goods = ref([])
const order = ref([])
const firstStatistics = async () => {
  const result = await indexStore.getFirstStatistics()
  panels.value = result.panels
}
const secondStatistics = async () => {
  const result = await indexStore.getSecondStatistics()
  goods.value = result.goods
  order.value = result.order
}

onBeforeMount(() => {
  firstStatistics()
  secondStatistics()
})

</script>
<template>
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="!panels">

        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%;" :animated="true" loading>\
            <template #template>
              <el-card class="card" shadow="hover">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%;"></el-skeleton-item>
                    <el-skeleton-item variant="text" style="width: 10%;"></el-skeleton-item>
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%;"></el-skeleton-item>
                <el-divider/>
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%;"></el-skeleton-item>
                  <el-skeleton-item variant="text" style="width: 10%;"></el-skeleton-item>
                </div>
              </el-card>
              <el-skeleton-item variant="text" style="width: 30%;"></el-skeleton-item>
            </template>
          </el-skeleton>
        </el-col>

      </template>
      <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
        <el-skeleton style="width: 100%;" :animated="true" loading>
          <template #template>
            <el-card class="card" :title="item.title" :key="item.title" shadow="hover">
              <template #header>
                <div class="flex justify-between">
                  <span class="text-sm">{{ item.title }}</span>
                  <el-tag :type="item.unitColor" effect="plain">
                    {{ item.unit }}
                  </el-tag>
                </div>
              </template>
              <span class="text-3xl font-bold text-gray-500">
                  <CountTo :value="item.value"/>
            </span>
              <el-divider/>
              <div class="flex justify-between text-sm text-gray-500">
                <span>{{ item.subTitle }}</span>
                <span>{{ item.subValue }}</span>
              </div>
            </el-card>
          </template>
        </el-skeleton>

      </el-col>

    </el-row>

    <IndexNavs/>
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexEcharts v-if="hashPermissions(['getStatistics3,GET'])"/>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard v-if="hashPermissions(['getStatistics2,GET'])" title="店铺及商品提示" tip="需要立即处理的订单"
                   :data="order"/>
        <IndexCard v-if="hashPermissions(['getStatistics2,GET'])" style="margin-bottom: 1rem" title="交易提示"
                   tip="店铺及商品提示" :data="goods"/>
      </el-col>

    </el-row>

  </div>
</template>
<style lang="scss" scoped>
.card {
  border: 0;
}
</style>


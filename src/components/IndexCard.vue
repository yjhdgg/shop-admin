<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag type="danger" effect="plain">
          {{tip }}
        </el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item,index) in data" :key="index" >
        <el-card shadow="hover" class="border-0 bg-light-500">
          <div class="flex items-center justify-center">
            <div class="flex flex-col items-center justify-center">
              <span class="text-sm mb-2">{{item.value}}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
defineProps({
  title: String,
  tip: String,
  data:Array,
})
</script>

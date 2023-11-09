<script setup>
import bg from '@/assets/img/404.png'

</script>
<template>
   <!-- <img :src="bg" class="bg-local"/> -->
   <div>
    <el-result
    icon="warning"
    title="404 Not Found"
    sub-title="页面丢失~"
    >
    <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </template>
</el-result>
   </div>
</template>
<style>
</style>
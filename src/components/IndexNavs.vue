<template>
  <el-row :gutter="20" class="mt-5">
    <el-col :span="3" :offset="0" v-for="(item,index) in iconNavs" :key="index">
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="flex flex-col items-center justify-center cursor-pointer">
          <el-icon :size="16"  :color="item.color">
            <component :is="item.icon"/>
          </el-icon>
          <span class="text-sm mt-2">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
const iconNavs = [
  {
    icon:"user",
    color: "#3b82f6",
    title:"用户",
    path:"/user/list"
  },
  {
    icon:"shopping-cart",
    color: "#8b5cf6",
    title:"商品",
    path:"/goods/list"
  },
  {
    icon:"tickets",
    color:"#d946ef",
    title:"订单",
    path:"/order/list"
  },
  {
    icon:"chat-dot-square",
    color:"#14b8a6",
    title:"评价",
    path:"/comment/list"
  },
  {
    icon:"picture",
    color:"#f43f5e",
    title:"图库",
    path:"/image/list"
  },
  {
    icon:"bell",
    color:"#10b981",
    title:"公告",
    path:"/notice/list"
  },
  {
    icon:"set-up",
    color:"#6b7280",
    title:"配置",
    path:"/setting/base"
  },
  {
    icon:"files",
    color:"#f59e0b",
    title:"优惠券",
    path:"/coupon/list"
  }
]
</script>

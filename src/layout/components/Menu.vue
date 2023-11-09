<script setup>
import {computed, ref} from 'vue';
// 是否折叠
import {useUserStore} from "@/store/module/user.js";
import {useRoute, onBeforeRouteUpdate} from 'vue-router';
import {router} from "@/router/index.js";

const route = useRoute()
const userStore = useUserStore()
const isCollapse = computed(() => !(userStore.asideWidth == '250px'))
const handleSelect = (e) => {
  router.push(e)
}
const menus = computed(() => userStore.menus)
// 默认选中
const defaultActive = ref(route.path)

// 监听路由变化
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
})
const asideWidth = ref(userStore.asideWidth)
</script>

<template>
  <div class="container" :style="{width:asideWidth}">
    <el-menu :default-active="defaultActive" unique-opened :collapse="isCollapse" :collapse-transition="false"
             @select="handleSelect" style="border-width: 0;">
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.name }}</span></template>
          <el-menu-item v-for="(child, indexChild) in item.child" :key="indexChild" :index="child.frontpath">
            <el-icon>
              <component :is="child.icon"/>
            </el-icon>
            <span>{{ child.name }}</span></el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.name }}</span></template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.container {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}

.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>

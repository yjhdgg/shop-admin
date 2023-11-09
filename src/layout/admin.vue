<script setup>

import Menu from "@/layout/components/Menu.vue";
import Header from "@/layout/components/Header.vue";
import Tabs from "@/layout/components/Tabs.vue";
import {useUserStore} from "@/store/module/user.js";
</script>

<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside class="aside" :style="{width:useUserStore().asideWidth}">
        <Menu/>
      </el-aside>
      <el-main class="main">
        <Tabs/>
        <div>
          <router-view v-slot="{Component}">
            <transition name="fade">
              <keep-alive :max="10">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.aside {


}

.main {
  height: 100%;
  width: 100%;
  //padding: 0;

}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>

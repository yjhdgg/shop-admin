<script setup>
import { Aim, ArrowDown, ElemeFilled, Expand, Fold, FullScreen, Lock, Refresh, User } from "@element-plus/icons-vue";
import { notify, showBox } from "@/utils/utils.js";
import { router } from "@/router/index.js";
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import { menuHooks } from "@/composables/menuHooks.js";
import { useUserStore } from '@/store/module/user.js';

const userStore = useUserStore()
const { loading, resetPwdFormRef, resetPwdForm, rules, closeDialog, refreshClick } = menuHooks();
const { isFullscreen, toggle } = useFullscreen();
const dialogVisible = ref(false)

const commandHandler = (command) => {
  switch (command) {
    case 'logout':
      showBox("是否退出登录").then((res) => {
        userStore.logout().then((res) => {
          notify("退出成功")
          router.push('/login')
        })
      })
      break
    case 'resetPwd':
      dialogVisible.value = true
      break
  }
}

const saveClick = (formRef) => {
  formRef.validate(async (valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    userStore.resetPwd(resetPwdForm).then((res) => {
      notify("修改成功")
      // 跳转到首页
      router.push("/login")
    }).finally(() => {
      loading.value = false
      dialogVisible.value = false
    })
  })
}
</script>

<template>
  <div class="header">
    <span class="logo"><el-icon style="margin-right: 0.25rem"><eleme-filled /></el-icon>安安编程</span>
    <el-tooltip effect="light" content="折叠" placement="bottom-start"  >
      <el-icon class="icon-btn" >
        <Fold v-if="userStore.asideWidth == '250px'" />
        <Expand v-else />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="light" content="刷新" placement="bottom-start">
      <el-icon class="icon-btn" @click="refreshClick">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="right-section">
      <el-tooltip effect="light" content="全屏" placement="bottom-start">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="commandHandler">
        <span class="avatar">
          <el-avatar style="margin-right: 8px" :size="25" :src="userStore.userInfo.avatar" />
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="修改密码" width="450px" @close="closeDialog">
    <el-form ref="resetPwdFormRef" :model="resetPwdForm" status-icon
      style="display: flex; flex-direction: column;align-items: center;" :rules="rules">
      <el-form-item prop="oldPwd" label="旧密码">
        <el-input style="width: 250px" v-model="resetPwdForm.oldPwd" placeholder="请输入旧密码" type="password"
          autocomplete="off" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPwd" label="新密码">
        <el-input style="width: 250px" v-model="resetPwdForm.newPwd" placeholder="请输入新密码" type="password"
          autocomplete="off" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPwd" label="确认密码">
        <el-input style="margin-right: 1rem;width: 250px;" v-model="resetPwdForm.checkPwd" placeholder="请输入确认密码"
          type="password" autocomplete="off" show-password>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="saveClick(resetPwdFormRef)" :loading="loading">
          保存
        </el-button>
        <el-button @click="dialogVisible = false">取消</el-button>

      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  background-color: #4338ca;
  @apply items-center text-light-50 fixed top-0 fixed left-0 fixed right-0;
  height: 64px;

  .logo {
    width: 250px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    @apply justify-center items-center text-xl;
    font-weight: 100;


  }

  .icon-btn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    cursor: pointer;
    width: 42px;
    height: 64px;
  }

  .right-section {
    margin-left: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;

    .dropdown {
      height: 64px;
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      margin-left: 12px;
      margin-right: 12px;

      .avatar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        color: #fdfdfd;
      }
    }
  }
}

.icon-btn:hover {
  @apply bg-indigo-600
}
</style>
@/store

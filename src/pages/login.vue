<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { notify } from "@/utils/utils.js";
import { userHooks } from "@/composables/userHooks.js";
import { useUserStore } from '@/store/module/user.js';

const userStore = useUserStore()
const { loginFormRef, loginForm, rules } = userHooks();

const router = useRouter()
const loading = ref(false)



const loginClick = (formRef) => {
  formRef.validate(async (valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    userStore.login(loginForm).then((res) => {
      notify("登录成功")
      // 跳转到首页
      router.push("/")
    }).finally(() => {
      loading.value = false
    })
  })
}

</script>
<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left-section">
      <div class="left-title">欢迎回来</div>
      <div style="color: #f3f4f6;">这是专属于你的网站XXXX</div>
    </el-col>
    <el-col class="right-section" :lg="8" :md="12">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300">
        <span class="h-[1px] w-16 bg-gray-200 "></span>
        <span class="mx-4">账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="w-[250px]">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入账号" autocomplete="off">
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" autocomplete="off" show-password
            @keyup.enter="loginClick(loginFormRef)">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px] " color=#626aef round :loading="loading" @click="loginClick(loginFormRef)">登录
          </el-button>

        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #6366f1;

  .left-section {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;

    align-items: center;
    justify-content: center;

    flex-direction: column;

    .left-title {
      font-weight: 700;

      font-size: 3rem;
      line-height: 1;

      margin-bottom: 1rem;
      color: #fdfdfd;
    }
  }

  .right-section {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;

    background-color: #fdfdfd;
  }
}
</style>
@/composables/userHooks.js@/store

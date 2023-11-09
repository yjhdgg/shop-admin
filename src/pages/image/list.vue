<template>
  <div>
    <el-container class="container" :style="{ height: container_height + `px`, marginTop: `44px`, }">
      <el-header class="image-header">
        <el-button @click="addGalleryClassClick" type="primary">新增图片分类</el-button>
        <el-button type="warning">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="220px" class="image-aside">
          <div class="top">
            <div class="top-item" v-for="(item, index) in params.data"
                 :key="index">
              <span>{{ item.name }}</span>
              <div>
                <el-button @click="updateGalleryClassClick(item)"
                           style="margin-right: 20px;height: 16px;width: 14px;padding: 0" :icon="Edit" circle/>
                <el-button @click="delGalleryClassClick(item)" style="height: 16px;width: 14px;padding: 0"
                           :icon="CloseBold" circle/>
              </div>
            </div>
          </div>
          <div class="bottom">
            <el-button :disabled="params.page==1" @click="backPage" :icon="ArrowLeft"/>
            <el-button :disabled="params.page==params.pageCount" @click="nextPage" :icon="ArrowRight"/>
          </div>
        </el-aside>
        <el-main class="image-main">
          <!-- <div class="top" v-for="i in 40" :key="i">i</div>
          <div class="bottom">fenye</div> -->
        </el-main>
      </el-container>
    </el-container>
    <Dialog :dialog-visible="dialogVisible" title="图片分类" @save-click="saveHandler" @cancel-click="cancelHandler">
      <template #content>
        <el-form ref="formRef" :model="params" status-icon
                 style="display: flex; flex-direction: column;align-items: center;" :rules="rules">
          <el-form-item prop="name" label="名字">
            <el-input style="width: 250px" v-model="params.name" placeholder="请输入名称" type="text">
            </el-input>
          </el-form-item>
          <el-form-item prop="order" label="序号">
            <el-input style="width: 250px" v-model="params.order" placeholder="请输入序号" type="text"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import {ArrowLeft, CloseBold, Edit} from '@element-plus/icons-vue';
import {ArrowRight} from '@element-plus/icons-vue';
import {ref, onMounted} from 'vue'
import {useOtherStore} from "@/store/module/other.js";
import {notify} from "@/utils/utils.js";
import Dialog from "@/components/Dialog.vue";

const container_height = ref()
const dialogVisible = ref()
const otherStore = useOtherStore()
const params = ref({
  id: '',
  page: 1,
  size: 10,
  order: '',
  name: '',
  total: '',
  pageCount: 1,
  data: [],
})
const type = ref()
const formRef = ref()
const rules = ref()

const init = async () => {
  const result = await otherStore.getGalleryList(params.value)
  params.value.data = result.list.slice().sort((a, b) => b.order - a.order);
  params.value.total = result.totalCount
  console.log(result)
  params.value.pageCount = Math.ceil(result.totalCount / params.value.size);
}
onMounted(() => {
  const windowHeight = window.innerHeight || document.body.clientHeight;
  container_height.value = (windowHeight - 64 - 44 - 36);
  init()
})
const addGalleryClassClick = () => {
  dialogVisible.value = true
  type.value = 'add'
}
const delGalleryClassClick = (item) => {
  otherStore.deleteGalleryClass(item).then(res => {
    init()
    notify("删除成功")
  }).catch()

}
const updateGalleryClassClick = (item) => {
  dialogVisible.value = true
  type.value = 'update'
  params.value.name = item.name
  params.value.order = item.order
  params.value.id = item.id
}
const saveHandler = () => {
  switch (type.value) {
    case 'add': {
      otherStore.addGalleryClass(params.value)
      notify("添加成功")
      cancelHandler()
      break
    }
    case 'update': {
      otherStore.updateGalleryClass(params.value)
      notify("修改成功")
      cancelHandler()
      break
    }
  }
  init()
}
const cancelHandler = () => {
  dialogVisible.value = false
  params.value.name = ''
  params.value.order = ''
  params.value.id = ''
}
const backPage = () => {
  if (params.value.page > 1) {
    params.value.page -= 1;
    init();
  }
};

const nextPage = () => {
  if (params.value.page < params.value.pageCount) {
    params.value.page += 1;
    init();
  }
};
</script>

<style lang="scss" scoped>
.container {
  @apply bg-white rounded;
}

.image-header {
  border-bottom: 1px solid #f3f4f6;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  //box-shadow: 1px 1px 5px #f3f4f6;
}

.image-aside {
  position: relative;
  height: 100%;


  .top {
    position: absolute;
    top: 0;
    right: 0px;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
    box-shadow: 1px 1px 5px #f3f4f6;
    font-size: 14px;
    line-height: 36px;

    .top-item {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f3f4f6;
      z-index:2
    }
    .top-item:hover{
      background-color: rgba(59, 130, 246, .5);
      position: relative;

    }
    .top-item:last-child {
      border-bottom: 1px solid #f3f4f6;
    }

  }

  //.top:not(.top-item):hover {
  //  background-color: rgba(59, 130, 246, .5);
  //}

  .bottom {
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

    position: absolute;
    bottom: 0;
    right: 0px;
    left: 0;
    height: 50px;
  }

}
</style>

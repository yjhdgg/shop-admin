<template>
  <el-dialog v-model="props.dialogVisible" :title="props.title" width="450px" @close="closeDialog">
<!-- 加入一个内容插槽-->
<slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="saveClick" :loading="loading">
          保存
        </el-button>
        <el-button @click="cancelClick">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {defineProps,defineEmits} from 'vue'
const emit = defineEmits(["saveClick","cancelClick"]);
const props = defineProps({
  dialogVisible:{
    default: false
  },
  title:{
  },

})
const saveClick =()=>{
  emit("saveClick",{})
}
const cancelClick =()=>{
  emit("cancelClick")
}
</script>
<style></style>

<template>
  <el-upload
    :file-list="fileList"
    class="mt-5"
    :action="uploadUrl"
    list-type="picture-card"
    :headers="{
      Authorization: 'Bearer ' + loginStore.token
    }"
    :auto-upload="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleUploadSuccess"
    :limit="1"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'

const loginStore = useMainStore().useLoginStore()

const showPreview = ref<boolean>(false)
const previewImg = ref<string>()
const uploadUrl = `${import.meta.env.VITE_HOST}api/upload`
const fileList = ref<UploadUserFile[]>()
// 接收父组件传递的 fileList
const img_url = defineModel({ type: String })

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  previewImg.value = uploadFile.url!
  showPreview.value = true
}

const handleUploadSuccess = (resp: any) => {
  img_url.value = resp.data.url
}

// 移除文件
const handleRemove = (file: any, img: UploadUserFile[]) => {
  fileList.value = img
}
</script>

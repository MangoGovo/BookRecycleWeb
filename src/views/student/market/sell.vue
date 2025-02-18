<template>
  <!-- 表单 -->
  <el-dialog v-model="formVisible">
    <div class="mx-10">
      <el-dialog v-model="showPreview">
        <img w-full :src="previewImg" alt="Preview Image" />
      </el-dialog>
      <el-form label-width="100px" ref="formRef" :model="form" :rules="rules">
        <el-form-item label="书名" prop="title">
          <div class="flex items-center">
            <el-input v-model="form.title" placeholder="请输入完整名称"> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="适用课程" prop="subject">
          <div class="flex items-center w-full">
            <el-input v-model="form.subject" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="印刷批次" prop="print_edition">
          <div class="flex items-center w-full">
            <el-input v-model="form.print_edition" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="出版商" prop="publisher">
          <div class="flex items-center w-full">
            <el-input v-model="form.publisher" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="完好程度" prop="condition">
          <div class="flex items-center w-full">
            <el-input v-model="form.condition" placeholder="请描述书籍有无折痕、污渍、字迹、批注等">
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="旧书照片" prop="fileList">
          <el-upload
            class="upload-box"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="售价" prop="price">
          <div class="flex items-center">
            <el-input v-model="form.price" type="number" placeholder="">
              <template #suffix>元</template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <div class="flex items-center w-full">
            <el-input v-model="form.remark" type="textarea" rows="6" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <!-- 提交 & 清空 按钮 -->
        <el-form-item>
          <div class="flex justify-end w-full space-x-2 gap-10">
            <el-button @click="resetForm(formRef)">清空</el-button>
            <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, UploadProps } from 'element-plus'

// 是否显示预览
const showPreview = ref<boolean>(false)
const formVisible = ref<boolean>(false)
const previewImg = ref<string>('')
const formRef = ref<FormInstance>()
// 表单数据
const form = ref({
  title: '',
  subject: '',
  print_edition: '',
  publisher: '',
  condition: '',
  fileList: [''],
  price: '',
  remark: ''
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  subject: [{ required: true, message: '请输入适用科目', trigger: 'blur' }],
//   print_edition: [{ required: true, message: '请输入印刷版次', trigger: 'blur' }],
  publisher: [{ required: true, message: '请输入出版商', trigger: 'blur' }],
  condition: [{ required: true, message: '请输入完好程度', trigger: 'blur' }],
  price: [{ required: true, message: '请输入售价', trigger: 'blur' }],
  fileList: [{ required: true, message: '请上传至少一张旧书照片', trigger: 'change' }]
}

// 图片预览
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  previewImg.value = uploadFile.url!
  showPreview.value = true
}

// 移除图片
const handleRemove = (file: any, fileList: string[]) => {
  form.value.fileList = fileList
}
// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  console.log('提交数据：', form.value)
}
// 清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const open = () => {
  formVisible.value = true
}
defineExpose({ open })
</script>
<style scoped></style>

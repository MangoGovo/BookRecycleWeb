<template>
  <!-- 表单 -->
  <el-dialog v-model="formVisible">
    <div class="mx-10">
      <el-dialog v-model="showPreview">
        <img w-full :src="previewImg" alt="Preview Image" />
      </el-dialog>
      <el-form label-width="100px" ref="formRef" :model="form" :rules="rules">
        <el-form-item label="书名" prop="name">
          <div class="flex items-center">
            <el-input v-model="form.name" placeholder="请输入完整名称"> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <div class="flex items-center">
            <el-input v-model="form.author" placeholder="请输入作者"> </el-input>
          </div>
        </el-form-item>
        <el-form-item label="适用课程" prop="course">
          <div class="flex items-center w-full">
            <el-input v-model="form.course" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="印刷批次" prop="edition">
          <div class="flex items-center w-full">
            <el-input v-model="form.edition" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="出版商" prop="publisher">
          <div class="flex items-center w-full">
            <el-input v-model="form.publisher" placeholder=""> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="完好程度" prop="completeness">
          <div class="flex items-center w-full">
            <el-input
              v-model="form.completeness"
              placeholder="请描述书籍有无折痕、污渍、字迹、批注等"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="书籍图片" prop="img">
          <ImageUploader v-model="form.img" />
        </el-form-item>

        <el-form-item label="售价" prop="price">
          <div class="flex items-center">
            <el-input v-model="form.price" type="number" placeholder="">
              <template #suffix>元</template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <div class="flex items-center w-full">
            <el-input v-model="form.note" type="textarea" rows="6" placeholder=""> </el-input>
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
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance } from 'element-plus'
import { ImageUploader } from '@/components'
import { useDefaultRequest } from '@/utils/request'
import { MarketAPI } from '@/apis'
import router from '@/router'

// 是否显示预览
const showPreview = ref<boolean>(false)
const formVisible = ref<boolean>(false)
const previewImg = ref<string>('')
const formRef = ref<FormInstance>()
// 表单数据
const form = reactive({
  name: '',
  author: '',
  course: '',
  edition: '',
  publisher: '',
  completeness: '',
  img: '',
  price: '',
  note: ''
})

const rules = {
  name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
  course: [{ required: true, message: '请输入适用科目', trigger: 'blur' }],
  publisher: [{ required: true, message: '请输入出版商', trigger: 'blur' }],
  completeness: [{ required: true, message: '请输入完好程度', trigger: 'blur' }],
  price: [{ required: true, message: '请输入售价', trigger: 'blur' }],
  img: [{ required: true, message: '请上传旧书照片', trigger: 'change' }]
}

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (!valid) {
      ElNotification.error('请正确填写信息')
      return
    }
    useDefaultRequest(MarketAPI.uploadProducts(form), () => {
      ElNotification.success('上传成功')
      close()
      router.go(0)
    })
  })
}
// 清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const open = () => {
  formVisible.value = true
}
const close = () => {
  formVisible.value = false
}
defineExpose({ open })
</script>
<style scoped></style>

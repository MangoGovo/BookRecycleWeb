<template>
  <!-- 表单 -->
  <div>
    <el-dialog v-model="showPreview">
      <img w-full :src="previewImg" alt="Preview Image" />
    </el-dialog>
    <el-form label-width="100px" ref="formRef" :model="form" :rules="rules">
      <el-form-item label="预估重量" prop="weight">
        <div class="flex items-center">
          <el-input v-model="form.weight" placeholder="请输入预估重量" type="number">
            <template #suffix>kg</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item label="旧书照片" prop="img">
        <ImageUploader v-model="form.img" />
      </el-form-item>

      <!-- <el-form-item label="上门地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入上门地址"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系方式" :width="10"></el-input>
      </el-form-item> -->

      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" type="textarea" rows="10" placeholder="请输入备注"></el-input>
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
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification, type FormInstance, type UploadProps } from 'element-plus'
import { ImageUploader } from '@/components'
import { useRequest } from 'vue-hooks-plus'
import { recycle } from '@/apis'
import { startLoading } from '@/utils/loading'
import { useDefaultRequest } from '@/utils/request'
import router from '@/router'
// 是否显示预览
const showPreview = ref<boolean>(false)
const previewImg = ref<string>('')
const formRef = ref<FormInstance>()
// 表单数据
type formData = {
  weight: number
  // address: '',
  // phone: '',
  note: string
  img: string
}
const form = ref({
  weight: 0,
  // address: '',
  // phone: '',
  note: '',
  img: ''
})

const rules = {
  weight: [
    { required: true, message: '请输入预估重量', trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]+)?$/, message: '重量必须是数字', trigger: 'blur' }
  ],
  address: [{ required: true, message: '请输入上门地址', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  img: [{ required: true, message: '请上传至少一张旧书照片', trigger: 'change' }]
}

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (!valid) {
      return
    }
    useDefaultRequest(recycle.createRecycleOrder(form.value), (res: any) => {
      router.go(0)
    })
  })
}
// 清空表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
/* Element Plus 步骤条 */
:deep(.el-step__title) {
  font-size: 14px;
}
</style>

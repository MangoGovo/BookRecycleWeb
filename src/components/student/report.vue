<template>
  <el-dialog v-model="dialogVisible" title="举报" width="600" align-center>
    <el-form
      ref="feedbackForm"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      size="large"
      status-icon
    >
      <el-form-item label="举报理由" prop="content">
        <el-input
          v-model="ruleForm.content"
          rows="10"
          type="textarea"
          show-word-limit="true"
          maxlength="600"
          resize="none"
        />
      </el-form-item>
      <el-form-item>
        <div class="w-full justify-end gap-10 flex">
          <el-button type="primary" plain @click="submitForm(feedbackForm)">提交</el-button>
          <el-button type="primary" plain @click="resetForm(feedbackForm)">清空</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { MarketAPI } from '@/apis'
import { useDefaultRequest } from '@/utils/request'
import type { book } from '@/types/book'
const dialogVisible = ref(false)
const feedbackForm = ref<FormInstance>()
const ruleForm = reactive({
  content: '',
  isAnonymous: false
})

const props = defineProps<{
  bookInfo: book | null
}>()

const rules = reactive<FormRules<typeof ruleForm>>({
  content: [{ required: true, message: '请输入反馈意见', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (!valid) {
      ElNotification.error('请正确填写信息')
      return
    }
    useDefaultRequest(
      MarketAPI.report({ book_id: props.bookInfo!.id, title: ruleForm.content }),
      () => {
        ElNotification.success('举报成功')
        dialogVisible.value = false
      }
    )
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
defineExpose({ open, close })
</script>

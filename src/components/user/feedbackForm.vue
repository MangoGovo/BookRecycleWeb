<template>
  <el-dialog v-model="dialogVisible" title="意见反馈" width="600" align-center>
    <el-form
      :ref="feedbackForm"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      size="large"
      status-icon
    >
      <el-form-item label="意见反馈" prop="content">
        <el-input
          v-model="ruleForm.content"
          rows="10"
          placeholder="在此键入您的宝贵意见..."
          type="textarea"
          show-word-limit="true"
          maxlength="600"
          resize="none"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox size="large" border v-model="ruleForm.isAnonymous" label="匿名反馈" />
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
import { type FormInstance, type FormRules } from 'element-plus'
const dialogVisible = ref(false)
const feedbackForm = ref<FormInstance>()
const ruleForm = reactive({
  content: '',
  isAnonymous: false
})

const rules = reactive<FormRules<typeof ruleForm>>({
  content: [{ required: true, message: '请输入反馈意见', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  // if (!formEl) return
  // await formEl.validate((valid) => {
  //   if (!valid) {
  //     ElNotification.error('请正确填写信息')
  //     return
  //   }
  //   useRequest(() => UserAPI.activate(), {
  //     onBefore: () => startLoading(),
  //     onSuccess(res: any) {
  //       if (res.code !== 200) {
  //         ElNotification.error(res.msg)
  //         return
  //       }
  //     },
  //     onError(e) {
  //       ElNotification.error('激活失败，请重试')
  //       console.log('激活失败', e)
  //     },
  //     onFinally: () => closeLoading()
  //   })
  // })
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

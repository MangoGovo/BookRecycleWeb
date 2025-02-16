<template>
  <el-dialog v-model="dialogVisible" title="补充个人信息" width="600" align-center>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      size="large"
      status-icon
    >
      <el-form-item label="学号" prop="studentID">
        <el-input v-model="ruleForm.studentID" placeholder="输入学号" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" placeholder="输入手机号" />
      </el-form-item>
      <el-form-item label="校区" prop="campus">
        <el-select v-model="ruleForm.campus" placeholder="选择校区">
          <el-option v-for="e in campusOptions" :label="e.label" :value="e.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍地址" prop="address">
        <el-input v-model="ruleForm.address" placeholder="输入地址" />
      </el-form-item>
      <el-form-item>
        <div class="w-full justify-end gap-10 flex">
          <el-button type="primary" plain @click="submitForm">提交</el-button>
          <el-button plain type="primary" @click="resetForm(ruleFormRef)">清空</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import campusType from '@/types/enums/campusType'
const dialogVisible = ref(false)

interface RuleForm {
  studentID: string
  telephone: string
  campus: campusType | null
  address: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  studentID: '',
  telephone: '',
  campus: null,
  address: ''
})

const campusOptions = [
  {
    label: '朝晖',
    value: campusType.ZH
  },
  {
    label: '屏峰',
    value: campusType.PF
  },
  {
    label: '莫干山',
    value: campusType.MGS
  }
]

const rules = reactive<FormRules<RuleForm>>({
  studentID: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  telephone: [
    { required: true, message: '请输入手机号' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码'
    }
  ],
  campus: [{ required: true, message: '请选择校区', trigger: 'blur' }],
  address: [{ required: true, message: '请输入宿舍地址', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElNotification.success('提交成功')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="补充个人信息"
    width="600"
    :show-close="false"
    :close-on-click-modal="false"
    align-center
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      size="large"
      status-icon
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入姓名" />
      </el-form-item>
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
          <el-button type="primary" plain @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button plain type="primary" @click="resetForm(ruleFormRef)">清空</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import CampusType from '@/types/enums/campusType'
import { useRequest } from 'vue-hooks-plus'
import { UserAPI } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import { useMainStore } from '@/stores'
const dialogVisible = ref(false)
const loginStore = useMainStore().useLoginStore()
interface RuleForm {
  name: string
  studentID: string
  telephone: string
  campus: CampusType
  address: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  studentID: '',
  telephone: '',
  campus: CampusType.ZH,
  address: ''
})

const campusOptions = [
  {
    label: '朝晖',
    value: CampusType.ZH
  },
  {
    label: '屏峰',
    value: CampusType.PF
  },
  {
    label: '莫干山',
    value: CampusType.MGS
  }
]

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
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
  await formEl.validate((valid) => {
    if (!valid) {
      ElNotification.error('请正确填写信息')
      return
    }
    useRequest(() => UserAPI.activate(ruleForm), {
      onBefore: () => startLoading(),
      onSuccess(res: any) {
        if (res.code !== 200) {
          ElNotification.error(res.msg)
          return
        }
        loginStore.setIsActivated(true)
        close()
        ElNotification.success('激活成功')
      },
      onError(e) {
        ElNotification.error('激活失败，请重试')
        console.log('激活失败', e)
      },
      onFinally: () => closeLoading()
    })
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

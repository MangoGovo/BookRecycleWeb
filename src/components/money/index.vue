<template>
  <div>
    <!-- Main Withdrawal Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="账户提现"
      width="400px"
      class="withdrawal-dialog"
      align-center
    >
      <div class="space-y-4">
        <!-- Account Balance -->
        <div class="flex justify-between items-center">
          <span class="text-gray-700">账户余额:</span>
          <span class="text-lg font-medium">{{ formatCurrency(accountBalance) }}</span>
        </div>

        <!-- Withdrawal Amount Input -->
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="amount" label="提现金额" class="mb-4">
            <el-input
              v-model.number="form.amount"
              type="number"
              placeholder="请输入提现金额"
              class="w-full"
              :max="accountBalance"
            >
              <template #append>元</template>
            </el-input>
          </el-form-item>

          <!-- Error message for insufficient balance -->
          <div v-if="insufficientBalance" class="text-red-500 text-sm mt-1">
            提现金额不能超过账户余额
          </div>
        </el-form>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm" :disabled="isConfirmDisabled">
            确认提现
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Confirmation Dialog -->
    <el-dialog
      v-model="confirmDialogVisible"
      title="确认提现"
      width="360px"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="text-center space-y-4">
        <p class="text-gray-600">您确定要提现以下金额吗？</p>
        <p class="text-xl font-bold text-blue-600">{{ formatCurrency(form.amount) }}</p>
      </div>

      <template #footer>
        <div class="flex justify-center gap-4">
          <el-button type="success" @click="submitWithdrawal">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useDefaultRequest } from '@/utils/request'
import { UserAPI } from '@/apis'
// Dialog visibility states
const dialogVisible = ref(false)
const confirmDialogVisible = ref(false)

const accountBalance = ref(0)
useDefaultRequest(UserAPI.info(), (res: any) => {
  accountBalance.value = Number(res.data.balance)
})

// Form data
const formRef = ref<FormInstance>()
const form = reactive({
  amount: 0
})

const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
// Form validation rules
const rules = reactive<FormRules>({
  amount: [
    { required: true, message: '请输入提现金额', trigger: 'blur' },
    { type: 'number', min: 1, message: '提现金额必须大于0', trigger: 'blur' }
  ]
})

// Computed properties
const insufficientBalance = computed(() => {
  return form.amount > accountBalance.value
})

const isConfirmDisabled = computed(() => {
  return form.amount <= 0 || form.amount > accountBalance.value
})

// Methods
const formatCurrency = (value: number): string => {
  return `¥ ${value.toFixed(2)}`
}

const handleConfirm = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid, fields) => {
    if (valid && !insufficientBalance.value) {
      confirmDialogVisible.value = true
    }
  })
}

import withdrawal from '@/apis/user/withdrawal'
import router from '@/router'
const emit = defineEmits(['onSuccess'])
const submitWithdrawal = () => {
  useDefaultRequest(withdrawal({ amount: form.amount }), () => {
    ElMessage({
      type: 'success',
      message: `提现申请已提交，金额: ${formatCurrency(form.amount)}`
    })
    emit('onSuccess')
  })
  // Show success message

  // Close dialogs
  confirmDialogVisible.value = false
  dialogVisible.value = false
}
</script>

<style scoped>
.withdrawal-dialog :deep(.el-input-number .el-input__inner) {
  text-align: right;
}
</style>

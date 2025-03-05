<template>
  <div class="p-10 m-20 rounded-lg border shadow-lg flex flex-col mx-auto w-3/5">
    <!-- 订单详情 -->
    <div>
      <div class="text-xl font-bold p-10">订单详情</div>
      <div class="flex flex-row flex-grow-0 gap-10 p-5">
        <div class="flex flex-col flex-1 gap-5 shadow-sm border p-10 rounded-md">
          <p class="text-sm">学生联系方式</p>
          <div class="text-lg font-bold flex flex-row items-center gap-10">
            <div>{{ currentOrder?.seller_phone }}</div>
            <el-icon class="cursor-pointer"><Phone /></el-icon>
          </div>
        </div>
        <div class="flex flex-col flex-1 gap-5 shadow-sm border p-10 rounded-md">
          <p class="text-sm">宿舍位置</p>
          <div class="text-lg font-bold flex flex-row items-center gap-10">
            <div>{{ currentOrder?.address }}</div>
          </div>
        </div>
        <div class="flex flex-col flex-1 gap-5 shadow-sm border p-10 rounded-md">
          <p class="text-sm">预估重量</p>
          <div class="text-lg font-bold flex flex-row items-center gap-10">
            <div>{{ currentOrder?.weight }} kg</div>
          </div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <!-- 实际重量输入 -->
    <el-form label-width="100px" ref="formRef" label-position="top">
      <el-form-item label="实际重量录入" prop="weight">
        <div class="flex items-center m-5">
          <el-input v-model="weight" placeholder="请输入实际重量" type="number">
            <template #suffix>kg</template>
          </el-input>
        </div>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="旧书照片" prop="img">
        <ImageUploader v-model="img_url" />
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <!-- 费用计算 -->
    <div class="mb-6">
      <div class="font-semibold">费用明细</div>
      <div class="flex justify-between mt-2 px-10">
        <span>总金额 ({{ weight ?? 0 }} kg x ¥2/kg)</span>
        <span>¥{{ ((weight ?? 0) * 1.6).toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mt-2 px-10">
        <span>跑腿费 (20%)</span>
        <span>¥{{ ((weight ?? 0) * 1.6 * 0.2).toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mt-2 px-10">
        <span>学生获得金额</span>
        <span>¥{{ ((weight ?? 0) * 1.6 * 0.8).toFixed(2) }}</span>
      </div>
    </div>

    <div class="flex justify-end w-full space-x-2 gap-10 mt-auto">
      <el-button @click="resetForm(formRef)">清空</el-button>
      <el-button type="primary" @click="submitForm()">提交并结算</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification, type FormInstance } from 'element-plus'
import { ref } from 'vue'
import { ImageUploader } from '@/components'
import { useDefaultRequest } from '@/utils/request'
import { ReceiverAPI } from '@/apis'
import router from '@/router'
const formRef = ref()
const img_url = ref<string>('')
const weight = ref<number>()
// 移除图片
const currentOrder = ref()

useDefaultRequest(ReceiverAPI.currentOrder(), (res: any) => {
  if (res.data === null) {
    router.push('/receiver')
  }
  currentOrder.value = res.data
})

const submitForm = async () => {
  if (!weight.value) {
    ElNotification.error('请输入重量')
    return
  }
  if (!img_url.value || img_url.value === '') {
    ElNotification.error('请上传验收图片')
    return
  }

  //  TODO 上传
  useDefaultRequest(
    ReceiverAPI.submitOrder({ weight: Number(weight.value), img: img_url.value }),
    () => {
      ElNotification.success('提交成功')
      router.push('/receiver')
    }
  )

  useDefaultRequest(ReceiverAPI.settleOrder(), () => {
    ElNotification.success('订单已结算')
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-weight: bold; /* 加粗 */
  font-size: 18px; /* 加大字体 */
}
</style>

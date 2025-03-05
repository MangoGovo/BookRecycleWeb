<template>
  <el-dialog v-model="dialogVisible" title="我的书籍" align-center @open="update">
    <el-table :data="bookList" style="width: 100%">
      <el-table-column prop="name" label="书籍标题" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="status" label="状态" :formatter="statusFormatter" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="scope.row.status === 1"
          >
            下架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { MarketAPI } from '@/apis'
import { useDefaultRequest } from '@/utils/request'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import type { book } from '@/types/book'
const dialogVisible = ref(false)
const bookList = ref<book[]>()

const statusFormatter = (row: any) => {
  const statusMap = ['已上架', '已下架', '待审核', '审核不通过']

  return statusMap[row.status - 1] || '未知状态'
}

const handleDelete = (index: number, row: any) => {
  useDefaultRequest(MarketAPI.delMyProduct({ id: row.id }), () => {
    ElNotification.success('删除成功')
    update()
  })
}
const update = () => {
  useDefaultRequest(MarketAPI.getMyProducts(), (res: any) => {
    bookList.value = res.data.my_book_list
  })
}

const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
defineExpose({ open, close })
</script>

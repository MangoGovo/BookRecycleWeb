<template>
  <div class="p-4 w-full flex-grow flex flex-col">
    <div class="overflow-x-auto shadow-md rounded-lg m-10">
      <el-table :data="reportList" border>
        <el-table-column prop="title" label="举报主题" />
        <el-table-column prop="bookname" label="书名" />
        <el-table-column prop="reporter_name" label="举报人" />
        <el-table-column prop="seller_name" label="被举报人" />
        <el-table-column prop="created_at" label="举报时间" />
        <el-table-column prop="status" label="状态" :formatter="statusFormatter">
          <template v-slot="scope">
            <el-tag :type="statusTagType(scope.row.status)" :closable="false" class="capitalize">
              {{ statusFormatter(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="success" plain @click="reject(scope.row)"> 撤销 </el-button>
            <el-button type="danger" @click="accept(scope.row)"> 处理 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTable, ElTableColumn, ElTag, ElButton, ElNotification } from 'element-plus'
import { useDefaultRequest } from '@/utils/request'
import { AdminAPI } from '@/apis'
import { acceptReport, rejectReport } from '@/apis/admin/report'

interface Report {
  id: number
  reporter_name: string
  seller_name: string
  book_name: string
  status: number
  title: string
  created_at: string
}

const reportList = ref<Report[]>()

const update = () => {
  useDefaultRequest(AdminAPI.getReportList(), (res: any) => {
    reportList.value = res.data.report_list
  })
}
update()
const statusFormatter = (row: any) => {
  const statusMap = ['未处理', '已撤销', '已处理']

  return statusMap[row.status - 1] || '未知状态'
}

const statusTagType = (status: number) => {
  switch (status) {
    case 1:
      return 'info'
    case 2:
      return 'success'
    case 3:
      return 'danger'
    default:
      return 'info'
  }
}

const accept = (row: Report) => {
  useDefaultRequest(acceptReport({ id: row.id }), () => {
    ElNotification.success('处理成功')
    update()
  })
}

const reject = (row: Report) => {
  useDefaultRequest(rejectReport({ id: row.id }), () => {
    ElNotification.success('撤销成功')
    update()
  })
}
</script>

<style scoped>
/* 在这里可以自定义额外样式 */
</style>

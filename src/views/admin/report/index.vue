<template>
  <div class="p-4 w-full flex-grow flex flex-col">
    <div class="overflow-x-auto shadow-md rounded-lg m-10">
      <el-table :data="filteredReports" border>
        <el-table-column prop="time" label="举报时间" />
        <el-table-column prop="subject" label="举报主题" />
        <el-table-column prop="reporter" label="举报人" />
        <el-table-column prop="accused" label="被举报人" />
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-tag :type="statusTagType(scope.row.status)" :closable="false" class="capitalize">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="success" plain @click="handleAction(scope.row)"> 撤销 </el-button>
            <el-button type="danger" @click="handleAction(scope.row)"> 处理 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElTag, ElButton } from 'element-plus'

interface Report {
  time: string
  subject: string
  reporter: string
  accused: string
  status: string
}

const reports = ref<Report[]>([
  {
    time: '2025-01-05 16:39',
    subject: '书籍实物与上传信息不符',
    reporter: 'XXX',
    accused: 'XXX',
    status: '待处理'
  },
  {
    time: '2025-01-05 16:39',
    subject: '书籍实物与上传信息不符',
    reporter: 'XXX',
    accused: 'XXX',
    status: '待处理'
  },
  {
    time: '2025-01-05 16:39',
    subject: '书籍实物与上传信息不符',
    reporter: 'XXX',
    accused: 'XXX',
    status: '已处理'
  },
  {
    time: '2025-01-05 16:39',
    subject: '书籍实物与上传信息不符',
    reporter: 'XXX',
    accused: 'XXX',
    status: '已处理'
  },
  {
    time: '2025-01-05 16:39',
    subject: '书籍实物与上传信息不符',
    reporter: 'XXX',
    accused: 'XXX',
    status: '已回复'
  }
])

const searchQuery = ref('')

const filteredReports = computed(() => {
  return reports.value.filter(
    (report) =>
      report.subject.includes(searchQuery.value) || report.reporter.includes(searchQuery.value)
  )
})

const statusTagType = (status: string) => {
  switch (status) {
    case '待处理':
      return 'warning'
    case '已处理':
      return 'success'
    case '已回复':
      return 'danger'
    default:
      return 'info'
  }
}

const handleAction = (row: Report) => {
  // Handle the button click (processing or viewing details)
  console.log('处理/查看', row)
}
</script>

<style scoped>
/* 在这里可以自定义额外样式 */
</style>

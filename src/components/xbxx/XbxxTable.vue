<script setup lang="ts">
import type { PageInfo } from '@/typs/PageInfo'
import type { Res } from '@/typs/Res'
import type { Xbxx } from '@/typs/Xbxx'
import { Search, Filter } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import UploadDialog from '../UploadDialog.vue'
import XbxxSaveDialog from './XbxxSaveDialog.vue'
//表格数据
const tableData = ref<Xbxx[]>([])
//总条数
const total = ref(1)
//每页条数
const pageSize = ref(10)
//当前页
const currentPage = ref(1)
//查询数据
const search = ref('')
//新增对话框
const saveDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
//新增数据
const xbxx = ref<Xbxx>({
  bmbm: '',
  bmmc: '',
  dwzn: '',
  xxmc: '',
  sfkkdw: 0,
})
//挂载
onMounted(async () => {
  fetchTableData()
})
//获取数据
const fetchTableData = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/xbxx/list', {
      params: {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      },
    })
    const data: Res<PageInfo<Xbxx>> = await res.data
    const pageInfo: PageInfo<Xbxx> = data.data as unknown as PageInfo<Xbxx>
    tableData.value = pageInfo.list
    total.value = pageInfo.total
    pageSize.value = pageInfo.pageSize
    currentPage.value = pageInfo.pageNum
  } catch (error) {
    console.log(error)
  }
}
//查询数据
const searchData = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/xbxx/list/query', {
      params: {
        condition: search.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      },
    })
    const data: Res<PageInfo<Xbxx>> = await res.data
    const pageInfo: PageInfo<Xbxx> = data.data as unknown as PageInfo<Xbxx>
    tableData.value = pageInfo.list
    total.value = pageInfo.total
    pageSize.value = pageInfo.pageSize
    currentPage.value = pageInfo.pageNum
  } catch (error) {
    console.error(error)
  }
}
//新增和编辑数据
const handleAdd = () => {
  saveDialogVisible.value = true
}
const editXbxx = async (bmbm: string) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8080/api/xbxx/find/${bmbm}`)
    const data: Res<Xbxx> = await res.data
    xbxx.value = data.data
    saveDialogVisible.value = true
  } catch (error) {
    console.error(error)
  }
}

//删除数据
const deleteXbxx = async (bmbm: string) => {
  try {
    await ElMessageBox.confirm('确定删除该条数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await axios.delete(`http://127.0.0.1:8080/api/xbxx/delete/${bmbm}`)
    ElMessage.success('删除成功')
    fetchTableData()
  } catch (error) {
    console.error(error)
  }
}
//批量删除
const bmbms = ref<string[]>([])
const handleSelectionChange = (selection: Xbxx[]) => {
  bmbms.value = selection.map(item => item.bmbm)
}
const batchDeleteXbxx = async () => {
  try {
    await ElMessageBox.confirm('确定删除所有数据吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await axios.delete(`http://127.0.0.1:8080/api/xbxx/delete/batch`, {
      data: bmbms.value,
    })
    ElMessage.success('删除成功')
    fetchTableData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    } else {
      ElMessage.info('已取消删除')
    }
  }
}

//分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchTableData()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchTableData()
}

//是否开课单位-数据列格式转换
const fromatSFKKDW = (_row: Xbxx, _column: TableColumnCtx<Xbxx>, _cellValue: boolean) => {
  if (_cellValue === true) {
    return '是'
  } else {
    return '否'
  }
}

// 添加导出函数
const exportData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8080/api/xbxx/export', {
      responseType: 'blob', // 重要：设置响应类型为blob
    })

    // 创建下载链接
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)

    // 创建一个临时的a标签来下载文件
    const link = document.createElement('a')
    link.href = url
    link.download = '系部信息表.xlsx' // 设置下载文件名
    document.body.appendChild(link)
    link.click()

    // 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    ElMessage.success('导出成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('导出失败')
  }
}
</script>
<template>
  <div class="data-container">
    <div class="data-tools">
      <div class="search-container">
        <el-input v-model="search" style="width: 240px" placeholder="部门名称" @keyup.enter="searchData" />
        <el-button :icon="Search" class="search-button" @click="searchData" />
        <div></div>
        <el-button :icon="Filter" class="search-button" />
      </div>
      <div class="tools-container">
        <el-button type="primary" class="qxnzy-button-primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" class="qxnzy-button-primary" @click="uploadDialogVisible = true"
          >导入</el-button
        >
        <el-button type="primary" class="qxnzy-button-primary" @click="exportData">导出</el-button>
        <el-button class="qxnzy-button" :disabled="bmbms.length === 0" @click="batchDeleteXbxx"
          >批量删除</el-button
        >
        <el-button type="primary" class="qxnzy-button-primary">系部</el-button>
      </div>
    </div>
    <div class="data-description">
      表单说明：采集系部信息，部门编码唯一，部门编码和部门名称不能重复 。
    </div>
    <div class="data-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{
          backgroundColor: '#fafafe',
          color: '#000',
          fontWeight: '500',
          fontSize: '14px',
          textAlign: 'center',
          padding: '10px 0',
        }"
        :cell-style="{
          padding: '6px 0',
          textAlign: 'center',
          fontSize: '13px',
          lineHeight: '22px',
        }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="bmbm" label="部门编码" width="100" />
        <el-table-column prop="bmmc" label="部门名称" width="200" />
        <el-table-column prop="dwzn" label="部门职责" width="230" />
        <el-table-column prop="xxmc" label="学校名称" width="180" />
        <el-table-column prop="sfkkdw" label="是否开课单位" width="180" :formatter="fromatSFKKDW" />
        <el-table-column prop="stat" fixed="right" label="状态" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <el-button link type="primary" size="small"> 详情 </el-button>
              <el-divider direction="vertical" />
              <el-button link type="primary" size="small" @click="editXbxx(scope.row.bmbm)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button link type="danger" size="small" @click="deleteXbxx(scope.row.bmbm)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="display: flex; justify-content: end; margin-top: 20px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          size="small"
          background
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <!-- 新增对话框 -->
  <XbxxSaveDialog v-model="saveDialogVisible" :data="xbxx" @save-success="fetchTableData" />
  <!-- 导入对话框 -->
  <UploadDialog v-model="uploadDialogVisible" />
</template>
<style>
.data-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
}
.data-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.search-container {
  display: flex;
  align-items: center;
}
.search-button {
  width: 32px;
  height: 32px;
  margin: 0 0 0 6px;
}
.tools-container {
  display: flex;
}
.data-description {
  font-size: 13px;
  color: #333;
  background-color: #fff;
  margin-bottom: 16px;
}
.data-table {
  flex: 1;
  display: flex;
  background-color: #fff;
  flex-direction: column;
}
.qxnzy-button {
  font-size: 13px;
}

.qxnzy-button-primary {
  color: #fff;
  font-size: 13px;
}

.qxnzy-dialog-xbxx {
  padding: 10px 20px 20px 20px;
}
.qxnzy-dialog-xbxx .el-dialog__title {
  font-size: 15px;
  font-weight: 600;
}
.qxnzy-dialog-xbxx .el-form-item {
  margin-bottom: 20px;
}
.qxnzy-dialog-xbxx-footer {
  display: flex;
  justify-content: end;
}
</style>

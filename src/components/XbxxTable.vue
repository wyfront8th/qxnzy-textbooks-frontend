<script setup lang="ts">
import type { PageInfo } from '@/typs/PageInfo'
import type { Res } from '@/typs/Res'
import type { Xbxx } from '@/typs/Xbxx'
import { Search, Filter } from '@element-plus/icons-vue'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
const tableData = ref<Xbxx[]>([])
const total = ref(1)
const pageSize = ref(10)
const currentPage = ref(1)
//查询数据
const search = ref('')
//对话框
const addDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const xbxx = ref<Xbxx>({
  bmbm: '',
  bmmc: '',
  dwzn: '',
  xxmc: '',
  sfkkdw: 0,
})

const uploadTypes = ref(1)
const ruleFormref = ref<FormInstance>()
const ruleForm = reactive<FormRules<Xbxx>>({
  bmbm: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
  bmmc: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  dwzn: [{ required: true, message: '请输入部门职责', trigger: 'blur' }],
  xxmc: [{ required: true, message: '请输入学校名称', trigger: 'blur' }],
  sfkkdw: [{ required: true, message: '请输入是否开课单位', trigger: 'blur' }],
})
const uploadUrl = ref('http://127.0.0.1:8080/api/xbxx/upload')
const handleUploadSuccess = (response: any) => {
  console.log('上传成功:', response)
  uploadDialogVisible.value = false
  fetchTableData()
}
onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/xbxx/list')
    const data: Res<PageInfo<Xbxx>> = await res.data
    const pageInfo: PageInfo<Xbxx> = data.data as unknown as PageInfo<Xbxx>
    tableData.value = pageInfo.list
    total.value = pageInfo.total
    pageSize.value = pageInfo.pageSize
    currentPage.value = pageInfo.pageNum
  } catch (error) {
    console.error(error)
  }
})
const fetchTableData = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8080/api/xbxx/list')
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
const submitForm = async () => {
  const valid = await ruleFormref.value?.validate()
  if (valid) {
    try {
      xbxx.value.sfkkdw = Number(xbxx.value.sfkkdw)
      await axios.post('http://127.0.0.1:8080/api/xbxx/save-xbxx', xbxx.value)
      resetForm()
      fetchTableData()
    } catch (error) {
      console.error(error)
    }
  }
}
const resetForm = () => {
  ruleFormref.value?.resetFields()
  addDialogVisible.value = false
}
</script>
<template>
  <div class="data-container">
    <div class="data-tools">
      <div class="search-container">
        <el-input v-model="search" style="width: 240px" placeholder="部门名称" />
        <el-button :icon="Search" class="search-button" />
        <div></div>
        <el-button :icon="Filter" class="search-button" />
      </div>
      <div class="tools-container">
        <el-button type="primary" class="qxnzy-button-primary" @click="addDialogVisible = true"
          >新增</el-button
        >
        <el-button type="primary" class="qxnzy-button-primary" @click="uploadDialogVisible = true"
          >导入</el-button
        >
        <el-button type="primary" class="qxnzy-button-primary">导出</el-button>
        <el-button class="qxnzy-button">批量删除</el-button>
        <el-button type="primary" class="qxnzy-button-primary">系部</el-button>
      </div>
    </div>
    <div class="data-description">
      表单说明：采集学生实习情况，学生实习包括认识实习和岗位实习。一个学生可以有多条记录，如两个学期都去同一家企业不需要录两次。
    </div>
    <div class="data-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{
          backgroundColor: '#fafafe',
          color: '#000',
          fontWeight: '500',
          fontSize: '14px',
          textAlign: 'center',
          padding: '10px 0',
        }"
        :cell-style="{
          padding: '10px 0',
          textAlign: 'center',
          fontSize: '13px',
          lineHeight: '22px',
        }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="bmbm" label="部门编码" width="180" />
        <el-table-column prop="bmmc" label="部门名称" width="180" />
        <el-table-column prop="dwzn" label="部门职责" width="180" />
        <el-table-column prop="xxmc" label="学校名称" width="180" />
        <el-table-column prop="sfkkdw" label="是否开课单位" width="180" />
        <el-table-column prop="stat" fixed="right" label="状态" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default>
            <div style="display: flex; align-items: center; justify-content: center">
              <el-button link type="primary" size="small"> 详情 </el-button>
              <el-divider direction="vertical" />
              <el-button link type="primary" size="small">编辑</el-button>
              <el-divider direction="vertical" />
              <el-button link type="danger" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: end; margin-top: 20px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          size="small"
          background
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </div>
    </div>
  </div>
  <!-- 新增对话框 -->
  <el-dialog v-model="addDialogVisible" class="qxnzy-dialog-xbxx" title="新增" width="30%" center>
    <el-form
      label-position="right"
      label-width="auto"
      :rules="ruleForm"
      ref="ruleFormref"
      :model="xbxx"
    >
      <el-form-item label="部门编码" prop="bmbm">
        <el-input v-model="xbxx.bmbm" />
      </el-form-item>
      <el-form-item label="部门名称" prop="bmmc">
        <el-input v-model="xbxx.bmmc" />
      </el-form-item>
      <el-form-item label="部门职责" prop="dwzn">
        <el-input v-model="xbxx.dwzn" />
      </el-form-item>
      <el-form-item label="学校名称" prop="xxmc">
        <el-input v-model="xbxx.xxmc" />
      </el-form-item>
      <el-form-item label="是否开课单位" prop="sfkkdw">
        <el-radio-group v-model="xbxx.sfkkdw">
          <el-radio value="1">是</el-radio>
          <el-radio value="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="qxnzy-dialog-xbxx-footer">
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
        <el-button @click="resetForm">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 上传数据对话框 -->
  <el-dialog
    v-model="uploadDialogVisible"
    class="qxnzy-dialog-xbxx"
    title="上传数据"
    width="40%"
    center
  >
    <div class="qxnzy-upload-dialog">
      <div class="qxnzy-upload-dialog-left">
        <el-icon :size="20"><Check /></el-icon>
      </div>
      <div class="qxnzy-upload-dialog-right">
        <div>导入类型</div>
        <el-radio-group v-model="uploadTypes">
          <el-radio :value="1">新增导入</el-radio>
          <el-radio :value="0">更新导入</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="qxnzy-upload-dialog">
      <div class="qxnzy-upload-dialog-left">
        <el-icon :size="20"><Download /></el-icon>
      </div>
      <div class="qxnzy-upload-dialog-right">
        <div class="qxnzy-download-template">
          <div class="download-template-titel">填写导入数据信息</div>
          <div class="download-template-prompt">请按照导入模板的格式准备导入数据</div>
          <el-button link type="primary" class="download-template-button">下载模版</el-button>
        </div>
      </div>
    </div>
    <div class="qxnzy-upload-dialog">
      <div class="qxnzy-upload-dialog-left">
        <el-icon :size="20"><Upload /></el-icon>
      </div>
      <div class="qxnzy-upload-dialog-right">
        <el-upload :action="uploadUrl" :on-success="handleUploadSuccess">
          <el-button type="primary">上传文件</el-button>
        </el-upload>
      </div>
    </div>
  </el-dialog>
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
.qxnzy-button:hover {
  color: #2e55ef;
  border-color: #2e55ef;
  background-color: #fff;
}
.qxnzy-button-primary {
  color: #fff;
  background-color: #2e55ef;
  border-color: #2e55ef;
  font-size: 13px;
}
.qxnzy-button-primary:hover {
  color: #fff;
  background-color: #587ffc;
  border-color: #587ffc;
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
.qxnzy-upload-dialog {
  display: flex;
  height: 130px;
  margin-bottom: 16px;
  border-radius: 2px;
  border-width: 1px;
  border-style: dashed;
  border-color: rgb(222, 222, 222);
  border-image: initial;
}
.qxnzy-upload-dialog-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 100%;
  margin-right: 50px;
  background: rgb(250, 250, 250);
}
.qxnzy-upload-dialog-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.qxnzy-upload-dialog-right > div {
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-right: 20px;
}
.qxnzy-upload-dialog-right .el-radio {
  margin-right: 12px;
}
.qxnzy-upload-dialog-right .el-radio__label {
  font-size: 13px;
  color: #333;
  font-weight: 600;
}
.qxnzy-download-template {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.download-template-titel {
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
}
.download-template-prompt {
  font-size: 12px;
  color: rgb(153, 153, 153);
  margin-bottom: 5px;
}
.download-template-button > span {
  font-size: 13px;
  color: #2e55ef;
  font-weight: 600 !important;
}
</style>

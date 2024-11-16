<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { UploadRequestOptions } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Check, Download, Upload } from '@element-plus/icons-vue'

// const { visible } = defineProps<{
//   visible: boolean
// }>()
const showDialog = defineModel<boolean>()
// watchEffect(() => {
//   showDialog.value = visible
// })
const emit = defineEmits(['update:visible', 'upload-success'])

const uploadTypes = ref(1)
const progress = ref(0)

// 上传文件处理
const uploadFile = async (options: UploadRequestOptions) => {
  const formData = new FormData()
  formData.append('file', options.file)
  formData.append('type', uploadTypes.value.toString())

  try {
    const response = await axios.post('http://127.0.0.1:8080/api/xbxx/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const importId = response.data.data
    const eventSource = new EventSource(
      `http://127.0.0.1:8080/api/xbxx/import/progress/${importId}`,
    )

    eventSource.onmessage = event => {
      const c = JSON.parse(event.data)
      if (c.totalCount > 0) {
        progress.value = Math.round((c.totalRows / (c.totalCount - 1)) * 100)
      }
      if (progress.value === 100) {
        eventSource.close()
        setTimeout(() => {
          closeDialog()
          emit('upload-success')
        }, 2000)
      }
    }
    return response.data
  } catch (error) {
    console.error('上传失败:', error)
    ElMessage.error('上传失败')
    throw error
  }
}

const closeDialog = () => {
  // emit('update:visible', false)
  showDialog.value = false
  progress.value = 0
}
</script>

<template>
  <el-dialog
    v-model="showDialog"
    class="qxnzy-dialog-xbxx"
    title="导入"
    width="40%"
    center
    @close="closeDialog"
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
        <div class="qxnzy-upload-dialog-right-wrapper">
          <div class="qxnzy-upload-dialog-right-title">填写导入数据信息</div>
          <div class="qxnzy-upload-dialog-right-prompt">请按照导入模板的格式准备导入数据</div>
          <el-button link type="primary" class="qxnzy-upload-dialog-right-button"
            >下载模版</el-button
          >
        </div>
      </div>
    </div>
    <div class="qxnzy-upload-dialog">
      <div class="qxnzy-upload-dialog-left">
        <el-icon :size="20"><Upload /></el-icon>
      </div>
      <div class="qxnzy-upload-dialog-right">
        <div class="qxnzy-upload-dialog-right-wrapper">
          <div class="qxnzy-upload-dialog-right-title">上传填好的数据信息</div>
          <div class="qxnzy-upload-dialog-right-prompt">
            文件后缀名为xls或xlsx，文件大小不得大于100M
          </div>
          <el-upload :http-request="uploadFile" accept=".xlsx,.xls" :show-file-list="false">
            <el-button type="primary" class="qxnzy-upload-dialog-right-button" link>
              点击上传
            </el-button>
          </el-upload>
          <el-progress
            v-if="progress > 0"
            :percentage="progress"
            :text-inside="true"
            :stroke-width="16"
            style="margin-top: 6px; width: 100%"
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.qxnzy-upload-dialog {
  display: flex;
  height: 130px;
  margin-bottom: 16px;
  border-radius: 2px;
  border: 1px dashed #dedede;
}

.qxnzy-upload-dialog-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 100%;
  margin-right: 50px;
  background: #fafafa;
}

.qxnzy-upload-dialog-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
}

.qxnzy-upload-dialog-right > div {
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-right: 20px;
}

.qxnzy-upload-dialog-right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.qxnzy-upload-dialog-right-title {
  font-size: 13px;
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
}

.qxnzy-upload-dialog-right-prompt {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.qxnzy-upload-dialog-right-button {
  font-size: 13px;
  color: #2e55ef;
  font-weight: 600;
}
</style>

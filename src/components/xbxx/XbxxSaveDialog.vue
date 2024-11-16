<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { Xbxx } from '@/typs/Xbxx'
import axios from 'axios'

//组件属性
const { data } = defineProps<{
  data: Xbxx
}>()
//定义组件v-model,双向绑定,对话框是否显示
const visible = defineModel<boolean>()
//定义保存成功事件
const emit = defineEmits(['save-success'])
//父组件传递进来的系部信息
const xbxx = ref<Xbxx>(data)
//监听父组件传递进来的系部信息,改变时候调研
watchEffect(() => {
  xbxx.value = data
})
//表单实例
const ruleFormref = ref<FormInstance>()
const ruleForm = reactive<FormRules>({
  bmbm: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
  bmmc: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  dwzn: [{ required: true, message: '请输入部门职责', trigger: 'blur' }],
  xxmc: [{ required: true, message: '请输入学校名称', trigger: 'blur' }],
  sfkkdw: [{ required: true, message: '请输入是否开课单位', trigger: 'blur' }],
})
//表单提交
const submitForm = async () => {
  const valid = await ruleFormref.value?.validate()
  if (valid) {
    try {
      const url = xbxx.value.bmbm
        ? 'http://127.0.0.1:8080/api/xbxx/update-xbxx'
        : 'http://127.0.0.1:8080/api/xbxx/save-xbxx'

      xbxx.value.sfkkdw = Number(xbxx.value.sfkkdw)
      await axios.post(url, xbxx.value)
      ElMessage({
        message: '保存成功',
        type: 'success',
        duration: 5000,
      })
      resetForm()
      emit('save-success')
    } catch (error) {
      ElMessage({
        message: '保存失败',
        type: 'error',
        duration: 5000,
      })
      console.error(error)
    }
  }
}
//表单重置
const resetForm = () => {
  ruleFormref.value?.resetFields()
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" class="qxnzy-dialog-xbxx" title="新增" width="30%" center>
    <el-form
      label-position="right"
      label-width="auto"
      :rules="ruleForm"
      ref="ruleFormref"
      :model="xbxx"
    >
      <el-form-item label="部门编码" prop="bmbm">
        <el-input v-model="xbxx.bmbm" :disabled="!!xbxx.bmbm" />
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
          <el-radio :value="true">是</el-radio>
          <el-radio :value="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="qxnzy-dialog-xbxx-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts"></script>
<template>
  <div class="main-aside">
    <el-menu default-active="/textbooks-system/bmxx" class="el-menu-horizontal" router>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Stopwatch /></el-icon>
          <span class="el-sub-menu-name">学校基础数据</span>
        </template>
        <el-menu-item index="/textbooks-system/bmxx">
          <span>部门信息</span>
        </el-menu-item>
        <el-menu-item index="/textbooks-system/jcyg">专业信息</el-menu-item>
        <el-menu-item index="1-3">教师信息</el-menu-item>
        <el-menu-item index="1-4">班级信息</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Notebook /></el-icon>
        <span class="el-sub-menu-name">教材信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><FolderAdd /></el-icon>
        <span class="el-sub-menu-name">教材订购</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.main-aside {
  width: 238px;
  height: 100%;
  display: flex;
}
.el-menu-horizontal {
  height: 100%;
  width: 100%;
  padding-top: 13px;
  --el-menu-active-color: #2e55ef;
  --el-menu-horizontal-height: 100%;
  --el-menu-item-height: 38px;
  --el-menu-item-font-size: 14px;
}
.el-sub-menu-name {
  font-weight: 500;
}
.el-menu-horizontal .el-menu-item {
  height: 38px;
}
</style>

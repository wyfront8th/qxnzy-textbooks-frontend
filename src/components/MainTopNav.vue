<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
</script>
<template>
  <div class="main-top">
    <div class="qxnzy-title">黔西南民族职业技术学院【教材管理系统-V1.0】</div>
    <div class="qxnzy-menu">
      <div class="qxnzy-menu-content">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/textbooks-system">教材填报</router-link></li>
          <li>帮助手册</li>
        </ul>
      </div>
      <div class="qxnzy-use-data">
        <el-avatar :size="30" :icon="UserFilled" />
        <div class="qxnzy-use-name">王一锋【机电系管理员】</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-top {
  display: flex;
  height: 53px;
  background-color: #2e55ef;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
}
.qxnzy-title {
  font-size: 18px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  line-height: 54px;
  white-space: nowrap;
  display: flex;
  min-width: 580px;
  height: 54px;
}
.qxnzy-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 20px;
}
.qxnzy-menu-content ul {
  font-weight: 400;
  color: rgb(255, 255, 255);
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
}
.qxnzy-menu-content ul li {
  position: relative;
  display: flex;
  cursor: pointer;
  text-align: center;
  margin: 0px 10px;
  padding: 0px 4px;
}
.qxnzy-menu-content ul li a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
.qxnzy-menu-content ul li a:hover {
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.qxnzy-menu .qxnzy-use-data {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}
.qxnzy-menu .qxnzy-use-data .qxnzy-use-name {
  font-size: 13px;
  color: rgb(255, 255, 255);
  margin-left: 10px;
}
</style>

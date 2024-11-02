<script setup lang="ts">
import MainTopNav from '@/components/MainTopNav.vue'
</script>

<template>
  <div class="main-top-fixed">
    <MainTopNav />
  </div>

  <div class="home-img-container">
    <img src="../assets/home.png" alt="home" />
  </div>
  <div class="home-notice-container">
    <div class="home-notice">
      <div class="home-notice-header">通知公告</div>
      <div class="home-notice-content">
        <div class="home-notice-item">
          <div class="home-notice-itme-header">针对9月19日教育漏洞报告平台发布的漏洞修复补丁</div>
          <div class="home-notice-itme-description">
            针对9月19日教育漏洞报告平台发布的30+所职业学校状态数据采集平台（院校端）存在的系统漏洞，此次升级已修复！
          </div>
          <div class="home-notice-itme-date">
            <span>2024-10-27</span>
            <el-divider direction="vertical" />
            <span>系统通知</span>
          </div>
        </div>
        <div class="home-notice-item">
          <div class="home-notice-itme-header">针对9月19日教育漏洞报告平台发布的漏洞修复补丁</div>
          <div class="home-notice-itme-description">
            针对9月19日教育漏洞报告平台发布的30+所职业学校状态数据采集平台（院校端）存在的系统漏洞，此次升级已修复！
          </div>
          <div class="home-notice-itme-date">
            <span>2024-10-27</span>
            <el-divider direction="vertical" />
            <span>系统通知</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-top-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  z-index: 1000; /* 确保导航栏在页面内容之上 */
}
.home-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 275px;
}
.home-img-container img {
  width: 100%;
  height: 100%;
}
.home-notice-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-notice {
  width: 80%;
  min-height: 300px;
  background-color: #fff;
}
.home-notice-header {
  font-size: 22px;
  color: #333;
  font-weight: 600;
  line-height: 33px;
  padding: 30px 20px 0px 20px;
  /* border-bottom: 1px solid #e8e8e8; */
}
.home-notice-content {
  padding: 20px;
}
.home-notice-item {
  margin-bottom: 0px;
  padding-top: 12px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgb(232, 232, 232);
}
.home-notice-itme-header {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  line-height: 22px;
}
.home-notice-itme-description {
  margin-top: 4px;
  margin-bottom: 6px;
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.home-notice-itme-date {
  height: 22px;
  font-size: 13px;
  font-weight: 400;
  color: #999;
  line-height: 22px;
}
</style>

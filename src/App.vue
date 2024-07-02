<template>
  <div id="app">
    <!-- 右上角的 Logo -->
    <img src="./assets/logo.png" alt="Logo"
      style="position: fixed; top: 10px; right: 10px; width: 50px; height: auto; z-index: 1000;">

    <!-- 左侧菜单 -->
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo"
      style="width: 200px; height: 100%; position: fixed; left: 0; top: 0; bottom: 0; background-color: #f0f2f5; z-index: 100; /* 将菜单的 z-index 设置为比 Logo 小 */">
      <el-menu-item index="1-1">
        <router-link to="/engineer">工程师管理</router-link>
      </el-menu-item>
      <el-menu-item index="1-2">
        <router-link to="/user">用户管理</router-link>
      </el-menu-item>
      <el-menu-item index="1-3">
        <router-link to="/order">订单管理</router-link>
      </el-menu-item>
      <el-menu-item index="1-4">
        <router-link to="/statistics">数据统计</router-link>
      </el-menu-item>
    </el-menu>

    <!-- 底部版权信息 -->
    <footer
      style="position: fixed; bottom: 0; width: 100%; background-color: #f0f2f5; text-align: center; padding: 10px; z-index: 1000; /* 将底部版权信息的 z-index 设置为比 Logo 大 */">
      鲁ICP备666666号
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      版权所有 &copy; 大帅哥 保留所有权利。
    </footer>

    <!-- 主内容区域 -->
    <div style="margin-left: 200px; padding: 20px; z-index: 99; /* 将主内容区域的 z-index 设置为比菜单小 */">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '', // 默认选中的菜单项
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-menu-vertical-demo {
  border-right: 1px solid #dcdfe6;
  /* 添加边框以区分菜单和内容区域 */
}

/* 其他样式按需添加 */
</style>

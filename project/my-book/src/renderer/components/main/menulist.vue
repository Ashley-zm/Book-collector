<template>
<<<<<<< HEAD
    <a-menu
        style="width: 200px;font-weight:bold;background-color:#f3f3f3"
        mode="vertical"
        :defaultSelectedKeys="['1']"
    >
    <!--defaultSelectedKeys 默认选择-->
        <a-menu-item key="1">
            <router-link to="/main/mybook">我的书架</router-link>
        </a-menu-item>
        <a-menu-item key="2">
            <router-link to="/main/search">搜索</router-link>
        </a-menu-item>
        <a-menu-item key="3">
            <router-link to="/main/classmanage">分类管理</router-link>
        </a-menu-item>
        <a-menu-item key="4">
            我的书评
        </a-menu-item>
        <a-menu-item key="5">
            广场
        </a-menu-item>
        <a-menu-item key="6">
            反馈
        </a-menu-item>
    </a-menu>
=======
  <a-menu
    @click="handleClick"
    class="menu"
    mode="vertical"
    :defaultSelectedKeys="defaultSelected"
  >
    <a-menu-item key="1">
      <router-link to="/main/mybook">我的书架</router-link>
    </a-menu-item>
    <a-menu-item key="2">
      <router-link to="/main/search">搜索</router-link>
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/main/classmanage">分类管理</router-link>
    </a-menu-item>
    <a-menu-item key="4">
      <router-link to="/main/mycomment">我的书评</router-link>
    </a-menu-item>
    <a-menu-item key="5">
      <router-link to="/main/square">广场</router-link>
    </a-menu-item>
    <a-menu-item key="6">
      <router-link to="/main/subscribe">订阅管理</router-link>
    </a-menu-item>
    <a-menu-item key="7">反馈</a-menu-item>
  </a-menu>
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
</template>
<script>
export default {
  data() {
    return {
      // 登录上之后 没有选择 默认为1
      defaultSelected: [window.localStorage.getItem('menulistdefault') ? window.localStorage.getItem('menulistdefault'):'1']
    };
  },
  methods: {
    // 利用localStorage 存储当前菜单栏选择的选项
    handleClick(e) {
      const storage = window.localStorage;
      storage.setItem('menulistdefault', e.keyPath);
    }
  }
};
</script>
<style scoped>
.menu{
  font-weight:bold;
  background-color:#f3f3f3;
  text-align: left;
  text-indent: 12px;
}
</style>

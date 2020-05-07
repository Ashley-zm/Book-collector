<template>
  <div id="components-layout-demo-basic">
    <a-layout style="height:575px;">
      <a-layout-sider>
        <div id="test">
          <a-avatar :size="64"  class="avatar" icon="user" />
          <div id="person-center">
            <a-col :span="8">昵称:</a-col>
            <span>{{$store.getters.userId}}</span>
            <router-link to='/main/person'>
              <a-icon type="right" />  </router-link>
          </div>
        </div>
        <div class="fenge"></div>
          <!--<a-row id="list">-->
            <!--<a-col :span="8">收藏</a-col>-->
            <!--<a-col :span="8">已读</a-col>-->
            <!--<a-col :span="8">想读</a-col>-->
          <!--</a-row>-->
    <a-layout>
      <a-layout-sider style="min-width:240px;max-width:240px">
        <!--头像区域-->
        <HeadArea></HeadArea>
        <!--左侧菜单栏-->
        <MenuList></MenuList>
      </a-layout-sider>
      <a-layout>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </a-layout>
    </a-layout>
    <!--消息通知组件-->
    <a-modal title="公告" v-model="visible" :width="300" :footer="null">
      <div style="white-space: pre-line;" align="left">
      </div>
      <!--从接口获取消息显示再这里-->
    </a-modal>
  </div>
</template>
<script>
import MenuList from './menulist'

import MenuList from "./menulist"
// import openWindow from '@/util/openWindow' //调用窗口的方法  微信
// import Login from './login/login'
import MenuList from "./menulist";
import HeadArea from "./person";
export default {
  data() {
    return {
      visible: false
    };
  },
  created() {
    console.log(this.$store.getters.userinfo);
  },
  methods: {
    change() {
      this.$router.push("/test");
    }
  },
  components: {
    MenuList,
    HeadArea
  }
};
</script>

<style scoped>
#components-layout-demo-basic{
  height: 100%;
}
.avatar{
  float: left;
  margin-top: 20px;
  margin-left: 18px;
}
#person-center{
  float: left;
  width: 55%;
  margin-left: 6px;
  margin-top: -18px;
  height: 80px;
  /*background-color: fuchsia;*/
}
/*#list{*/
  /*width: 100%;*/
  /*color: black;*/
/*}*/
span{
  width: 40px;
  display: block;
  overflow: hidden;
  float: left;
}

.fenge{
  color: black;
  width: 100%;
  height: 1px;
  /*background-color: fuchsia;*/
  clear: both;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {

#components-layout-demo-basic .ant-layout-header {
  background: #7dbcea;
  color: #fff;
}

#components-layout-demo-basic .ant-layout-sider {
  background: #f3f3f3;
  color: #fff;
  text-align: center;
  height: 100%;
  /* line-height: 100px; */
}

#components-layout-demo-basic .ant-layout-content {
  /* background: blue; */
  color: #fff;
  min-height: 120px;
  min-width: 90px;
  width: 90px;
  height: 100%;
}

#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
  height: 100%;
  ;

}

#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

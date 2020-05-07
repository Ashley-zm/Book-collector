<template>
  <div id="components-layout-demo-basic">
    <a-layout style="height:570px;">
      <a-layout-sider>
        <div style="height:1px;width:100px">
          <a-button style="width:7px;
            height:7px;
            float:left;
            background:rgba(244,85,77,1);
            ">
            </a-button>
            <a-button
              style="width:7px;
              height:7px;
              background:rgba(242,177,33,1);
              float:left
              "
            >
            </a-button>
            <a-button
              style="width:7px;
              height:7px;
              background:rgba(14,189,53,1);
              float:left
              "
            >
            </a-button>
        </div>
        <a-row>
          <a-col></a-col>
          <a-col></a-col>
          <a-col></a-col>
        </a-row>
        <div class="right">
          <div class="sider">
            <a-avatar :size="48" icon="user"/>
          </div>
          <div class="sider usershow">
            <p id="youke">游客</p>
            <p id="tiyan">登陆后体验更多功能</p>
          </div>
          <div class="sider jiantou">
<<<<<<< HEAD
            <router-link to='/index/login'><img src="../../assets/ic_go_right.png" alt="" style="width:8px; ">
            </router-link>
=======
            <img src="@/assets/ic_go_right.png" alt style="width:8px; ">
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-row>
            <a-col :offset="0" class="headtitle">
              欢迎使用书藏家。
              <span>让你相见恨晚</span>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>
          <a-row>
            <a-col :offset="9">
              <router-link to="/login/register">手机注册</router-link>
              <a-divider type="vertical" class="footertitle"/>
              <router-link to="/login/" class="footertitle">忘记密码？</router-link>
            </a-col>
          </a-row>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
#youke {
  width: 80px;
  font-weight: bold;
  margin-bottom: 2px;
  margin-top: 42px;
  line-height: 20px;
  font-size: 17px;
  color: black;
  font-family: "Adobe 黑体 Std R";
}
#tiyan {
  font-size: 11px;
  line-height: 16px;
  color: rgb(90, 90, 90);
}
.right {
  width: 200px;
  height: 100px;
}
.sider {
  margin-left: 10px;
  float: left;
  width: 54px;
  height: 54px;
}
.usershow {
  margin-left: 3px;
  float: left;
  width: 100px;
  height: 100px;
}
.jiantou {
  margin-left: 16px;
  width: 10px;
  height: 100px;
  float: left;
}
span {
  font-size: 13px;
  color: #5a5a5a;
  font-family: "Adobe 宋体 Std L";
}
.footertitle {
  color: #8d8d8d;
}
.headtitle {
  font-size: 25px;
  color: #1f1f1f;
  font-weight: bold;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: white;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #f3f3f3;
  color: #fff;
  line-height: 120px;
  height: 100%;
}
#components-layout-demo-basic .ant-layout-content {
  background: white;
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

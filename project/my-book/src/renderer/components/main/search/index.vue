<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="18" :offset="1">
          <a-input placeholder="输入书籍/用户/书评信息搜索" ref="inputValue">
            <a-icon slot="prefix" type="search"/>
          </a-input>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-button type="primary" @click="searchInfo">搜索</a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <!-- <router-view></router-view> -->
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="图书" key="1">
          <Book :bookKey="searchInput" :isHack='nowPageId'></Book>
        </a-tab-pane>
        <a-tab-pane tab="用户" key="2">
          <User :bookKey="searchInput" :isHack='nowPageId'></User>
        </a-tab-pane>
        <a-tab-pane tab="书评" key="3">
          <Comment :bookKey="searchInput" :isHack='nowPageId'></Comment>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>
<script>
import Book from "./book";
import User from "./user";
import Comment from "./comment";
export default {
  data() {
    return {
      searchInput: null, // 搜索框内容
      nowPageId: 1, // 当前页面的位置  1 图书 2 用户 3 书评
      current:['book'],
    };
  },
  methods: {
    test(e){
      console.log(e);
    },
    callback(key) {
      this.nowPageId = parseInt(key);
      console.log(this.nowPageId)
      this.searchInput = null;
      this.$refs.inputValue.stateValue = null;
    },
    searchInfo() {
      const Value = this.$refs.inputValue.stateValue;
      if (Value) {
        // 判断页面 执行不同的方法
        // 图书页
        this.searchInput = Value;
        if (this.nowPageId === 1) {
          /**
           * 获取豆瓣数据
           * @q 关键字
           * @start 分页
           * @x 不是豆瓣所需参数  用来判断本次请求的目的
           * first 代表这是用按钮来搜索 不是用滚动加载
           * 默认显示20条
           */
          this.$store
            .dispatch("SearchDouBan", { q: Value, start: 0, x: "first" })
            .then(res => {
              this.$message.success("共计" + res + "条数据");
            })
            .catch(() => {
              this.$message.error("获取数据失败!");
            });
          // 用户页
        } else if (this.nowPageId === 2) {
          this.$store
            .dispatch("SearchUser", { keywords: Value, page: 0, wuguan: 0 })
            .then(res => {
              this.$message.success("共搜索到" + res + "位用户");
            })
            .catch(() => {
              this.$message.warning("没有搜到此用户哟");
            });
        } else if (this.nowPageId === 3) {
          this.$store
            .dispatch("SearchComment", { keywords: Value, page: 0, wuguan: 0 })
            .then(res => {
              this.$message.success("共搜索到" + res + "条评论");
            })
            .catch(() => {
              this.$message.warning("没有搜到于此相关的评论哟");
            });
        }
      } else {
        this.$message.warning("请输入关键字");
      }
    }
  },
  components: {
    Book,
    User,
    Comment
  },
  // 组件内守卫
  beforeRouteLeave(to, from, next) {
    console.log('to',to);
    console.log('from',to)
    // 路由离开的时候清楚一下数据
    // 设置白名单
    const whiteList = ['/main/bookreview', '/main/bookdetail'];
  if (whiteList.indexOf(to.path) === -1){
     this.$store.dispatch("SearchDouBan").then(() => {
      next();
    });
  } else {
    next();
  }
   
  }
};
</script>
<style scoped>

#components-layout-demo-basic .ant-layout-header {
  background: #ffffff;
  color: #fff;
  text-align: center;
}

#components-layout-demo-basic .ant-layout-content {
  color: #fff;
  text-align: center;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

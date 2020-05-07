<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="1">
            <a-button shape="circle" icon="arrow-left" @click="routeBack"></a-button>
          </a-col>
          <a-col :span="4" :offset="2">书评详情</a-col>
          <a-col :span="1" :offset="15">
            <a-button shape="circle" icon="link"></a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <a-card
          hoverable
          @click="bookDetail"
          class="bookCard"
        >
          <a-card-meta :title="newData.bookTitle" :description="newData.bookAuthor">
            <a-avatar
              slot="avatar"
              shape="square"
              :src="newData.coverUrl"
              style="height:80px;width:50px"
            />
          </a-card-meta>
        </a-card>
        <a-comment :author="newData.author" style=" padding:10px">
          <!-- 如果没头像显示不出来 加载默认-->
          <div slot="avatar">
            <img v-if="newData.authorInfo.headimg" :src="newData.authorInfo.headimg" alt>
            <a-avatar v-else size="large" icon="user"/>
          </div>
          <h3>{{newData.title}}</h3>
          <!-- <p align="left">content</p> -->
          <div v-html="newData.content"></div>
          <p align="right">作者:{{newData.author}}</p>
          <p align="right">{{newData.pubDate}}</p>
          <span slot="datetime">{{newData.pubDate}}</span>
        </a-comment>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { Comment } from "@/api";
const com_methods = new Comment();
export default {
  created() {
    const id = this.$route.query.id;
    com_methods.get_detail(id).then(res => {
      console.log(res);
      res.content.coverUrl =
        "https://images.weserv.nl/?url=" + res.content.coverUrl;
      this.newData = res.content;
    });
  },
  data() {
    return {
      newData: {
        authorInfo: { headimg: null }
      }
    };
  },
  methods: {
    bookDetail() {
      this.$router.push({
        path: "/main/bookdetail",
        query: { doubanId: this.newData.doubanId }
      });
    },
    routeBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
.bookCard {
  width: 500px;
  background: #dddbdb;
  border: 1px solid #d3d3d3;
}
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: gray;
  min-height: 120px;
  height: 100%;
  
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

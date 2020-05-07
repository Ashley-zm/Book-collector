<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="5">广场</a-col>
        <a-col :span="1" :offset="18">
          <a-button shape="circle" icon="edit" @click="toSelectBook"></a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-list class="comment-list" itemLayout="horizontal" :dataSource="allComData">
          <a-list-item slot="renderItem" slot-scope="item" @click="ReviewDetail(item)">
            <a-comment :author="item.author" style="padding:10px">
              <!-- 如果没头像显示不出来 加载默认-->
              <div slot="avatar">
                <img v-if="item.authorInfo.headimg" :src="item.authorInfo.headimg" alt>
                <a-avatar v-else size="large" icon="user"/>
              </div>
              <h3>{{item.title}}</h3>
              <div style="white-space: pre-line;" align="left" id="p2">{{item.preview}}</div>
              <a-card
                hoverable
                @click.stop="bookDetail(item)"
                style="width: 250px;background: #dddbdb;border: 1px solid #d3d3d3;"
              >
                <a-card-meta :title="item.bookTitle" :description="item.bookAuthor">
                  <a-avatar
                    slot="avatar"
                    shape="square"
                    :src="`https://images.weserv.nl/?url=${item.coverUrl}`"
                    style="height:80px;width:50px"
                  />
                </a-card-meta>
              </a-card>
              <a-tooltip
                slot="datetime"
                :title="moment(item.pubDate).format('YYYY-MM-DD HH:mm:ss')"
              >
                <span>{{moment(item.pubDate).fromNow()}}</span>
              </a-tooltip>
            </a-comment>
          </a-list-item>
          <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin/>
          </div>
        </a-list>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      moment,
      loading: false,
      busy: false,
      count: 0
    };
  },
  methods: {
    toSelectBook() {
      this.$router.push("/main/selectOneBook");
    },
    bookDetail(e) {
      this.$router.push({
        path: "/main/bookdetail",
        query: { doubanId: e.doubanId }
      });
    },
    ReviewDetail(e) {
      console.log(e);
      this.$router.push({ path: "/main/bookreview", query: { id: e.id } });
    },
    handleInfiniteOnLoad() {
      this.loading = true;
      this.busy = true;
      this.$store
        .dispatch("GetAllComment", {
          page: this.count++
        })
        .then(() => {
          this.loading = false;
          this.busy = false;
          return;
        })
        .catch(() => {
          this.busy = true;
          this.loading = false;
          return;
        });
    }
  },
  computed: {
    allComData() {
      return this.$store.getters.all_comment;
    }
  },
  // 组件内守卫
  beforeRouteLeave(to, from, next) {
    // 离开此页面时清空数据
    this.$store.dispatch("GetAllComment", null);
    next();
  }
};
</script>
<style scoped>
.demo-loading-container {
  position: absolute;
  bottom: -10px;
  width: 100%;
  text-align: center;
}

#p2 {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  width: 80%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
  z-index: 100;
  position: fixed;
}

.ant-layout-content {
  margin-top: 60px;
  background: #ffffff;
  color: #fff;
  min-height: 120px;
  height: 100%;
}

.ant-layout {
  margin-bottom: 48px;
}

.ant-layout:last-child {
  margin: 0;
}
</style>

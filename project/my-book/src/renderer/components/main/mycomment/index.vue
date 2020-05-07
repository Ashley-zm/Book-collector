<template>
  <div id="components-layout-demo-basic">
    <a-layout-header>
      <a-row>
        <a-col :span="5">我的书评</a-col>
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
            <!-- 删除评论按钮 -->
            <div slot="actions" style="margin-top:-200px;">
              <a-button shape="circle" icon="delete" size="small" @click.stop="deleteComment(item)"></a-button>
            </div>
            <a-comment :author="item.author">
              <!-- 如果没头像显示不出来 加载默认-->
              <div slot="avatar">
                <img v-if="item.authorInfo.headimg" :src="item.authorInfo.headimg" alt>
                <a-avatar v-else size="large" icon="user"/>
              </div>
              <a-tooltip
                slot="datetime"
                :title="moment(item.pubDate).format('YYYY-MM-DD HH:mm:ss')"
              >
                <span>{{moment(item.pubDate).fromNow()}}</span>
              </a-tooltip>

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
            </a-comment>
          </a-list-item>
          <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin/>
          </div>
        </a-list>
      </div>
    </a-layout-content>
  </div>
</template>
<script>
import moment from "moment";
import { Comment } from "@/api";
const com_methods = new Comment();
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
    handleInfiniteOnLoad() {
        this.loading = true;
        this.busy = true;
        this.$store
          .dispatch("GetAllComment", {
            page: this.count++,
            is_self: true // 获取自己的评论
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
    test() {
      console.log("my comment test");
    },
    deleteComment(e) {
      const _ = this;
      this.$confirm({
        title: "确定要删除该书评论吗?",
        content: "删除后不可恢复",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          com_methods.delete_comment(e.id).then(() => {
            _.$message.success("删除成功!");
            // 先清空vuex 在获取数据
            _.$store.dispatch("GetAllComment", null);
            _.$store.dispatch("GetAllComment", {
              page: 0,
              is_self: true
            });
            /**
             * 默认获取第0页
             * 所以count 要从1开始
             */
            _.count = 1;
          });
        }
      });
    }
  },
  computed: {
    allComData() {
      return this.$store.getters.all_comment;
    }
  },
  created() {
    this.count = 0;
  },
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
  bottom: 10px;
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
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
  z-index: 100;
  width: 100%;
  position: fixed;
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
  min-height: 120px;
  line-height: 120px;
  height: 100%;
  margin-top: 60px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

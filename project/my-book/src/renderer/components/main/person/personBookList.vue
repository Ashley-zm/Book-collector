<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="1">
            <a-button shape="circle" icon="arrow-left" @click="routeBack"></a-button>
          </a-col>
          <a-col :span="4" :offset="1">{{pageTitle[isWhatPage]}}</a-col>
          <a-col :span="3">
            <span style="font-size:15px">{{bookTotal?`共`+bookTotal+`本`:``}}</span>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <div
          v-infinite-scroll="handleInfiniteOnLoad"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
          <a-list itemLayout="horizontal" :dataSource="newData">
            <a-list-item slot="renderItem" slot-scope="item" @click="toManOrDe(item)">
              <a-tag v-if="isWhatPage === 2" color="#f50" slot="actions" @click.stop="Delete(item)">删除</a-tag>
              <a-card hoverable style="width: 500px">
                <div class="t">
                  <img
                    v-if="item.originalBookInfo.coverUrl"
                    :src="`https://images.weserv.nl/?url=${item.originalBookInfo.coverUrl}`"
                    slot="cover"
                    style="width:100px;height:125px;box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);"
                  >
                  <img
                    v-else
                    src="@/assets/bookimage.png"
                    slot="cover"
                    style="width:100px;height:125px"
                  >
                </div>
                <div class="t" style="width:250px">
                  <h2>
                    {{item.originalBookInfo.title}}
                    <h4
                      v-if="item.originalBookInfo.isCustom"
                      style="float:right;font-size:12px;margin-right:0px"
                    >自定义图书</h4>
                  </h2>
                  <p>作者:{{item.originalBookInfo.author}}</p>
                  <p
                    v-if="item.originalBookInfo.averageRating"
                  >评分:{{item.originalBookInfo.averageRating}}</p>
                  <p v-else>评分:0.0</p>
                  <p>添加日期:{{item.userExtraInfo.collectDate}}</p>
                </div>
              </a-card>
            </a-list-item>
            <div v-if="loading && !busy" class="demo-loading-container">
              <a-spin/>
            </div>
          </a-list>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { Book } from "@/api";

const book_methods = new Book();
export default {
  data() {
    return {
      bookTotal: null, //图书总数
      loading: false,
      busy: false,
      count: 0, // 默认显示0页面 所以从1开始
      newData: [],
      isWhatPage: parseInt(this.$route.query.isWhat), // 当前是什么页面
      pageTitle: ["全部收藏", "已读", "想读"]
    };
  },
  methods: {
    // 取消想读
    async Delete(e) {
      try {
        await book_methods.del_want_read(e.originalBookInfo.bookId);
        this.count = 1;
        const data = await book_methods.get_want_read({
          page: 0
        });
        this.newData = data.content.userBookVos;
        // 修改store
        this.$store.commit('SET_WANT_READ_COUNT', data.content.bookCount);
        return;
      } catch (e) {
        console.log(e);
      }
    },
    toManOrDe(e) {
      if (this.isWhatPage !== 2) {
        this.$router.push({
          path: `/main/bookmanage?id=${this.isWhatPage}`,
          query: e
        });
      } else {
        this.$router.push({
          path: "/main/bookdetail",
          query: {
            doubanId: e.originalBookInfo.doubanId,
            alldata: this.isWhatPage
          }
        });
      }
    },
    handleInfiniteOnLoad() {
      this.loading = true;
      this.busy = true;
      // 获取全部收藏
      if (this.isWhatPage === 0) {
        book_methods
          .get_all_books_self({
            page: this.count
          })
          .then(res => {
            this.count++;
            this.bookTotal = res.content.bookCount;
            this.newData.push(...res.content.userBookVos);
            this.loading = false;
            this.busy = false;
          })
          .catch(() => {
            this.busy = true;
            this.loading = false;
          });
        // 获取已读
      } else if (this.isWhatPage === 1) {
        book_methods
          .get_finished_read({
            page: this.count
          })
          .then(res => {
            this.count++;
            this.bookTotal = res.content.bookCount;
            this.newData.push(...res.content.userBookVos);
            this.loading = false;
            this.busy = false;
          })
          .catch(() => {
            this.busy = true;
            this.loading = false;
          });
        // 获取想读
      } else if (this.isWhatPage === 2) {
        book_methods
          .get_want_read({
            page: this.count
          })
          .then(res => {
            this.count++;
            this.bookTotal = res.content.bookCount;
            this.newData.push(...res.content.userBookVos);
            this.loading = false;
            this.busy = false;
          })
          .catch(() => {
            this.busy = true;
            this.loading = false;
          });
        // 获取想读
      }
    },
    routeBack() {
      this.$router.back(-1);
    },
  }
};
</script>
<style scoped>
.t {
  margin-left: 50px;
  float: left;
}

p {
  font-size: 13px;
  margin-top: -10px;
}

#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}

#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
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

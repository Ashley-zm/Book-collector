<template>
    <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
          <a-row>
              <a-col :span="1">
                  <a-button shape="circle" icon='arrow-left' @click="routeBack"></a-button>
              </a-col>
              <a-col :span='14' :offset='2'>选择一本撰写书评</a-col>
          </a-row>
      </a-layout-header>
      <a-layout-content>
           <div
                v-infinite-scroll="handleInfiniteOnLoad"
                :infinite-scroll-disabled="busy"
                :infinite-scroll-distance="10"
            >
                <a-list itemLayout="horizontal" :dataSource="newData">
                <a-list-item slot="renderItem" slot-scope="item" @click="writeComm(item)">
                    <a-card hoverable style="width: 600px">
                        <div class="t">
                        <img
                            :src="`https://images.weserv.nl/?url=${item.originalBookInfo.coverUrl}`"
                            slot="cover"
                            style="width:100px;height:125px;box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);"
                        >
                        </div>
                        <div class="t">
                        <h2>{{item.originalBookInfo.title}}</h2>
                        <p>作者:{{item.originalBookInfo.author}}</p>
                        <p v-if="item.originalBookInfo.averageRating">评分:{{item.originalBookInfo.averageRating}}</p>
                        <p v-else>评分:0.0</p>
                        <p>添加日期:{{item.userExtraInfo.collectDate}}</p>
                        </div>
                    </a-card>
                </a-list-item>
                <div v-if="loading && !busy" class="demo-loading-container">
                    <a-spin/>
                </div>
<<<<<<< HEAD
                </a-list>
=======
                <div class="t" style="width:300px">
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
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
            </div>
      </a-layout-content>
    </a-layout>
    </div>
</template>
<script>
<<<<<<< HEAD
=======
import { Book } from "@/api";

const book_methods = new Book();
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
export default {
  data() {
    return {
      loading: false,
      busy: false,
      count: 0 // 默认显示0页面 所以从1开始
    };
  },
<<<<<<< HEAD
  methods:{
      writeComm(e) {
          this.$router.push({path:"/main/writebookcom",query:e});
      },
      handleInfiniteOnLoad(){
          this.loading = true;
=======
  methods: {
    writeComm(e) {
      // 是否为自定义图书
      if (!e.originalBookInfo.isCustom) {
        this.$router.push({ path: "/main/writebookcom", query: e });
      } else {
        this.$message.warning('自定义保存的图书暂不支持此操作');
      }
    },
    handleInfiniteOnLoad() {
      this.loading = true;
      this.busy = true;
      book_methods
        .get_all_books_self({
          page: this.count
        })
        .then(res => {
          this.count++;
          this.newData.push(...res.content.userBookVos);
          this.loading = false;
          this.busy = false;
        })
        .catch(() => {
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
          this.busy = true;
          this.$store.dispatch('GetSelfAllBooks', {page:this.count++}).then(() => {
            this.loading = false;
            this.busy = false;
            return;
          }).catch(() => {
            this.busy = true;
            this.loading = false;
            return;
          });

      },
      routeBack(){
          this.$router.back(-1);
      }
  },
  computed:{
      newData(){
          return this.$store.getters.self_all_books;
      }
  },
  beforeRouteLeave(to, from, next) {
      this.$store.dispatch('GetSelfAllBooks');
      next();
  }
}
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
  background:#FFFFFF;
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

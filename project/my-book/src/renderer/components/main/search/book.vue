<template>
  <div v-if="isHack === 1">
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list itemLayout="horizontal" :dataSource="data" :locale="{emptyText: '暂无数据'}">
      <a-list-item slot="renderItem" slot-scope="item" @click="bookDetail(item.id)">
        <OneCard :bookInfo="item" ></OneCard>
      </a-list-item>
      <div v-if="loading" class="demo-loading-container">
        <a-spin/>
      </div>
    </a-list>
  </div>
  </div>
</template>
<script>
import OneCard from "./onecard";
import axios from "axios";
export default {
  data() {
    return {
      bookID:null,
      loading: false,
      busy: false,
      count: 1 // 默认显示0页面 所以从1开始
    };
  },
  methods: {
    bookDetail(e) {
      console.log(e)
      this.$router.push({path:"/main/bookdetail",query:{doubanId:e}});
    },
    handleInfiniteOnLoad() {
      if (this.bookKey) {
        this.busy = true;
        this.loading = true;
        // 请求数据
        axios
          .get("https://api.douban.com/v2/book/search?count=20&apikey=0b2bdeda43b5688921839c8ecb20399b", {
            params: { q: this.bookKey, start: this.count++ }
          })
          .then(res => {
            res.data.books.forEach(value => {
              this.$store.state.book.search_douban.books.push(value);
            });
            this.busy = false;
            this.loading = false;
            return;
          })
          .catch(error => {
            console.log(error);
            this.busy = true;
            this.loading = false;
            this.$message.error("没有数据啦");
            return;
          });
      }
    }
  },
  computed: {
    data() {
      return this.$store.getters.search_douban.books;
    }
  },
  components: {
    OneCard
  },
  props: {
    bookKey: String,
    isHack:Number
  }
};
</script>
<style scoped>
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>

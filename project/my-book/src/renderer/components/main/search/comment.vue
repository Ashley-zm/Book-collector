<template>
  <div v-if="isHack === 3">
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list class="comment-list" itemLayout="horizontal" :locale="{emptyText: '暂无数据'}" :dataSource="searchComData" >
        <a-list-item slot="renderItem" slot-scope="item" @click="ReviewDetail(item)">
          <!-- 如果没头像显示不出来 -->
          <a-comment :author="item.author">
            <!-- 如果没头像显示不出来 加载默认-->
            <div slot="avatar">
              <img
                v-if="item.authorInfo.headimg"
                :src="`https://images.weserv.nl/?url=${item.authorInfo.headimg}`"
                alt
              >
              <a-avatar v-else size="large" icon="user"/>
            </div>
            <h3>{{item.title}}</h3>
            <div style="white-space: pre-line;" align="left" id="p2">{{item.preview}}</div>
            <a-card hoverable style="width: 250px" @click.stop="bookDetail(item)">
              <a-card-meta :title="item.bookTitle" :description="item.bookAuthor">
                <a-avatar
                  slot="avatar"
                  shape="square"
                  :src="`https://images.weserv.nl/?url=${item.coverUrl}`"
                />
              </a-card-meta>
            </a-card>
            <a-tooltip slot="datetime" :title="moment(item.pubDate).format('YYYY-MM-DD HH:mm:ss')">
              <span>{{moment(item.pubDate).fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-list-item>
        <div v-if="loading" class="demo-loading-container">
          <a-spin/>
        </div>
      </a-list>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      moment,
      loading: false,
      busy: false,
      count: 1
    };
  },
  methods: {
    ReviewDetail(e) {
      this.$router.push({ path: "/main/bookreview", query: { id: e.id } });
    },
    bookDetail(e) {
      this.$router.push({
        path: "/main/bookdetail",
        query: { doubanId: e.doubanId }
      });
    },
    handleInfiniteOnLoad() {
      if (this.bookKey) {
        this.loading = true;
        this.busy = true;
        this.$store
          .dispatch("SearchComment", {
            keywords: this.bookKey,
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
    }
  },
  computed: {
    searchComData() {
      return this.$store.getters.search_comment;
    }
  },
  props: {
    bookKey: String,
    isHack: Number
  }
};
</script>
<style scoped>
#p2 {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>


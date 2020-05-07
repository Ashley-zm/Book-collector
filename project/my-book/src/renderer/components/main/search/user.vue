<template>
<div v-if="isHack === 2">
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list itemLayout="horizontal" :dataSource="searchUserData" :locale="{emptyText: '暂无数据'}">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-row type="flex" justify="center">
          <a-col :span="4" :offset="7">
            <a-card hoverable style="width: 250px">
              <a-card-meta :title="item.userName">
                <a-avatar slot="avatar" v-if="item.headimg" :src="item.headimg"/>
                <a-avatar slot="avatar" v-else icon="user"/>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-list-item>
      <div v-if="loading" class="demo-loading-container">
        <a-spin/>
      </div>
    </a-list>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      busy: false,
      count: 1
    };
  },
  methods: {
    // 滚动加载
    handleInfiniteOnLoad() {
      if (this.bookKey) {
        this.busy = true;
        this.loading = true;
        this.$store
          .dispatch("SearchUser", {
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
    searchUserData() {
      return this.$store.getters.search_users;
    }
  },
  props:{
    bookKey: String,
    isHack:Number
  }
};
</script>
<style>
</style>

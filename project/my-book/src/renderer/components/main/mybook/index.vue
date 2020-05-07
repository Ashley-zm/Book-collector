<template>
  <div id="components-layout-demo-basic">
        <a-layout-header>
          <a-row>
              <a-col :span='9'>
                  <a-input
                  placeholder="搜索我的藏书"
                  v-model="searchBookName"
                  ref="bookInput"
                  size='small'
                  @pressEnter='searchBook'
                  >
                      <a-icon slot="prefix" type="search" />
                      <a-icon
                      slot="suffix"
                      type="close-circle"
                      v-if="searchBookName"
                      @click="emitEmpty"
                      />
                  </a-input>
              </a-col>
              <a-col :span='4' :offset='1'>
                <a-dropdown placement="bottomCenter">
                  <a href="#">
                    {{nowClassName}} <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay" @click="clickClass" >
                    <a-menu-item v-for="data in bookGroupInfo" :key="data.categoryId" :tt='data.name'>{{data.name}}</a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content>
        <div
    <a-layout-header>
      <a-row>
        <a-col :span="9">
          <a-input
            placeholder="搜索我的藏书"
            v-model="searchBookName"
            ref="bookInput"
            size="small"
            @pressEnter="searchBook"
          >
            <a-icon slot="prefix" type="search"/>
            <a-icon slot="suffix" type="close-circle" v-if="searchBookName" @click="emitEmpty"/>
          </a-input>
        </a-col>
        <a-col :span="4" :offset="1">
          <a-dropdown placement="bottomCenter">
            <a href="#" style="font-weight:500;color:rgba(33,33,33,1);line-height:10px;">
              {{nowClassName}}
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay" @click="clickClass">
              <a-menu-item v-for="data in bookGroupInfo" :key="data.categoryId">{{data.name}}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
        <a-col :span="1" :offset="9">
          <a-dropdown :trigger="['click']">
            <a-menu slot="overlay" @click="rightHandleClick">
              <a-menu-item key="2">
                <a-icon type="search"/>搜索
              </a-menu-item>
              <a-menu-item key="1">
                <a-icon type="form"/>自定义添加
              </a-menu-item>
            </a-menu>
            <a-button icon="plus"></a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="1"
      >
        <a-list
          :grid="{ gutter: 10, column: 4 }"
          :locale="{emptyText: '空空如也'}"
          :dataSource="bookInGroupData"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-tooltip placement="topLeft" :title="item.originalBookInfo.title">
              <a-card @click="bookManage(item)" style="width: 103px;height:128px;margin-left:24px">
                <img
                  v-if="item.originalBookInfo.coverUrl"
                  :src="`https://images.weserv.nl/?url=${item.originalBookInfo.coverUrl}`"
                  slot="cover"
                  style="width:100px;height:125px"
                >
              </a-card>
<<<<<<< HEAD
              </a-tooltip>
              <div class="bookself" v-show="true"></div>
            </a-list-item>
            <div v-if="loading && !busy" class="demo-loading-container">
              <a-spin />
            </div>
          </a-list>
=======
            </a-tooltip>
            <div class="bookself" v-show="true"></div>
          </a-list-item>
          <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin/>
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
          </div>
          <div v-if="isShow">......无更多图书......</div>
        </a-list>
      </div>
    </a-layout-content>
  </div>
</template>
<script>
// import Login from './login/login'
import { Book } from "@/api";
import infiniteScroll from "vue-infinite-scroll";

const book_methods = new Book();
export default {
  created() {
    book_methods
      .get_all_books_self({
        size: 12,
        page: 0
      })
      .then(res => {
        this.tempData = res.content.userBookVos;
      });
  },
  directives: { infiniteScroll },
  data() {
    return {
<<<<<<< HEAD
=======
      localimg: require("@/assets/bookimage.png"),
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
      rightVisible: false,
      searchBookName: "", // 搜索框内容
      nowPageClassId: null, // 当前页面的类id
      nowClassName: "默认分类",
      loading: false,
      busy: false,
      count: 1, // 默认加载0页面  所以从1开始
      isSearch: false,
<<<<<<< HEAD
      isShow: false
=======
      isShow: false,
      tempData: []
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
    };
  },
  methods: {
    //
    rightHandleClick(e) {
      if (e.key === "2") {
        this.$router.push({path:'/main/search'});
      } else {
        this.$router.push({path:'/main/userdefinedbook'});
      }
    },
    bookManage(e) {
      console.log("sassss", e);
      this.$router.push({ path: "/main/bookmanage", query: e });
    },
    // 此处存这一个bug 暂时无法解决
    /** bug 现象
     *
     * 第一次用滚轮的时候 没有效果，需要切换一下路由才可以 继续使用
     *
     *  */
    handleInfiniteOnLoad() {
      this.loading = true;
<<<<<<< HEAD
<<<<<<< HEAD
      book_methods.category_contain({category_id:this.nowPageClassId,size:12,page:this.count}).then((response) => {
        this.count += 1;
        response.content.userBookVos.forEach(value => {
          this.$store.state.book.books_in_group.userBookVos.push(value);
        })
        this.loading = false;
      }).catch(() => {
        this.busy = true;
        this.loading = false;
        return;
      })

=======
      // 直接调用 api 接口
      if (!this.isShow) {
=======
      // 直接调用 api 接口  单独获取
      // 获取全部图书
      if (!this.nowPageClassId) {
        book_methods
          .get_all_books_self({
            size: 12,
            page: this.count
          })
          .then(res => {
            this.count++;
            this.tempData.push(...res.content.userBookVos);
            this.loading = false;
          })
          .catch(() => {
            this.busy = true;
            this.loading = false;
            this.count===1 ?this.isShow = false:this.isShow=true;
          });
      } else {
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
        book_methods
          .category_contain({
            category_id: this.nowPageClassId,
            size: 12,
            page: this.count
          })
          .then(response => {
            this.count += 1;
<<<<<<< HEAD
            this.$store.state.book.books_in_group.userBookVos.push(
              ...response.content.userBookVos
            );
=======
            this.tempData.push(...response.content.userBookVos);
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
            this.loading = false;
          })
          .catch(() => {
            this.busy = true;
            this.loading = false;
            this.isShow = true;
            return;
          });
      }
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
    },
    searchBook() {
      if (!this.searchBookName) {
        this.$message.warning("请输入关键字后搜索");
      } else {
        this.isSearch = true;
      }
      console.log(this.searchBookName);
    },
    emitEmpty() {
      this.$refs.bookInput.focus(); // 再次获取焦点
      this.searchBookName = "";
    },
    clickClass(key) {
      this.isShow = false;
      this.count = 1; // 换类重置计数
      this.nowPageClassId = key.key; // 记录当前位置
<<<<<<< HEAD
      const books_group_all = this.$store.getters.books_moren;
      // 更改当前页的名称
      books_group_all.forEach(value => {
        if (value.categoryId === key.key) {
          this.nowClassName = value.name;
        }
      });
      /**
       * 重新获取数据
       * 默认取出 12条  一页
       */
<<<<<<< HEAD
      this.$store.dispatch('GetBooksInGroup',{category_id:key.key,size:12,page:0})

=======

      this.$store.dispatch("GetBooksInGroup", {
        category_id: key.key,
        size: 12,
        page: 0
      });
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
=======
      // 不是全部收藏
      if (key.key) {
        const books_group_all = this.$store.getters.books_group_all;
        // 更改当前页的名称
        books_group_all.forEach(value => {
          if (value.categoryId === key.key) {
            this.nowClassName = value.name;
          }
        });
        /**
         * 重新获取数据
         * 默认取出 12条  一页
         */
        book_methods
          .category_contain({
            category_id: this.nowPageClassId,
            size: 12,
            page: 0
          })
          .then(response => {
            this.tempData = response.content.userBookVos;
          }).catch(() => {
            this.tempData = [];
          });
      } else {
        this.nowClassName = "全部收藏";
        book_methods
          .get_all_books_self({
            size: 12,
            page: 0
          })
          .then(res => {
            this.tempData = res.content.userBookVos;
          });
      }
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
    }
  },
  computed: {
    // 处理进入的数据
    bookInGroupData() {
      if (this.$store.state.book.books_in_group) {
        var data = this.$store.state.book.books_in_group.userBookVos;
        return data;
      } else {
        return;
      }
    },
    bookGroupInfo() {
      return this.$store.getters.books_moren;
    }
  }
<<<<<<< HEAD

}
=======
};
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
</script>

<style scoped>
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.bookself {
  float: left;
  margin-top: 4px;
  margin-left: 10px;
  margin-bottom: 5px;
  width: 130px;
  height: 15px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14);
}

#components-layout-demo-basic {
  background: #ffffff;
  color: #fff;
  padding-top: 1px;
  height: 100%;
}

#components-layout-demo-basic .ant-layout-header {
  height: 73px;
  background: #ffffff;
  color: #fff;
<<<<<<< HEAD

=======
>>>>>>> 7dad1d6808fdb76bf86e4783cbcf6fca80d1d93f
}

#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
  min-height: 496px;
  text-align: center;
}

#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}

#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

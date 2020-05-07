<template>
<div>
<div :style="` background-image:url(`+`https://images.weserv.nl/?url=${bookDetailInfo.image}`+`);background-size:100%;height:100%;`" class="bg">
 </div>
  <a-layout class="content">
    <a-layout-header>
      <a-row>
        <a-col :span="1">
          <a-button icon="arrow-left" @click="routeBack" class="deleteBorder" size='large'></a-button>
        </a-col>
        <a-col :span="4" :offset="1">书籍详情</a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <a-card hoverable style="background: rgba(255,255,255,0);">
        <a-row>
          <a-col>
            <div class="t">
              <img
                :src="`https://images.weserv.nl/?url=${bookDetailInfo.image}`"
                slot="cover"
                style="width:95px;height:115px;box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);"
              >
            </div>
          </a-col>
          <a-col :span="10" :offset="1">
            <table>
              <tbody>
                <tr>
                  <h3>{{bookDetailInfo.title}}</h3>
                </tr>
                <tr>
                  <p align="left">作者:{{bookDetailInfo.author.join(' ')}}</p>
                </tr>
                <tr v-if="bookDetailInfo.translator.length">
                  <p align="left">译者:{{bookDetailInfo.translator.join(' ')}}</p>
                </tr>
                <tr>
                  <p align="left">评分:
                    <a-rate v-model="pingfen" disabled/>
                    <span class="ant-rate-text">{{bookDetailInfo.rating.average}}分</span>
                  </p>
                </tr>
                <tr>
                  <p align="left">出版社:{{bookDetailInfo.publisher ? bookDetailInfo.publisher:`暂无`}}</p>
                </tr>
              </tbody>
            </table>
          </a-col>
        </a-row>
      </a-card>
      <a-tabs defaultActiveKey="1" style="text-align:center">
        <a-tab-pane tab="基本信息" key="1">
          <table style="width:600px;margin-left:20px">
            <tbody>
              <tr>
                <h4>出版日期: {{bookDetailInfo.pubdate ? bookDetailInfo.pubdate : `暂无`}}</h4>
              </tr>
              <tr>
                <h4>价格: {{bookDetailInfo.price ? bookDetailInfo.price : `暂无`}}</h4>
              </tr>
              <tr>
                <h4>isbn: {{bookDetailInfo.isbn13 ? bookDetailInfo.isbn13 : `暂无`}}</h4>
              </tr>
              <tr>
                <h4>标签:
                  <a-tag v-for="(item,index) in bookDetailInfo.tags" :key="index">{{item.name}}</a-tag>
                </h4>
              </tr>
            </tbody>
          </table>
          <a-row>
            <a-col :span="5" :offset="4">
              <a-button
                :icon="isAddCang.icon"
                :disabled="isAddCang.disabled"
                @click="addBookShou"
              >{{isAddCang.title}}</a-button>
            </a-col>
            <a-col :span="5" :offset="4">
              <a-button
                :icon="isWantRead.icon"
                :disabled="isWantRead.disabled"
                @click="addWantRead"
              >{{isWantRead.title}}</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="15" :offset="3">
              <a-button @click="toDouban" block>前往豆瓣
                <a-icon type="right"/>
              </a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="内容简介" key="2" forceRender>
          <div style="white-space: pre-line; text-align:left">{{bookDetailInfo.summary}}</div>
        </a-tab-pane>
        <a-tab-pane tab="作者简介" key="3">
          <div
            style="white-space: pre-line; text-align:left;"
          >{{bookDetailInfo.author_intro ? bookDetailInfo.author_intro:`暂无内容`}}</div>
        </a-tab-pane>
        <a-tab-pane tab="章节目录" key="4">
          <div
            style="white-space: pre-line; text-align:left;"
          >{{bookDetailInfo.catalog ? bookDetailInfo.catalog:`暂无内容`}}</div>
        </a-tab-pane>
      </a-tabs>
      <a-modal title="选择分类" v-model="visible" cancelText="取消" :width="300" @ok="modalHandleOk">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio style="display: block;height: 30px;lineHeight: 30px;" :value="null">默认分类</a-radio>
          <a-radio
            style="display: block;height: 30px;lineHeight: 30px;"
            v-for="(item,index) in groupList"
            :key="index"
            :value="item.categoryId"
          >{{item.name}}</a-radio>
        </a-radio-group>
      </a-modal>
    </a-layout-content>
  </a-layout>

</div>
</template>
<script>
import axios from "axios";
import { Book } from "@/api";
const book_method = new Book();
import openWindow from "@/util/openWindow";
import { resolve } from "url";
export default {
  created() {
    const doubanData = async () => {
      try {
        const getDou = axios.get(
          `https://api.douban.com/v2/book/${this.$route.query.doubanId}`
        );
        const getGroup = this.$store.dispatch("GetUserBooksGroup");
        // 并发操作
        const res = await Promise.all([getDou, getGroup]);
        const isIn = await book_method.add_book(res[0].data,false);
        return { resDou: res[0].data, isIn: isIn.content };
      } catch (e) {
        console.log("creted", e);
      }
    };
    doubanData().then(res => {
      this.bookDetailInfo = res.resDou;
      this.bookId = res.isIn.originalBookInfo.bookId;
      this.pingfen = parseInt(res.resDou.rating.average) / 2;
      // 不为空
      if (res.isIn.userExtraInfo !== null) {
        // 如果已收藏 想读按钮禁止
        if (res.isIn.userExtraInfo.joinBookshelf) {
          this.isAddCang.title = "已收藏";
          this.isAddCang.icon = "check";
          this.isAddCang.disabled = true;
          this.isWantRead.disabled = true;
          // 在没有加入收藏的条件下 判断是否想读
        } else {
          // 如果加入了收藏  想读按钮禁止
          this.isAddCang.title = "加入收藏";
          this.isAddCang.icon = "plus";
          this.isAddCang.disabled = false;
          if (res.isIn.userExtraInfo.wantRead) {
            this.isWantRead.title = "已想读";
            this.isWantRead.icon = "check";
            this.isWantRead.disabled = true;
          } else {
            this.isWantRead.title = "想读";
            this.isWantRead.icon = "book";
            this.isWantRead.disabled = false;
          }
        }
      }
    });
  },
  data() {
    return {
      value: null,
      visible: false,
      bookId: null, // 存放图书id
      categoryId: null, // 分类id
      isAddCang: {
        title: "加入收藏",
        icon: "plus",
        disabled: false
      },
      isWantRead: {
        title: "想读",
        icon: "book",
        disabled: false
      },
      pingfen: 0,
      bookDetailInfo: {
        //豆瓣数据
        title: null,
        author: [""],
        isbn13: null,
        price: null,
        pubdate: null,
        publisher: null,
        rating: { average: null },
        summary: null,
        tags: null,
        translator: [""],
        url: null,
        image: "",
        catalog: null
      }
    };
  },
  methods: {
    routeBack() {
      this.$router.back(-1);
    },
    // 将书添加到分类
    modalHandleOk() {
      book_method
        .set_class({ book_id: this.bookId, category_id: this.categoryId })
        .then(res => {
          console.log("添加分类", res);
          this.visible = false;
          this.$message.success("添加成功");
        });
    },
    // 分类选择
    onChange(e) {
      this.categoryId = e.target.value;
    },
    // 用来询问
    addBookShou() {
      // 如果为false 没有加入想读 否则加入了想读  就弹出提示框
      if (this.isWantRead.disabled) {
        const _ = this;
        this.$confirm({
          title: "提示",
          content:
            "当前图书已加入想读列表,添加到我的书藏将会取消想读,是否继续收藏?",
          okText: "收藏",
          cancelText: "取消",
          onOk() {
            _.visible = true;
            _.addBookToCang(true);
          }
        });
      } else {
        this.addBookToCang(false).then(() => {
          this.visible = true;
        });
      }
    },
    // 加入书库 收藏
    addBookToCang(e) {
      return new Promise(resolve => {
        book_method.add_book_to_ku(this.bookId, e).then(res => {
          console.log("加入书库", res);
          this.isAddCang.disabled = true;
          this.isWantRead.disabled = true;
          return resolve();
        });
      });
    },
    // 添加想读
    addWantRead() {
      book_method.add_want_read(this.bookId).then(() => {
        this.$message.success("添加成功!");
        this.isWantRead.disabled = true;
      });
    },
    toDouban() {
      openWindow(this.bookDetailInfo.alt, "豆瓣", 1200, 750);
    }
  },
  computed: {
    groupList() {
      return this.$store.getters.books_group_all;
    }
<<<<<<< HEAD
=======
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/main/bookmanage") {
      to.query.userExtraInfo = this.routedata.userExtraInfo;
      to.query.originalBookInfo = this.routedata.originalBookInfo;
    } else if (to.path === "/main/personbooklist") {
      to.query.isWhat = this.routedata;
    }
    next();
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
  }
};
</script>
<style scoped>
.bg{
  height: 90%;
  width: 90%;
  filter: blur(15px);
  background-repeat:no-repeat;
position:absolute;
background-size:cover;
}
.content{
  float: left;
  /* position:absolute; */
  background: rgba(255,255,255,0);
}
.deleteBorder{
  border:none;
}
h4 {
  text-align: left;
}
h3 {
  text-align: left;
}
.t {
  margin-left: 50px;

  float: left;
}
p {
  font-size: 13px;
  margin-top: -7px;
}
.ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255,255,255,0);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
  width: 100%;
}
.ant-layout-content {
  background: rgba(255,255,255,0);
  color: #fff;
  min-height: 120px;
  height: 100%;
}
.ant-layout {
  margin-bottom: 48px;
  background: rgba(255,255,255,0);
}
.ant-layout:last-child {
  margin: 0;
}
</style>

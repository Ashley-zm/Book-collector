<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="1">
          <a-button shape="circle" icon="arrow-left" @click="routeBack"></a-button>
        </a-col>
        <a-col :span="4" :offset="2">书籍管理</a-col>
        <a-col :span="1" :offset="15">
          <!-- 发布按钮 -->
          <a-popover
            placement="bottomRight"
            trigger="click"
            v-model="rightVisible"
            :overlayStyle="{width:'130px'}"
          >
            <a-button v-if="!originalBookInfo.isCustom" slot="content" icon="edit" type="dashed" @click="writeComment">撰写书评</a-button>
            <a-button slot="content" icon="tags" type="dashed" @click="changeClass">更改分类</a-button>
            <a-button slot="content" icon="delete" type="dashed" @click="deleteBook">删除书籍</a-button>
            <a-button icon="project"></a-button>
          </a-popover>
        </a-col>
      </a-row>
      <a-modal
        title="选择分类"
        v-model="changeClassVisible"
        cancelText="取消"
        :width="300"
        @ok="modalHandleOk"
      >
        <a-radio-group @change="onChange">
          <a-radio
            style="display: block;height: 30px;lineHeight: 30px;"
            v-for="(item,index) in groupList"
            :key="index"
            :value="item.categoryId"
          >{{item.name}}</a-radio>
        </a-radio-group>
      </a-modal>
      <a-modal
      title="图书详情"
      v-model="selfBookVisible"
      :width="300"
      :footer='null'
      >
      <p>书名:{{originalBookInfo.title}}</p>
      <p>作者:{{originalBookInfo.author}}</p>
      <p>isbn:{{originalBookInfo.isbn13}}</p>
      <p>出版社:{{originalBookInfo.publisher}}</p>
      <p>出版日期:{{originalBookInfo.pubdate}}</p>
      <p>页数:{{originalBookInfo.totalPages}}</p>
      <p>价格:{{originalBookInfo.price}}</p>
      </a-modal>
    </a-layout-header>
    <a-layout-content>
      <a-card hoverable @click="bookDetail">
        <a-row>
          <a-col>
            <div class="t">
              <img
                :src="`https://images.weserv.nl/?url=${originalBookInfo.coverUrl}`"
                slot="cover"
                style="width:95px;height:130px;box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);"
              >
            </div>
          </a-col>
          <a-col :span="10" :offset="1">
            <table>
              <tbody>
                <tr>
                  <h3>{{originalBookInfo.title}}</h3>
                </tr>
                <tr>
                  <p align="left">作者:{{originalBookInfo.author}}</p>
                </tr>
                <tr>
                  <p
                    align="left"
                  >出版社:{{originalBookInfo.publisher ? originalBookInfo.publisher : `暂无`}}</p>
                </tr>
                <tr>
                  <p align="left">收藏日期:{{userExtraInfo.collectDate}}</p>
                </tr>
                <tr>
                  <p align="left" style="color:blue;">分类:{{category ? category.name : '全部藏书'}}</p>
                </tr>
              </tbody>
            </table>
          </a-col>
        </a-row>
      </a-card>
      <div style="margin-top:10px">
        <a-card hoverable title="阅读进度" :headStyle="{height:'30px'}" :bodyStyle="{height:'60px'}">
          <a href="#" slot="extra" @click="handInput">
            手动输入
            <a-icon type="caret-right"/>
          </a>
          <a-row>
            <a-col :span="1">0</a-col>
            <a-col :span="21">
              <a-slider
                v-if="sliderValue"
                @afterChange="sliderChange"
                v-model="sliderValue"
                :max="originalBookInfo.totalPages"
              />
              <a-slider
                v-else
                @afterChange="sliderChange"
                :defaultValue="0"
                :tooltipVisible="true"
                :max="originalBookInfo.totalPages"
              />
            </a-col>
            <a-col :span="1" :offset="1">{{originalBookInfo.totalPages}}</a-col>
          </a-row>
        </a-card>
        <a-card hoverable title="阅读计划" :headStyle="{height:'30px',}" :bodyStyle="{height:'50px'}">
          <a-popover
            title="选择日期"
            trigger="click"
            v-model="calendarVisible"
            slot="extra"
            placement="leftTop"
          >
            <div
              slot="content"
              :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }"
            >
              <a-calendar :fullscreen="false" @select="onPanelChange"/>
            </div>
            <a href="#">
              设置
              <a-icon type="caret-right"/>
            </a>
          </a-popover>
          <p v-if="userExtraInfo.readingPlanEnd">
            <a-icon type="flag" theme="twoTone"/>
            计划在{{moment(userExtraInfo.readingPlanEnd).format('YYYY-MM-DD')}}前读完
          </p>
          <p v-else>暂无</p>
        </a-card>
        <a-card hoverable title="备注" :headStyle="{height:'30px',}">
          <a href="#" slot="extra" @click="edit">
            编辑
            <a-icon type="caret-right"/>
          </a>
          <div
            style="white-space: pre-line;"
          >{{userExtraInfo.remarks ? userExtraInfo.remarks : `暂无`}}</div>
        </a-card>
      </div>
    </a-layout-content>
    <a-modal :title="modal.title" v-model="modalVisible" @ok="handleOk" okText="确认" cancelText="取消">
      <a-input-number
        v-if="modal.type === 0"
        :min="0"
        :max="originalBookInfo.totalPages"
        v-model="readingProgressModal"
        style="width:471px"
      />
      <a-textarea
        v-if="modal.type === 1"
        v-model="textareaValue"
        placeholder="请输入备注内容"
        :rows="4"
        autosize
      />
    </a-modal>
  </a-layout>
</template>
<script>
import moment from "moment";
import { Book } from "@/api";

const book_method = new Book();
export default {
  created(){
    console.log(this.$route.query)
  },
  data() {
    return {
<<<<<<< HEAD
=======
      routeData:this.$route.query,
      localimg: require("@/assets/bookimage.png"),
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
      moment,
      selfBookVisible:false, // 自定义图书展示页是否显示
      categoryId: null, // 分类id
      category: this.$route.query.userExtraInfo.category,
      changeClassVisible: false, // 改变分类的modal
      rightVisible: false, // 右上角显示
      sliderValue: this.$route.query.userExtraInfo.readingProgress,
      readingProgressModal: 0, // modal里的值
      textareaValue: null, // modal备注
      modalVisible: false, // 对话框
      modal: {
        title: null,
        type: null // 0 为 阅读进度 1 备注
      },
      calendarVisible: false, // 日历是否显示
      userExtraInfo: this.$route.query.userExtraInfo, // 用户阅读信息
      originalBookInfo: this.$route.query.originalBookInfo // 图书信息
    };
  },
  methods: {
    // 图书详情
    bookDetail() {
      //  不为自定义图书
<<<<<<< HEAD
     if (!this.originalBookInfo.isCustom) {
       this.$router.push({
        path: "/main/bookdetail",
        query: { doubanId: this.originalBookInfo.doubanId }
      });
     } else {
       this.selfBookVisible = true;
     }
=======
      if (!this.originalBookInfo.isCustom) {
        // 进入详情页 将全部数据带过去 在路由back时在返回来
        this.$router.push({
          path: "/main/bookdetail",
          query: {
            doubanId: this.originalBookInfo.doubanId,
            alldata: this.$route.query
          }
        });
      } else {
        this.selfBookVisible = true;
      }
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
    },
    // 撰写书评
    writeComment() {
      this.$router.push({
        path: "/main/writebookcom",
        query: this.$route.query
      });
    },
    // 改变分类modal 单选框事件
    onChange(e) {
      this.categoryId = e.target.value;
    },
    // 改变分类modal 确认按钮
    modalHandleOk() {
      book_method
        .set_class({
          book_id: this.originalBookInfo.bookId,
          category_id: this.categoryId
        })
        .then(res => {
          console.log("添加分类", res);
          this.changeClassVisible = false;
          this.category = { name: res.content.userExtraInfo.category.name };
          this.$message.success("设置成功");
        });
    },
    // 改变分类
    changeClass() {
      console.log(this.groupList)
      if (this.groupList.length) {
        this.changeClassVisible = true;
      } else {
        this.$message.warning('暂无其他分类');
        this.rightVisible = false;
      }
      
    },
    // 删除书籍
    deleteBook() {
      const _ = this;
      this.$confirm({
        title: "确定要删除本书吗？",
        content: "本书相关数据将无法恢复",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        onOk() {
          book_method.delete_book(_.originalBookInfo.bookId).then(res => {
            _.$message.success("删除成功!");
            _.$router.push("/main");
          });
        }
      });
    },
    // 编辑备注
    edit() {
      this.modalVisible = true;
      this.modal.title = "备注";
      this.modal.type = 1;
      this.textareaValue = this.userExtraInfo.remarks;
    },
    // 手动输入阅读进度
    handInput() {
      this.modalVisible = true;
      this.modal.title = "设置阅读进度";
      this.modal.type = 0;
      this.readingProgressModal = this.userExtraInfo.readingProgress;
    },
    // modal确认
    handleOk() {
      // 0 为阅读进度 1 备注
      if (this.modal.type) {
        // 备注
        this.userExtraInfo.remarks = this.textareaValue;
      } else {
        this.userExtraInfo.readingProgress = this.readingProgressModal;
      }

      this.modalVisible = false;
    },
    // 滑块设置阅读进度
    sliderChange(e) {
      this.userExtraInfo.readingProgress = e;
    },
    // 设置阅读计划时间
    onPanelChange(value) {
      this.userExtraInfo.readingPlanEnd = this.moment(value._d).format(
        "YYYY-MM-DD 00:00:00"
      );
      this.calendarVisible = false;
    },
    routeBack() {
      this.$router.back(-1);
    }
  },
  watch: {
    // 监听userExtraInfo数据变化有变化就向后台发送数据更新
    userExtraInfo: {
      handler(val, oldVal) {
        book_method
          .put_read_info(this.originalBookInfo.bookId, val)
          .then(res => {
            this.$message.success("更新成功!");
          });
      },
      deep: true
    }
  },
  computed: {
    groupList() {
      return this.$store.getters.books_group_all;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/main/personbooklist") {
      to.query.isWhat = this.routeData.id;
    }
    next();
  }
};
</script>
<style scoped>
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
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}

.ant-layout-content {
  background: #ffffff;
  color: #fff;
  height: 100%;
}

.ant-layout {
  margin-bottom: 48px;
}

.ant-layout:last-child {
  margin: 0;
}
</style>

<template>
  <div id="components-layout-demo-basic">
    <a-layout-header>
      <a-row>
        <a-col :span="1">
          <a-button shape="circle" icon="arrow-left" @click="backRouter"></a-button>
        </a-col>
        <a-col :span="14" :offset="1">撰写书评</a-col>
        <a-col :span="1" :offset="7">
          <!-- 发布按钮 -->
          <a-button @click="publish" :loading="loading">发布</a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <a-input placeholder="请输入标题" v-model="inputvalue"></a-input>
      <div>
        <quill-editor
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          style="height:300px"
        ></quill-editor>
      </div>
      <a-row style="margin-top:70px;">
        <a-col :span="15">
          <a-card>
            <a-card-meta :title="select_book_data.title" :description="select_book_data.author">
              <a-avatar
                slot="avatar"
                shape="square"
                :src="`https://images.weserv.nl/?url=${select_book_data.coverUrl}`"
                style="height:65px;width:50px"
              />
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="5">私密书评
          <a-switch @change="changePrivate"/>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>
<script>
import Moment from "moment";
import { Comment } from "@/api";
const com_methods = new Comment();
export default {
  created() {
    this.select_book_data = this.$route.query.originalBookInfo;
  },
  data() {
    return {
      routedata: this.$route.query,
      loading: false, // 发布按钮加载动画
      select_book_data: null, // 存放传递过来的数据
      content: null, // 编辑框的内容
      inputvalue: null, // 标题
      isprivate: false,
      editorOption: {
        // 编辑框设置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"]
          ]
        }
      }
    };
  },
  methods: {
    // 回退
    backRouter() {
      this.$router.back(-1);
    },
    // 发布
    publish() {
      if (this.inputvalue && this.content) {
        this.loading = true;
        // 正则替换掉所有p标签 用\n替换
        var a = this.content.replace(/\<\/?p\>/gim, "\n");
        // 以\n分割为数组
        var b = a.split("\n");
        var c = [];
        // 遍历数组b 去掉所有标签
        b.forEach(val => {
          if (val !== "") {
            c.push(val.replace(/<\/?.+?\/?>/g, ""));
          }
        });
        // 拼接
        var d = c.slice(0, 6).join("\n");
        // 提交的数据
        var e = {
          bookId: this.select_book_data.bookId,
          bookRating: this.select_book_data.averageRating,
          content: this.content,
          preview: d,
          title: this.inputvalue,
          private: this.isprivate
        };
        com_methods.add_comment(e).then(res => {
          this.$message.success("添加成功了哟!");
          this.loading = false;
          this.$router.push("/main/square");
        });
      } else {
        this.$message.warning('请补全信息后发布');
      }
    },
    changePrivate() {
      this.isprivate = !this.isprivate;
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("to", to);
    if (to.path === "/main/bookmanage") {
      to.query.userExtraInfo = this.routedata.userExtraInfo;
      to.query.originalBookInfo = this.routedata.originalBookInfo;
    }
    console.log("from", from);
    next();
  }
};
</script>
<style scoped>
#components-layout-demo-basic {
  height: 100%;
}
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: gray;
  height: 510px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

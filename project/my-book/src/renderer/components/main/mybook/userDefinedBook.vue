<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="1">
            <a-button shape="circle" icon="arrow-left" @click="routeBack"></a-button>
          </a-col>
          <a-col :span="4" :offset="1">自定义图书</a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <!-- 上传封面的卡片 -->
        <a-card>
          <a-row type="flex" justify="center">
            <a-col :span="5">
              <a-upload
                listType="picture-card"
                :beforeUpload="beforeUpload"
                :fileList="fileList"
                class="avatar-uploader"
              >
                <img v-if="imgurl" :src="imgurl" style="height:155px;width:111px">
                <div v-else>
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">上传封面</div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
          <!-- 自定义图书数据 以表单形式提交 -->
          <a-form :form="form" @submit="handleSubmit">
            <a-row type="flex" justify="center">
              <a-col :span="15">
                <a-form-item>
                  <a-tooltip placement="left" title="书名">
                    <a-input
                      v-decorator="[
                    'title',
                    {rules: [{ required: true, message: '请填写书名' }]}
                  ]"
                      placeholder="请输入书名"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="15">
                <a-form-item>
                  <a-tooltip placement="left" title="作者">
                    <a-input
                      v-decorator="[
                    'author',
                    {rules: [{ required: true, message: '请填写作者' }]}
                  ]"
                      placeholder="请输入作者"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="15">
                <a-form-item>
                  <a-tooltip placement="left" title="出版社">
                    <a-input
                      v-decorator="[
                    'publisher',
                    {rules: [{ required: true, message: '请填写出版社' }]}
                  ]"
                      placeholder="请输入出版社"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="15">
                <a-form-item>
                  <a-tooltip placement="left" title="出版社">
                    <a-input
                      v-decorator="[
                    'isbn13',
                    {rules: [{ required: true, message: '请填写isbn吗' }]}
                  ]"
                      placeholder="请输入条形码下方的isbn码"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="15">
                <a-form-item>
                  <a-tooltip placement="left" title="出版日期">
                    <a-date-picker
                      v-decorator="[
                  'pubdate',
                  {rules: [{ required: true, message: '请填写出版日期' }]}
                  ]"
                      placeholder="请输入出版日期"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="7">
                <a-form-item>
                  <a-tooltip placement="left" title="页数">
                    <a-input
                      v-decorator="[
                    'pages',
                    {rules: [{ required: true, message: '请填写页数' }]}
                  ]"
                      placeholder="请输入页数"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
              <a-col :span="7" :offset="1">
                <a-form-item>
                  <a-tooltip placement="right" title="价格">
                    <a-input
                      v-decorator="[
                    'price',
                    {rules: [{ required: true, message: '请填写价格' }]}
                  ]"
                      placeholder="请输入价格"
                    />
                  </a-tooltip>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="15" :offset="10">
                <a-form-item>
                  <a-button type="primary" html-type="submit" :loading="isLoading">{{buttonTitle}}</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-row type="flex" justify="center"></a-row>
        </a-card>
      </a-layout-content>
    </a-layout>
    <!-- 图片剪裁modal -->
    <a-modal title="剪裁" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <a-layout style="height:305px">
        <a-layout-content style="width:500px">
          <div style="width:300px;height:300px">
            <vueCropper
              height="562px"
              ref="cropper"
              :autoCrop="true"
              :fixed="true"
              :fixedNumber="[7,10]"
              :canMoveBox="false"
              :img="imgurl"
            ></vueCropper>
          </div>
        </a-layout-content>
        <a-layout-sider style="background:white">
          <a-row type="flex" justify="center">
            <a-col>
              <a-button icon="plus" @click="changeScale(1)">放大</a-button>
            </a-col>
          </a-row>
          <br>
          <a-row type="flex" justify="center">
            <a-col>
              <a-button icon="minus" @click="changeScale(-1)">缩小</a-button>
            </a-col>
          </a-row>
          <br>
          <a-row type="flex" justify="center">
            <a-col>
              <a-button icon="undo" @click="rotateLeft">左旋转</a-button>
            </a-col>
          </a-row>
          <br>
          <a-row type="flex" justify="center">
            <a-col>
              <a-button icon="redo" @click="rotateRight">右旋转</a-button>
            </a-col>
          </a-row>
        </a-layout-sider>
      </a-layout>
    </a-modal>
  </div>
</template>
<script>
import { Book } from "@/api";
const imageConversion = require("image-conversion");
const book_methods = new Book();
export default {
  data() {
    return {
      visible: false, //是否显示图片剪裁的modal
      form: this.$form.createForm(this),
      //只有一个
      fileList: [],
      imgurl: "", // 图片地址
      formData: null, // 图片数据
      isLoading: false,
      buttonTitle: "提交"
    };
  },
  methods: {
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 图片放大缩小
    changeScale(e) {
      /**
       * @e 正：放大 负：缩小
       */
      this.$refs.cropper.changeScale(e);
    },
    handleCancel() {
      this.imgurl = "";
      this.visible = false;
    },
    // 提交数据
    async postData(values) {
      let resImage = null;
      // 是否存在封面
      try {
        if (this.formData) {
          const imgeU = await book_methods.upload_bookimg(this.formData);
          resImage = imgeU.content;
        }
        // 处理数据
        const newValue = {
          ...values,
          pubdate: values["pubdate"].format("YYYY-MM-DD"),
          image: resImage,
          author: [values["author"]]
        };
        // 添加图书信息
        const addinfo = await book_methods.add_book(newValue, true);
        // 加入书库
        const res = await book_methods.add_book_to_ku(
          addinfo.content.originalBookInfo.bookId,
          false
        );
      } catch (e) {
        console.log(e);
      }
      return;
    },
    // 数据提交
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true;
          this.buttonTitle = "数据提交中...";
          this.postData(values).then(() => {
            this.$message.success("添加成功!");
            this.$router.push({ path: "/main" });
          });
        }
      });
    },
    routeBack() {
      this.$router.back(-1);
    },
    // 剪裁modal确认按钮
    handleOk() {
      this.formData = new FormData();
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(data => {
        // 压缩 0.9
        imageConversion.compress(data, 0.9).then(res => {
          console.log("处理之后", res);
          this.formData.append("bookimg", res, this.imgurl);
          this.visible = false;
        });
      });
    },
    // upload图片之前拦截
    beforeUpload(e) {
      console.log(e);
      this.imgurl = e.path;
      this.visible = true;
      return false;
    }
  }
};
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 200px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

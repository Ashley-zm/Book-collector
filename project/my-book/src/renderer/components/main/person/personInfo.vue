<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="1">
            <a-button shape="circle" icon="arrow-left" @click="routeBack"></a-button>
          </a-col>
          <a-col :span="4" :offset="1">我的资料</a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <a-modal title="绑定手机" v-model="phoneModal" :width="400" :footer="null">
          <PhoneBind style="margin-top:0px" :WhatPage='1' @reciveBindRes='reciveBindRes'></PhoneBind>
        </a-modal>
        <a-modal :title="infoModalTitle" v-model="infoChangeVisible" :width="300" @ok="updateInfo" >
          <a-input v-if="!nowInfoModalPage" v-model="infoModalContent"></a-input>
          <a-radio-group v-else v-model="sexValue">
            <a-radio :value="0">保密</a-radio>
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-modal>
        <a-modal v-model="wechatVisible" :width="350" :footer="null">
                <iframe frameborder="0" src="https://book.jftio.cn/pc/login-qr.html" style="width: 308px;height: 400px"></iframe>
        </a-modal>
        <!-- 上传封面的卡片 -->
        <a-card>
          <a-row type="flex" justify="center">
            <a-col :span="5" :offset="1">
              <a-upload
                listType="picture-card"
                :beforeUpload="beforeUpload"
                :fileList="fileList"
                class="avatar-uploader"
              >
                <a-avatar
                  v-if="userinfo.headimg"
                  :size="80"
                  class="avatar"
                  :src="userinfo.headimg"
                />
                <a-avatar v-else :size="60" class="avatar" icon="user"></a-avatar>
                <div class="ant-upload-text">修改头像</div>
              </a-upload>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="13">
              <div class="list" @click="changeName">
                <a-col :span="3">
                  <h4>昵称</h4>
                </a-col>
                <a-col>
                  <p class="text">{{userinfo.userName}}</p>
                </a-col>
                <a-icon style="position:absolute;right:0;" type="caret-right"/>
              </div>
              <div class="list" @click="changeSex">
                <a-col :span="3">
                  <h4>性别</h4>
                </a-col>
                <a-col>
                  <p class="text">{{sex[userinfo.sex]}}</p>
                </a-col>
                <a-icon style="position:absolute;right:0;" type="caret-right"/>
              </div>
              <div class="list" @click="phoneBind" :class="{isBandClick:bindedPhone}">
                <a-col :span="3">
                  <h4>手机</h4>
                </a-col>
                <a-col>
                  <p class="text">{{bindedPhone ? bindedPhone:`点击绑定`}}</p>
                </a-col>
                <a-icon v-if='!bindedPhone' style="position:absolute;right:0;" type="caret-right"/>
              </div>
              <!-- bindedWechat 如果绑定了则为true 否则为false -->
              <div class="list" @click="wechatBind" :class="{isBandClick:bindedWechat}">
                <a-col :span="3">
                  <h4>微信</h4>
                </a-col>
                <a-col>
                  <p class="text">{{bindedWechat?`已绑定`:`点击绑定`}}</p>
                </a-col>
                <a-icon v-if="!bindedWechat" style="position:absolute;right:0;" type="caret-right"/>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-layout-content>
    </a-layout>
    <!-- 图片剪裁modal -->
    <a-modal title="剪裁" :visible="imgVisible" @ok="handleOk" @cancel="handleCancel">
      <a-layout style="height:305px">
        <a-layout-content style="width:500px">
          <div style="width:300px;height:300px">
            <vueCropper
              height="562px"
              ref="cropper"
              :autoCrop="true"
              :fixed="true"
              :fixedNumber="[1,1]"
              :canMoveBox="false"
              :fixedBox="true"
              :img="localimg"
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
import { User } from "@/api";
import PhoneBind from '@/components/login/register';
const imageConversion = require("image-conversion");
const user_methods = new User();
export default {
  components:{
    PhoneBind
  },
  data() {
    return {
      imgVisible: false, //是否显示图片剪裁的modal
      //只有一个
      fileList: [],
      localimg: "",
      formData: null, // 图片数据
      sex: ["保密", "男", "女"],
      postUserInfo: this.$store.getters.userinfo,
      infoChangeVisible: false, // 是否显示信息修改modal
      infoModalTitle: "",
      infoModalContent: this.$store.getters.userinfo.userName,
      nowInfoModalPage: 0, // 0为姓名更改 1 为性别修改
      sexValue:this.$store.getters.userinfo.sex,
      wechatVisible:false,
      wechatCode:null,
      bindedWechat:this.$store.getters.userinfo.bindedWechat, // 是否微信绑定
      phoneModal:false,
      // bindedPhone:this.$store.getters.userinfo.mobilePhone, // 是否手机绑定
    };
  },
  methods: {
    // 手机绑定
    phoneBind(){
      this.phoneModal = true;
    },
    // 手机modal 子组件返回
    reciveBindRes(e){
      this.phoneModal = false;
      // 绑定成功 禁止点击事件
      // e ? this.bindedPhone = e : this.bindedPhone = e;
      this.$store.dispatch('GetUserInfo');
    },
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
      this.imgVisible = false;
    },
    routeBack() {
      this.$router.back(-1);
    },
    // 剪裁modal确认按钮
    handleOk() {
      this.formData = new FormData();
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async data => {
        // 压缩 0.9
        try {
          const res = await imageConversion.compress(data, 0.9);
          this.formData.append("headimg", res, this.localimg);
          const headRes = await user_methods.update_heading(this.formData);
          // 更新vux里的userinfo信息
          this.$store.commit("SET_USER_INFO", headRes.content);
          this.$message.success("头像更新成功");
          this.imgVisible = false;
        } catch (e) {
          console.log(e);
        }
      });
    },
    // upload图片之前拦截
    beforeUpload(e) {
      console.log(e);
      this.localimg = e.path;
      this.imgVisible = true;
      return false;
    },
    // 修改名字
    changeName() {
      this.nowInfoModalPage = 0;
      this.infoModalWidth = 300;
      this.infoChangeVisible = true;
      this.infoModalTitle = "修改昵称";
      
    },
    // 更改性别
    changeSex() {
        this.nowInfoModalPage = 1;
        this.infoModalWidth = 300;
        this.infoChangeVisible = true;
        this.infoModalTitle = '修改性别'
    },
    // 信息修改modal ok按钮
    updateInfo() {
        // 姓名修改
        if (!this.nowInfoModalPage) {
            this.postUserInfo.userName = this.infoModalContent;
        } else {
            this.postUserInfo.sex = this.sexValue;
        }
        this.infoChangeVisible = false;

    },
    wechatBind(){
        this.wechatVisible = true;
    }
  },
  watch:{
      // 监听postUserInfo数据变化 有变化就向后台更新数据
      postUserInfo: {
          handler(val) {
              user_methods.update_user_info(val).then(res => {
                  this.$store.commit("SET_USER_INFO", res.content);
                  this.$message.success('个人信息更新成功');
              })
          },
          deep:true
      }
  },
  computed: {
    userinfo() {
      return this.$store.getters.userinfo;
    },
    bindedPhone(){
      return this.$store.getters.userinfo.mobilePhone;
    }
    
  },
   mounted(){
        // 用户扫描后回调监听
    window.addEventListener("message", (event) => {
        //只有这个才是登陆成功发的消息
        if (event.origin === "https://book.jftio.cn") {
            //全部的请求参数包含,目前只需要code
            console.log(event.data);
            //登陆成功code
            console.log(event.data['code']);
            user_methods.weixin_binding({code:event.data['code'],platform:'web_app',enforcement:false}).then(res => {
                console.log('webind',res);
                this.wechatVisible = false;
                this.$message.success('微信绑定成功');
                this.bindedWechat = true;
            }).catch(() => {
                this.bindedWechat = false;
            })
            
        }
    });
    }
};
</script>
<style scoped>
/* 禁用事件 */
.isBandClick{
    pointer-events: none;
}
.text {
  display: block;
  float: right;
  position: absolute;
  right: 15px;
  font-size: 16px;
  margin-top: -10px;
}
.list {
  height: 50px;
  /* background: blue; */
  display: flex;
  align-items: Center;
  border-bottom: 2px solid #f0f0f0;
}
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

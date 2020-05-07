<template>
    <a-layout>
        <a-layout-header>
            <a-row type="flex" justify="start">
                <a-col :span="2"><router-link to='/main/mybook'><a-icon type="arrow-left" /></router-link></a-col>
                <a-col :span="3">个人资料</a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content>
            <div class="personal">
                <!--个人修改头像-->
                <a-upload
                        name="avatar"
                        listType="picture"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="//jsonplaceholder.typicode.com/posts/"
                        :beforeUpload="beforeUpload"
                        @change="handleChange"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <a-avatar :size="64"  class="avatar" icon="user" /><br>
                        <div class="ant-upload-text">修改头像</div>
                    </div>
                </a-upload>
                <a-row>
                    <a-col :span="8">昵称</a-col>
                    <a-col :span="10" :offset="5">
                        <span class="id">{{$store.getters.userId}}</span>
                        <a-icon type="caret-right"/></a-col>
                </a-row>
                <hr style="width: 80%; color: grey; ">
                <a-row>
                    <a-col :span="8">性别</a-col>
                    <a-col :span="8" :offset="8"> 保密<a-icon type="caret-right" /></a-col>
                    </a-select>
                    </a-col>
                </a-row>
                <hr style="width: 80%; color: grey; ">
                <a-row>
                    <a-col :span="8">手机</a-col>
                    <a-col :span="8" :offset="8">
                        <a-icon type="caret-right" /></a-col>
                </a-row>
                <hr style="width: 80%; color: grey; ">
                <a-row>
                    <a-col :span="8">微信</a-col>
                    <a-col :span="8" :offset="8">点击绑定<a-icon type="caret-right" /></a-col>
                </a-row>
                <hr style="width: 80%; color: grey; ">
            </div>
        </a-layout-content>
        <a-layout-footer>
            <router-link to='/index/login'>退出登录</router-link>
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import { user } from '@/store/modules/user'
    function getBase64 (img, callback) {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }
    export default {
        data () {
            return {
                loading: false,
                imageUrl: '',
            }
        },
        methods: {
            handleChange (info) {
                if (info.file.status === 'uploading') {
                    this.loading = true
                    return
                }
                if (info.file.status === 'done') {
                    getBase64(info.file.originFileObj, (imageUrl) => {
                        this.imageUrl = imageUrl
                        this.loading = false
                    })
                }
            },
            beforeUpload (file) {
                const isJPG = file.type === 'image/jpeg'
                if (!isJPG) {
                    this.$message.error('You can only upload JPG file!')
                }
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!')
                }
                return isJPG && isLt2M
            },
        },
    }
</script>

<style scoped>
.personal{
    padding: 20px;
    padding-left: 15%;
    padding-right: 15%;
    padding-bottom: 48px;
    background-color: #fff;
}
.id{
    margin-left: 15px;
    width: 40px;
    float: left;
    display: block;
    overflow: hidden;
}
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
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
   background: rgb(255, 255, 255);
   box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);
}
#components-layout-demo-basic .ant-layout-footer {
    background: #ffffff;
    color: #091109;
}
#components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-content {
    background: rgb(223, 223, 223);
    color: #091109;
    min-height: 50px;
    line-height: 50px;
}
#components-layout-demo-basic > .ant-layout {
     margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
     margin: 0;
}


</style>
=======
<template>
  <!--头像区域-->
  <div id="test" @click="toPersonInfo">
      <a-avatar v-if="userinfo.headimg" :size="60" class="avatar" :src="userinfo.headimg"/>
      <a-avatar v-else :size="60" class="avatar" icon="user"></a-avatar>
      <div id="person-center" >
        <h3>{{userinfo.userName}}</h3>
        <span style="margin-left:-60px">
          <img v-if="userinfo.vip" src="@/assets/vip.png" style="width:15px;">
          <img v-if="userinfo.isUnrestricted" src="@/assets/∞@2x.png" style="width:15px;">
        </span>
        <a-icon style="float:right" type="right"/>
      </div>
    <a-row style="font-size:12px;font-weight:400;color:rgba(83,83,83,1);line-height:20px;">
      <a-col :span="8">收藏</a-col>
      <a-col :span="8">已读</a-col>
      <a-col :span="8">想读</a-col>
    </a-row>
    <a-row style="font-weight:500;color:rgba(33,33,33,1);line-height:30px;font-size:19px;">
      <a-col :span="8" @click.stop="bookList(0)">{{userinfo.joinBookshelfCount}}</a-col>
      <a-col :span="8" @click.stop="bookList(1)">{{userinfo.finishedReadingCount}}</a-col>
      <a-col :span="8" @click.stop="bookList(2)">{{$store.getters.want_read_count}}</a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  methods: {
    // 进入个人信息展示页
    toPersonInfo() {
        this.$router.push('/main/personcenter');
    },
    bookList(e) {
      /**
       * @e 0全部收藏 1已读 2 想读
       */
      this.$router.push({ path: "/main/personbooklist", query: { isWhat: e } });
    }
  },
  computed: {
    userinfo() {
      return this.$store.getters.userinfo;
    }
  }
};
</script>
<style scoped>
.avatar {
  float: left;
  margin-top: 20px;
  margin-left: 18px;
}

#person-center {
  float: left;
  width: 55%;
  margin-left: 6px;
  margin-top: 30px;
  height: 70px;
}

#list {
  width: 100%;
  color: black;
}

h3 {
  width: 80px;
  height: 20px;
  display: block;
  overflow: hidden;
  /* float: left; */
}

#test {
  color: black;
}
</style>
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5

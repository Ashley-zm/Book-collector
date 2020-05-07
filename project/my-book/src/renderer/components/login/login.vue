<template>
<div>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    style="width:300px;margin:0 auto;margin-top:70px;"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入手机号!' }] }
        ]"
        placeholder="请输入手机号"
        class="phone"
      >
        <a-icon slot="prefix" type="tablet" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] }
        ]"
        class="phone"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button" icon="user">手机登录</a-button>
    </a-form-item>
    <a-button
    icon='wechat'
    class="wechatButton"
    @click="toWechat"
    >
    微信登录
    </a-button>
    <!-- <router-link to="/login/wechatlogin">aaa</router-link> -->
  </a-form>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron');
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    toWechat(){
      this.$router.push({path:'/login/wechat'});
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("Login", values).then(res => {
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>
<style>
.wechatButton {
  width:300px;
  background:linear-gradient(90deg,rgba(14,189,53,1) 0%,rgba(73,224,106,1) 100%);
  border-radius:3px;
  color:rgba(255,255,255,1);
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.phone {
  background-color: #f2f2f2;
  color: #bfbfbf;
}
</style>
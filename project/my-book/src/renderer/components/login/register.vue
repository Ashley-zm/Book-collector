<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    style="width:300px;margin:0 auto;margin-top:70px;"
  >
    <a-alert v-show="isShow" message="请输入手机号" type="warning" showIcon/>
    <a-form-item>
      <!-- 添加气泡提示 -->
      <a-tooltip placement="topLeft" title="手机号" trigger="focus">
        <a-input
          v-decorator="[
          'phoneNumber',
          { rules: [{ required: true, message: '请输入手机号!'},
          { pattern:/^1[34578]\d{9}$/, message:'请输入正确的手机号!'}
          ] }
        ]"
          placeholder="请输入手机号"
        ></a-input>
      </a-tooltip>
    </a-form-item>
    <a-form-item>
      <a-row>
        <a-col :span="12">
          <a-tooltip placement="topLeft" title="短信验证码" trigger="focus">
            <a-input
              v-decorator="[
                    'smsCode',
                    { rules: [{ required: true, message: '请输入验证码!' }] }
                    ]"
              placeholder="请输入验证码"
            ></a-input>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-button @click="getSmsCode" :loading="loading">{{msg}}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item>
      <a-tooltip placement="topLeft" title="设置密码" trigger="focus">
        <a-input
          v-decorator="[
            'password',
            { rules: [

            { required: true, message: '请输入密码!'},
            { min:8, message: '密码最少八位'}
            ]}
            ]"
          type="password"
          placeholder="请输入密码"
        ></a-input>
      </a-tooltip>
    </a-form-item>
    <a-form-item>
      <a-tooltip placement="topLeft" title="确认密码" trigger="focus">
        <a-input
          v-decorator="[
            'confirm',
            { rules: [{ required: true, message: '请再次输入密码!'},
            { validator:compareToFirstPassword}]}
            ]"
          type="password"
          placeholder="请再次输入密码"
        ></a-input>
      </a-tooltip>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">{{!WhatPage?`注册`:(WhatPage===1?`绑定`:`修改密码`)}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { User } from '@/api';
const user_methods = new User;
export default {
  data() {
    return {
      isShow: false,
      msg: "获取验证码",
      loading: false,
      smsType:['mobile_register', 'mobile_binding', 'mobile_find_password'],
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    // 注册按钮
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          delete values.confirm; // 去掉confirm的值  用不到
          //手机注册
          if (!this.WhatPage) {
            this.$store.dispatch("UserRegister", values).then(() => {
              let secondsToGo = 5;
              const modal = this.$success({
                title: "注册成功",
                content: `您成功注册书藏家账号，${secondsToGo}后自动跳转!`,
                onOk: () => {
                  // 拿到token 和id 添加cookie 直接跳转
                  this.$router.push("/");
                }
              });
              // 设置自动关闭modal和自动跳转
              const interval = setInterval(() => {
                secondsToGo--;
                modal.update({
                  content: `您成功注册书藏家账号，${secondsToGo}后自动跳转!`
                });
              }, 1000);
              setTimeout(() => {
                clearInterval(interval);
                modal.destroy();
                this.$router.push("/");
              }, secondsToGo * 1000);
            });
            // 手机绑定
          } else if(this.WhatPage === 1) {
            const phone_res = this.$store.getters.phone_code;
            for(let i in phone_res){
              values[i] =  phone_res[i];
            }
            console.log(values)
            user_methods.phone_binding(values).then(res => {
              this.$emit('reciveBindRes', true);
              this.$message.success('手机号绑定成功');
              console.log(res)
            }).catch(() => {
              this.$emit('reciveBindRes', false);
            })
            // 手机找回
          } else if(this.WhatPage === 2) {

          }
        }
      });
    },
    // 比较密码是否一直
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue("password")) {
        callback("两次密码不一致");
      } else {
        callback();
      }
    },
    // 获取手机验证码
    getSmsCode() {
      // 手机号不为空 否则提示
      const numberValue = this.form.getFieldValue("phoneNumber");
      if (!numberValue) {
        this.isShow = true;
      } else {
        this.loading = true;
        this.isShow = false;

        var showTime = 59; // 倒计时的时间
        const timeset = setInterval(() => {
          this.msg = showTime-- + "秒";
          if (showTime === 0) {
            clearInterval(timeset);
            this.msg = "重新获取";
            this.loading = false;
          }
        }, 1000);
        // 发送验证码
        this.$store
          .dispatch("GetSmsCode", {
            phoneNumber: numberValue,
            type: this.smsType[this.WhatPage]
          })
          .then(() => {
            this.$message.success("验证码发送成功!");
          });
      }
    }
  },
  props: {
    WhatPage: {
      /**
       * 0 为手机注册页 1 为手机绑定页 2 忘记密码
       */
      type: Number,
      default: 0
    }
  }
};
</script>
<style>
</style>
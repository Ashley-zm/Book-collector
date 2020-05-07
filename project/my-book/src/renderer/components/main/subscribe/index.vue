<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="4">订阅</a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <a-modal
          v-model="wechatPayVisible"
          @cancel="handleCancel"
          :width="250"
          :footer="null"
          title="扫码支付"
        >
          <qriously :value="value" :size="size" :backgroundAlpha="backgroundAlpha"/>
        </a-modal>
        <a-card>
          <a-card-meta
            :title="$store.getters.userinfo.userName"
            :description="$store.getters.userinfo.vip ? `当前为高级用户版` : `当前为标准用户版`"
          >
            <a-avatar slot="avatar" size="large" :src="$store.getters.userinfo.headimg"/>
          </a-card-meta>
          <a-card
            hoverable
            :style="{ marginTop: '16px',width:'400px',height:'200px',marginLeft:'140px' }"
          >
            <p>无限收藏卡 ￥{{suggest.cardList[0].price}}</p>
          </a-card>
        </a-card>
        <a-list itemLayout="horizontal" :dataSource="suggest.priceList">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-button type="primary" slot="actions" @click="WechatPay(item.month)">订阅</a-button>
            <a-list-item-meta :description="`原价${item.originalPrice} 元`">
              <a slot="title">订阅 {{item.month}} 个月 {{item.price}} 元</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { Pay } from "@/api";
const pay_method = new Pay();
export default {
  created() {
    pay_method.suggestCharge().then(res => {
      console.log(res);
      this.suggest = res.content;
    });
  },
  data() {
    return {
      suggest: {
        cardList: [{ price: 0 }]
      },
      priceList: null,
      privileges: null,
      wechatPayVisible: false, //支付二维码显示
      // 可以自定义，必填项。
      value: "",
      // 二维码大小 默认 100
      size: 200,
      // 背景透明度，默认透明 0
      backgroundAlpha: 0,
      orderNo: null, // 订单号
      timeId: null
    };
  },
  methods: {
    handleCancel() {
      console.log(1111111111);
      clearTimeout(this.timeId);
    },
    // 微信支付
    WechatPay(e) {
      this.wechatPayVisible = true;
      console.log(e);
      // 生成支付订单
      pay_method.order({ month: e, is_app: false }).then(res => {
        console.log(res);
        this.value = res.content.wxPayParm.codeUrl;
        this.orderNo = res.content.orderNo;
        this.getPayStatus();
      });
    },
    async getPayStatus() {
      clearTimeout(this.timeId);
      const _ = this;
      const statusRes = await pay_method.order_status({ orderNo: this.orderNo });
      if (statusRes.content) {
        this.$message.success("支付成功");
        this.wechatPayVisible = false;
        // 支付成功 更新用户信息
        await this.$store.dispatch('GetUserInfo');
      } else {
        let id = setTimeout(() => {
          _.getPayStatus();
        }, 2000);
        this.timeId = id;
      }
        
    }
  }
};
</script>
<style scoped>
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

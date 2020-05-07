import Vue from 'vue'
import Antd from 'ant-design-vue'
import infiniteScroll from 'vue-infinite-scroll' // 滚动加载
import 'ant-design-vue/dist/antd.css'
import VueQuillEditor from 'vue-quill-editor' // 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueCropper from 'vue-cropper' // 图片剪切
import VueQriously from 'vue-qriously'; // 二维码
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(infiniteScroll)
Vue.use(VueCropper)
Vue.use(VueQriously);
Vue.use(VueQuillEditor, /* { default global options } */)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))


/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user' // 存放用户的状态
import book from './modules/book'
import comment from './modules/comment'
import getters from './getters' // 集中存放getter方法
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    book,
    comment
  },
  getters
})

export default store

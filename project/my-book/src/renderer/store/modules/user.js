import * as types from '@/store/mutation-types'
import {User} from '@/api'
import {setToken,getToken,getLocalKey,removeToken} from '@/util/mancookies'
const user_methods = new User;
const user = {
    state:{
        user_content:{  //用于存放登陆post拿回的数据
            userId:getLocalKey(),
            token:getToken()
        },
        user_info:{  }, // 存放用户个人信息
        phone_code:{  // 用于存放手机验证时服务器返回的信息
            expires_in:'',
            hashValue:''
        },
        search_users:[], // 存放搜索的用户信息
        want_read_count:0  //头像区域想读数值
    },

    mutations:{
        [types.SET_CONTENT]:(state,newValue) => {
            state.user_content = newValue;
        },
        [types.SET_USER_INFO]:(state,newValue) => {
            state.user_info = newValue;
            state.want_read_count = newValue.wantReadCount;
        },
        [types.SET_PHONE_CODE]:(state,newValue) => {
            state.phone_code = newValue;
        },
        [types.SET_SEARCH_USERS]:(state,newValue) => {
            state.search_users = newValue;
        },
        [types.PUSH_SEARCH_USERS]:(state,newValue) => {
            state.search_users.push(...newValue);
        },
        [types.SET_WANT_READ_COUNT]:(state,newValue) => {
            state.want_read_count = newValue;
        }
    },

    actions:{
<<<<<<< HEAD
=======
        WechatLogin({ commit }, params) {
            return new Promise((resolve, reject) => {
                user_methods.weixin_login(params).then(res => {
                    const data = res.content;
                    console.log(data)
                    setToken(data.userId, data.token);
                    commit(types.SET_CONTENT, data);
                    return resolve();
                }).catch(error => {
                    return reject(error);
                })
            })
        },
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
        // 登录
        Login({ commit }, userinfo) {
           return new Promise((resolve, reject) => {
            user_methods.login(userinfo).then(response => {
                   const data = response.content;
                   console.log('登录',data)
                   // 设置cookie
                   setToken(data.userId,data.token);
                   //修改state状态
                   commit(types.SET_CONTENT,data);
                //    return resolve('登录成功');
                return resolve()
               }).catch(error => {
                   return reject(error);
               })

           })
        },
        // 获取用户信息
        GetUserInfo({commit,state}) {
            return new Promise((resolve, reject) => {
                user_methods.get_user_info().then(response => {
                    console.log(response)
                    commit(types.SET_USER_INFO,response.content);
                    return resolve(response)
                }).catch(error => {
                    return reject(error)
                })
            })

            },
        // 前端退出  清cookie
        FedLogOut({commit}){
            return new Promise(resolve => {
                removeToken();
                commit(types.SET_CONTENT,{});
                resolve()
            })
        },
        // 获取手机验证码
        GetSmsCode({commit}, numberAndtype) {
            return new Promise((resolve, reject) => {
                user_methods.sendCode(numberAndtype).then(response => {
                    console.log('手机',response);
                    commit(types.SET_PHONE_CODE,response.content);
                    return resolve();
                }).catch(error => {
                    return reject();
                })
            })


        },
        // 用户注册
        UserRegister({commit,state}, userInput) {
            //数据处理一下 两部分数据合并  手机验证码返回的数据+用户输入
            const temp = state.phone_code;
            for (let item in temp) {
                userInput[item] = temp[item];
            }
            return new Promise((reslove, reject) => {
                user_methods.regist(userInput).then(response => {
                    console.log('注册',response);
                    // 返回token 和 id 相当于登录 直接进行跳转到主页面
                    setToken(response.content.userId,response.content.token);
                    commit(types.SET_CONTENT,response.content);
                    return reslove()
                }).catch(error => {
                    return reject()
                })

            })
        },
        // 用户搜索
        SearchUser({commit}, keyWord) {
            return new Promise((resolve, reject) => {
                user_methods.search(keyWord).then(res => {
                    if (keyWord.wuguan === 0){
                        commit(types.SET_SEARCH_USERS, res.content);
                        console.log('搜索用户',res);
                        return resolve(res.content.length);
                    } else {
                        commit(PUSH_SEARCH_USERS, res.content);
                        return resolve();
                    }
                }).catch(() => {
                    return reject();
                })
            })
        }
    }
}


export default user

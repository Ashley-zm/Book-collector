import axios from 'axios'
import store from '@/store'
import {
    message
} from 'ant-design-vue'

const instance = axios.create({
    baseURL: 'http://123.206.70.97:8080',
    timeout: 15000,
})
// request拦截 添加token
instance.interceptors.request.use(config => {
    if (store.getters.token) {
        // 添加token   拼接 id_token
        config.headers['authorization'] = store.getters.userId + '_' + store.getters.token;
    }
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(
    response => {
        const res = response.data;
        // 提示错误
        if (res.code !== 1000 && res.code !== 2002 && res.code !== 2001) {
            message.error(res.message);
            return Promise.reject(res.message);
        }
        // 2002 被登出
        if (res.code === 2002) {
            message.error(res.message, 2);
            store.dispatch('FedLogOut').then(() => {
                setTimeout(() => {
                    location.reload(); // 刷新一下页面  回到登录页面
                }, 3000);

            })
        } else if (res.code === 2001) {
            /**
             * 此判断处理  没有藏书数据时返回
             */
<<<<<<< HEAD
            message.error('没数据哟^_^');
=======
            // message.error(res.message)
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
            return Promise.reject(res.message);
        } else {
            return response.data;
        }



    }
)

export default instance

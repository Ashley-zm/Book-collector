import Vue from 'vue'
import Router from 'vue-router'
import {
    getToken
} from '@/util/mancookies'
import store from '@/store'
import {
    message
} from 'ant-design-vue'

Vue.use(Router);

const router = new Router({
  //每次路由跳转，页面跳转到顶部
  scrollBehavior: () => ({
    y: 0,
    x:0
  }),
  routes: [
    // 测试页
    {
      path: '/test',
      component: () => import('@/components/LandingPage'),
      children: [{
        path: 'ttt',
        component: () => import('@/components/main/test')
      }]
    },
    {
      //登录页q
      path: '/login',
      component: () => import('@/components/login'),
      children: [{
          // 默认显示登录界面
          path: '',
          name: 'login',
          component: resolve => require(['@/components/login/login'], resolve)
        },
        {
          path: 'register',
          name: 'register',
          component: resolve => require(['@/components/login/register'], resolve)
        },
        {
          path: 'wechat',
          name: 'wechat',
          component: resolve => require(['@/components/login/wechatLogin'], resolve)
        },
      ]
    },
    {
      path: '/',
      redirect: '/main'
    },
    {
      //主页面
      path: '/main',
      component: resolve => require(['@/components/main'], resolve),

      children: [{
          path: '',
          // component:() => import('@/components/main/test')
          component: resolve => require(['@/components/main/mybook'], resolve),
          beforeEnter: (to, from, next) => {
            async function test() {
              await store.dispatch('GetMoRenClass');
              await store.dispatch('GetBooksInGroup', {
                size: 12,
                page: 0
              }); // 首次进入获取第一页内容
              return;
            }
            test().then(() => {
              next();
            });
          }
        },
        {
           //个人中心
           path:'person',
           component:resolve => require(['@/components/main/person'],resolve)
        },
        {
          // 类管理
          path: 'classmanage',
          name: 'classmanage',
          component: resolve => require(['@/components/main/classmanage'], resolve),
          beforeEnter: (to, from, next) => {
            store.dispatch('GetMoRenClass').then(() => {
              next();
            })
          }
        },
        {
          // 搜索
          path: 'search',
          component: resolve => require(['@/components/main/search'], resolve),
        },
        {
          // 广场
          path: 'square',
          component: resolve => require(['@/components/main/square'], resolve),
        },
    //每次路由跳转，页面跳转到顶部
    scrollBehavior: () => ({
        y: 0,
        x: 0
    }),
    routes: [
        // 测试页
        {
            path: '/test',
            component: () => import('@/components/LandingPage'),
            children: [{
                path: 'ttt',
                component: () => import('@/components/main/test')
            }]
        },
        {
            //登录页q
            path: '/login',
            component: () => import('@/components/login'),
            children: [{
                    // 默认显示登录界面
                    path: '',
                    name: 'login',
                    component: resolve => require(['@/components/login/login'], resolve)
                },
                {
                    path: 'register',
                    name: 'register',
                    component: resolve => require(['@/components/login/register'], resolve)
                },
                {
                    path: 'wechat',
                    name: 'wechat',
                    component: resolve => require(['@/components/login/wechatLogin'], resolve)
                },
            ]
        },
        {
            path: '/',
            redirect: '/main'
        },
        {
            //主页面
            path: '/main',
            component: resolve => require(['@/components/main'], resolve),

            children: [{
                    path: '',
                    component: resolve => require(['@/components/main/mybook'], resolve),
                    beforeEnter: (to, from, next) => {
                        store.dispatch('GetUserBooksGroup');
                        next();
                    }
                },
                {
                    // 类管理
                    path: 'classmanage',
                    name: 'classmanage',
                    component: resolve => require(['@/components/main/classmanage'], resolve),
                },
                {
                    // 搜索
                    path: 'search',
                    component: resolve => require(['@/components/main/search'], resolve),
                },
                {
                    // 广场
                    path: 'square',
                    component: resolve => require(['@/components/main/square'], resolve),
                },
                {
                    // 订阅管理
                    path: 'subscribe',
                    component: resolve => require(['@/components/main/subscribe'], resolve),
                },
                {
                    // 我的书评
                    path: 'mycomment',
                    component: resolve => require(['@/components/main/mycomment'], resolve),
                },
                {
                    // 书评详情页
                    path: 'bookreview',
                    component: resolve => require(['@/components/main/bookReviewDetail'], resolve),
                },

                {
                    // 个人图书列表  书评用
                    path: 'selectOneBook',
                    component: resolve => require(['@/components/main/writecomment/selectOneBook'], resolve),
                },
                {
                    // 写书评页面
                    path: 'writebookcom',
                    component: resolve => require(['@/components/main/writecomment/'], resolve),
                },
                {
                    // 书籍详情页
                    path: 'bookdetail',
                    component: resolve => require(['@/components/main/bookDetail'], resolve),
                },
                {
                    // 书籍管理
                    path: 'bookmanage',
                    component: resolve => require(['@/components/main/bookManage'], resolve),
                    beforeEnter: (to, from, next) => {
                        store.dispatch('GetUserBooksGroup');
                        next();
                    },
                },
                {
                    // 自定义图书
                    path: 'userdefinedbook',
                    component: resolve => require(['@/components/main/mybook/userDefinedBook'], resolve),
                },
                {
                    // 个人信息展示
                    path: 'personcenter',
                    component: resolve => require(['@/components/main/person/personInfo'], resolve),
                },
                {
                    // 头像区域图书列表 收藏 想读 已读 图书的展示
                    path: 'personbooklist',
                    component: resolve => require(['@/components/main/person/personBookList'], resolve),
                },

            ]
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})


export default router

//登录拦截
const whitelist = ['/login', '/login/register', '/login/wechat'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    if (getToken()) {
        // 已经登录成功 不可访问登录页面
        if (to.path === '/login') {
            message.error("您已处于登录状态!");
            next({
                path: '/'
            });
        } else {
            // 判断是否有用户信息
            const isUserInfo = Object.keys(store.getters.userinfo);
            if (isUserInfo.length === 0) {
                store.dispatch('GetUserInfo').then((res) => {
                    next();
                }).catch(err => {
                    //获取信息失败，清楚本地cookie
                    store.dispatch('FedLogOut').then(() => {
                        message.error("认证失败，请重新登录！");
                        next({
                            path: '/'
                        });
                    });

                })
            } else {
                next();
            }

    }
    // 不存在token
  } else {
    // 判断要跳转到的路径是不是白名单上的 如果是就跳转  否则跳转到login
    if (whitelist.indexOf(to.path) !== -1) { // 返回-1不再其中 0在其中
      next();
        }
        // 不存在token
    } else {
        // 判断要跳转到的路径是不是白名单上的 如果是就跳转  否则跳转到login
        if (whitelist.indexOf(to.path) !== -1) { // 返回-1不再其中 0在其中
            next();
        } else {
            next('/login');
        }
    }

})

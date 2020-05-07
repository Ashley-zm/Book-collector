import * as types from '@/store/mutation-types'
import axios from 'axios'
import {Book,Category} from '@/api'
const book_methods = new Book;
const cate_methods = new Category;
const book = {
    state:{
<<<<<<< HEAD
        books_moren:{}, // 默认分组的信息
        books_group_all:[], // 用于存放用户所有的书籍分组信息
=======
        books_group_all:[], // 所有分类
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
        books_in_group:{}, // 存放分组下的书籍信息
        search_douban:{}, // 存放豆瓣数据
        self_all_books:[], //存放个人所有的藏书
    },
    mutations:{
        [types.SET_BOOKS_GROUP_INFO]:(state,newValue) => {
            state.books_group_all = newValue;
        },
        [types.SET_BOOKS_IN_GROUP]:(state, newValue) => {
            state.books_in_group = newValue;
        },
        [types.SET_SEARCH_DOUBAN]:(state, newValue) => {
            state.search_douban = newValue;
        },
<<<<<<< HEAD
        [types.SET_BOOKS_MOREN]:(state, newValue) => {
            state.books_moren = newValue;
        },
        [types.SET_SELF_ALL_BOOKS]:(state, newValue) => {
            if (newValue) {
                state.self_all_books.push(...newValue);
            } else {
                state.self_all_books = [];
            }
            
        }
=======
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
    },
    
    actions:{
        // 获取默认分组
        GetMoRenClass({commit}) {
            return new Promise((resolve, reject) => {
                book_methods.by_category().then(res => {
                    commit(types.SET_BOOKS_MOREN, res.content);
                    return resolve();
                })
            })
        },
        // rootState 是根state
        // 获取用户的图书分组信息
        GetUserBooksGroup({commit}) {
            return new Promise((resolve) => {
                cate_methods.get().then(response => {
                    console.log('allGroup',response.content)
                    commit(types.SET_BOOKS_GROUP_INFO, response.content);
                    return resolve();
                })
            })
        },
        // 获取某个具体的分组信息
        GetBooksInGroup({commit},params) {
            return new Promise((resolve, reject) => {
                book_methods.category_contain(params).then(response => {
                    commit(types.SET_BOOKS_IN_GROUP, response.content)
                    return resolve();
                }).catch(() => {
                    /**
                     * 切换分类的时候 如果此类没有数据要把 之前state里存放的数据清空
                     */
                    commit(types.SET_BOOKS_IN_GROUP, null)
                    return resolve();
                })
            })
        },
        //搜索豆瓣数据
        SearchDouBan({commit},params) {
            return new Promise((resolve, reject) => {
                /**
                 * 带params表示  请求数据
                 * 不带parasm表示 清空state内容
                 */
                if (params) {
                    /**
                     * params参数
                     * @count 显示条数 默认20、
                     * @q 搜索的关键字
                     * @start 分页
                     */
                    axios.get('https://api.douban.com/v2/book/search?count=20',{params}).then(res => {
                        console.log('豆瓣数据',res.data);
                        commit(types.SET_SEARCH_DOUBAN, res.data);
                        return resolve(res.data.total);
                    }).catch(erro => {
                        return reject();
                    })
                } else {
                    // 清空豆瓣数据
                    commit(types.SET_SEARCH_DOUBAN, '');
                    // 根 commit
                    // 清空搜索的用户数据
                    commit(types.SET_SEARCH_USERS, [], {root:true});
                    // 清空搜索书评数据
                    commit(types.SET_SEARCH_COMMENT, [], {root:true})
                    return resolve();
                }
                
            })
        },
        GetSelfAllBooks({commit}, params) {
            if (params) {
                return new Promise((resolve, reject) => {
                    book_methods.get_all_books_self(params).then(res => {
                        commit(types.SET_SELF_ALL_BOOKS,res.content.userBookVos);
                        return resolve();
                    })
                })
            } else {
                commit(types.SET_SELF_ALL_BOOKS);
            }
            
        }
    }
}

export default book

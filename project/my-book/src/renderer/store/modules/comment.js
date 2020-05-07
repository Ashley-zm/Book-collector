import * as types from '@/store/mutation-types'
import {Comment} from '@/api'
const com_methods = new Comment;
const comment = {
    state:{
        search_comment:[], // 存方搜索得到的信息
        all_comment: [] // 存放所有的评论
    },

    mutations:{
        [types.SET_SEARCH_COMMENT]:(state, newValue) => {
            state.search_comment = newValue;
        },
        [types.PUSH_SEARCH_COMMENT]:(state, newValue) => {
            newValue.forEach(val => {
                val.coverUrl = 'https://images.weserv.nl/?url=' + val.coverUrl;
                state.search_comment.push(val);
            })
        },
        [types.PUSH_ALL_COMMENT]:(state, newValue) => {
            state.all_comment.push(...newValue);
        },
        // 清空评论的数据
        [types.CLEAR_ALL_COMMENT]:(state) => {
            state.all_comment = [];
        }
    },

    actions:{
        SearchComment({commit},keyWord) {
            return new Promise((resolve, reject) => {
                    com_methods.search(keyWord).then(res => {
                        if (keyWord.wuguan === 0){
                            commit(types.SET_SEARCH_COMMENT,res.content);
                            return resolve(res.content.length);
                        } else {
                            commit(types.PUSH_SEARCH_COMMENT,res.content);
                            return resolve();
                        }
                        
                    }).catch(() => {
                        return reject();
                    })
                
                
            })
        },
        GetAllComment({commit}, params) {
            // 有参数获取数据  没参数清空数据
            if (params) {
                return new Promise((resolve, reject) => {
                    com_methods.get_all(params).then(res => {
                        commit(types.PUSH_ALL_COMMENT, res.content);
                        return resolve();  
                    }).catch(() => {
                        return reject();
                    })
                })
            } else {
                commit(types.CLEAR_ALL_COMMENT);
            }
            
        }
    }

}

export default comment
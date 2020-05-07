<template>
  <div id="wrapper">
    <li><router-link to="/index">跳转</router-link></li>
   <button @click="change">跳转测试页</button>
   <button @click="post1">提交</button>
   <li>{{token}}</li> 
   <button @click="set">setcookie</button>
   <button @click="get">getcookie</button>
   <button @click="remove">recookie</button>
   <button @click="getinfo">getuserinfo</button>
   <p>
     <router-link to="/ttt">test</router-link>
   </p>
   <router-view></router-view>
   <div>
     <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption">
        </quill-editor>
   </div>
   <div>{{content}}</div>
  </div>
  
</template>

<script>
import request from '../util/request'
import {Comment} from '@/api'

import {setToken,getToken,removeToken,localKey} from '@/util/mancookies'
import { log } from 'util';
import store from '@/store'
const com_methods = new Comment;
// import axios from 'axios'
// import qs from 'qs'

// const service = axios.create({
//     baseURL:'http://123.206.70.97:8080',
//     timeout:15000,
//     transformRequest:[(data)=>{
//         data = qs.stringify(data);
//         return data;
//     }]
// })
  export default {
    data(){
      return {
        content:null,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
            ]
          }
        }
      }
    },
    name: 'landing-page',
    methods:{
      getinfo(){
        this.$store.dispatch('GetUserInfo').then((res)=>{
        console.log(res)
      })
      },
      change(){
        this.$router.push('/index')
      },
      post1(){
        this.$router.back(-1)
        // com_methods.search({keywords:'q'}).then(res => {
        //             console.log(res)
        //         })
        // console.log(User)
        // let a = new User;
        
      // const data ={
      //   username:'15339068024',
      //   password:'123456'
      // }
      // request.get('/book/category_contain',{category_id:'ff8080816932e417016933c1d2710000'}).then((response) => {
      //   console.log(response.content)
      // })
      // // a.login(data).then(
      //   res=>{
      //     console.log(res)
      //   }
      // )
      // A.post('/user',data).then(res=>{
      //   console.log(res)
      // })
    //  axios({
    //    url:'/user',
    //    method:'post',
    //    data:data,
    //    baseURL:'http://123.206.70.97:8080'
    //    }).then(res=>{
      
    //    console.log(res)
    //  })
      },
      set(){
          window.location.reload()
      },
      get(){
        var a = getToken()
        var b = localKey
        console.log(a,b)
      },
      remove(){
        var a = store.getters.userId
        console.log(a)
      }
    },
    computed:{
      getcontent(){
        return this.$refs.myTextEditor.quill
      },
      token(){
        return this.$store.state.user.user_info;
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>

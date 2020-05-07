<template>
  <div id="app">
    <div class="topArea">
      <div class="rightButton">
        <a-button icon='minus' class="deleteSomeValue" @click='windowMin'></a-button>
        <a-button icon='border' class="deleteSomeValue" @click='windowMax'></a-button>
        <a-button icon='close' class="deleteSomeValue danger" @click='windowClose'></a-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// main 与 render 通讯
var ipc = require('electron').ipcRenderer;
export default {
  name: "my-book",
  methods:{
    // 窗口关闭
    windowClose(){
      ipc.send('window-close');
    },
    windowMin(){
      ipc.send('window-min');
    },
    windowMax(){
      ipc.send('window-max');
    }
  }
};
</script>

<style scoped>
/* CSS */
#app{
  /* width: 100%; */
  height: 95%;
  
}
.topArea{
  background-color: rgba(255,255,255,1);
  width: 100%;
  height: 30px;
  /* 设置可拖动 */
  -webkit-app-region: drag; 
}
.rightButton{
  width:123px;
  height:30px;
  background:yellow;
  float:right;
  /* 竖直居中 */
  display: flex;
  align-items:Center;
  -webkit-app-region: no-drag;
}
.minimize{
  width:13px;
  height:2px;
  display: flex;
    justify-content:center;
    align-items:Center;
  border:2px solid rgba(151,151,151,1);
}
.enlarge{
  width:13px;
height:9px;
border:2px solid rgba(151,151,151,1);
}
.deleteSomeValue{
  /* border-color:none; */
  border:none;
  border-radius:0;
  width: 41px;

}
.spacing{
  margin-left: 15px;
}
.ant-btn:hover, .ant-btn:focus{
  color:rgba(255,255,255,1);
  background-color:rgba(216,216,216,1);
  border-color:red
}
.danger:hover{
  color:rgba(255,255,255,1);
  background-color: red;
  border-color:red
}
</style>

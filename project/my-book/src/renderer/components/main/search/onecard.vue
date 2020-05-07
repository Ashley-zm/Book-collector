<template>
  <a-card hoverable style="width: 500px">
    <a-row>
      <a-col>
        <div class="t">
          <img
            :src="`https://images.weserv.nl/?url=${bookInfo.image}`"
            slot="cover"
            style="width:100px;height:125px;box-shadow:0px 2px 4px 0px rgba(0,0,0,0.14);"
          >
        </div>
      </a-col>
      <a-col :span="10" :offset="1">
        <table>
      <tbody>
        <tr>
          <h3>{{bookInfo.title}}</h3>
        </tr>
        <tr>
          <p align="left">作者:{{bookInfo.author[0]}}</p>
        </tr>
        <tr>
          <p align="left">评分:{{bookInfo.rating.average}}</p>
        </tr>
        <tr>
          <p align="left">出版社:{{bookInfo.publisher}}</p>
        </tr>
      </tbody>
    </table>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
export default {
  props: {
    bookInfo: Object
  }
};
</script>
<style scoped>
h3 {text-align:left}
.t {
  margin-left: 50px;

  float: left;
}
p {
  font-size: 13px;
  margin-top: -10px;
}
</style>

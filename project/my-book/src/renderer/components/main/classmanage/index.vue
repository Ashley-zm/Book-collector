<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="5">分类管理。</a-col>
        <a-col :span="1" :offset="18">
          <a-button @click="showAdd" shape="circle" icon="plus"/>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <a-modal
        :title="modalTitle"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        cancelText="取消"
        okText="确认"
      >
        <a-input v-model="inputvalue"></a-input>
        <a-checkbox v-if="isShowCheckBox" @change="onChange">私密</a-checkbox>
      </a-modal>
<<<<<<< HEAD
      <a-list>
        <!-- 默认分类不可修改 单独显示 -->
        <a-list-item-meta>
          <h3 slot="description">{{morenClass.bookCount}}本</h3>
          <h2 slot="title">
            {{morenClass.name}}
            <a-icon type="lock"/>
          </h2>
          <div class="myCanvas" slot="avatar">
            <!-- 只显示四张图片 -->
            <img
              v-for="(imgurl,index) in morenClass.userBookVos.slice(0, 4)"
              :src="`https://images.weserv.nl/?url=${imgurl.originalBookInfo.coverUrl}`"
              :key="index"
            >
          </div>
        </a-list-item-meta>
      </a-list>
      <a-list itemLayout="horizontal" :locale="{emptyText: ''}" :dataSource="all_group_data">
=======
      <a-list v-if="all_group_data.length" itemLayout="horizontal" :locale="{emptyText: ''}" :dataSource="all_group_data">
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
        <a-list-item slot="renderItem" slot-scope="item">
          <a-tag color="#108ee9" slot="actions" @click="Rename(item)">重命名</a-tag>
          <a-tag color="#f50" slot="actions" @click="Delete(item)">删除</a-tag>
          <!-- 用户分类 -->
          <a-list-item-meta>
            <h3 slot="description">{{item.bookCount}}本</h3>
            <p slot="description">创建于:{{item.createDate}}</p>
            <h2 slot="title">{{item.name}}</h2>
            <div class="myCanvas" slot="avatar">
              <!-- 只显示四张图片 -->
              <img
                v-for="(imgurl,index) in item.userBookVos.slice(0, 4)"
                :src="`https://images.weserv.nl/?url=${imgurl.originalBookInfo.coverUrl}`"
                :key="index"
              >
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <div v-else>
        <h1>暂无图书分类</h1>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { Category, Book } from "@/api";
const cat_methods = new Category();
const book_methods = new Book();

export default {
  created() {
    book_methods.by_category().then(res => {
      this.all_group_data = res.content;
    });
  },
  data() {
    return {
<<<<<<< HEAD
=======
      localimg: require("@/assets/bookimage.png"),
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5
      visible: false, // modal是否显示
      confirmLoading: false, // modal是否显示加载动画
      inputvalue: "", // 输入框内容
      isShowCheckBox: false, // 选择框
      modalTitle: null, // modal 的标题
      changeData: {
        category_id: null, // 分类的id
        is_private: null, // 分类是否私密
        name: null // 修改后的名字
      },
      all_group_data: [], // 保存分类数据
    };
  },
  methods: {
    // 增加分类事件
    showAdd() {
      this.modalTitle = "添加分类";
      this.visible = true;
      this.isShowCheckBox = true;
      this.inputvalue = "";
    },
    // 单选框选中事件
    onChange(e) {
      this.changeData.is_private = e.target.checked;
    },
    // modal 确认事件
    handleOk(e) {
      this.confirmLoading = true;
      this.changeData.name = this.inputvalue;
      // 通过单选框 是否显示来判断 是重命名 还是 增加类
      if (!this.isShowCheckBox) {
        cat_methods.put(this.changeData).then(() => {
          this.$message.success("修改成功!");
          this.confirmLoading = false;
          this.visible = false;
          // 清空一下数据
          // 保险起见  初始化一下
          Object.keys(this.changeData).forEach(key => (this.changeData[key] = null));
          // 刷新一下
          book_methods.by_category().then(res => {
            this.all_group_data = res.content;
          });
        });
      } else {
        cat_methods.post(this.changeData).then(() => {
          this.$message.success("添加成功!");
          this.confirmLoading = false;
          this.visible = false;
          // 保险起见  初始化一下
          this.isShowCheckBox = false;
          // 循环遍历 清空原有 changeData里的值
          Object.keys(this.changeData).forEach(
            key => (this.changeData[key] = null)
          );
          // 刷新一下
          book_methods.by_category().then(res => {
            this.all_group_data = res.content;
          });
        });
      }
    },
    // modal取消事件
    handleCancel(e) {
      this.visible = false;
    },
    // 重命名事件
    Rename(item) {
      console.log(item);
      // 点击之前设置一下 单选框不显示
      this.isShowCheckBox = false;
      this.modalTitle = "重命名分类";
      this.visible = true;
      this.inputvalue = item.name;
      this.changeData.category_id = item.categoryId;
      this.changeData.is_private = item.private;
    },
    // 删除事件
    Delete(item) {
      const _ = this;
      this.$confirm({
        title: "您确定要删除此分类吗?",
        content: "删除后该分类下的书籍将转移到默认分类下。",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          // 删除类
          cat_methods.delete({ category_id: item.categoryId }).then(() => {
            _.$message.success("删除成功!");
            // 重新获取一下数据 更新一下 vuex 相当于刷新页面
            book_methods.by_category().then(res => {
              _.all_group_data = res.content;
            });
          });
        }
      });
    }
  },
};
</script>
<style scoped>
.myCanvas {
  border-radius: 5px;
  overflow: hidden;
  background: #dddbdb;
  border: 1px solid #d3d3d3;
  height: 140px;
  width: 120px;
}
.myCanvas img {
  width: 50px;
  height: 60px;
  float: left;
  border: 0;
  margin: 4px;
}
#components-layout-demo-basic .ant-layout-header {
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
}

#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
  min-height: 120px;
  height: 100%;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

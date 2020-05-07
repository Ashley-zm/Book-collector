import request from '@/util/request'
import qs from 'qs'
export class User {
  //登录
  login(params) {
    return request.post('/user', qs.stringify(params));
  }
  // 登出
  logout(params) {
    return request.delete('/user', params);
  }
  // 注册
  regist(params) {
    return request.put('/user', params);
  }
  // 获取用户信息
  get_user_info() {
    return request.get('/user/get_user_info');
  }
  //手机绑定
  phone_binding(params) {
    return request.post('/user/phone_binding', qs.stringify(params));
  }
  // 找回密码
  retrieve_password(params) {
    return request.post('/user/retrieve_password', qs.stringify(params));
  }
  // 搜索用户
  search(params) {
    return request.get('/user/search?size=10', {
      params
    });
  }
  // 获取验证码
  sendCode(params) {
    return request.post('/user/sendCode', qs.stringify(params));
  }
  // 更新用户头像
  update_heading(params) {
    return request.post('/user/update_headimg', params);
  }
  // 更新个人信息
  update_user_info(params) {
    return request.post('/user/update_user_info', params);
  }
  //微信绑定
  weixin_binding(params) {
    return request.post('/user/weixin_binding', qs.stringify(params));
  }
  // 微信登录
  weixin_login(params) {
    return request.post('/user/weixin_login', params);
  }

}
export class Book {
  // 获取分类分组图书
  by_category() {
    return request.get('/book/by_category');
  }
  // 获取分类下图书
  category_contain(params) {
    return request.get('/book/category_contain', {
      params
    });
  }
  // 搜索收藏图书
  search_cangshu(params) {
    return request.get('/book/search/library', {
      params
    });
  }
  // 获取个人全部图书
  get_all_books_self(params) {
    return request.get('/book/library?size=10', {
      params
    });
  }
  // 添加图书
  add_book(params, is_custom) {
    return request.post(`/book/info?is_custom=${is_custom}`, params);
  }
  // 添加想读
  add_want_read(params) {
    return request.post(`/book/wang_read/${params}`);
  }
  // 加入书库
  add_book_to_ku(bookid, isforcibly) {
    return request.post(`/book/library/${bookid}?forcibly=${isforcibly}`);
  }
  // 设置分类
  set_class(params) {
    return request.post('/book/category', qs.stringify(params));
  }
  // 更新阅读信息
  put_read_info(book_id, params) {
    return request.put(`/book/library/${book_id}`, params);
  }
  // 删除书籍
  delete_book(book_id) {
    return request.delete(`/book/library/${book_id}`);
  }
  // 上传图书封面
  upload_bookimg(formData) {
    return request.post('/book/upload_bookimg', formData);
  }
  // 获取想读图书
  get_want_read(params) {
    return request.get('/book/wang_read', {params});
  }
  // 获取已读图书
  get_finished_read(params) {
    return request.get('/book/finished_reading', {params});
  }
  // 取消想读
  del_want_read(params) {
    return request.delete(`/book/wang_read/${params}`);
  }
}

export class Comment {
  // 搜索评论
  search(params) {
    return request.get('/review/search?size=10', {
      params
    });
  }
  // 获取全部评论
  get_all(params) {
    return request.get('/review?size=10', {
      params
    });
  }
  // 删除书评
  delete_comment(params) {
    return request.delete(`/review/${params}`);
  }
  // 获取详细书评
  get_detail(params) {
    return request.get(`/review/${params}`);
  }
  // 添加书评
  add_comment(params) {
    return request.post('/review', params);
  }
}
export class Category {
  // 删除分类
  delete(params) {
    return request.delete('/category', {
      params
    });
  }
  // 获取分类列表
  get(params) {
    return request.get('/category', {
      params
    });
  }
  // 添加分类
  post(params) {
    return request.post('/category', qs.stringify(params));
  }
  // 修改分类
  put(params) {
    return request.put('/category', qs.stringify(params));
  }
}

export class Pay {
  // 充值建议
  suggestCharge() {
    return request.get('/suggestCharge');
  }
<<<<<<< HEAD
}
=======
  // 生成支付订单
  order(params) {
    return request.post('/order', qs.stringify(params));
  }
  // 获取支付状态
  order_status(params) {
    return request.get('/order/status', {params});
  }
}
>>>>>>> 51aba9636848e01cfc4c058c9168a0ec759f76f5

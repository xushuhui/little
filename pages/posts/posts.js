// pages/posts/post.js
var postData = require('../../data/posts-data.js');
Page({
  data: {
    post_key: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ post_key: postData.postList });//加载数据
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../posts/post-detail/post-detail?postid=' + postId,

    })
  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postid;
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    wx.navigateTo({
      url: '../posts/post-detail/post-detail?postid=' + postId,

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
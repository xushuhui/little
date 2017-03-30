// pages/posts/post.js
Page({
  data:{
   post_key:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var post_content=
    [
      {
        date:"Jar 20 2017",
        title:"正是虾肥蟹壮时",
        content:"正是虾肥蟹壮时",
        view_num:"112",
        collect_num:"96",
        author_img:"/images/avatar/1.png",
        img_status:true,
      },

      {
        date:"Jar 20 2017",
        title:"1111",
        content:"22222",
        view_num:"112",
        collect_num:"96",
        author_img:"/images/avatar/1.png",
        img_status:true,
      }
    ]
    
    this.setData({post_key:post_content});
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
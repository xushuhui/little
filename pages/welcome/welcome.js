Page({ 
    onTap:function(event){
      // wx.navigateTo({//跳转到下个页面
      //   url: '../posts/posts',
       
      // });
      wx.switchTab({
            url: "../posts/posts"
        });
    },
    
});
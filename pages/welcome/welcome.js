Page({ 
    onTap:function(event){
      wx.redirectTo({//跳转到下个页面
        url: '../posts/posts',
        success: function(res){
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    },
    
});
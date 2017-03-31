var postData = require('../../../data/posts-data.js');
Page({
    onLoad:function(option){
        var postid = option.postid;
        this.setData(postData.postList[postid]);//加载数据
        wx.setStorageSync('key', '166666');
    },
    onCollectionTap:function(){
        var k = wx.getStorageSync('key');
        
    },

    onShareTap:function(){
        wx.removeStorageSync('key');//移除缓存
    }
 })
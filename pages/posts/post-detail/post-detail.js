var postData = require('../../../data/posts-data.js');
var app = getApp();
Page({
    data:
    {
        isPlayingMusic: false
    },
    onLoad: function (option) {

        var postid = option.postid;
        this.data.currentpostid = postid;
        this.setData(postData.postList[postid]);//加载数据
        var postCollected = wx.getStorageSync('post_collected');
        if (postCollected) {
            var collected = postCollected[postid];
            this.setData({ collected: collected });//加载数据
        }
        else {
            var postCollected = {};
            postCollected[postid] = false;
            wx.setStorageSync('post_collected', postCollected);
        }

        if (app.globalData.g_isPlayingMusic &&  app.globalData.g_currentMusicPostId === postid)         {
            this.setData({
                isPlayingMusic: true
            });
        }
        this.setMusicMonitor();

    },
    //监听音乐播放事件
    setMusicMonitor: function () {
        var that = this;
        //监听音乐播放
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            });
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentpostid;
        });
        //监听音乐暂停
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            });
            app.globalData.g_isPlayingMusic = false;
        });
        //监听音乐停止
         wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            });
            app.globalData.g_isPlayingMusic = false;
        });

    },
    // onColleeectionTap: function (event) {
    //     var postCollected = wx.getStorageSync('post_collected');
    //     var collected = postCollected[this.data.currentpostid];
    //     //收藏变未收藏 未收藏变收藏
    //     collected = !collected;
    //     postCollected[this.data.currentpostid] = collected;
    //     this.showModal(collected, postCollected);
    // },
    onCollectionTap: function (event) {
        // this.getPostsCollectedSyc();
        this.getPostsCollectedAsy();
    },
    //异步
    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: "post_collected",
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentpostid];
                // 收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                postsCollected[that.data.currentpostid] = postCollected;
                that.showToast(postsCollected, postCollected);
            }
        });
    },
    //同步
    getPostsCollectedSyc: function () {
        var postsCollected = wx.getStorageSync('post_collected');
        var postCollected = postsCollected[this.data.currentpostid];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentpostid] = postCollected;
        this.showToast(postsCollected, postCollected);
    },
    showModal: function (postCollected, collected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            content: collected ? "收藏该文章？" : "取消收藏该文章？",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    //更新文章是否收藏的缓存值
                    wx.setStorageSync('post_collected', postCollected);
                    that.setData({ collected: collected });//更新数据绑定变量 实现图片切换
                }
            }
        });
    },
    //弹窗
    showToast: function (postCollected, collected) {
        // 更新文章是否的缓存值
        wx.setStorageSync('post_collected', postCollected);
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: collected
        });
        wx.showToast({
            title: collected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        });
    },
    //分享
    onShareTap: function (event) {

        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // res.cancel 用户是不是点击了取消按钮
                // res.tapIndex 数组元素的序号，从0开始
                wx.showModal({
                    title: "用户 " + itemList[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
                });
            }
        });
    },
    //音乐播放
    onMusicTap: function () {
        var isPlayingMusic = this.data.isPlayingMusic;
        var postid = this.data.currentpostid;
        var currentData = postData.postList[postid];
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio({

            })
            this.setData({
                isPlayingMusic: false
            });
              app.globalData.g_isPlayingMusic = false;
        } else {

            wx.playBackgroundAudio({
                dataUrl: currentData.music.url,
                title: currentData.music.title,
                coverImgUrl: currentData.music.coverImg,

            });
            this.setData({
                isPlayingMusic: true
            });
             app.globalData.g_currentMusicPostId = this.data.currentpostid;
              app.globalData.g_isPlayingMusic = true;
        }

    },

})
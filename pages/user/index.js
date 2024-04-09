// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: [],
        collectNums: 0
    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo')
        const collect = wx.getStorageSync('collect') || []
        this.setData({
            userInfo,
            collectNums: collect.length
        })
    },
    onShareAppMessage(){
      return{
        title:'这是一个很好逛的商场',
        path:'/pages/user/index',
        imageUrl:'../../icons/cart.png'
      }
    },
    onShareTimeline(){
      return{
        title:'这是一个很好逛的商场',
        path:'/pages/user/index',
        imageUrl:'../../icons/cart.png'
      }
    }

})
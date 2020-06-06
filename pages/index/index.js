import {
    request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    data: {
        swiperList: [], //轮播图数组
        catesList: [], //导航数组
        floorList: [] //楼层数组
    },


    onLoad: function(options) {
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })

        //     },
        // })
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()
    },
    async getSwiperList() {
        const res = await request({
            url: "/home/swiperdata"
        })


        this.setData({
            swiperList: res
        })
        const {
            swiperList
        } = this.data
        swiperList.forEach(v => {
            v.navigator_url = v.navigator_url.replace(/\main/g, '\index')
        })
        this.setData({
            swiperList
        })
    },
    async getCatesList() {
        const res = await request({
            url: "/home/catitems"
        })
        this.setData({
            catesList: res
        })
    },
    async getFloorList() {

        const res = await request({
            url: "/home/floordata"
        })
        res.forEach(v => {
            console.log(v.product_list)

        })

        this.setData({
            floorList: res
        })
        const {
            floorList
        } = this.data
        floorList.forEach(v => {
            v.product_list.forEach(v => {
                v.navigator_url = v.navigator_url.replace(/\goods_list/g, '\goods_list\index')
            })

        })
        this.setData({
            floorList
        })


    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
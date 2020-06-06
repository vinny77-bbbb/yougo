import {
    request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: "全部",
            isActive: true
        }, {
            id: 1,
            value: "待付款",
            isActive: false
        }, {
            id: 2,
            value: "待发货",
            isActive: false
        }, {
            id: 2,
            value: "退款/退货",
            isActive: false
        }],
        orders: []
    },


    onShow: function(options) {
        let pages = getCurrentPages();
        console.log(pages);
        let currentPage = pages[pages.length - 1]
        const {
            type
        } = currentPage.options
        this.changeTitleByIndex(type - 1)
        this.getOrders(type)
    },
    //获取订单列表方法
    async getOrders(type) {
        // const token = wx.getStorageSync('token');
        // if (!token) {
        //     wx.navigateTo({
        //         url: '/pages/auth/index',
        //     })
        //     return;
        // }
        const res = await request({
                url: "/my/orders/all",
                data: {
                    type
                }
            })
            //meiyou数据屏蔽了
            // this.setData({
            //     orders: res.orders
            // })
    },

    //根据标题索引来激活选中标题数组
    changeTitleByIndex(index) {
        let {
            tabs
        } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    handleTabsItemChange(e) {
        const {
            index
        } = e.detail
        this.changeTitleByIndex(index)
        this.getOrders(index + 1)
    }

})
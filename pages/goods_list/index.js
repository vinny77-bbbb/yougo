import {
    request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    data: {
        tabs: [{
            id: 0,
            value: "综合",
            isActive: true
        }, {
            id: 1,
            value: "销量",
            isActive: false
        }, {
            id: 2,
            value: "价格",
            isActive: false
        }],
        goodsList: [],
        totalpage: 1
    },
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    async getGoodsList() {

        const res = await request({
            url: "/goods/search",
            data: this.QueryParams
        })
        const total = res.total
        this.totalpage = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })

        //关闭下拉刷新窗口
        wx.stopPullDownRefresh()

    },
    onLoad: function(options) {
        this.QueryParams.cid = options.cid || ''
        this.QueryParams.query = options.query || ''
        console.log(options);

        this.getGoodsList()

    },
    handleTabsItemChange(e) {
        const {
            index
        } = e.detail
        let {
            tabs
        } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    //滚动条触底事件
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalpage) {
            //没有下一页了
            wx.showToast({
                title: '没有下一页数据了'
            });
        } else {
            this.QueryParams.pagenum++
                this.getGoodsList()
        }
    },
    //出发下拉刷新
    onPullDownRefresh() {
        this.QueryParams.pagenum = 1
        this.setData({
            goodsList: []
        })
        this.getGoodsList()
    }


})
// pages/cart/index.js
import {
    chooseAddress,
    getSetting,
    openSetting,
    showModal,
    showToast,
    requestPayment
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
    request
} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        cart: [],
        totalNum: 0,
        totalPrice: 0
    },
    onShow() {
        const address = wx.getStorageSync("address") || []
        let cart = wx.getStorageSync('cart')
            //过滤后的购物车数组
        cart = cart.filter(v => v.checked)

        let totalNum = 0
        let totalPrice = 0

        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        })

        this.setData({
            cart,
            address,
            totalNum,
            totalPrice
        })


    },
    async handleOrderPay() {
        try {
            //判断是否有token 需要token才能获取订单编号
            const token = wx.getStorageSync('token')
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index'
                })
                return
            }

            const order_price = this.data.totalPrice
            const consignee_addr = this.data.address.all
            const cart = this.data.cart
            let goods = []
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: goods_price
            }))
            const orderParams = {
                    order_price,
                    consignee_addr,
                    goods
                }
                //获取订单编号才能去支付
            const {
                order_number
            } = await request({
                    url: "/v1/my/orders/create",
                    data: orderParams,
                })
                //发起预支付接口
            const {
                pay
            } = await request({
                    url: "/my/orders/req_unifiedorder",
                    data: order_number,
                    method: "post"
                }) //发起微信支付
            await requestPayment(pay)
                //查询后台订单状态
            await request({
                url: "/my/orders/chkOrder",
                data: order_number,
                method: "post"
            })
            await showToast({
                title: "支付成功"
            })
            删除缓存在购买过的商品
            let newCart = wx.getStorageSync('cart')
            newCart = newCart.filter(v => !v.checked)
            wx.setStorageSync('cart', newCart)
            wx.navigateTo({
                url: '/pages/order/index'

            });



        } catch (error) {
            await showToast({
                title: "支付失败"
            })

            console.log(error);

        }
    }



})
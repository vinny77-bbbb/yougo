// pages/cart/index.js
import {
    chooseAddress,
    getSetting,
    openSetting,
    showModal,
    showToast
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        cart: [],
        allChecked: false,
        totalNum: 0,
        totalPrice: 0
    },
    onShow() {
        const address = wx.getStorageSync("address") || []
        const cart = wx.getStorageSync('cart')
        this.setData({
            address
        })
        this.setCart(cart)

    },
    async handleChooseAddress() {
        try {

            //查看权限状态，是否获取地址
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"]
                //获取地址权限=false,打开获取权限界面
            if (scopeAddress === false) {
                await openSetting()
            }
            //获取地址
            const address = await chooseAddress()
                //console.log(res2);
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
            wx.setStorageSync('address', address)

        } catch (error) {
            console.log(error);

        }
    }, //商品的选中事件
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id
        let {
            cart
        } = this.data
        let index = cart.findIndex(v => v.goods_id === goods_id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)

    },
    //设置购物车状态，重新计算底部工具栏数据 全选总价格购买
    setCart(cart) {
        let allChecked = true
        let totalNum = 0
        let totalPrice = 0
        if (cart.length != 0) {
            cart.forEach(v => {
                if (v.checked) {
                    totalPrice += v.num * v.goods_price
                    totalNum += v.num
                } else {
                    allChecked = false
                }
            })
        }
        allChecked = cart.length != 0 ? allChecked : false

        this.setData({
            cart,
            allChecked,
            totalNum,
            totalPrice
        })
        wx.setStorageSync('cart', cart)
    }, //全选事件
    handleAllCheckedChange() {
        let {
            allChecked,
            cart
        } = this.data
        allChecked = !allChecked
        cart.forEach(v => v.checked = allChecked)
        this.setCart(cart)
    },
    //商品数量事件
    async handleItemNumChange(e) {
        const {
            operation,
            id
        } = e.currentTarget.dataset
        let {
            cart
        } = this.data
        const index = cart.findIndex(v => v.goods_id === id)
        if (cart[index].num === 1 && operation === -1) {
            //cart[index].num = 1
            const res = await showModal({
                content: "是否确定删除?"
            })
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart)
            }
        } else {
            cart[index].num += operation
            this.setCart(cart)
        }
        //cart[index] += operation
        //this.setCart(cart)
    },
    //结算
    async handlePay() {
        const {
            address,
            totalNum
        } = this.data;
        if (!address.userName) {
            await showToast({
                title: '您还没有选择收货地址'
            })
            return
        }
        if (totalNum === 0) {
            await showToast({
                title: '您还没有选择商品'
            })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index'
        })
    }


})
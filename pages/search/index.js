import {
    request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    data: {
        goods: [],
        isFocus: false,
        inpValue: ''
    },
    TimeId: -1,
    handleInput(e) {
        const {
            value
        } = e.detail
        if (!value) {
            this.setData({
                isFocus: false,
                goods: []
            })
            return
        }
        this.setData({
            isFocus: true
        })
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    async qsearch(query) {
        const res = await request({
            url: "/goods/qsearch",
            data: {
                query
            }
        })
        this.setData({
            goods: res
        })

    },
    handleCancle() {
        this.setData({
            inpValue: '',
            isFocus: false,
            goods: []
        })
    }
})
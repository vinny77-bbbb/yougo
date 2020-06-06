// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: "体验问题",
            isActive: true
        }, {
            id: 1,
            value: "商品、商家投诉",
            isActive: false
        }],
        chooseImg: [],
        textValue: ''
    }, //外网图片路径数组
    upLoadImg: [],
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
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log(res);
                this.setData({
                    chooseImg: [...this.data.chooseImg, ...res.tempFilePaths]
                })


            }
        })

    },
    handleRemoveImg(e) {
        const {
            index
        } = e.currentTarget.dataset
        let {
            chooseImg
        } = this.data
        chooseImg.splice(index, 1)
        this.setData({
            chooseImg
        })

    },
    handleInput(e) {
        this.setData({
            textValue: e.detail.value
        })
    },
    handleFormSubmit() {
        const {
            textValue,
            chooseImg
        } = this.data

        if (!textValue.trim()) {
            wx.showToast({
                title: '输入不合法',
                mask: true
            })
            return
        }
        wx.showLoading({
            title: '正在上传中',
        })
        if (chooseImg.length != 0) {
            chooseImg.forEach((v, i) => {
                wx.uploadFile({
                    filePath: v,
                    name: 'file',
                    url: 'https://images.ac.cn/simple.html',
                    formData: '',
                    success: (res) => {
                        let url = JSON.parse(res.data).url
                        this.upLoadImg.push(url)
                        if (i === chooseImg.length - 1) {
                            wx.hideLoading()
                            console.log("提交");
                            this.setData({
                                textValue: "",
                                chooseImg: []
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        }


                    }
                })
            })
        } else {
            wx.hideLoading()
            console.log('提交了文本');
            wx.navigateBack({
                delta: 1
            })

        }



    }
})
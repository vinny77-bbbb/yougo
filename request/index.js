let ajaxtimes = 0
export const request = (params) => {
    //判断url中是否带有/my/ 请求的是私有路径，带上header
    let header = {
        ...params
    }
    if (params.url.includes('/my/')) {
        //拼接一下header 带上token
        header["Authorization"] = wx.getStorageSync('token')
    }


    //显示加载中
    ajaxtimes++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })


    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,

            url: baseURL + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxtimes--;
                if (ajaxtimes === 0)
                    wx.hideLoading()
            }
        })
    })
}
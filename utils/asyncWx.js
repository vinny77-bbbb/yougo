//promise形式getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

//promise 形式 chooseAddress
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

//promise 形式 openSetting
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

/*promise 形式 showModal
 *  @params{object} param0
 */
export const showModal = ({
    content
}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

//promise 形式 showToast
export const showToast = ({
    title
}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

//promise 形式 login
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

//promise 形式 requestPayment
export const requestPayment = ({
    pay
}) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
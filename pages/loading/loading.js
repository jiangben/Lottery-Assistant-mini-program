const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 获取用户信息接口后的处理逻辑
   */
  getUserInfo: function (e) {
    // 将获取的用户信息赋值给全局 userInfo 变量，再跳回之前页
    if (e.detail.userInfo) {
      console.log( e.detail.userInfo)
      wx.login({
        success: function (res) {
          var code = res.code
          var pdata = e.detail.userInfo
          pdata.code = code
          wx.request({
            method: 'POST',
            url: 'https://ddgad.com/cjzs/wxLogin',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: pdata,
            success: function (res3) {
             var  newinfo = res3.data.data
              wx.setStorageSync("@appauth", newinfo)
              console.log(newinfo )
              app.globalData.userInfo = newinfo
              wx.navigateBack()
            }
          })
        }
      })

      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }

  }
})
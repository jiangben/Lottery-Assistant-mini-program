//app.js

App({
  onLaunch: function () {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  dpost: function (method, data, cb, cp) {
    var token = this.globalData.userInfo.token
    if (!token) {
      var auth = wx.getStorageSync("@appauth")
      token = auth.token
    }
    var that = this
    data.token = token
    wx.request({
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      url: 'https://ddgad.com/cjzs/' + method,
      success: function (res) {
        if( res.data.error_code == 401){
          wx.navigateTo({
            url: '/pages/loading/loading'
          })
          return;
        }
        if (res.data.code !=200  ) {
          console.log('error', res.data )
          that.showerr(res.data.error_message )
          return;
        }
        var data = res.data.data

        typeof cb == "function" && cb(data)
      },
      complete: function () {
        typeof cp == "function" && cp()
      }
    })
  },
  getSysInfo: function (cb) {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        typeof cb == "function" && cb(res);
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this;
    var auth = wx.getStorageSync("@appauth")
    console.log( auth )
    let time = new Date().getTime()
    if (auth && auth.time && time - auth.time < 3600 * 1000) {
      console.log('cache login', auth)
      that.globalData.userInfo = auth
      typeof cb == "function" && cb(auth)
    } else if (this.globalData.userInfo && this.globalData.userInfo.token) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
  },
  showmsg(msg, duration = 2000) {
    if( !!msg ){
      wx.showToast({
        title: msg,
        icon: 'info',
        duration: duration,
        mask: true
      })
    }
  },
  showerr(msg) {
    if (!!msg) {
      wx.showToast({
        title: msg,
        image: '/img/error.png',
        duration: 2000,
        mask: true
      })
    }
  },
  globalData: {
    userInfo: {},
    point: {}
  }
})

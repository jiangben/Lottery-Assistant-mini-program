// pages/active/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( "onload")
    this.load_active()
  },

  load_active: function () {
    var that = this
    that.setData({ hidden: false })
    app.dpost('info', {}, function (res1) {
      that.setData({ hidden: true })  
      if( !res1.is_login){
        wx.navigateTo({
          url: '/pages/loading/loading'
        })
      }else{
        that.get_active( res1.active_id )
      }
    })
  },
  get_active: function( active_id ){
    var that = this
    that.setData({ hidden: false })
    app.dpost('activeInfo', { active_id: active_id}, function (res) {
      that.setData({ hidden: true })
      console.log( res )
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
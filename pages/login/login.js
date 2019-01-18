// pages/login/login.js

var plugin = requirePlugin("myPlugin")

var cellphone = ''
var password = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: {
      cellphone: "",
      password: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log('onLoad', options)
    plugin.setLoginOnLaunchOption(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    plugin.checkSession({
      success: function(data) {
        if (data.isLogged) {
          wx.redirectTo({
            url: data.pageUrl,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  inputCellphone: function(e) {
    var that = this
    console.log('inputCellphone', e.detail.value)
    cellphone = e.detail.value
  },

  inputPassword: function(e) {
    var that = this
    console.log('inputPassword', e.detail.value)
    password = e.detail.value
  },


  // 用户登录示例
  login: function(e) {
    var that = this

    plugin.login({
      data: {
        cc: 86,
        phone: cellphone,
        password: password
      },
      success: function(res) {
        console.log('success', res)
        wx.showToast({
          title: res.msg,
        })
        wx.redirectTo({
          url: res.pageUrl,
        })
      },
      fail: function(e) {
        console.log('fail', e)
        wx.showModal({
          title: '登录失败',
          content: e.message,
          showCancel: false
        })
      }
    })
  }
})
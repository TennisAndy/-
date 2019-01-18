// miniprogram/pages/register/register.js

var plugin = requirePlugin("myPlugin")

const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

var cellphone = ''
var inputCode = ''
var password = ''
var exp
var token

Page({

  /**
   * 页面的初始数据
   */
  data: {
    send: '验证码',
    action:'注册',
    sendDisable: true,
    actionDisable: true,
    account: {
      cellphone: "",
      password: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('onLoad', options)

    that.setData({
      action: options.action
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
    var that = this
    plugin.checkSession({
      success: function (data) {
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
    wx.stopPullDownRefresh()
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

  },

  inputCellphone: function (e) {
    var that = this
    console.log('inputCellphone', e)
    cellphone = e.detail.value
    if (phoneReg.test(cellphone)) {
      that.setData({
        sendDisable: false
      })
    }
  },

  inputSmscode: function (e) {
    var that = this
    console.log('inputSmscode', e)
    inputCode = e.detail.value
    if (inputCode.length == 6) {
      that.setData({
        actionDisable: false
      })
    } else {
      that.setData({
        actionDisable: true
      })
    }
  },

  onClickSend: function () {
    var that = this
    var i = 60
    var timer = setInterval(function () {
      if (i-- > 0) {
        that.setData({
          send: `${i}秒`,
          sendDisable: true
        })
      } else {
        that.setData({
          send: '验证码',
          sendDisable: false
        })
        clearInterval(timer)
      }
    }, 1000)

    plugin.sendSmsCode({
      data:{
        cc:86,
        phone:cellphone
      },
      success: function(data){
        switch (data.code) {
          case 200: {
            exp = data.data.exp
            token = data.data.token
            break;
          }
          default: {
            wx.showModal({
              title: '请求失败',
              content: data.msg,
              showCancel: false
            })
          }
        }
      },
      fail: function(e){
        wx.showModal({
          title: '请求失败',
          content: e.message,
          showCancel: false
        })
        console.log('request fail', e)
      }
    })
  },

  inputPassword: function (e) {
    var that = this
    console.log('inputPassword', e.detail.value)
    password = e.detail.value
  },

  onGotUserInfo(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    var userInfo = e.detail.userInfo

    if (userInfo == undefined){
      wx.showToast({
        title: '获取用户信息失败！',
      })
      return 
    }
    userInfo.cc = 86
    userInfo.phone = cellphone
    userInfo.password = password
    userInfo.smscode = inputCode
    userInfo.exp = exp
    userInfo.token = token

    console.log("userInfo", userInfo)

    plugin.register({
      data: userInfo,
      success: function (data) {
        switch (data.code) {
          case 200: {
            wx.showToast({
              title: data.msg,
            })
            setTimeout(function(){
              wx.navigateBack({
                detal: -1
              })
            },2000)
            break;
          }
          default: {
            wx.showModal({
              title: '请求失败',
              content: data.msg,
              showCancel: false
            })
          }
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '请求失败',
          content: e.message,
          showCancel: false
        })
        console.log('request fail', e)
      }
    })
  }
})
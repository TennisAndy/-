//app.js
var plugin = requirePlugin("myPlugin")

App({
  onLaunch: function() {
    plugin.onLaunch()
  },
  onShow: function() {
    plugin.onShow()
  },
  onHide: function() {
    plugin.onHide()
  }
})
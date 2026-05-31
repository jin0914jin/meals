App({
  onLaunch() {
    this.enableDebugPanel()
  },

  enableDebugPanel() {
    if (!wx.setEnableDebug) {
      return
    }

    const accountInfo = wx.getAccountInfoSync ? wx.getAccountInfoSync() : {}
    const envVersion = accountInfo.miniProgram && accountInfo.miniProgram.envVersion

    if (envVersion === 'release') {
      return
    }

    wx.setEnableDebug({
      enableDebug: true
    })
  },

  globalData: {
    appName: '今天吃什么'
  }
})

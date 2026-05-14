const { getRecipe, removeRecipe } = require('../../utils/storage')
const { getCategoryName } = require('../../utils/categories')
const { formatDateTime } = require('../../utils/format')

Page({
  data: {
    id: '',
    recipe: null,
    categoryName: '',
    updatedText: ''
  },

  onLoad(options) {
    this.setData({ id: options.id || '' })
  },

  onShow() {
    this.loadRecipe()
  },

  loadRecipe() {
    const recipe = getRecipe(this.data.id)

    if (!recipe) {
      wx.showToast({
        title: '菜谱不存在',
        icon: 'none'
      })

      setTimeout(() => {
        wx.navigateBack()
      }, 700)
      return
    }

    this.setData({
      recipe: {
        ...recipe,
        coverText: (recipe.title || '菜').slice(0, 1)
      },
      categoryName: getCategoryName(recipe.category),
      updatedText: formatDateTime(recipe.updatedAt)
    })
  },

  goEdit() {
    wx.navigateTo({
      url: `/pages/edit/edit?id=${this.data.id}`
    })
  },

  deleteRecipe() {
    wx.showModal({
      title: '删除菜谱',
      content: '删除后无法在本机恢复，确定要删除吗？',
      confirmText: '删除',
      confirmColor: '#b54836',
      success: result => {
        if (!result.confirm) {
          return
        }

        const removed = removeRecipe(this.data.id)
        this.removeImageFile(removed && removed.imagePath)

        wx.showToast({
          title: '已删除',
          icon: 'success'
        })

        setTimeout(() => {
          wx.navigateBack()
        }, 500)
      }
    })
  },

  removeImageFile(path) {
    if (!path) {
      return
    }

    wx.removeSavedFile({
      filePath: path,
      fail() {}
    })
  }
})

const { categories, getCategoryIndex } = require('../../utils/categories')
const { getRecipe, createRecipeId, upsertRecipe } = require('../../utils/storage')

Page({
  data: {
    id: '',
    isEditing: false,
    openedFromDetail: false,
    categories,
    categoryIndex: getCategoryIndex('other'),
    categoryName: categories[getCategoryIndex('other')].name,
    title: '',
    category: 'other',
    ingredients: '',
    steps: '',
    note: '',
    imagePath: '',
    selectedImagePath: '',
    originalImagePath: '',
    focusField: '',
    dirty: false,
    saving: false
  },

  onLoad(options) {
    const id = options.id || ''

    if (id) {
      const recipe = getRecipe(id)
      if (!recipe) {
        wx.showToast({
          title: '菜谱不存在',
          icon: 'none'
        })
        setTimeout(() => wx.navigateBack(), 700)
        return
      }

      this.setData({
        id,
        isEditing: true,
        openedFromDetail: true,
        title: recipe.title || '',
        category: recipe.category || 'other',
        categoryIndex: getCategoryIndex(recipe.category || 'other'),
        categoryName: categories[getCategoryIndex(recipe.category || 'other')].name,
        ingredients: recipe.ingredients || '',
        steps: recipe.steps || '',
        note: recipe.note || '',
        imagePath: recipe.imagePath || '',
        originalImagePath: recipe.imagePath || ''
      })
      wx.setNavigationBarTitle({ title: '编辑菜谱' })
      return
    }

    wx.setNavigationBarTitle({ title: '新增菜谱' })
  },

  onUnload() {
    this.disableUnsavedAlert()
  },

  onInput(event) {
    const { field } = event.currentTarget.dataset
    this.setData({
      [field]: event.detail.value,
      dirty: true
    }, () => {
      this.enableUnsavedAlert()
    })
  },

  onFieldFocus(event) {
    this.setData({
      focusField: event.currentTarget.dataset.field || ''
    })
  },

  onFieldBlur() {
    this.setData({
      focusField: ''
    })
  },

  onCategoryChange(event) {
    const index = Number(event.detail.value)
    const category = this.data.categories[index].key
    this.setData({
      categoryIndex: index,
      category,
      categoryName: this.data.categories[index].name,
      dirty: true
    }, () => {
      this.enableUnsavedAlert()
    })
  },

  choosePhoto() {
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: result => {
        const sourceType = result.tapIndex === 0 ? ['camera'] : ['album']
        this.pickImage(sourceType)
      }
    })
  },

  pickImage(sourceType) {
    if (wx.chooseMedia) {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType,
        sizeType: ['compressed'],
        success: result => {
          const file = result.tempFiles && result.tempFiles[0]
          if (file && file.tempFilePath) {
            this.setSelectedImage(file.tempFilePath)
          }
        }
      })
      return
    }

    wx.chooseImage({
      count: 1,
      sourceType,
      sizeType: ['compressed'],
      success: result => {
        if (result.tempFilePaths && result.tempFilePaths[0]) {
          this.setSelectedImage(result.tempFilePaths[0])
        }
      }
    })
  },

  setSelectedImage(path) {
    this.setData({
      imagePath: path,
      selectedImagePath: path,
      dirty: true
    }, () => {
      this.enableUnsavedAlert()
    })
  },

  removePhoto() {
    this.setData({
      imagePath: '',
      selectedImagePath: '',
      dirty: true
    }, () => {
      this.enableUnsavedAlert()
    })
  },

  async saveRecipe() {
    if (this.data.saving) {
      return
    }

    const title = this.data.title.trim()
    if (!title) {
      wx.showToast({
        title: '先写菜名',
        icon: 'none'
      })
      return
    }

    this.setData({ saving: true })

    try {
      const now = new Date().toISOString()
      const existing = this.data.isEditing ? getRecipe(this.data.id) : null
      const imagePath = await this.resolveImagePath()

      const recipe = {
        id: this.data.id || createRecipeId(),
        title,
        category: this.data.category,
        ingredients: this.data.ingredients.trim(),
        steps: this.data.steps.trim(),
        note: this.data.note.trim(),
        imagePath,
        createdAt: existing && existing.createdAt ? existing.createdAt : now,
        updatedAt: now
      }

      upsertRecipe(recipe)
      this.removeReplacedImage(imagePath)
      this.disableUnsavedAlert()

      this.setData({
        dirty: false,
        saving: false,
        id: recipe.id,
        isEditing: true,
        originalImagePath: imagePath,
        selectedImagePath: ''
      })

      wx.showToast({
        title: '已保存',
        icon: 'success'
      })

      setTimeout(() => {
        if (this.data.openedFromDetail) {
          wx.navigateBack()
          return
        }

        wx.redirectTo({
          url: `/pages/detail/detail?id=${recipe.id}`
        })
      }, 450)
    } catch (error) {
      this.setData({ saving: false })
      wx.showToast({
        title: '图片保存失败',
        icon: 'none'
      })
    }
  },

  resolveImagePath() {
    const selectedImagePath = this.data.selectedImagePath
    if (!selectedImagePath) {
      return Promise.resolve(this.data.imagePath)
    }

    return new Promise((resolve, reject) => {
      wx.saveFile({
        tempFilePath: selectedImagePath,
        success: result => resolve(result.savedFilePath),
        fail: reject
      })
    })
  },

  removeReplacedImage(nextPath) {
    const previousPath = this.data.originalImagePath
    if (!previousPath || previousPath === nextPath) {
      return
    }

    wx.removeSavedFile({
      filePath: previousPath,
      fail() {}
    })
  },

  enableUnsavedAlert() {
    if (!wx.enableAlertBeforeUnload) {
      return
    }

    wx.enableAlertBeforeUnload({
      message: '当前菜谱还没有保存，确定离开吗？'
    })
  },

  disableUnsavedAlert() {
    if (!wx.disableAlertBeforeUnload) {
      return
    }

    wx.disableAlertBeforeUnload()
  }
})

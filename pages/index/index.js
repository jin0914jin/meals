const storage = require('../../utils/storage')
const categoryUtils = require('../../utils/categories')
const formatUtils = require('../../utils/format')
const mealSetUtils = require('../../utils/mealSet')

const EMPTY_RECIPE = {
  id: '',
  title: '',
  category: 'other',
  categoryName: '',
  coverText: '菜',
  imagePath: '',
  ingredients: '',
  note: '',
  randomNoteText: ''
}

const EMPTY_MEAL_SET = {
  title: '',
  subtitle: '',
  recipes: []
}

Page({
  data: {
    categories: categoryUtils.filterCategories,
    activeCategory: 'all',
    query: '',
    recipes: [],
    filteredRecipes: [],
    emptyTitle: '还没有菜谱',
    emptyText: '先把最近做过的一道菜拍下来，慢慢就会变成你的私人菜单。',
    showCreateEmpty: true,
    showFilterActions: false,
    activeCategoryName: '全部',
    randomCardScopeText: '全部菜谱',
    randomAvailableText: '先保存几道常做菜',
    filteredCountText: '0 道菜',
    mealHintText: '至少 2 道菜可生成套餐',
    canPickRandom: false,
    canGenerateMeal: false,
    randomVisible: false,
    randomRecipe: EMPTY_RECIPE,
    randomScopeText: '全部菜谱',
    mealSetVisible: false,
    mealSet: EMPTY_MEAL_SET
  },

  onShow() {
    this.loadRecipes()
  },

  loadRecipes() {
    const recipes = storage.readRecipes()
      .map(recipe => Object.assign({}, recipe, {
        coverText: (recipe.title || '菜').slice(0, 1),
        categoryName: categoryUtils.getCategoryName(recipe.category),
        updatedText: formatUtils.formatDateTime(recipe.updatedAt) || '刚刚更新',
        summaryText: recipe.ingredients || recipe.note || '还没有记录食材和备注'
      }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    this.setData({ recipes }, () => {
      this.applyFilters()
    })
  },

  onSearchInput(event) {
    this.setData({ query: event.detail.value }, () => {
      this.applyFilters()
    })
  },

  onCategoryTap(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.key }, () => {
      this.applyFilters()
    })
  },

  applyFilters() {
    const query = this.data.query.trim().toLowerCase()
    const activeCategory = this.data.activeCategory

    const categories = categoryUtils.filterCategories.map(category => ({
      key: category.key,
      name: category.name,
      activeClass: category.key === activeCategory ? 'is-active' : ''
    }))

    const filteredRecipes = this.data.recipes.filter(recipe => {
      const matchCategory = activeCategory === 'all' || recipe.category === activeCategory
      const searchSource = `${recipe.title || ''} ${recipe.ingredients || ''} ${recipe.note || ''}`.toLowerCase()
      const matchQuery = !query || searchSource.includes(query)
      return matchCategory && matchQuery
    })

    const hasFilter = activeCategory !== 'all' || Boolean(query)
    const randomCount = hasFilter ? filteredRecipes.length : this.data.recipes.length
    const activeCategoryItem = categoryUtils.filterCategories.find(category => category.key === activeCategory)
    const activeCategoryName = activeCategoryItem ? activeCategoryItem.name : '全部'
    const totalCount = this.data.recipes.length
    const mealHintText = totalCount >= 2 ? '缺少某类也会自动补位' : '再加 ' + (2 - totalCount) + ' 道可生成套餐'

    this.setData({
      categories,
      filteredRecipes,
      emptyTitle: this.data.recipes.length ? '没有找到符合条件的菜' : '还没有菜谱',
      emptyText: this.data.recipes.length ? '换个关键词或分类试试。' : '先把最近做过的一道菜拍下来，慢慢就会变成你的私人菜单。',
      showCreateEmpty: !this.data.recipes.length,
      showFilterActions: Boolean(this.data.recipes.length),
      activeCategoryName,
      randomCardScopeText: hasFilter ? '当前筛选' : '全部菜谱',
      randomAvailableText: this.data.recipes.length ? `${randomCount} 道可选` : '先保存几道常做菜',
      filteredCountText: `${filteredRecipes.length} 道菜`,
      mealHintText,
      canPickRandom: randomCount > 0,
      canGenerateMeal: this.data.recipes.length >= 2
    })
  },

  pickRandomRecipe() {
    const hasFilter = this.data.activeCategory !== 'all' || Boolean(this.data.query.trim())
    const pool = hasFilter ? this.data.filteredRecipes : this.data.recipes

    if (!this.data.recipes.length) {
      wx.showToast({
        title: '先新增一道菜',
        icon: 'none'
      })
      return
    }

    if (!pool.length) {
      wx.showToast({
        title: '当前条件没有菜',
        icon: 'none'
      })
      return
    }

    const randomIndex = Math.floor(Math.random() * pool.length)
    const randomRecipe = pool[randomIndex]

    this.setData({
      randomVisible: true,
      randomRecipe: Object.assign({}, randomRecipe, {
        randomNoteText: randomRecipe.ingredients || randomRecipe.note || '这道菜还没有补充食材和备注'
      }),
      randomScopeText: hasFilter ? '当前筛选 ' + pool.length + ' 道' : '全部 ' + pool.length + ' 道'
    })
  },

  closeRandomPanel() {
    this.setData({
      randomVisible: false,
      randomRecipe: EMPTY_RECIPE
    })
  },

  noop() {},

  clearSearch() {
    this.setData({ query: '' }, () => {
      this.applyFilters()
    })
  },

  showAllRecipes() {
    this.setData({
      query: '',
      activeCategory: 'all'
    }, () => {
      this.applyFilters()
    })
  },

  goRandomDetail() {
    if (!this.data.randomRecipe.id) {
      return
    }

    const id = this.data.randomRecipe.id
    this.closeRandomPanel()
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  goCreate() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },

  goDetail(event) {
    const { id } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  generateMealSet() {
    if (this.data.recipes.length < 2) {
      wx.showToast({
        title: '至少需要 2 道菜',
        icon: 'none'
      })
      return
    }

    const mealSet = mealSetUtils.generateMealSet(this.data.recipes)

    if (!mealSet.recipes.length) {
      wx.showToast({
        title: '先新增几道菜',
        icon: 'none'
      })
      return
    }

    this.setData({
      mealSet,
      mealSetVisible: true
    })
  },

  closeMealSetPanel() {
    this.setData({
      mealSetVisible: false,
      mealSet: EMPTY_MEAL_SET
    })
  },

  goMealRecipeDetail(event) {
    const { id } = event.currentTarget.dataset
    this.closeMealSetPanel()
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})

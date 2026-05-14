const categoryUtils = require('./categories')

const DEFAULT_TEMPLATE = [
  { category: 'meat', label: '荤菜' },
  { category: 'vegetable', label: '素菜' },
  { category: 'soup', label: '汤' }
]

function shuffle(items) {
  return items.slice().sort(() => Math.random() - 0.5)
}

function pickByCategory(recipes, category, usedIds) {
  const candidates = recipes.filter(recipe => recipe.category === category && !usedIds.has(recipe.id))
  return shuffle(candidates)[0]
}

function pickFallback(recipes, usedIds) {
  const candidates = recipes.filter(recipe => !usedIds.has(recipe.id))
  return shuffle(candidates)[0]
}

function normalizeRecipe(recipe) {
  return Object.assign({}, recipe, {
    coverText: (recipe.title || '菜').slice(0, 1),
    categoryName: categoryUtils.getCategoryName(recipe.category)
  })
}

function generateMealSet(recipes) {
  const availableRecipes = Array.isArray(recipes) ? recipes.filter(recipe => recipe && recipe.id) : []
  const usedIds = new Set()
  const picked = []
  const missingLabels = []

  DEFAULT_TEMPLATE.forEach(item => {
    const categoryPick = pickByCategory(availableRecipes, item.category, usedIds)
    const recipe = categoryPick || pickFallback(availableRecipes, usedIds)

    if (!recipe) {
      missingLabels.push(item.label)
      return
    }

    if (!categoryPick) {
      missingLabels.push(item.label)
    }

    usedIds.add(recipe.id)
    picked.push(normalizeRecipe(recipe))
  })

  return {
    title: picked.length >= 3 ? '一荤一素一汤' : '家常简餐',
    subtitle: buildSubtitle(picked, missingLabels),
    recipes: picked,
    missingLabels
  }
}

function buildSubtitle(picked, missingLabels) {
  if (!picked.length) {
    return '先保存几道常做菜，再来搭配套餐'
  }

  if (!missingLabels.length) {
    return '搭配完整，可以开饭'
  }

  return missingLabels.join('、') + '不够，已用其他菜补上'
}

module.exports = {
  generateMealSet
}

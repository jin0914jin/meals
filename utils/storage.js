const RECIPES_KEY = 'recipes'
const SCHEMA_VERSION_KEY = 'schemaVersion'
const SCHEMA_VERSION = 1

function readRecipes() {
  try {
    const recipes = wx.getStorageSync(RECIPES_KEY)
    return Array.isArray(recipes) ? recipes : []
  } catch (error) {
    return []
  }
}

function saveRecipes(recipes) {
  wx.setStorageSync(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  wx.setStorageSync(RECIPES_KEY, recipes)
}

function getRecipe(id) {
  return readRecipes().find(recipe => recipe.id === id)
}

function createRecipeId() {
  return `recipe_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function upsertRecipe(recipe) {
  const recipes = readRecipes()
  const index = recipes.findIndex(item => item.id === recipe.id)

  if (index >= 0) {
    recipes[index] = recipe
  } else {
    recipes.unshift(recipe)
  }

  saveRecipes(recipes)
  return recipe
}

function removeRecipe(id) {
  const recipes = readRecipes()
  const target = recipes.find(recipe => recipe.id === id)
  saveRecipes(recipes.filter(recipe => recipe.id !== id))
  return target
}

module.exports = {
  readRecipes,
  saveRecipes,
  getRecipe,
  createRecipeId,
  upsertRecipe,
  removeRecipe
}

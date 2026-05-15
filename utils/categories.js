const categories = [
  { key: 'meat', name: '荤菜' },
  { key: 'vegetable', name: '素菜' },
  { key: 'soup', name: '汤' },
  { key: 'staple', name: '主食' },
  { key: 'breakfast', name: '早餐' },
  { key: 'dessert', name: '甜点' },
  { key: 'quick', name: '快手菜' },
  { key: 'home', name: '家常菜' },
  { key: 'rice', name: '下饭菜' },
  { key: 'favorite', name: '收藏' },
  { key: 'other', name: '其他' }
]

const filterCategories = [
  { key: 'all', name: '全部' },
  ...categories
]

function getCategoryName(key) {
  const item = categories.find(category => category.key === key)
  return item ? item.name : '其他'
}

function getCategoryIndex(key) {
  const index = categories.findIndex(category => category.key === key)
  return index >= 0 ? index : categories.length - 1
}

module.exports = {
  categories,
  filterCategories,
  getCategoryName,
  getCategoryIndex
}

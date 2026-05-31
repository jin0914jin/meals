// Figma use_figma script for the private cookbook mini program UI.
// Run this inside the Figma MCP use_figma tool with skillNames:
// "figma-use,figma-generate-design".

const colors = {
  page: { r: 251 / 255, g: 244 / 255, b: 230 / 255 },
  paper: { r: 255 / 255, g: 253 / 255, b: 247 / 255 },
  paperWarm: { r: 255 / 255, g: 243 / 255, b: 207 / 255 },
  textPrimary: { r: 79 / 255, g: 53 / 255, b: 31 / 255 },
  textBody: { r: 114 / 255, g: 93 / 255, b: 66 / 255 },
  textMuted: { r: 159 / 255, g: 146 / 255, b: 125 / 255 },
  teal: { r: 25 / 255, g: 187 / 255, b: 174 / 255 },
  tealDark: { r: 13 / 255, g: 141 / 255, b: 131 / 255 },
  yellow: { r: 255 / 255, g: 204 / 255, b: 0 },
  yellowDark: { r: 181 / 255, g: 106 / 255, b: 23 / 255 },
  wood: { r: 201 / 255, g: 121 / 255, b: 50 / 255 },
  warmBorder: { r: 227 / 255, g: 201 / 255, b: 153 / 255 }
}

const font = { family: 'Inter', style: 'Regular' }
const fontBold = { family: 'Inter', style: 'Bold' }
await figma.loadFontAsync(font)
await figma.loadFontAsync(fontBold)

function solid(color, opacity = 1) {
  return [{ type: 'SOLID', color, opacity }]
}

function shadow(color, y, blur, opacity) {
  return [{
    type: 'DROP_SHADOW',
    color: { ...color, a: opacity },
    offset: { x: 0, y },
    radius: blur,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL'
  }]
}

function frame(name, x, y, w, h, fill, radius = 0) {
  const node = figma.createFrame()
  node.name = name
  node.x = x
  node.y = y
  node.resize(w, h)
  node.fills = solid(fill)
  node.cornerRadius = radius
  node.clipsContent = false
  return node
}

function text(name, value, x, y, size, fill, weight = 'regular', width = null) {
  const node = figma.createText()
  node.name = name
  node.fontName = weight === 'bold' ? fontBold : font
  node.characters = value
  node.fontSize = size
  node.lineHeight = { unit: 'PERCENT', value: 120 }
  node.fills = solid(fill)
  node.x = x
  node.y = y
  if (width) {
    node.resize(width, node.height)
    node.textAutoResize = 'HEIGHT'
  }
  return node
}

function pill(name, x, y, w, h, fill, stroke, label, textColor, active = false) {
  const node = frame(name, x, y, w, h, fill, h / 2)
  node.strokes = solid(stroke)
  node.strokeWeight = active ? 1.5 : 1
  node.effects = shadow(active ? colors.tealDark : colors.warmBorder, active ? 3 : 2, 0, 1)
  const labelNode = text(`${name} Label`, label, x, y + h / 2 - 8, 13, textColor, 'bold')
  labelNode.textAlignHorizontal = 'CENTER'
  labelNode.resize(w, 18)
  return [node, labelNode]
}

function blobCard(name, x, y, w, h, fill) {
  const node = frame(name, x, y, w, h, fill, 22)
  node.strokes = solid(colors.warmBorder)
  node.strokeWeight = 2
  node.effects = shadow(colors.textPrimary, 8, 18, 0.12)
  return node
}

let page = figma.root.children.find(p => p.name === 'Cookbook UI')
if (!page) page = figma.createPage()
page.name = 'Cookbook UI'
await figma.setCurrentPageAsync(page)

const createdNodeIds = []
const maxX = page.children.reduce((max, child) => Math.max(max, child.x + child.width), 0)
const originX = maxX ? maxX + 160 : 80

const screen = frame('私人菜谱本 / 首页', originX, 80, 375, 812, colors.page, 28)
screen.effects = shadow(colors.textPrimary, 18, 40, 0.14)
createdNodeIds.push(screen.id)

const sign = blobCard('Brand Sign', 22, 24, 170, 58, colors.wood)
sign.cornerRadius = 24
sign.rotation = -2
screen.appendChild(sign)
createdNodeIds.push(sign.id)

const signText = text('Brand Sign Text', '私人菜谱本', 43, 43, 17, { r: 91 / 255, g: 52 / 255, b: 24 / 255 }, 'bold')
screen.appendChild(signText)
createdNodeIds.push(signText.id)

const sprout = figma.createVector()
sprout.name = 'Sprout Mark'
sprout.x = 157
sprout.y = 64
sprout.resize(22, 22)
sprout.fills = solid(colors.teal)
screen.appendChild(sprout)
createdNodeIds.push(sprout.id)

screen.appendChild(text('Page Title', '今天吃什么', 22, 104, 38, colors.textPrimary, 'bold', 220))
screen.appendChild(text('Recipe Count', '12 道菜', 268, 113, 14, colors.textBody, 'bold', 72))

const add = frame('Add Button', 328, 102, 41, 41, colors.yellow, 20.5)
add.strokes = solid(colors.yellowDark)
add.strokeWeight = 2
add.effects = shadow(colors.yellowDark, 4, 0, 1)
screen.appendChild(add)
screen.appendChild(text('Add Button Plus', '+', 340, 107, 28, colors.textPrimary, 'bold'))
createdNodeIds.push(add.id)

const search = frame('Search Field', 22, 166, 331, 48, colors.paper, 24)
search.strokes = solid(colors.warmBorder)
search.strokeWeight = 2
search.effects = shadow(colors.warmBorder, 3, 0, 1)
screen.appendChild(search)
screen.appendChild(text('Search Placeholder', '搜索菜名、食材或备注', 70, 181, 15, colors.textMuted, 'regular', 230))
createdNodeIds.push(search.id)

const chips = [
  ['全部', true], ['荤菜', false], ['素菜', false], ['汤', false], ['快手菜', false]
]
let chipX = 22
for (const [label, active] of chips) {
  const w = label.length > 2 ? 62 : 45
  const nodes = pill(`Category / ${label}`, chipX, 234, w, 31, active ? colors.teal : { r: 248 / 255, g: 241 / 255, b: 223 / 255 }, active ? colors.tealDark : colors.warmBorder, label, active ? colors.paper : colors.textBody, active)
  for (const node of nodes) {
    screen.appendChild(node)
    createdNodeIds.push(node.id)
  }
  chipX += w + 8
}

const categoryPanel = blobCard('More Category Panel', 22, 282, 331, 112, colors.paperWarm)
screen.appendChild(categoryPanel)
createdNodeIds.push(categoryPanel.id)
const moreLabels = ['主食', '甜点', '早餐', '家常菜', '下饭菜', '收藏']
for (let i = 0; i < moreLabels.length; i++) {
  const x = 42 + (i % 3) * 102
  const y = 304 + Math.floor(i / 3) * 42
  const nodes = pill(`More Category / ${moreLabels[i]}`, x, y, 82, 28, colors.paper, colors.warmBorder, moreLabels[i], colors.textBody)
  for (const node of nodes) {
    screen.appendChild(node)
    createdNodeIds.push(node.id)
  }
}

const decision = blobCard('Decision Board', 22, 418, 331, 126, colors.paperWarm)
screen.appendChild(decision)
screen.appendChild(text('Decision Title', '不知道吃什么？', 42, 442, 21, colors.textPrimary, 'bold', 180))
screen.appendChild(text('Decision Meta', '从你的菜谱里抽一道，或配一套今天的饭', 42, 474, 13, colors.textBody, 'regular', 220))
createdNodeIds.push(decision.id)

const randomBtn = frame('Button / Random', 42, 505, 128, 38, colors.teal, 19)
randomBtn.effects = shadow(colors.tealDark, 4, 0, 1)
screen.appendChild(randomBtn)
screen.appendChild(text('Button Random Label', '随机一道', 78, 517, 14, colors.paper, 'bold'))
createdNodeIds.push(randomBtn.id)

const mealBtn = frame('Button / Meal Set', 184, 505, 128, 38, colors.yellow, 19)
mealBtn.effects = shadow(colors.yellowDark, 4, 0, 1)
screen.appendChild(mealBtn)
screen.appendChild(text('Button Meal Label', '生成菜谱', 219, 517, 14, colors.textBody, 'bold'))
createdNodeIds.push(mealBtn.id)

screen.appendChild(text('Section Title', '我的菜谱', 42, 570, 17, colors.textPrimary, 'bold'))
screen.appendChild(text('Section Count', '全部 · 12 道', 269, 572, 13, colors.tealDark, 'bold'))

for (let i = 0; i < 3; i++) {
  const y = 606 + i * 82
  const card = blobCard(`Recipe Card ${i + 1}`, 22, y, 331, 70, colors.paper)
  card.cornerRadius = 18
  screen.appendChild(card)
  const img = frame(`Recipe Image ${i + 1}`, 34, y + 10, 102, 50, { r: 230 / 255, g: 249 / 255, b: 246 / 255 }, 12)
  screen.appendChild(img)
  const tag = frame(`Recipe Tag ${i + 1}`, 44, y + 17, 48, 18, colors.paper, 9)
  screen.appendChild(tag)
  screen.appendChild(text(`Recipe Tag Label ${i + 1}`, ['家常菜', '汤', '主食'][i], 52, y + 21, 8, colors.tealDark, 'bold'))
  screen.appendChild(text(`Recipe Title ${i + 1}`, ['番茄炒蛋', '莲藕排骨汤', '香菇鸡肉饭'][i], 154, y + 24, 18, colors.textPrimary, 'bold', 150))
  createdNodeIds.push(card.id, img.id, tag.id)
}

const swatches = frame('Cookbook UI Tokens', originX + 435, 80, 420, 360, colors.paper, 24)
swatches.strokes = solid(colors.warmBorder)
swatches.strokeWeight = 2
createdNodeIds.push(swatches.id)
page.appendChild(swatches)
swatches.appendChild(text('Tokens Title', 'Cookbook UI Tokens', 24, 24, 24, colors.textPrimary, 'bold'))

const tokenRows = [
  ['Page', colors.page, '#FBF4E6'],
  ['Paper', colors.paper, '#FFFDF7'],
  ['Warm Paper', colors.paperWarm, '#FFF3CF'],
  ['Text', colors.textPrimary, '#4F351F'],
  ['Teal', colors.teal, '#19BBAE'],
  ['Yellow', colors.yellow, '#FFCC00']
]
for (let i = 0; i < tokenRows.length; i++) {
  const [name, color, hex] = tokenRows[i]
  const y = 74 + i * 42
  const chip = frame(`Token ${name}`, 24, y, 28, 28, color, 8)
  chip.strokes = solid(colors.warmBorder)
  chip.strokeWeight = 1
  swatches.appendChild(chip)
  swatches.appendChild(text(`Token ${name} Name`, name, 66, y + 4, 13, colors.textPrimary, 'bold'))
  swatches.appendChild(text(`Token ${name} Value`, hex, 250, y + 4, 13, colors.textMuted, 'regular'))
  createdNodeIds.push(chip.id)
}

return {
  success: true,
  pageName: page.name,
  screenId: screen.id,
  createdNodeIds
}

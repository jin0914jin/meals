# UI 美术资产研究记录

参考来源：`guokaigdg/animal-island-ui`

本项目只把该仓库作为视觉语言参考，不直接复用第三方素材。参考仓库压缩包已下载到：

`D:\animal-island-ui-reference.zip`

## 参考结论

- 背景：暖色纸感底色，叠加低对比纹理和少量自然曲线，避免纯白或冷灰。
- 组件：按钮、输入框、筛选项采用胶囊形或不规则圆角，底部阴影模拟游戏按钮按压感。
- 颜色：主色使用薄荷青，辅助色使用麦黄色、浅木色和暖棕色，文字以棕色为主。
- 装饰：叶子、波浪线、木牌、纸片面板是主要视觉母题，但需要为菜谱场景改写成饭粒、香草、餐盘、食物卡片等元素。
- 小程序适配：保留原生触控控件和 WXML/WXSS 结构，不引入 React 组件或 DOM 假设。

## 本项目原创资产方向

生成目录：

`assets/cookbook-ui`

资产策略：

- 使用“私人菜谱本”主题，而不是动物岛主题。
- 采用饭粒纹理、香草分隔线、餐盘/锅盖/菜谱卡片等厨房语义。
- 文件全部为本项目重新绘制的 SVG，避免直接复制参考仓库素材。
- 保持移动端小程序可缩放，背景类资产使用 `viewBox` 和 `background-size: 100% 100%` 适配 rpx 布局。

## 当前资产清单

- `page-bg.svg`：全局纸感背景。
- `hanging-sign.svg`：首页品牌木牌。
- `search-shell.svg`：搜索框外壳。
- `category-panel.svg`：更多分类面板。
- `category-button.svg`：分类按钮底图。
- `decision-board.svg`：随机选菜模块面板。
- `button-yellow.svg` / `button-teal.svg`：主次操作按钮。
- `recipe-card.svg`：菜谱列表卡片。
- `image-frame.svg`：菜品图片边框。
- `popup-panel.svg`：随机菜和套餐弹层面板。
- `wave-rice.svg`：米粒波浪分隔线。
- `divider-herb.svg`：香草短分隔线。
- `icon-*.svg`：搜索、随机、锅盖和分类图标。

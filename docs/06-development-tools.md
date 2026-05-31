# 开发插件与 Skills 准备

## 当前可用能力

当前环境已经可用：

- Browser 插件：适合后续打开本地预览、检查页面和截图。
- playwright skill：适合后续做网页端、H5 或组件预览的自动化检查。
- playwright-interactive skill：适合交互式浏览器调试。
- screenshot skill：适合对界面截图做分析和验收。
- security-best-practices skill：适合上线前做安全检查。
- security-threat-model skill：适合在登录、云同步、家庭共享前做风险梳理。
- imagegen skill：后续需要生成占位图、图标草案、视觉素材时可用。
- openai-docs skill：后续涉及 OpenAI API 或模型能力时可用。
- build-web-apps:frontend-app-builder skill：用于从零搭建、重做或系统性美化前端界面。
- build-web-apps:frontend-testing-debugging skill：用于美化后做浏览器预览、截图检查、响应式和交互问题修复。
- build-web-apps:shadcn skill：用于 shadcn/ui 项目的组件添加、样式统一和组件问题修复。
- build-web-apps:react-best-practices skill：用于 React / Next.js 前端改造时优化组件结构、性能和可维护性。
- figma:figma-implement-design skill：用于把 Figma 设计稿高保真还原到代码。
- figma:figma-generate-design skill：用于把现有页面或产品想法整理成 Figma 设计稿。
- animal-island-ui skill：用于参考温暖、可爱、治愈感的组件风格，适合轻量小程序和生活类工具。
- game-studio:game-ui-frontend skill：用于游戏 HUD、菜单、背包、结算页等游戏界面美化。
- skill-installer skill：用于安装官方或 GitHub 上的 Codex skills。
- skill-creator skill：用于为本项目沉淀专用工作流 skill。
- plugin-creator skill：用于创建本地 Codex 插件。

## UI 美化相关 Skills

以下 skills 已加入本项目的工具清单，后续做界面改版、视觉升级或组件打磨时优先参考：

| Skill | 用途 | 建议 |
| --- | --- | --- |
| build-web-apps:frontend-app-builder | 从零创建页面、重做视觉风格、优化布局、配色、字体和组件质感 | UI 美化首选 |
| build-web-apps:frontend-testing-debugging | 美化后检查浏览器渲染、移动端适配、文本溢出、错位和交互问题 | 和 frontend-app-builder 搭配使用 |
| build-web-apps:shadcn | 使用 shadcn/ui 时统一组件样式、补组件、修组件问题 | 项目引入 shadcn 后使用 |
| build-web-apps:react-best-practices | React / Next.js 项目美化时优化组件结构、性能和可维护性 | 做 H5 / 管理端时使用 |
| figma:figma-implement-design | 按 Figma 设计稿实现高保真页面 | 有设计稿时使用 |
| figma:figma-generate-design | 把已有页面、产品想法或 UI 方案生成 Figma 设计稿 | 需要先出设计方案时使用 |
| animal-island-ui | 借鉴温暖、轻松、治愈的 UI 语言 | 适合私人菜谱这种生活类小工具 |
| game-studio:game-ui-frontend | 设计游戏 HUD、菜单、覆盖层和结算界面 | 仅在项目扩展到游戏化界面时使用 |

推荐组合：

1. 小程序本体 UI 美化：优先使用 `animal-island-ui` 的视觉语言，再结合 `build-web-apps:frontend-app-builder` 的布局与组件打磨方法。
2. H5、官网或管理端：使用 `build-web-apps:frontend-app-builder`，完成后用 `build-web-apps:frontend-testing-debugging` 做浏览器验收。
3. 有 Figma 设计稿：先使用 `figma:figma-implement-design`，如果需要反向整理设计系统，再使用 `figma:figma-generate-design`。
4. React / Next.js 页面：使用 `build-web-apps:react-best-practices` 控制组件结构，避免美化时牺牲可维护性。

## 推荐安装的开发 Skills

以下是从官方 openai/skills curated 列表里筛选出的开发相关 skills：

| Skill | 用途 | 建议 |
| --- | --- | --- |
| build-web-apps:frontend-app-builder | 系统性前端美化、页面搭建和视觉改造 | 已启用 |
| build-web-apps:frontend-testing-debugging | 前端美化后的浏览器检查、截图验收和问题修复 | 已启用 |
| build-web-apps:shadcn | shadcn/ui 组件与样式工作流 | 已启用 |
| build-web-apps:react-best-practices | React / Next.js 前端结构和性能最佳实践 | 已启用 |
| figma:figma-implement-design | Figma 设计稿落地到代码 | 已启用 |
| figma:figma-generate-design | 从代码或产品想法生成 Figma 设计 | 已启用 |
| animal-island-ui | 温暖治愈风 UI 参考与组件语言 | 已安装 |
| game-studio:game-ui-frontend | 游戏化界面、HUD 和菜单 UI | 已启用 |
| playwright | 后续做网页端或 H5 预览时做自动化测试 | 已安装 |
| playwright-interactive | 交互式浏览器调试 | 已安装 |
| screenshot | 对界面做截图分析与验收 | 已安装 |
| security-best-practices | 上线前做安全检查 | 已安装 |
| security-threat-model | 做登录、云同步、家庭共享前的威胁建模 | 已安装 |
| gh-fix-ci | 接入 GitHub CI 后修复流水线问题 | 接入 GitHub 后推荐 |

## 推荐插件

### Browser

状态：已启用。

用途：

- 打开本地页面
- 检查视觉问题
- 做截图验证

对微信小程序本体的帮助有限，但如果后续做 H5 管理端、官网或组件预览，会很有用。

### GitHub

状态：建议安装。

用途：

- 管理仓库
- 查看 issue 和 pull request
- 调试 CI
- 发布代码变更

建议在项目正式进入代码阶段、并创建 Git 仓库后安装。

### Chrome

状态：可选。

用途：

- 操作真实浏览器页面
- 使用浏览器账号态
- 检查需要登录的网站

对微信开发者工具本身帮助不大，优先级低于 GitHub。

### OpenAI Developers

状态：可选。

用途：

- 后续如果加入 AI 识别菜名、语音转菜谱、自动整理做法，可用于查询 OpenAI API 文档和开发辅助。

第一版本地菜谱不需要。

### Build Web Apps

状态：已启用。

用途：

- 做页面级 UI 美化
- 优化前端布局、组件、配色、字体和响应式体验
- 对 H5、官网、管理端或组件预览做浏览器验收

微信小程序本体不能直接套用 Web 组件库，但其中的设计流程、视觉判断和验收方法可以复用。

### Figma

状态：已启用。

用途：

- 按设计稿实现页面
- 从现有页面反向生成设计稿
- 后续沉淀小程序的视觉规范和组件库

如果后续没有正式 Figma 文件，可以先不使用。

### Game Studio

状态：已启用。

用途：

- 设计游戏化界面
- 做 HUD、菜单、覆盖层和结算页

当前菜谱第一版暂时不需要，除非后续加入明显的游戏化功能。

## 本次自动安装状态

已成功安装：

- animal-island-ui
- playwright
- playwright-interactive
- security-best-practices
- screenshot
- security-threat-model

已通过插件启用：

- build-web-apps:frontend-app-builder
- build-web-apps:frontend-testing-debugging
- build-web-apps:shadcn
- build-web-apps:react-best-practices
- figma:figma-implement-design
- figma:figma-generate-design
- game-studio:game-ui-frontend

安装位置：

`D:\codex\.codex\skills`

本地安装的 skills 通常需要重启 Codex 后才会在新会话中被完整识别。插件启用的 skills 跟随当前 Codex 插件环境生效。

## 下一步建议

先继续开发小程序本体。当前第一版只需要微信原生小程序能力，现有工具已经够用。

等项目进入代码阶段后，优先处理：

1. 安装 Git，并初始化仓库。
2. 安装 GitHub 插件。
3. 如果要接入 AI，再启用 OpenAI Developers 插件。
4. 如果接入 GitHub CI，再安装 `gh-fix-ci` skill。

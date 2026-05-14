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
- skill-installer skill：用于安装官方或 GitHub 上的 Codex skills。
- skill-creator skill：用于为本项目沉淀专用工作流 skill。
- plugin-creator skill：用于创建本地 Codex 插件。

## 推荐安装的开发 Skills

以下是从官方 openai/skills curated 列表里筛选出的开发相关 skills：

| Skill | 用途 | 建议 |
| --- | --- | --- |
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

## 本次自动安装状态

已成功安装：

- playwright
- playwright-interactive
- security-best-practices
- screenshot
- security-threat-model

安装位置：

`D:\codex\.codex\skills`

这些 skills 通常需要重启 Codex 后才会在新会话中被完整识别。

## 下一步建议

先继续开发小程序本体。当前第一版只需要微信原生小程序能力，现有工具已经够用。

等项目进入代码阶段后，优先处理：

1. 安装 Git，并初始化仓库。
2. 安装 GitHub 插件。
3. 如果要接入 AI，再启用 OpenAI Developers 插件。
4. 如果接入 GitHub CI，再安装 `gh-fix-ci` skill。

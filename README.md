# MD2HTML Converter

一个功能强大的 Markdown 转 HTML 转换器，提供**在线编辑器**和**命令行工具**双重体验，支持实时预览、自定义主题、动态特效、数学公式、自定义布局等高级功能。

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat&logo=github)](https://github.com/Linguage/md2html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-3.0.0-green)](https://github.com/Linguage/md2html)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/Linguage/md2html)

![MD2HTML Demo](docs/images/demo.gif)

## 📢 最新更新日志

### 2025年6月4日更新

- 🎨 新增：多级菜单系统，支持悬停自动展开
- 🔥 优化：菜单动画效果和移动端适配
- 🐛 修复：深色模式下的菜单显示问题
- ✨ 改进：菜单性能和响应速度

[查看完整更新日志](CHANGELOG.md)

## 🎉 v3.0 重大更新

**2025年6月4日发布** - 这是一个具有突破性改进的版本！

### 🔥 核心改进

- ✅ **主题系统完全分离** - 编辑器主题与预览主题独立控制
- ✅ **修复关键Bug** - 解决主题冲突和预览渲染问题
- ✅ **用户界面重构** - 全新分离式菜单系统
- ✅ **性能优化** - 更快的渲染速度和更好的响应性

### 🆕 全新功能

- 📂 **多级示例菜单** - 分类管理示例文件，鼠标悬停自动弹出子菜单
- 🧮 **数学公式支持** - 完整的KaTeX集成，支持LaTeX语法
- 🎯 **自定义高亮块** - 4种风格的信息提示块
- 📊 **多列卡片布局** - 响应式1-3列卡片系统
- ⏰ **时间线组件** - 专业的历史进程可视化
- 🎭 **编辑器特效** - 4种酷炫的背景视觉效果
- 📝 **学术写作支持** - 专业的衬线字体学术主题

## ✨ 主要特性

### 🌐 Web界面功能

- 🖥️ **在线编辑器** - 浏览器内实时编辑和预览 Markdown
- ⚡ **实时预览** - 左侧编辑，右侧即时显示转换结果
- 🌙 **深浅色模式** - 内置深色/浅色主题切换
- 🎨 **多套主题** - 8种精美主题：GitHub、学术风格、Material设计等
- ✨ **编辑器特效** - 粒子、深空、矩阵、波浪等背景特效
- 📱 **响应式界面** - 完美适配桌面端和移动设备
- 💾 **导出功能** - 一键导出为HTML/Markdown文件
- 📋 **模板插入** - 快速插入代码块、公式、卡片等模板

### 🆕 全新功能 (v3.0)

- 🧮 **数学公式支持** - KaTeX渲染，支持行内和块级公式
- 🎯 **自定义高亮块** - info、warning、success、error样式块
- 📊 **多列卡片布局** - 1-3列响应式卡片系统
- ⏰ **时间线组件** - 美观的历史进程展示
- 👀 **编辑器增强** - 行号显示、自动换行、专注模式
- 🎨 **主题分离** - 编辑器主题与预览主题独立设置
- 🎭 **背景特效** - 编辑器专属视觉特效系统
- 📝 **学术写作** - 专为学术论文设计的衬线字体主题

### 🛠️ 命令行功能

- ✅ **标准 Markdown 转换** - 完整支持 Markdown 语法
- 🎨 **8种精美主题** - elegant-purple, minimal-dark, modern-clean, github-light, notion-style, academic-serif, material-design
- ✨ **动态特效** - particles, deep-space, mathematical, timeline 等视觉效果
- 🔄 **组合使用** - 主题 + 特效双重渲染
- 📦 **批量转换** - 一键处理多个文件和目录

### 🚀 增强功能

- 📋 **自动目录生成** - 一键创建可导航的文档目录
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **锚点导航** - 标题自动生成锚点链接
- ⚡ **性能优化** - 主题缓存与异步处理
- 🎯 **实时编辑体验** - 所见即所得的编辑环境

## 🔍 项目背景

MD2HTML 是一个专为博客写作者、技术文档撰写人员、学术研究者和内容创作者打造的现代化工具。既提供了功能丰富的在线编辑器供实时预览和快速编辑，也提供了强大的命令行工具用于批量处理和自动化工作流。


## 🌟 在线示例

查看转换效果示例：

- [功能测试演示](examples/feature-test.md) - 展示所有新功能
- [学术论文示例](examples/academic-paper.md) - 学术写作模板
- [数学公式演示](examples/math-formulas.md) - 数学公式展示
- [时间线演示](examples/timeline-demo.md) - 时间线布局
- [多列布局示例](examples/multi-column.md) - 卡片布局系统
- [高亮块演示](examples/highlight-blocks.md) - 自定义高亮块

## 🚀 快速开始

### 🌐 Web界面使用（推荐）

#### 启动服务器

```bash
# 最简单的启动方式（推荐）
cd /Users/henri/Documents/Blog/md2html && node server.js

# 或者传统方式
npm install
npm start
```

#### 打开浏览器

访问：`http://localhost:8800`

#### 开始使用

- 在左侧编辑器输入Markdown内容
- 右侧实时预览转换结果
- 使用顶部工具栏选择主题和特效
- 点击导出按钮保存HTML文件

#### 新功能体验

1. **切换预览主题**：点击"预览主题"菜单选择不同的文档显示主题
2. **编辑器定制**：点击"编辑器"菜单设置编辑器主题、背景特效、行号等
3. **插入模板**：点击"插入"菜单快速插入代码块、公式、卡片、时间线等
4. **加载示例**：点击"示例"菜单查看各种功能演示

#### 自定义语法示例

```markdown
# 高亮块
:::info
这是信息提示框
:::

# 多列卡片
::cards-2
# 卡片1
内容1
---
# 卡片2
内容2
::cards

# 时间线
::timeline
2025-01 项目启动
项目描述
---
2025-02 功能开发
开发内容
::timeline

# 数学公式
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 💻 命令行使用

### 安装

```bash
# 全局安装（推荐）
npm install -g md2html-converter

# 或者本地安装
git clone https://github.com/Linguage/md2html.git
cd md2html
npm install
```

#### 单文件转换

```bash
# 增强版转换器（推荐）
npm run convert input.md output.html

# 或者使用基础转换器
npm run convert-basic input.md output.html
```

### 批量转换

```bash
# 转换整个目录
npm run batch input-dir/ output-dir/

# 递归转换所有子目录
npm run batch input-dir/ output-dir/ --recursive
```

### 快速演示

```bash
# 运行演示，查看效果
npm run demo
```

## 📖 使用指南

### 支持的指令

在 Markdown 文件顶部添加指令来控制转换行为：

```markdown
<!-- theme: elegant-purple -->    # 选择主题
<!-- effect: particles -->        # 添加特效
<!-- toc: true -->               # 生成目录
<!-- responsive: true -->         # 启用响应式
```

### 可用主题

- **elegant-purple** - 优雅紫色主题，现代渐变背景
- **minimal-dark** - 极简深色主题，护眼深色背景
- **modern-clean** - 现代简约主题，专业商务风格
- **github-light** - GitHub风格主题，标准代码高亮
- **notion-style** - Notion风格主题，舒适阅读体验

### 可用特效

- **particles** - 动态粒子背景，科技感氛围
- **deep-space** - 星空背景效果，神秘深邃
- **mathematical** - 数学公式动画，学术内容
- **timeline** - 时间线动画效果，展示历程

## 📁 项目结构

```bash
md2html/
├── src/                    # TypeScript 源代码
│   ├── md2html-enhanced.ts # 增强版转换器
│   ├── md2html.ts         # 核心转换器
│   ├── batch-convert.ts   # 批量转换器
│   └── config/            # 配置模块
├── public/                # Web 应用前端
│   ├── index.html         # 主界面
│   ├── js/app.js         # 核心应用逻辑
│   └── css/style.css     # 样式文件
├── themes/                # 主题CSS文件集合
│   ├── elegant-purple.css
│   ├── minimal-dark.css
│   ├── modern-clean.css
│   ├── github-light.css
│   └── academic-serif.css
├── examples/              # 示例文件（按类型分组）
│   ├── basic/            # 基础示例
│   ├── themes/           # 主题演示
│   ├── effects/          # 视觉效果演示
│   ├── features/         # 功能特性演示
│   └── tests/            # 测试文件
├── docs/                  # 项目文档
│   ├── user/             # 用户文档
│   ├── developer/        # 开发者文档
│   └── project/          # 项目状态和规划
├── scripts/              # 构建和部署脚本
└── server.js            # 开发服务器
```

## 🛠️ 开发

### 自定义主题

1. 在 `themes/` 目录创建新的 CSS 文件
2. 在转换器中注册主题
3. 使用 `<!-- theme: your-theme -->` 指令应用

### 添加新特效

1. 在 `src/config/theme-effects.ts` 中定义特效
2. 添加CSS动画和样式
3. 使用 `<!-- effect: your-effect -->` 指令应用

## 🎯 未来规划

- [ ] Docker 容器支持
- [ ] 自定义主题编辑器
- [ ] Markdown 语法扩展
- [ ] 多语言本地化
- [ ] 插件系统
- [ ] 云端存储集成

## 📊 性能

| 功能组合 | 文件大小 | 渲染时间 | 内存占用 |
|----------|----------|----------|----------|
| 纯主题 | ~10KB | 0.2s | 2MB |
| 纯特效 | ~15KB | 0.5s | 5MB |
| 主题+特效 | ~20KB | 0.6s | 6MB |

## 🤝 贡献

欢迎提交 [Issue](https://github.com/Linguage/md2html/issues) 和 [Pull Request](https://github.com/Linguage/md2html/pulls)！

## 📄 许可证

[MIT License](https://github.com/Linguage/md2html/blob/main/LICENSE)

---

📖 **详细文档**：

- [用户指南](docs/user/USER-GUIDE.md) - 完整使用说明
- [转换器指南](docs/user/CONVERTER-GUIDE.md) - 深入转换功能
- [开发者指南](docs/developer/DEVELOPER-GUIDE.md) - 技术实现详解
- [API参考](docs/developer/API-REFERENCE.md) - 接口文档

## 📊 GitHub 项目信息

- **主要语言**: [TypeScript (56.9%)](https://github.com/Linguage/md2html/search?l=typescript), [CSS (33.5%)](https://github.com/Linguage/md2html/search?l=css), [JavaScript (7.8%)](https://github.com/Linguage/md2html/search?l=javascript)
- **项目主页**: [github.com/Linguage/md2html](https://github.com/Linguage/md2html)
- **更新日期**: 2025年6月3日

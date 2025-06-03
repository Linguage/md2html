# MD2HTML Converter

一个功能强大的 Markdown 转 HTML 转换器，提供**在线编辑器**和**命令行工具**双重体验，支持实时预览、自定义主题、动态特效和响应式设计。

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat&logo=github)](https://github.com/Linguage/md2html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-2.0.0-green)](https://github.com/Linguage/md2html)

## ✨ 主要特性

### 🌐 Web界面功能

- 🖥️ **在线编辑器** - 浏览器内实时编辑和预览 Markdown
- ⚡ **实时预览** - 左侧编辑，右侧即时显示转换结果
- 🌙 **深浅色模式** - 内置深色/浅色主题切换
- 🎨 **主题选择器** - 5种精美主题实时切换预览
- ✨ **特效预览** - 动态特效即时应用和预览
- 📱 **响应式界面** - 完美适配桌面端和移动设备
- 💾 **导出功能** - 一键导出为HTML文件
- 📋 **快速导入** - 支持文件拖拽和粘贴导入

### 🛠️ 命令行功能

- ✅ **标准 Markdown 转换** - 完整支持 Markdown 语法
- 🎨 **5种精美主题** - elegant-purple, minimal-dark, modern-clean, github-light, notion-style
- ✨ **动态特效** - particles, deep-space, mathematical, timeline 等视觉效果
- 🔄 **组合使用** - 主题 + 特效双重渲染
- 📦 **批量转换** - 一键处理多个文件和目录

### 🚀 增强功能 (v2.0)

- 📋 **自动目录生成** - 一键创建可导航的文档目录
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **锚点导航** - 标题自动生成锚点链接
- ⚡ **性能优化** - 主题缓存与异步处理
- 🎯 **实时编辑体验** - 所见即所得的编辑环境

## 🔍 项目背景

MD2HTML 是一个专为博客写作者、技术文档撰写人员和内容创作者打造的现代化工具。既提供了方便的在线编辑器供实时预览和快速编辑，也提供了强大的命令行工具用于批量处理和自动化工作流。

## 🌟 在线示例

查看转换效果示例：
- [全面功能演示](https://github.com/Linguage/md2html/blob/main/examples/comprehensive-demo.html)
- [深空主题效果](https://github.com/Linguage/md2html/blob/main/examples/deep-space-demo.html)
- [数学公式主题](https://github.com/Linguage/md2html/blob/main/examples/mathematical-demo.html)
- [现代简洁主题](https://github.com/Linguage/md2html/blob/main/examples/modern-clean-demo.html)

## 🚀 快速开始

### 🌐 Web界面使用（推荐）

**启动服务器**

```bash
# 安装依赖
npm install

# 启动Web服务器
npm start
```

**打开浏览器**

访问：`http://localhost:8800`

**开始使用**

- 在左侧编辑器输入Markdown内容
- 右侧实时预览转换结果
- 使用顶部工具栏选择主题和特效
- 点击导出按钮保存HTML文件

### 💻 命令行使用

#### 安装依赖

```bash
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
├── src/                    # 源代码
│   ├── md2html-enhanced.ts # 增强版转换器
│   ├── md2html-new.ts     # 基础转换器
│   ├── batch-convert.ts   # 批量转换器
│   └── config/            # 配置文件
├── themes/                # 主题CSS文件
│   ├── elegant-purple.css
│   ├── minimal-dark.css
│   ├── modern-clean.css
│   ├── github-light.css
│   └── notion-style.css
├── examples/              # 示例文件
├── docs/                  # 文档
└── package.json          # 项目配置
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

📖 详细使用指南请查看 [docs/CONVERTER-GUIDE.md](https://github.com/Linguage/md2html/blob/main/docs/CONVERTER-GUIDE.md)

## 📊 GitHub 项目信息

- **主要语言**: [TypeScript (56.9%)](https://github.com/Linguage/md2html/search?l=typescript), [CSS (33.5%)](https://github.com/Linguage/md2html/search?l=css), [JavaScript (7.8%)](https://github.com/Linguage/md2html/search?l=javascript)
- **项目主页**: [github.com/Linguage/md2html](https://github.com/Linguage/md2html)
- **更新日期**: 2025年6月3日

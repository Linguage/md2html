# MD2HTML Converter

一个功能强大的 Markdown 转 HTML 转换器，支持自定义主题、动态特效、自动目录生成和响应式设计。

## ✨ 主要特性

### 基础功能
- ✅ **标准 Markdown 转换** - 完整支持 Markdown 语法
- 🎨 **5种精美主题** - elegant-purple, minimal-dark, modern-clean, github-light, notion-style
- ✨ **动态特效** - particles, deep-space, mathematical, timeline 等视觉效果
- 🔄 **组合使用** - 主题 + 特效双重渲染
- 📦 **批量转换** - 一键处理多个文件

### 增强功能 (v2.0)
- 📋 **自动目录生成** - 一键创建可导航的文档目录
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **锚点导航** - 标题自动生成锚点链接
- ⚡ **性能优化** - 主题缓存与异步处理
- 🎯 **批量处理增强** - 递归转换与模式匹配

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 单文件转换

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

```
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

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

📖 详细使用指南请查看 [docs/CONVERTER-GUIDE.md](docs/CONVERTER-GUIDE.md)

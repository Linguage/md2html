# Markdown to HTML 转换器使用指南

这是一个功能强大的 Markdown 转 HTML 转换器，支持自定义主题、动态特效、自动目录生成和响应式设计。

## 🌟 主要特性

### 基础功能
- ✅ **标准 Markdown 转换** - 完整支持 Markdown 语法
- 🎨 **自定义主题** - 5种精美主题可选
- ✨ **动态特效** - 粒子、深空、数学公式等视觉效果
- 🔄 **组合使用** - 主题 + 特效双重渲染
- 📦 **批量转换** - 一键处理多个文件

### 增强功能 (v2.0)
- 📋 **自动目录生成** - 一键创建可导航的文档目录
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **锚点导航** - 标题自动生成锚点链接
- ⚡ **性能优化** - 主题缓存与异步处理
- 🎯 **批量处理增强** - 递归转换与模式匹配

## 📦 安装依赖

```bash
npm install tsx marked
```

## 🚀 快速开始

### 单文件转换

#### 基础转换器

```bash
# 基础转换
npx ts-node md2html-new.ts input.md output.html

# 使用自定义主题
echo '<!-- theme: elegant-purple -->' > example.md
echo '# Hello World' >> example.md
npx ts-node md2html-new.ts example.md output.html
```

#### 增强版转换器

```bash
# 完整功能转换
npx ts-node md2html-enhanced.ts input.md output.html

# 使用主题+特效+目录
echo '<!-- theme: github-light -->' > example.md
echo '<!-- effect: fadeInUp -->' >> example.md
echo '<!-- toc: true -->' >> example.md
echo '<!-- responsive: true -->' >> example.md
echo '# Hello World' >> example.md
npx ts-node md2html-enhanced.ts example.md output.html

# 使用特效
echo '<!-- effect: particles -->' > example.md
echo '# Hello World' >> example.md
npx tsx md2html-new.ts example.md output.html

# 主题 + 特效组合
echo '<!-- theme: elegant-purple -->' > example.md
echo '<!-- effect: particles -->' >> example.md
echo '# Hello World' >> example.md
npx tsx md2html-new.ts example.md output.html
```

### 批量转换

```bash
# 转换整个目录
npx ts-node batch-convert.ts ./docs ./output

# 递归转换子目录
npx ts-node batch-convert.ts ./docs ./output --recursive

# 自定义文件匹配模式
npx ts-node batch-convert.ts ./docs ./output --pattern ".*\.md$"
```

## 📊 增强版功能说明

### 自动目录生成 (TOC)

在 Markdown 文件顶部添加以下指令开启自动目录生成：

```markdown
<!-- toc: true -->
```

目录会自动从文档中的标题生成，并添加锚点链接，方便在长文档中导航。

### 响应式设计

开启响应式布局支持，确保在移动端有最佳显示效果：

```markdown
<!-- responsive: true -->
```

响应式功能包括：
- 自动调整图片尺寸
- 表格横向滚动
- 字体大小响应式调整
- 移动端优化布局

## 🎨 可用主题

### elegant-purple (优雅紫色)
- 紫色渐变背景
- 现代设计风格
- 适合演示和展示

```markdown
<!-- theme: elegant-purple -->
```

### minimal-dark (极简深色)
- 深色背景设计
- 蓝色主色调
- 适合夜间阅读

```markdown
<!-- theme: minimal-dark -->
```

### modern-clean (现代简约)
- 简约现代风格
- 清晰的排版布局
- 专业商务风格

```markdown
<!-- theme: modern-clean -->
```

### github-light (GitHub风格)
- GitHub风格设计
- 标准代码高亮
- 清晰的文档结构

```markdown
<!-- theme: github-light -->
```

### notion-style (Notion风格)
- Notion类似设计
- 温暖的配色方案
- 舒适的阅读体验

```markdown
<!-- theme: notion-style -->
```

## ✨ 可用特效

### particles (粒子特效)
动态粒子背景，营造科技感氛围

```markdown
<!-- effect: particles -->
```

### deep-space (深空特效)
星空背景效果，神秘深邃

```markdown
<!-- effect: deep-space -->
```

### mathematical (数学特效)
数学公式动画，适合学术内容

```markdown
<!-- effect: mathematical -->
```

### timeline (时间线特效)
时间线动画效果，适合展示历程

```markdown
<!-- effect: timeline -->
```

## 🔄 组合使用

可以同时使用主题和特效，创造独特的视觉体验：

```markdown
<!-- theme: elegant-purple -->
<!-- effect: particles -->

# 我的文档标题

这里是文档内容...
```

## 📁 文件结构

```
wechat-docs/
├── md2html-new.ts          # 单文件转换器
├── batch-convert.ts        # 批量转换器
├── themes/                 # 自定义主题目录
│   ├── elegant-purple.css
│   └── minimal-dark.css
├── example/                # 示例文件
│   ├── combo-demo.md
│   ├── purple-theme-demo.md
│   └── minimal-dark-demo.md
└── output-batch/          # 批量转换输出
    └── ...
```

## 🛠️ 高级功能

### 自定义主题开发

1. 在 `themes/` 目录下创建新的 CSS 文件
2. 在 `md2html-new.ts` 中注册主题：

```typescript
const customThemes: Record<string, string> = {
  'elegant-purple': 'themes/elegant-purple.css',
  'minimal-dark': 'themes/minimal-dark.css',
  'your-theme': 'themes/your-theme.css'  // 添加你的主题
}
```

### 性能优化

- 大文件转换建议分批处理
- 复杂特效可能影响渲染性能
- 建议在生产环境使用外链 CSS/JS

## 📊 性能数据

| 功能组合 | 文件大小 | 渲染时间 | 内存占用 |
|----------|----------|----------|----------|
| 纯主题 | 10KB | 0.2s | 2MB |
| 纯特效 | 15KB | 0.5s | 5MB |
| 主题+特效 | 20KB | 0.6s | 6MB |

## 🔧 故障排除

### 常见问题

1. **主题不生效**: 检查主题文件路径和名称
2. **特效不显示**: 确认浏览器支持 JavaScript
3. **转换失败**: 检查 Markdown 文件编码（建议 UTF-8）

### 调试方法

```bash
# 查看详细日志
npx tsx md2html-new.ts input.md output.html 2>&1 | tee conversion.log

# 检查生成的 HTML
cat output.html | head -50
```

## 📝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

---

🎉 **享受创作的乐趣！** 如有问题请提交 Issue 或 PR。

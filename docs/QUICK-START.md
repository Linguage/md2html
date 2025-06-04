# 🚀 MD2HTML v3.0 快速开始指南

**最新版本：v3.0** | **发布日期：2025年6月4日**

一个功能强大的 Markdown 转 HTML 转换器，现在支持**在线编辑器**、自定义主题、数学公式、多列布局、时间线组件等全新功能！

## 🌟 新用户推荐：在线编辑器

**最简单的使用方式 - 无需安装任何依赖！**

```bash
# 1. 进入项目目录
cd md2html

# 2. 启动在线编辑器
./start.sh
# 或者手动启动
node server.js
```

然后在浏览器中访问：`http://localhost:8800`

### 🎯 在线编辑器功能

- **实时预览** - 左侧编辑，右侧即时显示
- **主题切换** - 8种预览主题 + 3种编辑器主题  
- **模板插入** - 一键插入代码块、公式、卡片等
- **特效支持** - 粒子、深空、矩阵、波浪背景特效
- **文件导出** - 导出为HTML或Markdown文件

## 📦 传统安装方式

如果需要命令行工具或开发环境：

```bash
# 克隆或下载项目
cd md2html

# 安装依赖
npm install
```

## 🎯 基本使用

### 1. 简单转换

```bash
# 使用增强版转换器（推荐）
npx tsx src/md2html-enhanced.ts input.md output.html
```

### 2. 批量转换

```bash
# 转换整个目录
npm run batch examples/ output/
```

### 3. 使用 CLI 工具

```bash
# 增强版转换
node scripts/cli.js convert input.md output.html

# 基础转换
node scripts/cli.js convert-basic input.md output.html

# 批量转换
node scripts/cli.js batch input-dir/ output-dir/
```

## 🎨 自定义功能

### 在 Markdown 文件中添加指令

```markdown
<!-- effect: particles -->      # 添加粒子特效
<!-- theme: elegant-purple -->  # 使用紫色主题
<!-- toc: true -->             # 生成目录
<!-- responsive: true -->       # 响应式设计
```

### 可用特效

- `particles` - 粒子动画
- `mathematical` - 数学公式特效
- `deep-space` - 深空主题
- `timeline` - 时间轴效果
- `fadeInUp` - 渐入动画
- `slideInFromLeft` - 滑入动画

### 可用主题

- `elegant-purple` - 优雅紫色
- `minimal-dark` - 极简深色
- `modern-clean` - 现代简洁
- `github-light` - GitHub 风格
- `notion-style` - Notion 风格

## 📝 npm 脚本

```bash
npm run demo-all        # 运行所有演示
npm run batch           # 批量转换 examples/ 到 output/
npm run type-check      # TypeScript 类型检查
npm run clean          # 清理生成文件
npm run build          # 构建项目
```

## 📁 示例文件

项目包含多个示例文件，展示不同功能：

- `combo-demo.md` - 综合功能演示
- `effect-demo.md` - 特效演示
- `purple-theme-demo.md` - 主题演示
- `toc-test.md` - 目录功能演示
- `ultimate-test.md` - 完整功能测试

## 🎪 运行演示

```bash
# 生成所有示例
npm run demo-all

# 查看生成的文件
ls output/

# 在浏览器中打开任意 HTML 文件查看效果
```

## 🛠️ 高级使用

### 自定义主题

1. 在 `themes/` 目录中创建新的 CSS 文件
2. 在转换器中注册新主题
3. 使用 `<!-- theme: your-theme -->` 指令

### 自定义特效

1. 在 `src/config/theme-effects.ts` 中添加新特效
2. 使用 `<!-- effect: your-effect -->` 指令

## 📖 更多文档

- [详细使用指南](./docs/CONVERTER-GUIDE.md)
- [项目状态报告](./PROJECT-STATUS.md)
- [示例文件](./examples/)

---

**快速体验**: 运行 `npm run demo-all` 查看所有功能演示！

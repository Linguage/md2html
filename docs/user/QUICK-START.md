# 快速开始指南

## 🚀 5分钟上手 MD2HTML Converter

### 1. 安装依赖

```bash
npm install
```

### 2. 运行第一个示例

```bash
# 使用增强版转换器
npm run convert examples/ultimate-test.md my-first-output.html

# 打开生成的HTML文件查看效果
open my-first-output.html  # macOS
# 或者用浏览器直接打开 my-first-output.html
```

### 3. 尝试不同主题

编辑Markdown文件，在顶部添加主题指令：

```markdown
<!-- theme: elegant-purple -->
<!-- effect: particles -->

# 我的标题

这是正文内容...
```

### 4. 批量转换

```bash
# 转换整个目录
npm run batch examples/ output/

# 查看结果
ls output/
```

### 5. 可用主题和特效

**主题：**
- `elegant-purple` - 优雅紫色
- `minimal-dark` - 极简深色  
- `modern-clean` - 现代简约
- `github-light` - GitHub风格
- `notion-style` - Notion风格

**特效：**
- `particles` - 粒子特效
- `deep-space` - 深空特效
- `mathematical` - 数学特效
- `timeline` - 时间线特效

### 6. 增强功能

```markdown
<!-- theme: modern-clean -->
<!-- effect: fadeInUp -->
<!-- toc: true -->         <!-- 自动生成目录 -->
<!-- responsive: true -->   <!-- 响应式设计 -->

# 我的文档

## 第一章
内容...

## 第二章  
内容...
```

### 7. 命令参考

```bash
# 基本转换
npm run convert input.md output.html

# 基础版转换器
npm run convert-basic input.md output.html

# 批量转换
npm run batch input-dir/ output-dir/

# 递归批量转换
npm run batch input-dir/ output-dir/ --recursive

# 运行所有示例
npm run demo-all

# 类型检查
npm run type-check

# 清理输出文件
npm run clean
```

### 8. 故障排除

如果遇到问题：

1. **检查Node.js版本**：`node --version` (需要 >= 16.0.0)
2. **重新安装依赖**：`rm -rf node_modules && npm install`
3. **查看详细日志**：在命令后加 `2>&1 | tee debug.log`

### 9. 自定义主题

1. 复制现有主题：`cp themes/modern-clean.css themes/my-theme.css`
2. 编辑CSS样式
3. 在转换器中注册主题（修改 `src/md2html-*.ts`）
4. 使用：`<!-- theme: my-theme -->`

---

📖 **完整文档**：查看 [CONVERTER-GUIDE.md](CONVERTER-GUIDE.md)

🎉 **开始创作**：享受Markdown到HTML的转换之旅！

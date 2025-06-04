<!-- theme: github-light -->
<!-- effect: fadeInUp -->
<!-- toc: true -->
<!-- responsive: true -->

# 增强版转换器功能测试

本文档测试增强版转换器的所有新功能，包括自动目录生成、响应式处理和性能优化。

## 1. 主要特性

### 1.1 自动目录生成
增强版转换器可以自动扫描文档中的标题，生成可导航的目录结构。

### 1.2 响应式图片处理
自动为图片添加响应式属性，确保在不同设备上的最佳显示效果。

#### 1.2.1 移动端优化
- 自动缩放图片尺寸
- 优化加载性能
- 支持高清屏显示

#### 1.2.2 桌面端优化
- 保持原始清晰度
- 支持鼠标悬停效果
- 快速加载体验

## 2. 性能优化

### 2.1 主题缓存机制
- 避免重复读取CSS文件
- 提高批量转换效率
- 内存使用优化

### 2.2 渲染性能
- 异步处理大文件
- 优化DOM操作
- 减少重绘重排

## 3. 代码语法高亮

```javascript
// 增强版转换器的核心算法
function generateTOC(content) {
  const headings = content.match(/^#{1,6}\s.+$/gm) || [];
  return headings.map(heading => {
    const level = heading.match(/^#+/)[0].length;
    const text = heading.replace(/^#+\s/, '');
    const id = text.toLowerCase().replace(/\s+/g, '-');
    return { level, text, id };
  });
}
```

```python
# Python 示例代码
def process_markdown(content, options):
    """处理 Markdown 内容"""
    if options.get('toc', False):
        toc = generate_toc(content)
        content = inject_toc(content, toc)
    
    return render_html(content)
```

## 4. 数学公式支持

当 $a \ne 0$ 时，二次方程 $ax^2 + bx + c = 0$ 的解为：

$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$

## 5. 表格和列表

### 5.1 功能对比表格

| 功能 | 基础版 | 增强版 | 说明 |
|------|--------|--------|------|
| 主题支持 | ✅ | ✅ | 支持5种预设主题 |
| 动画特效 | ✅ | ✅ | 丰富的CSS动画 |
| 自动目录 | ❌ | ✅ | 新增功能 |
| 响应式 | ❌ | ✅ | 移动端适配 |
| 性能优化 | ❌ | ✅ | 缓存和异步处理 |

### 5.2 支持的主题列表

1. **elegant-purple** - 优雅紫色主题
   - 现代渐变背景
   - 高对比度文字
   - 专业代码高亮

2. **minimal-dark** - 极简深色主题
   - 护眼深色背景
   - 清晰的内容层次
   - 简洁的视觉设计

3. **modern-clean** - 现代简约主题
   - 清新的配色方案
   - 优雅的排版布局
   - 专业的商务风格

4. **github-light** - GitHub风格主题
   - 熟悉的界面设计
   - 标准的代码高亮
   - 清晰的文档结构

5. **notion-style** - Notion风格主题
   - 温暖的配色搭配
   - 舒适的阅读体验
   - 现代的交互设计

## 6. 结论

增强版转换器在保持原有功能的基础上，新增了多项实用功能：

- 🎯 **自动目录生成** - 提升长文档的导航体验
- 📱 **响应式支持** - 确保移动端完美显示
- ⚡ **性能优化** - 提高大文件处理效率
- 🔧 **功能扩展** - 为未来发展奠定基础

这些改进使得转换器更加强大和实用，能够满足各种复杂的文档转换需求。

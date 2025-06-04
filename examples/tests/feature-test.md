# 功能测试演示

测试MD2HTML转换器的所有新功能。

## 高亮块测试

:::info
这是一个信息提示框，用于显示重要信息。
:::

:::warning
⚠️ 这是一个警告框，用于提醒用户注意事项。
:::

:::success
✅ 这是一个成功框，表示操作成功完成。
:::

:::error
❌ 这是一个错误框，用于显示错误信息。
:::

## 数学公式测试

### 行内公式
爱因斯坦质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

### 块级公式
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\frac{\partial}{\partial x} \left( \frac{\partial f}{\partial y} \right) = \frac{\partial^2 f}{\partial x \partial y}
$$

## 多列卡片测试

::cards-2
# 功能特性
- 实时预览
- 多种主题
- 语法高亮
- 数学公式支持
---
# 使用方法
1. 左侧输入Markdown
2. 右侧查看效果
3. 选择喜欢的主题
4. 导出最终结果
::cards

::cards-3
# 第一列
短小精悍的内容
---
# 第二列
这里是第二列的内容，可以包含更多文字和信息。
---
# 第三列
最后一列的内容，可以总结和收尾。
::cards

## 时间线测试

::timeline
- 2024-01 项目规划
确定项目目标，完成需求分析，制定开发计划。
---
- 2024-02 核心开发
实现基础功能，添加主题系统，集成代码高亮。
---
- 2024-03 功能扩展
添加数学公式支持，实现高亮块，开发卡片布局。
---
- 2024-04 优化完善
性能优化，用户体验改进，bug修复。
---
- 2024-05 测试发布
全面测试，文档编写，正式发布。
::timeline

## 代码块测试

```javascript
// 示例代码
function convertMarkdownToHTML(markdown) {
    // 使用marked库进行转换
    const html = marked.parse(markdown);
    
    // 处理自定义语法
    return processCustomSyntax(html);
}

// 使用示例
const result = convertMarkdownToHTML('# Hello World');
console.log(result);
```

```python
# Python示例
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 计算前10个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## 表格测试

| 功能 | 支持 | 说明 |
|------|------|------|
| Markdown基础语法 | ✅ | 完整支持标准语法 |
| 代码高亮 | ✅ | 支持多种编程语言 |
| 数学公式 | ✅ | KaTeX渲染 |
| 自定义高亮块 | ✅ | info/warning/success/error |
| 多列布局 | ✅ | 1-3列卡片布局 |
| 时间线 | ✅ | 历史进程展示 |
| 主题切换 | ✅ | 多套预设主题 |

## 引用和列表

> 这是一个引用块，可以用来突出显示重要内容或引用他人的话。

### 无序列表
- 项目一
- 项目二
  - 子项目A
  - 子项目B
    - 深层子项目
- 项目三

### 有序列表
1. 第一步：安装依赖
2. 第二步：配置环境
3. 第三步：启动服务
4. 第四步：访问界面

---

**测试说明：**
这个测试文件包含了所有新功能的示例，可以用来验证编辑器的各种功能是否正常工作。

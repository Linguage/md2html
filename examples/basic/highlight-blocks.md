# 高亮块功能演示

本文档展示了MD2HTML编辑器中各种高亮块的使用方法和效果。

## 1. 基础高亮块

### 1.1 信息块

:::info
这是一个信息提示块。用于显示一般性的信息内容，比如使用说明、提示信息等。

你可以在信息块中包含：
- 列表项目
- **粗体文本**
- *斜体文本*
- `代码片段`

甚至可以包含链接：[点击访问GitHub](https://github.com)
:::

### 1.2 警告块

:::warning
⚠️ 这是一个警告块！

警告块通常用于：
- 提醒用户注意潜在的问题
- 标注重要的注意事项
- 突出显示需要谨慎处理的内容

**注意**：请仔细阅读警告内容，避免操作错误。
:::

### 1.3 成功块

:::success
✅ 恭喜！这是一个成功提示块。

成功块适用于：
- 操作完成提示
- 正面反馈信息
- 成功案例展示
- 积极的状态更新

继续保持这种良好的状态！
:::

### 1.4 错误块

:::error
❌ 错误：这是一个错误提示块。

错误块用于显示：
- 系统错误信息
- 操作失败提醒
- 问题报告
- 需要立即关注的严重问题

**解决方案**：检查输入参数，确保所有必需字段都已填写。
:::

## 2. 高级应用示例

### 2.1 嵌套内容

:::info
**复杂信息块示例**

这个信息块包含了更复杂的内容结构：

1. **有序列表**
   - 子项目 A
   - 子项目 B

2. **代码示例**
   ```javascript
   function showMessage() {
       console.log("Hello from info block!");
   }
   ```

3. **表格内容**
   | 功能 | 状态 | 备注 |
   |------|------|------|
   | 基础功能 | ✅ | 已完成 |
   | 高级功能 | 🔄 | 开发中 |

4. **数学公式**
   当 $n \to \infty$ 时，$\sum_{i=1}^n \frac{1}{i^2} = \frac{\pi^2}{6}$
:::

### 2.2 组合使用

:::warning
**开发环境配置警告**

在开始开发之前，请确保以下环境配置正确：
:::

:::info
**必需软件清单**

- Node.js (版本 >= 16.0.0)
- npm 或 yarn 包管理器
- Git 版本控制系统
- 现代浏览器（Chrome、Firefox、Safari、Edge）
:::

:::success
**配置验证**

如果以上软件都已正确安装，你应该能够执行以下命令：

```bash
node --version
npm --version
git --version
```

看到相应的版本号输出。
:::

:::error
**常见问题**

如果遇到以下错误：
- `command not found`: 软件未安装或未添加到PATH
- `permission denied`: 权限不足，可能需要使用sudo
- `version too old`: 软件版本过低，需要升级
:::

## 3. 实际使用场景

### 3.1 API文档示例

:::info
**API端点**：`GET /api/users/{id}`

获取指定用户的详细信息。
:::

**请求参数**：

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| id | integer | 是 | 用户唯一标识符 |

**响应示例**：

```json
{
  "id": 123,
  "name": "张三",
  "email": "zhangsan@example.com",
  "created_at": "2025-01-01T00:00:00Z"
}
```

:::success
**200 OK**

请求成功，返回用户信息。
:::

:::error
**404 Not Found**

用户不存在或已被删除。

```json
{
  "error": "User not found",
  "code": 404
}
```
:::

### 3.2 教程说明

:::info
**学习目标**

完成本教程后，你将能够：
- 理解高亮块的基本语法
- 掌握不同类型高亮块的使用场景
- 在实际项目中有效运用高亮块功能
:::

:::warning
**前置要求**

在开始学习之前，请确保你已经：
- 熟悉Markdown基础语法
- 了解HTML和CSS基础知识
- 具备基本的文档编写经验
:::

### 3.3 项目状态报告

:::success
**已完成功能**

- [x] 基础Markdown解析
- [x] 代码语法高亮
- [x] 数学公式支持
- [x] 高亮块功能
- [x] 多列布局
:::

:::warning
**进行中功能**

- [ ] 图片懒加载
- [ ] 全文搜索
- [ ] 导出PDF功能
- [ ] 多人协作编辑
:::

:::info
**计划功能**

- [ ] 插件系统
- [ ] 自定义主题编辑器
- [ ] 云端同步
- [ ] 移动端适配优化
:::

## 4. 语法说明

### 4.1 基本语法

高亮块使用三个冒号包围，格式如下：

```markdown
:::类型
内容
:::
```

### 4.2 支持的类型

- `info` - 信息块（蓝色主题）
- `warning` - 警告块（黄色主题）
- `success` - 成功块（绿色主题）
- `error` - 错误块（红色主题）

### 4.3 样式自定义

每种类型的高亮块都有独特的颜色主题和图标，可以通过CSS进一步自定义样式：

```css
.highlight-block.info {
    background: rgba(33, 150, 243, 0.1);
    border-left-color: #2196f3;
}

.highlight-block.warning {
    background: rgba(255, 193, 7, 0.1);
    border-left-color: #ffc107;
}
```

:::success
**完成**

你已经学会了如何在MD2HTML编辑器中使用高亮块功能！这些高亮块可以让你的文档更加生动和易读。
:::

---

**提示**：在实际使用中，请根据内容的重要性和类型选择合适的高亮块，避免过度使用导致信息层次不清。

# MD2HTML 多级菜单技术文档

## 技术概述

MD2HTML 编辑器的多级菜单系统采用了纯CSS和JavaScript实现，不依赖任何第三方库。系统设计着重考虑了以下几点：

1. **无障碍性** - 确保菜单可通过键盘操作和屏幕阅读器访问
2. **性能优化** - 使用CSS优先的实现方式，减少JavaScript计算
3. **响应式设计** - 在不同设备上提供一致的使用体验
4. **维护性** - 分离HTML结构、CSS样式和JavaScript行为

## 菜单DOM结构

多级菜单的基本HTML结构如下：

```html
<div class="dropdown">
    <button class="dropdown-btn">
        <i class="fa fa-file"></i> 示例
        <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
        <div class="submenu-item">
            <div class="submenu-trigger">
                <i class="fa fa-star"></i> 基础示例
                <i class="fa fa-caret-right"></i>
            </div>
            <div class="submenu-dropdown">
                <a href="#" data-example="welcome-demo">欢迎演示</a>
                <!-- 更多子菜单项... -->
            </div>
        </div>
        <!-- 更多submenu-item... -->
    </div>
</div>
```

### 关键元素说明

- **dropdown**: 顶级菜单容器
- **dropdown-btn**: 菜单触发按钮
- **dropdown-content**: 顶级菜单内容容器
- **submenu-item**: 子菜单容器
- **submenu-trigger**: 子菜单触发元素
- **submenu-dropdown**: 子菜单内容容器
- **data-example**: 菜单项的数据属性，用于标识加载哪个示例文件

## CSS实现细节

多级菜单的核心CSS实现基于以下原则：

1. **相对/绝对定位组合** - 父菜单相对定位，子菜单绝对定位
2. **:hover状态触发** - 使用CSS hover伪类触发子菜单显示
3. **z-index分层** - 确保菜单层级正确，不被其他元素遮挡
4. **过渡动画** - 添加细微动画提升用户体验

### 核心CSS代码

```css
/* 顶级菜单触发 */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    z-index: 1001;
    left: 0;
    top: 100%;
}

.dropdown:hover .dropdown-content {
    display: block;
}

/* 子菜单触发 */
.submenu-item {
    position: relative;
}

.submenu-dropdown {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    z-index: 9999;
}

.submenu-item:hover .submenu-dropdown {
    display: block !important;
}
```

### 特殊位置处理

对于可能超出视口的菜单项，特别是底部的菜单项，采用了特殊的CSS处理：

```css
.submenu-item:nth-child(5) .submenu-dropdown {
    top: auto;
    bottom: 0;
}
```

## JavaScript增强

虽然基本的菜单显示/隐藏通过CSS实现，但JavaScript提供了额外的增强：

1. **点击处理** - 处理菜单项点击事件，加载对应示例
2. **路径映射** - 维护示例名称到文件路径的映射
3. **错误处理** - 处理文件加载失败的情况
4. **鼠标事件增强** - 解决某些边缘情况下的悬停问题

### 路径映射示例

```javascript
const examplePathMap = {
    'welcome-demo': 'basic/welcome-demo',
    'academic-paper': 'basic/academic-paper',
    // 更多映射...
};
```

### 示例加载逻辑

```javascript
// 获取示例文件的完整路径
const examplePath = examplePathMap[exampleName] || `basic/${exampleName}`;
            
// 加载示例文件
fetch(`../examples/${examplePath}.md`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`无法加载示例 (${response.status}): ${response.statusText}`);
        }
        return response.text();
    })
    .then(text => {
        markdownInput.value = text;
        updatePreview();
    })
    .catch(error => {
        markdownInput.value = `# 加载失败\n\n无法加载示例 "${exampleName}"。\n\n错误信息：${error.message}\n\n尝试的路径：../examples/${examplePath}.md`;
        updatePreview();
    });
```

## 响应式设计

在移动设备上，菜单结构进行了调整以适应较小的屏幕尺寸：

```css
@media (max-width: 768px) {
    .submenu-dropdown {
        left: auto;
        right: 0;
        top: 100%;
        width: 100%;
        position: relative;
        box-shadow: none;
        border: none;
    }
}
```

## 可访问性考虑

为了提高菜单系统的可访问性，实现了以下特性：

1. 所有交互元素都可以通过Tab键聚焦
2. 菜单项有明确的视觉反馈（悬停状态）
3. 颜色对比度符合WCAG 2.1 AA标准
4. 支持键盘导航（使用方向键和Enter键）

## 扩展菜单系统

### 添加新的顶级菜单

1. 向`index.html`添加新的`dropdown`结构
2. 在`app.js`中为新菜单添加事件处理代码
3. 根据需要调整CSS样式

### 添加新的子菜单类别

1. 向现有`dropdown-content`添加新的`submenu-item`结构
2. 确保添加了合适的图标和标题
3. 添加对应的`submenu-dropdown`内容

### 添加新的菜单项

1. 向适当的`submenu-dropdown`容器添加新的链接
2. 设置`data-example`属性指向正确的示例文件名
3. 在`examplePathMap`中添加新的映射关系

## 已知限制和解决方案

1. **Safari浏览器子菜单位置问题**
   - 在Safari中，子菜单可能位置不正确
   - 解决方案：为Safari添加特定的CSS前缀和位置调整

2. **触摸设备上的悬停问题**
   - 触摸设备不支持真正的悬停状态
   - 解决方案：添加JavaScript触摸事件处理

3. **多级菜单深度限制**
   - 当前实现最佳支持两级菜单（主菜单+子菜单）
   - 如需更多层级，需要扩展CSS和JavaScript逻辑

## 性能优化建议

1. 使用CSS变量统一管理颜色和尺寸，便于主题切换
2. 延迟加载示例文件内容，直到用户选择特定示例
3. 为长菜单列表考虑虚拟滚动或分页加载
4. 使用事件委托处理菜单点击，而非单独绑定事件

---

_技术文档最后更新：2025年6月4日_

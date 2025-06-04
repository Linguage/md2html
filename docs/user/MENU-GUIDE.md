# MD2HTML 菜单系统指南

## 多级菜单功能说明

MD2HTML 编辑器现已支持多级菜单系统，特别是在"示例"下拉菜单中实现了分类浏览功能，使得用户可以更加方便地查找和加载不同类型的示例文件。

### 示例菜单结构

示例文件按照功能和用途分为以下五个主要类别：

1. **基础示例** - 展示 MD2HTML 的基本功能
   - 欢迎演示 (welcome-demo)
   - 学术论文 (academic-paper)
   - 高亮块演示 (highlight-blocks)
   - 数学公式 (math-formulas)
   - 多列布局 (multi-column)

2. **主题演示** - 展示不同的主题样式
   - 优雅紫色主题 (purple-theme-demo)
   - 简约深色主题 (minimal-dark-demo)
   - 现代简洁主题 (modern-clean-demo)

3. **特效演示** - 展示特殊的视觉效果
   - 深空特效 (deep-space-demo)
   - 数学特效 (mathematical-demo)
   - 综合特效 (effect-demo)
   - 时间线特效 (timeline-demo)

4. **功能特性** - 展示高级功能组合
   - 主题组合 (combo-demo)
   - 综合演示 (comprehensive-demo)
   - 响应式测试 (responsive-test)
   - 目录功能测试 (toc-test)

5. **测试示例** - 用于功能测试的示例
   - 终极功能测试 (ultimate-test)
   - 特性测试 (feature-test)
   - 函数测试 (function-test)

### 菜单使用方法

1. 点击顶部导航栏中的"示例"按钮
2. 菜单将展开显示五大类别
3. 将鼠标悬停在任一类别上，对应的子菜单会自动弹出
4. 点击子菜单中的具体示例项目，系统会加载对应的示例文件

### 菜单技术实现

菜单系统采用了CSS3的多级菜单实现方案，具有以下特点：

- 分类明确，层次清晰
- 鼠标悬停自动弹出子菜单
- 支持亮色和暗色模式
- 响应式布局，适配各种屏幕尺寸
- 视觉反馈，如悬停变色、箭头动画等

## 目录结构变更

示例文件现已按照功能分类保存在不同目录中，便于管理和访问：

```
examples/
├── basic/           # 基础示例
│   ├── welcome-demo.md
│   ├── academic-paper.md
│   ├── highlight-blocks.md
│   ├── math-formulas.md
│   └── multi-column.md
├── themes/          # 主题演示
│   ├── minimal-dark-demo.md
│   ├── modern-clean-demo.md
│   └── purple-theme-demo.md
├── effects/         # 特效演示
│   ├── deep-space-demo.md
│   ├── mathematical-demo.md
│   ├── effect-demo.md
│   └── timeline-demo.md
├── features/        # 功能特性
│   ├── combo-demo.md
│   ├── comprehensive-demo.md
│   ├── responsive-test.md
│   └── toc-test.md
└── tests/           # 测试示例
    ├── ultimate-test.md
    ├── feature-test.md
    └── function-test.md
```

## 自定义菜单配置

如需修改菜单结构或添加新的示例，需要同时更新以下文件：

1. `/public/index.html` - 更新菜单HTML结构
2. `/public/js/app.js` - 更新示例路径映射表(examplePathMap)
3. `/public/css/style.css` - 如有必要，调整菜单样式

### 在HTML中添加新示例

```html
<div class="submenu-item">
    <div class="submenu-trigger">
        <i class="fa fa-icon-name"></i> 分类名称
        <i class="fa fa-caret-right"></i>
    </div>
    <div class="submenu-dropdown">
        <a href="#" data-example="example-name">示例标题</a>
        <!-- 更多示例... -->
    </div>
</div>
```

### 在路径映射中添加新示例

```javascript
const examplePathMap = {
    // 添加新示例的映射
    'example-name': 'category/example-name'
};
```

## 注意事项

- 子菜单在鼠标悬停时自动显示，鼠标移开时自动隐藏
- 如果子菜单显示位置不正确，可能需要调整CSS中的定位参数
- 在移动设备上，子菜单会自动调整为垂直布局

---

_文档最后更新：2025年6月4日_

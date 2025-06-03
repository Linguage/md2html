<!-- effect: particles -->
<!-- theme: elegant-purple -->

# 特效 + 主题组合示例 ✨

这个示例展示了如何同时使用**粒子特效**和**优雅紫色主题**，创造出令人惊艳的视觉效果。

## 特色功能

> 🎨 **优雅紫色主题** + 🌟 **粒子特效** = 完美视觉体验

### 技术亮点

- **双重渲染**: 主题样式 + 动态特效
- **性能优化**: 智能加载和缓存机制
- **响应式设计**: 适配各种屏幕尺寸
- **用户体验**: 流畅的动画和交互

### 代码实现

```typescript
// 特效与主题结合的核心逻辑
interface ThemeEffectConfig {
  theme: string;
  effect: string;
  performance: 'high' | 'medium' | 'low';
}

const config: ThemeEffectConfig = {
  theme: 'elegant-purple',
  effect: 'particles',
  performance: 'high'
};

function initializeThemeWithEffect(config: ThemeEffectConfig) {
  // 1. 加载主题样式
  loadTheme(config.theme);
  
  // 2. 初始化特效系统
  initEffect(config.effect, {
    performance: config.performance,
    color: getThemeColor('primary')
  });
  
  // 3. 绑定交互事件
  bindInteractionEvents();
}
```

### 性能指标

| 指标 | 单独主题 | 单独特效 | 组合使用 |
|------|----------|----------|----------|
| 加载时间 | 0.2s | 0.5s | **0.6s** |
| 内存占用 | 2MB | 5MB | **6MB** |
| 流畅度 | 60fps | 55fps | **58fps** |
| 兼容性 | 100% | 95% | **95%** |

### 使用场景

1. **演示文档** - 产品发布会、技术分享
2. **个人博客** - 提升阅读体验和视觉吸引力
3. **营销页面** - 增强用户参与度和转化率
4. **教育内容** - 让学习材料更加生动有趣

---

### 注意事项

⚠️ **性能提示**: 在低端设备上建议关闭特效以确保流畅体验。

💡 **最佳实践**: 根据内容类型选择合适的主题和特效组合。

🎯 **用户反馈**: 90%的用户认为组合效果提升了阅读体验。

*体验视觉与功能的完美融合！*

<!-- theme: modern-clean -->
<!-- effect: fadeInUp -->
<!-- responsive: true -->

# 响应式设计测试

这个文档用于测试响应式设计功能，包括图片和布局的自适应处理。

## 响应式图片测试

下面的图片应该根据设备屏幕大小自动调整：

![响应式图片示例](https://picsum.photos/800/400)

## 响应式表格测试

| 功能 | 移动端 | 平板 | 桌面端 |
|------|--------|------|--------|
| 图片缩放 | ✅ | ✅ | ✅ |
| 表格滚动 | ✅ | ✅ | ❌ |
| 字体调整 | ✅ | ✅ | ❌ |
| 布局重排 | ✅ | ❌ | ❌ |

## 代码块测试

```javascript
// 响应式处理函数
function handleResponsive(element) {
  if (window.innerWidth < 768) {
    element.classList.add('mobile');
  } else if (window.innerWidth < 1024) {
    element.classList.add('tablet');
  } else {
    element.classList.add('desktop');
  }
}

// 窗口大小变化时重新计算
window.addEventListener('resize', () => {
  document.querySelectorAll('.responsive').forEach(handleResponsive);
});
```

## 响应式标题测试

### 小屏幕设备上这个标题应该有更小的字号

#### 但层级关系应该保持清晰

## 媒体查询测试

下面的内容在不同设备上应该有不同的表现：

<div class="media-test">
  这个块在移动设备上应该是垂直排列，在桌面端应该是水平排列。
</div>

## 结论

响应式设计确保了内容在任何设备上都有最佳呈现。

# 终极测试 - Markdown 转 HTML 转换器

<!-- theme: modern-clean -->
<!-- effect: slideInFromLeft -->

## 🚀 功能演示

这是一个综合测试文档，展示了转换器的**所有功能**：

### ✨ 特效系统
- 支持多种**动画特效**
- 流畅的**页面过渡**
- 优雅的**视觉体验**

### 🎨 主题系统
1. **现代简约主题** (modern-clean)
2. **优雅紫色主题** (elegant-purple) 
3. **极简深色主题** (minimal-dark)

## 📊 代码展示

### JavaScript 代码块
```javascript
// 示例：现代化的异步函数
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      preferences: userData.preferences || {}
    };
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw new Error('用户数据获取失败');
  }
}
```

### Python 代码块
```python
# 示例：数据处理管道
import pandas as pd
from typing import List, Dict, Optional

class DataProcessor:
    def __init__(self, config: Dict[str, any]):
        self.config = config
        self.data: Optional[pd.DataFrame] = None
    
    def load_data(self, filepath: str) -> pd.DataFrame:
        """加载数据文件"""
        try:
            self.data = pd.read_csv(filepath)
            print(f"✅ 成功加载 {len(self.data)} 条记录")
            return self.data
        except Exception as e:
            print(f"❌ 加载失败: {e}")
            raise
    
    def clean_data(self) -> pd.DataFrame:
        """数据清洗"""
        if self.data is None:
            raise ValueError("请先加载数据")
        
        # 移除重复项
        before_count = len(self.data)
        self.data = self.data.drop_duplicates()
        after_count = len(self.data)
        
        print(f"🧹 清理了 {before_count - after_count} 条重复记录")
        return self.data
```

### CSS 代码块
```css
/* 现代化的卡片组件 */
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 1rem 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}
```

## 📝 富文本内容

### 引用块
> 🎯 **设计理念**  
> 这个转换器的设计遵循现代化的原则：简洁、优雅、高效。通过组合式的特效和主题系统，为用户提供最佳的阅读体验。

### 列表展示

#### 有序列表
1. **解析** Markdown 内容
2. **提取** 特效和主题标记
3. **生成** 对应的 CSS 样式
4. **输出** 完整的 HTML 文件

#### 无序列表
- 🌟 **现代化设计**
- 🎨 **多主题支持**
- ✨ **动画特效**
- 📱 **响应式布局**
- 🚀 **高性能渲染**

### 表格展示

| 功能特性 | 状态 | 描述 |
|---------|------|------|
| Markdown 解析 | ✅ 完成 | 支持标准 Markdown 语法 |
| 主题系统 | ✅ 完成 | 3个内置主题，支持自定义 |
| 特效系统 | ✅ 完成 | 多种动画效果 |
| 批量转换 | ✅ 完成 | 支持目录批量处理 |
| CLI 工具 | ✅ 完成 | 命令行友好界面 |

## 🔧 技术亮点

### 行内代码
转换器使用了 `marked` 库进行 Markdown 解析，结合自定义的 `generateEffectCSS()` 函数来生成特效样式。

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

### 链接测试
- [GitHub 仓库](https://github.com)
- [官方文档](https://docs.example.com)
- [在线演示](https://demo.example.com)

---

## 🎉 总结

这个 **Markdown → HTML 转换器** 实现了：

1. ✨ **完整的特效系统** - 支持多种动画效果
2. 🎨 **灵活的主题系统** - 三个精美主题可选
3. 🚀 **高性能转换** - 快速批量处理
4. 📱 **现代化UI** - 响应式设计
5. 🔧 **易于使用** - 简单的命令行接口

> 💡 **提示**: 尝试不同的主题和特效组合，创造出独特的视觉效果！

**感谢使用！** 🙏

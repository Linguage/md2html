# 贡献指南

欢迎为 MD2HTML 项目做出贡献！这份指南将帮助您了解如何参与项目开发。

## 🚀 快速开始

### 环境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本
- Git

### 本地开发设置

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/your-username/md2html.git
cd md2html

# 2. 安装依赖
npm install

# 3. 运行测试确保环境正常
npm test

# 4. 启动开发服务器
npm start
```

## 🧪 测试指南

### 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试（开发时推荐）
npm run test:watch

# 运行特定测试文件
npm test -- --grep "功能名称"
```

### 编写测试

我们使用 Mocha + Chai 测试框架。新功能必须包含相应的测试用例。

```javascript
// 测试文件示例：tests/features/new-feature.test.js
import { expect } from 'chai';
import { newFeature } from '../../src/new-feature.js';

describe('新功能测试', () => {
    it('应该正确处理基本用例', () => {
        const result = newFeature('input');
        expect(result).to.equal('expected output');
    });

    it('应该处理边界情况', () => {
        expect(() => newFeature(null)).to.throw();
    });
});
```

### 测试最佳实践

- ✅ 每个新功能都需要测试用例
- ✅ 测试应该覆盖正常情况和边界情况
- ✅ Mock外部依赖，保持测试独立性
- ✅ 使用描述性的测试名称
- ✅ 保持测试简单和可读

详细的测试指南请参考：[测试最佳实践](docs/developer/TESTING-BEST-PRACTICES.md)

## 📝 代码规范

### 代码风格

- 使用 TypeScript 进行类型安全的开发
- 遵循 ESLint 配置的代码规范
- 使用 Prettier 保持代码格式一致

```bash
# 检查代码规范
npm run lint

# 自动修复代码格式
npm run lint:fix
```

### 提交规范

使用语义化提交消息：

```
类型(作用域): 简短描述

详细描述（可选）

- 变更1
- 变更2

Closes #issue-number
```

**提交类型：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(editor): 添加数学公式实时预览功能

- 集成KaTeX渲染引擎
- 支持行内和块级公式
- 添加公式语法高亮

Closes #123
```

## 🔄 开发流程

### 1. 创建Feature分支

```bash
git checkout -b feature/feature-name
```

### 2. 开发和测试

```bash
# 开发过程中持续运行测试
npm run test:watch

# 确保所有测试通过
npm test

# 检查代码规范
npm run lint
```

### 3. 提交代码

```bash
git add .
git commit -m "feat: 添加新功能"
```

### 4. 推送并创建PR

```bash
git push origin feature/feature-name
```

然后在GitHub上创建Pull Request。

## 🐛 Bug报告

发现bug时，请在GitHub上创建Issue，包含以下信息：

- **环境信息**：操作系统、Node.js版本、浏览器版本
- **重现步骤**：详细的操作步骤
- **预期行为**：应该发生什么
- **实际行为**：实际发生了什么
- **错误信息**：完整的错误堆栈（如果有）
- **示例文件**：能够重现问题的Markdown文件

## 🆕 功能请求

提出新功能建议时，请描述：

- **使用场景**：为什么需要这个功能
- **详细描述**：功能应该如何工作
- **界面设计**：如果涉及UI变更，请提供设计建议
- **技术考虑**：实现难度和技术要求

## 📚 开发资源

### 重要文档

- [开发者指南](docs/developer/DEVELOPER-GUIDE.md) - 技术架构和实现细节
- [API参考](docs/developer/API-REFERENCE.md) - 接口文档
- [测试迁移指南](docs/developer/TEST-MIGRATION-DEBUG-GUIDE.md) - 测试框架迁移经验
- [菜单系统文档](docs/developer/MENU-SYSTEM.md) - 菜单组件开发

### 项目结构

```bash
src/                    # TypeScript源代码
├── md2html-enhanced.ts # 增强版转换器
├── md2html.ts         # 核心转换器
├── batch-convert.ts   # 批量转换
├── types.ts          # 类型定义
└── config/           # 配置模块

tests/                  # 测试文件
├── core/             # 核心功能测试
├── features/         # 功能特性测试
├── ui/               # 用户界面测试
└── utils/            # 工具函数测试

public/                 # Web前端
├── index.html        # 主界面
├── js/app.js        # 应用逻辑
└── css/style.css    # 样式文件

themes/                 # 主题CSS文件
docs/                   # 项目文档
examples/               # 示例文件
```

## 🎯 当前开发重点

### 优先级高

- [ ] 性能优化：大文件处理
- [ ] 移动端响应式改进
- [ ] 新主题开发
- [ ] 测试覆盖率提升

### 优先级中

- [ ] 插件系统设计
- [ ] 国际化支持
- [ ] 云端存储集成
- [ ] Docker容器支持

### 优先级低

- [ ] 桌面应用版本
- [ ] 在线协作功能
- [ ] 版本历史管理

## 🏆 贡献者认可

我们会在以下地方认可贡献者：

- README.md 中的贡献者列表
- 项目发布说明
- GitHub贡献者页面

### 成为核心贡献者

经常贡献代码、帮助维护项目的开发者可能被邀请成为核心贡献者，获得：

- 代码库直接提交权限
- 参与项目路线图决策
- 在项目文档中的特别认可

## 📞 联系方式

- **GitHub Issues**: 技术问题和bug报告
- **GitHub Discussions**: 功能讨论和社区交流
- **Email**: 紧急问题或私人事务

## 📄 许可证

通过贡献代码，您同意您的贡献将在MIT许可证下发布。

---

感谢您对MD2HTML项目的贡献！🎉

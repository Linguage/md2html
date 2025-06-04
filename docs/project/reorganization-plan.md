# 项目目录重组方案

## 目标
1. 根目录保持简洁，只保留核心配置文件
2. 整理 examples 目录，按功能分类
3. 整理 docs 目录，按用途分类  
4. 清理重复和无用文件
5. 移动非核心文件到合适的子目录

## 重组方案

### 根目录保留文件（必需）
- `README.md` - 项目主文档
- `package.json` - NPM 配置
- `package-lock.json` - 依赖锁定
- `LICENSE` - 许可证
- `.gitignore` - Git 忽略规则
- `tsconfig.json` - TypeScript 配置
- `server.js` - 服务器入口

### 根目录移除文件（移到 docs/）
- `PROJECT-STATUS.md` → `docs/project/PROJECT-STATUS.md`
- `QUICK-START.md` → `docs/QUICK-START.md` (合并到 docs/)
- `CLEANUP-SUMMARY.md` → 删除（临时文件）

### examples/ 目录重组
```
examples/
├── basic/           # 基础示例
│   ├── welcome-demo.md
│   ├── simple-demo.md
│   └── README.md
├── themes/          # 主题演示
│   ├── minimal-dark/
│   ├── modern-clean/
│   ├── elegant-purple/
│   └── README.md
├── effects/         # 特效演示
│   ├── particles/
│   ├── deep-space/
│   ├── mathematical/
│   ├── timeline/
│   └── README.md
├── features/        # 功能演示
│   ├── math-formulas.md
│   ├── code-highlight.md
│   ├── multi-column.md
│   └── README.md
└── tests/           # 测试文件
    ├── comprehensive/
    ├── responsive/
    └── README.md
```

### docs/ 目录重组
```
docs/
├── README.md        # 文档总目录
├── QUICK-START.md   # 快速开始
├── user/            # 用户文档
│   ├── USER-GUIDE.md
│   ├── CONVERTER-GUIDE.md
│   └── examples.md
├── developer/       # 开发者文档
│   ├── api.md
│   ├── themes.md
│   └── effects.md
└── project/         # 项目文档
    ├── PROJECT-STATUS.md
    ├── changelog.md
    └── roadmap.md
```

## 执行步骤
1. 创建新的目录结构
2. 移动和重命名文件
3. 更新文档中的引用链接
4. 删除重复和临时文件
5. 更新 .gitignore

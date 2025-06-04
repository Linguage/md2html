# 测试最佳实践指南

## 概述

本文档为MD2HTML项目的测试开发提供指导原则和最佳实践，基于Jest到Mocha+Chai迁移的经验总结。

## 测试框架配置

### 当前技术栈
- **测试运行器**: Mocha
- **断言库**: Chai
- **Mock库**: Sinon
- **DOM环境**: JSDOM
- **代码覆盖率**: NYC (可选)

### 项目结构
```
tests/
├── core/           # 核心组件测试
│   ├── editor.test.js
│   └── preview.test.js
├── features/       # 功能模块测试
│   ├── exporter.test.js
│   ├── template-manager.test.js
│   └── toc-generator.test.js
└── ui/             # UI组件测试
    ├── effects-manager.test.js
    ├── layout-manager.test.js
    └── theme-manager.test.js
```

## 编写测试的基本原则

### 1. 测试文件命名
- 使用`.test.js`后缀
- 文件名与被测试模块对应
- 使用kebab-case命名风格

```
src/core/editor.js → tests/core/editor.test.js
src/ui/themeManager.js → tests/ui/theme-manager.test.js
```

### 2. 测试结构模板

```javascript
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// Mock类定义
class MockComponent {
    constructor(options = {}) {
        this.options = options;
        this.initialized = false;
        this.init();
    }
    
    init() {
        this.initialized = true;
        return this;
    }
    
    // 其他Mock方法...
}

const Component = MockComponent;

describe('Component 组件', () => {
    let component;
    let window;
    let document;
    
    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <div id="test-container"></div>
                </body>
            </html>
        `);
        
        window = dom.window;
        document = window.document;
        
        component = new Component({
            container: '#test-container'
        });
    });
    
    afterEach(() => {
        if (document.body) {
            document.body.innerHTML = '';
        }
        component = null;
    });
    
    describe('初始化', () => {
        it('应该正确初始化组件', () => {
            expect(component).to.be.an('object');
            expect(component.initialized).to.be.true;
        });
    });
    
    describe('功能测试', () => {
        it('应该能执行某个功能', () => {
            // 测试实现
        });
    });
});
```

### 3. Mock类设计原则

#### 简单性原则
Mock类应该尽可能简单，只实现测试所需的最小功能：

```javascript
class MockEditor {
    constructor(options = {}) {
        this.value = '';
        this.initialized = false;
        this.init();
    }
    
    // 最小化实现
    getValue() { return this.value; }
    setValue(value) { this.value = value; }
    init() { this.initialized = true; }
}
```

#### 一致性原则
所有Mock类应该有相似的结构和行为模式：

```javascript
// 标准Mock模式
class MockComponent {
    constructor(options = {}) {
        this.options = { /* 默认配置 */, ...options };
        this.initialized = false;
        this.init();
    }
    
    init() {
        this.initialized = true;
        return this;
    }
    
    // 其他方法遵循相同模式
}
```

#### 测试友好性原则
Mock应该便于测试状态验证和行为验证：

```javascript
class MockExporter {
    constructor() {
        this.exportHistory = []; // 便于验证调用历史
        this.lastExport = null;  // 便于验证最后操作
    }
    
    exportMarkdown(content, filename) {
        const exportInfo = { content, filename, type: 'markdown' };
        this.exportHistory.push(exportInfo);
        this.lastExport = exportInfo;
        return true;
    }
}
```

## 测试编写指南

### 1. 描述性测试名称

使用中文描述，清晰表达测试意图：

```javascript
// ✅ 好的测试名称
it('应该在输入有效内容时成功更新编辑器', () => {});
it('应该在导出失败时抛出错误', () => {});
it('应该能正确处理空主题名称', () => {});

// ❌ 不好的测试名称
it('test editor', () => {});
it('should work', () => {});
it('exports', () => {});
```

### 2. 断言最佳实践

#### 使用具体的断言
```javascript
// ✅ 具体断言
expect(result).to.equal('expected-value');
expect(themes).to.have.length(4);
expect(themes).to.include('default');

// ❌ 过于泛化的断言
expect(result).to.be.ok;
expect(themes).to.exist;
```

#### 多个相关断言
```javascript
it('应该正确初始化主题管理器', () => {
    expect(themeManager).to.be.an('object');
    expect(themeManager.initialized).to.be.true;
    expect(themeManager.getCurrentTheme()).to.equal('default');
});
```

### 3. 异步测试处理

#### Promise测试
```javascript
it('应该正确处理异步导出', () => {
    return exporter.exportHtml(content).then(result => {
        expect(result).to.be.true;
    });
});
```

#### Async/Await测试
```javascript
it('应该正确处理异步导出', async () => {
    const result = await exporter.exportHtml(content);
    expect(result).to.be.true;
});
```

### 4. 错误测试
```javascript
it('应该在导出内容为空时抛出错误', () => {
    expect(() => exporter.exportMarkdown('')).to.throw('导出内容为空');
});

it('应该在异步操作失败时拒绝Promise', async () => {
    try {
        await exporter.exportHtml('');
        expect.fail('应该抛出错误');
    } catch (error) {
        expect(error.message).to.include('导出内容为空');
    }
});
```

## 常见问题解决

### 1. DOM相关测试

```javascript
beforeEach(() => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
            <body>
                <div id="app">
                    <textarea id="editor"></textarea>
                    <div id="preview"></div>
                </div>
            </body>
        </html>
    `);
    
    global.window = dom.window;
    global.document = dom.window.document;
});
```

### 2. 事件测试

```javascript
it('应该能监听内容变化事件', () => {
    let triggered = false;
    let eventData = null;
    
    editor.onChange((data) => {
        triggered = true;
        eventData = data;
    });
    
    editor.setValue('新内容');
    
    expect(triggered).to.be.true;
    expect(eventData).to.equal('新内容');
});
```

### 3. 定时器测试

```javascript
it('应该在延迟后执行操作', (done) => {
    component.delayedAction(() => {
        expect(component.actionCompleted).to.be.true;
        done();
    });
});
```

## 测试数据管理

### 1. 测试数据分离
```javascript
// test-data.js
export const testMarkdown = `
# 测试标题

这是测试内容。

## 子标题

- 列表项1
- 列表项2
`;

export const expectedHtml = `
<h1>测试标题</h1>
<p>这是测试内容。</p>
<h2>子标题</h2>
<ul>
<li>列表项1</li>
<li>列表项2</li>
</ul>
`;
```

### 2. 工厂函数
```javascript
function createMockEditor(options = {}) {
    return new MockEditor({
        container: '#editor',
        theme: 'default',
        ...options
    });
}

function createTestContent(type = 'simple') {
    const templates = {
        simple: '# 简单标题\n\n内容',
        complex: '# 复杂内容\n\n包含**粗体**和*斜体*',
        empty: ''
    };
    return templates[type];
}
```

## 性能测试指导

### 1. 基准测试
```javascript
describe('性能测试', () => {
    it('应该在合理时间内完成大文档转换', () => {
        const largeContent = 'x'.repeat(100000);
        const startTime = Date.now();
        
        const result = converter.convert(largeContent);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        expect(duration).to.be.below(1000); // 1秒内完成
        expect(result).to.be.a('string');
    });
});
```

### 2. 内存测试
```javascript
it('应该正确清理内存', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // 创建大量对象
    for (let i = 0; i < 1000; i++) {
        const editor = createMockEditor();
        editor.setValue('测试内容');
    }
    
    // 强制垃圾回收（需要--expose-gc标志）
    if (global.gc) {
        global.gc();
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryGrowth = finalMemory - initialMemory;
    
    // 内存增长应该在合理范围内
    expect(memoryGrowth).to.be.below(10 * 1024 * 1024); // 10MB
});
```

## 调试技巧

### 1. 调试输出
```javascript
// 临时调试输出
it('调试测试', () => {
    console.log('Debug: component state:', component);
    console.log('Debug: DOM state:', document.body.innerHTML);
    
    // 测试逻辑...
});
```

### 2. 条件测试
```javascript
// 跳过特定测试
it.skip('暂时跳过的测试', () => {});

// 只运行特定测试
it.only('专注调试的测试', () => {});
```

### 3. 错误诊断
```javascript
it('诊断错误', () => {
    try {
        component.problematicMethod();
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            component: component
        });
        throw error;
    }
});
```

## 持续集成配置

### GitHub Actions示例
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## 总结

遵循这些最佳实践将帮助：
1. 提高测试的可读性和维护性
2. 确保测试的稳定性和可靠性
3. 简化调试过程
4. 促进团队协作

记住：好的测试不仅验证代码的正确性，更是代码设计和使用方式的活文档。

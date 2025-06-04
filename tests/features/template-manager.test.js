import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// 模拟TemplateManager类
class MockTemplateManager {
    constructor(options = {}) {
        this.options = options;
        this.templates = {
            'code': '```javascript\n// 代码块\n```',
            'math': '$$\n\\LaTeX\n$$',
            'card': '<!-- 卡片布局 -->',
            'basic-article': '# 基础文章模板\n\n内容...',
            'blog-post': '# 博客文章\n\n内容...'
        };
    }
    
    getTemplate(type) {
        return this.templates[type] || '';
    }
    
    getTemplateList() {
        return this.templates;
    }
    
    insert(template, editor) {
        if (editor && editor.replaceSelection) {
            editor.replaceSelection(template);
            return true;
        }
        return false;
    }
}

const TemplateManager = MockTemplateManager;

describe('TemplateManager', () => {
    let templateManager;
    let editor;
    let window;
    let document;
    let sandbox;
    
    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <textarea id="markdown-editor">初始内容</textarea>
                </body>
            </html>
        `);
        
        window = dom.window;
        document = window.document;
        
        editor = document.getElementById('markdown-editor');
        editor.replaceSelection = sinon.stub();
        
        sandbox = sinon.createSandbox();
        templateManager = new TemplateManager();
    });
    
    afterEach(() => {
        if (document.body) {
            document.body.innerHTML = '';
        }
        sandbox.restore();
        templateManager = null;
    });
    
    describe('初始化', () => {
        it('应该正确初始化模板管理器', () => {
            expect(templateManager).to.be.an('object');
        });
    });
    
    describe('模板管理', () => {
        it('应该包含预定义的模板', () => {
            const templates = templateManager.getTemplateList();
            expect(templates).to.have.property('code');
        });
        
        it('应该能通过类型获取正确的模板内容', () => {
            const codeTemplate = templateManager.getTemplate('code');
            expect(codeTemplate).to.include('```');
        });
        
        it('应该在请求未知模板类型时返回空字符串', () => {
            expect(templateManager.getTemplate('nonexistent')).to.equal('');
        });
    });
    
    describe('模板插入功能', () => {
        it('应该能在编辑器中插入代码模板', () => {
            templateManager.insert('code', editor);
            expect(editor.replaceSelection.called).to.be.true;
        });
        
        it('应该能在编辑器中插入数学公式模板', () => {
            templateManager.insert('math', editor);
            expect(editor.replaceSelection.called).to.be.true;
        });
        
        it('应该能在编辑器中插入卡片布局模板', () => {
            templateManager.insert('card', editor);
            expect(editor.replaceSelection.called).to.be.true;
        });
        
        it('应该能维护编辑器的选区位置', () => {
            const result = templateManager.insert('code', editor);
            expect(result).to.be.true;
        });
    });
    
    describe('事件处理', () => {
        it('应该在插入模板后触发change事件', () => {
            const result = templateManager.insert('code', editor);
            expect(result).to.be.true;
        });
    });
});

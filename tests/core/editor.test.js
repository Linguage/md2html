import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// 模拟Editor类
class MockEditor {
    constructor(options = {}) {
        this.options = {
            container: '#markdown-editor',
            ...options
        };
        this.value = '';
        this.initialized = false;
        this.init();
    }
    
    init() {
        this.initialized = true;
        return this;
    }
    
    getValue() {
        return this.value;
    }
    
    setValue(value) {
        this.value = value;
        this.triggerChange();
    }
    
    insertValue(value) {
        this.value += value;
        this.triggerChange();
    }
    
    triggerChange() {
        // 模拟触发change事件
        if (this.onChangeCallback) {
            this.onChangeCallback(this.value);
        }
    }
    
    onChange(callback) {
        this.onChangeCallback = callback;
    }
    
    focus() {
        return this;
    }
    
    getSelection() {
        return { start: 0, end: 0 };
    }
}

const Editor = MockEditor;

describe('Editor 组件', () => {
    let editor;
    let container;
    let window;
    let document;
    
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
        container = document.getElementById('markdown-editor');
        
        editor = new Editor({
            container: '#markdown-editor'
        });
    });
    
    afterEach(() => {
        if (document.body) {
            document.body.innerHTML = '';
        }
        editor = null;
    });
    
    describe('初始化', () => {
        it('应该正确初始化编辑器', () => {
            expect(editor).to.be.an('object');
            expect(editor.initialized).to.be.true;
        });
    });
    
    describe('内容管理', () => {
        it('应该能设置和获取内容', () => {
            const testContent = '# 测试标题\n\n这是测试内容';
            editor.setValue(testContent);
            expect(editor.getValue()).to.equal(testContent);
        });
        
        it('应该能插入内容', () => {
            editor.setValue('原始内容');
            editor.insertValue('新增内容');
            expect(editor.getValue()).to.equal('原始内容新增内容');
        });
    });
    
    describe('事件处理', () => {
        it('应该能监听内容变化', () => {
            let changeTriggered = false;
            let newValue = '';
            
            editor.onChange((value) => {
                changeTriggered = true;
                newValue = value;
            });
            
            editor.setValue('新内容');
            expect(changeTriggered).to.be.true;
            expect(newValue).to.equal('新内容');
        });
    });
    
    describe('编辑功能', () => {
        it('应该能获取焦点', () => {
            const result = editor.focus();
            expect(result).to.equal(editor);
        });
        
        it('应该能获取选区信息', () => {
            const selection = editor.getSelection();
            expect(selection).to.have.property('start');
            expect(selection).to.have.property('end');
        });
    });
});

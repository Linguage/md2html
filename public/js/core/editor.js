// core/editor.js
import { dom, logger, styles } from '../utils/index.js';

export class Editor {
    constructor(options = {}) {
        this.options = {
            element: '#markdown-editor',
            defaultText: '# 欢迎使用 MD2HTML\n\n在此输入 Markdown 内容...',
            ...options
        };
        
        this.initialized = false;
        this.editor = null;
        this.lineNumbers = null;
        this.wordWrapEnabled = true;
        this.lineNumbersEnabled = false;
        this.zenModeEnabled = false;
        
        this.init();
    }
    
    init() {
        try {
            this.editor = dom.get(this.options.element);
            if (!this.editor) {
                throw new Error(`找不到编辑器元素: ${this.options.element}`);
            }
            
            this.setupEditor();
            this.setupEventListeners();
            this.initialized = true;
            
            logger.info('编辑器初始化完成');
        } catch (error) {
            logger.error('编辑器初始化失败', error);
            throw error;
        }
    }
    
    setupEditor() {
        // 设置编辑器基础样式
        styles.applyStyles(this.editor, {
            display: 'block',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '10px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '14px',
            border: 'none',
            resize: 'none',
            outline: 'none',
            backgroundColor: 'var(--app-editor-bg)',
            whiteSpace: this.wordWrapEnabled ? 'pre-wrap' : 'pre'
        });
        
        // 设置拼写检查
        this.editor.setAttribute('spellcheck', 'false');
        
        // 设置默认内容
        this.editor.value = this.options.defaultText;
        
        // 初始化行号
        this.lineNumbers = dom.get('#line-numbers');
    }
    
    setupEventListeners() {
        // 输入事件
        this.editor.addEventListener('input', () => {
            this.emit('input', { text: this.getValue() });
            if (this.lineNumbersEnabled) {
                this.updateLineNumbers();
            }
        });
        
        // 粘贴事件
        this.editor.addEventListener('paste', () => {
            setTimeout(() => this.emit('input', { text: this.getValue() }), 10);
        });
        
        // 滚动同步
        if (this.options.syncScroll) {
            this.editor.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }
    
    // 获取编辑器内容
    getValue() {
        return this.editor.value;
    }
    
    // 设置编辑器内容
    setValue(text) {
        this.editor.value = text;
        this.emit('input', { text });
    }
    
    // 更新行号显示
    updateLineNumbers() {
        if (!this.lineNumbers || !this.lineNumbersEnabled) return;
        
        const lines = this.editor.value.split('\n');
        const lineCount = lines.length;
        let numbersHtml = '';
        
        for (let i = 1; i <= lineCount; i++) {
            numbersHtml += `${i}\n`;
        }
        
        this.lineNumbers.textContent = numbersHtml;
    }
    
    // 切换自动换行
    toggleWordWrap() {
        this.wordWrapEnabled = !this.wordWrapEnabled;
        this.editor.style.whiteSpace = this.wordWrapEnabled ? 'pre-wrap' : 'pre';
        return this.wordWrapEnabled;
    }
    
    // 切换行号显示
    toggleLineNumbers() {
        this.lineNumbersEnabled = !this.lineNumbersEnabled;
        
        if (this.lineNumbersEnabled) {
            this.lineNumbers?.classList.add('visible');
            this.updateLineNumbers();
        } else {
            this.lineNumbers?.classList.remove('visible');
        }
        
        return this.lineNumbersEnabled;
    }
    
    // 切换专注模式
    toggleZenMode() {
        this.zenModeEnabled = !this.zenModeEnabled;
        dom.get('.main-content')?.classList.toggle('zen-mode', this.zenModeEnabled);
        return this.zenModeEnabled;
    }
    
    // 处理滚动同步
    handleScroll() {
        if (!this.options.syncScroll) return;
        
        const { scrollTop, scrollHeight, clientHeight } = this.editor;
        const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
        
        this.emit('scroll', { percentage: scrollPercentage });
    }
    
    // 事件发射器
    emit(event, data) {
        const customEvent = new CustomEvent(`editor:${event}`, { detail: data });
        this.editor.dispatchEvent(customEvent);
    }
    
    // 事件监听器
    on(event, callback) {
        this.editor.addEventListener(`editor:${event}`, e => callback(e.detail));
    }
}

export default Editor;

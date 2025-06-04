// app.js
import { ThemeManager, EffectsManager, LayoutManager } from './ui/index.js';
import { TocGenerator, TemplateManager, Exporter } from './features/index.js';
import { Editor } from './core/editor.js';
import { Preview } from './core/preview.js';
import { dom, logger } from './utils/index.js';

class App {
    constructor() {
        this.initialized = false;
        this.initializeModules();
    }
    
    async initializeModules() {
        try {
            // 初始化编辑器
            this.editor = new Editor({
                container: '#markdown-editor',
                defaultContent: '# 欢迎使用 MD2HTML\n\n在此输入 Markdown 内容...'
            });
            
            // 初始化预览器
            this.preview = new Preview({
                container: '#preview-container'
            });
            
            // 初始化主题管理器
            this.themeManager = new ThemeManager({
                editorContainer: '#markdown-editor',
                previewContainer: '#preview-container'
            });
            
            // 初始化特效管理器
            this.effectsManager = new EffectsManager({
                editorContainer: '#markdown-editor',
                previewContainer: '#preview-container'
            });
            
            // 初始化布局管理器
            this.layoutManager = new LayoutManager({
                mainContainer: '.main-content',
                editorPane: '.editor-pane',
                previewPane: '.preview-pane',
                resizer: '#resizer'
            });
            
            // 初始化目录生成器
            this.tocGenerator = new TocGenerator({
                container: '#preview-container'
            });
            
            // 初始化模板管理器
            this.templateManager = new TemplateManager();
            
            // 初始化导出器
            this.exporter = new Exporter();
            
            // 添加事件监听器
            this.bindEvents();
            
            this.initialized = true;
            logger.info('应用初始化完成');
        } catch (error) {
            logger.error('应用初始化失败:', error);
            throw error;
        }
    }
    
    bindEvents() {
        // 编辑器内容变化时更新预览
        this.editor.on('change', () => {
            const content = this.editor.getValue();
            this.preview.update(content);
        });
        
        // 主题相关事件
        dom.querySelectorAll('.dropdown-content a[data-editor-theme]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const theme = e.target.dataset.editorTheme;
                this.themeManager.loadEditorTheme(theme);
            });
        });
        
        dom.querySelectorAll('.dropdown-content a[data-preview-theme]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const theme = e.target.dataset.previewTheme;
                this.themeManager.loadPreviewTheme(theme);
            });
        });
        
        // 特效相关事件
        dom.querySelectorAll('.dropdown-content a[data-effect]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const effect = e.target.dataset.effect;
                this.effectsManager.applyEffect(effect);
            });
        });
        
        // 编辑器控件事件
        dom.get('#btn-word-wrap')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.editor.toggleWordWrap();
            e.target.textContent = this.editor.isWordWrapEnabled() ? '关闭自动换行' : '开启自动换行';
        });
        
        dom.get('#btn-line-numbers')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.editor.toggleLineNumbers();
            e.target.textContent = this.editor.isLineNumbersEnabled() ? '隐藏行号' : '显示行号';
        });
        
        dom.get('#btn-zen-mode')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.editor.toggleZenMode();
            e.target.textContent = this.editor.isZenModeEnabled() ? '退出专注模式' : '专注模式';
        });
        
        // 目录功能事件
        dom.get('#btn-toc')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.tocGenerator.toggle();
            e.target.textContent = this.tocGenerator.isEnabled() ? '关闭目录' : '开启目录';
        });
        
        // 导出功能事件
        dom.get('#btn-export-md')?.addEventListener('click', (e) => {
            e.preventDefault();
            const content = this.editor.getValue();
            this.exporter.exportMarkdown(content);
        });
        
        dom.get('#btn-export-html')?.addEventListener('click', async (e) => {
            e.preventDefault();
            const content = this.preview.getContainer().innerHTML;
            const currentTheme = this.themeManager.getCurrentPreviewTheme();
            const currentEffect = this.effectsManager.getCurrentEffect();
            await this.exporter.exportHtml(content, this.generateExportStyles(), null, this.generateExportFilename(currentTheme, currentEffect));
        });
        
        // 模板插入事件
        dom.querySelectorAll('.dropdown-content a[data-insert]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const templateType = e.target.dataset.insert;
                this.templateManager.insert(templateType, this.editor.getElement());
            });
        });
        
        // 全屏模式事件
        dom.get('#editor-fullscreen')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.layoutManager.toggleEditorFullscreen();
        });
        
        dom.get('#preview-fullscreen')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.layoutManager.togglePreviewFullscreen();
        });
        
        // 示例加载事件
        dom.querySelectorAll('.dropdown-content a[data-example]').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const exampleName = e.target.dataset.example;
                await this.loadExample(exampleName);
            });
        });
    }
    
    async loadExample(exampleName) {
        try {
            const loadingMsg = `# 加载中...\n\n正在加载 ${exampleName} 示例...`;
            this.editor.setValue(loadingMsg);
            
            // 获取示例文件路径
            const examplePath = this.getExamplePath(exampleName);
            
            // 加载示例文件
            const response = await fetch(`../examples/${examplePath}.md`);
            if (!response.ok) {
                throw new Error(`无法加载示例 (${response.status}): ${response.statusText}`);
            }
            
            const text = await response.text();
            this.editor.setValue(text);
            logger.info(`示例 "${exampleName}" 加载成功，内容长度: ${text.length}`);
        } catch (error) {
            logger.error('加载示例失败:', error);
            this.editor.setValue('# 加载失败\n\n无法加载示例文件：' + error.message);
        }
    }
    
    getExamplePath(exampleName) {
        const examplePathMap = {
            // 基础示例
            'welcome-demo': 'basic/welcome-demo',
            'academic-paper': 'basic/academic-paper',
            'highlight-blocks': 'basic/highlight-blocks',
            'math-formulas': 'basic/math-formulas',
            'multi-column': 'basic/multi-column',
            
            // 主题演示
            'purple-theme-demo': 'themes/purple-theme-demo',
            'minimal-dark-demo': 'themes/minimal-dark-demo',
            'modern-clean-demo': 'themes/modern-clean-demo',
            
            // 特效演示
            'deep-space-demo': 'effects/deep-space-demo',
            'mathematical-demo': 'effects/mathematical-demo',
            'effect-demo': 'effects/effect-demo',
            'timeline-demo': 'effects/timeline-demo',
            
            // 功能特性
            'combo-demo': 'features/combo-demo',
            'comprehensive-demo': 'features/comprehensive-demo',
            'responsive-test': 'features/responsive-test',
            'toc-test': 'features/toc-test',
            
            // 测试示例
            'ultimate-test': 'tests/ultimate-test',
            'feature-test': 'tests/feature-test',
            'function-test': 'tests/function-test'
        };
        
        return examplePathMap[exampleName] || `basic/${exampleName}`;
    }
    
    generateExportStyles() {
        const styles = [];
        // 添加基础样式
        styles.push(`
            body {
                margin: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            
            /* 代码高亮样式 */
            pre {
                background: #f6f8fa;
                border-radius: 6px;
                padding: 16px;
                overflow: auto;
            }
            
            code {
                background: #f6f8fa;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            }
            
            pre code {
                background: none;
                padding: 0;
            }
        `);
        
        // 添加当前主题的样式
        styles.push(this.themeManager.getCurrentPreviewThemeCSS());
        
        // 添加当前特效的样式
        const currentEffect = this.effectsManager.getCurrentEffect();
        if (currentEffect !== 'none') {
            styles.push(this.effectsManager.getEffectCSS(currentEffect));
        }
        
        return styles.join('\n\n');
    }
    
    generateExportFilename(theme, effect) {
        return `export-${theme}-${effect !== 'none' ? effect : 'plain'}-${new Date().toISOString().slice(0, 10)}.html`;
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

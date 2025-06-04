// ui/theme-manager.js
import { dom, logger } from '../utils/index.js';

export class ThemeManager {
    constructor(options = {}) {
        this.options = {
            editorContainer: '#markdown-input',
            previewContainer: '#preview-container',
            defaultEditorTheme: 'monokai',
            defaultPreviewTheme: 'github-light',
            ...options
        };
        
        this.currentEditorTheme = this.options.defaultEditorTheme;
        this.currentPreviewTheme = this.options.defaultPreviewTheme;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        try {
            this.editorContainer = dom.get(this.options.editorContainer);
            this.previewContainer = dom.get(this.options.previewContainer);
            
            if (!this.editorContainer || !this.previewContainer) {
                throw new Error('找不到编辑器或预览容器');
            }
            
            this.loadEditorTheme(this.currentEditorTheme);
            this.loadPreviewTheme(this.currentPreviewTheme);
            
            this.initialized = true;
            logger.info('主题管理器初始化完成');
        } catch (error) {
            logger.error('主题管理器初始化失败', error);
            throw error;
        }
    }
    
    loadEditorTheme(themeName) {
        try {
            this.currentEditorTheme = themeName;
            const themeUrl = `/themes/editor/${themeName}.css`;
            
            // 移除旧的编辑器主题样式
            dom.removeStyleByUrl(themeUrl);
            
            // 加载新主题
            return fetch(themeUrl)
                .then(response => response.text())
                .then(css => {
                    dom.addStyle(css, themeUrl);
                    logger.info('编辑器主题加载成功:', themeName);
                });
        } catch (error) {
            logger.error('加载编辑器主题失败:', error);
            throw error;
        }
    }
    
    loadPreviewTheme(themeName) {
        try {
            this.currentPreviewTheme = themeName;
            const themeUrl = `/themes/${themeName}.css`;
            
            return fetch(themeUrl)
                .then(response => response.text())
                .then(css => {
                    // 为预览区域创建独立的主题作用域
                    let scopedCss = '';
                    const rules = css.split('}');
                    
                    rules.forEach(rule => {
                        if (rule.trim()) {
                            const [selector, ...declarations] = rule.split('{');
                            if (selector && declarations.length > 0) {
                                let newSelector = selector.trim();
                                
                                // 跳过一些不需要作用域的规则
                                if (newSelector.includes('@') || newSelector.includes(':root')) {
                                    scopedCss += rule + '}\\n';
                                    return;
                                }
                                
                                // 将选择器限制在预览容器内
                                newSelector = newSelector
                                    .split(',')
                                    .map(s => `#preview-container ${s.trim()}`)
                                    .join(',');
                                
                                scopedCss += `${newSelector}{${declarations.join('{')}}\\n`;
                            }
                        }
                    });
                    
                    // 移除旧的预览主题样式
                    dom.removeStyleByUrl(themeUrl);
                    
                    // 添加新的主题样式
                    dom.addStyle(scopedCss, themeUrl);
                    logger.info('预览主题加载成功:', themeName);
                });
        } catch (error) {
            logger.error('加载预览主题失败:', error);
            throw error;
        }
    }
    
    getCurrentEditorTheme() {
        return this.currentEditorTheme;
    }
    
    getCurrentPreviewTheme() {
        return this.currentPreviewTheme;
    }
}

export default ThemeManager;

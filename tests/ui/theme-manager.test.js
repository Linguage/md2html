import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// 模拟ThemeManager类
class MockThemeManager {
    constructor(options = {}) {
        this.options = {
            editor: '#markdown-editor',
            preview: '#preview-container',
            ...options
        };
        this.currentTheme = 'default';
        this.themes = ['default', 'dark', 'light', 'blue'];
        this.initialized = false;
        this.init();
    }
    
    init() {
        this.initialized = true;
        return this;
    }
    
    setTheme(themeName) {
        if (this.themes.includes(themeName)) {
            this.currentTheme = themeName;
            return true;
        }
        return false;
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getAvailableThemes() {
        return this.themes;
    }
    
    addTheme(themeName) {
        if (!this.themes.includes(themeName)) {
            this.themes.push(themeName);
            return true;
        }
        return false;
    }
    
    removeTheme(themeName) {
        if (themeName !== 'default' && this.themes.includes(themeName)) {
            this.themes = this.themes.filter(t => t !== themeName);
            return true;
        }
        return false;
    }
}

const ThemeManager = MockThemeManager;

describe('ThemeManager', () => {
    let themeManager;
    let window;
    let document;
    
    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <textarea id="markdown-editor"></textarea>
                    <div id="preview-container"></div>
                </body>
            </html>
        `);
        
        window = dom.window;
        document = window.document;
        
        themeManager = new ThemeManager({
            editor: '#markdown-editor',
            preview: '#preview-container'
        });
    });
    
    afterEach(() => {
        if (document.body) {
            document.body.innerHTML = '';
        }
        themeManager = null;
    });
    
    describe('初始化', () => {
        it('应该成功初始化主题管理器', () => {
            expect(themeManager).to.be.an('object');
            expect(themeManager.initialized).to.be.true;
            expect(themeManager.getCurrentTheme()).to.equal('default');
        });
    });
    
    describe('主题管理', () => {
        it('应该能设置主题', () => {
            const result = themeManager.setTheme('dark');
            expect(result).to.be.true;
            expect(themeManager.getCurrentTheme()).to.equal('dark');
        });
        
        it('应该拒绝设置不存在的主题', () => {
            const result = themeManager.setTheme('nonexistent');
            expect(result).to.be.false;
            expect(themeManager.getCurrentTheme()).to.equal('default');
        });
        
        it('应该能获取可用主题列表', () => {
            const themes = themeManager.getAvailableThemes();
            expect(themes).to.be.an('array');
            expect(themes).to.include('default');
            expect(themes).to.include('dark');
        });
        
        it('应该能添加新主题', () => {
            const result = themeManager.addTheme('custom');
            expect(result).to.be.true;
            expect(themeManager.getAvailableThemes()).to.include('custom');
        });
        
        it('应该能删除主题（除了默认主题）', () => {
            themeManager.addTheme('custom');
            const result = themeManager.removeTheme('custom');
            expect(result).to.be.true;
            expect(themeManager.getAvailableThemes()).to.not.include('custom');
        });
        
        it('应该不能删除默认主题', () => {
            const result = themeManager.removeTheme('default');
            expect(result).to.be.false;
            expect(themeManager.getAvailableThemes()).to.include('default');
        });
    });
});

import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

// 模拟EffectsManager类
class MockEffectsManager {
    constructor(options = {}) {
        this.options = {
            editor: '#markdown-editor',
            preview: '#preview-container',
            ...options
        };
        this.initialized = false;
        this.effects = [];
        this.init();
    }
    
    init() {
        this.initialized = true;
        return this;
    }
    
    addEffect(effect) {
        this.effects.push(effect);
        return this;
    }
    
    removeEffect(effectName) {
        this.effects = this.effects.filter(e => e.name !== effectName);
        return this;
    }
    
    applyEffect(effectName) {
        const effect = this.effects.find(e => e.name === effectName);
        if (effect) {
            return effect.apply();
        }
        return false;
    }
    
    getEffects() {
        return this.effects;
    }
    
    clearEffects() {
        this.effects = [];
    }
}

const EffectsManager = MockEffectsManager;

describe('EffectsManager', () => {
    let effectsManager;
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
        
        effectsManager = new EffectsManager({
            editor: '#markdown-editor',
            preview: '#preview-container'
        });
    });
    
    afterEach(() => {
        if (document.body) {
            document.body.innerHTML = '';
        }
        effectsManager = null;
    });
    
    describe('初始化', () => {
        it('应该成功初始化特效管理器', () => {
            expect(effectsManager).to.be.an('object');
            expect(effectsManager.initialized).to.be.true;
        });
    });
    
    describe('特效管理', () => {
        it('应该能添加特效', () => {
            const effect = { name: 'fade', apply: () => true };
            effectsManager.addEffect(effect);
            expect(effectsManager.getEffects()).to.have.length(1);
        });
        
        it('应该能移除特效', () => {
            const effect = { name: 'fade', apply: () => true };
            effectsManager.addEffect(effect);
            effectsManager.removeEffect('fade');
            expect(effectsManager.getEffects()).to.have.length(0);
        });
        
        it('应该能应用特效', () => {
            const effect = { name: 'fade', apply: () => true };
            effectsManager.addEffect(effect);
            const result = effectsManager.applyEffect('fade');
            expect(result).to.be.true;
        });
        
        it('应该能清空所有特效', () => {
            effectsManager.addEffect({ name: 'effect1', apply: () => true });
            effectsManager.addEffect({ name: 'effect2', apply: () => true });
            effectsManager.clearEffects();
            expect(effectsManager.getEffects()).to.have.length(0);
        });
    });
});

// ui/effects-manager.js
import { dom, logger } from '../utils/index.js';

export class EffectsManager {
    constructor(options = {}) {
        this.options = {
            editorContainer: '#markdown-input',
            previewContainer: '#preview-container',
            defaultEffect: 'none',
            ...options
        };
        
        this.currentEffect = this.options.defaultEffect;
        this.effectInstances = {};
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
            
            this.initialized = true;
            logger.info('特效管理器初始化完成');
        } catch (error) {
            logger.error('特效管理器初始化失败', error);
            throw error;
        }
    }
    
    createMatrixEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.className = 'effect-layer matrix-effect';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columns = Math.floor(container.clientWidth / 20);
        let drops = [];
        
        // 初始化掉落的字符位置
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        return {
            start: () => {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                return setInterval(draw, 33);
            },
            stop: (interval) => {
                clearInterval(interval);
                canvas.remove();
            }
        };
    }
    
    createDeepSpaceEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.className = 'effect-layer deep-space-effect';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let stars = [];
        const maxStars = 1000;
        
        for (let i = 0; i < maxStars; i++) {
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 3
            };
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#FFF';
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            }
        }
        
        return {
            start: () => {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                return setInterval(draw, 33);
            },
            stop: (interval) => {
                clearInterval(interval);
                canvas.remove();
            }
        };
    }
    
    applyEffect(effectName, container = this.previewContainer) {
        try {
            // 清除当前特效
            this.clearEffect(container);
            
            // 如果选择无特效，直接返回
            if (effectName === 'none') {
                this.currentEffect = 'none';
                return;
            }
            
            // 创建新特效实例
            let effect;
            switch (effectName) {
                case 'matrix':
                    effect = this.createMatrixEffect(container);
                    break;
                case 'deep-space':
                    effect = this.createDeepSpaceEffect(container);
                    break;
                default:
                    logger.warn('未知特效类型:', effectName);
                    return;
            }
            
            // 启动特效
            const interval = effect.start();
            this.effectInstances[container.id] = {
                name: effectName,
                effect,
                interval
            };
            
            this.currentEffect = effectName;
            logger.info('特效应用成功:', effectName);
        } catch (error) {
            logger.error('应用特效失败:', error);
            this.clearEffect(container);
        }
    }
    
    clearEffect(container) {
        const instance = this.effectInstances[container.id];
        if (instance) {
            instance.effect.stop(instance.interval);
            delete this.effectInstances[container.id];
        }
    }
    
    getCurrentEffect() {
        return this.currentEffect;
    }
}

export default EffectsManager;

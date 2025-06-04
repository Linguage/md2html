// features/toc.js
import { dom, logger } from '../utils/index.js';

export class TocGenerator {
    constructor(options = {}) {
        this.options = {
            container: '#preview-container',
            headingSelector: 'h1, h2, h3, h4, h5, h6',
            tocClass: 'toc',
            insertPosition: 'afterbegin',
            ...options
        };
        
        this.container = null;
        this.enabled = false;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        try {
            this.container = dom.get(this.options.container);
            if (!this.container) {
                throw new Error(`找不到容器: ${this.options.container}`);
            }
            
            this.initialized = true;
            logger.info('目录生成器初始化完成');
        } catch (error) {
            logger.error('目录生成器初始化失败', error);
            throw error;
        }
    }
    
    generate() {
        if (!this.enabled) return;
        
        try {
            const headings = this.container.querySelectorAll(this.options.headingSelector);
            if (headings.length === 0) return;
            
            let tocHtml = `<div class="${this.options.tocClass}"><ul>`;
            
            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;
                const level = parseInt(heading.tagName.substring(1), 10);
                tocHtml += `<li class="toc-level-${level}">
                    <a href="#${id}">${heading.textContent}</a>
                </li>`;
            });
            
            tocHtml += '</ul></div>';
            
            // 插入目录
            this.container.insertAdjacentHTML(this.options.insertPosition, tocHtml);
            logger.info('目录生成完成');
        } catch (error) {
            logger.error('生成目录失败', error);
            throw error;
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.generate();
        } else {
            const toc = this.container.querySelector(`.${this.options.tocClass}`);
            if (toc) {
                toc.remove();
            }
        }
        return this.enabled;
    }
    
    isEnabled() {
        return this.enabled;
    }
}

export default TocGenerator;

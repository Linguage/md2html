// core/preview.js
import { dom, logger } from '../utils/index.js';

export class Preview {
    constructor(options = {}) {
        this.options = {
            container: '#preview-container',
            markedOptions: {
                pedantic: false,
                gfm: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            },
            ...options
        };
        
        this.container = null;
        this.tocEnabled = false;
        this.mathSupport = true;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        try {
            this.container = dom.get(this.options.container);
            if (!this.container) {
                throw new Error(`找不到预览容器: ${this.options.container}`);
            }
            
            this.setupMarked();
            this.initialized = true;
            
            logger.info('预览初始化完成');
        } catch (error) {
            logger.error('预览初始化失败', error);
            throw error;
        }
    }
    
    setupMarked() {
        if (typeof marked === 'undefined') {
            throw new Error('Marked 库未加载');
        }
        
        // 设置 Marked 选项
        marked.setOptions({
            ...this.options.markedOptions,
            highlight: this.highlightCode
        });
    }
    
    // 代码高亮处理
    highlightCode(code, lang) {
        if (typeof hljs !== 'undefined') {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
        return code;
    }
    
    // 更新预览内容
    async update(markdown) {
        try {
            this.container.classList.add('updating');
            
            // 解析 Markdown
            const html = marked.parse(markdown);
            
            // 处理自定义语法
            const processedHtml = this.processCustomSyntax(html);
            
            // 更新预览内容
            this.container.innerHTML = processedHtml;
            
            // 处理数学公式
            await this.renderMath();
            
            // 生成目录
            if (this.tocEnabled) {
                this.generateToc();
            }
            
            this.container.classList.remove('updating');
            logger.info('预览更新完成');
            
        } catch (error) {
            logger.error('预览更新失败', error);
            this.container.innerHTML = `<div class="error">预览更新失败: ${error.message}</div>`;
            throw error;
        }
    }
    
    // 处理自定义语法
    processCustomSyntax(html) {
        // 处理高亮块语法
        html = html.replace(/:::(info|warning|success|error)\s*([\s\S]*?):::/g, 
            (match, type, content) => `<div class="highlight-block ${type}">${content.trim()}</div>`
        );
        
        // 处理卡片布局
        html = html.replace(/::cards-(\d+)\s*([\s\S]*?)::cards/g, 
            (match, columns, content) => {
                const columnClass = columns === '1' ? 'single' : columns === '2' ? 'double' : 'triple';
                const cards = content.trim().split('---').map(cardContent => {
                    const lines = cardContent.trim().split('\n');
                    const title = lines[0].replace(/^#+\s*/, '');
                    const body = lines.slice(1).join('\n');
                    return `<div class="card">
                        <div class="card-title">${title}</div>
                        <div class="card-content">${marked.parse(body)}</div>
                    </div>`;
                }).join('');
                return `<div class="card-container ${columnClass}">${cards}</div>`;
            }
        );
        
        // 处理时间线语法
        html = html.replace(/::timeline\s*([\s\S]*?)::timeline/g,
            (match, content) => {
                const items = content.trim().split('---').map(itemContent => {
                    const lines = itemContent.trim().split('\n');
                    const date = lines[0];
                    const body = lines.slice(1).join('\n');
                    return `<div class="timeline-item">
                        <div class="timeline-date">${date}</div>
                        <div class="timeline-content">${marked.parse(body)}</div>
                    </div>`;
                }).join('');
                return `<div class="timeline">${items}</div>`;
            }
        );
        
        return html;
    }
    
    // 渲染数学公式
    async renderMath() {
        if (!this.mathSupport || typeof renderMathInElement === 'undefined') return;
        
        try {
            await renderMathInElement(this.container, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "\\(", right: "\\)", display: false}
                ],
                throwOnError: false
            });
        } catch (error) {
            logger.error('数学公式渲染失败', error);
        }
    }
    
    // 生成目录
    generateToc() {
        const headings = this.container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) return;
        
        let tocHtml = '<div class="toc"><ul>';
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            const level = parseInt(heading.tagName.substring(1), 10);
            tocHtml += `<li class="toc-level-${level}"><a href="#${id}">${heading.textContent}</a></li>`;
        });
        tocHtml += '</ul></div>';
        
        this.container.insertAdjacentHTML('afterbegin', tocHtml);
    }
    
    // 切换目录显示
    toggleToc() {
        this.tocEnabled = !this.tocEnabled;
        if (this.tocEnabled) {
            this.generateToc();
        } else {
            const toc = this.container.querySelector('.toc');
            toc?.remove();
        }
        return this.tocEnabled;
    }
    
    // 切换数学公式支持
    toggleMathSupport() {
        this.mathSupport = !this.mathSupport;
        return this.mathSupport;
    }
}

export default Preview;

/* eslint-disable no-undef */
// public/js/app.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 内容已加载，开始初始化编辑器...');
    
    // 获取关键 DOM 元素
    const markdownInput = document.getElementById('markdown-editor');
    if (!markdownInput) {
        console.error('找不到 #markdown-editor 元素');
        alert('初始化失败：找不到编辑器元素');
        return;
    }
    
    // 确保 textarea 可见并设置样式
    console.log('设置编辑器样式...');
    markdownInput.style.display = 'block';
    markdownInput.style.width = '100%';
    markdownInput.style.height = '100%';
    markdownInput.style.boxSizing = 'border-box';
    markdownInput.style.padding = '10px';
    markdownInput.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
    markdownInput.style.fontSize = '14px';
    markdownInput.style.border = 'none';
    markdownInput.style.resize = 'none';
    markdownInput.style.outline = 'none';
    markdownInput.style.backgroundColor = 'var(--app-editor-bg)';
    markdownInput.setAttribute('spellcheck', 'false');
    
    // 设置默认内容
    const defaultText = '# 欢迎使用 MD2HTML\n\n在此输入 Markdown 内容...';
    markdownInput.value = defaultText;
    console.log('已设置默认文本，长度:', defaultText.length);
    
    // 监听输入事件，触发实时预览
    console.log('添加输入事件监听...');

    const previewContainer = document.getElementById('preview-container');
    const themeStyle = document.getElementById('preview-theme-style');
    const editorThemeStyle = document.getElementById('editor-theme-style');
    const editorContainer = document.querySelector('.editor-container');
    const lineNumbers = document.getElementById('line-numbers');
    let currentPreviewTheme = 'github-light'; // 默认预览主题
    let currentEditorTheme = 'vs-light'; // 默认编辑器主题
    let currentEditorEffect = 'none'; // 默认编辑器特效
    let currentEffect = 'none'; // 默认预览特效
    let tocEnabled = false;
    let responsiveEnabled = true;
    let mathSupport = true; // 数学公式支持
    let isDarkMode = false; // 页面暗色/亮色模式
    let lineNumbersEnabled = false;
    let wordWrapEnabled = true;
    let zenModeEnabled = false;

    // 初始化 marked
    marked.setOptions({
        highlight: function (code, lang) {
            // 检查 hljs 是否已定义
            if (typeof hljs !== 'undefined') {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
            return code; // 如果 hljs 未定义，则返回原始代码
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    // 初始化时加载默认主题
    loadPreviewTheme(currentPreviewTheme);
    loadEditorTheme(currentEditorTheme);
    
    // 初始化分隔线拖动功能
    initResizer();
    
    // 加载预览主题CSS但仅应用于预览区域
    function loadPreviewTheme(themeName) {
        fetch(`../themes/${themeName}.css`)
            .then(response => response.text())
            .then(css => {
                // 为预览区域创建独立的主题作用域
                // 将所有CSS规则限制在 #preview-container 内
                let scopedCss = '';
                
                // 分割CSS规则
                const rules = css.split('}');
                rules.forEach(rule => {
                    if (rule.trim()) {
                        const [selector, ...declarations] = rule.split('{');
                        if (selector && declarations.length > 0) {
                            // 处理选择器，确保只应用到预览容器
                            let newSelector = selector.trim();
                            
                            // 跳过一些不需要作用域的规则
                            if (newSelector.includes('@') || newSelector.includes(':root')) {
                                scopedCss += rule + '}\n';
                                return;
                            }
                            
                            // 替换通用选择器
                            newSelector = newSelector
                                .replace(/\bbody\b/g, '#preview-container')
                                .replace(/\bhtml\b/g, '#preview-container')
                                .replace(/^(\s*)([^#\.\[]+)(\s*[,\{])/gm, '$1#preview-container $2$3');
                            
                            // 如果选择器不是以 # 开头，添加预览容器前缀
                            if (!newSelector.includes('#preview-container')) {
                                newSelector = '#preview-container ' + newSelector;
                            }
                            
                            scopedCss += newSelector + '{' + declarations.join('{') + '}\n';
                        }
                    }
                });
                
                themeStyle.textContent = scopedCss;
                console.log('预览主题已加载:', themeName);
            })
            .catch(error => {
                console.error('加载预览主题失败:', error);
                // 使用基础样式作为后备
                themeStyle.textContent = `
                    #preview-container {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 100%;
                        margin: 0;
                        padding: 20px;
                    }
                `;
            });
    }
    
    // 加载编辑器主题
    function loadEditorTheme(themeName) {
        fetch(`../themes/editor/${themeName}.css`)
            .then(response => response.text())
            .then(css => {
                editorThemeStyle.textContent = css;
                editorContainer.className = `editor-container ${themeName}`;
            })
            .catch(error => {
                console.error('加载编辑器主题失败:', error);
            });
    }

    // 加载特效CSS
    function loadEffectCSS(effectName) {
        if (!effectName || effectName === 'none') {
            // 清除特效样式
            const existingStyle = document.getElementById('theme-effects-style');
            if (existingStyle) {
                existingStyle.remove();
            }
            return;
        }

        // 创建或获取特效样式元素
        let effectStyle = document.getElementById('theme-effects-style');
        if (!effectStyle) {
            effectStyle = document.createElement('style');
            effectStyle.id = 'theme-effects-style';
            document.head.appendChild(effectStyle);
        }

        // 动态生成特效CSS
        const effectClassName = getEffectClassName(effectName);
        if (effectClassName) {
            const baseCSS = `
                /* ${effectName} 特效样式 */
                .${effectClassName} {
                    position: relative;
                }
                
                .${effectClassName} * {
                    transition: all 0.3s ease;
                }
                
                .${effectClassName} *:hover {
                    transition: all 0.2s ease-out;
                }
            `;
            
            // 根据特效类型添加特定样式
            let specificCSS = '';
            switch (effectName) {
                case 'particles':
                    specificCSS = `
                        .${effectClassName}::before {
                            content: '';
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: -1;
                            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                        }
                        
                        .${effectClassName}::after {
                            content: '';
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: 1;
                            background-image: 
                                radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.05) 2px, transparent 2px);
                            background-size: 100px 100px, 150px 150px, 200px 200px;
                            animation: particleFloat 20s linear infinite;
                        }
                        
                        @keyframes particleFloat {
                            0%, 100% { 
                                transform: translateY(0px) rotate(0deg); 
                                opacity: 0.7; 
                            }
                            50% { 
                                transform: translateY(-20px) rotate(180deg); 
                                opacity: 1; 
                            }
                        }
                    `;
                    break;
                case 'deep-space':
                    specificCSS = `
                        .${effectClassName} {
                            background: #000;
                            color: #fff;
                        }
                        
                        .${effectClassName}::before {
                            content: '';
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: -1;
                            background: 
                                radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0));
                            background-size: 200px 200px;
                        }
                    `;
                    break;
                case 'mathematical':
                    specificCSS = `
                        .${effectClassName}::before {
                            content: '∑ ∫ ∞ π α β γ δ ε ζ η θ';
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: -1;
                            color: rgba(255, 215, 0, 0.05);
                            font-size: 24px;
                            overflow: hidden;
                            white-space: pre-wrap;
                            animation: mathFloat 8s ease-in-out infinite;
                        }
                        
                        @keyframes mathFloat {
                            0%, 100% { 
                                transform: translateY(0) rotate(0deg); 
                                opacity: 0.1; 
                            }
                            50% { 
                                transform: translateY(-30px) rotate(10deg); 
                                opacity: 0.3; 
                            }
                        }
                    `;
                    break;
            }
            
            effectStyle.textContent = baseCSS + specificCSS;
            console.log('特效CSS已加载:', effectName);
        }
    }
    
    // 处理自定义扩展语法
    function processCustomSyntax(html) {
        // 处理高亮块语法 :::info :::warning :::success :::error
        html = html.replace(/:::(info|warning|success|error)\s*([\s\S]*?):::/g, (match, type, content) => {
            return `<div class="highlight-block ${type}">${content.trim()}</div>`;
        });
        
        // 处理多列卡片布局
        html = html.replace(/::cards-(\d+)\s*([\s\S]*?)::cards/g, (match, columns, content) => {
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
        });
        
        // 处理时间线语法
        html = html.replace(/::timeline\s*([\s\S]*?)::timeline/g, (match, content) => {
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
        });
        
        return html;
    }
    
    // 更新行号显示
    function updateLineNumbers() {
        if (!lineNumbersEnabled) return;
        
        const lines = markdownInput.value.split('\n');
        const lineCount = lines.length;
        let numbersHtml = '';
        
        for (let i = 1; i <= lineCount; i++) {
            numbersHtml += `${i}\n`;
        }
        
        lineNumbers.textContent = numbersHtml;
    }
    
    // 插入模板内容
    function insertTemplate(type) {
        const templates = {
            'code-block': '```javascript\n// 代码示例\nfunction hello() {\n    console.log("Hello World!");\n}\n```\n\n',
            'math-inline': '这是行内数学公式：$E = mc^2$\n\n',
            'math-block': '$$\n\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\n$$\n\n',
            'highlight': ':::info\n这是一个信息提示框\n:::\n\n',
            'info-box': ':::info\nℹ️ 这是一个信息框\n:::\n\n',
            'warning-box': ':::warning\n⚠️ 这是一个警告框\n:::\n\n',
            'success-box': ':::success\n✅ 这是一个成功框\n:::\n\n',
            'error-box': ':::error\n❌ 这是一个错误框\n:::\n\n',
            'card-single': '::cards-1\n# 卡片标题\n卡片内容描述\n::cards\n\n',
            'card-double': '::cards-2\n# 卡片1\n第一个卡片内容\n---\n# 卡片2\n第二个卡片内容\n::cards\n\n',
            'card-triple': '::cards-3\n# 卡片1\n内容1\n---\n# 卡片2\n内容2\n---\n# 卡片3\n内容3\n::cards\n\n',
            'timeline': '::timeline\n2025年1月\n项目启动，开始需求分析\n---\n2025年2月\n完成技术选型和架构设计\n---\n2025年3月\n开发阶段，实现核心功能\n::timeline\n\n',
            'gallery': '![图片1](https://via.placeholder.com/300x200?text=Image+1)\n![图片2](https://via.placeholder.com/300x200?text=Image+2)\n![图片3](https://via.placeholder.com/300x200?text=Image+3)\n\n'
        };
        
        const template = templates[type];
        if (template) {
            const start = markdownInput.selectionStart;
            const end = markdownInput.selectionEnd;
            const value = markdownInput.value;
            
            markdownInput.value = value.substring(0, start) + template + value.substring(end);
            markdownInput.selectionStart = markdownInput.selectionEnd = start + template.length;
            markdownInput.focus();
            updatePreview();
        }
    }
    
    // 实时预览功能
    function updatePreview() {
        try {
            // 显示调试信息
            console.log('--------- 开始更新预览 ---------');
            
            // 检查 marked 是否可用
            if (typeof marked === 'undefined') {
                console.error('错误：marked 库未加载');
                previewContainer.innerHTML = '<div class="error">错误：Markdown 解析库未加载</div>';
                return;
            }

            // 从编辑器获取文本
            const markdownText = markdownInput.value; // 直接从输入元素获取
            console.log('Markdown 文本:', markdownText.substring(0, 100) + (markdownText.length > 100 ? '...' : ''));
            console.log('内容长度:', markdownText.length);
            
            // 标记预览区正在更新
            previewContainer.classList.add('updating');
            
            // 使用 marked 解析 Markdown
            const html = marked.parse(markdownText);
            console.log('解析后 HTML 长度:', html.length);
            console.log('解析后 HTML 内容片段:', html.substring(0, 100) + (html.length > 100 ? '...' : ''));
            
            // 处理自定义扩展语法
            const processedHtml = processCustomSyntax(html);
            
            // 更新预览区内容
            previewContainer.innerHTML = processedHtml;
            
            // 渲染数学公式
            if (mathSupport && typeof renderMathInElement !== 'undefined') {
                renderMathInElement(previewContainer, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false},
                        {left: "\\[", right: "\\]", display: true},
                        {left: "\\(", right: "\\)", display: false}
                    ]
                });
            }
            console.log('预览区已更新');
            
            // 应用主题和特效
            console.log('应用主题:', currentPreviewTheme, '特效:', currentEffect);
            // 注意：预览主题已通过CSS应用，这里不需要额外操作
            
            // 应用预览特效
            if (currentEffect && currentEffect !== 'none' && typeof themeEffects !== 'undefined') {
                console.log('应用预览特效:', currentEffect);
                try {
                    // 清除之前的特效类
                    previewContainer.className = previewContainer.className.replace(/theme-effect-\w+/g, '').trim();
                    
                    // 应用特效CSS类
                    const effectClassName = getEffectClassName(currentEffect);
                    if (effectClassName) {
                        previewContainer.classList.add(effectClassName);
                    }
                    
                    // 应用JavaScript特效
                    if (themeEffects[currentEffect] && themeEffects[currentEffect].apply) {
                        themeEffects[currentEffect].apply(previewContainer);
                    }
                    
                    console.log('预览特效应用成功:', currentEffect);
                } catch (error) {
                    console.warn('应用预览特效失败:', currentEffect, error);
                }
            }
            
            // 处理额外功能
            if (tocEnabled) {
                console.log('生成目录');
                generateToc();
            }
            
            // 移除更新标记
            previewContainer.classList.remove('updating');
            
            console.log('--------- 预览更新完成 ---------');
        } catch (error) {
            console.error('预览更新失败:', error);
            previewContainer.innerHTML = `<div class="error">预览更新失败: ${error.message}</div>`;
        }
    }
    
    // 直接绑定实时更新，确保每次输入都触发预览
    markdownInput.addEventListener('input', function() {
        console.log('检测到输入变化');
        updatePreview();
    });
    
    // 添加粘贴事件监听
    markdownInput.addEventListener('paste', function(e) {
        console.log('粘贴事件触发');
        // 让自然粘贴行为发生
        setTimeout(updatePreview, 10); // 短延迟确保内容已粘贴
    });

    // 预览主题切换
    console.log('初始化预览主题选择器...');
    document.querySelectorAll('.dropdown-content a[data-preview-theme]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPreviewTheme = e.target.dataset.previewTheme;
            console.log('预览主题切换为:', currentPreviewTheme);
            loadPreviewTheme(currentPreviewTheme);
            updatePreview();
        });
    });
    
    // 编辑器主题切换
    document.querySelectorAll('.dropdown-content a[data-editor-theme]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentEditorTheme = e.target.dataset.editorTheme;
            console.log('编辑器主题切换为:', currentEditorTheme);
            loadEditorTheme(currentEditorTheme);
        });
    });
    
    // 编辑器特效切换
    document.querySelectorAll('.dropdown-content a[data-editor-effect]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentEditorEffect = e.target.dataset.editorEffect;
            console.log('编辑器特效切换为:', currentEditorEffect);
            applyEditorEffect(currentEditorEffect);
        });
    });
    
    // 插入模板内容
    document.querySelectorAll('.dropdown-content a[data-insert]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const templateType = e.target.dataset.insert;
            console.log('插入模板:', templateType);
            insertTemplate(templateType);
        });
    });
    
    // 编辑器控件
    document.getElementById('btn-word-wrap').addEventListener('click', (e) => {
        e.preventDefault();
        wordWrapEnabled = !wordWrapEnabled;
        e.target.textContent = wordWrapEnabled ? '关闭自动换行' : '开启自动换行';
        markdownInput.style.whiteSpace = wordWrapEnabled ? 'pre-wrap' : 'pre';
    });
    
    document.getElementById('btn-line-numbers').addEventListener('click', (e) => {
        e.preventDefault();
        lineNumbersEnabled = !lineNumbersEnabled;
        e.target.textContent = lineNumbersEnabled ? '隐藏行号' : '显示行号';
        if (lineNumbersEnabled) {
            lineNumbers.classList.add('visible');
            updateLineNumbers();
            markdownInput.addEventListener('input', updateLineNumbers);
            markdownInput.addEventListener('scroll', updateLineNumbers);
        } else {
            lineNumbers.classList.remove('visible');
            markdownInput.removeEventListener('input', updateLineNumbers);
            markdownInput.removeEventListener('scroll', updateLineNumbers);
        }
    });
    
    document.getElementById('btn-zen-mode').addEventListener('click', (e) => {
        e.preventDefault();
        zenModeEnabled = !zenModeEnabled;
        e.target.textContent = zenModeEnabled ? '退出专注模式' : '专注模式';
        document.querySelector('.main-content').classList.toggle('zen-mode', zenModeEnabled);
    });
    
    // 应用编辑器特效
    function applyEditorEffect(effectType) {
        const effectsContainer = document.getElementById('editor-effects');
        effectsContainer.innerHTML = ''; // 清除现有特效
        
        if (effectType === 'particles') {
            effectsContainer.innerHTML = '<div id="editor-particles"></div>';
            if (typeof particlesJS !== 'undefined') {
                particlesJS('editor-particles', {
                    particles: {
                        number: { value: 50 },
                        color: { value: '#64b5f6' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.3 },
                        size: { value: 3, random: true },
                        move: { enable: true, speed: 1 }
                    }
                });
            }
        } else if (effectType === 'deep-space') {
            effectsContainer.innerHTML = '<div id="editor-space"></div>';
            if (typeof particlesJS !== 'undefined') {
                particlesJS('editor-space', {
                    particles: {
                        number: { value: 100 },
                        color: { value: '#ffffff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.8 },
                        size: { value: 1, random: true },
                        move: { enable: true, speed: 0.5 }
                    },
                    interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'grab' } } }
                });
            }
            effectsContainer.style.background = 'linear-gradient(45deg, #0f0f23, #1a1a2e, #16213e)';
        } else if (effectType === 'matrix') {
            createMatrixEffect(effectsContainer);
        } else if (effectType === 'waves') {
            createWaveEffect(effectsContainer);
        }
    }
    
    // Matrix效果
    function createMatrixEffect(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const font_size = 10;
        const columns = canvas.width / font_size;
        const drops = [];
        
        for(let x = 0; x < columns; x++) drops[x] = 1;
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = font_size + 'px arial';
            
            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * font_size, drops[i] * font_size);
                
                if(drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    }
    
    // Wave效果
    function createWaveEffect(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        let time = 0;
        
        function drawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(100, 181, 246, 0.3)';
            ctx.lineWidth = 2;
            
            for(let i = 0; i < 3; i++) {
                ctx.beginPath();
                for(let x = 0; x < canvas.width; x++) {
                    const y = canvas.height / 2 + Math.sin((x + time + i * 100) * 0.01) * (20 + i * 10);
                    if(x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            
            time += 2;
            requestAnimationFrame(drawWave);
        }
        
        drawWave();
    }

    // 特效切换
    console.log('初始化特效选择器...');
    document.querySelectorAll('.dropdown-content a[data-effect]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentEffect = e.target.dataset.effect;
            console.log('特效切换为:', currentEffect);
            
            // 加载特效CSS
            loadEffectCSS(currentEffect);
            
            // 更新预览
            updatePreview();
        });
    });

    // 应用编辑器特效
    function applyEditorEffect(effectName) {
        const effectsContainer = document.getElementById('editor-effects');
        if (!effectsContainer) return;
        
        // 清除现有特效
        effectsContainer.innerHTML = '';
        effectsContainer.className = 'editor-background-effects';
        
        // 停止现有的粒子效果
        if (window.currentParticlesInstance) {
            window.currentParticlesInstance.destroy();
            window.currentParticlesInstance = null;
        }
        
        // 应用新特效
        if (effectName && effectName !== 'none') {
            console.log('应用编辑器特效:', effectName);
            switch (effectName) {
                case 'particles':
                    effectsContainer.innerHTML = '<div id="particles-js"></div>';
                    if (typeof particlesJS !== 'undefined') {
                        particlesJS('particles-js', {
                            particles: {
                                number: { value: 50 },
                                color: { value: '#ffffff' },
                                shape: { type: 'circle' },
                                opacity: { value: 0.5 },
                                size: { value: 3 },
                                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                                move: { enable: true, speed: 2 }
                            }
                        });
                    }
                    break;
                case 'matrix':
                    createMatrixEffect(effectsContainer);
                    break;
                case 'waves':
                    createWaveEffect(effectsContainer);
                    break;
                case 'deep-space':
                    createDeepSpaceEffect(effectsContainer);
                    break;
            }
        }
    }

    // 目录生成
    function generateToc() {
        const headings = previewContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) return;

        let tocHtml = '<div class="toc"><ul>';
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            const level = parseInt(heading.tagName.substring(1), 10);
            tocHtml += `<li class="toc-level-${level}"><a href="#${id}">${heading.textContent}</a></li>`;
        });
        tocHtml += '</ul></div>';
        // 将目录插入到预览内容的开头
        previewContainer.insertAdjacentHTML('afterbegin', tocHtml);
    }

    // 设置按钮事件
    document.getElementById('btn-toc').addEventListener('click', (e) => {
        e.preventDefault();
        tocEnabled = !tocEnabled;
        e.target.textContent = tocEnabled ? '关闭目录' : '开启目录';
        updatePreview();
    });

    document.getElementById('btn-responsive').addEventListener('click', (e) => {
        e.preventDefault();
        responsiveEnabled = !responsiveEnabled;
        e.target.textContent = responsiveEnabled ? '关闭响应式' : '开启响应式';
        // 这里可以添加或移除响应式相关的类或逻辑
        updatePreview();
    });
    
    // 数学公式支持切换
    document.getElementById('btn-math-support').addEventListener('click', (e) => {
        e.preventDefault();
        mathSupport = !mathSupport;
        e.target.textContent = mathSupport ? '关闭数学公式' : '开启数学公式';
        updatePreview();
    });
    
    // 页面暗色/亮色模式切换
    document.getElementById('btn-theme-mode').addEventListener('click', (e) => {
        e.preventDefault();
        isDarkMode = !isDarkMode;
        e.target.textContent = isDarkMode ? '切换亮色模式' : '切换暗色模式';
        
        // 切换页面的整体暗色/亮色模式
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.querySelector('.app-container').classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.querySelector('.app-container').classList.remove('dark-mode');
        }
    });

    document.getElementById('btn-clear').addEventListener('click', (e) => {
        e.preventDefault();
        markdownInput.value = '';
        updatePreview();
    });

    document.getElementById('btn-export-html').addEventListener('click', async (e) => {
        e.preventDefault();
        
        console.log('开始导出HTML，包含完整样式和脚本...');
        
        try {
            // 1. 获取主题CSS
            let themeCSS = '';
            try {
                const themeResponse = await fetch(`../themes/${currentPreviewTheme}.css`);
                if (themeResponse.ok) {
                    themeCSS = await themeResponse.text();
                } else {
                    console.warn('无法加载主题CSS，使用默认样式');
                }
            } catch (error) {
                console.warn('加载主题CSS失败:', error);
            }
            
            // 2. 获取特效CSS - 生成完整的特效样式
            let effectCSS = '';
            if (currentEffect && currentEffect !== 'none') {
                effectCSS = generateCompleteEffectCSS(currentEffect);
            }
            
            // 3. 特效主要通过CSS实现，不需要额外的JavaScript文件
            
            // 4. 获取外部依赖
            let markedJS = '';
            let highlightJS = '';
            let katexCSS = '';
            let katexJS = '';
            let katexAutoRenderJS = '';
            let particlesJS = '';
            
            try {
                // Marked.js (Markdown解析器)
                const markedResponse = await fetch('https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js');
                if (markedResponse.ok) {
                    markedJS = await markedResponse.text();
                }
                
                // Highlight.js
                const hlResponse = await fetch('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js');
                if (hlResponse.ok) {
                    highlightJS = await hlResponse.text();
                }
                
                // KaTeX CSS
                const katexCSSResponse = await fetch('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css');
                if (katexCSSResponse.ok) {
                    katexCSS = await katexCSSResponse.text();
                }
                
                // KaTeX JS
                const katexJSResponse = await fetch('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js');
                if (katexJSResponse.ok) {
                    katexJS = await katexJSResponse.text();
                }
                
                // KaTeX Auto-render extension
                const katexAutoRenderResponse = await fetch('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js');
                if (katexAutoRenderResponse.ok) {
                    katexAutoRenderJS = await katexAutoRenderResponse.text();
                }
                
                // Particles.js
                const particlesResponse = await fetch('https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js');
                if (particlesResponse.ok) {
                    particlesJS = await particlesResponse.text();
                }
            } catch (error) {
                console.warn('加载外部依赖失败:', error);
            }
            
            // 5. 生成完整的HTML
            const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>导出的HTML文档</title>
    
    <!-- 基础样式 -->
    <style>
        body {
            margin: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        .content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* 基础样式 */
        ${themeCSS}
    </style>
    
    <!-- KaTeX样式 -->
    ${katexCSS ? `<style>${katexCSS}</style>` : ''}
    
    <!-- 特效样式 -->
    ${effectCSS ? `<style>${effectCSS}</style>` : ''}
    
    <!-- 自定义样式 -->
    <style>
        /* 确保导出文档的兼容性 */
        .theme-effect-particles::before,
        .theme-effect-deep-space::before,
        .theme-effect-mathematical::before {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
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
    </style>
</head>
<body${currentEffect !== 'none' ? ` class="${getEffectClassName(currentEffect)}"` : ''}>
    <div class="content">
        ${previewContainer.innerHTML}
    </div>
    
    <!-- JavaScript依赖 -->
    ${markedJS ? `<script>${markedJS}</script>` : ''}
    ${highlightJS ? `<script>${highlightJS}</script>` : ''}
    ${katexJS ? `<script>${katexJS}</script>` : ''}
    ${katexAutoRenderJS ? `<script>${katexAutoRenderJS}</script>` : ''}
    ${particlesJS ? `<script>${particlesJS}</script>` : ''}
    
    <!-- 特效JavaScript (主要通过CSS实现，不需要额外的JavaScript) -->
    
    <!-- 初始化脚本 -->
    <script>
        // 等待所有资源加载完成
        document.addEventListener('DOMContentLoaded', function() {
            console.log('开始初始化导出的HTML文档...');
            
            // 初始化代码高亮
            if (typeof hljs !== 'undefined') {
                console.log('初始化代码高亮...');
                hljs.highlightAll();
            }
            
            // 初始化数学公式渲染
            if (typeof renderMathInElement !== 'undefined') {
                console.log('初始化数学公式渲染...');
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false},
                        {left: "\\[", right: "\\]", display: true},
                        {left: "\\(", right: "\\)", display: false}
                    ],
                    throwOnError: false
                });
            } else if (typeof katex !== 'undefined') {
                console.log('使用基础KaTeX渲染数学公式...');
                // 查找并渲染数学公式
                const mathElements = document.querySelectorAll('script[type*="math/tex"]');
                mathElements.forEach(element => {
                    const math = element.textContent;
                    const isDisplayMode = element.type.includes('mode=display');
                    const container = document.createElement(isDisplayMode ? 'div' : 'span');
                    try {
                        katex.render(math, container, { displayMode: isDisplayMode });
                        element.parentNode.replaceChild(container, element);
                    } catch (e) {
                        console.warn('数学公式渲染失败:', math, e);
                    }
                });
            }
            
            // 初始化特效
            const currentEffectName = '${currentEffect}';
            if (currentEffectName !== 'none') {
                console.log('初始化特效:', currentEffectName);
                const content = document.querySelector('.content');
                if (content) {
                    try {
                        // 应用特效CSS类（已经在CSS中定义）
                        content.classList.add('${getEffectClassName(currentEffect)}');
                        
                        // 应用特定的JavaScript特效
                        switch (currentEffectName) {
                            case 'particles':
                                // 粒子特效主要通过CSS实现
                                console.log('粒子特效已通过CSS应用');
                                break;
                            case 'deep-space':
                                // 深空特效主要通过CSS实现
                                console.log('深空特效已通过CSS应用');
                                break;
                            case 'mathematical':
                                // 数学特效主要通过CSS实现
                                console.log('数学特效已通过CSS应用');
                                break;
                            case 'timeline':
                                // 时间线特效主要通过CSS实现
                                console.log('时间线特效已通过CSS应用');
                                break;
                            default:
                                console.log('特效已通过CSS应用:', currentEffectName);
                        }
                        
                        console.log('特效应用成功:', currentEffectName);
                    } catch (e) {
                        console.warn('特效应用失败:', currentEffectName, e);
                    }
                }
            }
            
            console.log('导出的HTML文档初始化完成');
        });
        
        // 如果DOMContentLoaded已经触发，立即执行
        if (document.readyState === 'loading') {
            // 正在加载中，等待DOMContentLoaded事件
        } else {
            // 已经加载完成，立即执行初始化
            setTimeout(() => {
                const event = new Event('DOMContentLoaded');
                document.dispatchEvent(event);
            }, 100);
        }
    </script>
</body>
</html>`;
            
            // 创建并下载文件
            const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `export-${currentPreviewTheme}-${currentEffect !== 'none' ? currentEffect : 'plain'}-${new Date().toISOString().slice(0, 10)}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('HTML导出完成，包含完整的主题和特效');
            
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败: ' + error.message);
        }
    });

    document.getElementById('btn-export-md').addEventListener('click', (e) => {
        e.preventDefault();
        const mdContent = markdownInput.value;
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 示例文件路径映射表 - 完整版本
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

    // 加载示例 - 支持新的目录结构
    console.log('初始化示例加载功能...');
    document.querySelectorAll('.dropdown-content a[data-example]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('加载示例:', e.target.dataset.example);
            
            const exampleName = e.target.dataset.example;
            const loadingMsg = `# 加载中...\n\n正在加载 ${exampleName} 示例...`;
            
            // 先显示加载信息
            markdownInput.value = loadingMsg;
            updatePreview();
            
            // 获取示例文件的完整路径
            const examplePath = examplePathMap[exampleName] || `basic/${exampleName}`;
            
            // 加载示例文件
            fetch(`../examples/${examplePath}.md`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`无法加载示例 (${response.status}): ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(text => {
                    console.log(`示例 "${exampleName}" 加载成功，内容长度:`, text.length);
                    markdownInput.value = text;
                    updatePreview();
                })
                .catch(error => {
                    console.error('加载示例失败:', error);
                    markdownInput.value = `# 加载失败\n\n无法加载示例 "${exampleName}"。\n\n错误信息：${error.message}\n\n尝试的路径：../examples/${examplePath}.md`;
                    updatePreview();
                });
        });
    });

    // 初始化加载默认内容
    console.log('加载默认内容...');
    const defaultContent = `# 欢迎使用 MD2HTML 在线编辑器

这是一个功能强大的 Markdown 编辑器，支持多种主题和特效。

## 基本格式

**粗体文本** *斜体文本* ~~删除线~~

## 列表示例

- 项目 1
- 项目 2
  - 子项目 A
  - 子项目 B

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, MD2HTML!");
}
\`\`\`

## 使用方式

1. 在左侧编辑区输入 Markdown 文本
2. 右侧会实时显示渲染效果
3. 使用顶部菜单切换主题和特效

> 提示：可以使用顶部菜单中的"示例"加载更多示例文档
`;

    // 设置默认内容
    markdownInput.value = defaultContent;
    
    // 执行首次预览
    console.log('执行初始化预览...');
    // 延迟执行，确保 marked 已加载
    setTimeout(function() {
        console.log('触发延迟预览更新');
        updatePreview();
        console.log('预览初始化完成');
    }, 300);

    // ========== 编辑器特效创建函数 ==========
    
    function createMatrixEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = '01';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const interval = setInterval(drawMatrix, 35);
        container.matrixInterval = interval;
    }
    
    function createWaveEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        function drawWaves() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 149, 237, ${0.3 - i * 0.1})`;
                ctx.lineWidth = 2;
                
                for (let x = 0; x < canvas.width; x++) {
                    const y = Math.sin((x + time) * 0.01 + i) * 20 + canvas.height / 2 + i * 10;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
            time += 2;
        }
        
        const interval = setInterval(drawWaves, 50);
        container.waveInterval = interval;
    }
    
    function createDeepSpaceEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const stars = [];
        
        // 创建星星
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            });
        }
        
        function drawStars() {
            ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
                ctx.fill();
                
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
        }
        
        const interval = setInterval(drawStars, 60);
        container.spaceInterval = interval;
    }
    
    // 添加缺失的按钮功能
    console.log('初始化按钮功能...');
    
    // 编辑器全屏功能
    const editorFullscreenBtn = document.getElementById('editor-fullscreen');
    if (editorFullscreenBtn) {
        editorFullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const editorPane = document.querySelector('.editor-pane');
            const previewPane = document.querySelector('.preview-pane');
            
            if (editorPane.classList.contains('fullscreen')) {
                // 退出全屏
                editorPane.classList.remove('fullscreen');
                previewPane.style.display = 'flex';
                editorFullscreenBtn.innerHTML = '<i class="fa fa-expand"></i>';
                editorFullscreenBtn.title = '全屏编辑';
            } else {
                // 进入全屏
                editorPane.classList.add('fullscreen');
                previewPane.style.display = 'none';
                editorFullscreenBtn.innerHTML = '<i class="fa fa-compress"></i>';
                editorFullscreenBtn.title = '退出全屏';
            }
        });
    }
    
    // 预览区全屏功能
    const previewFullscreenBtn = document.getElementById('preview-fullscreen');
    if (previewFullscreenBtn) {
        previewFullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const editorPane = document.querySelector('.editor-pane');
            const previewPane = document.querySelector('.preview-pane');
            
            if (previewPane.classList.contains('fullscreen')) {
                // 退出全屏
                previewPane.classList.remove('fullscreen');
                editorPane.style.display = 'flex';
                previewFullscreenBtn.innerHTML = '<i class="fa fa-expand"></i>';
                previewFullscreenBtn.title = '全屏预览';
            } else {
                // 进入全屏
                previewPane.classList.add('fullscreen');
                editorPane.style.display = 'none';
                previewFullscreenBtn.innerHTML = '<i class="fa fa-compress"></i>';
                previewFullscreenBtn.title = '退出全屏';
            }
        });
    }
    
    // 打印功能
    const printBtn = document.getElementById('preview-print');
    if (printBtn) {
        printBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 创建打印窗口
            const printWindow = window.open('', '_blank');
            const previewContent = previewContainer.innerHTML;
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title>MD2HTML - 打印文档</title>
                    <link rel="stylesheet" href="${window.location.origin}/themes/${currentPreviewTheme}.css">
                    <style>
                        body { margin: 20px; font-family: sans-serif; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none !important; }
                        }
                    </style>
                </head>
                <body>
                    ${previewContent}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            // 等待样式加载后打印
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 1000);
        });
    }
    
    // 同步滚动功能
    const syncScrollBtn = document.getElementById('editor-sync-scroll');
    let syncScrollEnabled = false; // 默认关闭，避免干扰正常滚动
    let isSyncing = false; // 防止循环触发的标志
    
    if (syncScrollBtn) {
        // 初始化按钮状态
        syncScrollBtn.classList.remove('active');
        syncScrollBtn.title = '启用同步滚动';
        
        syncScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            syncScrollEnabled = !syncScrollEnabled;
            
            if (syncScrollEnabled) {
                syncScrollBtn.classList.add('active');
                syncScrollBtn.title = '禁用同步滚动';
                console.log('✅ 同步滚动已启用');
            } else {
                syncScrollBtn.classList.remove('active');
                syncScrollBtn.title = '启用同步滚动';
                console.log('❌ 同步滚动已禁用');
            }
        });
        
        // 改进的防抖动同步滚动实现
        let editorScrollTimeout;
        let previewScrollTimeout;
        
        markdownInput.addEventListener('scroll', () => {
            if (syncScrollEnabled && !isSyncing) {
                clearTimeout(editorScrollTimeout);
                editorScrollTimeout = setTimeout(() => {
                    isSyncing = true;
                    try {
                        const editorScrollHeight = markdownInput.scrollHeight - markdownInput.clientHeight;
                        const previewScrollHeight = previewContainer.scrollHeight - previewContainer.clientHeight;
                        
                        if (editorScrollHeight > 0 && previewScrollHeight > 0) {
                            const scrollPercentage = markdownInput.scrollTop / editorScrollHeight;
                            const previewScrollTop = scrollPercentage * previewScrollHeight;
                            previewContainer.scrollTop = previewScrollTop;
                        }
                    } catch (error) {
                        console.error('编辑器同步滚动错误:', error);
                    } finally {
                        setTimeout(() => { isSyncing = false; }, 100); // 增加延迟时间
                    }
                }, 50); // 增加防抖时间
            }
        });
        
        previewContainer.addEventListener('scroll', () => {
            if (syncScrollEnabled && !isSyncing) {
                clearTimeout(previewScrollTimeout);
                previewScrollTimeout = setTimeout(() => {
                    isSyncing = true;
                    try {
                        const editorScrollHeight = markdownInput.scrollHeight - markdownInput.clientHeight;
                        const previewScrollHeight = previewContainer.scrollHeight - previewContainer.clientHeight;
                        
                        if (editorScrollHeight > 0 && previewScrollHeight > 0) {
                            const scrollPercentage = previewContainer.scrollTop / previewScrollHeight;
                            const editorScrollTop = scrollPercentage * editorScrollHeight;
                            markdownInput.scrollTop = editorScrollTop;
                        }
                    } catch (error) {
                        console.error('预览同步滚动错误:', error);
                    } finally {
                        setTimeout(() => { isSyncing = false; }, 100); // 增加延迟时间
                    }
                }, 50); // 增加防抖时间
            }
        });
    }
    
    // 初始化分隔条拖拽功能
    initResizer();
    
    console.log('✅ 所有按钮功能已初始化完成');
    
    // 分隔条拖拽功能
    function initResizer() {
        const resizer = document.getElementById('resizer');
        const editorPane = document.querySelector('.editor-pane');
        const previewPane = document.querySelector('.preview-pane');
        const mainContent = document.querySelector('.main-content');
        
        if (!resizer || !editorPane || !previewPane || !mainContent) {
            console.warn('未找到拖拽分隔条所需的元素');
            return;
        }
        
        let isResizing = false;
        let startX = 0;
        let startEditorWidth = 0;
        
        // 鼠标按下开始拖拽
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            startX = e.clientX;
            startEditorWidth = editorPane.getBoundingClientRect().width;
            
            // 添加拖拽状态样式
            document.body.classList.add('resizing');
            resizer.classList.add('active');
            
            // 禁用文本选择
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';
        });
        
        // 鼠标移动时调整宽度
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            e.preventDefault();
            
            const deltaX = e.clientX - startX;
            const containerWidth = mainContent.getBoundingClientRect().width;
            const resizerWidth = 4; // 分隔条宽度
            
            // 计算新的编辑器宽度
            let newEditorWidth = startEditorWidth + deltaX;
            
            // 限制最小和最大宽度
            const minWidth = containerWidth * 0.2; // 最小20%
            const maxWidth = containerWidth * 0.8; // 最大80%
            
            newEditorWidth = Math.max(minWidth, Math.min(maxWidth, newEditorWidth));
            
            // 计算百分比
            const editorPercent = (newEditorWidth / containerWidth) * 100;
            const previewPercent = 100 - editorPercent - (resizerWidth / containerWidth * 100);
            
            // 应用新宽度
            editorPane.style.flex = `0 0 ${editorPercent}%`;
            previewPane.style.flex = `0 0 ${previewPercent}%`;
        });
        
        // 鼠标释放结束拖拽
        document.addEventListener('mouseup', () => {
            if (!isResizing) return;
            
            isResizing = false;
            
            // 移除拖拽状态样式
            document.body.classList.remove('resizing');
            resizer.classList.remove('active');
            
            // 恢复文本选择和鼠标样式
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        });
        
        // 双击重置为默认宽度
        resizer.addEventListener('dblclick', () => {
            editorPane.style.flex = '0 0 50%';
            previewPane.style.flex = '0 0 50%';
        });
        
        // 改进的中键拖拽滚动功能
        const handleMiddleButtonScroll = (element, elementName) => {
            let isMiddleButtonPressed = false;
            let lastY = 0;
            let lastX = 0;
            let scrollStartTop = 0;
            let scrollStartLeft = 0;
            
            element.addEventListener('mousedown', (e) => {
                if (e.button === 1) { // 中键
                    e.preventDefault();
                    e.stopPropagation();
                    isMiddleButtonPressed = true;
                    lastY = e.clientY;
                    lastX = e.clientX;
                    scrollStartTop = element.scrollTop;
                    scrollStartLeft = element.scrollLeft;
                    element.style.cursor = 'grab';
                    console.log(`${elementName} 中键拖拽开始`);
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                if (isMiddleButtonPressed) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const deltaY = lastY - e.clientY;
                    const deltaX = lastX - e.clientX;
                    
                    // 垂直滚动
                    element.scrollTop = scrollStartTop + deltaY * 1.5;
                    
                    // 水平滚动（如果需要）
                    if (element.scrollWidth > element.clientWidth) {
                        element.scrollLeft = scrollStartLeft + deltaX * 1.5;
                    }
                    
                    element.style.cursor = 'grabbing';
                }
            });
            
            const stopMiddleButtonScroll = (e) => {
                if (isMiddleButtonPressed && (e.button === 1 || e.type === 'mouseleave')) {
                    isMiddleButtonPressed = false;
                    element.style.cursor = '';
                    console.log(`${elementName} 中键拖拽结束`);
                }
            };
            
            element.addEventListener('mouseup', stopMiddleButtonScroll);
            element.addEventListener('mouseleave', stopMiddleButtonScroll);
            
            // 防止中键点击的默认行为（如打开新标签页）
            element.addEventListener('auxclick', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
            
            console.log(`✅ ${elementName} 中键拖拽功能已初始化`);
        };
        
        // 为编辑器和预览区域添加中键拖拽功能
        handleMiddleButtonScroll(markdownInput, '编辑器');
        handleMiddleButtonScroll(previewContainer, '预览区域');
        
        console.log('✅ 分隔条拖拽功能已初始化');
    }
    
    // 生成完整的特效CSS
    function generateCompleteEffectCSS(effectName) {
        const effectClassName = getEffectClassName(effectName);
        if (!effectClassName) return '';

        let css = `
/* ${effectName} 特效完整样式 */

/* 基础动画关键帧 */
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes typeWriter {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

@keyframes blinkCursor {
    0%, 50% {
        border-right-color: transparent;
    }
    51%, 100% {
        border-right-color: currentColor;
    }
}

@keyframes codeGlow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4);
    }
}

@keyframes quoteSlide {
    0% {
        opacity: 0;
        transform: translateX(-20px);
        border-left-width: 0;
    }
    100% {
        opacity: 1;
        transform: translateX(0);
        border-left-width: 4px;
    }
}

@keyframes particleFloat {
    0%, 100% { 
        transform: translateY(0px) rotate(0deg); 
        opacity: 0.7; 
    }
    50% { 
        transform: translateY(-20px) rotate(180deg); 
        opacity: 1; 
    }
}

@keyframes glow {
    from { 
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); 
    }
    to { 
        text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 107, 107, 0.3); 
    }
}

@keyframes timelineSlideIn {
    from { 
        opacity: 0; 
        transform: translateY(50px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

@keyframes mathFloat {
    0%, 100% { 
        transform: translateY(0) rotate(0deg); 
        opacity: 0.1; 
    }
    50% { 
        transform: translateY(-30px) rotate(10deg); 
        opacity: 0.3; 
    }
}

@keyframes glassmorphism {
    0% {
        opacity: 0;
        backdrop-filter: blur(0px);
        background: rgba(255, 255, 255, 0);
    }
    100% {
        opacity: 1;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.05);
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* 基础特效样式 */
.${effectClassName} {
    position: relative;
}

.${effectClassName} * {
    transition: all 0.3s ease;
}

.${effectClassName} *:hover {
    transition: all 0.2s ease-out;
}
`;

        // 根据特效类型添加特定样式
        switch (effectName) {
            case 'particles':
                css += `
/* 粒子背景特效 */
.${effectClassName}::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
}

.${effectClassName}::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    background-image: 
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.05) 2px, transparent 2px);
    background-size: 100px 100px, 150px 150px, 200px 200px;
    animation: particleFloat 20s linear infinite;
}

.${effectClassName} h1 {
    animation: glow 2s ease-in-out infinite alternate;
    color: #fff;
}

.${effectClassName} h2 {
    animation: slideInLeft 0.5s ease-out forwards;
    color: #fff;
}

.${effectClassName} h3 {
    animation: fadeInUp 0.6s ease-out forwards;
    color: #fff;
}

.${effectClassName} p {
    animation: fadeIn 1s ease-out forwards;
    color: #fff;
}

.${effectClassName} blockquote {
    animation: glassmorphism 1s ease-out forwards;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    color: #fff;
}

.${effectClassName} pre, 
.${effectClassName} code {
    animation: codeGlow 2s ease-in-out infinite;
}

.${effectClassName} h1:hover,
.${effectClassName} h2:hover,
.${effectClassName} h3:hover {
    transform: translateY(-5px) scale(1.02);
}

.${effectClassName} blockquote:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 215, 0, 0.3);
}
`;
                break;

            case 'deep-space':
                css += `
/* 深空主题特效 */
.${effectClassName} {
    background: #000;
    color: #fff;
}

.${effectClassName}::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: 
        radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
        radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
        radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 160px 30px, #ddd, rgba(0,0,0,0));
    background-size: 200px 200px;
    animation: space 20s ease-in-out infinite;
}

@keyframes space {
    0% { transform: perspective(400px) rotateX(0deg); }
    50% { transform: perspective(400px) rotateX(10deg); }
    100% { transform: perspective(400px) rotateX(0deg); }
}

.${effectClassName} h1 {
    animation: glow 2s ease-in-out infinite alternate;
}

.${effectClassName} h2 {
    animation: slideInLeft 0.5s ease-out forwards;
}

.${effectClassName} h3 {
    animation: fadeInUp 0.6s ease-out forwards;
}

.${effectClassName} p {
    animation: fadeIn 1s ease-out forwards;
}

.${effectClassName} blockquote {
    animation: glassmorphism 1s ease-out forwards;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}
`;
                break;

            case 'mathematical':
                css += `
/* 数学主题特效 */
.${effectClassName}::before {
    content: '∑ ∫ ∞ π α β γ δ ε ζ η θ ∂ ∇ ∆ ∓ ≤ ≥ ≠ ≈ ≡ ∈ ∉ ∪ ∩ ⊆ ⊇ ℝ ℂ ℤ ℕ';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    color: rgba(255, 215, 0, 0.05);
    font-size: 24px;
    font-family: 'Times New Roman', serif;
    overflow: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
    animation: mathFloat 8s ease-in-out infinite;
    padding: 20px;
    line-height: 1.8;
}

.${effectClassName} h1 {
    animation: glow 2s ease-in-out infinite alternate;
}

.${effectClassName} h2 {
    animation: slideInLeft 0.5s ease-out forwards;
}

.${effectClassName} h3 {
    animation: fadeInUp 0.6s ease-out forwards;
}

.${effectClassName} p {
    animation: typeWriter 2s steps(40) 1s forwards, blinkCursor 1s infinite;
}

.${effectClassName} blockquote {
    animation: glassmorphism 1s ease-out forwards;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.${effectClassName} pre, 
.${effectClassName} code {
    animation: codeGlow 2s ease-in-out infinite;
}
`;
                break;

            case 'timeline':
                css += `
/* 时间线特效 */
.${effectClassName}::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #ffd700, #ff6b6b, #4ecdc4);
    transform: translateX(-50%);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    z-index: -1;
}

.${effectClassName} h1,
.${effectClassName} h2,
.${effectClassName} h3 {
    position: relative;
    padding-left: 30px;
    margin-left: 20px;
    animation: timelineSlideIn 0.8s ease-out forwards;
}

.${effectClassName} h1::before,
.${effectClassName} h2::before,
.${effectClassName} h3::before {
    content: '';
    position: absolute;
    left: -25px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-color: #4a90e2;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.2);
}
`;
                break;

            default:
                // 其他特效的基础样式
                css += `
.${effectClassName} h1 {
    animation: fadeInUp 0.6s ease-out forwards;
}

.${effectClassName} h2 {
    animation: slideInLeft 0.5s ease-out forwards;
}

.${effectClassName} h3 {
    animation: fadeInUp 0.6s ease-out forwards;
}

.${effectClassName} p {
    animation: fadeIn 1s ease-out forwards;
}

.${effectClassName} blockquote {
    animation: quoteSlide 0.8s ease-out forwards;
}
`;
        }

        return css;
    }

    // 获取特效CSS类名的辅助函数
    function getEffectClassName(effectName) {
        const effectMap = {
            'particles': 'theme-effect-particles',
            'deep-space': 'theme-effect-deep-space',
            'mathematical': 'theme-effect-mathematical',
            'timeline': 'theme-effect-timeline',
            'modern': 'theme-effect-modern',
            'playful': 'theme-effect-playful',
            'elegant': 'theme-effect-elegant',
            'minimalist': 'theme-effect-minimalist',
            'retro': 'theme-effect-retro'
        };
        return effectMap[effectName] || '';
    }
});

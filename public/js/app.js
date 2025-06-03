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
    let currentTheme = 'elegant-purple'; // 默认主题
    let currentEffect = 'none'; // 默认特效
    let tocEnabled = false;
    let responsiveEnabled = true;
    let isDarkMode = false; // 页面暗色/亮色模式

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
    // 加载主题CSS但仅应用于预览区域
    fetch(`../themes/${currentTheme}.css`)
        .then(response => response.text())
        .then(css => {
            // 把CSS规则限制在预览容器内
            css = css.replace(/body/g, '#preview-container')
                      .replace(/html/g, '#preview-container')
                      .replace(/\.container/g, '#preview-container');
            themeStyle.textContent = css;
        })
        .catch(error => {
            console.error('加载默认主题失败:', error);
        });
    
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
            
            // 更新预览区内容
            previewContainer.innerHTML = html;
            console.log('预览区已更新');
            
            // 应用主题和特效
            console.log('应用主题:', currentTheme, '特效:', currentEffect);
            applyThemeAndEffect();
            
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

    // 主题切换
    console.log('初始化主题选择器...');
    document.querySelectorAll('.dropdown-content a[data-theme]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentTheme = e.target.dataset.theme;
            console.log('主题切换为:', currentTheme);
            
            // 加载主题CSS但仅应用于预览区域
            fetch(`../themes/${currentTheme}.css`)
                .then(response => response.text())
                .then(css => {
                    // 把CSS规则限制在预览容器内
                    css = css.replace(/body/g, '#preview-container')
                              .replace(/html/g, '#preview-container')
                              .replace(/\.container/g, '#preview-container');
                    themeStyle.textContent = css;
                    updatePreview();
                })
                .catch(error => {
                    console.error('加载主题失败:', error);
                });
        });
    });

    // 特效切换
    console.log('初始化特效选择器...');
    document.querySelectorAll('.dropdown-content a[data-effect]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentEffect = e.target.dataset.effect;
            console.log('特效切换为:', currentEffect);
            updatePreview();
        });
    });

    // 应用主题和特效
    function applyThemeAndEffect() {
        // 移除旧的特效类
        previewContainer.className = 'preview-content'; // 重置为基础类
        if (window.currentParticlesInstance) {
            window.currentParticlesInstance.destroy();
            window.currentParticlesInstance = null;
        }
        document.querySelectorAll('.particles-js-canvas-el').forEach(el => el.remove());

        // 应用新特效
        if (currentEffect && currentEffect !== 'none') {
            if (themeEffects[currentEffect]) {
                themeEffects[currentEffect].apply(previewContainer);
                
                // 确保菜单显示在特效之上
                document.querySelector('.header').style.position = 'relative';
                document.querySelector('.header').style.zIndex = '10';
            } else {
                console.warn(`未找到特效: ${currentEffect}`);
            }
        }
        
        // 解决页面大小变化问题 - 强制重新计算布局
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
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

    document.getElementById('btn-export-html').addEventListener('click', (e) => {
        e.preventDefault();
        const htmlContent = `<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <title>导出的HTML</title>\n  <link rel="stylesheet" href="${window.location.origin}/themes/${currentTheme}.css">\n  <style>body{margin:20px;font-family:sans-serif;}</style>\n</head>\n<body>\n${previewContainer.innerHTML}\n</body>\n</html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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

    // 加载示例 - 简化实现，直接使用 textarea
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
            
            // 加载示例文件
            fetch(`../examples/${exampleName}.md`)
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
                    markdownInput.value = `# 加载失败\n\n无法加载示例 "${exampleName}"。\n\n错误信息：${error.message}`;
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
});

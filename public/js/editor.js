// editor.js - 编辑器相关函数

// 初始化编辑器
function initEditor(elementId, options = {}) {
    // 默认配置
    const defaultOptions = {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true,
        theme: 'default',
        autofocus: true,
        tabSize: 4,
        indentUnit: 4,
        indentWithTabs: true,
        extraKeys: {
            "Enter": "newlineAndIndentContinueMarkdownList",
            "Tab": function(cm) {
                if (cm.somethingSelected()) {
                    cm.indentSelection("add");
                } else {
                    cm.replaceSelection("    ", "end", "+input");
                }
            }
        }
    };

    // 合并选项
    const mergedOptions = Object.assign({}, defaultOptions, options);
    
    // 创建 CodeMirror 实例
    const editor = CodeMirror.fromTextArea(document.getElementById(elementId), mergedOptions);
    
    // 设置尺寸确保填满容器
    editor.setSize('100%', '100%');
    
    return editor;
}

// 文档保存函数
function saveDocument(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 本地存储功能
const EditorStorage = {
    save(key, content) {
        try {
            localStorage.setItem(`md2html_${key}`, content);
            return true;
        } catch (e) {
            console.error('保存到本地存储失败:', e);
            return false;
        }
    },
    
    load(key) {
        try {
            return localStorage.getItem(`md2html_${key}`);
        } catch (e) {
            console.error('从本地存储加载失败:', e);
            return null;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(`md2html_${key}`);
            return true;
        } catch (e) {
            console.error('从本地存储删除失败:', e);
            return false;
        }
    }
};

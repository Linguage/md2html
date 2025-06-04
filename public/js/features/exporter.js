// features/exporter.js
import { logger } from '../utils/index.js';

export class Exporter {
    constructor(options = {}) {
        this.options = {
            defaultFileName: 'export',
            ...options
        };
    }
    
    async exportMarkdown(content, filename = this.options.defaultFileName) {
        try {
            if (!content) {
                throw new Error('导出内容为空');
            }
            
            // 添加.md扩展名
            if (!filename.endsWith('.md')) {
                filename += '.md';
            }
            
            const blob = new Blob([content], { type: 'text/markdown' });
            await this.downloadFile(blob, filename);
            
            logger.info('Markdown导出成功');
            return true;
        } catch (error) {
            logger.error('Markdown导出失败:', error);
            return false;
        }
    }
    
    async exportHtml(content, styles = '', title = 'MD2HTML Export', filename = this.options.defaultFileName) {
        try {
            if (!content) {
                throw new Error('导出内容为空');
            }
            
            // 添加.html扩展名
            if (!filename.endsWith('.html')) {
                filename += '.html';
            }
            
            // 生成完整的HTML文档
            const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        /* 重置样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* 用户自定义样式 */
        ${styles}
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
            
            const blob = new Blob([html], { type: 'text/html' });
            await this.downloadFile(blob, filename);
            
            logger.info('HTML导出成功');
            return true;
        } catch (error) {
            logger.error('HTML导出失败:', error);
            return false;
        }
    }
    
    async exportPdf(content) {
        // TODO: 实现PDF导出功能
        logger.warn('PDF导出功能尚未实现');
        return false;
    }
    
    private async downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        
        // 添加到文档中并触发点击
        document.body.appendChild(a);
        a.click();
        
        // 清理
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export default Exporter;

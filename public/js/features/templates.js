// features/templates.js
import { logger } from '../utils/index.js';

export class TemplateManager {
    constructor() {
        this.templates = {
            // 代码块模板
            'code-block': {
                content: '```javascript\n// 代码示例\nfunction hello() {\n    console.log("Hello World!");\n}\n```\n\n',
                description: '插入代码块'
            },
            
            // 数学公式模板
            'math-inline': {
                content: '这是行内数学公式：$E = mc^2$\n\n',
                description: '插入行内数学公式'
            },
            'math-block': {
                content: '$$\n\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\n$$\n\n',
                description: '插入块级数学公式'
            },
            
            // 高亮块模板
            'info-box': {
                content: ':::info\nℹ️ 这是一个信息框\n:::\n\n',
                description: '插入信息提示框'
            },
            'warning-box': {
                content: ':::warning\n⚠️ 这是一个警告框\n:::\n\n',
                description: '插入警告提示框'
            },
            'success-box': {
                content: ':::success\n✅ 这是一个成功框\n:::\n\n',
                description: '插入成功提示框'
            },
            'error-box': {
                content: ':::error\n❌ 这是一个错误框\n:::\n\n',
                description: '插入错误提示框'
            },
            
            // 卡片布局模板
            'card-single': {
                content: '::cards-1\n# 卡片标题\n卡片内容描述\n::cards\n\n',
                description: '插入单列卡片'
            },
            'card-double': {
                content: '::cards-2\n# 卡片1\n第一个卡片内容\n---\n# 卡片2\n第二个卡片内容\n::cards\n\n',
                description: '插入双列卡片'
            },
            'card-triple': {
                content: '::cards-3\n# 卡片1\n内容1\n---\n# 卡片2\n内容2\n---\n# 卡片3\n内容3\n::cards\n\n',
                description: '插入三列卡片'
            },
            
            // 时间线模板
            'timeline': {
                content: '::timeline\n2025年1月\n项目启动，开始需求分析\n---\n2025年2月\n完成技术选型和架构设计\n---\n2025年3月\n开发阶段，实现核心功能\n::timeline\n\n',
                description: '插入时间线'
            },
            
            // 图片布局模板
            'gallery': {
                content: '![图片1](https://via.placeholder.com/300x200?text=Image+1)\n![图片2](https://via.placeholder.com/300x200?text=Image+2)\n![图片3](https://via.placeholder.com/300x200?text=Image+3)\n\n',
                description: '插入图片画廊'
            }
        };
    }
    
    insert(type, editor) {
        try {
            const template = this.templates[type];
            if (!template) {
                throw new Error(`未知的模板类型: ${type}`);
            }
            
            const { content } = template;
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            const value = editor.value;
            
            // 插入模板内容
            editor.value = value.substring(0, start) + content + value.substring(end);
            
            // 设置光标位置到插入内容之后
            editor.selectionStart = editor.selectionEnd = start + content.length;
            
            // 确保编辑器获得焦点
            editor.focus();
            
            logger.info(`模板 "${type}" 插入成功`);
            return true;
        } catch (error) {
            logger.error('插入模板失败:', error);
            return false;
        }
    }
    
    getTemplateList() {
        return Object.entries(this.templates).map(([id, { description }]) => ({
            id,
            description
        }));
    }
    
    getTemplate(type) {
        return this.templates[type];
    }
}

export default TemplateManager;

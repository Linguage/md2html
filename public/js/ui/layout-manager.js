// ui/layout-manager.js
import { dom, logger } from '../utils/index.js';

export class LayoutManager {
    constructor(options = {}) {
        this.options = {
            mainContainer: '.main-content',
            editorPane: '.editor-pane',
            previewPane: '.preview-pane',
            resizer: '#resizer',
            defaultSplit: 50, // 默认分割比例（百分比）
            minSplit: 20,    // 最小分割比例
            maxSplit: 80,    // 最大分割比例
            ...options
        };
        
        this.isResizing = false;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        try {
            // 获取DOM元素
            this.mainContainer = dom.get(this.options.mainContainer);
            this.editorPane = dom.get(this.options.editorPane);
            this.previewPane = dom.get(this.options.previewPane);
            this.resizer = dom.get(this.options.resizer);
            
            if (!this.mainContainer || !this.editorPane || !this.previewPane || !this.resizer) {
                throw new Error('找不到必要的布局元素');
            }
            
            // 初始化分割条功能
            this.initResizer();
            
            // 初始化中键拖拽功能
            this.initMiddleButtonScroll(this.editorPane, '编辑器');
            this.initMiddleButtonScroll(this.previewPane, '预览区域');
            
            this.initialized = true;
            logger.info('布局管理器初始化完成');
        } catch (error) {
            logger.error('布局管理器初始化失败', error);
            throw error;
        }
    }
    
    initResizer() {
        let startX = 0;
        let startEditorWidth = 0;
        
        // 鼠标按下开始拖拽
        this.resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isResizing = true;
            startX = e.clientX;
            startEditorWidth = this.editorPane.getBoundingClientRect().width;
            
            // 添加拖拽状态样式
            document.body.classList.add('resizing');
            this.resizer.classList.add('active');
            
            // 禁用文本选择
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';
        });
        
        // 鼠标移动时调整宽度
        document.addEventListener('mousemove', (e) => {
            if (!this.isResizing) return;
            
            e.preventDefault();
            
            const deltaX = e.clientX - startX;
            const containerWidth = this.mainContainer.getBoundingClientRect().width;
            const resizerWidth = 4; // 分隔条宽度
            
            // 计算新的编辑器宽度
            let newEditorWidth = startEditorWidth + deltaX;
            
            // 限制最小和最大宽度
            const minWidth = containerWidth * (this.options.minSplit / 100);
            const maxWidth = containerWidth * (this.options.maxSplit / 100);
            
            newEditorWidth = Math.max(minWidth, Math.min(maxWidth, newEditorWidth));
            
            // 计算百分比
            const editorPercent = (newEditorWidth / containerWidth) * 100;
            const previewPercent = 100 - editorPercent - (resizerWidth / containerWidth * 100);
            
            // 应用新宽度
            this.editorPane.style.flex = `0 0 ${editorPercent}%`;
            this.previewPane.style.flex = `0 0 ${previewPercent}%`;
        });
        
        // 鼠标释放结束拖拽
        document.addEventListener('mouseup', () => {
            if (!this.isResizing) return;
            
            this.isResizing = false;
            
            // 移除拖拽状态样式
            document.body.classList.remove('resizing');
            this.resizer.classList.remove('active');
            
            // 恢复文本选择和鼠标样式
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        });
        
        // 双击重置为默认宽度
        this.resizer.addEventListener('dblclick', () => {
            this.resetSplit();
        });
    }
    
    initMiddleButtonScroll(element, elementName) {
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
            }
        });
        
        element.addEventListener('mousemove', (e) => {
            if (!isMiddleButtonPressed) return;
            
            const deltaY = e.clientY - lastY;
            const deltaX = e.clientX - lastX;
            element.scrollTop = scrollStartTop - deltaY;
            element.scrollLeft = scrollStartLeft - deltaX;
        });
        
        const stopMiddleButtonScroll = () => {
            if (isMiddleButtonPressed) {
                isMiddleButtonPressed = false;
                element.style.cursor = '';
                logger.debug(`${elementName} 中键拖拽结束`);
            }
        };
        
        element.addEventListener('mouseup', stopMiddleButtonScroll);
        element.addEventListener('mouseleave', stopMiddleButtonScroll);
        
        // 防止中键点击的默认行为
        element.addEventListener('auxclick', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        logger.debug(`${elementName} 中键拖拽功能已初始化`);
    }
    
    resetSplit() {
        this.editorPane.style.flex = `0 0 ${this.options.defaultSplit}%`;
        this.previewPane.style.flex = `0 0 ${this.options.defaultSplit}%`;
    }
    
    getSplitRatio() {
        const containerWidth = this.mainContainer.getBoundingClientRect().width;
        const editorWidth = this.editorPane.getBoundingClientRect().width;
        return (editorWidth / containerWidth) * 100;
    }
}

export default LayoutManager;

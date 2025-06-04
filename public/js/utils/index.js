// utils/index.js

/**
 * DOM 工具函数
 */
export const dom = {
    /**
     * 获取元素
     * @param {string} selector 选择器
     * @returns {HTMLElement|null}
     */
    get: (selector) => document.querySelector(selector),

    /**
     * 获取所有匹配的元素
     * @param {string} selector 选择器
     * @returns {NodeList}
     */
    getAll: (selector) => document.querySelectorAll(selector),

    /**
     * 创建元素
     * @param {string} tag 标签名
     * @param {Object} props 属性对象
     * @returns {HTMLElement}
     */
    create: (tag, props = {}) => {
        const element = document.createElement(tag);
        Object.entries(props).forEach(([key, value]) => {
            if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        return element;
    }
};

/**
 * 文件操作工具
 */
export const file = {
    /**
     * 下载文件
     * @param {string} filename 文件名
     * @param {string|Blob} content 文件内容
     * @param {string} type MIME类型
     */
    download: (filename, content, type = 'text/plain') => {
        const blob = content instanceof Blob ? content : new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = dom.create('a', { href: url, download: filename });
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

/**
 * 事件处理工具
 */
export const events = {
    /**
     * 防抖函数
     * @param {Function} fn 要执行的函数
     * @param {number} delay 延迟时间
     * @returns {Function}
     */
    debounce: (fn, delay) => {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },

    /**
     * 节流函数
     * @param {Function} fn 要执行的函数
     * @param {number} limit 时间限制
     * @returns {Function}
     */
    throttle: (fn, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                fn(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * 日志工具
 */
export const logger = {
    /**
     * 输出日志
     * @param {string} type 日志类型
     * @param {string} message 日志消息
     * @param {any} data 额外数据
     */
    log: (type, message, data = '') => {
        const time = new Date().toLocaleTimeString();
        const prefix = `[${time}] [${type.toUpperCase()}]`;
        if (data) {
            console.log(`${prefix} ${message}`, data);
        } else {
            console.log(`${prefix} ${message}`);
        }
    },
    info: (message, data) => logger.log('info', message, data),
    warn: (message, data) => logger.log('warn', message, data),
    error: (message, data) => logger.log('error', message, data)
};

/**
 * 样式工具
 */
export const styles = {
    /**
     * 加载样式文件
     * @param {string} url 样式文件URL
     * @returns {Promise<string>} CSS内容
     */
    loadCSS: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load CSS: ${url}`);
            return await response.text();
        } catch (error) {
            logger.error('Failed to load CSS', error);
            throw error;
        }
    },

    /**
     * 应用样式到元素
     * @param {HTMLElement} element 目标元素
     * @param {Object} styles 样式对象
     */
    applyStyles: (element, styles) => {
        Object.assign(element.style, styles);
    }
};

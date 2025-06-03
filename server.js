const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8800;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use('/themes', express.static(path.join(__dirname, 'themes')));
app.use('/examples', express.static(path.join(__dirname, 'examples')));

// API 路由 - 用于转换 Markdown 到 HTML
app.use(express.json());
app.post('/api/convert', (req, res) => {
    try {
        const { markdown, theme, effect } = req.body;
        
        // 这里我们简单返回，前端会处理实际转换
        res.json({ 
            success: true, 
            markdown,
            theme,
            effect
        });
    } catch (error) {
        console.error('转换错误:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// 添加简化版编辑器路由
app.get('/simple', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'simple.html'));
});

// 所有未处理的路由都重定向到主页
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`服务已启动，请访问: http://localhost:${port}`);
});

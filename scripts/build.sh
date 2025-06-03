#!/bin/bash

# MD2HTML Build Script
# 构建和验证脚本

set -e

echo "🚀 开始构建 MD2HTML Converter..."

# 检查依赖
echo "📦 检查依赖..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

# 安装依赖
echo "📥 安装依赖..."
npm install

# TypeScript 类型检查
echo "🔍 TypeScript 类型检查..."
npx tsc --noEmit

# 运行测试
echo "🧪 运行测试..."
if [ -f "examples/ultimate-test.md" ]; then
    echo "  测试增强版转换器..."
    npx ts-node src/md2html-enhanced.ts examples/ultimate-test.md test-output.html
    
    echo "  测试基础转换器..."
    npx ts-node src/md2html-new.ts examples/ultimate-test.md test-output-basic.html
    
    echo "  测试批量转换..."
    npx ts-node src/batch-convert.ts examples/ test-batch-output/
    
    echo "✅ 测试完成"
    
    # 清理测试文件
    rm -f test-output.html test-output-basic.html
    rm -rf test-batch-output/
else
    echo "⚠️ 跳过测试 - 未找到测试文件"
fi

echo "🎉 构建完成！"
echo ""
echo "📖 使用方法:"
echo "  npm run convert input.md output.html"
echo "  npm run batch input-dir/ output-dir/"
echo ""
echo "📚 查看文档: docs/CONVERTER-GUIDE.md"

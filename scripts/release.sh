#!/bin/bash

# MD2HTML Release Script
# 发布准备脚本

set -e

echo "📦 准备发布 MD2HTML Converter..."

# 版本检查
VERSION=$(node -p "require('./package.json').version")
echo "当前版本: $VERSION"

# 清理
echo "🧹 清理临时文件..."
rm -f *.html
rm -rf test-*/
rm -rf output*/

# 构建
echo "🔨 运行构建..."
./scripts/build.sh

# 检查必要文件
echo "✅ 检查发布文件..."
required_files=(
    "package.json"
    "README.md"
    "LICENSE"
    "src/md2html-enhanced.ts"
    "src/md2html-new.ts"
    "src/batch-convert.ts"
    "themes/elegant-purple.css"
    "themes/minimal-dark.css"
    "docs/CONVERTER-GUIDE.md"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少必要文件: $file"
        exit 1
    fi
    echo "  ✓ $file"
done

echo ""
echo "🎉 发布准备完成！"
echo ""
echo "发布步骤:"
echo "1. git add ."
echo "2. git commit -m 'Release v$VERSION'"
echo "3. git tag v$VERSION"
echo "4. git push origin main --tags"
echo "5. npm publish (如果发布到npm)"

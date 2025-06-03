#!/usr/bin/env node

/**
 * Enhanced Markdown to HTML Converter
 * 增强版 Markdown 转 HTML 转换器
 * 
 * 新功能:
 * - 性能优化
 * - 更多主题选项
 * - 语法高亮增强
 * - 自动目录生成
 * - 响应式图片处理
 */

import { marked } from 'marked'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname, basename, extname } from 'path'
import { generateEffectCSS } from './config/theme-effects.ts'

// 增强的自定义主题注册
const customThemes: Record<string, string> = {
  'elegant-purple': '../themes/elegant-purple.css',
  'minimal-dark': '../themes/minimal-dark.css',
  'modern-clean': '../themes/modern-clean.css',
  'github-light': '../themes/github-light.css',
  'notion-style': '../themes/notion-style.css'
}

// 性能优化的主题缓存
const themeCache = new Map<string, string>()

// 加载并缓存自定义主题
function loadCustomTheme(themeName: string): string {
  // 使用缓存提高性能
  if (themeCache.has(themeName)) {
    return themeCache.get(themeName)!
  }

  const themeFile = customThemes[themeName]
  if (!themeFile) {
    console.warn(`⚠️  主题 "${themeName}" 不存在，使用默认样式`)
    return ''
  }

  try {
    const themeContent = readFileSync(themeFile, 'utf-8')
    themeCache.set(themeName, themeContent)
    return themeContent
  } catch (error) {
    console.warn(`⚠️  无法加载主题文件: ${themeFile}`)
    return ''
  }
}

// 提取标记的增强版本
function extractMarkdownDirectives(content: string) {
  const effectMatch = content.match(/<!--\s*effect:\s*(\w+)\s*-->/)
  const themeMatch = content.match(/<!--\s*theme:\s*([\w-]+)\s*-->/)
  const tocMatch = content.match(/<!--\s*toc:\s*(true|false)\s*-->/)
  const responsiveMatch = content.match(/<!--\s*responsive:\s*(true|false)\s*-->/)
  
  return {
    effect: effectMatch ? effectMatch[1] : 'none',
    theme: themeMatch ? themeMatch[1] : null,
    toc: tocMatch ? tocMatch[1] === 'true' : false,
    responsive: responsiveMatch ? responsiveMatch[1] !== 'false' : true
  }
}

// 生成目录 (Table of Contents)
function generateTOC(content: string): string {
  const headings = content.match(/^#{1,6}\s+.+$/gm) || []
  if (headings.length === 0) return ''

  let toc = '<div class="table-of-contents">\n<h2>📋 目录</h2>\n<ul>\n'
  
  headings.forEach(heading => {
    const level = heading.match(/^#+/)?.[0].length || 1
    const text = heading.replace(/^#+\s*/, '').replace(/[#]*$/, '').trim()
    const id = text.toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
      .replace(/\s+/g, '-')
    
    const indent = '  '.repeat(level - 1)
    toc += `${indent}<li><a href="#${id}">${text}</a></li>\n`
  })
  
  toc += '</ul>\n</div>\n\n'
  return toc
}

// 为标题添加锚点
function addHeadingAnchors(html: string): string {
  return html.replace(/<h([1-6])>(.+?)<\/h[1-6]>/g, (match, level, text) => {
    const id = text.toLowerCase()
      .replace(/<[^>]*>/g, '') // 移除HTML标签
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
      .replace(/\s+/g, '-')
    
    return `<h${level} id="${id}">${text}</h${level}>`
  })
}

// 响应式图片处理
function makeImagesResponsive(html: string): string {
  return html.replace(/<img([^>]*)>/g, (match, attributes) => {
    // 如果已经有class，添加responsive类；否则创建class属性
    if (attributes.includes('class=')) {
      return match.replace(/class="([^"]*)"/, 'class="$1 responsive-image"')
    } else {
      return `<img${attributes} class="responsive-image">`
    }
  })
}

// 增强的CSS生成
function generateEnhancedCSS(directives: any): string {
  let css = `
/* Enhanced Markdown Converter Styles */
* {
  box-sizing: border-box;
}

/* 响应式图片 */
.responsive-image {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

/* 目录样式 */
.table-of-contents {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.table-of-contents h2 {
  margin: 0 0 1rem 0 !important;
  color: #374151;
  font-size: 1.2rem;
}

.table-of-contents ul {
  margin: 0;
  padding-left: 1rem;
}

.table-of-contents li {
  margin: 0.5rem 0;
  list-style-type: none;
  position: relative;
}

.table-of-contents li::before {
  content: "▸";
  color: #6b7280;
  margin-right: 0.5rem;
}

.table-of-contents a {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s ease;
}

.table-of-contents a:hover {
  color: #2563eb;
}

/* 滚动行为优化 */
html {
  scroll-behavior: smooth;
}

/* 代码块增强 */
pre {
  position: relative;
  overflow-x: auto;
}

pre code {
  display: block;
  padding: 1rem;
  line-height: 1.5;
}

/* 移动端优化 */
@media (max-width: 768px) {
  body, .container {
    padding: 1rem !important;
    font-size: 16px;
  }
  
  h1 { font-size: 2rem !important; }
  h2 { font-size: 1.5rem !important; }
  h3 { font-size: 1.25rem !important; }
  
  .table-of-contents {
    padding: 1rem;
  }
  
  pre {
    margin: 1rem -1rem;
    border-radius: 0;
  }
}
`

  // 添加自定义主题
  if (directives.theme) {
    css += '\n\n/* === 自定义主题 === */\n' + loadCustomTheme(directives.theme)
  }

  // 添加特效
  if (directives.effect && directives.effect !== 'none') {
    const effectCSS = generateEffectCSS(directives.effect as any)
    if (effectCSS) {
      css += '\n\n/* === 动画特效 === */\n' + effectCSS
    }
  }

  return css
}

// 主转换函数
async function enhancedMd2Html(markdownContent: string): Promise<string> {
  console.log('🔍 分析 Markdown 指令...')
  const directives = extractMarkdownDirectives(markdownContent)
  
  console.log('📋 指令解析结果:', {
    effect: directives.effect,
    theme: directives.theme || '默认',
    toc: directives.toc ? '启用' : '禁用',
    responsive: directives.responsive ? '启用' : '禁用'
  })

  // 清理指令标记
  let cleanContent = markdownContent
    .replace(/<!--\s*effect:\s*\w+\s*-->/g, '')
    .replace(/<!--\s*theme:\s*[\w-]+\s*-->/g, '')
    .replace(/<!--\s*toc:\s*(true|false)\s*-->/g, '')
    .replace(/<!--\s*responsive:\s*(true|false)\s*-->/g, '')
    .trim()

  // 生成目录
  let tocHtml = ''
  if (directives.toc) {
    console.log('📑 生成目录...')
    tocHtml = generateTOC(cleanContent)
  }

  // 转换为HTML
  console.log('🔄 转换 Markdown...')
  let html = await marked(cleanContent)

  // 添加锚点
  if (directives.toc) {
    html = addHeadingAnchors(html)
  }

  // 响应式图片处理
  if (directives.responsive) {
    html = makeImagesResponsive(html)
  }

  // 生成CSS
  console.log('🎨 生成样式...')
  const css = generateEnhancedCSS(directives)

  // 构建最终HTML
  const effectClass = directives.effect !== 'none' ? `theme-effect-${directives.effect}` : ''
  const titleSuffix = [
    directives.theme && `主题(${directives.theme})`,
    directives.effect !== 'none' && `特效(${directives.effect})`,
    directives.toc && '目录',
    directives.responsive && '响应式'
  ].filter(Boolean).join(' + ')

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhanced Markdown Document${titleSuffix ? ' - ' + titleSuffix : ''}</title>
    <style>
${css}
    </style>
</head>
<body class="${effectClass}">
    <div class="container">
${tocHtml}${html}
    </div>
</body>
</html>`

  return fullHtml
}

// CLI处理
if (process.argv[1] && process.argv[1].endsWith('md2html-enhanced.ts')) {
  (async () => {
    if (process.argv.length < 4) {
      console.log(`
🚀 Enhanced Markdown to HTML Converter v2.0

用法: npx tsx md2html-enhanced.ts input.md output.html

支持的指令:
  <!-- effect: particles -->     (动画特效)
  <!-- theme: modern-clean -->    (自定义主题)
  <!-- toc: true -->             (生成目录)
  <!-- responsive: true -->       (响应式处理)

可用主题: ${Object.keys(customThemes).join(', ')}

新功能:
  ✨ 自动目录生成
  📱 响应式图片处理
  🎯 标题锚点导航
  ⚡ 性能优化缓存
  📋 移动端适配
`)
      process.exit(1)
    }

    const inputFile = process.argv[2]
    const outputFile = process.argv[3]

    if (!existsSync(inputFile)) {
      console.error(`❌ 输入文件不存在: ${inputFile}`)
      process.exit(1)
    }

    try {
      console.log(`\n📖 读取文件: ${inputFile}`)
      const markdown = readFileSync(inputFile, 'utf-8')
      
      console.log('🔄 开始转换...')
      const html = await enhancedMd2Html(markdown)
      
      console.log(`💾 写入文件: ${outputFile}`)
      writeFileSync(outputFile, html)
      
      console.log(`\n✅ 转换完成!`)
      console.log(`📊 生成的 HTML 长度: ${html.length} 字符`)
      console.log(`🌐 文件保存至: ${outputFile}`)
    } catch (error) {
      console.error('❌ 转换失败:', error)
      process.exit(1)
    }
  })()
}

export { enhancedMd2Html }

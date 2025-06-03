import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'
import { generateEffectCSS } from './config/theme-effects.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取特效JS（可选，建议用外链）
const effectJsPath = path.resolve(__dirname, '../public/assets/mpmd/theme-effects.js')
const effectJs = fs.existsSync(effectJsPath) ? fs.readFileSync(effectJsPath, 'utf-8') : ''

// 可用的自定义主题
const customThemes: Record<string, string> = {
  'elegant-purple': '../themes/elegant-purple.css',
  'minimal-dark': '../themes/minimal-dark.css'
}

function extractEffect(markdown: string): string {
  const match = markdown.match(/<!--\s*effect:\s*([a-zA-Z0-9\-]+)\s*-->/)
  return match ? match[1] : 'none'
}

function extractTheme(markdown: string): string | null {
  const match = markdown.match(/<!--\s*theme:\s*([a-zA-Z0-9\-]+)\s*-->/)
  return match ? match[1] : null
}

function loadCustomTheme(themeName: string): string {
  if (!customThemes[themeName]) {
    console.warn(`主题 "${themeName}" 不存在，使用默认样式`)
    return ''
  }
  
  const themePath = path.resolve(__dirname, customThemes[themeName])
  if (!fs.existsSync(themePath)) {
    console.warn(`主题文件 "${themePath}" 不存在`)
    return ''
  }
  
  return fs.readFileSync(themePath, 'utf-8')
}

export async function md2html(md: string): Promise<string> {
  const effect = extractEffect(md)
  const customTheme = extractTheme(md)
  
  console.log('提取的特效:', effect)
  console.log('提取的主题:', customTheme)
  
  const htmlBody = await marked.parse(md)
  console.log('HTML 内容长度:', htmlBody.length)
  
  const effectClass = effect && effect !== 'none' ? `theme-effect-${effect}` : ''
  console.log('特效 class:', effectClass)
  
  // 获取CSS样式
  let css = ''
  if (customTheme) {
    css = loadCustomTheme(customTheme)
    console.log('使用自定义主题:', customTheme)
  } else {
    css = generateEffectCSS(effect as any)
    console.log('使用特效样式:', effect)
  }
  
  console.log('生成的 CSS 长度:', css.length)
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Markdown with ${customTheme ? 'Custom Theme' : 'Effect'}</title>
  <style>${css}</style>
</head>
<body>
  <div class="${effectClass}">
    ${htmlBody}
  </div>
  ${effectJs ? `<script>${effectJs}</script>` : '<script src="/assets/mpmd/theme-effects.js"></script>'}
</body>
</html>
  `
}

// CLI 用法: npx tsx md2html.ts input.md output.html
if (process.argv[1] && process.argv[1].endsWith('md2html.ts')) {
  (async function() {
    const [,, input, output] = process.argv
    if (!input || !output) {
      console.log('用法: npx tsx md2html.ts input.md output.html')
      process.exit(1)
    }
    const md = fs.readFileSync(input, 'utf-8')
    const html = await md2html(md)
    fs.writeFileSync(output, html)
    console.log(`已生成: ${output}`)
  })()
}

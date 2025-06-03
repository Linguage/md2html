#!/usr/bin/env tsx
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { md2html } from './md2html-new.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface BatchOptions {
  inputDir: string
  outputDir: string
  recursive?: boolean
  pattern?: RegExp
}

async function batchConvert(options: BatchOptions) {
  const { inputDir, outputDir, recursive = false, pattern = /\.md$/ } = options
  
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ 输入目录不存在: ${inputDir}`)
    return
  }
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`📁 创建输出目录: ${outputDir}`)
  }
  
  const files = recursive ? 
    getAllMarkdownFiles(inputDir, pattern) : 
    getMarkdownFiles(inputDir, pattern)
  
  if (files.length === 0) {
    console.log('📝 未找到匹配的 Markdown 文件')
    return
  }
  
  console.log(`🔄 开始批量转换 ${files.length} 个文件...`)
  
  let successCount = 0
  let errorCount = 0
  
  for (const filePath of files) {
    try {
      const relativePath = path.relative(inputDir, filePath)
      const outputPath = path.join(outputDir, relativePath.replace(/\.md$/, '.html'))
      const outputDirPath = path.dirname(outputPath)
      
      // 确保输出目录存在
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true })
      }
      
      const markdown = fs.readFileSync(filePath, 'utf-8')
      const html = await md2html(markdown)
      fs.writeFileSync(outputPath, html)
      
      console.log(`✅ ${relativePath} -> ${path.relative(outputDir, outputPath)}`)
      successCount++
    } catch (error) {
      console.error(`❌ 转换失败: ${path.relative(inputDir, filePath)}`, error)
      errorCount++
    }
  }
  
  console.log(`\n📊 转换完成:`)
  console.log(`  成功: ${successCount} 个文件`)
  console.log(`  失败: ${errorCount} 个文件`)
  console.log(`  输出目录: ${outputDir}`)
}

function getMarkdownFiles(dir: string, pattern: RegExp): string[] {
  return fs.readdirSync(dir)
    .filter(file => pattern.test(file))
    .map(file => path.join(dir, file))
    .filter(filePath => fs.statSync(filePath).isFile())
}

function getAllMarkdownFiles(dir: string, pattern: RegExp): string[] {
  const files: string[] = []
  
  function walk(currentDir: string) {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item)
      const stat = fs.statSync(itemPath)
      
      if (stat.isDirectory()) {
        walk(itemPath)
      } else if (stat.isFile() && pattern.test(item)) {
        files.push(itemPath)
      }
    }
  }
  
  walk(dir)
  return files
}

// CLI 用法
if (process.argv[1] && process.argv[1].endsWith('batch-convert.ts')) {
  (async () => {
    const [,, inputDir, outputDir, ...flags] = process.argv
    
    if (!inputDir || !outputDir) {
      console.log('批量 Markdown 转换器')
      console.log('')
      console.log('用法: npx tsx batch-convert.ts <输入目录> <输出目录> [选项]')
      console.log('')
      console.log('选项:')
      console.log('  --recursive, -r    递归处理子目录')
      console.log('  --pattern <regex>  文件名匹配模式 (默认: \\.md$)')
      console.log('')
      console.log('示例:')
      console.log('  npx tsx batch-convert.ts ./docs ./output')
      console.log('  npx tsx batch-convert.ts ./docs ./output --recursive')
      console.log('  npx tsx batch-convert.ts ./docs ./output --pattern ".*\\.md$"')
      process.exit(1)
    }
    
    const recursive = flags.includes('--recursive') || flags.includes('-r')
    const patternIndex = flags.findIndex(f => f === '--pattern')
    const pattern = patternIndex >= 0 && flags[patternIndex + 1] ? 
      new RegExp(flags[patternIndex + 1]) : /\.md$/
    
    try {
      await batchConvert({
        inputDir: path.resolve(inputDir),
        outputDir: path.resolve(outputDir),
        recursive,
        pattern
      })
    } catch (error) {
      console.error('❌ 批量转换失败:', error)
      process.exit(1)
    }
  })()
}

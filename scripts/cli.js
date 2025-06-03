#!/usr/bin/env node

/**
 * MD2HTML Converter CLI
 * 简化的命令行接口
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const scripts = {
  'convert': 'src/md2html-enhanced.ts',
  'convert-basic': 'src/md2html-new.ts',
  'batch': 'src/batch-convert.ts'
};

if (!command || !scripts[command]) {
  console.log('🚀 MD2HTML Converter v2.0');
  console.log('用法:');
  console.log('  npm run convert <input.md> <output.html>     # 增强版转换');
  console.log('  npm run convert-basic <input.md> <output.html> # 基础转换');
  console.log('  npm run batch <input-dir> <output-dir>       # 批量转换');
  console.log('');
  console.log('示例:');
  console.log('  npm run convert examples/ultimate-test.md output.html');
  console.log('  npm run batch examples/ output/');
  process.exit(1);
}

const scriptPath = join(__dirname, '..', scripts[command]);
const scriptArgs = args.slice(1);

const child = spawn('npx', ['tsx', scriptPath, ...scriptArgs], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});

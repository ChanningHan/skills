#!/usr/bin/env node

/**
 * PageSkill 初始化脚本
 *
 * 用法：
 *   node init_page_skill.js <skill-name> --path <output-directory>
 *
 * 示例：
 *   node init_page_skill.js my-app-skill --path ./src/skills
 *
 * 生成的目录结构：
 *   src/skills/my-app-skill/
 *   ├── index.ts
 *   ├── SKILL.md.ts
 *   ├── tools/
 *   │   ├── constants.ts
 *   │   ├── index.ts
 *   │   └── example/
 *   │       ├── index.ts
 *   │       └── exampleTool.ts
 *   └── references/
 *       ├── index.ts
 *       └── example-sop.md.ts
 */

const fs = require('fs');
const path = require('path');

// 获取脚本所在目录（用于定位 assets）
const SCRIPT_DIR = __dirname;
const ASSETS_DIR = path.join(SCRIPT_DIR, '..', 'assets', 'templates');

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  let skillName = null;
  let outputPath = './src/skills';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--path' && args[i + 1]) {
      outputPath = args[i + 1];
      i++;
    } else if (!args[i].startsWith('-')) {
      skillName = args[i];
    }
  }

  if (!skillName) {
    console.error('错误：请提供 skill 名称');
    console.error('用法：node init_page_skill.js <skill-name> --path <output-directory>');
    process.exit(1);
  }

  // 验证 skill 名称格式（kebab-case）
  if (!/^[a-z][a-z0-9-]*[a-z0-9]$/.test(skillName)) {
    console.error('错误：skill 名称必须是 kebab-case 格式（如 my-app-skill）');
    process.exit(1);
  }

  return { skillName, outputPath };
}

// 将 kebab-case 转换为 camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 将 kebab-case 转换为 PascalCase
function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// 替换模板中的占位符
function replaceTemplateVars(content, skillName) {
  return content
    .replace(/\{\{SKILL_NAME\}\}/g, skillName)
    .replace(/\{\{PASCAL_CASE_NAME\}\}/g, toPascalCase(skillName))
    .replace(/\{\{CAMEL_CASE_NAME\}\}/g, toCamelCase(skillName));
}

// 模板文件映射（模板路径 -> 输出路径）
const templateMappings = [
  { template: 'index.ts.template', output: 'index.ts' },
  { template: 'SKILL.md.ts.template', output: 'SKILL.md.ts' },
  { template: 'tools/constants.ts.template', output: 'tools/constants.ts' },
  { template: 'tools/index.ts.template', output: 'tools/index.ts' },
  { template: 'tools/example/index.ts.template', output: 'tools/example/index.ts' },
  { template: 'tools/example/exampleTool.ts.template', output: 'tools/example/exampleTool.ts' },
  { template: 'references/index.ts.template', output: 'references/index.ts' },
  { template: 'references/example-sop.md.ts.template', output: 'references/example-sop.md.ts' },
];

// 创建目录
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 创建目录: ${dirPath}`);
  }
}

// 读取模板文件
function readTemplate(templatePath) {
  const fullPath = path.join(ASSETS_DIR, templatePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`错误：模板文件不存在: ${fullPath}`);
    process.exit(1);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

// 写入文件
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`📄 创建文件: ${filePath}`);
}

// 主函数
function main() {
  const { skillName, outputPath } = parseArgs();
  const skillDir = path.join(outputPath, skillName);

  console.log(`\n🚀 开始创建 PageSkill: ${skillName}\n`);

  // 检查模板目录是否存在
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`错误：模板目录不存在: ${ASSETS_DIR}`);
    console.error('请确保脚本从正确的位置运行');
    process.exit(1);
  }

  // 检查目录是否已存在
  if (fs.existsSync(skillDir)) {
    console.error(`错误：目录已存在: ${skillDir}`);
    process.exit(1);
  }

  // 创建目录结构
  ensureDir(skillDir);
  ensureDir(path.join(skillDir, 'tools'));
  ensureDir(path.join(skillDir, 'tools', 'example'));
  ensureDir(path.join(skillDir, 'references'));

  // 从模板创建文件
  for (const { template, output } of templateMappings) {
    const templateContent = readTemplate(template);
    const processedContent = replaceTemplateVars(templateContent, skillName);
    const outputFile = path.join(skillDir, output);
    writeFile(outputFile, processedContent);
  }

  console.log(`\n✅ PageSkill 创建完成！\n`);
  console.log(`📍 位置: ${skillDir}`);
  console.log(`\n下一步:`);
  console.log(`  1. 安装依赖: npm install @ali/page-skill-react`);
  console.log(`  2. 在 layout.tsx 中引入: import { skillConfig } from '@/skills/${skillName}'`);
  console.log(`  3. 编辑 SKILL.md.ts 和 tools/ 下的工具定义`);
  console.log(`  4. 在业务组件中使用 useRegisterTools 注册工具实现\n`);
}

main();

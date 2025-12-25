#!/usr/bin/env node

/**
 * 生成 HTML 格式的评审报告
 * 
 * 使用方法：
 *   node generate-html.js <input-json> <output-html> [template-path]
 * 
 * 参数说明：
 *   input-json: 输入的 JSON 数据文件路径
 *   output-html: 输出的 HTML 文件路径
 *   template-path: 模板文件路径（可选，默认为 references/html-template.html）
 * 
 * 示例：
 *   node generate-html.js review-data.json review-report.html
 *   node generate-html.js review-data.json review-report.html references/html-template.html
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// 注册 Handlebars 辅助函数
Handlebars.registerHelper('inc', function(value) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('getScoreClass', function(score) {
    const numScore = parseFloat(score);
    if (numScore >= 4.5) return 'excellent';
    if (numScore >= 3.5) return 'good';
    if (numScore >= 2.5) return 'average';
    if (numScore >= 1.5) return 'poor';
    return 'fail';
});

Handlebars.registerHelper('groupBy', function(array, key) {
    if (!array || !Array.isArray(array)) {
        return {};
    }
    
    const grouped = {};
    array.forEach(item => {
        const groupKey = item[key] || '其他';
        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        grouped[groupKey].push(item);
    });
    
    return grouped;
});

/**
 * 读取 JSON 数据文件
 * @param {string} filePath - JSON 文件路径
 * @returns {object} 解析后的 JSON 对象
 */
function readJsonData(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`错误：无法读取 JSON 文件 ${filePath}`);
        console.error(error.message);
        process.exit(1);
    }
}

/**
 * 读取模板文件
 * @param {string} filePath - 模板文件路径
 * @returns {string} 模板内容
 */
function readTemplate(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`错误：无法读取模板文件 ${filePath}`);
        console.error(error.message);
        process.exit(1);
    }
}

/**
 * 生成 HTML 报告
 * @param {object} data - JSON 数据对象
 * @param {string} templatePath - 模板文件路径
 * @returns {string} 生成的 HTML 内容
 */
function generateHtml(data, templatePath) {
    const templateContent = readTemplate(templatePath);
    const template = Handlebars.compile(templateContent);
    return template(data);
}

/**
 * 写入输出文件
 * @param {string} filePath - 输出文件路径
 * @param {string} content - 文件内容
 */
function writeOutput(filePath, content) {
    try {
        // 确保输出目录存在
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ 成功生成 HTML 报告：${filePath}`);
    } catch (error) {
        console.error(`错误：无法写入输出文件 ${filePath}`);
        console.error(error.message);
        process.exit(1);
    }
}

/**
 * 主函数
 */
function main() {
    // 解析命令行参数
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.error('错误：参数不足');
        console.error('使用方法：node generate-html.js <input-json> <output-html> [template-path]');
        process.exit(1);
    }
    
    const inputJson = args[0];
    const outputHtml = args[1];
    const templatePath = args[2] || path.join(__dirname, '..', 'assets', 'report-templates', 'html-template.html');
    
    // 验证输入文件是否存在
    if (!fs.existsSync(inputJson)) {
        console.error(`错误：输入文件不存在：${inputJson}`);
        process.exit(1);
    }
    
    if (!fs.existsSync(templatePath)) {
        console.error(`错误：模板文件不存在：${templatePath}`);
        process.exit(1);
    }
    
    // 读取 JSON 数据
    console.log(`读取 JSON 数据：${inputJson}`);
    const data = readJsonData(inputJson);
    
    // 生成 HTML 报告
    console.log(`使用模板：${templatePath}`);
    const html = generateHtml(data, templatePath);
    
    // 写入输出文件
    writeOutput(outputHtml, html);
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = { generateHtml, readJsonData, readTemplate };

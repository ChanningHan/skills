---
name: proposal-reviewer
description: 指导 AI Agent 从多个专业角色视角（技术专家、产品经理、交互设计师、资深编辑、资深运营等等）评审方案文档，并生成综合评审报告。适用于技术方案、产品方案、设计方案、文章等各领域文档的评审。
---

# 方案评审

从多个专业角色视角评审方案文档，生成结构化评审报告。

## 评审流程

1. **理解方案文档**：理解方案文档的整体结构和关键章节
2. **分析方案结构**：提取核心要素（背景、目标、架构、方案选型、实施计划、风险评估等）
3. **角色评审**：根据方案类型选择合适的评审角色，从各角色的专业视角独立评审
4. **汇总评审意见**：整理各角色意见，识别共性问题和分歧点，提取关键优势和担忧
5. **生成评审报告**：按照标准格式生成评审报告并保存

## 角色选择

根据方案类型和评审目标选择合适的评审角色：

- **分析方案内容**：识别方案涉及的技术领域（前端/后端/全栈）、业务领域、用户体验等
- **匹配角色**：根据方案类型从可用角色中选择（见[角色定义指南](./references/roles-guide.md)）
- **生成新角色**：如果现有角色无法满足需求，可以根据方案特点生成定制化角色（参考现有角色结构，定义角色定位、关注领域、评审维度）

角色定义见：[角色定义指南](./references/roles-guide.md)

## 评审输出格式

每个角色的评审意见包含：

- **评审维度评价**：按各维度评分（1-5分）并给出具体评价、优势、问题、建议
- **整体评价**：总结优势、担忧、建议，给出综合评分

评分标准见：[评分标准指南](./references/scoring-guide.md)

## 模板匹配与使用

### 模板匹配

根据输入方案匹配评审模板：

1. **分析方案内容**：识别方案的核心主题和关注点（技术实现、业务价值、架构设计、性能优化等）
2. **匹配模板类型**：
   - 主要涉及前端技术、UI/UX → `proposal-templates/frontend-proposal-template.md`
   - 主要涉及后端架构、接口设计 → `proposal-templates/backend-proposal-template.md`
   - 主要涉及系统架构设计 → `proposal-templates/architecture-proposal-template.md`
   - 主要涉及产品功能、业务价值 → `proposal-templates/product-proposal-template.md`
   - 系统重构和升级 → `proposal-templates/refactoring-proposal-template.md`
   - 性能优化和调优 → `proposal-templates/performance-optimization-template.md`
3. **选择模板**：选择最符合方案类型的模板

所有可用模板见：[模板汇总](./references/template-selection-guide.md)

### 多模板组合

对于复杂方案，可以组合使用多个模板：

1. **主模板**：选择最符合方案类型的模板作为主模板
2. **补充模板**：参考其他模板的评审要点，补充评审维度
3. **合并评审**：将多个模板的评审维度合并到最终评审报告中

**示例**：前端重构方案可以组合使用重构方案模板（主）+ 前端方案模板（补充）+ 性能优化模板（补充）

### 生成自定义模板

如果现有模板无法满足评审需求，可以根据方案特点生成定制化模板：

1. **分析方案特点**：识别方案的特殊评审需求和关注点
2. **定义评审维度**：根据方案特点定义评审维度
3. **生成模板内容**：生成符合需求的模板内容（可选：参考现有模板结构）

生成模板时应保持：
- 标准评审报告结构（概述、角色评审、汇总、行动项、结论）
- 统一的评分体系（1-5分制）
- 清晰的评审维度定义

## 报告生成

评审完成后，可按以下步骤生成可视化报告：

### 步骤 1：生成 JSON 数据

将评审结果按照标准 JSON 格式输出并保存为文件。JSON 数据结构必须符合 `references/json-schema.md` 中定义的结构，包含：
- `metadata`：方案基本信息和评审人员信息
- `reviews`：各角色的评审意见（维度评价和整体评价）
- `summary`：评审汇总（整体评分、关键优势、主要担忧、改进建议）
- `actionItems`：行动项列表（可选）
- `conclusion`：结论和后续建议（可选）

### 步骤 2：使用脚本生成报告

使用脚本将 JSON 数据转换为可视化报告：

**生成 Markdown 报告**：
```bash
node scripts/generate-markdown.js <input-json> <output-md>
```

**生成 HTML 报告**：
```bash
node scripts/generate-html.js <input-json> <output-html>
```

**输出目录结构和文件命名**：

所有评审输出文件应保存在统一的目录中，目录命名格式：`review-{方案名称}-{时间戳}/`

示例：
```
review-api-design-20250127-143022/
├── data.json              # 结构化评审数据（JSON 格式）
├── report.md              # Markdown 格式报告
└── report.html            # HTML 格式报告（可视化）
```

参数说明：
- `input-json`：步骤 1 生成的 JSON 文件路径（对应目录中的 `data.json`）
- `output-md`：输出的 Markdown 报告路径（对应目录中的 `report.md`）
- `output-html`：输出的 HTML 报告路径（对应目录中的 `report.html`）

### 参考资料

- [JSON 数据结构定义](./references/json-schema.md) - 完整的 JSON Schema 和数据示例
- [Markdown 模板](./assets/report-templates/markdown-template.md) - Markdown 报告模板
- [HTML 模板](./assets/report-templates/html-template.html) - HTML 报告模板

## 注意事项

1. **角色独立性**：每个角色独立评审，从该角色的专业视角出发
2. **评审深度**：评审应具体、详细，避免泛泛而谈
3. **建设性意见**：不仅要指出问题，还要提供改进建议
4. **客观公正**：基于事实和专业知识评审，避免主观臆断
5. **结构化输出**：严格按照定义的格式输出评审意见

## 参考资料

- [角色定义汇总](./references/roles/index.md) - 所有可用角色的汇总表格和选择指南
- [评分标准指南](./references/scoring-guide.md) - 评分等级和权重定义
- [模板汇总](./references/template-selection-guide.md) - 所有可用模板的汇总表格

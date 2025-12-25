---
name: 优化 tech-proposal-reviewer Skill
overview: 基于识别的优化空间，对 tech-proposal-reviewer skill 进行全面优化，包括角色差异化、评分标准明确化、可配置性增强、评审流程优化等，形成优化后的技术方案文档。
todos:
  - id: optimize-role-definitions
    content: 优化角色定义，区分两个前端专家的关注点，并添加角色配置说明
    status: pending
  - id: add-scoring-standards
    content: 添加评分标准定义章节，为每个评分等级提供明确的判断标准
    status: pending
  - id: enhance-review-process
    content: 增强评审流程，添加评审模式配置（快速/标准/深度）和评审前检查清单
    status: pending
  - id: add-configurability
    content: 增加可配置性说明，支持自定义角色、评审维度和输出格式
    status: pending
  - id: optimize-report-format
    content: 优化报告格式，增加评审摘要章节，支持多种输出格式
    status: pending
  - id: add-quality-assurance
    content: 添加评审质量保证章节，包括完整性检查清单和质量验证标准
    status: pending
  - id: enhance-tool-guide
    content: 增强工具使用指南，提供具体的工具调用示例和最佳实践
    status: pending
  - id: update-template
    content: 更新评审报告模板，优化格式和结构
    status: pending
    dependencies:
      - optimize-report-format
  - id: update-example
    content: 更新示例评审报告，展示新的评分标准和格式
    status: pending
    dependencies:
      - add-scoring-standards
      - update-template
  - id: add-metadata
    content: 添加版本管理和元数据信息到 frontmatter
    status: pending
---

# tech-proposal-reviewer Skill 优化方案

## 优化目标

提升 skill 的灵活性、可配置性和实用性，使其能够适应更多评审场景，提供更高质量的评审结果。

## 主要优化内容

### 1. 角色定义优化

**文件**: `tech-proposal-reviewer/SKILL.md`

- **区分两个前端专家的关注点**
- 前端专家 1：侧重架构设计、性能优化、技术选型
- 前端专家 2：侧重代码质量、可维护性、工程化实践
- **增加角色配置说明**：支持自定义角色和评审维度

### 2. 评分标准明确化

**文件**: `tech-proposal-reviewer/SKILL.md`

- **添加评分标准定义章节**
- 5分：优秀，无明显问题
- 4分：良好，有少量改进空间
- 3分：一般，存在需要关注的问题
- 2分：较差，存在较多问题
- 1分：很差，存在严重问题
- **为每个评审维度提供评分参考标准**

### 3. 评审流程增强

**文件**: `tech-proposal-reviewer/SKILL.md`

- **增加评审模式配置**
- 快速评审模式：重点关注关键问题
- 标准评审模式：全面评审（默认）
- 深度评审模式：详细分析每个维度
- **优化评审流程描述**：提供更具体的工具使用示例
- **增加评审前准备检查清单**

### 4. 可配置性增强

**文件**: `tech-proposal-reviewer/SKILL.md`

- **添加配置章节**：说明如何自定义角色、评审维度、输出格式
- **支持角色选择**：允许用户选择需要的评审角色
- **支持评审维度定制**：允许用户自定义评审维度

### 5. 报告格式优化

**文件**: `tech-proposal-reviewer/SKILL.md`, `tech-proposal-reviewer/references/review-template.md`

- **增加报告格式选项**：Markdown（默认）、JSON、HTML
- **优化报告模板**：增加更多结构化信息
- **增加评审摘要章节**：提供快速概览

### 6. 评审质量保证

**文件**: `tech-proposal-reviewer/SKILL.md`

- **添加评审完整性检查清单**
- **增加评审质量验证标准**
- **提供评审最佳实践指南**

### 7. 多场景适配

**文件**: `tech-proposal-reviewer/SKILL.md`

- **扩展适用场景说明**
- **增加不同场景的评审重点提示**
- **提供场景化评审模板**

### 8. 版本管理和元数据

**文件**: `tech-proposal-reviewer/SKILL.md`

- **在 frontmatter 中添加版本号**
- **添加更新日志章节**
- **增加技能维护信息**

### 9. 工具使用指南增强

**文件**: `tech-proposal-reviewer/SKILL.md`

- **提供具体的工具调用示例**
- **增加常见问题解答**
- **添加故障排查指南**

### 10. 评审效率优化

**文件**: `tech-proposal-reviewer/SKILL.md`

- **支持并行评审模式**（可选）
- **提供快速评审模板**
- **增加评审时间估算指导**

## 实施步骤

1. **更新 SKILL.md 主文档**

- 优化角色定义，区分两个前端专家
- 添加评分标准章节
- 增加评审模式配置
- 添加可配置性说明
- 增强工具使用指南
- 添加评审质量保证章节

2. **更新评审报告模板**

- 优化 `references/review-template.md`
- 增加评审摘要部分
- 优化行动项表格格式

3. **更新示例报告**

- 根据新的评分标准更新示例
- 展示不同评审模式的效果

4. **添加配置文档**（可选）

- 创建 `CONFIG.md` 说明配置选项

## 预期效果

- 评审结果更加准确和一致
- 支持更多使用场景
- 提高评审效率
- 更好的可维护性和扩展性
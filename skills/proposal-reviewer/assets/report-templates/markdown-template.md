# {{metadata.proposalName}} 技术方案评审报告

> **评审日期**：{{metadata.reviewDate}}  
> **评审人员**：{{#each metadata.reviewers}}{{this.role}}{{#if this.name}}（{{this.name}}）{{/if}}{{#unless @last}}、{{/unless}}{{/each}}

## 目录

- [一、评审概述](#一评审概述)
- [二、各角色评审意见](#二各角色评审意见)
- [三、评审汇总](#三评审汇总)
- [四、行动项](#四行动项)
- [五、评审结论](#五评审结论)

---

## 一、评审概述

### 方案基本信息

- **方案名称**：{{metadata.proposalName}}
- **方案版本**：{{metadata.proposalVersion}}
{{#if metadata.createdDate}}- **创建日期**：{{metadata.createdDate}}{{/if}}
{{#if metadata.proposalPath}}- **方案路径**：{{metadata.proposalPath}}{{/if}}

{{#if metadata.reviewScope}}
### 评审范围

{{metadata.reviewScope}}
{{/if}}

### 评审结论

- **整体评分**：{{summary.overallScore}} / 5
- **是否建议通过**：{{summary.recommendation}}

---

## 二、各角色评审意见

{{#each reviews}}
### {{inc @index}}. {{this.role}}评审意见

#### 评审维度评价

{{#each this.dimensions}}
##### {{inc @index}}. {{this.name}} [评分：{{this.score}}]

{{this.evaluation}}

{{#if this.strengths}}
**优势**：
{{#each this.strengths}}
- {{this}}
{{/each}}
{{/if}}

{{#if this.issues}}
**问题**：
{{#each this.issues}}
- {{this}}
{{/each}}
{{/if}}

{{#if this.suggestions}}
**建议**：
{{#each this.suggestions}}
- {{this}}
{{/each}}
{{/if}}

{{/each}}

#### 整体评价

{{#if this.overall.strengths}}
**优势**：
{{#each this.overall.strengths}}
- {{this}}
{{/each}}
{{/if}}

{{#if this.overall.concerns}}
**担忧**：
{{#each this.overall.concerns}}
- {{this}}
{{/each}}
{{/if}}

{{#if this.overall.suggestions}}
**建议**：
{{#each this.overall.suggestions}}
- {{this}}
{{/each}}
{{/if}}

**综合评分**：{{this.overall.score}} / 5

---

{{/each}}

## 三、评审汇总

{{#if summary.keyStrengths}}
### 3.1 关键优势

{{#each summary.keyStrengths}}
{{inc @index}}. {{this.content}}
   - 优先级：{{this.priority}}
   {{#if this.mentionedBy}}- 提出者：{{#each this.mentionedBy}}{{this}}{{#unless @last}}、{{/unless}}{{/each}}{{/if}}

{{/each}}
{{/if}}

{{#if summary.mainConcerns}}
### 3.2 主要担忧

{{#each summary.mainConcerns}}
{{inc @index}}. {{this.content}}
   - 提出者：{{#each this.mentionedBy}}{{this}}{{#unless @last}}、{{/unless}}{{/each}}
   - 严重程度：{{this.severity}}
   {{#if this.impact}}- 影响范围：{{this.impact}}{{/if}}

{{/each}}
{{/if}}

{{#if summary.improvements}}
### 3.3 改进建议

{{#groupBy summary.improvements "category"}}
{{#each this}}
#### {{@key}}相关
{{#each this}}
- {{this.content}}
  {{#if this.mentionedBy}}（提出者：{{#each this.mentionedBy}}{{this}}{{#unless @last}}、{{/unless}}{{/each}}）{{/if}}
{{/each}}

{{/each}}
{{/groupBy}}
{{/if}}

{{#if actionItems}}
---

## 四、行动项

| 优先级 | 行动项 | 类别 | 建议责任人 | 预期完成时间 |
|--------|--------|------|-----------|-------------|
{{#each actionItems}}
| {{this.priority}} | {{this.content}} | {{this.category}} | {{#if this.assignee}}{{this.assignee}}{{else}}-{{/if}} | {{#if this.dueDate}}{{this.dueDate}}{{else}}-{{/if}} |
{{/each}}

**优先级说明**：
- **P0**：必须在方案实施前解决的问题
- **P1**：建议在方案实施时同步解决的问题
- **P2**：可以在后续迭代中优化的问题
{{/if}}

{{#if conclusion}}
---

## 五、评审结论

{{conclusion.overallEvaluation}}

{{#if conclusion.prerequisites}}
### 关键前置条件

{{#each conclusion.prerequisites}}
- {{this}}
{{/each}}
{{/if}}

{{#if conclusion.nextSteps}}
### 后续建议

{{#each conclusion.nextSteps}}
- {{this}}
{{/each}}
{{/if}}
{{/if}}

---

**评审报告结束**

# 文档编写指南

介绍 PageSkill 中 description（SKILL.md）和 references 的编写规范。

---

## SKILL.md 编写

### 文件格式

使用 TypeScript 导出 Markdown 字符串：

```typescript
// SKILL.md.ts
export const SKILL_MD_CONTENT = `---
name: my-skill-name
description: |
  简短描述 Skill 的核心能力（1-3 句话）。
---

# Skill 名称

内容...
`;

export default SKILL_MD_CONTENT;
```

### 必须包含的部分

1. **YAML Front Matter**
   - `name`：Skill 名称（与 skillConfig.skillName 一致）
   - `description`：简短描述

2. **概述**：整体介绍

3. **核心能力**：编号列表

4. **使用场景**：概括性描述
   - 适用情况（简述）
   - 详细流程（指向 references）

5. **参考文档**：链接到 references

6. **约束说明**：重要限制（⚠️ 标注）

### 编写原则

| 原则 | 说明 |
|-----|------|
| **概括性优先** | 保持简洁，详细内容放 references |
| **SSOT** | 工具信息只在工具定义维护 |
| **面向 AI** | 描述清晰明确 |
| **指引到 references** | SOP 和示例放 references |

### 示例模板

```markdown
---
name: my-skill
description: |
  TODO: 简短描述
---

# My Skill

## 概述

TODO: 整体介绍

## 核心能力

1. **能力一** - 说明
2. **能力二** - 说明

## 使用场景

### 场景 1：TODO

**适用情况**：TODO
**详细流程**：参考 [SOP 文档](references/xxx-sop.md)

## 参考文档

- [XXX SOP](references/xxx-sop.md) - 说明

## 约束说明

- ⚠️ TODO

> 💡 工具详情请查看参考文档和工具定义，遵循 SSOT 原则。
```

---

## references 编写

### 文件格式

```typescript
// references/my-sop.md.ts
export const MY_SOP = `# SOP 标题

内容...
`;
```

### SOP 文档结构

```markdown
# SOP 标题

## 概述

描述目的和适用场景。

## 前置条件

- 条件 1
- 条件 2

## 操作步骤

### 1. 步骤一

- **说明**：详细描述
- **注意**：注意事项

### 2. 步骤二

...

## 验证步骤

1. 验证项 1
2. 验证项 2

## 注意事项

- ⚠️ 注意事项 1
- ⚠️ 注意事项 2

## 常见问题

### Q1: 问题？

**答**：解答
```

### 汇总导出

```typescript
// references/index.ts
import type { ReferenceItem } from '@ali/page-skill-react';
import { MY_SOP } from './my-sop.md';
import { ANOTHER_SOP } from './another-sop.md';

export const references: ReferenceItem[] = [
  { name: 'MY_SOP', content: MY_SOP },
  { name: 'ANOTHER_SOP', content: ANOTHER_SOP },
];
```

---

## 内容规范

### 工具引用

使用实际的工具名称常量，不要硬编码：

```markdown
<!-- ❌ 不推荐 -->
使用 `searchActivityById` 工具

<!-- ✅ 推荐 -->
使用搜索工具（工具详情见工具定义文件）
```

### 代码示例

提供完整可运行的示例：

```typescript
// 完整示例
await pageSkill.call('my-skill_searchItem', {
  keyword: '关键词',
  page: 1,
});
```

### 注意事项标注

使用 ⚠️ 标注重要信息：

```markdown
- ⚠️ **重要**：这是必须注意的事项
- ⚠️ 所有时间字段必须使用北京时间
```

---

## 维护原则

1. **文档与代码同步**：代码变更时同步更新文档
2. **避免重复**：信息只在一处维护
3. **保持简洁**：删除过时或冗余内容
4. **验证准确性**：定期检查文档是否与实现一致

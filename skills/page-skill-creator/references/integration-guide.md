# PageSkill 完整接入指南

本文档是 PageSkill 接入的完整指南，涵盖 SDK 使用、目录规范、编写指南及最佳实践。

---

## 目录

- [概述](#概述)
- [快速开始](#快速开始)
- [目录规范](#目录规范)
- [description 编写指南](#description-编写指南)
- [tools 开发指南](#tools-开发指南)
- [references 编写指南](#references-编写指南)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## 概述

### 什么是 PageSkill

PageSkill 让 AI Agent 能够理解和操作 Web 页面。它通过定义页面的"能力包"（Skill），让 AI 能够：

1. **理解页面能力**：通过 `description` 了解页面能做什么
2. **调用页面工具**：通过 `tools` 执行具体操作
3. **参考业务知识**：通过 `references` 获取操作指南

### 核心组件

| 组件 | 说明 |
|-----|------|
| **description** | Skill 说明文档（Markdown），概述能力和场景 |
| **tools** | 可调用的工具列表，定义输入参数和描述 |
| **references** | 业务知识文档，SOP 和详细指南 |

---

## 快速开始

### 1. 安装依赖

```bash
npm install @ali/page-skill-react
```

### 2. 初始化目录结构

使用初始化脚本：

```bash
node scripts/init_page_skill.js my-app-skill --path ./src/skills
```

### 3. 在根组件初始化

```typescript
import { useInitPageSkill, PageSkillProvider } from '@ali/page-skill-react';
import { skillConfig } from '@/skills/my-app-skill';

export default function Layout() {
  const pageSkill = useInitPageSkill(skillConfig);
  return (
    <PageSkillProvider pageSkill={pageSkill}>
      <Outlet />
    </PageSkillProvider>
  );
}
```

### 4. 在业务组件注册工具

```typescript
// 从 tools/index.ts 引入类型安全的 useRegisterTools
import { useRegisterTools } from '@/skills/my-app-skill/tools';

function MyPage() {
  // IDE 自动提示所有可用工具名，args 类型自动推导
  useRegisterTools({
    'my-app-skill_myTool': async (args) => {
      return await doSomething(args); // 直接返回，SDK 自动包装
    },
  });
}
```

---

## 目录规范

### 核心原则

- 一个仓库通常只需要一个 PageSkill
- 所有 Skill 统一放在 `src/skills/` 目录下
- 目录名 = Skill 名称（kebab-case）

### 目录结构

```
src/skills/
└── {skill-name}/
    ├── index.ts            # 统一导出 skillConfig
    ├── SKILL.md.ts         # Skill 说明文档
    ├── tools/
    │   ├── constants.ts    # Skill 名称常量
    │   ├── index.ts        # 工具注册表（useRegisterTools、definitions）
    │   └── {category}/     # 按页面/功能分类
    │       ├── index.ts
    │       └── myTool.ts
    └── references/
        ├── index.ts        # 参考文档汇总
        └── my-sop.md.ts
```

---

## description 编写指南

### 核心要素

1. **YAML Front Matter**：name 和 description
2. **概述**：Skill 的整体介绍
3. **核心能力**：列出 Skill 能做什么
4. **使用场景**：概括性描述，指向 references
5. **参考文档**：列出详细文档链接
6. **约束说明**：重要限制和注意事项

### 编写原则

- **概括性优先**：SKILL.md 保持简洁，详细内容放 references
- **SSOT 原则**：工具信息只在工具定义文件维护，不在 SKILL.md 重复
- **面向 AI**：描述清晰明确，避免歧义
- **指引到 references**：具体 SOP 和示例放在 references 中

---

## tools 开发指南

工具开发只需两步：**定义** → **实现**。通过 `createToolRegistry` 实现类型安全的自动推导。

### 1. 定义工具

使用 `defineTool` 定义单个工具，通过 Zod Schema 同时生成 JSON Schema 和 TypeScript 类型：

```typescript
// tools/list/searchItem.ts
import { defineTool } from '@ali/page-skill-react';
import { SKILL_NAME } from '../constants';

export const searchItemTool = defineTool(({ z }) => ({
  name: `${SKILL_NAME}_searchItem`,
  description: '根据关键词搜索。📍 仅列表页可用。',
  zodSchema: z.object({
    keyword: z.string().describe('搜索关键词'),
    page: z.number().optional().default(1).describe('页码'),
  }),
}));
```

### 2. 汇总并创建注册表

使用 `createToolRegistry` 汇总所有工具定义，生成类型安全的 `useRegisterTools` Hook：

```typescript
// tools/index.ts
import { createToolRegistry } from '@ali/page-skill-react';
import { searchItemTool } from './list/searchItem';

export const { useRegisterTools, definitions } = createToolRegistry([
  searchItemTool,
] as const);
```

### 3. 返回值自动包装

SDK 自动包装返回值，**无需手动处理**：

| 工具返回 | SDK 转换为 |
|---------|-----------|
| `return data` | `{ success: true, result: data }` |
| `throw new Error(msg)` | `{ success: false, message: msg }` |

**正确写法**：

```typescript
useRegisterTools({
  myTool: async (args) => {
    if (!args.id) throw new Error('ID 不能为空');
    return await api.getData(args.id); // 直接返回
  },
});
```

### 4. 工具描述原则

好的描述包含：
- 功能说明
- 适用页面（📍 标注）
- 参数约束

---

## references 编写指南

### SOP 文档结构

```markdown
# SOP 标题

## 概述
描述目的和适用场景

## 前置条件
- 条件 1
- 条件 2

## 操作步骤
### 1. 步骤一
详细描述

### 2. 步骤二
详细描述

## 验证步骤
1. 验证项 1
2. 验证项 2

## 注意事项
- ⚠️ 注意事项

## 常见问题
### Q1: 问题？
**答**：解答
```

### 汇总导出

```typescript
// references/index.ts
import type { ReferenceItem } from '@ali/page-skill-react';
import { MY_SOP } from './my-sop.md';

export const references: ReferenceItem[] = [
  { name: 'MY_SOP', content: MY_SOP },
];
```

---

## 最佳实践

### 命名规范

| 类型 | 规范 | 示例 |
|-----|------|------|
| Skill 名称 | kebab-case | `my-app-skill` |
| 工具名称 | `${skillName}_toolName` | `my-app-skill_searchItem` |
| 常量名 | UPPER_SNAKE_CASE | `SEARCH_ITEM` |

### 工具注册位置

- 在能访问相关状态的组件中注册
- 组件卸载时自动清理
- `useRegisterTools` 使用 `useLatest` 避免闭包问题

### 调试技巧

```javascript
// 浏览器控制台
window.__pageSkills    // 查看所有 Skill
window.pageSkill       // 单实例快捷访问
window.pageSkill.getSkill()  // 查看 Skill 信息
await window.pageSkill.call('skillName_toolName', args)  // 手动调用
```

---

## 常见问题

### Q1: 工具在某页面无法调用？

工具实现只在特定组件注册，该组件未挂载时无法调用。在工具描述中标注适用页面。

### Q2: 工具返回格式不对？

SDK 自动包装，直接返回业务数据即可，使用 throw 抛出错误。

### Q3: 如何支持多 Skill？

在不同的页面入口组件分别初始化：

```typescript
// moduleA/layout.tsx
const skillA = useInitPageSkill(skillConfigA);

// moduleB/layout.tsx  
const skillB = useInitPageSkill(skillConfigB);
```

### Q4: 工具如何访问组件状态？

`useRegisterTools` 在组件内调用，可直接访问 state、Form、hooks 等。

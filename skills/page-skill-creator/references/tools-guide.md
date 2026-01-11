# 工具开发指南

详细介绍 PageSkill 工具的定义和实现注册。工具开发只需两步：**定义** → **实现**。

---

## 工具定义流程

### 1. 创建工具定义文件

在对应分类目录下创建工具文件，使用 `defineTool` 和 Zod Schema：

```typescript
// tools/list/newTool.ts
import { defineTool } from '@ali/page-skill-react';
import { SKILL_NAME } from '../constants';

export const newTool = defineTool(({ z }) => ({
  name: `${SKILL_NAME}_newTool`,
  description: '工具功能描述。📍 适用页面标注。',
  zodSchema: z.object({
    param1: z.string().describe('参数说明'),
    param2: z.boolean().optional().describe('可选参数'),
  }),
}));
```

### 2. 导出工具定义

```typescript
// tools/list/index.ts
import { newTool } from './newTool';

export const listToolDefinitions = [
  // 已有工具...
  newTool,
] as const;
```

### 3. 汇总并创建注册表

在 `tools/index.ts` 中使用 `createToolRegistry` 汇总所有工具：

```typescript
// tools/index.ts
import { createToolRegistry } from '@ali/page-skill-react';
import { listToolDefinitions } from './list';

// 一行搞定：汇总定义，导出类型安全的 Hook
export const { useRegisterTools, definitions } = createToolRegistry([
  ...listToolDefinitions,
] as const);
```

### 4. 注册工具实现

在业务组件中，直接引入 `useRegisterTools`，IDE 自动提示工具名和参数类型：

```typescript
// 从 tools/index.ts 引入（不是从 @ali/page-skill-react）
import { useRegisterTools } from '@/skills/my-skill/tools';

function ListPage() {
  // IDE 自动提示所有可用工具名，args 类型自动推导
  useRegisterTools({
    'my-skill_newTool': async (args) => {
      // args 自动为 { param1: string; param2?: boolean }
      return result;
    },
  });
}
```

---

## Zod Schema 常用模式

### 基础类型

```typescript
z.string()              // 字符串
z.number()              // 数字
z.boolean()             // 布尔
z.array(z.string())     // 字符串数组
```

### 可选和默认值

```typescript
z.string().optional()              // 可选
z.number().default(1)              // 默认值
z.string().optional().default('')  // 可选带默认值
```

### 枚举

```typescript
z.enum(['option1', 'option2', 'option3'])
```

### 嵌套对象

```typescript
z.object({
  user: z.object({
    name: z.string(),
    age: z.number(),
  }),
})
```

### 描述

```typescript
z.string().describe('参数的详细说明，AI 会读取这个描述')
```

---

## 工具描述编写

### 好的描述包含

1. **功能说明**：工具做什么
2. **适用页面**：📍 标注
3. **输入输出**：参数和返回值说明
4. **前置条件**：需要什么条件

### 示例

```typescript
description: `
根据活动 ID 搜索消费券活动。
输入活动 ID（纯数字），返回匹配的活动列表。
📍 仅列表页可用。
前置条件：需要先登录。
`.trim(),
```

---

## 返回值处理

### SDK 自动包装

| 返回 | 转换为 |
|-----|-------|
| `return data` | `{ success: true, result: data }` |
| `throw Error` | `{ success: false, message: ... }` |

### 智能错误提取

SDK 从多种格式提取错误信息：

- `Error.message`
- `axios.response.data.message`
- `axios.response.data.reason`
- JSON 序列化或 String 转换

---

## 工具变更检查清单

任何工具新增、修改、删除必须完成：

```
1. tools/{xxx}.ts   → 创建/修改/删除工具定义
2. tools/{分类}/index.ts → 更新分类导出数组
3. tools/index.ts   → 确保 createToolRegistry 包含新工具
4. 业务组件         → 更新 useRegisterTools
5. references/      → 更新 SOP 文档（如涉及）
6. SKILL.md.ts      → 更新场景说明（如涉及）
```

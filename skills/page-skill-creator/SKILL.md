---
name: page-skill-creator
description: |
  创建和开发 PageSkill 的完整指南。当用户需要在业务项目中接入 PageSkill SDK、创建新的 PageSkill、
  编写 description/tools/references、或了解 PageSkill 目录规范时使用此 skill。
  
  触发场景：
  - "帮我创建一个 PageSkill"
  - "如何接入 page-skill-sdk"
  - "PageSkill 的目录结构是什么"
  - "如何编写 SKILL.md / tools / references"
  - "初始化一个新的 PageSkill 项目"
---

# PageSkill Creator

创建和开发 PageSkill 的完整指南，包含初始化脚本、目录规范、编写指南。

## 快速开始

### 1. 初始化 PageSkill 目录结构

运行初始化脚本自动生成目录结构：

```bash
node scripts/init_page_skill.js <skill-name> --path <output-directory>
```

**示例**：

```bash
# 在 src/skills/ 下创建 my-app-skill
node scripts/init_page_skill.js my-app-skill --path ./src/skills
```

生成的目录结构：

```
src/skills/my-app-skill/
├── index.ts              # 统一导出配置
├── SKILL.md.ts           # Skill 说明文档
├── tools/
│   ├── constants.ts      # 工具名称常量
│   ├── index.ts          # 工具定义汇总
│   └── example/
│       ├── index.ts
│       └── exampleTool.ts
└── references/
    ├── index.ts
    └── example-sop.md.ts
```

### 2. 安装 SDK 依赖

```bash
npm install @ali/page-skill-react
# 或
pnpm add @ali/page-skill-react
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

### 4. 在业务组件注册工具实现

```typescript
import { useRegisterTools } from '@ali/page-skill-react';
import { TOOL_NAMES } from '@/skills/my-app-skill/tools/constants';

function MyPage() {
  useRegisterTools({
    [TOOL_NAMES.MY_TOOL]: async (args) => {
      // 直接返回业务数据，SDK 自动包装
      return { data: 'result' };
    },
  });
}
```

## 核心概念

### PageSkill 组成

| 组件 | 职责 | 位置 |
|-----|------|------|
| **description** | Skill 说明文档（Markdown） | `SKILL.md.ts` |
| **tools** | 可调用的工具列表 | `tools/` |
| **references** | 业务知识文档 | `references/` |

### 返回值自动包装

SDK 自动包装工具返回值，**接入方无需手动处理**：

| 工具返回 | SDK 自动转换为 |
|---------|---------------|
| `return data` | `{ success: true, result: data }` |
| `throw new Error(msg)` | `{ success: false, message: msg }` |

## 详细指南

根据需要阅读以下参考文档：

- **[完整接入指南](references/integration-guide.md)** - SDK 使用、目录规范、编写指南、最佳实践
- **[工具开发指南](references/tools-guide.md)** - 工具定义（Zod）、常量管理、实现注册
- **[文档编写指南](references/docs-guide.md)** - description 和 references 的编写规范

## 命名规范

| 类型 | 规范 | 示例 |
|-----|------|------|
| Skill 名称 | kebab-case | `my-app-skill` |
| 工具名称 | `${skillName}_toolName` | `my-app-skill_searchItem` |
| 常量名 | UPPER_SNAKE_CASE | `SEARCH_ITEM` |
| 目录名 | kebab-case | `my-app-skill` |

## 编写原则

1. **SSOT（单一数据源）**：工具信息只在工具定义文件中维护
2. **概括性优先**：SKILL.md 保持简洁，详细内容放 references
3. **面向 AI**：描述清晰明确，避免歧义
4. **指引到 references**：具体 SOP 和示例放在 references 中

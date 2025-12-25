# AI 辅助开发指导文档

本文档为 AI 协助开发本项目时的行为准则和规范。

## 项目概述

这是一个 OpenSkills 技能集合仓库，用于存放和管理可复用的 AI Agent 技能（Skills）。Skills 是标准化的 AI Agent 能力模块，可以通过 OpenSkills 工具安装和使用。

### 技术栈

- **文档格式**: Markdown
- **技能标准**: OpenSkills 标准格式
- **脚本语言**: Python、JavaScript、Shell 等（根据 Skill 需求）
- **版本控制**: Git
- **开发工具**: Markdown 编辑器、代码编辑器

## 开发流程规范

### 1. 渐进式开发原则

**核心要求：最小单元计划，文档先行**

- **禁止大规模编写代码**：避免一次性实现大量功能
- **最小单元拆分**：将任务拆解为最小可验证的功能单元
- **执行前确认**：每个计划执行前必须与开发者确认所有细节
- **文档驱动开发**：
  - 每个功能实现前，先给出多种方案，并给出方案的优缺点，我决策后再执行
  - 文档存放于对应 docs 目录下
  - 方案需包含：背景、设计思路、实现细节、可能的风险点
  - 首次技术方案文档内容不要过多，仅表达重点内容和思路，后续再逐步补充详细方案，否则阅读理解成本太大，效率低
  - 确保方案正确且达成一致后再执行代码实现
  - **⚠️ 强制要求：技术方案变更必须同步更新文档**
    - 任何涉及接口、业务逻辑、核心实现的代码变更，都必须立即更新对应的文档
    - 文档与代码必须保持一致，避免文档过时导致理解偏差
    - 更新文档是任务完成的必要条件，不可遗漏

### 2. 最小实现与扩展性平衡

**核心要求：避免过度设计，保留可扩展性**

- **最小可行实现（MVP）优先**：
  - 先实现核心功能，满足当前需求
  - 不提前实现可能用到的功能
  - 不过早引入复杂抽象
  
- **预留扩展点**：
  - Skill 文档结构清晰，便于扩展
  - 关键位置预留可配置项和钩子机制
  - 采用模块化设计，方便组合使用
  
- **避免过度设计**：
  - 合理的文档结构和章节划分
  - 清晰的职责边界
  - 松耦合的模块关系

### 3. 开发原则（按优先级）

1. **First Principles（第一性原理）**：梳理最核心需求与边界
2. **YAGNI（You Ain't Gonna Need It）**：不要过早实现可能不需要的功能，只实现当前真正需要的功能
3. **KISS（Keep It Simple Stupid）**：保持设计和实现的简单性，不要过度设计
4. **SOLID（Single Responsibility Principle）**：单一职责原则，每个模块和函数只做一件事
5. **DRY（Don't Repeat Yourself）**：不要重复代码和文档，遵循 DRY 原则，提炼公共逻辑和模板

### 4. 提交规范

- 使用中文提交，描述精简

## 代码质量要求

### 1. 架构设计原则

- **健壮性**：
  - 完善的错误处理机制
  - 边界条件检查
  - 防御性编程
  
- **可扩展性**：
  - 遵循开闭原则（对扩展开放，对修改关闭）
  - 使用策略模式、工厂模式等设计模式
  - 插件化架构思想
  
- **可读性**：
  - 清晰的命名（见名知义）
  - 适当的注释（why，而非 what）
  - 合理的代码组织结构

### 2. 注释规范

**⚠️ 强制要求：必须添加适当的注释**

- **关键业务逻辑必须注释**：
  - 函数定义：说明函数的目的、参数含义、返回值
  - 复杂逻辑：说明核心思路和边界条件
  - 业务规则：说明为什么这样实现（why，而非 what）
  - 算法逻辑：说明核心思路和边界条件

- **注释原则**：
  - ✅ **解释意图**：为什么这样做（业务原因、技术选型原因）
  - ✅ **说明职责**：这段代码负责什么功能
  - ✅ **标注边界**：特殊情况、边界条件、注意事项
  - ❌ **避免废话**：不要注释显而易见的代码
  - ❌ **避免过时**：代码变更时同步更新注释

- **必须注释的场景**：
  1. 复杂的业务逻辑函数：说明函数目的和核心逻辑
  2. 特殊的技术实现：说明为什么选择这种实现方式
  3. 临时方案或 Workaround：说明原因和后续优化计划
  4. 重要的配置项和参数：说明用途和可选值
  5. 脚本入口和主要流程：说明脚本的用途和使用方法

### 3. 编程范式选择

**优先级：函数式 > 面向对象**

- **优先函数式编程**：
  - 使用纯函数，避免副作用
  - 数据不可变（Immutable）
  - 函数组合和高阶函数
  
- **必要时使用面向对象**：
  - 需要维护状态的场景
  - 需要封装复杂行为的场景
  - 需要继承和多态的场景
  - 使用 class 时保持简洁，避免过度封装

## 文档质量要求

### 1. 文档设计原则

- **清晰性**：
  - 文档结构清晰，层次分明
  - 使用标准的 Markdown 格式
  - 适当的标题层级和列表组织
  
- **可扩展性**：
  - 遵循模块化设计，便于扩展
  - 预留可配置项和扩展点
  - 支持组合使用多个 Skills
  
- **可读性**：
  - 清晰的命名（见名知义）
  - 适当的说明和注释（why，而非 what）
  - 合理的文档组织结构

### 2. 文档说明规范

**⚠️ 强制要求：必须添加适当的说明和注释**

- **关键内容必须说明**：
  - Skill 用途：说明 Skill 的核心功能和适用场景
  - 使用流程：说明如何使用该 Skill
  - 脚本说明：说明脚本的用途、参数和使用方法
  - 注意事项：说明特殊情况和边界条件
  - 示例说明：说明示例的使用场景和关键点

- **说明原则**：
  - ✅ **解释意图**：为什么这样设计（设计原因、使用场景）
  - ✅ **说明职责**：这段内容负责什么功能
  - ✅ **标注边界**：特殊情况、边界条件、注意事项
  - ❌ **避免废话**：不要说明显而易见的内容
  - ❌ **避免过时**：文档变更时同步更新说明

- **必须说明的场景**：
  1. Skill 概述：说明 Skill 的用途和核心能力
  2. 复杂的使用流程：说明步骤和关键点
  3. 脚本使用说明：说明脚本的用途、参数、返回值
  4. 特殊的设计决策：说明为什么选择这种设计方式
  5. 临时方案或限制：说明原因和后续优化计划
  6. 重要的配置项：说明配置项的用途和可选值

## 代码风格规范

### TypeScript 规范

- 遵循 PEP 8 代码风格规范
- 使用类型提示（Type Hints）
- 函数和类命名清晰（见名知义）
- 适当使用文档字符串（docstring）
- 合理使用异常处理

### JavaScript/TypeScript 规范（如使用 JS/TS）

- 遵循 ESLint 和 Prettier 配置
- 使用 TypeScript 时充分利用类型系统，避免使用any
- 函数和变量命名清晰（camelCase）
- 适当添加 JSDoc 注释
- 合理使用 async/await 处理异步

### Shell 脚本规范（如使用 Shell）

- 使用 `#!/bin/bash` 或 `#!/bin/sh` 指定解释器
- 添加脚本说明注释
- 使用有意义的变量名
- 添加错误处理（`set -e`、`set -u`）
- 合理使用函数组织代码

### Markdown 规范

- 所有 Skill 文档使用 Markdown 格式
- 遵循 OpenSkills 标准格式规范
- 文档结构清晰，层次分明
- 使用标准的 Markdown 语法
- 代码块标注语言类型
- 文档统一使用 UTF-8 编码

### Skill 文档规范

- **文件命名**：使用 `SKILL.md` 作为主文档文件名
- **Front Matter**：必须包含标准的 YAML front matter（name、description、license 等）
- **文档结构**：遵循 OpenSkills 标准结构
  - 概述（Overview）
  - 核心能力（Core Capabilities）
  - 使用指南（Usage Guide）
  - 参考资料（References）
- **示例和模板**：提供清晰的示例和模板文件
- **文档完整性**：确保文档包含所有必要信息，便于 AI Agent 理解和使用

### OpenSkills 规范

- **技能格式**：遵循 OpenSkills 标准格式
- **目录结构**：每个 Skill 独立目录，包含 `SKILL.md`、`LICENSE.txt`、`references/`、`examples/`、`scripts/`、`assets/` 等
- **元数据**：正确填写 front matter 中的元数据
- **可发现性**：确保 Skill 描述清晰，便于搜索和使用
- **版本管理**：通过 Git 进行版本控制

### 命名规范

- Skill 目录名：kebab-case（如 `proposal-reviewer`）
- 文档文件名：`SKILL.md`（主文档）、其他文档使用 kebab-case.md
- 脚本文件名：kebab-case.py/js/sh（如 `process-data.py`、`setup.sh`）
- 示例文件名：kebab-case.md（如 `sample-review-report.md`）
- 模板文件名：kebab-case.md（如 `review-template.md`）
- 目录名：小写，使用复数形式（如 `examples/`、`references/`、`scripts/`、`assets/`）

## 架构设计

### Skill 仓库架构

- **根目录**：仓库根目录，包含 README、LICENSE、AGENT.md 等
- **Skill 目录**：每个 Skill 独立目录，包含完整的 Skill 文档和资源
- **文档层**：SKILL.md 主文档，包含完整的使用指南
- **示例层**：examples/ 目录，提供使用示例
- **参考层**：references/ 目录，提供模板和参考资料

### 目录结构规范

```
skills/
├── README.md                    # 仓库说明文档
├── LICENSE                      # 仓库许可证
├── AGENT.md                     # AI 辅助开发指导文档
├── docs/                        # 文档目录
├── skills/                      # Skills 目录
│   └── skill-name/              # Skill 目录（kebab-case）
│       ├── SKILL.md             # Skill 主文档（必需）
│       ├── LICENSE.txt          # Skill 许可证（可选）
│       ├── examples/            # 示例文件目录（可选）
│       │   └── example-name.md
│       ├── references/          # 参考资料目录（可选）
│       │   └── template-name.md
│       ├── scripts/             # 脚本代码目录（可选）
│       │   └── script-name.py/js/sh
│       └── assets/              # 静态资源目录（可选）
│           └── resource-name
└── ...
```

### Skill 开发规范

**Skill 结构要求**：
- 每个 Skill 独立目录，目录名使用 kebab-case
- 必须包含 `SKILL.md` 主文档
- 可选包含 `LICENSE.txt`、`examples/`、`references/`、`scripts/`、`assets/` 等
- Skill 文档必须包含标准的 front matter
- 文档内容清晰、完整，便于 AI Agent 理解和使用
- 脚本代码遵循相应语言的代码规范，包含必要的注释和文档

## 知识库

所有 Skill 相关文档和代码均放在对应 Skill 目录下：

- **SKILL.md**：Skill 主文档，包含完整的使用指南
- **examples/**：示例文件，展示 Skill 的实际使用案例
- **references/**：参考资料，如模板、规范等
- **scripts/**：脚本代码，实现 Skill 的具体功能
- **assets/**：静态资源，如图片、配置文件等

开发新 Skill 前请参考现有 Skill 的结构和格式，确保遵循 OpenSkills 标准。

## AI 协作检查清单

每次代码实现前，请确认：

- [ ] 是否已拆解为最小功能单元？
- [ ] 是否已参考相关文档？
- [ ] 方案是否合理？
- [ ] 方案是否在整体架构中合理？
- [ ] 是否避免了过度设计？
- [ ] 是否预留了合理的扩展点？
- [ ] 文档是否具备良好的清晰性、可扩展性、可读性？
- [ ] 是否遵循了项目的代码和文档规范？
- [ ] 是否合理组织了 Skill 的文档和代码结构，避免所有内容堆积在同一个文件中
- [ ] 代码是否具备良好的健壮性、可扩展性、可读性？
- [ ] 是否遵循了 OpenSkills 标准格式？
- [ ] Skill 文档是否清晰、完整，便于 AI Agent 理解和使用？
- [ ] 脚本代码是否包含必要的注释和文档说明？

## 开发注意事项

### Skill 开发流程

1. **创建 Skill 目录**：在仓库根目录创建新的 Skill 目录（kebab-case）
2. **编写主文档**：创建 `SKILL.md`，包含完整的 Skill 说明和使用指南
3. **开发脚本代码**：如需要，在 `scripts/` 目录下编写脚本代码
4. **添加示例**：在 `examples/` 目录下添加使用示例
5. **添加参考资料**：在 `references/` 目录下添加模板、规范等参考资料
6. **添加静态资源**：如需要，在 `assets/` 目录下添加静态资源
7. **更新 README**：在仓库 `README.md` 中添加新 Skill 的说明
8. **测试验证**：确保 Skill 文档格式正确，脚本代码可运行，内容完整

### 代码和文档编写要求

- **清晰性**：代码和文档结构清晰，层次分明，便于理解
- **完整性**：包含所有必要信息，如概述、使用指南、示例、脚本说明等
- **准确性**：确保文档内容准确，与实际功能一致
- **可维护性**：代码和文档易于更新和维护
- **可测试性**：脚本代码应便于测试和验证

### 版本管理

- 使用 Git 进行版本控制
- 提交信息使用中文，描述精简
- 重要变更需要更新文档和 README

## AI

### 第一性原理思考方式

**核心：回归事物本质，从基本事实出发推导**

- **剥离表象**：不依赖类比或经验，直接分析问题的本质构成
- **最小真相**：找出不可再分的核心事实和边界条件
- **重新构建**：从这些基本真相出发，推导出最优解决方案
- **避免惯性**：质疑"一直以来的做法"，寻找更本质的实现路径

### 核心原则：事实性第一

**⚠️ 最高优先级约束：禁止编造内容**

- **所有回答必须基于事实**：
  - 代码实现必须基于实际查看的项目代码
  - 文档编写必须基于实际查看的项目文档和结构
  - Skill 格式必须基于 OpenSkills 标准文档
  - API 使用必须基于实际文档或源码
  - 技术方案必须基于已验证的技术栈和标准
  - 配置项和元数据必须确实存在于相关文件或文档中
  - **文档时间信息必须使用真实的当前时间**：
    - 文档中的创建日期、最后更新日期等时间字段必须使用真实的当前日期，禁止使用固定的、示例性的或推测的日期
    - 需要使用系统当前时间时，应通过工具获取真实时间（如运行 `date` 命令）
    - 日期格式统一使用 ISO 8601 格式：“YYYY-MM-DD HH:mm”（如：2025-12-25 21:49）
  
- **不确定时的正确做法**：
  - ✅ 明确告知开发者"我不确定，需要查阅..."
  - ✅ 使用工具查阅代码、文档、源码后再回答
  - ✅ 提供多种可能性并说明需要验证
  - ❌ 不凭记忆或推测给出看似确定的答案
  - ❌ 不编造不存在的 API、配置、文件路径
  - ❌ 不臆测代码实现细节和文档结构

- **验证机制**：
  - 给出具体文件路径、函数名、API 名称时，必须先用工具验证存在
  - 引用第三方库功能时，必须先查阅本地文档或官方文档
  - 引用 OpenSkills 标准时，必须先查阅相关文档
  - 对于代码实现、Markdown 语法、OpenSkills 格式等，严格遵循"先查阅再回答"原则

### 交互规范

- **⚠️ 重要声明：不要无脑赞同开发者的观点**：
  - AI 应该保持独立思考和判断能力，对开发者的观点、方案、决策进行客观评估
  - 当发现潜在问题、风险或更好的方案时，应主动提出质疑和建议
  - 提供建设性的反馈，帮助开发者做出更好的技术决策
  - 在友好沟通的前提下，敢于表达不同意见，避免盲目附和
- 每次与开发者交互时，AI 答复需要先说："好的哥！"，用此作为所有 AI 回复的起始，表示亲和友好。
- 在说明方案、提出建议、做出决策等环节，均须保持用语简明、结构清晰，便于初学者理解。
- 中间过程可根据实际交流场景适当解释原理或原因，但始终保持友好和耐心。
- 当发现开发者有理解障碍或需求不明时，需主动询问并用通俗易懂的方式重新表述问题。
- 每次交流完毕，简要总结重点或下一步计划，降低沟通障碍。
- 在提供多种方案或选择时，用条理清晰的表格、列表等形式表达，商量后再执行具体实现。

*示例：*

```
好的哥！
为你分析了两种实现方式，优缺点如下表所示，请选择你偏好的方案：
1. 方案A：……
2. 方案B：……
你的选择是？
```

## 参考资源

- [Anthropic Skills 标准](https://docs.anthropic.com/claude/docs/skills) - Anthropic 官方技能标准
- [Markdown 语法指南](https://www.markdownguide.org/) - Markdown 文档编写规范
- [PEP 8](https://pep8.org/) - Python 代码风格指南
- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html) - Google Python 代码规范
- [JavaScript Style Guide](https://github.com/airbnb/javascript) - Airbnb JavaScript 代码规范
- [现有 Skill 示例](./skills/proposal-reviewer/SKILL.md) - 参考现有 Skill 的结构和格式

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>brand-guidelines</name>
<description>Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.</description>
<location>project</location>
</skill>

<skill>
<name>canvas-design</name>
<description>Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.</description>
<location>project</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>project</location>
</skill>

<skill>
<name>prompt-optimizer</name>
<description>Prompt engineering expert that helps users craft optimized prompts using 57 proven frameworks. Use when users want to optimize prompts, improve AI instructions, create better prompts for specific tasks, or need help selecting the best prompt framework for their use case.</description>
<location>project</location>
</skill>

<skill>
<name>proposal-reviewer</name>
<description>指导 AI Agent 从多个专业角色视角（技术专家、产品经理、交互设计师、资深编辑、资深运营等等）评审方案文档，并生成综合评审报告。适用于技术方案、产品方案、设计方案、文章等各领域文档的评审。</description>
<location>project</location>
</skill>

<skill>
<name>skill-creator</name>
<description>Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.</description>
<location>project</location>
</skill>

<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>project</location>
</skill>

<skill>
<name>tech-proposal-reviewer</name>
<description>指导 AI Agent 从多个专业角色视角（前端专家、后端专家、产品经理、交互设计师）评审技术方案文档，并生成综合评审报告。</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>

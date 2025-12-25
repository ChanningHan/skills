# Skill 测试指南

## 前置准备

### 安装依赖（如果需要使用验证脚本）

验证脚本需要 PyYAML 模块。根据系统环境选择安装方式：

**方式 1：用户级安装（推荐）**
```bash
python3 -m pip install --user pyyaml
```

**方式 2：如果遇到 externally-managed-environment 错误**
```bash
python3 -m pip install --break-system-packages pyyaml
```

**方式 3：使用虚拟环境（最安全）**
```bash
python3 -m venv venv
source venv/bin/activate
pip install pyyaml
```

**注意**：如果无法安装依赖，可以直接跳过验证脚本，使用实际对话测试（方法二）。

## 测试方法

### 方法一：基础验证测试

1. **快速验证 skill 结构**：
   ```bash
   python3 .claude/skills/skill-creator/scripts/quick_validate.py skills/proposal-reviewer
   ```
   这会检查 SKILL.md 的 frontmatter、命名规范等基础要求。

2. **打包验证**（包含完整验证）：
   ```bash
   python3 .claude/skills/skill-creator/scripts/package_skill.py skills/proposal-reviewer
   ```
   这会进行完整验证并生成 .skill 文件。

3. **使用 openskills read 测试**：
   ```bash
   openskills install ChanningHan/skills
   openskills read proposal-reviewer
   ```
   验证 skill 内容是否正确加载，检查文件引用路径是否正确。

### 方法二：在实际对话中测试

1. **准备测试文档**：
   - 使用 `examples/test-frontend-proposal.md` 作为测试方案
   - 或创建自己的技术方案文档

2. **触发 skill**：
   在 Claude 对话中使用以下提示触发 skill：
   ```
   请使用 proposal-reviewer skill 评审这个技术方案：examples/test-frontend-proposal.md
   ```
   或：
   ```
   评审一下这个前端技术方案文档
   ```

3. **观察 skill 行为**：
   - 检查 Claude 是否自动加载了 proposal-reviewer skill
   - 观察 Claude 是否按照 skill 中的流程执行评审
   - 验证生成的评审报告是否符合格式要求

4. **验证评审质量**：
   - 检查是否包含了所有角色的评审意见
   - 验证评分是否合理
   - 确认评审报告结构是否完整

## 测试检查清单

- [ ] Skill 能够正确触发（description 匹配）
- [ ] 能够正确读取方案文档
- [ ] 能够正确选择评审角色（前端专家、后端专家、交互设计师）
- [ ] 能够正确匹配评审模板（前端方案模板）
- [ ] 各角色评审意见格式正确
- [ ] 评分标准符合要求（1-5分）
- [ ] 评审报告结构完整（概述、角色评审、汇总、行动项、结论）
- [ ] 文件引用路径正确（references/、assets/ 等）

## 测试文档位置

测试用的技术方案文档应放在：
- `skills/proposal-reviewer/examples/test-*.md` - 用于 skill 测试的示例文档

## 注意事项

- 测试文档应该包含完整的技术方案结构（背景、技术方案、实施计划、风险评估等）
- 测试时可以尝试不同类型的方案（前端、后端、架构等）验证模板匹配是否正确
- 如果 skill 未触发，检查 description 是否包含相关关键词

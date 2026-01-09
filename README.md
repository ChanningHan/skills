# skills

这是⚡️Channing的Anthropic标准Skills集合仓库。

## 技能列表

| Skill 名称 | 描述 |
|-----------|------|
| proposal-reviewer | 技术方案评审 Skill，指导 AI Agent 从多个专业角色视角（前端专家、后端专家、产品经理、交互设计师）评审技术方案文档，并生成综合评审报告 |
| page-skill-creator | 创建和开发 PageSkill 的完整指南，包含初始化脚本、目录规范、编写指南。当用户需要接入 PageSkill SDK、创建新的 PageSkill、编写 description/tools/references 时使用 |

## 安装和使用

使用 OpenSkills 工具安装本仓库的技能：

```bash
# 全局安装
openskills install ChanningHan/skills --global

# 项目级安装
openskills install ChanningHan/skills
```

安装后，运行以下命令将技能同步到项目的 `AGENTS.md` 文件：

```bash
openskills sync
```

更多信息请访问：[https://github.com/ChanningHan/skills](https://github.com/ChanningHan/skills)

## 贡献指南

欢迎提交新的 Skill 或改进现有 Skill！

## 许可证

各 Skill 的许可证请查看对应目录下的 LICENSE 文件。

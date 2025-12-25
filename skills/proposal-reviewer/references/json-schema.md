# 评审数据 JSON 结构定义

本文档定义了评审数据的 JSON 结构，用于支持评审结果的可视化展示和报告生成。

## 目录

- [数据结构概述](#数据结构概述)
- [JSON Schema](#json-schema)
- [数据示例](#数据示例)
- [使用说明](#使用说明)
- [扩展说明](#扩展说明)

## 数据结构概述

评审数据采用分层结构，包含方案基本信息、各角色评审意见、评审汇总和行动项等信息。

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["metadata", "reviews", "summary"],
  "properties": {
    "metadata": {
      "type": "object",
      "required": ["proposalName", "proposalVersion", "reviewDate", "reviewers"],
      "properties": {
        "proposalName": {
          "type": "string",
          "description": "方案名称"
        },
        "proposalVersion": {
          "type": "string",
          "description": "方案版本号"
        },
        "proposalPath": {
          "type": "string",
          "description": "方案文档路径"
        },
        "createdDate": {
          "type": "string",
          "format": "date",
          "description": "方案创建日期"
        },
        "reviewDate": {
          "type": "string",
          "format": "date",
          "description": "评审日期"
        },
        "reviewers": {
          "type": "array",
          "description": "评审人员列表",
          "items": {
            "type": "object",
            "required": ["role", "name"],
            "properties": {
              "role": {
                "type": "string",
                "enum": ["前端专家", "后端专家", "产品经理", "交互设计师"],
                "description": "评审角色"
              },
              "name": {
                "type": "string",
                "description": "评审人员姓名（可选）"
              }
            }
          }
        },
        "reviewScope": {
          "type": "string",
          "description": "评审范围说明"
        }
      }
    },
    "reviews": {
      "type": "array",
      "description": "各角色评审意见列表",
      "items": {
        "type": "object",
        "required": ["role", "dimensions", "overall"],
        "properties": {
          "role": {
            "type": "string",
            "enum": ["前端专家", "后端专家", "产品经理", "交互设计师"],
            "description": "评审角色"
          },
          "dimensions": {
            "type": "array",
            "description": "各评审维度的评价",
            "items": {
              "type": "object",
              "required": ["name", "score", "evaluation"],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "维度名称"
                },
                "score": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 5,
                  "description": "维度评分（1-5 分）"
                },
                "evaluation": {
                  "type": "string",
                  "description": "具体评价"
                },
                "strengths": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "优势列表"
                },
                "issues": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "问题列表"
                },
                "suggestions": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "建议列表"
                }
              }
            }
          },
          "overall": {
            "type": "object",
            "required": ["score"],
            "properties": {
              "score": {
                "type": "number",
                "minimum": 1,
                "maximum": 5,
                "description": "综合评分（1-5 分）"
              },
              "strengths": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "整体优势列表"
              },
              "concerns": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "整体担忧列表"
              },
              "suggestions": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "整体建议列表"
              }
            }
          }
        }
      }
    },
    "summary": {
      "type": "object",
      "required": ["overallScore", "recommendation", "keyStrengths", "mainConcerns", "improvements"],
      "properties": {
        "overallScore": {
          "type": "number",
          "minimum": 1,
          "maximum": 5,
          "description": "整体评分（平均分）"
        },
        "recommendation": {
          "type": "string",
          "enum": ["通过", "有条件通过", "不通过"],
          "description": "评审结论"
        },
        "keyStrengths": {
          "type": "array",
          "description": "关键优势列表",
          "items": {
            "type": "object",
            "required": ["content", "priority"],
            "properties": {
              "content": {
                "type": "string",
                "description": "优势内容"
              },
              "priority": {
                "type": "string",
                "enum": ["高", "中", "低"],
                "description": "优先级"
              },
              "mentionedBy": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "提及此优势的角色列表"
              }
            }
          }
        },
        "mainConcerns": {
          "type": "array",
          "description": "主要担忧列表",
          "items": {
            "type": "object",
            "required": ["content", "severity"],
            "properties": {
              "content": {
                "type": "string",
                "description": "担忧内容"
              },
              "severity": {
                "type": "string",
                "enum": ["高", "中", "低"],
                "description": "严重程度"
              },
              "mentionedBy": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "提及此担忧的角色列表"
              },
              "impact": {
                "type": "string",
                "description": "影响范围"
              }
            }
          }
        },
        "improvements": {
          "type": "array",
          "description": "改进建议列表",
          "items": {
            "type": "object",
            "required": ["content", "category"],
            "properties": {
              "content": {
                "type": "string",
                "description": "建议内容"
              },
              "category": {
                "type": "string",
                "enum": ["架构设计", "技术选型", "实施计划", "代码质量", "用户体验", "业务价值", "其他"],
                "description": "建议类别"
              },
              "mentionedBy": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "提及此建议的角色列表"
              }
            }
          }
        }
      }
    },
    "actionItems": {
      "type": "array",
      "description": "行动项列表",
      "items": {
        "type": "object",
        "required": ["content", "priority", "category"],
        "properties": {
          "content": {
            "type": "string",
            "description": "行动项内容"
          },
          "priority": {
            "type": "string",
            "enum": ["P0", "P1", "P2"],
            "description": "优先级（P0：必须解决，P1：建议解决，P2：后续优化）"
          },
          "category": {
            "type": "string",
            "description": "行动项类别"
          },
          "assignee": {
            "type": "string",
            "description": "建议责任人"
          },
          "dueDate": {
            "type": "string",
            "format": "date",
            "description": "预期完成时间"
          }
        }
      }
    },
    "conclusion": {
      "type": "object",
      "properties": {
        "overallEvaluation": {
          "type": "string",
          "description": "方案整体评价"
        },
        "prerequisites": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "关键前置条件"
        },
        "nextSteps": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "后续建议"
        }
      }
    }
  }
}
```

## 数据示例

```json
{
  "metadata": {
    "proposalName": "用户管理系统重构方案",
    "proposalVersion": "v1.0",
    "proposalPath": "/path/to/proposal.md",
    "createdDate": "2025-01-15",
    "reviewDate": "2025-01-20",
    "reviewers": [
      {
        "role": "前端专家",
        "name": "张三"
      },
      {
        "role": "后端专家",
        "name": "李四"
      },
      {
        "role": "产品经理",
        "name": "王五"
      },
      {
        "role": "交互设计师",
        "name": "赵六"
      }
    ],
    "reviewScope": "评审用户管理系统的重构方案，包括前端架构、后端接口设计、数据模型和用户体验设计"
  },
  "reviews": [
    {
      "role": "前端专家",
      "dimensions": [
        {
          "name": "架构合理性",
          "score": 4,
          "evaluation": "整体架构设计合理，组件划分清晰",
          "strengths": [
            "组件划分合理，职责清晰",
            "状态管理方案恰当"
          ],
          "issues": [
            "部分模块耦合度较高"
          ],
          "suggestions": [
            "建议进一步解耦相关模块"
          ]
        }
      ],
      "overall": {
        "score": 4.2,
        "strengths": [
          "架构设计合理",
          "技术选型恰当"
        ],
        "concerns": [
          "部分模块需要优化"
        ],
        "suggestions": [
          "建议优化模块耦合度"
        ]
      }
    }
  ],
  "summary": {
    "overallScore": 4.1,
    "recommendation": "有条件通过",
    "keyStrengths": [
      {
        "content": "架构设计合理",
        "priority": "高",
        "mentionedBy": ["前端专家", "后端专家"]
      }
    ],
    "mainConcerns": [
      {
        "content": "部分模块耦合度较高",
        "severity": "中",
        "mentionedBy": ["前端专家"],
        "impact": "可能影响后续维护"
      }
    ],
    "improvements": [
      {
        "content": "建议优化模块耦合度",
        "category": "架构设计",
        "mentionedBy": ["前端专家"]
      }
    ]
  },
  "actionItems": [
    {
      "content": "优化模块耦合度",
      "priority": "P1",
      "category": "架构设计",
      "assignee": "前端团队",
      "dueDate": "2025-02-01"
    }
  ],
  "conclusion": {
    "overallEvaluation": "方案整体设计合理，建议在实施前优化部分模块",
    "prerequisites": [
      "完成模块解耦优化"
    ],
    "nextSteps": [
      "根据评审意见优化方案",
      "制定详细的实施计划"
    ]
  }
}
```

## 使用说明

1. **数据结构完整性**：确保 JSON 数据包含所有必需字段
2. **评分范围**：所有评分应在 1-5 分之间
3. **角色枚举**：角色名称必须使用预定义的枚举值
4. **日期格式**：日期字段使用 ISO 8601 格式（YYYY-MM-DD）
5. **数组顺序**：数组中的元素顺序应反映重要性或优先级

## 扩展说明

如需扩展数据结构，建议：

1. 在现有结构基础上添加可选字段
2. 保持向后兼容性
3. 更新本文档说明新增字段的用途和格式
4. 更新可视化模板以支持新字段

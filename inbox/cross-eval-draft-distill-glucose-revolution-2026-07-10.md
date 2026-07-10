---
type: snapshot
source: hermes/cross-eval
content_type: distill
chapter_id: 
draft_path: claude-drafts/draft-distill-glucose-revolution.md
source_refs:
  - claude-drafts/draft-distill-glucose-revolution-source-excerpts.md
discarded:
created: 2026-07-10
tags: [system-eval]
---

# cross-eval — draft-distill-glucose-revolution.md

## 总裁决: 红旗阻断

- 判定原因:成功评审的非 Claude 家系只有 0 个: none
- 生成耗时:0.7s

## 配置 gate

- static_gate_configured:True
- non_claude_families:deepseek, openai
- clipped_inputs:none
- gate_note: Claude 精确位不计入跨家系下限;GPT/OpenAI + DeepSeek 两家非 Claude 都成功才满足 gate。
- models:
  - 精确 | claude | anthropic | claude-opus-4-6
  - 遗漏 | openai | openai | gpt-5.4-mini
  - 太泛 | deepseek | deepseek | deepseek-v4-flash

## 红旗清单

- 见各模型分节的 `## 红旗`。
- 若本节为空但总裁决为红旗阻断,原因通常是配置 gate 未满足或模型调用失败。

## 待人定项

- 见各模型分节的 `## 待人定项`。镜射列最终真实性由 Haopeng 判断。

---

## 模型: 遗漏 / openai / openai / gpt-5.4-mini

调用失败:

```text
URLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)'))
```

---

## 模型: 精确 / claude / anthropic / claude-opus-4-6

调用失败:

```text
URLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)'))
```

---

## 模型: 太泛 / deepseek / deepseek / deepseek-v4-flash

调用失败:

```text
URLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)'))
```

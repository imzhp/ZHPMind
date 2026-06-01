---
title: "sheep archive subpage capture report"
type: project-report
created: 2026-05-29
status: raw-subpages-captured
---

# sheep archive subpage capture report

## Scope

This pass continued the raw-only migration. It did not modify `wiki/pages/`, `people-moc.md`, `index.md`, `wiki/log.md`, or any existing distilled wiki page.

## Output

Raw subpage files were captured under:

- `wiki/raw/assets/archives/sheep-archive-public/subpages/`

Manifests were captured under:

- `wiki/raw/assets/archives/sheep-archive-public/subpage-capture-manifest.md`
- `wiki/raw/assets/archives/sheep-archive-public/subpage-capture-manifest.json`

## Summary

- Unique Notion subpage URLs found from the public index: 40
- Raw subpage files captured: 40
- Capture errors: 0
- Needs manual review: 13

## Needs Review

These pages produced very short captures. Treat them as raw evidence but verify before distillation.

| id | title | people | chars | paragraphs | file |
|---|---|---|---:|---:|---|
| 3 | 一则 Steve Jobs 的趣事 | 史蒂夫 · 乔布斯 | 546 | 2 | `wiki/raw/assets/archives/sheep-archive-public/subpages/03-一则-steve-jobs-的趣事.md` |
| 9 | Normal Considered Harmful | Alan Kay | 584 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/09-normal-considered-harmful.md` |
| 16 | Dieter Rams - 少，但是更好 | Dieter Rams | 552 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/16-dieter-rams-少-但是更好.md` |
| 18 | 教你去看见这个世界 | Inge Druckrey | 510 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/18-教你去看见这个世界.md` |
| 25 | Luis von Ahn 与 Duolingo | Luis von Ahn | 580 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/25-luis-von-ahn-与-duolingo.md` |
| 26 | 我们为什么喜欢图像？ | Ralph Ammer | 508 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/26-我们为什么喜欢图像.md` |
| 28 | 来自康德什么是美？ | Ralph Ammer | 506 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/28-来自康德什么是美.md` |
| 29 | 如何激发创造？ | Ralph Ammer | 502 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/29-如何激发创造.md` |
| 30 | 康德我 们能知道什么？ | Ralph Ammer | 510 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/30-康德我-们能知道什么.md` |
| 31 | 一次观察美的经历 | Ralph Ammer | 504 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/31-一次观察美的经历.md` |
| 36 | Tyler Hogge | Tyler Hogge | 534 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/36-tyler-hogge.md` |
| 37 | 探索个人原则的意义 | Visakan Veerasamy | 518 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/37-探索个人原则的意义.md` |
| 38 | 鼓励怪人，打击混蛋 | Visakan Veerasamy | 518 | 1 | `wiki/raw/assets/archives/sheep-archive-public/subpages/38-鼓励怪人-打击混蛋.md` |

## Next Safe Step

If continuing under raw-only rules, manually revisit the "Needs Review" URLs in the browser and confirm whether the public page is genuinely empty/short or whether the extractor missed lazy-loaded content. Do not distill these into `wiki/pages/` without explicit approval.

---
title: "sheep archive people-page capture report"
type: project-report
created: 2026-05-29
status: raw-people-pages-captured
---

# sheep archive people-page capture report

## Scope

This pass captured the database row detail pages, the page type represented by URLs with `&p=<row-id>&pm=s`. It remained raw-only and did not modify `wiki/pages/`, `people-moc.md`, `index.md`, `wiki/log.md`, or existing distilled pages.

## Output

- Raw people pages: `wiki/raw/sheep-archive-public/people-pages/`
- Raw manifest: `wiki/raw/sheep-archive-public/people-page-capture-manifest.md`
- Raw JSON manifest: `wiki/raw/sheep-archive-public/people-page-capture-manifest.json`

## Summary

- Database rows discovered: 74
- People-page raw files captured: 74
- Capture errors: 0
- Needs manual review: 4

## Important Correction

The earlier subpage pass captured links from the `meta` column, but not the database row detail pages themselves. This pass fills that missing layer. For example, the Steve Jobs row page `p=70715bc069ce45bdb2c28da166210bd0&pm=s` is now captured as `wiki/raw/sheep-archive-public/people-pages/06-史蒂夫-乔布斯.md`.

## Needs Review

| seq | name | chars | paragraphs | file |
|---|---|---:|---:|---|
| 23 | Cal Henderson | 1309 | 9 | `wiki/raw/sheep-archive-public/people-pages/23-cal-henderson.md` |
| 34 | Edwards Deming | 1196 | 12 | `wiki/raw/sheep-archive-public/people-pages/34-edwards-deming.md` |
| 43 | Jeff Atwood | 1332 | 9 | `wiki/raw/sheep-archive-public/people-pages/43-jeff-atwood.md` |
| 52 | Linus Lee | 1489 | 13 | `wiki/raw/sheep-archive-public/people-pages/52-linus-lee.md` |

## Next Safe Step

If continuing under raw-only rules, manually review the short captures first. Do not distill people pages into `wiki/pages/` without explicit approval.

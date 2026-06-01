---
title: "sheep archive migration plan"
type: project-plan
created: 2026-05-29
source: "https://pmthinking.notion.site/235de36086c6446ebf19d17fcbde8d78?v=2772f8e86e158019a4c7000ca06caf47"
status: raw-captured
---

# sheep archive migration plan

## Scope Lock

User-approved scope for this pass:

- Allowed: create raw source files under `wiki/raw/assets/archives/sheep-archive-public/`.
- Allowed: create migration planning files under `projects/sheep-archive-migration/`.
- Not allowed in this pass: modify `wiki/pages/`, `people-moc.md`, `index.md`, `wiki/log.md`, or any existing ZHPMind page.

## Source

- Public Notion page: https://pmthinking.notion.site/235de36086c6446ebf19d17fcbde8d78?v=2772f8e86e158019a4c7000ca06caf47
- Capture date: 2026-05-29
- Export permission: unavailable, so this migration uses public-page extraction only.

## Raw Files Created

- `wiki/raw/assets/archives/sheep-archive-public/README.md`
- `wiki/raw/assets/archives/sheep-archive-public/sheep-archive-public-index.md`
- `wiki/raw/assets/archives/sheep-archive-public/sheep-archive-public-index.json`

## Captured Content

- Captured 74 public database rows.
- Visible fields captured: `item`, `bio`, `meta`, `tags`, `twitter`, `site`, `birthday`, `cover`.
- Meta links to public Notion subpages were preserved as links, not distilled.

## Known Limitations

- No hidden Notion properties.
- No comments, page history, or owner-only attachments.
- No guaranteed complete image/cover migration.
- Subpage contents are not yet captured as standalone raw files; only their public links are inventoried in the index.

## Recommended Later Batches

### Batch 1: Computing / Design / Human Augmentation

- Alan Kay
- Bret Victor
- Doug Engelbart
- Dieter Rams
- Ralph Ammer
- Ivan Zhao
- Josh Miller
- 史蒂夫 · 乔布斯

Reason: closest to existing ZHPMind people and AI/design knowledge graph.

### Batch 2: Enterprise / Product / Founder Thinking

- 段永平
- 张一鸣
- 黄峥
- Patrick Collison
- Brian Chesky
- 凯文凯利（KK）

Reason: useful bridge to entrepreneurship, product judgment, and Wildlume/ERP/product work.

### Batch 3: Arts / Philosophy / Personal Orientation

- Edward Hopper
- René Girard
- Visakan Veerasamy
- Inge Druckrey
- Christopher Alexander
- Jonathan Blow

Reason: preserve the original archive's emotional and orientation layer, but distill more carefully so it does not become generic biography.

## Target Template For Later Distillation

Do not apply this template in the current raw-only pass. Use it only after explicit approval to write into `wiki/pages/`.

```md
---
title: "Person Name"
type: person
tags: []
sources: ["assets/archives/sheep-archive-public/sheep-archive-public-index.md"]
source_count: 1
---

# Person Name

## Compiled Truth

## Core Ideas

## Why It Matters To Me

## Related Pages

## References
```

## Next Safe Step

If approved later, capture public subpages for Batch 1 into `wiki/raw/assets/archives/sheep-archive-public/subpages/` first. Only after those raw subpages exist should any selected people be distilled into `wiki/pages/`.

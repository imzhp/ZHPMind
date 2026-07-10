# ZHPMind Vault — Codex Root Instructions

This is Zhang Haopeng's ZHPMind knowledge vault. The working directory is the vault root.

## Authority

Before changing anything under `wiki/`, read and follow:

@wiki/CLAUDE.md

`wiki/CLAUDE.md` remains the detailed wiki operator manual for historical compatibility. In current use, "Claudian" in that manual means the Obsidian-side vault curator role, now normally backed by the **Codex provider** rather than the Claude provider.

## Current Runtime Policy

- Use Codex as the primary execution/runtime surface.
- Do not rely on the Claude provider; the Claude account is no longer an available dependency.
- Vault-level Codex skills live in `.codex/skills/{name}/SKILL.md`.
- Legacy `.claude/skills/` may remain for history/compatibility, but new active skill work should target `.codex/skills/`.
- Do not sync `~/.codex`, `~/.codex/threads`, or `~/.codex/auth.json`. Use Codex Remote Connections for thread continuity.

## Hard Rules

1. All distilled/wiki knowledge products go to flat `wiki/pages/`; do not create topic subdirectories.
2. File names use lowercase English kebab-case slugs; tags use lowercase English kebab-case.
3. Wiki body language is Simplified Chinese.
4. For distill work, follow the full workflow in `wiki/CLAUDE.md`: frontmatter, `wiki/pages/index.md`, `wiki/log.md`, and propagation.
5. Large sources must be extracted/split by tools or subagents. The main agent writes final pages.
6. Book/document sources go to `wiki/raw/assets/books/` with `书名-作者.{epub,pdf,docx,md}` naming. Page `sources:` values use `assets/books/...` relative paths.
7. Daily ZHPMind git commits/pushes are handled by the Mac mini auto-commit watcher. Agents do not manually commit/push unless the user explicitly asks and the handoff requires it.

## Active Lane Split

| Role | Current use |
|---|---|
| Codex | Primary executor for scripts, git-aware file work, batch edits, skill migration, dogfood, and finalized implementation |
| Claudian UI with Codex provider | Obsidian-side knowledge work: distill, mirror, propagation, reflect, concept-fable |
| Hermes | Gateway/cron automation, review-digest, vault-tidy, policy/signal monitoring; writes mainly to `inbox/` |
| Claude / Claude provider | Deprecated/unavailable for active workflows; references remain only where historically or semantically accurate |

## Handoff Files

`claude-drafts/` is retained as the historical handoff channel name. It now means "AI handoff drafts", not an active dependency on Claude.

- Task specs: `claude-drafts/handoff-{task}.md`
- Results/review requests: `claude-drafts/result-{task}.md`


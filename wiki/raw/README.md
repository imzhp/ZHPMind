# Raw Sources Directory

Drop source files here. These files are **immutable** — Claudian reads them but never modifies, moves, or deletes them.

## What belongs here

- Clipped articles (`.md`, `.html`, `.txt`)
- Papers and documents (`.pdf`)
- Notes and transcripts (`.md`, `.txt`)
- Any reference material you want Claudian to process into the wiki

## What belongs in `assets/`

- Images downloaded from clipped articles
- Diagrams, screenshots, figures referenced in source documents

After adding images here, Claudian will embed them in wiki pages using Obsidian's syntax:
`![[assets/image-name.png]]`

**Tip:** In Obsidian Settings → Files and links, set the attachment folder to `wiki/raw/assets/`. Then bind "Download attachments for current file" to a hotkey (e.g. `Ctrl+Shift+D`) — after clipping an article, one keypress downloads all images to this folder.

## How to trigger an ingest

Once you have dropped a file here, tell Claudian:

> ingest [filename]

or more specifically:

> ingest article.md into wiki

Claudian will read the source, discuss key takeaways with you (optional), produce wiki pages, update the index, and log the operation.

## File naming

Use descriptive, readable names. Spaces are fine. Examples:
- `Attention Is All You Need.pdf`
- `openai-gpt4-announcement.md`
- `notes-on-scaling.txt`

Claudian derives wiki page names from the content, not the filename.

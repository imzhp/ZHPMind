#!/usr/bin/env python3
"""ZHPMind vault health scanner — outputs JSON for review-digest skill."""

import os
import re
import json
from datetime import datetime, timedelta

VAULT = os.path.expanduser("~/Obsidian/ZHPMind")
WIKI_PAGES = os.path.join(VAULT, "wiki/pages")
INBOX = os.path.join(VAULT, "inbox")
PROJECTS = os.path.join(VAULT, "projects")
RAW = os.path.join(VAULT, "wiki/raw")

NOW = datetime.now()
SEVEN_DAYS_AGO = NOW - timedelta(days=7)
THIRTY_DAYS_AGO = NOW - timedelta(days=30)
NINETY_DAYS_AGO = NOW - timedelta(days=90)
TODAY_STR = NOW.strftime("%Y-%m-%d")

FM_RE = re.compile(r'^---\s*\n(.*?)\n---', re.DOTALL)
LINK_RE = re.compile(r'\[\[([^\]|#]+)(?:[|#][^\]]*)?]]')


def parse_tags_from_fm(fm_text):
    tags = []
    lines = fm_text.split('\n')
    in_tags = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('tags:'):
            rest = stripped[5:].strip()
            if rest.startswith('['):
                rest = rest.strip('[]')
                tags = [t.strip().strip('"\'') for t in rest.split(',') if t.strip()]
                in_tags = False
            elif rest:
                tags = [rest.strip().strip('"\'')]
                in_tags = False
            else:
                in_tags = True
        elif in_tags:
            if stripped.startswith('- '):
                tags.append(stripped[2:].strip().strip('"\''))
            elif stripped and not stripped.startswith('#'):
                in_tags = False
    return tags


def safe_birthtime(path):
    try:
        return datetime.fromtimestamp(os.stat(path).st_birthtime)
    except Exception:
        return datetime.fromtimestamp(os.path.getmtime(path))


def safe_mtime(path):
    return datetime.fromtimestamp(os.path.getmtime(path))


# ── 1. Inbox 积压 ────────────────────────────────────────────────────────────
inbox_files = []
if os.path.isdir(INBOX):
    for f in os.listdir(INBOX):
        fpath = os.path.join(INBOX, f)
        if f.endswith('.md') and os.path.isfile(fpath):
            inbox_files.append({
                "name": f,
                "mtime": safe_mtime(fpath).isoformat(),
                "birthtime": safe_birthtime(fpath).isoformat(),
            })

inbox_files.sort(key=lambda x: x["birthtime"])

# Split: user captures vs system snapshots (review-digest files)
system_prefixes = ("review-digest-",)
user_captures = [f for f in inbox_files if not any(f["name"].startswith(p) for p in system_prefixes)]
snapshot_files = [f for f in inbox_files if any(f["name"].startswith(p) for p in system_prefixes)]

inbox_count = len(user_captures)
if inbox_count > 50:
    inbox_status = "red"
elif inbox_count >= 20:
    inbox_status = "yellow"
else:
    inbox_status = "green"

# ── 2. Wiki 孤岛率 ───────────────────────────────────────────────────────────
wiki_names = {}
if os.path.isdir(WIKI_PAGES):
    for f in os.listdir(WIKI_PAGES):
        if f.endswith('.md'):
            fpath = os.path.join(WIKI_PAGES, f)
            wiki_names[f[:-3]] = fpath

backlinks = {name: [] for name in wiki_names}

for root, dirs, files in os.walk(VAULT):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in files:
        if not fname.endswith('.md'):
            continue
        fpath = os.path.join(root, fname)
        try:
            content = open(fpath, encoding='utf-8').read()
        except Exception:
            continue
        for link_target in LINK_RE.findall(content):
            link_target = link_target.strip()
            if link_target in backlinks:
                own_path = os.path.join(WIKI_PAGES, link_target + '.md')
                if fpath != own_path:
                    backlinks[link_target].append(fpath)

total_wiki = len(wiki_names)
orphans = [name for name, refs in backlinks.items() if not refs]
orphan_count = len(orphans)
orphan_rate = round(orphan_count / total_wiki * 100, 1) if total_wiki > 0 else 0.0

# Flag orphans that were created today (new page, expected)
new_today_orphans = []
real_orphans = []
for name in orphans:
    fpath = wiki_names[name]
    bt = safe_birthtime(fpath)
    if (NOW - bt).total_seconds() < 86400:
        new_today_orphans.append(name)
    else:
        real_orphans.append(name)

if orphan_rate > 30:
    orphan_status = "red"
elif orphan_rate >= 15:
    orphan_status = "yellow"
else:
    orphan_status = "green"

# ── 3. Projects 僵尸率 ───────────────────────────────────────────────────────
projects = []
if os.path.isdir(PROJECTS):
    for entry in os.listdir(PROJECTS):
        proj_path = os.path.join(PROJECTS, entry)
        if not os.path.isdir(proj_path) or entry.startswith('.'):
            continue
        # Find most recently modified .md file
        latest_mtime = None
        latest_file = None
        for root, dirs, files in os.walk(proj_path):
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            for f in files:
                if f.endswith('.md'):
                    fp = os.path.join(root, f)
                    mt = safe_mtime(fp)
                    if latest_mtime is None or mt > latest_mtime:
                        latest_mtime = mt
                        latest_file = fp
        if latest_mtime is None:
            # no .md files, use dir mtime
            latest_mtime = safe_mtime(proj_path)
        is_zombie = latest_mtime < NINETY_DAYS_AGO
        projects.append({
            "name": entry,
            "last_modified": latest_mtime.strftime("%Y-%m-%d"),
            "is_zombie": is_zombie,
        })

total_projects = len(projects)
zombies = [p for p in projects if p["is_zombie"]]
zombie_count = len(zombies)
zombie_rate = round(zombie_count / total_projects * 100, 1) if total_projects > 0 else 0.0

if zombie_rate > 50:
    zombie_status = "red"
elif zombie_rate >= 30:
    zombie_status = "yellow"
else:
    zombie_status = "green"

# ── 4. 本周 Wiki 活动 ────────────────────────────────────────────────────────
new_this_week = []
modified_this_week = []

for name, fpath in wiki_names.items():
    bt = safe_birthtime(fpath)
    mt = safe_mtime(fpath)
    if bt >= SEVEN_DAYS_AGO:
        new_this_week.append({"name": name, "created": bt.strftime("%Y-%m-%d")})
    elif mt >= SEVEN_DAYS_AGO:
        modified_this_week.append({"name": name, "modified": mt.strftime("%Y-%m-%d")})

new_this_week.sort(key=lambda x: x["created"], reverse=True)
modified_this_week.sort(key=lambda x: x["modified"], reverse=True)

# ── 5. 本周 Capture ──────────────────────────────────────────────────────────
weekly_captures = []
for f in user_captures:
    bt = datetime.fromisoformat(f["birthtime"])
    if bt >= SEVEN_DAYS_AGO:
        weekly_captures.append(f["name"])

# ── 6. MOC 候选检测 ──────────────────────────────────────────────────────────
tag_counts = {}
for name, fpath in wiki_names.items():
    try:
        content = open(fpath, encoding='utf-8').read()
    except Exception:
        continue
    fm_match = FM_RE.match(content)
    if not fm_match:
        continue
    tags = parse_tags_from_fm(fm_match.group(1))
    for tag in tags:
        tag_counts[tag] = tag_counts.get(tag, 0) + 1

# Find existing MOC files in wiki
existing_mocs = set()
for name in wiki_names:
    if name.lower().endswith('-moc') or name.lower().startswith('moc-'):
        existing_mocs.add(name)

moc_candidates = []
for tag, count in tag_counts.items():
    if count >= 5:
        # Check if a MOC for this tag exists
        moc_names = [f"MOC-{tag}", f"{tag}-moc", f"moc-{tag}", f"{tag}-MOC"]
        has_moc = any(m in wiki_names for m in moc_names)
        if not has_moc:
            moc_candidates.append({"tag": tag, "count": count})

moc_candidates.sort(key=lambda x: x["count"], reverse=True)

# Existing MOCs with link counts
existing_moc_info = []
for moc_name in sorted(existing_mocs):
    moc_fpath = wiki_names.get(moc_name)
    if not moc_fpath:
        continue
    try:
        content = open(moc_fpath, encoding='utf-8').read()
    except Exception:
        continue
    linked = LINK_RE.findall(content)
    existing_moc_info.append({"name": moc_name, "link_count": len(linked)})

# ── 7. 修正频率 (30天) ───────────────────────────────────────────────────────
modified_30d = []
for name, fpath in wiki_names.items():
    bt = safe_birthtime(fpath)
    mt = safe_mtime(fpath)
    if mt >= THIRTY_DAYS_AGO and bt < THIRTY_DAYS_AGO:
        modified_30d.append({"name": name, "modified": mt.strftime("%Y-%m-%d")})

modified_30d.sort(key=lambda x: x["modified"], reverse=True)
mod_freq_count = len(modified_30d)

if mod_freq_count == 0:
    mod_freq_status = "red"
else:
    mod_freq_status = "green"

# ── Output JSON ──────────────────────────────────────────────────────────────
result = {
    "scan_date": TODAY_STR,
    "vault_path": VAULT,
    "inbox": {
        "total": len(inbox_files),
        "user_captures": inbox_count,
        "snapshot_files": len(snapshot_files),
        "status": inbox_status,
        "oldest_user_captures": user_captures[:10],
    },
    "wiki_orphans": {
        "total_pages": total_wiki,
        "orphan_count": orphan_count,
        "orphan_rate": orphan_rate,
        "status": orphan_status,
        "orphans": sorted(real_orphans),
        "new_today_orphans": sorted(new_today_orphans),
    },
    "projects": {
        "total": total_projects,
        "zombie_count": zombie_count,
        "zombie_rate": zombie_rate,
        "status": zombie_status,
        "zombies": zombies,
        "all_projects": projects,
    },
    "weekly_activity": {
        "new_pages": new_this_week,
        "modified_pages": modified_this_week,
    },
    "weekly_capture": {
        "count": len(weekly_captures),
        "files": weekly_captures,
    },
    "moc_candidates": {
        "true_candidates": moc_candidates,
        "existing_mocs": existing_moc_info,
    },
    "modification_frequency": {
        "count": mod_freq_count,
        "status": mod_freq_status,
        "pages": modified_30d,
    },
}

print(json.dumps(result, ensure_ascii=False, indent=2))

#!/usr/bin/env python3
"""PRで実質的に変更されたページを検出し、スクショ対象を最大3ページ選定する。

usage: detect.py <base-public-dir> <head-public-dir>
stdout: 選定したURLパスを1行1件で出力(例: "/", "/information-technology/foo")
"""
import re
import sys
import pathlib

HASH = re.compile(r"[a-f0-9]{16,64}")
# ビルドごとに変わり得る領域(タグクラウド・前後記事ナビ)はマスクして比較する
MASKS = [
    re.compile(r'<div class="grid-tag">.*?<div class="grid-footer">', re.S),
    re.compile(r'<nav class="[^"]*blog-post-nav[^"]*">.*?</nav>', re.S),
]
TIME_TAG = re.compile(r"<time[^>]*>(\d{4}/\d{2}/\d{2})</time>")


def normalize(path: pathlib.Path):
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except FileNotFoundError:
        return None
    for mask in MASKS:
        text = mask.sub("MASKED", text)
    return HASH.sub("H", text)


def page_date(path: pathlib.Path) -> str:
    m = TIME_TAG.search(path.read_text(encoding="utf-8", errors="ignore"))
    return m.group(1) if m else ""


def main():
    base_root = pathlib.Path(sys.argv[1])
    head_root = pathlib.Path(sys.argv[2])
    changed = []
    for html in sorted(head_root.rglob("index.html")):
        rel = html.parent.relative_to(head_root)
        base_html = base_root / rel / "index.html"
        b = normalize(base_html)
        h = normalize(html)
        if b is None or b != h:  # 新規ページも対象
            changed.append(rel.as_posix())

    print(f"changed pages: {len(changed)}", file=sys.stderr)

    # 優先度: トップ > 記事(新しい順) > カテゴリ/タグ/ページ一覧
    top = [c for c in changed if c == "."]
    lists, posts = [], []
    for c in changed:
        if c == "." or c == "404":
            continue
        if re.match(r"(category|tag|page)(/|$)", c) or c == "search":
            lists.append(c)
        else:
            posts.append(c)
    posts.sort(key=lambda c: page_date(head_root / c / "index.html"), reverse=True)

    selected = ([""] if top else []) + posts + lists
    for page in selected[:3]:
        print(f"/{page}" if page else "/")


if __name__ == "__main__":
    main()

# CLAUDE.md - sun0range.com tech blog

## Project overview

Japanese tech blog built on Gatsby v5, hosted on GitHub Pages.

- **Published URL**: https://sun0range.tech.server-on.net
- **Author**: nisioka
- **Language**: Japanese (HTML `lang` attribute is also `ja`)

## Tech stack

- **Framework**: Gatsby 5 (TypeScript, strict mode)
- **Package manager**: pnpm
- **Styling**: styled-components v6 + global CSS (`src/style.css`)
- **Markdown processing**: gatsby-transformer-remark
- **Image optimization**: gatsby-plugin-image / gatsby-plugin-sharp (WebP, quality: 70)
- **Code highlighting**: react-syntax-highlighter (androidstudio theme)
- **Icons**: FontAwesome (react-fontawesome)
- **Fonts**: Montserrat (Variable)
- **Formatter**: Prettier

### Styling conventions

- グローバル CSS (`src/style.css`): デザイントークン(CSS 変数)、要素デフォルト、markdown 本文のタイポグラフィ、ページグリッドのみを担当
- styled-components: コンポーネントスコープのスタイルすべてを担当
- 色は必ずセマンティックトークン(`--color-surface`, `--color-text`, `--color-accent` など)を使う。ハードコード色は禁止(ダークモードが壊れるため)
- ダークモードは `html[data-theme="dark"]` で切り替え。`gatsby-ssr.tsx` のインラインスクリプトが paint 前にテーマを確定させる
- ブレークポイントはリテラルで統一: 511/512px(サイドバー)、768px(ハンバーガー)、1024px(カード 2 列)、1280px(カード 3 列・最大幅)

## Commands

```bash
pnpm run build      # production build (gatsby build) → outputs to public/
pnpm run develop    # start dev server
pnpm run serve      # preview the built site
pnpm run clean      # clear Gatsby cache
pnpm run format     # format with Prettier
```

## Directory layout

```
├── content/
│   ├── blog/              # new posts (add new articles here)
│   │   └── {slug}/
│   │       ├── index.md   # article body
│   │       └── featured/  # featured image, etc.
│   └── old-blog/          # legacy posts migrated from WordPress (read-only)
│       └── posts/{slug}/
│           ├── index.md
│           └── images/
├── src/
│   ├── @types/global.d.ts # global type definitions (CommonPost, MdPost, MdOldPost, etc.)
│   ├── components/        # reusable components
│   │   ├── header.tsx     # navigation (hamburger menu)
│   │   ├── layout.tsx     # root layout
│   │   ├── seo.tsx        # SEO (JSON-LD, OGP, Twitter Card)
│   │   ├── bio.tsx        # author profile
│   │   ├── pagination.tsx # pagination
│   │   ├── related-list.tsx  # related posts
│   │   ├── tag-cloud.tsx     # tag cloud
│   │   ├── category-all.tsx  # category list
│   │   ├── footer.tsx
│   │   ├── age.tsx
│   │   ├── disqus-comments.tsx  # (currently disabled)
│   │   └── google-adsense.tsx   # (placeholder)
│   ├── pages/
│   │   ├── index.tsx      # top page
│   │   ├── search.tsx     # search page
│   │   ├── 404.tsx
│   │   ├── management/    # site information pages
│   │   └── tools/         # tool pages
│   ├── templates/
│   │   ├── blog-post.tsx     # article detail template
│   │   ├── page-list.tsx     # paginated post list
│   │   ├── category-list.tsx # per-category list
│   │   └── tag-list.tsx      # per-tag list
│   ├── utilFunction.ts    # utilities (mergePosts, convertCategory, etc.)
│   ├── style.tsx          # shared styled-components styles
│   ├── style.css          # CSS custom properties, global styles
│   ├── normalize.css
│   └── images/            # site-wide images
├── static/                # static files (favicon.webp, background.webp)
├── gatsby-config.ts       # Gatsby config (plugins, metadata)
├── gatsby-node.ts         # page generation logic
├── gatsby-browser.tsx     # font / CSS imports
├── gatsby-ssr.tsx         # SSR config (lang="ja")
└── .github/workflows/static.yml  # GitHub Pages deploy
```

## How to write a new blog post

### 1. Create the directory

Create `content/blog/{slug}/index.md`. The slug becomes part of the URL.

### 2. Frontmatter

```markdown
---
title: "Article title"
date: "YYYY-MM-DD"
dateModified: "YYYY-MM-DD"
description: "Article description (used for SEO)"
featuredImagePath: "featured/image-name.webp"
nodeType: blog
category: 技術
tags: ["tag1", "tag2"]
---
```

**Required fields**: title, date, dateModified, description, featuredImagePath, nodeType (always `blog`), category, tags

### 3. Category list

| Japanese name    | URL slug               |
| ---------------- | ---------------------- |
| 技術             | information-technology |
| イベントレポート | event-report           |
| 生活             | life                   |
| 用語集           | glossary               |
| 書評             | book-report            |
| 業務効率化       | business-efficiency    |

Use the **Japanese name** in the frontmatter `category` field. URL conversion is handled by `convertCategory()` in `src/utilFunction.ts`.

### 4. Images

- Place featured images in `content/blog/{slug}/featured/`
- In-article images can go in the same directory
- WebP is the recommended format
- Default thumbnail: `featured/defaultThumbnail.png`

### 5. Generated URL

`/{category-slug}/{slug}` (e.g. `/information-technology/mcp-slack-setup`)

## Page generation logic (gatsby-node.ts)

- Individual posts: `/{categoryPath}/{slug}` → `blog-post.tsx`
- Paginated post list: `/page/{n}` (12 posts per page) → `page-list.tsx`
- Category list: `/category/{categorySlug}` → `category-list.tsx`
- Tag list: `/tag/{tagName}` → `tag-list.tsx`

Posts from the new and old blogs are merged via `mergePosts()` and sorted by date descending.

## Differences from the old blog (content/old-blog)

|               | New blog (blog)             | Old blog (old-blog)                              |
| ------------- | --------------------------- | ------------------------------------------------ |
| Category      | `category: "技術"` (string) | `categories: ["information-technology"]` (array) |
| Image         | `featuredImagePath`         | `coverImage`                                     |
| Modified date | `dateModified` present      | `date` only                                      |
| Description   | `description` present       | title is used as a substitute                    |

## Deploy

1. Build locally with `pnpm run build`
2. Commit and push the `public/` directory
3. GitHub Actions (`.github/workflows/static.yml`) auto-deploys on push to the `master` branch
   - Uploads the prebuilt `public/` directory as-is (no build runs on CI)

## Coding conventions

- Indentation: 2 spaces
- File names: kebab-case (e.g. `blog-post.tsx`)
- Component names: PascalCase
- Variables / functions: camelCase
- Constants: UPPER_SNAKE_CASE
- TypeScript strict mode
- Gatsby config files use `.ts` / `.tsx`

## Notes

- The `public/` directory is the build output and is committed, because CI deploys it as-is without building
- Disqus comments code exists but is currently disabled
- Google AdSense is a placeholder only
- `trailingSlash: "never"` — URLs have no trailing slash

## Rules

- Do not write unit tests (Jest, etc.). This repository is primarily blog content, and the cost of maintaining tests does not justify it.

## Stream idle timeout mitigation

Follow these constraints to avoid `Stream idle timeout - partial response received` errors caused by long streaming responses.

1. **Do tasks ONE AT A TIME.** Complete and confirm each numbered task before moving on. Never batch multiple tasks into a single response.
2. **Never write more than ~150 lines in a single tool call.** If a file will be longer, split it into multiple append / edit operations.
3. **Start a fresh session when the conversation gets long** (roughly 20+ tool calls).
4. **Keep search output short.** Use flags like `--include` and `-l` (list filenames only) on `grep` and similar commands to limit output size.
5. **On timeout, retry the step by splitting it into smaller chunks** instead of restarting the entire task from scratch.

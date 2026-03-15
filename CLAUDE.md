# CLAUDE.md - sun0range.com 技術ブログ

## プロジェクト概要

Gatsby v5 ベースの日本語技術ブログ。GitHub Pages でホスティング。
- **公開URL**: https://sun0range.tech.server-on.net
- **著者**: nisioka
- **言語**: 日本語 (HTMLのlang属性も `ja`)

## 技術スタック

- **フレームワーク**: Gatsby 5 (TypeScript, strict mode)
- **パッケージマネージャ**: pnpm
- **スタイリング**: styled-components v6 + グローバルCSS (`src/style.css`)
- **マークダウン処理**: gatsby-transformer-remark
- **画像最適化**: gatsby-plugin-image / gatsby-plugin-sharp (WebP, quality: 70)
- **コードハイライト**: react-syntax-highlighter (androidstudio テーマ)
- **アイコン**: FontAwesome (react-fontawesome)
- **フォント**: Montserrat (Variable), Merriweather
- **フォーマッタ**: Prettier

## コマンド

```bash
pnpm run build      # 本番ビルド (gatsby build) → public/ に出力
pnpm run develop    # 開発サーバー起動
pnpm run serve      # ビルド済みサイトのプレビュー
pnpm run clean      # Gatsby キャッシュクリア
pnpm run format     # Prettier でフォーマット
```

## ディレクトリ構成

```
├── content/
│   ├── blog/              # 新規記事 (ここに記事を追加する)
│   │   └── {slug}/
│   │       ├── index.md   # 記事本文
│   │       └── featured/  # アイキャッチ画像等
│   └── old-blog/          # 旧WordPress移行記事 (読み取り専用)
│       └── posts/{slug}/
│           ├── index.md
│           └── images/
├── src/
│   ├── @types/global.d.ts # グローバル型定義 (CommonPost, MdPost, MdOldPost 等)
│   ├── components/        # 再利用コンポーネント
│   │   ├── header.tsx     # ナビゲーション (ハンバーガーメニュー)
│   │   ├── layout.tsx     # ルートレイアウト
│   │   ├── seo.tsx        # SEO (JSON-LD, OGP, Twitter Card)
│   │   ├── bio.tsx        # 著者プロフィール
│   │   ├── pagination.tsx # ページネーション
│   │   ├── related-list.tsx  # 関連記事
│   │   ├── tag-cloud.tsx     # タグクラウド
│   │   ├── category-all.tsx  # カテゴリ一覧
│   │   ├── footer.tsx
│   │   ├── age.tsx
│   │   ├── disqus-comments.tsx  # (現在無効)
│   │   └── google-adsense.tsx   # (プレースホルダ)
│   ├── pages/
│   │   ├── index.tsx      # トップページ
│   │   ├── search.tsx     # 検索ページ
│   │   ├── 404.tsx
│   │   ├── management/    # サイト情報ページ
│   │   └── tools/         # ツールページ
│   ├── templates/
│   │   ├── blog-post.tsx     # 記事詳細テンプレート
│   │   ├── page-list.tsx     # ページ送り付き記事一覧
│   │   ├── category-list.tsx # カテゴリ別一覧
│   │   └── tag-list.tsx      # タグ別一覧
│   ├── utilFunction.ts    # ユーティリティ (mergePosts, convertCategory 等)
│   ├── style.tsx          # styled-components 共通スタイル
│   ├── style.css          # CSS カスタムプロパティ、グローバルスタイル
│   ├── normalize.css
│   └── images/            # サイト共通画像
├── static/                # 静的ファイル (favicon.webp, background.webp)
├── gatsby-config.ts       # Gatsby設定 (プラグイン、メタデータ)
├── gatsby-node.ts         # ページ生成ロジック
├── gatsby-browser.tsx     # フォント・CSSインポート
├── gatsby-ssr.tsx         # SSR設定 (lang="ja")
└── .github/workflows/static.yml  # GitHub Pages デプロイ
```

## 新規ブログ記事の書き方

### 1. ディレクトリ作成

`content/blog/{slug}/index.md` を作成する。slug はURLの一部になる。

### 2. Frontmatter

```markdown
---
title: "記事タイトル"
date: "YYYY-MM-DD"
dateModified: "YYYY-MM-DD"
description: "記事の説明文 (SEO用)"
featuredImagePath: "featured/image-name.webp"
nodeType: blog
category: 技術
tags: ["タグ1", "タグ2"]
---
```

**必須フィールド**: title, date, dateModified, description, featuredImagePath, nodeType (`blog` 固定), category, tags

### 3. カテゴリ一覧

| 日本語名 | URL slug |
|---|---|
| 技術 | information-technology |
| イベントレポート | event-report |
| 生活 | life |
| 用語集 | glossary |
| 書評 | book-report |
| 業務効率化 | business-efficiency |

frontmatter の `category` には**日本語名**を記載する。URL変換は `src/utilFunction.ts` の `convertCategory()` が行う。

### 4. 画像

- アイキャッチ画像は `content/blog/{slug}/featured/` に配置
- 記事内画像も同ディレクトリに配置可能
- 形式は WebP 推奨
- デフォルトサムネイル: `featured/defaultThumbnail.png`

### 5. 生成されるURL

`/{category-slug}/{slug}` (例: `/information-technology/mcp-slack-setup`)

## ページ生成ロジック (gatsby-node.ts)

- 個別記事: `/{categoryPath}/{slug}` → `blog-post.tsx`
- ページ一覧: `/page/{n}` (12記事/ページ) → `page-list.tsx`
- カテゴリ一覧: `/category/{categorySlug}` → `category-list.tsx`
- タグ一覧: `/tag/{tagName}` → `tag-list.tsx`

新旧ブログの記事は `mergePosts()` で統合され、日付降順でソートされる。

## 旧ブログ (content/old-blog) との違い

| | 新ブログ (blog) | 旧ブログ (old-blog) |
|---|---|---|
| カテゴリ | `category: "技術"` (文字列) | `categories: ["information-technology"]` (配列) |
| 画像 | `featuredImagePath` | `coverImage` |
| 日付更新 | `dateModified` あり | `date` のみ |
| 説明 | `description` あり | title を代用 |

## デプロイ

1. `pnpm run build` でローカルビルド
2. `public/` ディレクトリをコミット・プッシュ
3. GitHub Actions (`.github/workflows/static.yml`) が `master` ブランチへの push で自動デプロイ
   - ビルド済みの `public/` をそのままアップロードする方式 (CI上でのビルドは行わない)

## コーディング規約

- インデント: 2スペース
- ファイル名: ケバブケース (例: `blog-post.tsx`)
- コンポーネント名: PascalCase
- 変数/関数: camelCase
- 定数: UPPER_SNAKE_CASE
- TypeScript strict mode
- Gatsby の設定ファイルは `.ts` / `.tsx`

## 注意事項

- `public/` ディレクトリはビルド出力でありコミット対象。CI上でビルドせずそのままデプロイするため
- Disqus コメント機能はコード上存在するが現在無効化されている
- Google AdSense はプレースホルダのみ
- `trailingSlash: "never"` — URLの末尾スラッシュなし
## ルール
- 単体テスト（Jest等）は作成しない。ブログコンテンツが主体のリポジトリであり、テスト実装のコストに見合わない。

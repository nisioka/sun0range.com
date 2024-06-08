---
title: AWSにデプロイしていたWordPressサイトをGatsbyJSによるGitHub Pagesでの静的サイトへ移行
date: "2024-06-01"
dateModified: "2024-06-04"
description: "WordPressは非常に強力なCMSですが、動的サイトであるため、サーバーの保守やセキュリティ対策が必要です。一方、静的サイトジェネレーターであるGatsbyJSを使用すると、高速で安全なサイトを構築できます。本記事では、AWSにデプロイしていたWordPressサイトをGatsbyJSとGitHub Pagesを使用した静的サイトへ移行する手順を紹介します。"
featuredImagePath: "featured/wordpress2gatsby.webp"
nodeType: blog
category: 技術
tags: ["Gatsby", "React", "WordPress"]
---

# AWS にデプロイしていた WordPress サイトを GatsbyJS による GitHub Pages での静的サイトへ移行

## はじめに

WordPress は非常に強力な CMS ですが、動的サイトであるため、サーバーの保守やセキュリティ対策が必要です。一方、静的サイトジェネレーターである GatsbyJS を使用すると、高速で安全なサイトを構築できます。本記事では、AWS にデプロイしていた WordPress サイトを GatsbyJS と GitHub Pages を使用した静的サイトへ移行する手順を紹介します。

## 移行プロセス

1. WordPress サイトデータのエクスポート
2. GatsbyJS のセットアップ
3. WordPress データのインポート
4. サイトのビルドとデプロイ

## 1. WordPress サイトデータのエクスポート

まず、WordPress サイトからデータをエクスポートします。

1. **WordPress 管理ダッシュボード**にログインします。
2. **ツール** > **エクスポート**を選択します。
3. **すべてのコンテンツ**を選び、**エクスポートファイルをダウンロード**をクリックします。

これで、投稿、ページ、メディアなどのデータを含む XML ファイルがダウンロードされます。

## 2. GatsbyJS のセットアップ

次に、GatsbyJS をセットアップします。

1. **Node.js**と**npm**をインストールします。

```bash
# For Mac
brew install node
```

Gatsby CLI をインストールします。

```bash
npm install -g gatsby-cli
```

新しい Gatsby プロジェクトを作成します。

```bash
gatsby new my-gatsby-blog
cd my-gatsby-blog
```

3. WordPress データのインポート
   GatsbyJS で WordPress データを使用するために、gatsby-source-wordpress プラグインを利用します。

プラグインをインストールします。

```bash
npm install gatsby-source-wordpress
```

gatsby-config.js ファイルを編集して、WordPress サイトのデータを取得するように設定します。

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `http://your-wordpress-site.com/graphql`,
      },
    },
  ],
}
```

gatsby-node.js ファイルを作成し、WordPress の投稿を Gatsby のページとして生成するスクリプトを追加します。

```javascript
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allWpPost {
        nodes {
          slug
        }
      }
    }
  `)

  result.data.allWpPost.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.slug,
      },
    })
  })
}
```

4. サイトのビルドとデプロイ
   最後に、サイトをビルドし、GitHub Pages にデプロイします。

ビルドを行います。

```bash
gatsby build
```

リポジトリを作成し、GitHub Pages にデプロイします。

```bash
git init
git remote add origin https://github.com/your-username/your-repo.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

GitHub Pages の設定で、デプロイするブランチを gh-pages に設定します。

```bash
npm install gh-pages --save-dev
```

package.json にデプロイスクリプトを追加します。

```json
{
  "scripts": {
    "deploy": "gatsby build && gh-pages -d public"
  }
}
```

デプロイを実行します。

```bash
npm run deploy
```

## まとめ

以上の手順で、AWS にデプロイされていた WordPress サイトを GatsbyJS と GitHub Pages を用いた静的サイトへと移行することができました。静的サイトに移行することで、サイトのパフォーマンス向上とセキュリティ強化を実現できます。ぜひ試してみてください。

---
title: AWSにデプロイしていたWordPressサイトをGatsbyJSによるGitHub Pagesでの静的サイトへ移行
date: "2024-06-09"
dateModified: "2024-06-09"
description: "WordPressは非常に強力なCMSですが、動的サイトであるため、サーバーの保守やセキュリティ対策が必要です。一方、静的サイトジェネレーターであるGatsbyJSを使用すると、高速で安全なサイトを構築できます。本記事では、AWSにデプロイしていたWordPressサイトをGatsbyJSとGitHub Pagesを使用した静的サイトへ移行する手順を紹介します。"
featuredImagePath: "featured/wordpress2gatsby.webp"
nodeType: blog
category: 技術
tags: ["GatsbyJS", "React", "WordPress"]
---

## はじめに

本ブログは WordPress を AWS にデプロイして運用していましたが、GatsbyJS を使って GitHub Pages での静的サイトへの移行を行いました。その手順をここに残します。  
ちなみに、移行のモチベーションとしては、下記がありました。

1. 金銭的コストの削減をしたい
2. サイトのパフォーマンス向上を図りたい
3. セキュリティリスクを無くし、運用コストも下げたい
4. AWS の使用経験を活かしつつ、新しい技術スタックへの挑戦も兼ねて(今回は React の実践として良かった)

### Before の運用

- WordPress を AWS の EC2 で動かす。
  - 記事は Web 上の WordPress 管理者画面から投稿する。
    - （これにより、管理者の乗っ取りやデータベース等への不正アクセスなどのセキュリティリスクが存在していました。）
  - CloudFront でキャッシュを効かせて、サイトパフォーマンスの向上を図ってはいた。

### After の運用

- 既存の WordPress のバックアップをローカル PC で動かす。
- 新規の記事は Markdown ファイルで記述する。
- 上記をソースにして、GatsbyJS で SSG(Static Site Generation)でビルドする。
  - 静的ファイルを GitHub Pages でホスティングする。

## 移行手順概要

1. WordPress サイトデータのエクスポート
2. WordPress のローカル環境へのインポート
3. GatsbyJS のセットアップ
4. サイトのビルドとデプロイ

### 1. WordPress サイトデータのエクスポート

まず、WordPress サイトからデータをエクスポートします。

1. **WordPress 管理ダッシュボード**にログインします。
2. **ツール** > **エクスポート**を選択します。
3. **すべてのコンテンツ**を選び、**エクスポートファイルをダウンロード**をクリックします。

これで、投稿、ページ、メディアなどのデータを含む XML ファイルがダウンロードされます。

### 2. WordPress データのインポート

次に、ローカル環境で WordPress をセットアップし、エクスポートしたデータをインポートします。

この[docker-compose.yml](https://github.com/nisioka/docker-wordpress/blob/develop/docker-compose.yml)を使って、WordPress をローカル環境でセットアップします。  
これには、WordPress 本体とその DB、phpMyAdmin が含まれているので、起動させて http://localhost にアクセスすると空の WordPress が表示されます。  
適当に初期設定を行った後、WordPress の管理画面にログインし、エクスポートしたデータをインポートします。

そして、WordPress のプラグインについても整理します。  
不要なプラグインは削除しましょう。特に、ローカル環境では正常に動作しないことがある認証系のプラグインは削除することをお勧めします。公開するわけでは無いローカル環境なのでセキュリティを高める必要がありません。
また、GatsbyJS で WordPress のデータを取得するための以下のプラグインを追加インストールします。

- WP Gatsby
- WPGraphQL

この状態で既存の WordPress 記事がローカルでも表示できていれば、次に進みます。

### 3. GatsbyJS のセットアップ

次に、GatsbyJS をセットアップします。

前提： `Node.js`と`npm`がインストールされていること。

Gatsby CLI をインストールし、新しい Gatsby プロジェクトを作成します。

```bash
npm install -g gatsby-cli
gatsby new my-gatsby-blog
cd my-gatsby-blog
```

※ ここでの my-gatsby-blog はプロジェクト名として例示していますので、任意の名前に置き換えてください。

GatsbyJS で WordPress のデータを取得するためのプラグインをインストールします。

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
        url: `http://localhost/graphql`,
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

## 4. サイトのビルドとデプロイ

最後に、サイトをビルドし、GitHub Pages にデプロイします。

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

![githubPagesSetting.png](githubPagesSetting.webp)

現在、Build and deployment には GitHub Actions の使用が推奨されていますので、/.github/workflows/ に下記のワークフローを置きます。
これは master ブランチに push されたら./public ディレクトリ(gatsby build で生成される静的ファイルのデフォルトの置き場)を GitHub Pages にデプロイするワークフローです。

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./public"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## まとめ

この記事では基本的な構成に焦点を当てて説明しましたが、以上の手順で AWS にデプロイされていた WordPress サイトを GatsbyJS と GitHub Pages を用いた静的サイトへと移行することができました。  
静的サイトに移行することで、サイトのパフォーマンス向上とセキュリティ強化を実現できます。ぜひ試してみてください。

---

<div class="booklink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="booklink-image" style="float:left;margin:0 15px 10px 0;"><a href="" target="_blank" rel="nofollow" ><img src="https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9546/9784844379546.jpg?_ex=200x200" style="border: none;" /></a></div><div class="booklink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="booklink-name" style="margin-bottom:10px;line-height:120%"><a href="" target="_blank" rel="nofollow" >【POD】React & Gatsby開発入門</a><div class="booklink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail" style="margin-bottom:5px;">竹本 雄貴 インプレスR&D 2021年04月02日頃    </div><div class="booklink-link2" style="margin-top:10px;"><div class="shoplinkamazon" style="margin:5px 0"><a href="//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4844379542" target="_blank" rel="nofollow" >Amazon</a></div><div class="shoplinkkindle" style="margin:5px 0"><a href="//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3D%25E3%2580%2590POD%25E3%2580%2591React%2520%2526%2520Gatsby%25E9%2596%258B%25E7%2599%25BA%25E5%2585%25A5%25E9%2596%2580%26__mk_ja_JP%3D%2583J%2583%255E%2583J%2583i%26url%3Dnode%253D2275256051" target="_blank" rel="nofollow" >Kindle</a></div>                               	   	   	  	  <div class="shoplinktoshokan" style="margin:5px 0"><a href="http://calil.jp/book/4844379542" target="_blank" rel="nofollow" >図書館</a></div>	</div></div><div class="booklink-footer" style="clear: left"></div></div>

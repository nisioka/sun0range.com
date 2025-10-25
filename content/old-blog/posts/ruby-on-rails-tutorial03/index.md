---
title: "Ruby on Rails チュートリアルをやってみた【第3章】"
date: 2018-11-01
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第3章の実績

[第3章 ほぼ静的なページの作成](https://railstutorial.jp/chapters/static_pages?version=5.1#cha-static_pages) を実施しました！ 実施時間: 3時間

### 学べたこと

- 静的ページの作成 Webページの基本が知れる内容でした。ブラウザからリクエストを受け取り、HTMLを返却するとブラウザで表示されるという。
- テスト駆動開発 ここから、まずテストを書いて、それが失敗して、それを成功するように実装していくという"テストファースト"なやり方で説明されています。 この手法は品質向上に絶対に寄与するので慣れておくべきやり方ですね。
- ページタイトルだけ動的に変更する ERBという記法で、"<% ... %>"といったようなタグを使うことで、動的な画面表示ができるようになります。今回はページタイトルだけでしたが、今後色々とできることが説明されるのでしょう。
- ルーティングの仕組み ルーティングの制御が、routes.rbというファイルに一元的に集約されていることが分かりました。どのURLにどのHTTPメソッドでアクセスすると、どのモジュールに制御が渡されるのかを定義します。

第2章までと比べて、やることや演習が増えて本格的にチュートリアルが始まったなという感覚です。

### 独自にやったこと

ちょっとハマったことです。RailsInstallerに同梱されているGitのクライアントソフトが古いようで、GitHubにpushできませんでした。（チュートリアルの標準ではBitBucketでソース管理をしているはずなので、そのとおりであれば関係ありません。） 以下の記事が対応した内容です。 http://localhost/information-technology/error-1407742e-ssl

## 参考

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第3章 ほぼ静的なページの作成](https://railstutorial.jp/chapters/static_pages?version=5.1#cha-static_pages)
- [GitHubにpushしようとしたら「error:1407742E:SSL」エラーが発生](http://localhost/information-technology/error-1407742e-ssl)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)![](images/impression)[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)![](images/impression)

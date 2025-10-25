---
title: "Ruby on Rails チュートリアルをやってみた【第2章】"
date: 2018-06-03
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第2章の実績

[第2章 Toyアプリケーション](https://railstutorial.jp/chapters/toy_app?version=5.1#cha-a_toy_app) を実施しました！ 実施時間: 1.5時間

### 学べたこと

- 簡単にRESTアプリケーションの作成方法
- scaffoldの強力さ！
    - データモデル、関連性や制約の定義が簡単にできる。 関連性：あるモデルに属する、複数のモデルをもつといったことを直感的に定義出来る。 制約：必須入力や、文字数制限を簡単に記述出来る。
    - DBの生成もコマンド（rails db:migrate）を一つ流すだけで出来てしまう。

単純な例ではありましたが、非常に簡単にCRUD定義が出来るscaffoldはとても強力なツールだと感じました。これが標準でrailsに含まれているのは大変便利！

### 独自にやったこと

#### Heroku環境で、「rails db:migrate」を自動で流れるようにした

##### 経緯

Herokuというクラウド環境（チュートリアル上では擬似的に本番環境として扱っている）にアプリケーションをデプロイしています。今回作成したアプリを動かすためには、DBを生成するための「rails db:migrate」というコマンドを実行する必要がありますが、それを一々叩くのは忘れがちですし、なにより面倒です。

そこで、Herokuにプレインストールされている"foreman"というツールの機能を用いて、自動でこのコマンドを実行させるようにしました。

##### 手順

以下のProcfileというファイルをプッシュしましょう。やることはこれだけです！ 

<script src="https://gist-it.appspot.com/github/nisioka/RubyOnRailsTutorial-toy/blob/develop/Procfile"><span style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" data-mce-type="bookmark" class="mce_SELRES_start">﻿</span></script>

格納先はルートディレクトリ（リポジトリの最上位）、

ファイル名はProcfile、

記述するコマンドの形式は、`（プロトコル名称）: （実行したいコマンド）`です。

左側は任意の名前でいいそうです（ただし、"web"という名前だけは特別な意味を持つそうなのでそれ意外で）。私は上記の通り、releaseという名前にしました。

右側が実行したいコマンドで、今回の場合では「rails db:migrate」です。（※もしrailsのバージョン4以前の場合は、このコマンドを「bundle exec rake db:migrate」とする必要があります）

このファイルを置いておくだけで、Herokuにデプロイするだけで、同時にDBのmigrateも自動で行われます。

## 参考

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ: GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/toy\_app

### リンク

- [第2章 Toyアプリケーション](https://railstutorial.jp/chapters/toy_app?version=5.1#cha-a_toy_app)
- [Herokuでデプロイと同時にrake db:migrateを実行する](https://qiita.com/m_nakamura145/items/2eafb2dc9f8a459670b6)
- [foreman で アプリケーションを動かす。](https://qiita.com/7kaji/items/6a59977d2ad85604e7fd#-e-env)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)![](images/impression)[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)![](images/impression)

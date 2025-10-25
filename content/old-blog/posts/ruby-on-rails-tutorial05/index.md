---
title: "Ruby on Rails チュートリアルをやってみた【第5章】"
date: 2019-03-04
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第5章の実績

[第5章 レイアウトを作成する](https://railstutorial.jp/chapters/filling_in_the_layout?version=5.1#cha-filling_in_the_layout) を実施しました！  
実施時間: 1.5時間

### 学べたこと

- 今回作成するアプリケーションのサードパーティ機能の使い方  
    チュートリアルを通じて作られるWebアプリケーションにおける、UIのフレームワークである**Bootstrap**やCSSの簡易な記載を可能とする**SCSS**等のRuby on Railsとは直接関係のない外部ツールの使用について解説がありました。HTML/CSSについての基礎知識がない人には少し厳しそうですが、BootstrapもSCSSも主要なツールなので知っている人もそもそも多そうです。
- 自動統合テストが簡単に作れる  
    出力されるHTMLに対するテストを行えます。以下のコマンドで簡単にテストテンプレートを生成でき、テストコード自体もシンプルで直感的です。  
    自動生成コマンド：「rails generate integration\_test site\_layout」  
    統合テスト実行コマンド：「rails test:integration」
- ユーザ登録用コントローラを作成する  
    「rails generate controller Users new」これでコントローラとnewメソッドが作成されます。

### 独自にやったこと

チュートリアル内では、今回のbranch(filling-in-layout)からmasterへ直接mergeする手順となっていましたが、一般的な開発フローに倣い、 filling-in-layout → develop → masterというmergeの流れとしました。

## 参考

### リンク

- [第5章 レイアウトを作成する](https://railstutorial.jp/chapters/filling_in_the_layout?version=5.1#cha-filling_in_the_layout)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

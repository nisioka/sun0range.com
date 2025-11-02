---
title: "Ruby on Rails チュートリアルをやってみた【第11章】"
date: 2019-03-16
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第11章の実績

[第11章 アカウントの有効化](https://railstutorial.jp/chapters/account_activation?version=5.1#cha-account_activation) を実施しました！  
実施時間: 1.5時間

### 学べたこと

- メール送信機能  
    「rails generate mailer UserMailer account\_activation password\_reset」とするだけ簡単にメール送信アクションのテンプレートが出来てしまいます。フレームワークにメール機能が普通に内包されていて凄い！また、develop.rbに以下の記載を加えることで、メールのプレビュー （ブラウザで閲覧できる） 機能も使えてしまいます。

```
config.action_mailer.raise_delivery_errors = true
config.action_mailer.delivery_method = :test
host = 'localhost:3000'                     # ローカル環境
config.action_mailer.default_url_options = { host: host, protocol: 'http' }
```

- send  
    例えば、「a.length」と「a.send(:length)」は等価です。javaで言うところのリフレクションと同じかなと思います。非常に強力な機能で動的なメソッド呼び出しができます。ただし、あまりに強力なため濫用は厳禁だと思われます。自由度が高すぎて逆に可読性が下がることにもなりかねません。

## 参考  

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第11章 アカウントの有効化](https://railstutorial.jp/chapters/account_activation?version=5.1#cha-account_activation)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

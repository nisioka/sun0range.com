---
title: "Ruby on Rails チュートリアルをやってみた【第9章】"
date: 2019-03-11
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第9章の実績

[第9章 発展的なログイン機構](https://railstutorial.jp/chapters/advanced_login?version=5.1#cha-advanced_login) を実施しました！  
実施時間: 1.5時間

### 学べたこと

- cookies.permanent.signed\[:user\_id\] = user.id  
    上記コードは、「cookieに、永続的に（20年後に切れる）、署名付き暗号化された」ハッシュを登録する事を表します。分解すると下記の通りですが、それをメソッドチェーンによって直感的な記述により実現できます。
    - cookies.permanent（≒expires: 20.years.from\_now.utc）
    - cookies.signed
- remember meを含む発展的な認証機構  
    前章もそうですが、一般的に複雑になりがちなログイン関連の認証機構を実装しながら学習できるのはとても良い教材だと感じました。このあたり、難しければ何度も繰り返し学習すべき箇所かなと思いました。  
    私自身は既に知っている内容だったのでさらっと進めることが出来ました。
- heroku maintenance:on  
    デプロイ時にdb:migrationしている最中はDB状態が正しくないため、アプリケーションが正常に動かず、システムエラーなどが発生してしまいます。実運用を考慮した場合、不適切なので少なくともメンテナンス画面を表示すべきです。herokuでは上記コマンドだけで簡単にその状態とすることが出来ます。解除は逆にoffとすればよいので、「 heroku maintenance:off」です。

## 参考  

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第9章 発展的なログイン機構](https://railstutorial.jp/chapters/advanced_login?version=5.1#cha-advanced_login)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

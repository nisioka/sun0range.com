---
title: "Ruby on Rails チュートリアルをやってみた【第14章】"
date: 2019-05-12
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第14章の実績

[第14章 ユーザーをフォローする](https://railstutorial.jp/chapters/following_users?version=5.1#cha-following_users) を実施しました！  
実施時間: 5時間

### 学べたこと

- 多対多のリレーションシップ  
    多対多の関係を持つモデルの場合でもRailsでは簡単にリレーションシップを表現することができます。ただし、これまでの1対多の関係性のように命名からだけでは指定できないので、「クラス名（class\_name:）」や「外部キー（foreign\_key:）」を指定する必要があります。これにより事実上は1対多と多対1となる連関モデルによるリレーションシップが作られます。
- resourcesブロックの内側で:memberメソッド  
    ルーティングにおいて resources の:memberメソッドを用いることで、「 /users/1/following」 や 「/users/1/followers」  といったURLを扱うことができるようになります。
- Ajaxリクエスト  
    Railsではとても簡単にAjaxを用いたリクエスト通信を実装することが可能です。form\_for()メソッドに、「remote: true」 引数を加えるだけです。  
    一応仕組みとしては、この記述により、<form>タグにdata-remote="true"という属性が書き出さされ、この属性を目印にRailsのJavaScriptがAjax通信をしてくれます。  
    ただし、Controller側では標準ではhtml出力されるので、「respond\_to」メソッドにより出力出し分けるという対応も必要です。

### その他の追加機能

これで当初目標としていたRailsを用いたサンプルアプリケーション実装は終了です。ただ、これはもちろん基礎的なものですので改良の余地は多々あります。最後に色々な改良案が載せてありましたので転載します。

- ユーザ毎のダイレクトメッセージ機能
- メールでの通知機能
- RSSフィード
- REST API
- ユーザやマイクロソフトなどの検索機能

...etc

俺たちの戦いはこれからだ！ということですね。

## 参考

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第14章 ユーザーをフォローする](https://railstutorial.jp/chapters/following_users?version=5.1#cha-following_users)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

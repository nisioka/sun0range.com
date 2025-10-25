---
title: "Ruby on Rails チュートリアルをやってみた【第6章】"
date: 2019-03-07
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第6章の実績

[第6章 ユーザーのモデルを作成する](https://railstutorial.jp/chapters/modeling_users?version=5.1#cha-modeling_users) を実施しました！  
実施時間: 3時間

### 学べたこと

- モデルの生成方法  
    「rails generate model User name:string email:string」とするだけで、"User"という"name"文字列と"email"文字列の2つの属性を持ったモデルと関連クラス（DBマイグレーション用ファイルやテストテンプレート）を作成することができます。そして「rails db:migrate」を実行することで、DBのテーブル作成までも簡単にできてしまいます。
- Railsコンソールのサンドボックス実行  
    「rails console --sandbox」とすることで、Railsコンソールでのモデル変更などによるDB影響を、終了時に元に戻して(rollback)くれます。  
    自動生成コマンド：「rails generate integration\_test site\_layout」  
    統合テスト実行コマンド：「rails test:integration」
- has\_secure\_password  
    このメソッドをモデルに持たせるだけで、以下の機能を使えるようになる。（ただし、 モデルに`password_digest`という属性を持っている事、 bcryptなどのハッシュ関数が使用できる事などの条件があります）
    - ハッシュ化したパスワードを、DB内の`password_digest`という属性に保存できるようになる。
    - 2つのペアの仮想的な属性 (`password`と`password_confirmation`) が使えるようになる。ここで言う仮想的とは、モデル上は存在するがDBには存在しないという事を表す。
    - 存在性と値が一致するかどうかのバリデーションも追加される。
    - `authenticate`メソッドが使えるようになる (引数の文字列がパスワードと一致するとUserオブジェクトを、間違っていると`false`を返すメソッド) 。

### 独自にやったこと

#### 「rails test:models」が動かない

「rails db:migrate RAILS\_ENV=test」を実施する必要がある模様。

## 参考  

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第6章 ユーザーのモデルを作成する](https://railstutorial.jp/chapters/modeling_users?version=5.1#cha-modeling_users)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

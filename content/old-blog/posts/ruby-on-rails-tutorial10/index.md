---
title: "Ruby on Rails チュートリアルをやってみた【第10章】"
date: 2019-03-11
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第10章の実績

[第10章 ユーザーの更新・表示・削除](https://railstutorial.jp/chapters/updating_and_deleting_users?version=5.1#cha-updating_showing_and_deleting_users) を実施しました！  
実施時間: 2時間

### 学べたこと

- before\_action  
    例えば本章では、「before\_action :logged\_in\_user, only: \[:edit, :update\]」とすることで、editとupdateメソッドを実行する前には必ず logged\_in\_userが呼ばれるのでそこでログインチェックを行えます。
- サンプルユーザ作成用Railsタスク  
    Fakerという外部依存関係があるので、Gemfileに「gem 'faker', '1.7.3'」を追加します。  
    そして以下のスクリプトをdb/seeds.rbに記載して、①rails db:migrate:reset、②rails db:seedを実行します。これで"それっぽいユーザ"が大量（ここでは99人。必要であれば以下のコードの"99"部分を適宜置き換え）に作成出来ます。

```
99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password)
end
```

- ページネイション  
    will\_paginateがとにかく便利。コードとしてはUser.allをUser.paginate(page: params\[:page\])へ変更し、Viewに<%= will\_paginate %>を記載するだけでページングとその操作まで含めて出来てしまう！また、ページネイションとは直接関係ないが、<%= render @users %>でuserの一覧をリスト形式で描画できてしまうのもすこぶる直感的で便利。

## 参考  

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第10章 ユーザーの更新・表示・削除](https://railstutorial.jp/chapters/updating_and_deleting_users?version=5.1#cha-updating_showing_and_deleting_users)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

---
title: "Ruby on Rails チュートリアルをやってみた【第7章】"
date: 2019-03-09
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第7章の実績

[第7章 ユーザー登録](https://railstutorial.jp/chapters/sign_up?version=5.1#cha-sign_up) を実施しました！  
実施時間: 4時間

### 学べたこと

- デバッグ情報の埋め込み
    - ビルトインの"debug"メソッド  
        例えば<%= debug(params) if Rails.env.development? %>をerbに記載すれば、"params"の情報を"開発環境でのみ"表示することができます。
    - byebug gemによる"debugger"メソッド  
        Gemfileに"byebug"の依存関係の指定があれば、debuggerメソッドが使えるようになり、サーバー起動中に中断するブレイクポイントとなります。 Railsアプリケーションの中でよく分からない挙動があったら、トラブルが起こっていそうなコードの近くに差し込むのがコツです。
- RESTfulなルーティング指定  
    「resources :users」とroutes.rbに記載するだけで、以下のuserに対する、取得/新規作成/更新/削除といったRESTfulなルーティング指定を全てしてくれます。

| HTTPリクエスト | URL | アクション | 名前付きルート | 用途 |
| --- | --- | --- | --- | --- |
| `GET` | /users | `index` | `users_path` | すべてのユーザーを一覧するページ |
| `GET` | /users/1 | `show` | `user_path(user)` | 特定のユーザーを表示するページ |
| `GET` | /users/new | `new` | `new_user_path` | ユーザーを新規作成するページ (ユーザー登録) |
| `POST` | /users | `create` | `users_path` | ユーザーを作成するアクション |
| `GET` | /users/1/edit | `edit` | `edit_user_path(user)` | id=`1`のユーザーを編集するページ |
| `PATCH` | /users/1 | `update` | `user_path(user)` | ユーザーを更新するアクション |
| `DELETE` | /users/1 | `destroy` | `user_path(user)` | ユーザーを削除するアクション |

- form\_forヘルパーメソッド  
    <%= form\_for(@user, url: signup\_path) do |f| %>とerbに記載すると、Active Recordのオブジェクト（ここでは@user）を取り込み、そのオブジェクトの属性を使ってフォームを構築します。
- Strong Parameters  
    以下のように定義することで、paramsに、":user"を必須とし、":name"、":email"、":password"、"password\_confirmation"のみ入力を許可するという制約を設けることができます。  
    以前のバージョンのRailsでは、モデル層で_attr\_accessible_メソッドを使うことでマスアサインメント脆弱性を防止していましたが、Rails 4.0以降ではコントローラ層でこのStrong Parametersというテクニックを使うことが推奨されているそうです。また、 これらのパラメータを使いやすくするために、`user_params`という外部メソッドを使うのが慣習になっています。

```
private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
```

- redirect\_to @user = redirect\_to user\_url(@user)

### 独自にやったこと

#### デプロイ時にdb:migrateが自動で流れるよう設定

本番環境へのデプロイ時、毎度手動でdb:migrateを流すのが面倒だったので、HerokuのRelease Phaseという機能を用いて、「rails db:migrate 」を自動で流れるように設定しました。下記のようにProcfileに「release:」から始まる一行を追加するだけです。

<script src="https://gist-it.appspot.com/github/nisioka/RubyOnRailsTutorial/blob/sign-up/Procfile"></script>

## 参考

### 環境

- ruby: 2.3.3
- ruby on rails: 5.1.4
- OS: Windows 10 (64bit)
- IDE: IntelliJ ULTIMATE 2018.1
- リポジトリ：GitHub

https://github.com/nisioka/RubyOnRailsTutorial/tree/static-pages

### リンク

- [第7章 ユーザー登録](https://railstutorial.jp/chapters/sign_up?version=5.1#cha-sign_up)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

---
title: "OracleDBの無効オブジェクトを調査する方法"
date: 2018-07-30
categories: 
  - "information-technology"
tags: 
  - "db"
  - "oracle"
  - "user_objects"
coverImage: "oracle-e1548303868367.jpg"
---

## 背景

DBインスタンスのダンプを取得して移行を行ったのですが、なぜか無効なオブジェクトがいくつか発生してDBが上手く動かなくなってしまったためです。 原因究明はできていませんが、もし同様にDBのオブジェクトが無効になってしまった場合の調査方法と対処方法を以下に示します。

### 環境

バージョン：Oracle Database 12c

OS：Windows（サーバ/クライアントとも）

## 調査方法

下記のSQLを流すだけです。権限も特に不要のはずなので、どのユーザでも大丈夫です。また、SQL\*Plusである必要もありません。

<script src="https://gist.github.com/nisioka/2ad06f3f35f5299f7f8fa8b03c587c5d.js"></script>

SQLDeveloperでの出力例：（オブジェクト名を隠しています） ![](images/2018-07-26_14h17_11.png)

## 対処方法

上記SQLで取得された各オブジェクトに対して再コンパイルを施します。

以下、プロシージャとシノニムの例です。

<script src="https://gist.github.com/nisioka/28233fe611ae452ce677dbfed31ab9bd.js"></script>

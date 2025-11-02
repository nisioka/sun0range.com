---
title: "Sencha Ext JSを使用していて画面が真っ白になってしまったときの対処法"
date: 2018-07-24
categories: 
  - "information-technology"
tags: 
  - "javascript"
  - "senchaextjs"
coverImage: "2017_Kagoshima_sencha_-_second_infusion.jpg"
---

# Sencha Ext JSとは

[Sencha Ext JS](https://www.sencha.com/products/extjs/)はJava Scriptのフレームワークです。JS部品をコンポーネント化して簡単にUIリッチな画面を作成することができます。

ここではこのJSフレームワークを使用している前提で、表題のエラーが発生した場合の対処方法を示します。

## 事象

ブラウザのコンソールにもJSのエラーなどがなく何も表示されない場合。文字通り画面が真っ白になり、頭の中も真っ白になります。。

こちら結構よくハマるのですが、エラーもないので原因調査のとっかかりがなく大変苦労します。

## 原因

この場合は恐らくrequiresの設定を誤っている可能性があります。requiresに自分自身を参照するように書いてしまっていないでしょうか。そうすると無限ループのように参照する形になりますのでいつまで経っても表示されず、結果として真っ白な表示がされているように見えてしまうと考えられます。

NG例です。

<script src="https://gist.github.com/nisioka/bfe80a6214fd282ba112be2a08e5c043.js"></script>

## 対策

単純に上記requiresの不備を探して修正してください。

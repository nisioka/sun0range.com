---
title: "QUERY関数の便利な使い方【Googleスプレッドシート】"
date: 2020-02-04
categories: 
  - "information-technology"
draft: true
---

## 初めに

表計算ソフトを用いてデータ集計などを行うことは多いと思いますが、Googleスプレッドシートの関数で**QUERY()**というものがあり(Excelには無い)、これがとてもとても強力です。これまではsum()なりvlookup()なりで色々と頑張っていたりしましたが、それでは不可能な集計も出来たりします。凄いです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GoogleスプレッドシートのQUERY関数が凄い。データ集計でやりたいことは何でもできると思う。<a href="https://twitter.com/hashtag/%E9%81%8E%E8%A8%80%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%AF%E3%81%9A?src=hash&amp;ref_src=twsrc%5Etfw">#過言ではないはず</a></p>— nisioka (@nisioka55) <a href="https://twitter.com/nisioka55/status/1163310088913690624?ref_src=twsrc%5Etfw">August 19, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

本記事では、QUERY関数を用いた便利な使用方法をご紹介できればと思います。

https://developers.google.com/chart/interactive/docs/querylanguage

## 導入：簡単にQUERY関数の紹介

以下、Googleのヘルプを元にqueryの説明をします。

https://support.google.com/docs/answer/3093343?hl=ja

### 構文

> QUERY(データ, クエリ, \[見出し\])

#### データ

集計に用いるデータを指定します。A1:C5やA:Dといったような範囲指定とします。別のシートを指定したり、IMPORTRANGE関数を使えば別スプレッドシートのファイルを指定することもできます。

#### クエリ

これがQUERY関数の肝です。SQLのように記述でき、複雑な集計を可能にしますが、SQLを知らない人にはやや難易度は高いです。

https://developers.google.com/chart/interactive/docs/querylanguage

#### select句

まず、最終的に出力される項目を列挙します。selectの後にカンマ区切りでスプレッドシートの列記号を記述します。

#### where句

元データから絞り混みを行いたい場合に使用します。その条件が満たされた行が表示されます。例えば、A列の値が10以上の場合には以下のように書きます。

where A>10

比較に使える記号以下のようなものです。

また、各条件はandやorを使用して複数記述できます。

#### group by

#### 見出し

\[省略可\] - データの上部にある見出し行の数です。使用することは少ないと思います。集計によって元の列とは意味が違うと思いますので、クエリの中でLABELを使用するほうが柔軟に表示できます(やや面倒ですが)。

## 最強に便利：Group byを使った集計

## 重複除去

残念ながら、SQLのdistinctにあたるようなものはQUERY関数にはありません。ですがgroup byとmaxやminなどの集約関数を用いれば表現できます。

### 含まない検索

スプレッドシートのほとんどの関数は**一致するもの**を探すのが基本です。ですので、一致しないだとか含まないだとかの集計が難しいのですが、QUERY関数では簡単です。

## 表示時に便利なもの

以下は、最終的に表としてスプレッドシート上に表現する際に便利な構文などです。

### 並び替え(order by)

SQLと同じようにorder by句の後に列名を指定することで、その指定した列をベースとして並び替えした結果が出力されます。カンマ区切りとすることで複数列を指定することもできます。

#### 列表示名を指定する(LABEL)

SQLでのAS句のように、列に別名をつけてヘッダとして表示できます。スプレッドシートで見る時ように。

#### 小技

使っていくなかで見つけた便利な利用法方です。

#### 副次問い合わせのようなこと

クエリ文字列の中にさらにquery()関数を書いて、SQLの副次問い合わせのようなことは出来ません。しかし、出力結果は表ですので、その表を元データとなるようにquery()を使うことができるので、事実上同じことです。一時表として出力するイメージに近いです。

### 動的な条件

query文字列は単なる文字列なので、スプレッドシートのセルと結合できます。なので、あるセルの入力内容と同じものを抽出するなどの使い方が可能です。

#### API呼び出し

スプレッドシートのURLの末尾に「`/gviz/tq?tq=任意のクエリ」を付与することで、データにQUERYをかけた結果を取得できます。`JavaScriptなどからの呼び出しにとても便利です。

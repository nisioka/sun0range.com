---
title: "java.net.SocketException: Connection resetでハマった"
date: 2017-10-30
categories: 
  - "information-technology"
tags: 
  - "java"
  - "ssl"
  - "tls"
coverImage: "Cheap_SSL_Shop.png"
---

# ーはじめにー

JavaでSSL通信を行う実装をしていて、タイトルの通り、「java.net.SocketException: Connection reset」が発生。例外情報が少なすぎて原因が全く分からず、大ハマリしました。。

## 【環境】

- Java：version 1.8.0.130
- サーバサイドSSL/TLS：TLSv1

## 【原因】

上記環境に書いてあることがまさにそのまま原因なのですが、要はJavaとサーバサイドのSSL/TLSの使用プロトコルの差異のせいでした。

## 【対策】

1. サーバのSSL/TLSプロトコルを最新バージョン（TLSv1.2）にするのが理想。v1やv1.1には脆弱性が報告されているため。
2. Java側でSSL/TLSのバージョンを明記する。Java8では、SSL/TLSのデフォルトバージョンはTLSv1.2となり、サーバが対応していなければTLSv1.1となる仕様のよう。

ちなみに今回は"2"の対策をしました。"1"を変えてもらいたかったんですけどね、大人の事情があって色々難しい。

"2"の具体的な対応としては、Javaのシステムプロパティに設定するというものです。

<script src="https://gist.github.com/nisioka/f47dcfe31f273265d3d351f740a64826.js"></script>

 

補足として、明示的に異なるバージョンを指定すると、以下の通り例外が変わります。この例外メッセージならば原因特定が簡単なんですけどね。

> Caused by: javax.net.ssl.SSLHandshakeException: Server chose TLSv1, but that protocol version is not enabled or not supported by the client.

 

# ー終わりにー

この例外、SSLパッケージ内の広い例外のようで、調べても関係ない事象ばかりが出てきて、調査がものすごく大変でした。前述の通り、広い例外なので、同じ例外が発生していたとしても今回の解決策とはならないかもしれませんが、一つの策として書いておきます。

ご参考になれば幸いです。

[![](images/51V6l3panVL._SL160_.jpg)](//af.moshimo.com/af/c/click?a_id=1005417&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4797382228)![](images/impression)

[暗号技術入門 第3版](//af.moshimo.com/af/c/click?a_id=1005417&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4797382228)![](images/impression)

posted with [ヨメレバ](https://yomereba.com)

結城 浩 SBクリエイティブ 2015-08-26

[Amazon](//af.moshimo.com/af/c/click?a_id=1005417&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4797382228)![](images/impression)

[Kindle](//af.moshimo.com/af/c/click?a_id=1005417&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2FB015643CPE%2F)![](images/impression)

[楽天ブックス](//af.moshimo.com/af/c/click?a_id=1005417&p_id=56&pc_id=56&pl_id=637&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F13306240%2F)![](images/impression)

[楽天kobo](//af.moshimo.com/af/c/click?a_id=1005417&p_id=56&pc_id=56&pl_id=637&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fbooks.rakuten.co.jp%2Frk%2F6f0fba9609d4323486d7d4a7d8050482)![](images/impression)

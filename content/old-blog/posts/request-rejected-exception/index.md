---
title: "SpringでRequestRejectedExceptionが発生する原因と対応"
date: 2018-05-30
categories: 
  - "information-technology"
tags: 
  - "java"
  - "requestrejectedexception"
  - "spring"
  - "spring-boot"
  - "spring-security"
coverImage: "program.jpeg"
---

## 事象

Spring-Bootというフレームワークを用いてWebアプリケーションを作成し、ブラウザからアクセスすると、内部で以下の例外が発生しました。

> RequestRejectedException: The request was rejected because the URL was not normalized

こちらが発生するリクエストのURIとしては、「/../」というようなパストラバーサル文字列（パストラバーサルとは簡単にいうとアクセス権のない不正なパスにアクセスしようとする攻撃）や、「//」というような連続スラッシュが含まれている場合です。

## 原因

[こちら](https://docs.spring.io/spring-security/site/docs/5.0.0.RELEASE/reference/htmlsingle/#request-matching)にあるとおり、Spring SecurityにHttpファイアウォールが追加されたことによります。これは、[RFC 2396](https://www.ietf.org/rfc/rfc2396.txt)で定義されている正規のURIではないものを自動的に拒否します。ここでいう正規のURIではない、つまり、不正なURIとして扱われるものは、上記の"事象"で記載した、「/../」というようなパストラバーサル文字列や、「//」というような連続スラッシュのことです。

これらの新バリデーションは以下の"対象バージョン"から追加されたものですので、原因は「対象バージョン以降を使用している」、かつ、「リクエストURIに不正なものが含まれる」です。

### 対象バージョン

| 対象ライブラリ | バージョン |
| --- | --- |
| org.springframework.boot.spring-boot-starter-parent | 1.5.10.RELEASE |
| spring-security-web | 4.2.4.RELEASE |

 

## 対応方法

不正なURIを修正することです。Spring Securityの挙動としては正しいものですし、悪意のある攻撃を防ぐためにも、このバリデーションを無効にしたり、バージョンを下げたりすべきではありません。

htmlのリンクやフロントサイドのフレームワークなどで指定しているURIから、不正な文字列部分を取り除きましょう。

また、ここでやっかいなのは、アプリケーションの全てのURIが正しいものであるかということを確認しなければならないことです。パスパラメータに不正なものも含まれている可能性も踏まえて、かなりのパターンのテストをしなければならなくなるかもしれません。

## 終わりに

私がこれにハマったのは、別の理由でSpring Bootのバージョンを上げたら、後にこのデグレードが見つかりました。。フロントサイドでは動的にURIを生成していたりもするので、単純に文字列検索でgrepして見つけきれるものでもないので、文字通り全てのURIを打鍵テストしなくてはならなくなり、セキュリティ上しかたないものではありますが、かなり大変な作業です。。

### 参考

- [https://stackoverflow.com/questions/48453980/spring-5-0-3-requestrejectedexception-the-request-was-rejected-because-the-url](https://stackoverflow.com/questions/48453980/spring-5-0-3-requestrejectedexception-the-request-was-rejected-because-the-url)
- [https://github.com/spring-projects/spring-security/issues/5007](https://github.com/spring-projects/spring-security/issues/5007)
- [https://github.com/spring-projects/spring-security/issues/5044](https://github.com/spring-projects/spring-security/issues/5044)

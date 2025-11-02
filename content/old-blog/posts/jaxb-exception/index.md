---
title: "ClassNotFoundException: JAXBExceptionの原因"
date: 2018-05-13
categories: 
  - "information-technology"
tags: 
  - "classnotfoundexception"
  - "exception"
  - "java"
  - "noclassdeffounderror"
coverImage: "program.jpeg"
---

## 事象

Javaを実行時に以下のような例外(Exception)が発生する場合があります。

> java.lang.ClassNotFoundException: javax.xml.bind.JAXBException
> 
> java.lang.NoClassDefFoundError: javax/xml/bind/JAXBException

## 原因

十中八九、Javaのバージョンを9以降にアップデートしたことによるものと思われます。Java9ではモジュール構成の見直しが行われ、上記のJAXBExceptionが標準のクラスパスから外れました（Java EEのAPIと見なされるようになりました）。故に、もし書いたコードや使用しているライブラリ/ツールなどでJAXBが使われているとこの例外に遭遇することになります。

## 対応方法

1. （暫定的）Javaのバージョンを下げる。 対応と言える対応ではないですが、簡単確実です。もし使用ライブラリが対応していなくてということであれば、しばらくJava8でしのいで、対応されるのを待つというのは妥当な策だと思います。 私もまさにこの状況に近く、JShellを使いたくてJava9にバージョンアップして遊んでいたらこの例外が発生したので、バージョンを元に戻して対応しました。 ちなみに、簡単にJavaのバージョンを切り替えられるバッチについて記事を書いたので、こちらもよろしければ御覧ください。 [Javaのバージョンを動的に変更するバッチを作りました](/information-technology/switching-java-version)
2. （やや暫定的）Javaの起動引数でパスを追加する Javaの起動時に、以下のオプションを追加することで、JAXBを含むモジュールをクラスパスに加えることができます。
    
    > \--add-modules java.xml.bind
    
    少しこのオプションについて説明します。先に説明したとおりJava9では標準のクラスパスから除かれましたが、JDK内には残っています。ちなみに、クラスパス外のモジュール群は以下の通りです。
    
    > java.activation java.corba java.transaction java.xml.bind ← ここにJAXBのAPIが含まれます。 java.xml.ws java.xml.ws.annotation
    
3. （本格対応）依存関係として定義する これらAPIは、"@Deprecated(forRemoval=true)"とマークされているため、現状はJDKに含まれていますが、今後のJavaバージョンアップで削除される可能性があります。ですので、mavenやgradle等を用いてこれらの依存関係を別途定義しましょう。幸い、これらのAPIはmavenリポジトリで提供されていますので以下に例示します。ちなみに、最新バージョン（2018年5月）で記載していますが、Java6では"2.0"、Java7では"2.2.3"、Java8では"2.2.8"のバージョンが使われていたらしいので、これらに合わせるというやり方もありだと思います。 maven定義例： 
    
    <script src="https://gist.github.com/nisioka/8fe9f4eabff1f3bafe8bc6408745e0d1.js"></script>
    
    gradle定義例：
    
    <script src="https://gist.github.com/nisioka/d279d539497ff9c3d938bffbef3b9996.js"></script>
    

## 終わりに

問題は解決できたでしょうか？これからの、Java8のサポート切れに向けてのバージョンアップでこうした問題に直面することが出てくるかと思います。Java8からJava9以降への移行は結構問題が起きやすいとのことなので注意が必要です（ダジャレが含まれてますが真面目な話）。

本記事は、以下の参考URLを日本語訳したものがベースであり、それに一部加筆修正しています。

### 参考：

- [stack overflow](https://stackoverflow.com/questions/43574426/how-to-resolve-java-lang-noclassdeffounderror-javax-xml-bind-jaxbexception-in-j)

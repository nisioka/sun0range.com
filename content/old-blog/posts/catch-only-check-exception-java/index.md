---
title: "Javaで検査例外だけをcatchするには？"
date: 2019-02-20
categories: 
  - "information-technology"
tags: 
  - "exception"
  - "java"
coverImage: "Java.png"
---

乱暴に「catch (Exception e)」で全ての例外を捕捉して処理しようとしたらfindbugsさんに怒られました。[参考](https://spotbugs.readthedocs.io/ja/latest/bugDescriptions.html#rec-rec-catch-exception)  
これは、意図せずに実行時例外（非検査例外）を捕捉してしまうと、潜在的なバグがあった時にそれが隠れてしまうことが懸念されるからです。実行時例外も検査例外と同様に扱いたいというケースはないこともないでしょうが、危険性のほうが大きいと思われます。  

### 実装方法

下記コードのように、RuntimeExceptionとExceptionの複数のcatch句を書き、RuntimeExceptionでは例外を再throwします（必要に応じてログ出力など任意の処理も行います）。

<script src="https://gist.github.com/nisioka/c1983c123321306bdbc8c706a472d113.js"></script>

実行時例外はRuntimeExceptionとして簡単に区別できますが、検査例外という親クラスがないので、このような書き方をする必要があります。

### 参考

[https://spotbugs.readthedocs.io/ja/latest/bugDescriptions.html#rec-rec-catch-exception](https://spotbugs.readthedocs.io/ja/latest/bugDescriptions.html#rec-rec-catch-exception)

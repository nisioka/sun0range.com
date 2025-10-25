---
title: "Ruby on Rails チュートリアルをやってみた【第4章】"
date: 2019-03-03
categories: 
  - "information-technology"
tags: 
  - "ruby"
  - "ruby-on-rails"
coverImage: "Ruby_On_Rails_Logo.svg.png"
---

## 第4章の実績

[第4章 Rails風味のRuby](https://railstutorial.jp/chapters/rails_flavored_ruby?version=5.1) を実施しました。  
"風味"という表現がいまいちどういうことか分かりにくいのですが、要はRailsで使用する上で必要なRubyの記述方法を教えてくれる章となっていました。  
実施時間: 1.5時間

### 学べたこと

- 静的ページの作成  
    Webページの基本が知れる内容でした。ブラウザからリクエストを受け取り、HTMLを返却するとブラウザで表示されるという。
- Javaと比べて、Rubyのシンプルな書きやすさ

#### Javaエンジニアが見るRubyの良いところ

- 式展開による埋め込みの容易さ：#{変数名}とするだけで簡単に埋め込みができる。
- nilというオブジェクト："無"を表せるオブジェクトとして定義されており、JavaにおけるNullとは異なり、NullPointerExceptionが頻発したりしない。
- メソッド引数にデフォルト値が定義できる。
- symbol-to-procはJavaで言うメソッド参照： 「%w\[A B C\].map { |char| char.downcase }」は「%w\[A B C\].map(&:downcase)」こう書ける。
- 配列の末尾から指定を"-"を用いて表せる：array\[-1\]←これで末尾を表せるのはシンプルだし直感的！
- Rubyでは組み込みクラスですら内部を見たり修正したりできる ：Stringクラスにメソッドを追加したりなど。これは強力な仕様ですが、強力すぎるので、使い所はよくよく考える必要がありそうです。

## 参考

### リンク

- [第4章 Rails風味のRuby](https://railstutorial.jp/chapters/rails_flavored_ruby?version=5.1)
- [GitHubにpushしようとしたら「error:1407742E:SSL」エラーが](http://localhost/information-technology/error-1407742e-ssl)

【スポンサードリンク】

[![](images/000000015158.jpg)](//af.moshimo.com/af/c/click?a_id=1184149&p_id=1024&pc_id=1450&pl_id=15158&guid=ON)

[![](images/000000021425.jpg)](//af.moshimo.com/af/c/click?a_id=1124058&p_id=936&pc_id=1196&pl_id=21425&guid=ON)

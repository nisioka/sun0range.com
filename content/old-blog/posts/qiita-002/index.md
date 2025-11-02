---
title: "MessageSource.getMessage()でデフォルトメッセージの思わぬ挙動"
date: 2018-05-07
categories: 
  - "information-technology"
tags: 
  - "java"
  - "spring"
  - "spring-boot"
coverImage: "spring-cleaning.jpg"
---

Qiitaに記事を書きました。

[org.springframework.context.MessageSource.getMessage()でデフォルトメッセージの思わぬ挙動](https://qiita.com/nisioka/items/c21859c4d17fde473bb6)

spring-bootでアプリケーションを作っていて、単純な多言語化コードだったのですが、思わぬ不具合に遭遇してしまいました。

原因は分かりましたが、調査にひどく時間を盗られました。Javadocに書かれている仕様の通りに実装していたのに、まさか暗黙的な初期設定が"よけいなお世話"な挙動になっていました。初期設定としてはイケてないと思うんですけどね、使用者にとって直感的でなく。まさに自分がハマっていますしね。。

Qiitaの末尾にも書いていますが、他国にデプロイすると発覚する不具合になりかねないので、注意が必要だと思いました。

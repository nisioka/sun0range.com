---
title: "【オンライン】 JJUGナイトセミナー「開発環境の最前線」"
date: 2022-01-27
categories: 
  - "event-report"
tags: 
  - "ide"
  - "intellij"
  - "java"
  - "jjug"
  - "visual-studio-code"
coverImage: "pc.jpg"
---

[JJUGナイトセミナー「開発環境の最前線」](https://jjug.doorkeeper.jp/events/131944)の簡単なまとめです。

## VSCode で Java アプリの開発ができるってご存じですか？

> VSCode はエディタですが、VSCode に Java 開発用のプラグインをインストールすると Java アプリケーションの開発ができます。利用者数は去年世界で 100 万人を突破し徐々に利用者も増えてきています。  
> 本セッションでは VSCode for Java をデモを交えながらご紹介するほか、GitHub 連携や GitHub Codespaces 連携など VSCode でのアプリケーション開発で便利な周辺の便利機能もあわせてご紹介します。  
> ペアプロやモブプロにも使える便利機能をどうぞご覧ください。
> 
> **寺田 佳央** ([@yoshioterada](https://twitter.com/yoshioterada)) Microsoft Corporation

## クラウドネイティブ化するJetBrainsの開発環境

> アプリケーション開発はローカル環境で閉じているものではありません。  
> 近年、コード共有やコードレビュー、継続的インテグレーションといったサービスとの連携が重要になってきています。  
> IntelliJ IDEAのGitHubやSpaceといったクラウドサービスとの連携機能や、JetBrainsの最新エディタであるFleetをご紹介いたします。
> 
> **山本ユースケ** ([@yusuke](https://twitter.com/yusuke)) 株式会社サムライズム

## VSCode vs JetBrains

勝手ながら、今回のオンラインセッションで紹介されていたことを中心に両者の強みをしてみました。

|  | VSCode | JetBrains |
| --- | --- | --- |
| 対応JDK | Java11以降 | Java8以降(笑うところ) |
| CI/CD連携 | 言及無し | [TeamCity](https://www.jetbrains.com/ja-jp/teamcity/)はオンプレ3エージェントまで無料。   IntellIj IDEAと連携してIDE上でCI結果が見れる。 |
| Github連携 | 言及無し | GithubのIssueやPRの操作をIDE上でできる。 |
| クラウドIDE | ブラウザのGithub上で   VSCodeを動かすことができる。 | [fleet](https://www.jetbrains.com/ja-jp/fleet/)   軽量IDE。JetBrains spaceの環境を呼び出す。 |
| クラウド開発環境 | [Github Codespa](https://github.co.jp/features/codespaces)[ces](https://github.co.jp/features/codespaces "ces")   ローカルのVSCodeでの同期も可能。 | [JetBrains space](https://www.jetbrains.com/ja-jp/space/) |

### コメント

youtubeのアーカイブ動画が公開されたら追記します。

ちなみに私はJetBrains IntelliJ Ultimate の愛用者です。

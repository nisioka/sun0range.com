---
title: "jira-pythonでOAuth danceする方法"
date: 2019-11-05
categories: 
  - "information-technology"
draft: true
---

pythonを使用してjiraのAPIに接続する際、その認証方法としてOAuthも使用することができます。しかし、その方法が[公式ドキュメント](https://jira.readthedocs.io/en/latest/index.html)に詳しく書かれていないので、ここに残します。

### 前提

- pythonがインストールされていること
- jira-pythonがインストールされていること  
    ※「pip install jira-python」でインストールでき、その中に今回使用する「jirashell」も同梱されています。
- opensslコマンドがインストールされていること

手順

公開鍵の生成

OAuth通信には公開鍵が必要なので、まずはその作成です。

### 参考

https://jira.readthedocs.io/en/latest/index.html

https://www.redradishtech.com/display/KB/How+to+write+a+Python+script+authenticating+with+Jira+via+OAuth

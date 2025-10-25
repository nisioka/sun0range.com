---
title: "CloudFrontを用いた任意ドメインでのSSL化"
categories: 
  - "information-technology"
draft: true
---

タイトルの通り、AWSのCloud Frontを用いてアプリケーションやサイトを構築するという場合の、ドメイン設定並びにSSL/TLS対応といった一連のやりかたを記します。

必要なもの：

- ドメインを保有していること
- AWSのアカウントを保持している事
- Cloud Front
- Certification Manager
- Route53

## サーバ証明書の準備

サーバ証明書の登録をAWS Certification Manager(ACM)で行います。

最初から注意ポイントですが、これだけはAWSの北米リージョンである必要があります。

![](images/image-11-7-1024x487.png)

## 参考

https://qiita.com/nakanishi03/items/3a514026acc7abe25977

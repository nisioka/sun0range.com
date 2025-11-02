---
title: "CloudFront"
date: 2021-03-23
categories: 
  - "glossary"
tags: 
  - "aws"
  - "cloudfront"
coverImage: "aws-cloudfront.png"
---

CloudFrontとは、AWSで提供されているContent Delivery Network (CDN)サービスです。Amazonが世界中に持っているエッジサーバと呼ばれるキャッシュサーバに分散してコンテンツを保持することで世界のどこにいても高速で配信してくれます。

セキュリティも高く、DDoS攻撃等も含めた多数の攻撃からの保護もしてくれます。当然ですが、[AWS Shield](https://aws.amazon.com/shield/)やRoute 53等の他のAWSサービスとの親和性も高いです。

## 料金

主に、データ転送した容量(GB単位)と、Http(s)のリクエスト数に対して課金されます。

[料金ページ](https://aws.amazon.com/jp/cloudfront/pricing/?nc=sn&loc=3)

## 参考

[公式サイト](https://aws.amazon.com/jp/cloudfront/?nc=sn&loc=0)

http://localhost/glossary/amazon-web-service-aws

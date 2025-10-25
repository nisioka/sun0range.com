---
title: "【AWS】S3の画像をCloudFrontから配信する【wordpress】"
categories: 
  - "information-technology"
draft: true
---

メディアファイル（画像や動画）をAmazon Web Service (AWS)\[fn\]Amazonが手掛けるクラウドサービス。  
[http://localhost/glossary/amazon-web-service-aws](http://localhost/glossary/amazon-web-service-aws)\[/fn\]のSimple Storage Service (S3)に置いて、それをCloudFront\[fn\]AWSのCDNサービス。  
[http://localhost/glossary/aws-cloudfront](http://localhost/glossary/aws-cloudfront)\[/fn\]からCDN (Content Delivery Network)として高速配信できるようにします。ここでは、「[WP Offload Media Lite for Amazon S3, DigitalOcean Spaces, and Google Cloud Storage](https://wordpress.org/plugins/amazon-s3-and-cloudfront/)」というwordpressプラグインを使って、S3への自動配置、CloudFrontとの連携も行おうと思います。

---
title: AWS SNS 文字数チェッカー
date: "2026-01-12"
dateModified: "2026-01-12"
description: "AWS SNSでSMSを送信する際の文字数とメッセージ分割数をチェックするツールです。GSM 03.38とUCS-2エンコーディングに対応しています。"
featuredImagePath: "featured/logo-amazon-sns.webp"
nodeType: blog
category: information-technology
tags: ["AWS", "SMS", "SNS", "ツール"]
---

AWS SNS（Simple Notification Service）でSMSを送信する際、文字数によってメッセージが分割されることがあります。このツールを使って、送信前に文字数と分割数を確認できます。

<iframe src="/tools/aws-sms-checker" width="100%" height="535" frameborder="0" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>

## 使い方

1. テキストエリアにSMSメッセージを入力します。
2. リアルタイムで以下の情報が表示されます：
   - 文字数
   - エンコーディング（GSM 03.38 または UCS-2）
   - メッセージ分割数
   - 残り文字数

## エンコーディングについて

### GSM 03.38 (7-bit)
- 半角英数字、一部の記号、ヨーロッパ文字が対象
- 1通あたり最大160文字
- 分割時は1通あたり153文字（ヘッダー用に7文字使用）

### UCS-2 (16-bit)
- 日本語、絵文字、その他のUnicode文字が対象
- 1通あたり最大70文字
- 分割時は1通あたり67文字（ヘッダー用に3文字使用）

## 参考リンク

- [Amazon SNS とは](https://docs.aws.amazon.com/ja_jp/sns/latest/dg/welcome.html)

---
title: "AsciiDoc記法の注意点"
date: 2019-06-20
categories: 
  - "information-technology"
tags: 
  - "asciidoc"
---

すごく細かな話です。  
AsciiDoc文書では、アンカーリンクで文書内のリンクを貼ることができますが、そのアンカーリンクの文言に使用できない記号があります。そういうのはたいてい半角記号だったりするのですが、 全角でもダメなものもあります。  
ここで挙げる文字はリンクの文言には避けて使わなければなりません。

使えない記号群

- ※
- 【】
- 「」
- ()
- ：
- スペース

意外と使える記号

- \_
- ＿

### 確認環境

- Asciidoctor 2.0.9
- Windows 10

### 例

<script src="https://gist.github.com/nisioka/7ac74601d5501bf19e3468378438f30f.js"></script>

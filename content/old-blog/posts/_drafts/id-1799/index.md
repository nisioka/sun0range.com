---
title: "【書評】現場で使えるRuby on Rails 5速習実践ガイド"
categories: 
  - "information-technology"
draft: true
---

## 読めると便利！Rubyっぽい書き方

### nilガード

number ||= 10  
上記コードは、「もしもnumberがあればnumber、なければnumberに10を代入した上でのnumber」というおうな意味になります。

### ぼっち演算子 &.

正式名称「safe na」。&.という演算子を使ってメソッドを呼び出すと、レシーバがnilであった場合でもエラーが発生しなくなります。

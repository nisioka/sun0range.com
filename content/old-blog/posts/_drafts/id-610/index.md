---
title: "git-svn移行"
categories: 
  - "information-technology"
draft: true
---

# やってること

## 実装、コマンドのメモ

git svn init --prefix=svn/ -T https://svn.diva-america.com/svn/dsx/newdx3/trunk -b https://svn.diva-america.com/svn/dsx/newdx3/branches/hotfix/ -t https://svn.diva-america.com/svn/dsx/newdx3/tags

git checkout -b "" "svn/"

git tag "" "svn/tags/"

## ハマった内容

メモリエラー的なので落ちる  
→.git/configを編集する必要がある  
https://stackoverflow.com/questions/32465621/git-svn-clone-malformed-index-info-error  
ブランチがうまいこと反映されない。

https://qiita.com/mookjp/items/9ae307e15d17796c1295

https://qiita.com/mookjp/items/9ae307e15d17796c1295

## 参考にした記事・ドキュメント

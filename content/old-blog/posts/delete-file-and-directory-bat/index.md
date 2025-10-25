---
title: "指定した名前のファイルとディレクトリを再帰的に削除するバッチ"
date: 2019-06-19
categories: 
  - "information-technology"
tags: 
  - "windows"
  - "便利ツール"
---

ちょっとしたWindowsバッチを作りましたのでご紹介します。  
背景としてはasciidoctorというエディタを使っていて、結構たくさんの中間ファイルができていたのでそれを削除したくて作りました。同様にして、一定のルールで作られる一時ファイルの削除に使用できると思います。  
**※自己責任でご使用ください。**

### 使用方法

以下のリンクからzipファイルをダウンロードして、「DeleteFileAndDirectory.bat」を編集の上、実行してください。

https://github.com/nisioka/CommandPromptBat/archive/master.zip

### 説明

<script src="https://gist.github.com/nisioka/41a892b7a9af7184433b80380e1a3297.js"></script>

「 set TARGET\_FILE= 」と「set TARGET\_DIRECTORY= 」の部分をそれぞれ削除したいファイル名（ワイルドカード\*指定可能）と削除したいディレクトリ名（固定の完全一致名称）に適宜変更してください。

そして、削除対象としたい配下のディレクトリに置き実行すれば、その配下のディレクトリが再帰的に探索されて対象のファイルを削除します。

#### 参考URL

http://d.hatena.ne.jp/IIJIMAS/20101101/1288537836

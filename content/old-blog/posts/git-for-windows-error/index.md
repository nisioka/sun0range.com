---
title: "Git for Windowsでgitコマンドが何故か動かない"
date: 2019-01-07
categories: 
  - "information-technology"
tags: 
  - "error"
  - "git"
  - "git-for-windows"
coverImage: "Git_icon.svg-e1546851811534.png"
---

## 事象

gitコマンド（例えば「git svn fetch」）を実行すると、ずっと応答が返ってこないという事が起こりました。

![](images/2019-01-07_17h06_20.png)

### 補足

タスクマネージャを見てみると、「perl.exe」なるタスクがgitコマンド実行後に内部的に呼び出されて起動されているようで、これが高い負荷で張り付いたまま終了していなかった。どうやら無限ループしているような挙動に見える。

![](images/2019-01-07_17h24_45.png)

## 環境

- Git for Windows：version-2.20.1(64bit)
- OS：Windows 8.1 Pro

## 対応

下記に詳細は示すが、原因は不明であった。ただし、Git for Windowsをダウングレードすると問題なく動作するようになった。

- version:Git-2.20.1-64-bit → ×
- version:Git-2.20.1-32-bit → ×
- version:Git-2.9.0-64-bit → ×
- version:Git-2.6.4-64-bit → ○

## 原因

原因は残念ながら分かっていません。調査/試したことは以下の通りです。

- 64bit版、32bit版をそれぞれクリーンインストール → 変化なし。
- Process Monitorでプロセス処理の確認。 → 「BUFFER OVERFLOW」や「EAS NOT SUPPORTED」などのそれっぽい結果が出ていたが関係なかった模様。頻発するし、正常に動いている時も発生していた。ただし、無限ループはしていなさそうなことはわかった。ある程度の時間で出力されなくなったため。  
    https://technet.microsoft.com/ja-jp/sysinternals/processmonitor.aspx
- .git/configの見直し。 → 影響ありそうなパラメータも特になく、適当に変化させてみたが特別挙動は変わらなかった。

## 終わりに

非常に気持ちの悪い結果に。。  
何かしらのエラーログが出るわけでもないので、原因調査はお手上げに近いです。ソースコードを追っていくしかなさそうな気がするので、今後同じようにハマってどうしようもなさそうであれば調査します。

## 参考URL

https://gitforwindows.org/

https://github.com/git-for-windows/git

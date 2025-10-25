---
title: "Githubのプロフィールページにメトリクスを表示して格好良くする(lowlighter/metrics)"
categories: 
  - "information-technology"
draft: true
---

Githubのプロフィールページは自分でカスタマイズできますが、そこに統計情報で得られたデータをグラフィカルに表示して格好良く見せることができます。

https://github.com/nisioka

ここで公開されているものの使い方の説明になります。 [https://github.com/lowlighter/metrics](https://github.com/lowlighter/metrics)  
詳細や最新の情報はリンク先の英語の説明を読んでいただければと思いますが、本記事では日本語訳して補足やサンプル紹介も交えながら説明していきます。

## 大まかな流れ

今回使うツールは、githubのmetricsデータを収集して画像を生成するというのが基本の機能です。プラグインという形で様々なデータを様々に出力でき、難しいことはなくただ好みのパラメータを記述するというものになります。

あとは、どこで実行させるか、いつどのようなタイミングで生成するようにしたいかでやり方が少し変わります。今回は無料で（github actionという機能だけで）、定期的に最新の情報を取ってくるようにしたいと思います。

## 4通りの生成方法

- [⚙️GitHub Actionを利用する（作業時間約10分）](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/action.md)
    - ✔️すべての機能
    - ✔️高可用性（ダウンタイムなし）
    - ➖手間が少しかかります
    - **本記事ではこの方法を説明します。**
- [💕共有インスタンスの使用（約1分）](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/shared.md)
    - ✔️簡単に構成およびプレビュー可能
    - ➖制限された機能_（計算集約型の機能は無効になっています）_
- [🏗️Webインスタンスのデプロイ（約20分）](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/web.md)
    - ✔️別の共有インスタンスを作成する
    - ➖sysadminknowlegdeが必要です
- [🐳Dockerでコマンドラインを使用する（約2分）](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/docker.md)
    - ✔️1度だけ画像出力で良い場合に適しています
    - ➖最新情報を反映させたい場合、都度実行する必要があります

https://github.com/lowlighter/metrics/blob/master/source/plugins/core/README.md#%EF%B8%8F-available-options

https://github.com/lowlighter/metrics

https://github.com/lowlighter/metrics/blob/master/source/plugins/isocalendar/README.md

https://github.com/lowlighter/metrics/blob/master/source/plugins/habits/README.md

https://github.com/lowlighter/metrics/blob/master/source/plugins/followup/README.md

https://github.com/lowlighter/metrics/blob/master/source/plugins/activity/README.md

https://github.com/lowlighter/metrics/blob/master/source/plugins/achievements/README.md

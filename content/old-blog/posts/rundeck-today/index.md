---
title: "RUNDECKで現在日付をパラメータに渡す方法"
date: 2019-07-03
categories: 
  - "information-technology"
tags: 
  - "rundeck"
---

### 結論

表題の記載方法は以下です。

```
${DATE(±増減日数):format}

# 例
${DATE:YYYY/MM/dd} →2019/07/01(今日の日付)
${DATE+3:MM-dd-YYYY} →07-04-2019(3日後の日付)
```

### 説明

RUNDECKとはジョブスケジューラで、任意のジョブを定期的に実行するように管理できるソフトウエアです。「すごいcron」などとも言われています。

そのジョブにパラメータを外部から渡せますが、基本的に固定値で、"実行時の日付"といった動的な値をオプション値へ指定する方法が記載されていません。[ここ](https://github.com/rundeck/rundeck/issues/2527)にissueが挙がっていますが、機能自体はあるのですがドキュメント化されていないようです（2019/07/03現在）。

結論にも書いた通りですが、日付に関しては特殊変数として記載が可能です。これで当日や前後の日付、時刻を任意のフォーマットで渡せます。

```
${DATE(±増減日数):format}
```

(±増減日数)には、任意で加算したい日数（過去日はマイナス）を指定します。明日なら+1、昨日なら-1、当日ならば指定は不要です。

formatには、[SimpleDateFormatter](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) にある通りの書式指定が可能です。

#### 参考URL

[https://github.com/rundeck/rundeck/issues/2527](https://github.com/rundeck/rundeck/issues/2527)

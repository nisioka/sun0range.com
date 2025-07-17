---
title: AIコーディングツールをエンジニア目線で比較【料金・IDE連携】
date: "2025-07-05"
dateModified: "2025-07-17"
description: "ChatGPT, Gemini, Claude, GitHub Copilot, JetBrains Junieを、料金、無料枠、IDE連携の観点から比較。"
featuredImagePath: "featured/ai-cording.webp"
nodeType: blog
category: 技術
tags: ["AI", "IDE", "ChatGPT", "Gemini", "Claude", "GitHub Copilot", "JetBrains"]
---

## TL;DR (結論から言うと)

**今、個人開発者が無料で始めるなら「[Gemini CLI](https://ai.google.dev/docs/gemini_cli)」が圧倒的にお得です。**

Googleアカウントでログインするだけで、高性能な`Gemini 2.5 Pro`モデルを1日1,000リクエストまで無料で利用できます。ターミナル上で直接、コード生成やリファクタリング、エラー分析などが可能です。試すどころか常用できるレベルの圧倒的無料枠。

--- 

## はじめに

AIの進化は凄まじく、自律的にタスクをこなす「AIエージェント」へと進化し、開発現場に欠かせない存在となりつつあります。

そこでこの記事では、主要なAIコーディング支援ツールを「料金（特に無料枠）」と「IDEとの親和性」という、開発者にとって重要だと思う2つの観点から比較します。

ただし、最も重要であろうコード品質、要は賢さというような観点は比較が難しいので除いています。

**この記事について**

2025年7月時点の情報を基にしています。この記事は適宜更新していくつもりですが、最新の公式情報をご確認いただくことをお勧めします。

## AIコーディングツール比較表

| AIツール | 開発元                | 無料枠 | 有料プラン（個人）          | IDE連携 | 強み                              |
| :--- |:-------------------| :--- |:-------------------| :--- |:--------------------------------|
| **[Gemini](https://ai.google.dev/)** | Google             | **1日1,000リクエスト** (Gemini 2.5 Pro) | (APIは従量課金)         | ターミナル (CLI), VS Code, JetBrains | **圧倒的な無料枠**。CLIで完結する手軽さ。        |
| **[Claude](https://claude.ai/)** | Anthropic          | 利用制限あり | **$20/月** (Pro)    | VS Code (公式) | **長文読解の鬼**。大規模コードベースの理解。        |
| **[JetBrains AI](https://www.jetbrains.com/ai-assistant/)** | JetBrains          | IDEライセンスに付属 (少量) | **$10/月** (AI Pro) | JetBrains IDEs | **IDEネイティブ**。プロジェクト全体のコンテキスト理解。 |
| **[GitHub Copilot](https://github.com/features/copilot)** | GitHub             | 学生/OSSメンテナーは無料 | **$10/月**          | VS Code, JetBrains IDEs, Vim/Neovim | **万能ペアプログラマー**。各エディタとの豊富な統合。    |
| **[ChatGPT](https://chatgpt.com/)** | OpenAI             | メッセージ数制限あり | **$20/月** (Plus)   | VS Code (公式/サードパーティ) | **万能な相談役**。自然言語での指示に強い。         |
| **[Kiro](https://kiro.dev/)** | Amazon Web Service | **無料 (プレビュー版)** | **$19/月** (Pro)  | **スタンドアロンIDE** (VS Code互換) | **仕様駆動開発**。自律的なタスク実行。 |

## 各ツールの詳細

### 1. [Google Gemini](https://ai.google.dev/) - 無料で始めるなら現最強

- **IDE連携:** Google公式の「Gemini Code Assist」プラグインがVS CodeやJetBrains IDEs向けに提供されています。しかし、特筆すべきは「[Gemini CLI](https://ai.google.dev/docs/gemini_cli)」です。ターミナルから直接実行でき、IDEに縛られない軽快な開発が可能。
- **料金/無料枠:** CLIはGoogleアカウントでログインすれば**1日1,000リクエストまで無料**。これは他の追随を許さない圧倒的な量です。
- **所感:**
    - まず無料でAI支援を試したいすべての人にオススメ。
    - ゆくゆく課金が必要になると予想されるので、今のうちに使い倒そう。

### 2. [Claude](https://claude.ai/)

- **IDE連携:** Anthropic公式のVS Code拡張機能が提供されています。
- **料金/無料枠:** 無料枠はありますが、AIエージェントのClaude Codeを使うならProプラン（$20/月）以上が必要。
- **所感:**
  - 料金的に高めなんですが、コードの品質は一番高いように感じます。
  - 今はGemini CLIの無料枠で行くか、リッチにMaxプランでぶん回すかの2極化なユースが多い気がします。
  - ビジネスユースのためにMaxプランでガンガン使うのがコスパ・タイパ高いと思います。

### 3. [JetBrains AI (Junie)](https://www.jetbrains.com/ai-assistant/)

- **IDE連携:** JetBrains IDEsのためだけに作られたAIエージェント。IDEが持つプロジェクト全体のインデックスや構造理解をフル活用するため、他のツールとは一線を画すコンテキスト認識能力を持ちます。「このクラスにCRUD処理を追加して」といった抽象的な指示で、テストまで自律的に実行します。
- **料金/無料枠:** IDEライセンスに無料枠が付属しますが、本格的に使うならAI Proプラン（$10/月）が必要です。
- **所感:**
    - 私はIntelliJ IDEAなどJetBrains製IDEのユーザですが、IDEとしっかり親和性のあるAIエージェントになっていて使い心地は良いです。
    - 体感ですが、残念ながら無料枠はすぐなくなり、Proプランも本格的に使うには物足りなさがあります。
    - 今バグがあって、All Products PackからIDE licenseに変えた人はAIプランの30日無料期間が過ぎた後Freeプランが使えない。 https://youtrack.jetbrains.com/issue/LLM-17817

### 4. [GitHub Copilot](https://github.com/features/copilot)

- **IDE連携:** VS Codeとの連携は基本です。JetBrains IDEsやVim/Neovim向けのプラグインもあり。Githubとの統合も強力で、GithubのWebサイトから呼び出したりという使い方も便利。
- **料金/無料枠:** 月額$10。学生やOSSメンテナーは無料で利用できるそう。
- **所感:**
  - Github & VS Codeをメインで使っている開発者はオススメ。
  - 無難に安定感がある印象。

### 5. [ChatGPT](https://chatgpt.com/)

- **IDE連携:** OpenAI公式のVS Code拡張機能がありますが、Web UIの完成度も高いため、ブラウザとIDEを並べて使うスタイルが主流です。
- **料金/無料枠:** 無料でも利用できますが、最新モデルを快適に使うならPlusプラン（$20/月）が必要です。
- **所感:**
    - コーディングよりもどちらかと言えば自然言語処理系が強力な印象。
    - なので上流工程の、実装方針の相談や要件・設計などのドキュメンテーションに使うのがオススメ。

### 6. [Kiro](https://kiro.dev/)

- **IDE連携:** Kiroはそれ自体がAIネイティブなスタンドアロンのIDEです。VS Codeの拡張機能や設定との互換性も備えています。
- **料金/無料枠:** 現在はプレビュー版として無料で提供されており、ウェイトリストに登録することで利用できます。
- **所感:**
    - 「仕様駆動開発」を掲げ、要件定義→システム設計→タスク分割→実装までを自律的に行うことを目指しています。
    - 特に要件定義や設計の上流工程の流れがフレームワークのようになっていて、雰囲気コーディングにレールを敷いてくれている感があり、全体的な精度向上を感じる。
    - 現状、プレビュー版故不安定さがある。実際通信エラーが頻発し、Retryを押すだけなのですが実用に耐えかねるレベル。Claude Sonnet 3.7に落とすとマシになるらしい。Claude Sonnet 3.7

## まとめ

AIコーディングツールを選ぶ際は、単体の性能だけでなく「普段使っているIDEでいかに良い開発フローになるか」という視点が非常に重要です。

1.  まずは`Gemini CLI`を試す: 無料で始められIDEに依存しないため、AI支援の第一歩として最適。
2.  IDE連携を重視するなら:
    - VS Codeユーザー → `GitHub Copilot`
    - JetBrains IDEsユーザー → `JetBrains AI`
3.  より高度な利用や次世代の開発体験を求めるなら: `ChatGPT`や`Claude`の併用、あるいは`Kiro`のような新しいAI IDEを試す。

これが今現在の、賢いAIコーディングツールの選び方かと思います。ぜひ、最適な「AIの相棒」を見つけて、開発効率を飛躍させてください。
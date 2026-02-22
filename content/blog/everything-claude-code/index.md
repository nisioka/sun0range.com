---
title: "Claude Codeの設定を一括強化できるプラグイン「Everything Claude Code」の紹介とカスタマイズ"
date: "2026-02-11"
dateModified: "2026-02-11"
description: "Anthropicハッカソン優勝者が公開したClaude Code設定集「Everything Claude Code」の機能紹介と、フォークして独自カスタマイズした内容を解説。エージェント、スキル、コマンド、フック、ルール、MCP設定を一括導入できる。"
featuredImagePath: "featured/ai-cording.webp"
nodeType: blog
category: 技術
tags: ["Claude Code", "AI", "プラグイン", "MCP"]
---

## はじめに

**[Everything Claude Code](https://github.com/affaanmustafa/everything-claude-code)**（以下 ECC）は、Anthropic x Forum Ventures ハッカソンで優勝した [Affaan Mustafa氏](https://x.com/affaanmustafa) が、10ヶ月以上の実プロダクト開発を通じて磨き上げた Claude Code 設定の集大成で、エージェント・スキル・コマンド・フック・ルール・MCP設定を一括で導入できます。

この記事では、ECC のオリジナル機能を紹介した上で、私がフォークして独自にカスタマイズした内容と、各自がどのようにカスタマイズしていけるかを解説します。

- **オリジナルリポジトリ**: [affaanmustafa/everything-claude-code](https://github.com/affaanmustafa/everything-claude-code)
- **私のフォーク**: [nisioka/everything-claude-code](https://github.com/nisioka/everything-claude-code)

---

## ECCの全体像

ECC は Claude Code プラグインとして提供されており、以下の要素で構成されています。

```
everything-claude-code/
|-- agents/       # 特化型サブエージェント（コードレビュー、設計、TDD等）
|-- skills/       # ワークフロー定義（TDD手順、セキュリティチェックリスト等）
|-- commands/     # スラッシュコマンド（/tdd, /code-review 等）
|-- rules/        # 常時適用ルール（セキュリティ、コーディング規約等）
|-- hooks/        # イベント駆動の自動化（git push前の確認等）
|-- contexts/     # モード別のシステムプロンプト注入
|-- mcp-configs/  # 約20のMCPサーバー設定テンプレート
|-- examples/     # CLAUDE.mdの設定例
```

プラグインとしてインストールすると、コマンドには `/ecc:` というプレフィックスが付きます（例: `/ecc:tdd`, `/ecc:code-review`）。手動でコピーした場合はプレフィックスなしで使えます。

それぞれ詳しく見ていきます。

---

## 1. エージェント（Agents）

サブエージェントは、特定のタスクを専門家に委任する仕組みです。メインのコンテキストを汚さずに、独立したスコープで作業を実行できます。

オリジナルの ECC には以下の9つのエージェントが含まれています。

| エージェント | 役割 |
|---|---|
| **planner** | 機能の実装計画を立案 |
| **architect** | システム設計の判断、スケーラビリティの検討 |
| **code-reviewer** | シニアレビュアーとして品質・セキュリティ・保守性をレビュー |
| **tdd-guide** | テスト駆動開発の手順を強制（RED→GREEN→REFACTOR） |
| **security-reviewer** | 脆弱性分析、OWASP Top 10 チェック |
| **build-error-resolver** | ビルドエラーや型エラーの最小限の修正 |
| **e2e-runner** | Playwright を使った E2E テストの生成・実行 |
| **refactor-cleaner** | デッドコードの検出と削除 |
| **doc-updater** | ドキュメントとコードの同期 |

エージェントは以下のような Markdown ファイルで定義されています。

```markdown
---
name: code-reviewer
description: コードの品質、セキュリティ、保守性をレビュー
tools: Read, Grep, Glob, Bash
model: opus
---

あなたはシニアコードレビュアーです...
```

`tools` で使用可能なツールを制限し、`model` で使用するモデルを指定できます。例えば、コードレビューには読み取り系のツールのみを許可し、意図しないファイル変更を防ぐといった制御が可能です。

---

## 2. スキル（Skills）

スキルはコマンドやエージェントから呼び出される、再利用可能なワークフロー定義です。

オリジナルの ECC には以下の11のスキルが含まれています。

| スキル | 内容 |
|---|---|
| **tdd-workflow** | TDD の手順定義（RED-GREEN-REFACTOR サイクル、80%以上のカバレッジ要件） |
| **verification-loop** | ビルド→型チェック→リント→テスト→セキュリティスキャン→差分レビューの一連の検証 |
| **eval-harness** | 評価駆動開発（pass@k メトリクス、グレーダータイプ） |
| **coding-standards** | 言語ごとのベストプラクティス |
| **backend-patterns** | API 設計、データベース、キャッシングパターン |
| **frontend-patterns** | React/Next.js のコンポーネント設計、状態管理 |
| **security-review** | セキュリティチェックリスト |
| **continuous-learning** | セッションからパターンを自動抽出し、スキルとして保存 |
| **strategic-compact** | コンテキストウィンドウの最適化タイミングを提案 |
| **clickhouse-io** | ClickHouse の分析クエリパターン |
| **project-guidelines-example** | プロジェクトガイドラインのテンプレート |

スキルは `~/.claude/skills/` に Markdown で配置します。コマンド実行時に自動的に読み込まれ、Claude Code の振る舞いを制御します。

---

## 3. コマンド（Commands）

スラッシュコマンドで素早くワークフローを実行できます。オリジナルの ECC には14のコマンドが含まれています。

| コマンド | 用途 |
|---|---|
| `/tdd` | テスト駆動開発の開始 |
| `/plan` | 実装の計画立案 |
| `/code-review` | コード品質レビューの実行 |
| `/e2e` | E2E テストの生成と実行 |
| `/build-fix` | ビルドエラーの修正 |
| `/refactor-clean` | デッドコードの削除 |
| `/test-coverage` | テストカバレッジの分析・改善 |
| `/learn` | セッション中にパターンを抽出して保存 |
| `/checkpoint` | 検証状態の保存 |
| `/verify` | 検証ループの実行 |
| `/eval` | 評価ハーネスの実行 |
| `/orchestrate` | サブエージェントのオーケストレーション |
| `/update-codemaps` | コードマップの更新 |
| `/update-docs` | ドキュメントの更新 |

コマンドは `~/.claude/commands/` に Markdown ファイルを配置すると使えるようになります。ファイル名がそのままコマンド名になります（例: `tdd.md` → `/tdd`）。

**プラグインとしてインストールした場合は `/ecc:tdd` のようにプレフィックスが付きます。**

---

## 4. ルール（Rules）

ルールは Claude Code が常に従うガイドラインで、セッション開始時にシステムプロンプトに注入されます。オリジナルの ECC には8つのルールが含まれています。

| ルール | 内容 |
|---|---|
| **security.md** | シークレットのハードコード禁止、入力バリデーション、SQLインジェクション対策 |
| **coding-style.md** | 小さなファイル(200-400行)、イミュータビリティ、console.log 禁止 |
| **testing.md** | TDD 必須、80%以上のカバレッジ、テスト失敗時の対処 |
| **git-workflow.md** | Conventional Commits、PR レビュー必須、main ブランチへの直接コミット禁止 |
| **performance.md** | モデル選択戦略、コンテキスト管理 |
| **agents.md** | サブエージェントへの委任タイミング |
| **hooks.md** | フックの使い方とベストプラクティス |
| **patterns.md** | コードパターンと設計原則 |

ルールは `~/.claude/rules/` に配置します。プロジェクト固有のルールは `.claude/rules/` にも置けます。

---

## 5. フック（Hooks）

フックはツール呼び出しやライフサイクルイベントに対するトリガーベースの自動化です。

例えば「`git push` の前に確認を挟む」フックは以下のように定義します。

```json
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"git push\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\necho 'プッシュ前の確認: 本当にプッシュしますか？'"
  }]
}
```

Claude Code が対応しているフックイベントは以下の通りです。

| イベント | タイミング |
|---|---|
| **PreToolUse** | ツール実行前 |
| **PostToolUse** | ツール実行後 |
| **UserPromptSubmit** | ユーザーがプロンプトを送信した時 |
| **SessionStart** | セッション開始時 |
| **PreCompact** | コンテキスト圧縮前 |
| **Stop** | セッション終了時 |

ECC ではデフォルトで `PreToolUse`（git push 前の確認）が有効になっています。それ以外のイベントは `hooks/memory-persistence/` 等にスクリプトとして提供されており、必要に応じて有効化できます。

特に**メモリ永続化フック**（`SessionStart` でコンテキストを読み込み、`PreCompact` で保存）は、長いセッションでコンテキストが失われる問題を軽減する強力な仕組みです。

---

## 6. MCP設定

約20の MCP サーバーの設定テンプレートが含まれています。

| カテゴリ | MCP | 用途 |
|---|---|---|
| 開発 | github, linear, sentry | PR 管理、プロジェクト管理、エラー監視 |
| インフラ | vercel, railway, cloudflare | デプロイ、インフラ管理 |
| DB | supabase, clickhouse | データ操作、分析 |
| コミュニケーション | slack | チーム連携 |
| ドキュメント | context7 | ライブドキュメント検索 |
| AI/システム | memory, sequential-thinking | セッション記憶、推論チェーン |

### コンテキストウィンドウに関する重要な注意

MCP を有効にしすぎると、200k のコンテキストウィンドウが **70k まで縮小** する可能性があります。推奨ルールは以下の通りです。

- 設定には 20〜30 の MCP を持つ
- **プロジェクトごとに有効にするのは 10 未満**
- **アクティブなツールは 80 未満**
- `disabledMcpServers` で未使用のものを無効化

---

## 7. コンテキスト（Contexts）

モード別のシステムプロンプト注入機能です。`contexts/` ディレクトリに以下の3つのモードが用意されています。

| コンテキスト | 用途 |
|---|---|
| **dev.md** | 開発モード（コーディング作業時） |
| **review.md** | コードレビューモード |
| **research.md** | リサーチ・探索モード |

作業の目的に応じて適切なモードを切り替えることで、Claude Code の応答を最適化できます。

---

## インストール方法

### プラグインとしてインストール（推奨）

```bash
# マーケットプレイスとして追加
/plugin marketplace add nisioka/everything-claude-code

# プラグインをインストール
/plugin install ecc@everything-claude-code

# アップデート
claude plugin update ecc@everything-claude-code
```

または `~/.claude/settings.json` に直接追加します。

```json
{
  "extraKnownMarketplaces": {
    "everything-claude-code": {
      "source": {
        "source": "github",
        "repo": "nisioka/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "ecc@everything-claude-code": true
  }
}
```

プラグインとしてインストールした場合、すべてのコマンドに `/ecc:` プレフィックスが付きます（例: `/ecc:tdd`, `/ecc:code-review`）。エージェントも `ecc:code-reviewer` のように呼び出されます。

### 手動インストール

必要なものだけ選んで導入したい場合は手動コピーします。この場合はプレフィックスなしで使えます。

```bash
git clone https://github.com/nisioka/everything-claude-code.git

# 必要なものだけコピー
cp everything-claude-code/agents/*.md ~/.claude/agents/
cp everything-claude-code/rules/*.md ~/.claude/rules/
cp everything-claude-code/commands/*.md ~/.claude/commands/
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

---

## 私のカスタマイズ内容

オリジナルの ECC をフォークして、以下のカスタマイズを行っています。

### 1. 日本語ドキュメントの追加

オリジナルのドキュメントは英語のみだったため、主要ドキュメントの日本語訳を追加しました。

- `README_ja.md` - プロジェクト全体の概要
- `shorthand-guide_ja.md` - セットアップと基礎（ショートハンドガイド）
- `longform-guide_ja.md` - 上級テクニック（ロングフォームガイド）
- `agents_ja.md`, `commands_ja.md`, `skills_ja.md`, `rules_ja.md`, `hooks_ja.md`, `contexts_ja.md`, `examples_ja.md`, `mcp-configs_ja.md`

翻訳は Claude Code 自身に行わせました。日本語で Claude Code を使う開発者にとって、設定の意図や使い方が理解しやすくなっているはずです。

### 2. planner エージェントと /plan コマンドの削除

オリジナルの ECC にはタスク計画用の `planner` エージェントと `/plan` コマンドが含まれていましたが、後述する Kiro Spec-Driven Development に置き換えたため削除しました。

### 3. Kiro Spec-Driven Development の統合

仕様駆動開発（Spec-Driven Development）のフレームワークである Kiro を統合しました。これにより、以下の3フェーズで体系的に開発を進められます。

1. **仕様フェーズ**: 要件定義 → 技術設計 → タスク分解
2. **実装フェーズ**: TDD ベースの実装
3. **検証フェーズ**: 品質レビューとフィードバックループ

Kiro 関連のコマンドとして以下を追加しました（プラグインの場合は `/ecc:kiro:` プレフィックス）。

| コマンド | 用途 |
|---|---|
| `/kiro:spec-init "説明"` | 新しい仕様書の初期化 |
| `/kiro:spec-requirements` | 要件の生成 |
| `/kiro:spec-design` | 技術設計 |
| `/kiro:spec-tasks` | タスク分解 |
| `/kiro:spec-impl` | タスクの実装 |
| `/kiro:spec-status` | 仕様のステータス確認 |
| `/kiro:steering` | プロジェクトのステアリングメモリ管理 |
| `/kiro:steering-custom` | カスタムステアリングの作成 |
| `/kiro:validate-gap` | 要件と実装のギャップ分析 |
| `/kiro:validate-design` | 設計レビュー |
| `/kiro:validate-impl` | 実装の検証 |

### 4. カスタムコマンドの追加

`commands/my/` ディレクトリに独自コマンドを追加しました（プラグインの場合は `/ecc:my:` プレフィックス）。

#### `/my:spec-impl` - TDD実装 + レビューループ + PR作成

仕様書のタスクを TDD で実装し、品質レビューを経て PR を作成するまでを一気通貫で実行するコマンドです。以下の3フェーズで動作します。

```
PHASE 1: タスク実装（順次処理）
  各タスクをサブエージェントに委任 → TDD実装 → コミット
    ↓
PHASE 2: 品質向上・レビュー
  デッドコード削除 → カバレッジ改善 → 検証ループ → コードレビュー
  → 指摘あり → tasks.mdに追記 → PHASE 1 に戻る（最大3回）
  → 指摘なし → PHASE 3 へ
    ↓
PHASE 3: PR作成
```

タスクの内容に応じて最適なサブエージェントを自動選択する仕組みも入れています。

| タスクの性質 | 選択されるエージェント |
|---|---|
| 一般的な機能実装 | general-purpose |
| テスト実装が主体 | tdd-guide |
| Kotlin/Quarkus 実装 | kotlin-coder |
| TypeScript/Next.js 実装 | nextjs-coder |
| SQL/スキーマ設計 | sql-coder |
| JPA/Hibernate エンティティ | jpa-model-coder |
| セキュリティ対応 | security-reviewer |

#### `/my:convert-spec-to-doc` - 仕様書のドキュメント変換

Kiro の仕様書をプロジェクトドキュメント形式に変換するコマンドです。

#### `/my:generate-test-plan` - テスト観点の生成

変更内容からテスト観点を Markdown ファイルとして出力するコマンドです。

### 5. 言語・フレームワーク特化のサブエージェント追加

オリジナルのエージェントは汎用的なものだったため、自分の開発スタックに合わせた特化型エージェントを4種追加しました。

| エージェント | 専門領域 |
|---|---|
| **kotlin-coder** | Kotlin/Quarkus 実装、native image 対応 |
| **nextjs-coder** | Next.js 16、Turbopack、Server Actions |
| **jpa-model-coder** | JPA/Hibernate エンティティ設計、N+1 対策 |
| **sql-coder** | SQL クエリ最適化、マイグレーション |

---

## 各自のカスタマイズ方法

ECC は「そのまま使う」よりも「自分のワークフローに合わせて調整する」ことを想定しています。README にも以下のように書かれています。

> 1. 共感できるものから始める
> 2. 自分のスタックに合わせて修正
> 3. 使わないものを削除
> 4. 自分のパターンを追加

具体的なカスタマイズポイントを紹介します。

### エージェントの追加

自分の技術スタックに特化したエージェントを追加します。`~/.claude/agents/` に Markdown ファイルを置くだけです。

```markdown
---
name: my-framework-expert
description: 〇〇フレームワークの専門家
tools: Read, Write, Edit, Bash, Grep, Glob
model: opus
---

あなたは〇〇フレームワークの専門家です。
以下のベストプラクティスに従ってコードを書いてください：
- ...
```

### コマンドの追加

プロジェクト固有のワークフローをコマンド化します。`~/.claude/commands/` に Markdown を置けばスラッシュコマンドとして使えます。`commands/my/` のようにサブディレクトリを作ると `/my:コマンド名` のように名前空間を分けられます。

### ルールのカスタマイズ

チームのコーディング規約に合わせてルールを修正します。不要なルールは削除し、プロジェクト固有のルールを追加できます。

例えば `testing.md` のカバレッジ要件を 80% から 70% に変更したり、`coding-style.md` にチーム固有の命名規則を追加したりできます。

### MCP の取捨選択

`mcp-configs/mcp-servers.json` から必要なものだけを `~/.claude.json` にコピーします。前述の通り、有効にしすぎるとコンテキストウィンドウが圧迫されるため、プロジェクトごとに使うものを絞ることが重要です。

### カスタマイズは AI に任せられる

ここまで読んで「カスタマイズが面倒そう」と思った方もいるかもしれません。しかし、エージェント・コマンド・ルール・スキルはすべて Markdown ファイルです。つまり、**Claude Code 自身にカスタマイズを任せることができます**。

例えば、Claude Code に以下のように伝えるだけで、新しいエージェントやコマンドを作ってもらえます。

- 「Spring Boot に特化したエージェントを作って」
- 「デプロイ前にテストを全部通すフックを作って」
- 「うちのチームのコーディング規約をルールファイルにまとめて」

実際、私のフォークで追加したカスタムコマンドやエージェントの多くも Claude Code に指示して作成したものです。ECC の既存ファイルを参考にしてくれるので、フォーマットや粒度も自然に揃います。

---

## まとめ

Everything Claude Code は、Claude Code を本格的に活用するための設定集として非常に充実しています。特に以下の点が優れています。

- **実戦で検証済み**: 10ヶ月以上のプロダクト開発で磨かれた設定
- **モジュラー構成**: 必要なものだけ選んで導入できる
- **拡張しやすい**: Markdown ファイルを置くだけでエージェント・コマンド・ルールを追加可能
- **品質ゲート**: TDD、コードレビュー、セキュリティチェックが組み込み

私のフォークでは日本語ドキュメント、Kiro による仕様駆動開発、技術スタック特化のエージェントを追加していますが、これはあくまで一例です。自分のワークフローに合わせてカスタマイズすることで、Claude Code をさらに効率的に活用できるようになります。カスタマイズ自体も AI に任せられるので、気軽に試してみてください。

- **オリジナル**: [affaanmustafa/everything-claude-code](https://github.com/affaanmustafa/everything-claude-code)
- **フォーク（日本語対応・カスタマイズ済み）**: [nisioka/everything-claude-code](https://github.com/nisioka/everything-claude-code)
- **ショートハンドガイド（日本語）**: [shorthand-guide_ja.md](https://github.com/nisioka/everything-claude-code/blob/main/shorthand-guide_ja.md)
- **ロングフォームガイド（日本語）**: [longform-guide_ja.md](https://github.com/nisioka/everything-claude-code/blob/main/longform-guide_ja.md)

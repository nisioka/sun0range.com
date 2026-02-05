---
title: SlackのMCPをワークスペースにインストール無しで Claude Code から使う方法
date: "2026-02-04"
dateModified: "2026-02-04"
description: "ワークスペースへのアプリインストール不要。Cookie ベース認証の @kazuph/mcp-slack を使って Claude Code から Slack のチャンネルやスレッドを読み書きする方法を解説。"
featuredImagePath: "featured/slack.webp"
nodeType: blog
category: 技術
tags: ["MCP", "Slack", "Claude Code", "AI"]
---

## やりたいこと

Claude Code などのAIエージェントから Slack のメッセージの読み書きをしたい。  
ただし、ワークスペースに Slack App をインストールする権限がない、あるいはインストールしたくない。

## 方法

[`@kazuph/mcp-slack`](https://github.com/kazuph/mcp-slack) を使う。

このツールは Slack のBot Tokenではなく、ブラウザの Cookie ベース認証（`xoxc` / `xoxd` トークン）を利用する。そのため **ワークスペースへのアプリインストールが不要** で、自分のブラウザセッション情報で動作する。

## 注意点

この方法は自分のブラウザセッション（Cookie）をそのまま使う。つまり **自分が Slack 上でできることすべてと同等の権限** を持つ。

- **DM（ダイレクトメッセージ）を含む、自分がアクセスできるすべてのチャンネル・メッセージが読み取り可能** になる。
- Bot Token のように「招待されたチャンネルのみ」といったスコープの制限がない。
- トークンが漏洩した場合、自分のアカウントと同等の操作が第三者に可能になる。
- Slack 公式の認証方式ではないため、Slack 側の仕様変更で動作しなくなる可能性がある。
- `@kazuph/mcp-slack` は **Slack 社とは無関係の非公式ライブラリ** である。利用前にリポジトリのソースコードやライセンスを自身で確認すること
- Cookie ベースのトークンには有効期限があり、**ブラウザセッションが切れると再取得が必要** になる

また、トークンは `.mcp.json` に平文で記載することになるため、**リポジトリに含めない**（`.gitignore` に追加する）、共有マシンでの利用を避けるなど、取り扱いには十分注意すること。

## 動作確認環境

MCP サーバーとして、Claude Code に限らず各種 AI エージェントでも利用できると思われるが、 **Claude Code でのみ動作確認** している。

- OS: Windows (WSL2)
- WSL ディストリビューション: Ubuntu 24.04 LTS
- CPU アーキテクチャ: x86_64

## セットアップ手順

### 1. Slack トークンを取得する

ブラウザから以下の2つのトークンを取得する。

1. ブラウザで Slack にログイン
2. DevTools (F12) を開く
3. **Console タブ** で `JSON.parse(localStorage.localConfig_v2).teams[Object.keys(JSON.parse(localStorage.localConfig_v2).teams)[0]].token` を実行した結果の値を取得 → これが `SLACK_MCP_XOXC_TOKEN`
   - ブラウザの制限で最初は実行できないかもしれない。英語でメッセージがでたりするので確認して`allow`などを別途打ち込む必要があるかもしれない。
4. **Application > Cookies** から `d` cookie の値を取得 → これが `SLACK_MCP_XOXD_TOKEN`

### 2. インストールと設定

パッケージをインストールし、`.mcp.json` に設定を追加する。

```bash
pnpm add -g @kazuph/mcp-slack
```

`.mcp.json`（プロジェクトルートまたは `~/.claude/.mcp.json`）に以下を追加する。

```json
{
  "mcpServers": {
    "slack": {
      "command": "mcp-slack",
      "args": [],
      "env": {
        "SLACK_MCP_XOXC_TOKEN": "xoxc-取得した値",
        "SLACK_MCP_XOXD_TOKEN": "xoxd-取得した値"
      }
    }
  }
}
```

### 3. 動作確認

Claude Code を再起動し、/mcp コマンドを実行して、`slack · ✔ connected` と出ていればOK。

## 補足: npx で接続に失敗する場合

README には npx で直接実行する方法が記載されておりこれで良い。ただ私の環境では arm64/x64 のアーキテクチャ判定のミスマッチにより接続に失敗したため、上記の通り環境にグローバルインストールすることにした。

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@kazuph/mcp-slack"]
    }
  }
}
```

この場合、上記のように `pnpm add -g` でグローバルインストールし、`command` を `mcp-slack` に変更すれば解決する。

| 項目 | 変更前 | 変更後 |
|------|--------|--------|
| command | `npx` | `mcp-slack` |
| args | `["-y", "@kazuph/mcp-slack"]` | `[]` |


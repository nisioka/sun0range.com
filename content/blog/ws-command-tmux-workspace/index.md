---
title: tmuxで複数プロジェクトを一覧管理する自作コマンド「ws」
date: "2026-05-10"
dateModified: "2026-05-10"
description: "tmuxの多機能さを数コマンドに絞って扱えるようにした自作シェルスクリプト「ws」の紹介。セッション管理・ダッシュボード表示・グループフィルタの3機能で複数プロジェクトのターミナルを一画面で管理できます。"
featuredImagePath: "featured/ws.webp"
nodeType: blog
category: 技術
tags: ["tmux", "CLI", "業務効率化"]
---

## はじめに

**`ws`（Workspace Manager）** は、tmux の機能を「セッション管理」と「ダッシュボード表示」に絞り、数コマンドだけで操作できるようにしたシェルスクリプトです。上記画像のイメージです。

tmux は高機能ですが、複数プロジェクトのターミナルを管理したいだけなのにセッション・ウィンドウ・ペインの操作など覚えることが多かったので、シンプルな体系にラップしました。

## ws コマンドでできること

- 各プロジェクトのターミナルを tmux セッションとして管理できます
- 別ターミナルにダッシュボードとしてまとめてタイル表示できます
- セッションの追加・削除時にダッシュボードが自動でリアルタイム更新されます
- グループ機能でセッションを分類し、グループ単位でフィルタ表示もできます
- 実際の具体的利用用途：複数のAIエージェントCLIを並列に実行させて、それぞれを一画面で

## 前提条件

- tmux がインストールされていること
- bash が利用可能なこと

```bash
# tmux のインストール（Ubuntu/Debian の場合）
sudo apt install tmux

# macOS の場合
brew install tmux
```

## セットアップ

以下のスクリプトを `ws` という名前で PATH の通ったディレクトリに保存し、実行権限を付与します。

```bash
# 例: ~/bin に配置
curl -o ~/bin/ws https://raw.githubusercontent.com/nisioka/myTools/refs/heads/main/shell/ws
chmod +x ~/bin/ws
```

## 使い方

### サブコマンド一覧

| コマンド | 説明 |
|---------|------|
| `ws add [-g group] [name]` | セッションを作成して attach（名前省略時はカレントディレクトリ名） |
| `ws rm [name]` | セッションを終了（名前省略時はカレントディレクトリ名） |
| `ws list [-g group] [-G group]` | ワークスペースの一覧表示 |
| `ws dash [-g group] [-G group]` | ダッシュボードを開く |
| `ws help` | ヘルプを表示 |

`-g group` はそのグループのみ表示、`-G group` はそのグループを除外します。

### 基本的な使い方

各プロジェクトの ターミナルで `ws add` を実行し、別ターミナルで `ws dash` を開きます。  
作業が終われば `ws rm` をしたら、ダッシュボードからも自動で消えます。

```bash
# プロジェクトA のターミナルで
cd ~/projects/api
ws add
# → セッション "ws-api" が作られて attach される

# プロジェクトB のターミナルで
cd ~/projects/web
ws add
# → セッション "ws-web" が作られて attach される

# 別モニター / 別ターミナルで
ws dash
# → 全セッションがタイル表示でミラーされる
```

### セッション名・グループを指定する

```bash
# セッション名を指定
ws add my-project

# グループを指定して追加
ws add -g backend api
ws add -g backend batch
ws add -g frontend web

# 既存セッションにグループを後付けすることも可能
ws add -g backend api
```

### ワークスペースの一覧を確認

```bash
ws list
# ワークスペース:
#   api  [backend]  (/home/user/projects/api)
#   batch  [backend]  (/home/user/projects/batch)
#   web  [frontend]  (/home/user/projects/web)

# グループでフィルタ
ws list -g backend
#   api  [backend]  (/home/user/projects/api)
#   batch  [backend]  (/home/user/projects/batch)
```

### グループ単位でダッシュボードを表示

```bash
# backend グループだけのダッシュボードを開く
ws dash -g backend

# frontend グループを除外したダッシュボードを開く
ws dash -G frontend
```

### セッションを終了する

```bash
ws rm api
# ✓ 'api' を終了しました
#   ダッシュボードを更新しました
```

### セッションから抜ける（デタッチ）

`ws dash` や `ws add` で attach した状態のターミナルを、**セッションを生かしたまま手放したい**ときは tmux の「デタッチ」を使います。中で動いているプロセスはバックグラウンドで動き続け、後から再接続できます。

なお、これは `ws` 固有の機能ではなく **tmux 標準の操作** です。`ws` は tmux のラッパーなので、デタッチや再接続まわりは普段の tmux と同じ作法がそのまま使えます。`~/.tmux.conf` で prefix キーを `Ctrl+a` などに変更している場合は、以下の `Ctrl+b` を自分の prefix に読み替えてください。

`exit` や `Ctrl+d` はペイン内のシェルを終了させてしまい、全ペインが閉じるとセッションごと消えてしまうため、**生かしたまま抜けたい場合は必ず `Ctrl+b d`** を使ってください。

## 仕組みの解説

### アーキテクチャ

`ws` コマンドは2つの tmux サーバーを使い分けています。

1. **デフォルトサーバー**: `ws add` で作成される各プロジェクトのセッション
2. **`ws-dash` サーバー**: ダッシュボード専用。`-L ws-dash` オプションで別サーバーとして起動

ダッシュボードの各ペインは `tmux attach` でデフォルトサーバーのセッションに接続（ミラーリング）しています。そのため **IDE 側で実行したコマンドや出力がダッシュボードにもリアルタイムで表示** されます。

### セッション名の管理

セッション名には `ws-` というプレフィックスが自動付与されます。これにより `ws` が管理するセッションと、手動で作った tmux セッションを区別しています。

```bash
# 内部的なセッション名
ws add api    # → tmux セッション名は "ws-api"
ws add web    # → tmux セッション名は "ws-web"
```

また、セッション名に含まれる `.` や `:` は `_` に自動変換されます（tmux のセッション名に使用できない文字への対応）。

### グループの管理

グループ情報は `~/.config/ws/groups` にタブ区切りで保存されます。`ws add -g` で付与し、`ws rm` で削除時に自動的にクリーンアップされます。

```
api	backend
batch	backend
web	frontend
```

`ws list` や `ws dash` の `-g` / `-G` オプションはこのファイルを参照してフィルタリングを行います。

### ダッシュボードのレイアウト

ペイン数に応じて自動的にレイアウトが選択されます。

- **3ペイン以下**: `even-horizontal`（横並び）
- **4ペイン以上**: `tiled`（タイル表示）

各ペインの上部にはプロジェクト名がボーダーとして表示されるため、どのペインがどのプロジェクトかが一目で分かります。

### ダッシュボードの更新

`ws add` や `ws rm` を実行すると、ダッシュボードが開いている場合は自動的に再構築されます。再構築の流れは以下の通りです。

1. 新しいウィンドウを作成し、現在のワークスペース一覧からペインを構築
2. 古いウィンドウを削除
3. レイアウトを再適用

この方式により、ダッシュボードを閉じることなくシームレスにペインが更新されます。

## ソースコード

完全なソースコードは以下のリポジトリで公開しています。

[nisioka/myTools - shell/ws](https://github.com/nisioka/myTools/blob/main/shell/ws)

## まとめ

`ws` コマンドは tmux の豊富な機能のうち、日常的に必要な操作だけを `add` / `rm` / `list` / `dash` の4コマンドに集約したものです。グループ機能を組み合わせれば、マイクロサービス群やモノレポ内の複数パッケージなど、プロジェクトの規模が大きくなっても整理して管理できます。

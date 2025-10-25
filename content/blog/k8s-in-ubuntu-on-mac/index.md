---
title: WindowsからLinuxへのSSH接続
date: "2025-03-16"
dateModified: "2025-03-16"
description: "WindowsマシンからLinux(UbuntuServer)への公開鍵を使ったSSH接続のやり方。"
featuredImagePath: "featured/ssh.webp"
nodeType: blog
category: 技術
tags: ["SSH", "Linux", "公開鍵認証"]
---

# WindowsマシンからLinux(UbuntuServer)への公開鍵を使ったSSH接続

単純なWindowsマシンからLinux(UbuntuServer)へのSSH接続の方法を紹介します。
特別な事はしませんが、よく忘れるので備忘です。

## 環境

- Windows 11 Home
- Ubuntu Server 22.04 LTS
  - 本記事での説明では、ユーザ名を `ubuntu` 、IPアドレスを `192.168.1.100` としています。

## Ubuntu ServerでSSHを有効にする

Ubuntu ServerがSSH接続を許可するように設定します。

1. OpenSSHのインストール
Ubuntu ServerにSSHサーバーがインストールされているか確認し、なければインストールします。

```sh
sudo apt update
sudo apt install -y openssh-server
```

2. SSHサービスの起動と有効化
SSHサービスを開始し、再起動後も有効にします。

```sh
sudo systemctl enable --now ssh
```

3. ファイアウォールの設定（必要に応じて）
ufw を使用してSSHを許可します。

```sh
sudo ufw allow OpenSSH
sudo ufw enable
```

4. Ubuntu ServerのIPアドレスを確認
   Ubuntu ServerのローカルIPアドレスを確認します。

```sh
ip a | grep "inet "
```
または

```sh
hostname -I
```
例えば 192.168.1.100 というIPが表示されたら、それをWindowsから使用します。

## WindowsからSSH接続
   Windowsでは以下の方法でSSH接続できます。

1. WindowsのコマンドプロンプトまたはPowerShellを使用
まずは接続確認のためにパスワード認証でSSH接続できることを確認します。

```powershell
ssh ユーザー名@IPアドレス
```
例:

```powershell
ssh ubuntu@192.168.1.100
```

### Windowsから公開鍵を使ったSSH接続

セキュリティ面でも楽という面でもパスワード無しでSSH接続するほうがよいので、WindowsでSSHキーを作成し、Ubuntu Serverに登録します。

1. WindowsでSSHキーを作成
PowerShellまたはWindows Terminalで以下を実行：

```powershell
ssh-keygen -t rsa -b 4096
```
デフォルトの保存場所（C:\Users\ユーザー名\.ssh\id_rsa）でEnterを押します。

2. 公開鍵をUbuntuにコピー
以下のコマンドでUbuntu Serverに公開鍵を登録。ユーザ名・IPアドレスは適宜変更してください。パスワードも聞かれます。

```powershell
type $HOME\.ssh\id_rsa.pub | ssh ubuntu@192.168.1.100 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

3. 鍵認証でSSH接続
今後は以下でパスワードなし接続が可能：

```powershell
ssh ubuntu@192.168.1.100
```
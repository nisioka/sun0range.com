---
title: Ubuntu ServerでWiFiを使えるようにする手順(MacBook Airでの事例)
date: "2025-03-09"
dateModified: "2025-03-09"
description: "Ubuntu ServerでWiFiを使えるようにする手順の説明。MacBook AirにインストールしたUbuntu ServerでWiFiを使えるようにする手順を紹介します。"
featuredImagePath: "featured/ubuntu-server-22.webp"
nodeType: blog
category: 技術
tags: ["Ubuntu Server", "WiFi", "Linux"]
---

# Ubuntu ServerでWiFiを使えるようにする手順(MacBook Airでの事例)

## はじめに

自宅用にServerマシンを構築しようと考えました。k8sを入れたり色々と使い倒したかったので、少々スペックが欲しかったこともあり、伝手で中古のMacBook Airを安く手に入れたのそれにUbuntuをインストールしました。  
Ubuntuをインストールすること自体は簡単ですが、WiFiを使えるようにするのが大変面倒でした。ネット上でも同様の苦労が多数見受けられたので、私も事例を残しておきたいと思います。
インターネット接続がない状態での作業は、特にWiFiドライバのインストールにおいて苦労することがあります。本記事では、スマートフォンを使ったUSBテザリングを利用して、Ubuntu上でWiFiを使えるようにする手順を紹介します。

## 環境情報
- MacBook Air（2017）
  - CPU: Intel Core i5-5350U @ 1.80GHz
  - RAM: 8GB
  - GPU: Intel HD Graphics 6000
  - SSD: 128GB
  - WiFi: Broadcom BCM4360
- Ubuntu Server 22.04 LTS
  - 上記MacBook Airにインストール済み。


## 手順
### 初期状態の確認

`ip a`コマンドを実行して、WiFiデバイスが認識されていることを確認します。(仮にコマンドを使えない場合は、`networkctl`コマンドを使ってもOKです。)  
下記のような出力になるのではないかと思います。  
`ip a`コマンドの場合。  
```bash
ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.0/8 scope host lo
       valid_lft forever preferred_lft forever
```
`networkctl`コマンドの場合。  
```bash
networkctl
IDX LINK             TYPE               OPERATIONAL SETUP
  1 lo               loopback           carrier     unmanaged
```
ここでのポイントは`wl～`始まりのデバイスがないことで、wlはwirelessを表し、つまりWiFiデバイスが認識されていないことです。  
通常各種installをしていって解消していくわけですが、そのためのネットワーク接続がなくて困るわけです。  
なので、USBテザリングを使ってインターネット接続を確保します。  

#### 補足
WiFi以外のネットワーク接続として、他の候補としては以下があります。
- 有線LAN (→LANコネクタはMacBookにはなく、変換コネクタの類も持っていなかった)
- Bluetooth (→Bluetoothの設定は面倒そうだったので避けた)

## USBテザリングの準備

まず以下の物理的接続を行います。  
1. スマートフォンとMacBookをUSBケーブルで接続し、スマートフォンの設定からUSBテザリングを有効にします。
2. MacBookにスマートフォンを接続します。
   
その状態で再度`ip a`コマンドを実行すると、`en～`始まりのデバイスが増えているはずです。enはethernetを表す有線接続のデバイスです。  
その増えた`en～`始まりのデバイスをメモしておきます。ちなみにこれは接続するたびに変わるので、毎回確認が必要です。
```bash
ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.0/8 scope host lo
       valid_lft forever preferred_lft forever
2: enp0s20u1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether ab:cd:12:34:56:ef brd ff:ff:ff:ff:ff:ff
    inet 192.168.119.142/24 brd 192.168.119.255 scope global dynamic noprefixroute enp0s20u1
       valid_lft 86399sec preferred_lft 86399sec
```

## USBテザリングの設定

次に、netplanを使って、USBテザリングを使ってインターネット接続を確保します。
1. `sudo vi /etc/netplan/60-tmp-tethering.yaml`(ファイル名は任意)のコマンドを入力して、ファイルを作成します。テキストエディタはここではviを使っていますが、他のエディタでも構いません。
2. 以下の通りファイルの中身を編集します。viの場合、`i` でまず入力モードにしたあと `escキー` → `:wq` で保存して終了します。この時、*USBテザリングの準備* で確認した`en～`始まりのデバイス名を下記例で言うところの`enp0s20u1`を置き換えてください。
   ```yaml:/etc/netplan/60-tmp-tethering.yaml
    network:
      version: 2
      renderer: networkd
      ethernets:
         enp0s20u1:
            dhcp4: true
   ```
3. 以下のコマンドを実行して、設定を反映します。
   ```bash
    sudo netplan try
   ```
   ここで設定不備などあればErrorが出ます。特に問題なければ下記のようになるので、`Enterキー` を入力して設定を適用します。
   ```bash
    Do you want to keep these settings?
    
    Press ENTER before the timeout to accept the new configuration
   
    Chages will revert in 120 seconds
   ```

これで暫定的なインターネット接続が確保されました。`sudo apt update` などでインターネット接続が確認できるか確認してみてください。

### 補足: netplanとは
netplanは、Ubuntu 17.10以降で採用されているネットワーク設定ツールです。
`/etc/netplan/` にあるYAMLファイルをアルファベット順に読み取ってネットワーク設定を行います。
元々 `/etc/netplan/50-cloud-init.yaml` があるはずですが、それは編集せずに新しいファイルを作成します。

## WiFiドライバのインストール

1. PCI接続されているであろう内蔵ネットワークカードを `lspci` コマンドで確認します。grepで`Network`を含む行を抽出すると見やすいです。(ネットワークカードによって表記が違う場合もあるのでその場合はgrep無しで確認してください)
   ```bash
   lspci | grep Network
   03:00.0 Network controller: Broadcom Inc. and subsidiaries BCM4360 802.11ac Wireless Network Adapter (rev 03)
   ```
2. ターミナルを開き、以下のコマンドを入力して必要なパッケージをインストールします。  
   ただし、これはBroadcomのBCM4360の場合であり、他のネットワークカードの場合は適切なドライバをインストールしてください。
   ```bash
   sudo apt-get update
   sudo apt-get install firmware-b43-installer
   sudo reboot
   ```
3. 再起動後、再度`ip a`コマンドを実行して、`wl～`始まりのWiFiデバイスが認識されていることを確認します。
    ```bash
    ip a
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
        inet 127.0.0.0/8 scope host lo
           valid_lft forever preferred_lft forever
    2: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether zy:xw:98:76:54:vu brd ff:ff:ff:ff:ff:ff
        inet 192.168.11.10/24 brd 192.168.11.255 scope global dynamic noprefixroute wlp3s0
           valid_lft 167552sec preferred_lft 167552sec
    ```
3. 再びnetplanを使って、WiFi用の設定を`sudo vi /etc/netplan/90-wifi.yaml`(ファイル名は任意)のコマンドで以下の通りファイルの中身を編集します。  
   この時、上記で確認した`wl～`始まりのデバイス名を下記例で言うところの`wlp3s0`を置き換えてください。また、`{wifi_SSID_name}` と `{your_wifi_password}` はそれぞれ、WiFiのSSID名とパスワードに置き換えてください。
   ```yaml:/etc/netplan/90-wifi.yaml
    network:
      version: 2
      renderer: networkd
      wifis:
        wlp3s0:
          dhcp4: true
          optional: true
          access-points:
            {wifi_SSID_name}:
              password: "{your_wifi_password}"
   ```
3. 再び以下のコマンドを実行して、設定を反映します。
   ```bash
    sudo netplan try
   ```
   これでWiFiを使えるようになるはずなのですが、私の環境ではうまくいきませんでした。

### NetworkManagerに変更

追加対応ですが、networkdからNetworkManagerに変更します。  
これらは本来、serverではnetworkdを、desktopではNetworkManagerを使うという想定ですがWiFi利用において私はうまくいかなかったので切り替えてみます。

1. 以下のコマンドを実行して、NetworkManagerをインストールします。
   ```bash
   sudo apt install network-manager
   ```
2. netplanの設定をnetworkdからNetworkManagerに変更します。先ほどの `90-wifi.yaml` のrendererだけを変えます。
   ```yaml:/etc/netplan/90-wifi.yaml
    network:
      version: 2
      renderer: NetworkManager
   # 以下略
   ```
3. USBテザリングを外した上で`sudo apt update` などでインターネット接続が確認できるか確認してみてください。
4. ネット接続できることが分かったら、テザリング用のnetplan設定は不要なので削除しておいてください。
   ```bash
   sudo rm /etc/netplan/60-tmp-tethering.yaml
   ```


## まとめ

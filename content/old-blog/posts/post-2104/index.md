---
title: "Docker概要まとめ【初心者向け】"
date: 2019-07-07
categories: 
  - "information-technology"
tags: 
  - "docker"
coverImage: "24174642365_68f0c433e2.jpg"
---

Dockerとは何か？を簡単にまとめました。これから始めてDockerを触る人向けにイメージをお伝えできればといったレベル感で書いています。  
  
ちなみに、以下のチュートリアルは分かりやすくまとまっているので、Dockerを少し触ってみたい、触りながら学習したいという場合にはお勧めです。

[https://tech.plaid.co.jp/tutorial-for-docker-beginners/](https://tech.plaid.co.jp/tutorial-for-docker-beginners/)

## Dockerとは

Dockerとはコンテナの仮想実行環境です。コンテナとは、"一部の切り出された環境の容器"です。例えば、その容器の中にとあるDBをインストールしたり、プログラミング言語の開発環境を構築したりといったことができます。  
Dockerの利点としては、こうしたコンテナを高速に呼び出せたり管理できるところにあります。

ちなみに、これらはLinuxのLXCという機能を用いて実現されているため、Linuxが使える状態を作らなければなりません。これはMacやもちろんLinuxでは比較的簡単なのですが、Windowsマシンではそれらを用意してDockerを動かすようにせねばならず、比較的Docker環境の準備は大変です（ハマることが多いです）。

## 用語説明

### Image/Container

まず、最初に知っておくべきは、Docker Container（コンテナ）と Docker Image（イメージ）です。Containerとは、実際にDockerで動かす環境の容器です。Imageはその元となる雛形を表します。  
Javaコードで表すのであれば、Imageがクラスであり、Containerがインスタンスです。なので、同一ImageからContainerを何個も作成することが可能です。

```
// Image/Containerの関係性の概念
Image container1 = new Image();
Image container2 = new Image();
```

### オーケストレーション

まず前提として、Containerを作成する時、基本的には一つの塊でまとめたいです。

例えばプログラミング言語とDBの環境を作ろうとしたときに、一つのコンテナに両者をインストールするか、二つのコンテナにそれぞれインストールするという手段が考えられます。  
そうした時に、後者を選ぶことが多いです。なぜなら再利用がしやすくなるからです。DBだけ別の用途でも使いまわしたいと思った時にDBのImageを再利用すれば楽だからです。

前置きが長くなりましたが、こうして分割した複数のContainerを扱う時に、それぞれが独立してしまっているので、Container同士の通信などといった結合の管理が大変です。なのでそれらの複数のContainerを管理しているツールを総称してオーケストレーションツールと言います。

#### Docker Compose

Dockerに内蔵の簡易オーケストレーション機能です。上記オーケストレーションの機能を持っており、数個のContainerを扱うくらいならば十分に単独で使用できます。Dockerのラップなので内部でDockerコマンドを使用しています。

そしてこれは、コンテナの起動情報をdocker-compose.ymlとしてコード管理でき、またコマンド体系もまとまっているので、単一Containerの場合も使用することが多いです。

#### Kubernates

読み方は諸説あるようですが、カタカナで書くと"クバネティス"などと読むようです。書く際はk8sと略されます。  
こちらは、簡易ではなくちゃんとしたオーケストレーションツールで、複数台のホストから構成される実行環境を、１台の実行環境のように扱うことができます。プロダクト開発においては基本的にこちらを使ってDocker Containerの管理をすることになります。本記事ではスコープ外としてこれ以上の説明はしません。ちなみに、上記Docker-composeとも併用して使えます。

### Volume

Containerは独立した環境なので、データも独立しています。それだとContainer外から情報を渡したり、Containerで作られたデータを残したりが難しいので、Volumeという仕組みでContainer内外のデータをマウントすることができます。

### Port

Volumeと同様に、ネットワークも独立しています。なので、Container内部のネットワークのPortとホスト側のPortをマッピングさせる仕組みが必要で、それがPortの機能で行われます。これを使えばContainerでPortに対する待ち受けを外部のホスト側からリクエストしたりできます。

### Docker Hub

Docker Imageの共有管理サイトです。OSSの公式などが公開されていたり個人で作成したImageも公開されていたりします(なので自分でアップロードすることもできます)。基本はこちらからDocker Imageがダウンロードされます。

### Dockerfile （ファイル）

Docker Imageを作るための設計書です。このファイルを共有すれば、どのマシンでも同じ環境を構築できるようになるわけです。

<script src="https://gist-it.appspot.com/github/nisioka/plaid-study-20180605/blob/master/step2/Dockerfile"></script>

### docker-compose（ファイル）

Docker Composeを動かすための設計書です。

<script src="https://gist-it.appspot.com/github/nisioka/plaid-study-20180605/blob/master/step2/docker-compose.yml"></script>

## よく使うコマンド

### Imageを作る

```
docker-compose build
```

このコマンドで、（同一ディレクトリにある）Dockerfileに記載されている通りにDocker Imageを生成します。一度生成されたものは保持されるのでDockerfileに変更がない限りbuildしなおす必要はありません。

### Containerを立ち上げる

```
docker-compose up -d
```

(同一ディレクトリにある)docker-compose.ymlに従いContainerが立ち上がります。ImageはDockerfileでbuildされたものから、VolumeやPortはdocker-compose.ymlに記載の通りにです。

### Container環境の中に入る

```
docker-compose exec (Container名) bash
```

構築したContainer環境の中に入って様々な操作ができます。(Container名)に指定するのはdocker-compose.ymlでservicesに指定したもので、上の例ですと「container2」を指定します。

中に入ったらLinuxの操作となります。こうして軽量に任意の環境を使いたくてDockerを使うことはよくあります。exitコマンドで抜けられます。

### Containerとホスト間のファイルコピー

```
docker cp (Container ID):(Container内の任意のパス) .
```

上記はdocker Container内からホスト側のカレントディレクトリへのファイルコピーを表します("."が最後にあり、これがカレントディレクトリを表します。任意のパスへコピーしたければ"."を書き換えます)。またホスト側からContainerへのコピーも可能で、cpの後の引数の順序を入れ換えれば良いです。

Container IDは以下で調べられます。

### Containerのプロセスを調べる

```
docker ps
```

上記コマンドを打つと以下のような情報が出力されます。ここからContainer ID等を知ることができます。

```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS   NAMES
abcdefghijkl        ubuntu              "/entrypoint.sh"    2 days ago          Up 3 minutes                container2
```

## 最後に

基本的と思われるところは以上です。これだけ解れば最低限動かせると思います。ただ、実際に何度も使って慣れることが大事なのでチュートリアルでもいいですし、どんどん触りましょう。

[https://tech.plaid.co.jp/tutorial-for-docker-beginners/](https://tech.plaid.co.jp/tutorial-for-docker-beginners/)

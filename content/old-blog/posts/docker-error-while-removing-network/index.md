---
title: "error while removing network でDocker コンテナを終了できない時の対処"
date: 2021-05-22
categories: 
  - "information-technology"
tags: 
  - "docker"
  - "docker-compose"
  - "kubernetes"
coverImage: "Docker.png"
---

DockerのContainer(コンテナ)を終了させようとした時に「**ERROR: error while removing network: network HOGE id FUGA has active endpoints.**」や立ち上げ時に「**ERROR: endpoint with name PIYO already exists in network bridge**」というエラーが出ることがあるのでその時の対処法。Docker-composeやk8sを用いていて、コンテナ間の連携用ネットワークを作成した時に発生することがあります。  
なるべく安全なところから最終手段まで順に説明します。

## Docker-composeのコンテナ実行中に定義ファイルを書き換えてしまった場合

Docker-composeを使ってコンテナを既に実行してしまっているのに、その実行中コンテナの定義ファイルであるdocker-compose.ymlを書き換えてしまって、

```
docker-compose down
```

を実行すると今回のエラーが発生することがあります。downコマンドは定義されていたものを止めるので定義情報が変わってしまったら止められなくなるというのは、当然の挙動ではあるかと思います。そんなときは、

```
docker-compose down --remove-orphans
```

として、「--remove-orphans」というオプションをつけて実行することで、yml定義ファイルにないがdocker-composeによって作成されたコンテナ・ネットワークを自動で探して掃除してくれます。  
これだけで簡単に解決する場合もあるので、まずはこのオプションを付与して試してみるのが良いかと思います。

参考： [https://docs.docker.jp/compose/reference/down.html](https://docs.docker.jp/compose/reference/down.html)

## Dockerコマンドで順々に削除していく

上記のようなことはしてないし、「--remove-orphans」でも削除出来なかった場合は、下記手順で一つづつ削除していきます。Dockerのネットワークは、接続してるコンテナが停止されていて接続情報もなくなっていないと、削除することができないルールとなっているので、それに従って削除していきます。

### コンテナの停止

```
docker ps
```

上記コマンドを利用しつつ、止めたいコンテナに対して下記コマンドを実行します。

```
docker stop {コンテナ名}
```

#### 停止出来ない場合：コンテナの削除

上記で停止できない場合、（何が原因かは適宜調査してもらって）コンテナの削除を試みます。必要に応じて、マウントしているボリュームのバックアップを取るなどは別途対処してください。

```
docker rm {コンテナID}
```

しかしながら、たまにこれがうまくいかない場合があります。その場合は最終手段として強制削除（「--force」オプションをつけて実行）を行ってください。

```
docker rm --force {コンテナID}
```

### ネットワーク削除を試みる

コンテナ停止ができていれば、エラーが起きていたネットワーク削除もできるようになっているはずなので試してみます。（ちなみにこれには強制削除のオプションがないです）  
これで削除が正常にできれば問題解決です。

```
docker network rm {ネットワーク名}
```

### コンテナ接続情報をデタッチする

上記でネットワーク削除ができない場合、コンテナの接続情報が残ってしまっているので、それを解除します。まずはネットワークの情報を取得するために下記コマンドを実行します。

```
docker network inspect {ネットワーク名}
```

すると長々としたネットワーク情報が出てくるので、その中の**Containers**という所を探します（恐らく半分より少し下あたり）。そのContainersの中に記載があるならばコンテナ接続情報が残っているということです。

```
> docker network inspect {ネットワーク名}

（省略）
"Containers": {
            "abcdefghijk......": {
                "Name": "container_name",
                "EndpointID": "123456789abcdf...",
                "MacAddress": "AB:CD:EF:GH:IJ:KL",
                "IPv4Address": "172.17.0.1/16",
                "IPv6Address": ""
            }
},
（省略）
```

このネットワークのコンテナ接続情報をデタッチする下記コマンドを実行します。

```
docker network disconnect {ネットワーク名} {コンテナ名}
```

これもうまくいかない場合は、最終手段として強制削除（「--force」オプションをつけて実行）を行ってください。

```
docker network disconnect --force {ネットワーク名} {コンテナ名}
```

参考： [https://docs.docker.jp/engine/reference/commandline/network\_disconnect.html](https://docs.docker.jp/engine/reference/commandline/network_disconnect.html)

**Containers** で記載された全てのコンテナをデタッチしたらば、再度先程の「network inspect」コマンドでネットワークの情報を確認してください。下記のように**Containers**が空になっているはずです。

```
> docker network inspect {ネットワーク名}

（省略）
"Containers": {},
（省略）
```

### 再び、ネットワーク削除を試みる

先と同様にネットワーク削除をしてみてください。ここまでやれば削除はできるはず。

```
docker network rm {ネットワーク名}
```

## Docker再起動

上記作業をしてもどうしてもうまく行かない場合は、本当の最終手段として、Docker自体の再起動をします。これはもちろんですが、他のコンテナなどDockerで動いている全てに影響があるので、本当に一度終了させても良いかどうかを確認して実施してください。  
Docker再起動はOSに依りますが、例えばWindowsではDocker for DesktopアプリをGUIから「Restart Docker」、Linux系では下記などで再起動できるかと思います。

```
sudo service docker restart
```

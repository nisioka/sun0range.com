---
title: "Windowsでdocker構築"
categories: 
  - "information-technology"
draft: true
---

https://github.com/docker/toolbox/issues/317

【docker】  
dbセットアップを含めると、dockerで実行したほうがよさげ。  
→いや、windowsだと結構しんどいハマりポイントが多いのでお勧めしない。

①postgresバージョンの変更  
(?)良くわからないが、ローカルだとalpaca-networkの構築が上手くいかない（docker力が低いせいもあるか）  
この状態だpostgresイメージのダウンロードが上手くいかないので、バージョンを下げる必要がある。

Dockerfileの先頭From行を書き換える。  
FROM postgres:9.6.6-alpine

  
②docker build  
alpacax\_coreディレクトリで以下を実行  
docker build -t alpacax/postgres --build-arg DOCKERFILE\_DIR=dockerfiles/postgres/ . -f C:/Users/nishi/IdeaProjects/alpacax\_core/dockerfiles/postgres/Dockerfile

  
③docker run  
alpacax\_core/dockerfiles/postgres/に移動  
docker-compose.ymlを置く

docker volume create --name postgresql-volume -d local

// 初回（createDB有）  
docker run -e POSTGRES\_USER=postgres -e POSTGRES\_PASSWORD=alpacas -e POSTGRES\_DB=alpacax -e PGDATA=/var/lib/postgresql/data -e TZ="Asia/Tokyo" -v postgresql-volume:/var/lib/postgresql/data -v /C/Users/nishi/IdeaProjects/alpacax\_core/dockerfiles/postgres/90\_createdb.sh:/docker-entrypoint-initdb.d/90\_createdb.sh -p 5432:5432 -d --restart=always --name alpacax\_postgres alpacax/postgres

// 二回目  
docker run -e POSTGRES\_USER=postgres -e POSTGRES\_PASSWORD=alpacas -e POSTGRES\_DB=alpacax -e PGDATA=/var/lib/postgresql/data -e TZ="Asia/Tokyo" -v postgresql-volume:/var/lib/postgresql/data -p 5432:5432 -d --restart=always --name alpacax\_postgres alpacax/postgres

※error1  
docker: Error response from daemon:とエラーが出る  
C: drive is not shared. Please share it in Docker for Windows Settings.  
つまり設定でCドライブを共有できる設定にしてくれという意味  
タスクトレイのDockerを右クリックしSettingを開く  
「Shared Drives」でCドライブにチェックを入れApplyする  
Windowsログオンのパスワードを登録する  
これでDockerコンテナからCドライブにアクセスが可能になった

  
※error2  
https://qiita.com/kosshi/items/ed4c923173cfaa48cfcb  
https://win.just4fun.biz/?Windows10/%E9%AB%98%E9%80%9F%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%83%BB%E4%BC%91%E6%AD%A2%E7%8A%B6%E6%85%8B%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%AE%E5%AF%BE%E5%87%A6  
powercfg.exe /hibernate on

  
※error3  
https://qiita.com/kyo-bad/items/47b96883144a5bf1cb1e

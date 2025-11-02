---
title: "Oracleの権限テーブル(DBA_TAB_PRIVS)のバージョン差異"
date: 2018-08-01
categories: 
  - "information-technology"
tags: 
  - "db"
  - "oracle"
coverImage: "oracle-e1548303868367.jpg"
---

oracle DBでは、権限テーブルをDBA\_TAB\_PRIVS(USER\_TAB\_PRIVSも同様)で確認できるが、バージョン11g→12cで列追加の変更があった。しかし、公式でそのことを明記しているのが見つからなかったため、ここに残します。

(愚痴。oracleさんには、「この列は○○バージョンから追加されました」的なドキュメントにしてもらいたいものです。)

## テーブル列定義

11g→12cでの変更箇所を明示します。

11gの内容は取り消し線で示し、12cの変更箇所は太字で示しています。

| 列 | データ型 | NULL | 説明 |
| :-- | :-- | :-- | :-- |
| `GRANTEE` | VARCHAR2(30)→  `**VARCHAR2(128)**` | NOT NULL→  無し | アクセス権を付与されたユーザーまたはロールの名前 |
| `OWNER` | VARCHAR2(30)→  **`VARCHAR2(128)`** | NOT NULL→  **無し** | オブジェクトの所有者 |
| `TABLE_NAME` | VARCHAR2(30)→  **`VARCHAR2(128)`** | NOT NULL→  **無し** | オブジェクト名。オブジェクトには、表、パッケージ、索引、順序など、任意のオブジェクトを設定できる。 |
| `GRANTOR` | VARCHAR2(30)→  **`VARCHAR2(128)`** | NOT NULL→  **無し** | 権限付与を実行したユーザー名 |
| `PRIVILEGE` | `VARCHAR2(40)` | NOT NULL→  **無し** | オブジェクトについての権限 |
| `GRANTABLE` | `VARCHAR2(3)` |  | 権限が`GRANT OPTION`付きで付与されたか(`YES`)されていないか(`NO`) |
| `HIERARCHY` | `VARCHAR2(3)` |  | 権限が`HIERARCHY OPTION`付きで付与されたか(`YES`)されていないか(`NO`) |
| `COMMON` | `VARCHAR2(3)` |  | **12cより追加となった列**  権限がどのように付与されたかを示します。可能な値は次のとおり。  - `YES`: 権限が共通して付与された場合(`CONTAINER=ALL`が使用された場合) - `NO`: 権限がローカルで付与された場合(`CONTAINER=ALL`が使用されなかった場合)   |
| `TYPE` | `VARCHAR2(24)` |  | **12cより追加となった列**  オブジェクトのタイプ |

 

 

### 情報ソース

- 11gでのDBA\_TAB\_PRIVSのテーブル定義

https://docs.oracle.com/cd/E60665\_01/db112/REFRN/statviews\_5051.htm#i1627646

- 12cでのDBA\_TAB\_PRIVSのテーブル定義

https://docs.oracle.com/cd/E57425\_01/121/REFRN/GUID-4AC57A96-FF55-4788-9301-AFED23AE3934.htm

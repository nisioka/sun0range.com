---
title: Microsoft Entra IDで`prompt=consent`が管理者同意済みでも一般ユーザーをブロックするようになった件
date: "2026-04-05"
dateModified: "2026-04-05"
description: "Microsoft Entra IDで`prompt=consent`が管理者同意済みでも一般ユーザーをブロックするように挙動が変わった。"
featuredImagePath: "featured/microsoft-entra-id.webp"
nodeType: blog
category: 技術
tags: ["Microsoft", "Entra ID", "OAuth", "OIDC"]
---

## TL;DR

- Microsoft Entra ID (旧Azure AD) のOAuth認可フローで、`prompt=consent`を使用すると、テナント全体の管理者同意が付与済みであっても一般ユーザーが「管理者の承認が必要」画面でブロックされるように挙動が変わったよう
- `prompt=select_account` 等に変更すると同じユーザーが問題なく認証できる
- 2026年3月頃から複数の報告がMicrosoft Q&Aに上がっている
- クライアント側ではなくMicrosoft側でアナウンス無く挙動が変わっており、仕様変更か不具合かは不明だが私は不具合であると考えている(後述)

## 背景

Microsoft Graph API経由のOutlook連携機能のためにOAuth 2.0認可コードフローを使っていて、認可URLには`prompt=consent`を指定していました。  
これは、ユーザーにアプリがアクセスするスコープ（権限）を明示的に表示し、透明性を確保するためです。

## 発生した事象

2026年3月頃から、以下の事象が発生するようになりました:

1. Entra IDのユーザ同意設定が以下の何れかの場合：(組織利用では一般的な設定である理解)
  - 「ユーザーの同意を許可しない」
  - 「選択したアクセス許可に対して、検証済みの発行元からのアプリに対するユーザーの同意を許可する」 
2. テナントの管理者（Global Administrator）が「組織の代理として同意する」にチェックを入れて承諾済み
3. 一般ユーザーがOutlook連携を行おうとすると「管理者の承認が必要」画面が表示される
4. 管理者が再度承認しても、一般ユーザーのブロックは解消されない

## 再現条件の切り分け

検証の結果、`prompt`パラメータの値のみで結果が分かれることが判明しました:

| `prompt`パラメータ | 管理者同意済みの一般ユーザー | 結果 |
|---|---|---|
| `prompt=consent` | ブロックされる | NG |
| `prompt=select_account` | 正常に認証できる | OK |
| パラメータなし | 正常に認証できる | OK |

同じユーザー、同じ権限、同じ管理者同意の状態で、`prompt`パラメータだけで結果が異なります。

## 同時期のMicrosoft Q&A上の類似報告

同様の問題は2026年初頭から複数報告されています:

- [Standard Users Cannot Access Microsoft Graph Mail.Read Despite Admin Consent (2026-03-03)](https://learn.microsoft.com/en-ca/answers/questions/5806286/standard-users-cannot-access-microsoft-graph-mail) — `prompt=consent`の削除で解決
- [Getting error for enterprise application - AADSTS90094 (2026-03-04)](https://learn.microsoft.com/en-us/answers/questions/5807829/getting-error-for-enterprise-application) — 50人以上問題なかったアプリで突然発生、`prompt=consent`が原因として言及
- [Normal users cannot complete OAuth consent for Microsoft Graph Outlook integration (2026-02-14)](https://learn.microsoft.com/en-us/answers/questions/5775699/normal-users-cannot-complete-oauth-consent-for-mic) — Outlook連携で非管理者がOAuth同意を完了できない


## Microsoftへの不具合報告

上記Q&Aなどでは、現挙動を仕様である前提として、`prompt=consent`の削除での回避などで終わってしまっていたので、
その仕様が不適切だとして「不具合では？」というQ&Aを投稿することとした。ここでの反応が悪ければ別の手段も再考します。

https://learn.microsoft.com/en-us/answers/questions/5847660/bug-report-prompt-consent-blocks-non-admin-users-e

## この挙動の問題点(不具合だと考え**られ**る根拠)

### 1. `prompt=consent`のOIDC仕様上の定義との乖離

`prompt`パラメータはMicrosoft独自仕様ではなく、[OpenID Connect Core 1.0 Section 3.1.2.1](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)で定義されている標準パラメータです:

> The Authorization Server SHOULD prompt the End-User for consent before returning information to the Client.

仕様上は「同意画面を表示する」というUIヒントであり、「ユーザーに同意権限がなければブロックする」とは定義されていません。

### 2. 管理者同意の無効化

`prompt=consent`が指定されると、Entra IDは既存の管理者同意を無視して、あたかも同意が存在しないかのように振る舞います。これにより:

- `prompt=select_account`: 管理者同意が**尊重される** → 通過
- `prompt=consent`: 管理者同意が**無視される** → ブロック

ポリシー判定（アプリが認可されているかどうか）が、UXパラメータ（同意画面を出すかどうか）に依存しているのは論理的に不整合です。

### 3. スコープ表示と管理者同意の両立が不可能に

`prompt=consent`には「ユーザーにアプリがアクセスするスコープを表示する」という正当なユースケースがあります。特にメールの読み書きのような高権限スコープでは、ユーザーへの透明性確保は重要です。

現在の挙動では:

- スコープを表示したい → `prompt=consent`を使う → 一般ユーザーがブロックされる
- ブロックを回避したい → `prompt=select_account`を使う → スコープが表示されない

**「スコープの表示」と「管理者同意の尊重」を両立する手段がなくなっています。**

### 4. 管理者同意のみなら通るのに、ユーザー同意が加わると壊れる

最も不可解な点です:

- ユーザーフローで同意が求められない場合（`prompt=select_account`）: 管理者同意だけで十分 → **OK**
- ユーザーフローで同意が求められる場合（`prompt=consent`）: 管理者同意があっても、ユーザーにも同意権限が必要 → **NG**

管理者同意が付与されている状態で、ユーザー同意のフローが「加わる」ことによって、かえって管理者同意が無効化されるという矛盾した挙動です。

### 5. Microsoftの公式ガイダンスも実装困難

Microsoftの[トラブルシューティングガイド Step 7](https://learn.microsoft.com/en-us/troubleshoot/entra/entra-id/app-integration/troubleshoot-consent-issues#step-7-verify-if-the-prompt-parameter-is-passed)では次のように案内されています:

> Sometimes, signing in to the application requires passing the prompt parameter of consent or admin_consent. Once the application obtains consent, make sure the prompt parameter isn't specified.

これは「初回のconsent取得時はprompt=consentを使い、取得後は外す」ことを意味しますが、実装上これは非現実的です:

- 認可URLを構築する時点（トークン取得前）で、そのテナントの同意状態を事前に知るAPIが存在しない
- マルチテナントアプリでは、テナントごとに同意状態が異なり、Entra側で同意が取り消されてもアプリ側に通知されない

## 考えられる原因

2025年7月にMicrosoftはテナントのデフォルトのユーザー同意ポリシーをより制限的な設定に自動移行しています（[MC1097272](https://learn.microsoft.com/en-us/answers/questions/5526830/sudden-change-to-microsoft-user-consent-settings-b)）。この変更自体は2025年8月末までにロールアウト完了とされていますが、`prompt=consent`との組み合わせで問題が顕在化した時期は2026年初頭からです。

また、2026年3月にはConditional Accessの強化変更（OIDCスコープへの適用拡大）も予告されており、複数の変更が重なって影響している可能性があります。

いずれにしても、アプリケーション側の変更なしに挙動が変わっているため、Microsoft側の変更が原因であることは確実です。

## 回避策

認可URLの`prompt=consent`を`prompt=select_account`に変更します。

```diff
- prompt=consent
+ prompt=select_account
```

これにより:
- 管理者同意が尊重され、一般ユーザーがブロックされなくなる
- アカウント選択画面は表示されるため、UXとしても不自然ではない
- ただし、ユーザーにスコープが表示されなくなるトレードオフがある

## まとめ

| 項目 | 内容 |
|---|---|
| 影響を受けるアプリ | `prompt=consent`を使用するOAuthアプリ全般 |
| 発生条件 | 一般ユーザーの同意制限あり + `prompt=consent`使用 |
| 発生時期 | 2026年3月頃〜 |
| 回避策 | `prompt=select_account`への変更 |
| 根本対応 | Microsoft側の修正待ち |

`prompt=consent`は「同意画面を見せる」ための標準的なOIDCパラメータですが、現在のMicrosoft Entra IDでは管理者同意を無効化してユーザーをブロックするトリガーになってしまっています。同様の問題に遭遇した場合は、`prompt=select_account`への変更を検討してください。

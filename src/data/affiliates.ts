/**
 * アフィリエイト案件のカタログ。
 *
 * 記事(index.md)にはASPが発行した生HTMLを貼らず、`<affiliate-card id="..." />` と
 * IDだけを書く。実体はこのファイルで一元管理する。
 *
 * - リンク切れ・報酬条件の変更・ASPの乗り換えは、このファイルだけを直せば全記事に反映される
 * - 提携が終了したら `enabled: false` にする。記事側は編集しなくてよい(カードごと非表示になる)
 * - `url` にはASPの管理画面で発行したリンクをそのまま入れる
 */

/** 提携先ASP。表示ラベルは affiliate-card.tsx の PROGRAM_LABEL を参照 */
export type AffiliateProgram =
  | "moshimo"
  | "a8"
  | "valuecommerce"
  | "afb"
  | "amazon"
  | "rakuten"

export type Affiliate = {
  /** 記事から参照するID。ケバブケース。一度公開したら変更しない */
  id: string
  /** 商品・サービス名。カードの見出しになる */
  name: string
  /** 一言紹介。記事の文脈に合わせて書く(なぜこの記事で薦めるのか) */
  description: string
  /** ASPが発行したアフィリエイトリンク */
  url: string
  program: AffiliateProgram
  /**
   * カード画像。`src/images/affiliates/` 配下のファイル名(例: "beelink.webp")。
   * 省略時は画像なしのレイアウトになる(枠は固定なので高さは変わらない)
   */
  imagePath?: string
  /** ボタン文言。省略時は「詳細を見る」 */
  ctaLabel?: string
  /** false の間はカードを描画しない。提携前・提携終了時に使う */
  enabled: boolean
}

/**
 * 現在はASP提携前のため、すべて enabled: false のプレースホルダ。
 * 提携が完了したら `url` を発行済みリンクに差し替えて enabled: true にする。
 */
export const affiliates: Affiliate[] = [
  {
    id: "beelink-gtr9-pro",
    name: "Beelink GTR9 Pro",
    description:
      "Ryzen AI Max+ 395 搭載のミニPC。128GB のユニファイドメモリでローカルLLMを動かせる。",
    url: "https://example.com/placeholder",
    program: "moshimo",
    ctaLabel: "Amazonで見る",
    enabled: false,
  },
  {
    id: "conoha-vps",
    name: "ConoHa VPS",
    description:
      "時間課金で使えるVPS。検証用にSSHサーバを立てて壊して作り直す用途に向く。",
    url: "https://example.com/placeholder",
    program: "a8",
    ctaLabel: "詳細を見る",
    enabled: false,
  },
]

const affiliateMap = new Map(affiliates.map(a => [a.id, a]))

/**
 * IDから案件を引く。未定義IDや enabled: false の場合は undefined を返し、
 * 呼び出し側(AffiliateCard)は何も描画しない。
 */
export const findAffiliate = (id: string): Affiliate | undefined => {
  const affiliate = affiliateMap.get(id)
  return affiliate?.enabled ? affiliate : undefined
}

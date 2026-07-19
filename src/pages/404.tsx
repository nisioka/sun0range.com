import * as React from "react"

import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ location }: { location: Location }) => {
  return (
    <Layout location={location}>
      <h1>404: ページが見つかりません</h1>
      <p>
        お探しのページは移動または削除された可能性があります。
        <br />
        <Link to="/">トップページへ戻る</Link> か、
        <Link to="/search">サイト内検索</Link> をお試しください。
      </p>
    </Layout>
  )
}

export const Head = ({ location }: { location: Location }) => (
  <Seo title="404: ページが見つかりません" location={location} />
)

export default NotFoundPage

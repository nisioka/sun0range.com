import * as React from "react"

import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ location }: { location: Location }) => {
  return (
    <Layout location={location}>
      <NotFoundWrapper>
        <p className="status-code">404</p>
        <h1>ページが見つかりません</h1>
        <p>お探しのページは移動または削除された可能性があります。</p>
        <div className="actions">
          <Link className="primary" to="/">
            トップページへ戻る
          </Link>
          <Link className="secondary" to="/search">
            サイト内検索
          </Link>
        </div>
      </NotFoundWrapper>
    </Layout>
  )
}

const NotFoundWrapper = styled.div`
  text-align: center;
  padding: var(--spacing-16) var(--spacing-4);

  .status-code {
    font-size: var(--fontSize-7);
    font-weight: var(--fontWeight-black);
    color: var(--color-accent);
    margin: 0;
    line-height: 1;
  }

  h1 {
    font-size: var(--fontSize-4);
    margin: var(--spacing-4) 0;
  }

  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    margin-top: var(--spacing-8);

    a {
      display: inline-block;
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: 8px;
      text-decoration: none;
      font-weight: var(--fontWeight-bold);
      transition: background 0.15s ease, color 0.15s ease,
        border-color 0.15s ease;
    }

    .primary {
      background: var(--color-accent);
      color: var(--color-accent-contrast);

      &:hover {
        background: var(--color-accent-strong);
      }
    }

    .secondary {
      border: 1px solid var(--color-border);
      color: var(--color-text);

      &:hover {
        border-color: var(--color-accent);
        color: var(--color-accent-strong);
      }
    }
  }
`

export const Head = ({ location }: { location: Location }) => (
  <Seo title="404: ページが見つかりません" location={location} />
)

export default NotFoundPage

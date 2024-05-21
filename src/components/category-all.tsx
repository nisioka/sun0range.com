import * as React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const CategoryAll = () => {

  const all = [
    '技術',
    'イベントレポート',
    '生活',
    '用語集',
    '書評',
    '業務効率化',
  ]

  return (
    <CategoryAllTitle>
      <h5>カテゴリ</h5>
      <ul>
      {all.map((category, index) => (
        <li key={index}>
          <Link to={`/category/${category}`}>
            {category}
          </Link>
        </li>
      ))}
      </ul>
    </CategoryAllTitle>
  )
}

export default CategoryAll

const CategoryAllTitle = styled.div`
  background-color: #fff;
  
  h5 {
    margin-top: var(--spacing-1);
  }
  
  li {
    list-style: none;
    margin: var(--spacing-1);
  }
  
  
`
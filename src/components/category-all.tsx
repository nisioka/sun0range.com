import * as React from "react"

import { Link } from "gatsby"
import styled from "styled-components"
import { categoryAll, convertCategory } from "../utilFunction"

const CategoryAll = () => {
  return (
    <CategoryAllTitle>
      <h5>カテゴリ</h5>
      <ul>
        {categoryAll.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${convertCategory(category)}`}>
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
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--spacing-4);

  h5 {
    margin: 0 0 var(--spacing-3);
    font-size: var(--fontSize-1);
    color: var(--color-heading);
    padding-left: var(--spacing-2);
    border-left: 3px solid var(--color-accent);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      display: block;
      padding: var(--spacing-2);
      border-radius: 6px;
      color: var(--color-text);
      text-decoration: none;
      transition: background 0.15s ease, color 0.15s ease;

      &:hover {
        background: var(--color-surface-2);
        color: var(--color-accent-strong);
      }
    }
  }
`

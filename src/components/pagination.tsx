import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

type PaginationProps = {
  maxPage: number
  current: number
  type?: string
}
const Pagination = ({ maxPage, current, type = "" }: PaginationProps) => {
  let first
  let prev
  let next
  let last

  if (current === 1) {
    first = (
      <li className="not-work" key="pagination0">
        <span>最新</span>
      </li>
    )
  } else {
    first = (
      <li key="pagination0">
        <Link to={`/${type}${type ? "/" : ""}`}>最新</Link>
      </li>
    )
  }

  if (current === 1) {
    prev = (
      <li className="not-work" key="pagination1">
        <span>前へ</span>
      </li>
    )
  } else if (current === 2) {
    prev = (
      <li key="pagination1">
        <Link to={`/${type}${type ? "/" : ""}`}>前へ</Link>
      </li>
    )
  } else {
    prev = (
      <li key="pagination1">
        <Link to={`/${type}${type ? "/" : ""}page/${current - 1}/`}>前へ</Link>
      </li>
    )
  }

  if (current === maxPage) {
    next = (
      <li className="not-work" key="pagination3">
        <span>次へ</span>
      </li>
    )
  } else {
    next = (
      <li key="pagination3">
        <Link to={`/${type}${type ? "/" : ""}page/${current + 1}/`}>次へ</Link>
      </li>
    )
  }

  if (current === maxPage) {
    last = (
      <li className="not-work" key="paginatio4">
        <span>最後</span>
      </li>
    )
  } else {
    last = (
      <li key="pagination4">
        <Link to={`/${type}${type ? "/" : ""}page/${maxPage}/`}>最後</Link>
      </li>
    )
  }
  if (maxPage > 1) {
    return (
      <PaginationWrapper>
        <ul>
          {first}
          {prev}
          <li className="page-count" key="pagination2">
            page {current}/{maxPage}
          </li>
          {next}
          {last}
        </ul>
      </PaginationWrapper>
    )
  } else {
    return <></>
  }
}

export default Pagination

const PaginationWrapper = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    padding: 0;

    li {
      padding: 0;
      margin: 0;

      &.page-count {
        display: flex;
        align-items: center;
        color: var(--color-text-light);
        padding: 0 var(--spacing-2);
      }

      &.not-work span {
        background: var(--color-surface-2);
        color: var(--color-text-light);
        border-color: var(--color-border);
      }

      span,
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 700;
        color: var(--color-text);
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-border);
        padding: var(--spacing-1) var(--spacing-3);
        transition: border-color 0.15s ease, color 0.15s ease;
      }

      a:hover {
        border-color: var(--color-accent);
        color: var(--color-accent-strong);
      }
    }
  }
`

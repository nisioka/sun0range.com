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
          <li key="pagination2">
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

    li {
      padding: 0 10px;

      &.not-work span {
        text-decoration: none;
        background: var(--orange);
        color: #fff;
        opacity: 0.5;
      }

      span,
      a {
        text-decoration: underline;
        display: flex;
        align-items: center;
        font-weight: 700;
        color: var(--orange);
        border-radius: 5px;
        border: 1px solid var(--orange);
        padding: 0 10px;
      }
    }
  }
`

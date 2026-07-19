import styled from "styled-components"

export const ContentsListHeader = styled.header`
  text-align: center;

  @media screen and (max-width: 511px) {
    padding: 0 12px;
  }

  h1,
  h2 {
    &:after {
      margin: var(--spacing-2) auto 0;
      content: "";
      display: block;
      width: 60px;
      height: 3px;
      border-radius: 2px;
      background: var(--color-accent);
    }
  }
`

export const ContentsOrderedListWrapper = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
  width: 100%;

  li {
    margin: 0;
    padding: 0;
    overflow-wrap: anywhere;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    article,
    a {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    a {
      color: var(--color-text);
      text-decoration: none;
    }

    h2 {
      font-size: var(--fontSize-2);
      color: var(--color-heading);
      margin: 0 0 var(--spacing-2);
      transition: color 0.15s ease;
    }

    a:hover h2 {
      color: var(--color-accent-strong);
    }
  }

  .thumbnail .gatsby-image-wrapper {
    display: block;
    width: 100%;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: var(--spacing-4);

    p {
      margin: 0;
      color: var(--color-text-light);
      font-size: var(--fontSize-0);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .card-date {
    margin-top: auto;
    padding-top: var(--spacing-2);
    text-align: right;
    color: var(--color-text-light);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const NormalAreaWrapper = styled.div`
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--spacing-6);
`

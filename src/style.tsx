import styled from "styled-components"

export const ContentsListHeader = styled.header`
  text-align: center;

  h1, h2 {
    &:after {
      margin: 0 auto;
      content: '';
      display: block;
      width: 98%;
      height: 3px;
      background: var(--orange);
    }
  }
`

export const ContentsOrderedListWrapper = styled.ol`
  column-count: 1;
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
  width: var(--maxWidth-full);

  li {
    padding: 5px;
    margin: var(--spacing-1) ;
    box-sizing: border-box;
    border: 1px solid var(--black);
    border-radius: 5px;

    a {
      color: var(--black);
      text-decoration: none;
    }

    h2 {
      font-size: var(--fontSize-2);
    }
  }
  .thumbnail {
    float: left;
  }

  @media screen and (min-width: 512px) {
    column-count: 2;

    li {
      padding: 15px;
      width: 48%;

      h2 {
        font-size: var(--fontSize-3);
      }

      a {
        &:hover h2 {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    column-count: 3;

    li {
      width: 32%;
    }
  }
`
import styled from "styled-components"

export const ContentsListHeader = styled.header`
  text-align: center;

  h1 {
    &:after {
      margin: 0 auto;
      content: '';
      display: block;
      width: 700px;
      height: 3px;
      background: rgb(255, 100, 0);
    }
  }
`

export const ContentsOrderedListWrapper = styled.ol`
  list-style: none;
  padding: 0;
  li {
    margin: var(--spacing-1) ;
    border: 1px solid var(--black);
    border-radius: 5px;

    a {
        color: var(--black);
        text-decoration: none ;
    }
    h2 {
        font-size: var(--fontSize-2);
    }
  }
  .thumbnail {
    float: left;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;

    li {
        box-sizing: border-box;
        padding: 15px;
        width: 32%;

        h2 {
          font-size: 22px;

          a {
              &:hover {
              text-decoration: underline;
            }
          }
        }

      .thumbnail {
        transition: .3s;

        &:hover {
            opacity: 0.5;
        }
      }
    }
  }
`
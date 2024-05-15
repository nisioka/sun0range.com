import * as React from "react"
import config from "../../gatsby-config";
import {Link} from "gatsby";
import styled from "styled-components"

const Header = ({location}: { location: Location }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const { siteMetadata }  = config as { siteMetadata: SiteMetadata }
  let siteName

  if (isRootPath) {
    siteName = <p className="logo">{siteMetadata.title}</p>
  } else {
    siteName = <p className="logo"><Link to={rootPath}>{siteMetadata.title}</Link></p>
  }
  return (
      <HeaderWrapper>
        <div className="container">
          {siteName}
          <nav>
            <ul>
              <li>
                <Link to="/">ホーム</Link>
              </li>
              <li>
                <Link to="/">技術系</Link>
              </li>
              <li>
                <Link to="/">イベントレポート</Link>
              </li>
              <li>
                <Link to="/">生活</Link>
              </li>
              <li>
                <Link to="/">用語集</Link>
              </li>
              <li>
                <Link to="/management/how-about-this-blog">このブログについて</Link>
              </li>
            </ul>
          </nav>
        </div>
      </HeaderWrapper>
  )
}
export default Header

const HeaderWrapper = styled.header`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .container {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    margin: 0;
    font-weight: bold;

    a {
      text-decoration: none;
      color: var(--black);
    }
  }

  nav ul {
    margin: 0;
    list-style: none;
    display: flex;

    li {
      padding: var(--paddingBaseTop) 0 0 var(--paddingBaseLeft);

      a {
        text-decoration: none;
        color: var(--black);
        font-weight: bold;
      }
    }
  }
`
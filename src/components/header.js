import * as React from "react"
import {siteMetadata} from "../../gatsby-config";
import {Link} from "gatsby";
import styled from "styled-components"

const Header = ({location}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let siteName

  if (isRootPath) {
    siteName = <h1 className="logo">{siteMetadata.title}</h1>
  } else {
    siteName = (
        <p className="logo">
          <Link to={rootPath}>{siteMetadata.title}</Link>
        </p>
    )
  }
  return (
      <HeaderWrapper>
        <div className="container">
          {siteName}
          <nav>
            <ul>
              <li>
                <Link to="/blogs/">ブログ</Link>
              </li>
              <li>
                <Link to="/about/">About Me</Link>
              </li>
              <li>
                <Link to="/contact/">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </HeaderWrapper>
  )
}
export default Header

const HeaderWrapper = styled.header`
  //ここにcssを記述していく
`
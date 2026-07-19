import * as React from "react"
import config from "../../gatsby-config"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Header = ({ location }: { location: Location }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const { siteMetadata } = config as { siteMetadata: SiteMetadata }
  let siteName

  if (isRootPath) {
    siteName = <p className="logo">{siteMetadata.title}</p>
  } else {
    siteName = (
      <p className="logo">
        <Link to={rootPath}>{siteMetadata.title}</Link>
      </p>
    )
  }
  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleMenu = () => setMenuOpen(open => !open)
  return (
    <HeaderWrapper>
      <div className="global-header">
        {siteName}
        <nav className="nav-pc">
          <ul>
            <li>
              <Link to="/category/information-technology">技術系</Link>
            </li>
            <li>
              <Link to="/category/event-report">イベントレポート</Link>
            </li>
            <li>
              <Link to="/category/life">生活</Link>
            </li>
            <li>
              <Link to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                検索
              </Link>
            </li>
            <li>
              <Link to="/management/how-about-this-blog">
                このブログについて
              </Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className={`hamburger${menuOpen ? " toggle" : ""}`}
          onClick={toggleMenu}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <span></span>
        </button>
        <nav className={`nav-mobile${menuOpen ? " toggle" : ""}`}>
          <ul>
            <li>
              <Link to="/category/information-technology">技術系</Link>
            </li>
            <li>
              <Link to="/category/event-report">イベントレポート</Link>
            </li>
            <li>
              <Link to="/category/life">生活</Link>
            </li>
            <li>
              <Link to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                検索
              </Link>
            </li>
            <li>
              <Link to="/management/how-about-this-blog">
                このブログについて
              </Link>
            </li>
            <li className="close">
              <button type="button" onClick={toggleMenu}>
                <span>閉じる</span>
              </button>
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
  background-color: #fff;

  .global-header {
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

  .nav-pc ul {
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

  .nav-mobile,
  .hamburger {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .nav-pc {
      display: none;
    }

    .hamburger {
      position: relative;
      display: block;
      width: 30px;
      height: 25px;
      margin: 0 0 0 auto;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;

      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 2px;
        background-color: var(--black);
      }
      span {
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 90%;
        height: 2px;
        background-color: var(--black);
        transform: translateY(-50%);
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 65%;
        height: 2px;
        background-color: var(--black);
      }
    }

    .nav-mobile {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: block;
      background: rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease-in-out;
      opacity: 0;
      transform: translateY(-100%);

      ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      li {
        margin: 0;
        padding: 0;
        span {
          font-size: 15px;
        }
        a,
        span {
          color: #fff;
          display: block;
          padding: 20px 0;
        }
      }
      .close {
        cursor: pointer;

        button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
      }
    }
    .toggle {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

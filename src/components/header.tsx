import * as React from "react"
import config from "../../gatsby-config"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import ThemeToggle from "./theme-toggle"

const NAV_LINKS = [
  { to: "/category/information-technology", label: "技術系" },
  { to: "/category/event-report", label: "イベントレポート" },
  { to: "/category/life", label: "生活" },
  { to: "/search", label: "検索", icon: faMagnifyingGlass },
  { to: "/management/how-about-this-blog", label: "このブログについて" },
]

const NavLinkItems = () => (
  <>
    {NAV_LINKS.map(link => (
      <li key={link.to}>
        <Link to={link.to}>
          {link.icon && <FontAwesomeIcon icon={link.icon} />}
          {link.label}
        </Link>
      </li>
    ))}
  </>
)

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
            <NavLinkItems />
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className={`hamburger${menuOpen ? " toggle" : ""}`}
            onClick={toggleMenu}
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
          >
            <span></span>
          </button>
        </div>
        <nav className={`nav-mobile${menuOpen ? " toggle" : ""}`}>
          <ul>
            <NavLinkItems />
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
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);

  .global-header {
    height: var(--height-header);
    padding: 0 var(--paddingBaseLeft);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    margin: 0;
    font-weight: bold;
    color: var(--color-heading);

    a {
      text-decoration: none;
      color: var(--color-heading);
      transition: color 0.15s ease;

      &:hover {
        color: var(--color-accent-strong);
      }
    }
  }

  .nav-pc ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--spacing-5);

    li {
      margin: 0;
      padding: 0;

      a {
        text-decoration: none;
        color: var(--color-text);
        font-weight: bold;
        transition: color 0.15s ease;

        &:hover {
          color: var(--color-accent-strong);
        }
      }
    }
  }

  .header-actions {
    display: none;
  }

  .nav-mobile,
  .hamburger {
    display: none;
  }

  @media screen and (max-width: 511px) {
    /* 本文(記事のpadding 12px)とテキストの左右位置を揃える */
    .global-header {
      padding: 0 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .nav-pc {
      display: none;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .hamburger {
      position: relative;
      display: block;
      width: 30px;
      height: 25px;
      margin: 0;
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
        background-color: var(--color-text);
      }
      span {
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 90%;
        height: 2px;
        background-color: var(--color-text);
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
        background-color: var(--color-text);
      }
    }

    .nav-mobile {
      z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: block;
      background: var(--color-surface);
      transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
      opacity: 0;
      transform: translateY(-100%);

      ul {
        padding: 0;
        margin: 0;
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
          color: var(--color-text);
          display: block;
          padding: 20px 0;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          color: var(--color-accent-strong);
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

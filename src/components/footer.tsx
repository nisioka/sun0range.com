import * as React from "react"

import { Link } from "gatsby"
import styled from "styled-components"
import config from "../../gatsby-config"

const { siteMetadata } = config as { siteMetadata: SiteMetadata }

const FOOTER_LINKS = [
  { to: "/", label: "トップ" },
  { to: "/search", label: "検索" },
  { to: "/management/how-about-this-blog", label: "このブログについて" },
]

const Footer = () => {
  return (
    <FooterWrapper>
      <nav>
        <ul>
          {FOOTER_LINKS.map(link => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <small>
        © {new Date().getFullYear()} {siteMetadata.title}
      </small>
    </FooterWrapper>
  )
}
export default Footer

const FooterWrapper = styled.footer`
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-8) 0;
  text-align: center;
  color: var(--color-text-light);

  ul {
    margin: 0 0 var(--spacing-4);
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-5);
  }

  li {
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-accent-strong);
    }
  }
`

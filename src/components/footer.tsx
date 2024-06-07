import * as React from "react"

import config from "../../gatsby-config"

const { siteMetadata } = config as { siteMetadata: SiteMetadata }

const Footer = () => {
  return (
    <footer>
      <small>
        © {new Date().getFullYear()} {siteMetadata.title}
      </small>
    </footer>
  )
}
export default Footer

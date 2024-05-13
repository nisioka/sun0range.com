import * as React from "react"

import config from "../../gatsby-config"

const { siteMetadata }  = config as { siteMetadata: SiteMetadata }

const Footer = () => {
  return (
      <footer>
        <p>
          <small>© {new Date().getFullYear()} {siteMetadata.title}</small>
        </p>
      </footer>
  )
}
export default Footer
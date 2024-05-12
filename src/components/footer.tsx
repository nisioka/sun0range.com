import { siteMetadata } from "../../gatsby-config"

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
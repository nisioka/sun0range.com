import * as React from "react"
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  location: Location
  children: React.ReactNode
}
const Layout = ({ location, children }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

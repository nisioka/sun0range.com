import * as React from "react"
import Header from "./header";
import Footer from "./footer";
import TagCloud from "./tag-cloud"
import CategoryAll from "./category-all"
import { defineCustomElements  } from "@deckdeckgo/highlight-code/dist/loader";

type LayoutProps = {
  location: Location
  children: React.ReactNode
}
const Layout = ({ location, children }: LayoutProps) => {
  defineCustomElements();
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="grid-header">
        <Header location={location} />
      </div>
      <div className="grid-main">
        <main className="container">{children}</main>
      </div>
      <div className="grid-category">
        <CategoryAll />
      </div>
      <div className="grid-tag">
        <TagCloud />
      </div>
      <div className="grid-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Layout

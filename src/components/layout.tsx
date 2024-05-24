import * as React from "react"
import Header from "./header";
import Footer from "./footer";
import TagCloud from "./tag-cloud"
import GoogleAdsense from "./google-adsense"
import CategoryAll from "./category-all"
import { NormalAreaWrapper } from "../style"

type LayoutProps = {
  location: Location
  children: React.ReactNode
}
const Layout = ({ location, children }: LayoutProps) => {
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
      <div className="grid-ad1">
        <GoogleAdsense />
      </div>
      <div className="girid-author">
        <NormalAreaWrapper>
          <h5><a className="twitter-timeline" href="https://twitter.com/nisioka55?ref_src=twsrc%5Etfw" target="_blank">Post by nisioka55</a></h5>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </NormalAreaWrapper>
      </div>
      <div className="grid-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Layout

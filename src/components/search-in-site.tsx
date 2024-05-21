import * as React from "react"
import { NormalAreaWrapper } from "../style"

const SearchInSite = () => {
  return (
    <NormalAreaWrapper>
      <form role="search" method="get" id="searchform" className="searchform" action="https://www.google.com/search">
        <div>
          <h5><label className="screen-reader-text" htmlFor="s">サイト内検索</label></h5>
          <input type="text" defaultValue="準備中" name="q" id="s" />
          <input type="submit" id="searchsubmit" value="検索" />
        </div>
      </form>
    </NormalAreaWrapper>
  )
}
export default SearchInSite
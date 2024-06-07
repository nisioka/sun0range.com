import * as React from "react"
import { NormalAreaWrapper } from "../style"

const GoogleAdsense = () => {
  return (
    <NormalAreaWrapper>
      <h5>広告</h5>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3123919168024595"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block", backgroundColor: "#fff" }}
        data-ad-client="ca-pub-3123919168024595"
        data-ad-slot="9075604626"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </NormalAreaWrapper>
  )
}
export default GoogleAdsense

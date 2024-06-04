/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import config from "../../gatsby-config"

type SeoProps = {
  title: string
  description?: string
  location: Location
  imagePath?: string
  post?: CommonPost
  children?: React.ReactNode
}

const Seo = ({ title, description, location, imagePath, post, children }: SeoProps) => {
  const { siteMetadata }  = config as { siteMetadata: SiteMetadata }
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const metaDescription = description || siteMetadata.description
  const fullTitle = (isRootPath ? siteMetadata.title : `${title} | ${siteMetadata.title}`)
  const canonicalUrl = siteMetadata.siteUrl + location.pathname.replace(/\/page\/([0-9])+\//, "")
  const imageUrl = `${siteMetadata.siteUrl}${imagePath ? imagePath : "/favicon.webp"}`

  function createJsonLd() {
    // JSON-LDの設定
    const author = [
      {
        "@type": "Person",
        name: siteMetadata.author.name,
        description: siteMetadata.author.summary,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.social.twitter,
          siteMetadata.social.github
        ]
      }
    ]

    const publisher = {
      "@type": "Organization",
      name: siteMetadata.title,
      description: siteMetadata.description,
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}/favicon.webp`,
        width: 512,
        height: 512
      }
    }

    let jsonLd = [
      {
        "@context": "http://schema.org",
        "@type": isRootPath ? "webSite" : "webPage",
        inLanguage: "ja",
        url: canonicalUrl,
        name: title,
        author: author,
        publisher: publisher,
        image: imageUrl,
        description: metaDescription
      }
    ]
    if (post) {
      const article = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: canonicalUrl,
        name: post.title,
        headline: post.title,
        image: {
          "@type": "ImageObject",
          url: imageUrl,
        },
        description: post.excerpt,
        datePublished: new Date(post.date),
        dateModified: new Date(post.dateModified),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        author: author,
        publisher: publisher
      }
      // @ts-ignore
      jsonLd = [...jsonLd, article]
    }
    return JSON.stringify(jsonLd)
  }

  let jsonLd = createJsonLd()

  return (
    <>
      <html lang="ja" />
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{jsonLd}</script>

      <meta name="description" content={metaDescription} />
      {imagePath && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={imageUrl} />
          <meta property="twitter:image" content={imageUrl} />
        </>
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={`${isRootPath ? "website" : "webpage"}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo

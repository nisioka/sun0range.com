/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
import type { GatsbyConfig } from "gatsby"

type feedArgument = {
  query: {
    site: {
      siteMetadata: SiteMetadata
    }
    allMarkdownRemark: allMarkdownRemark
  }
}

type allMarkdownRemark = {
  nodes: {
    frontmatter: {
      title: string
      dateModified: string
    }
    excerpt: string
    html: string
    fields: {
      slug: string
    }
  }[]
}

const siteMetadata: SiteMetadata = {
  title: `分かりやすい技術ブログ`,
  author: {
    name: `nisioka`,
    summary: `オレンジ好きの中で最強のエンジニアになりたい。`,
    avatarImagePath: "src/static/24okBlock.webp",
  },
  description: `誰にでも分かりやすいをモットーに、IT技術的な内容を投稿するブログです。`,
  siteUrl: `https://sun0range.tech.server-on.net`,
  social: {
    github: `nisioka`,
    twitter: `nisioka55`,
  },
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config: GatsbyConfig = {
  siteMetadata: siteMetadata,
  trailingSlash: "never",
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-G75Y1FWLC0", //GOOGLE_ANALYTICS_TRACKING_ID,
          // "pub-3123919168024595",//GOOGLE_ADSENSE_ID,
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [`/page/*`, `/404?(.*)`],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              wrapperStyle: `margin-left: initial;`,
              backgroundColor: `transparent`,
              quality: 70,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: feedArgument) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.dateModified,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {dateModified: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    dateModified
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `分かりやすい技術ブログ`,
        short_name: `分か技ブログ`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/favicon.webp`, // This path is relative to the root of the site.
      },
    },
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url: process.env.WPGRAPHQL_URL || `http://localhost/graphql`,
        // type: {
        //   __all: {
        //     limit: process.env.NODE_ENV === `development` ? 5 : null
        //   }
        // },
        develop: {
          hardCacheMediaFiles: true,
        },
        html: {
          placeholderType: `blurred`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `https-sun0range-tech-server-on-net`
      }
    },
  ],
}
export default config

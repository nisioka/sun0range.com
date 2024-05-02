import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {GatsbyImage } from "gatsby-plugin-image";

const styleTextRight = {
  textAlign: "right",
}

const BlogIndex = ({ data, location }) => {
  const mdPosts = data.allMdx.nodes
  const wpPosts = data.allWpPost.nodes
  const posts = mdPosts.map(post => {
    return {
      title: post.frontmatter.title,
      excerpt: post.excerpt,
      slug: post.fields.slug,
      date: post.frontmatter.date,
      description: post.frontmatter.description,
      altText: "",
    }
  }).concat(wpPosts.map(post => {
    return {
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.date,
      altText: post.featuredImage?.node.altText || "",
      gatsbyImage: post.featuredImage?.node.gatsbyImage || null,
    }
  }));

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="https://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <div style={styleTextRight}><small>{post.date}</small></div>
                </header>
                <section>
                  <GatsbyImage alt={post.altText} image={post.gatsbyImage} />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY/MM/DD")
          description
        }
      }
    }
    allWpPost(sort: { date: DESC }) {
      nodes {
        title
        excerpt
        slug
        date(formatString: "YYYY/MM/DD")
        featuredImage{
          node{
            altText
            gatsbyImage(width: 100, height: 100)
          }
        }
      }
    }
  }
`

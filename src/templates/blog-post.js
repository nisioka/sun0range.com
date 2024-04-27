import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { site, markdownRemark, mdPrevious, mdNext, wpPost, wpPrevious, wpNext },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const post = {
    id: markdownRemark?.id || wpPost?.id,
    title: markdownRemark?.frontmatter.title || wpPost?.title,
    html: markdownRemark?.html || wpPost?.content,
    excerpt: markdownRemark?.excerpt || wpPost?.excerpt,
    slug: markdownRemark?.fields.slug || wpPost?.slug,
    date: markdownRemark?.frontmatter.date || wpPost?.date,
    description: markdownRemark?.frontmatter.description,
    altText: wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: wpPost?.featuredImage?.node.gatsbyImage || null,
  }
  const previous = {
    id: mdPrevious?.id || wpPrevious?.id,
    title: mdPrevious?.frontmatter.title || wpPrevious?.title,
    slug: mdPrevious?.fields.slug || wpPrevious?.slug,
  }
  const next = {
    id: mdNext?.id || wpNext?.id,
    title: mdNext?.frontmatter.title || wpNext?.title,
    slug: mdNext?.fields.slug || wpNext?.slug,
  }

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { mdPost, wpPost } }) => {
  const post = {
    id: mdPost?.id || wpPost?.id,
    title: mdPost?.frontmatter.title || wpPost?.title,
    slug: mdPost?.fields.slug || wpPost?.slug,
  }
  return (
    <Seo
      title={post.title}
      description={post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
      }
    }
    mdPrevious: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    mdNext: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    wpPost {
      id
      title
      content
      excerpt
      slug
      date(formatString: "YYYY/MM/DD")
      featuredImage{
        node{
          altText
          gatsbyImage(width: 960)
        }
      }
    }
    wpPrevious: wpPost(id: { eq: $previousPostId }) {
      title
      slug
    }
    wpNext: wpPost(id: { eq: $nextPostId }) {
      title
      slug
    }
  }
`

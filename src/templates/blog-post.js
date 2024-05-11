import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogPostTemplate = ({
  data: { site, allFile, mdx, mdPrevious, mdNext, wpPost, wpPrevious, wpNext },
  location, children
}) => {
  const post = {
    id: mdx?.id || wpPost?.id,
    title: mdx?.frontmatter.title || wpPost?.title,
    body: mdx?.body || wpPost?.content,
    excerpt: mdx?.excerpt || wpPost?.excerpt,
    slug: mdx?.fields.slug || wpPost?.slug,
    date: mdx?.frontmatter.date || wpPost?.date,
    description: mdx?.frontmatter.description,
    altText: wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: wpPost?.featuredImage?.node.gatsbyImage || getImage(allFile.edges[0]?.node.childImageSharp),
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
    <Layout location={location}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <GatsbyImage
          image={post.gatsbyImage}
          alt={post.title.toString()}
        />

        {children ||  // MDX or Wordpress content
          <section
            dangerouslySetInnerHTML={{ __html: post.body }}
            itemProp="articleBody"
          />
        }
        <hr />
        <footer>
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
    $imagePath: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: { eq: $imagePath }
        # ↓ 画像を格納してある場所がimages（gatsby-config.jsで指定した名）
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
      }
    }
    mdPrevious: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    mdNext: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    wpPost(id: { eq: $id }) {
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

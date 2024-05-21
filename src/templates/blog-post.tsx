import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import styled from "styled-components"
import { mergePost } from "../utilFunction"
import RelatedList from "../components/related-list"

type BlogPostTemplateProps = {
  data: {
    allFile: AllFile
    mdx: MdxPost
    mdPrevious: {
      id: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    mdNext: {
      id: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    wpPost: WpPost
    wpPrevious: {
      id: string
      title: string
      slug: string
    }
    wpNext: {
      id: string
      title: string
      slug: string
    }
  }
  location: Location
  children: React.ReactNode
}

const BlogPostTemplate = ({
  data: { allFile, mdx, mdPrevious, mdNext, wpPost, wpPrevious, wpNext },
  location, children
}: BlogPostTemplateProps) => {
  const post = {
    id: mdx?.id || wpPost?.id,
    title: mdx?.frontmatter.title || wpPost?.title,
    body: mdx?.body || wpPost?.content,
    excerpt: mdx?.excerpt || wpPost?.excerpt,
    slug: mdx?.fields.slug || "/" + wpPost?.slug,
    date: mdx?.frontmatter.date || wpPost?.date,
    description: mdx?.frontmatter.description,
    altText: wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: wpPost?.featuredImage?.node.gatsbyImage || getImage(allFile.edges[0]?.node.childImageSharp),
    category: mdx?.frontmatter.category || wpPost?.categories?.nodes[0]?.name,
    tags: mdx?.frontmatter.tags || wpPost?.tags?.nodes.map(t => t.name),
  }
  const previous = {
    id: mdPrevious?.id || wpPrevious?.id,
    title: mdPrevious?.frontmatter.title || wpPrevious?.title,
    slug: mdPrevious?.fields.slug || "/" + wpPrevious?.slug,
  }
  const next = {
    id: mdNext?.id || wpNext?.id,
    title: mdNext?.frontmatter.title || wpNext?.title,
    slug: mdNext?.fields.slug || "/" + wpNext?.slug,
  }

  return (
    <Layout location={location}>
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>
            <div className="time">
              <small>
                <time>{post.date}</time>
              </small>
            </div>
          </p>
        </header>
        <div className="featuredImage">
          <GatsbyImage
            image={post.gatsbyImage}
            alt={post.title}
          />
        </div>
        <Dl>
          <dt>カテゴリ</dt>
          <dd><Link to={`/category/${post.category}`}>{post.category}</Link></dd>
        </Dl>
        <Dl>
          <dt>タグ</dt>
          {post.tags.map((tag, index) => {
            return <dd key={`tag${index}`}><Link to={`/tag/${tag}/`}>{tag}</Link></dd>
          })}
        </Dl>

        <BlogEntry>
          {children ||  // MDX or Wordpress content
            <section
              dangerouslySetInnerHTML={{ __html: post.body }}
              itemProp="articleBody"
            />
          }
        </BlogEntry>
        <hr />
        <footer>
        </footer>
      </Article>
      <BlogPostNav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
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
      </BlogPostNav>

      <RelatedList slug={post.slug} category={post.category} tags={post.tags} />
    </Layout>
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
    allFile(
      filter: {
        relativePath: { eq: $imagePath }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 960
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
        category
        tags
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
      categories{
        nodes{
          name
        }
      }
      tags{
        nodes{
          name
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

export const Head = ({
                       data: { allFile, mdx, wpPost },
                       location
                     }: BlogPostTemplateProps) => {
  const post = mergePost(mdx, wpPost, allFile)
  return (
    <Seo
      title={post.title}
      description={post.excerpt}
      location={location}
      imagePath={post.gatsbyImage ? post.gatsbyImage.images.fallback?.src : null}
      post={post}
    />
  )
}

const Article = styled.article`
  max-width: 960px;
  margin: 0 auto;
  background-color: #fff;

  .time {
    text-align: right;
  }

  .featuredImage {
    text-align: center;
  }
`
const BlogEntry = styled.div`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`
const BlogPostNav = styled.nav`
  max-width: 750px;
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`
const Dl = styled.dl`
  display: flex;
  margin: 0;

  dt {
    width: 80px;
    font-weight: 700;
  }

  dd {
    font-size: 14px;
    margin-left: 0;
    padding-left: 0;

    & + dd {
      margin-left: 15px;
      margin-bottom: 5px;
    }

    a {
      text-decoration: none;
      border-radius: 3px;
      color: #fff;
      background: var(--orange);
      padding: 2px 5px;

      &:hover {
        opacity: .5;
      }
    }
  }
`

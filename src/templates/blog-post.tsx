import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import {
  convertCategory,
  convertCategoryJp,
  mergePost,
  removeHtmlTags,
} from "../utilFunction"
import RelatedList from "../components/related-list"
import SyntaxHighlighter from "react-syntax-highlighter"
import parse, { domToReact } from "html-react-parser"
import { androidstudio } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import DisqusComments from "../components/disqus-comments"
import config from "../../gatsby-config"

type BlogPostTemplateProps = {
  data: {
    blogImage: AllFile
    oldBlogImage: AllFile
    markdownRemark: MdPost
    mdPrevious: {
      id: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        category: string
        categories: string[]
      }
    }
    mdNext: {
      id: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        category: string
        categories: string[]
      }
    }
  }
  location: Location
}

const BlogPostTemplate = ({
  data: { blogImage, oldBlogImage, markdownRemark: md, mdPrevious, mdNext },
  location,
}: BlogPostTemplateProps) => {
  const { siteMetadata } = config as { siteMetadata: SiteMetadata }

  const allFile = blogImage.edges.length > 0 ? blogImage : oldBlogImage
  const post = {
    id: md.id,
    title: md.frontmatter.title,
    content: md.html,
    excerpt: removeHtmlTags(md.excerpt),
    slug: md.fields.slug.replace(/^\//, "").replace(/\/$/, ""),
    date: md.frontmatter.date,
    dateModified: md.frontmatter.dateModified,
    description: md.frontmatter.description,
    altText: "",
    gatsbyImage: getImage(allFile.edges[0]?.node.childImageSharp)!,
    category:
      md.frontmatter.category ||
      (md.frontmatter.categories ? md.frontmatter.categories[0] : ""),
    tags: md.frontmatter.tags || [],
  }
  const previous = {
    id: mdPrevious?.id,
    title: mdPrevious?.frontmatter.title,
    slug: mdPrevious?.fields.slug.replace(/^\//, "").replace(/\/$/, ""),
    category:
      mdPrevious?.frontmatter.category ||
      (mdPrevious?.frontmatter.categories
        ? mdPrevious?.frontmatter.categories[0]
        : ""),
  }
  const next = {
    id: mdNext?.id,
    title: mdNext?.frontmatter.title,
    slug: mdNext?.fields.slug.replace(/^\//, "").replace(/\/$/, ""),
    category:
      mdNext?.frontmatter.category ||
      (mdNext?.frontmatter.categories ? mdNext?.frontmatter.categories[0] : ""),
  }
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout location={location}>
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <div className="time">
            <small>
              <time>{post.date}</time>
            </small>
          </div>
        </header>
        {post.gatsbyImage && (
          <div className="featuredImage">
            <GatsbyImage image={post.gatsbyImage} alt={post.title} />
          </div>
        )}
        <Dl>
          <dt>カテゴリ</dt>
          <dd>
            <Link to={`/category/${convertCategory(post.category)}`}>
              {convertCategoryJp(post.category)}
            </Link>
          </dd>
        </Dl>
        <Dl>
          <dt>タグ</dt>
          {post.tags.map((tag, index) => {
            return (
              <dd key={`tag${index}`}>
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </dd>
            )
          })}
        </Dl>

        <BlogEntry>
          <section itemProp="articleBody">
            {parse(post.content, { replace: replaceCode })}
          </section>
        </BlogEntry>
        <hr />
      </Article>
      <BlogPostNav className="blog-post-nav">
        <ul>
          <li>
            {previous.slug && (
              <Link
                to={`/${convertCategory(previous.category)}/${previous.slug}`}
                rel="prev"
              >
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next.slug && (
              <Link
                to={`/${convertCategory(next.category)}/${next.slug}`}
                rel="next"
              >
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogPostNav>

      {isClient && (
        <DisqusComments
          shortname="https-sun0range-tech-server-on-net"
          config={{
            url: `${siteMetadata.siteUrl}/${convertCategory(post.category)}/${
              post.slug
            }`,
            identifier: `/${convertCategory(post.category)}/${post.slug}`,
            title: post.title,
          }}
        />
      )}
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
    blogImage: allFile(
      filter: {
        relativePath: { eq: $imagePath }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              height: 320
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
    oldBlogImage: allFile(
      filter: {
        relativePath: { eq: $imagePath }
        sourceInstanceName: { eq: "old-blog" }
        extension: { in: ["jpg", "jpeg", "png", "webp"] }
      }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              height: 320
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
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
        dateModified(formatString: "YYYY/MM/DD")
        description
        category
        categories
        tags
      }
    }
    mdPrevious: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
        categories
      }
    }
    mdNext: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
        categories
      }
    }
  }
`

export const Head = ({
  data: { blogImage, oldBlogImage, markdownRemark },
  location,
}: BlogPostTemplateProps) => {
  const allFile = blogImage.edges.length > 0 ? blogImage : oldBlogImage
  const post = mergePost(markdownRemark, allFile)
  return (
    <Seo
      title={post.title}
      description={post.excerpt}
      location={location}
      imagePath={
        getImage(allFile.edges[0]?.node.childImageSharp)?.images.fallback?.src
      }
      post={post}
    />
  )
}

const replaceCode = (node: any) => {
  if (!node) return node
  if (node.name === "pre") {
    const dom = domToReact(getCode(node))
    let result = ""
    switch (typeof dom) {
      case "string":
        result = dom as string
        break
      case "object":
        if (Array.isArray(dom)) {
          // React.JSX.Element[]
          const elmArr = dom as React.JSX.Element[]
          elmArr.map(elm => {
            if (elm.props && elm.props.children) {
              result += elm.props.children as string
            }
          })
        } else {
          // React.JSX.Element
          const elm = dom as React.JSX.Element
          if (elm.props && elm.props.children) {
            result = elm.props.children as string
          }
        }
        break
    }

    return (
      node.children.length > 0 && (
        <SyntaxHighlighter
          style={androidstudio}
          language={getLanguage(node)}
          showLineNumbers={true}
        >
          {result}
        </SyntaxHighlighter>
      )
    )
  }
}

const getLanguage = (node: any) => {
  function getClassInLanguage(className: string) {
    let result = ""
    className.split(/\s+/).forEach(s => {
      if (s.startsWith("language-")) {
        result = s.replace("language-", "")
        return
      }
    })
    return result
  }

  if (node.attribs.class && node.attribs.class !== "wp-block-code") {
    return getClassInLanguage(node.attribs.class as string)
  } else if (node.children[0]?.attribs?.class) {
    return getClassInLanguage(node.children[0].attribs.class as string)
  }
  return "java" // default
}

const getCode = (node: any) => {
  if (node.children.length > 0 && node.children[0].name === "code") {
    return node.children[0].children
  } else {
    return node.children
  }
}

const Article = styled.article`
  margin: 0 auto;
  padding: var(--spacing-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;

  @media screen and (max-width: 511px) {
    padding: var(--spacing-3);
  }

  .time {
    text-align: right;
    color: var(--color-text-light);
  }

  .featuredImage {
    text-align: center;

    .gatsby-image-wrapper {
      border-radius: 8px;
      overflow: hidden;
    }
  }
`
const BlogEntry = styled.div`
  margin: var(--spacing-4) 0 var(--spacing-10);
  padding: var(--spacing-8) 0;
`
const BlogPostNav = styled.nav`
  margin: var(--spacing-6) auto;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--spacing-3);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0;
    padding: 0;
    flex: 1 1 240px;

    &:last-child {
      text-align: right;
    }

    a {
      display: block;
      padding: var(--spacing-3) var(--spacing-4);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-surface);
      color: var(--color-text);
      text-decoration: none;
      transition: border-color 0.15s ease, color 0.15s ease;

      &:hover {
        border-color: var(--color-accent);
        color: var(--color-accent-strong);
      }
    }
  }

  @media screen and (max-width: 511px) {
    padding: 0 12px;
  }
`
const Dl = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 0 var(--spacing-2);

  dt {
    width: 80px;
    font-weight: 700;
  }

  dd {
    font-size: 14px;
    margin-left: 0;
    padding-left: 0;

    & + dd {
      margin-left: var(--spacing-3);
    }

    a {
      display: inline-block;
      text-decoration: none;
      border-radius: 999px;
      color: var(--color-accent-strong);
      background: var(--color-surface-2);
      border: 1px solid var(--color-border);
      padding: 2px 10px;
      transition: background 0.15s ease, color 0.15s ease,
        border-color 0.15s ease;

      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-accent-contrast);
      }
    }
  }
`

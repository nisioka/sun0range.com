import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { convertCategory, mergePost, removeHtmlTags } from "../utilFunction"
import RelatedList from "../components/related-list"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import parse, { domToReact } from "html-react-parser"
import { ghcolors } from "react-syntax-highlighter/dist/cjs/styles/prism"

type BlogPostTemplateProps = {
  data: {
    allFile: AllFile
    markdownRemark: MdPost
    mdPrevious: {
      id: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        category: string
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
      }
    }
    wpPost: WpPost
    wpPrevious: {
      id: string
      title: string
      slug: string
      categories: {
        nodes: {
          name: string
        }[]
      }
    }
    wpNext: {
      id: string
      title: string
      slug: string
      categories: {
        nodes: {
          name: string
        }[]
      }
    }
  }
  location: Location
}

const BlogPostTemplate = ({
  data: { allFile, markdownRemark: md, mdPrevious, mdNext, wpPost, wpPrevious, wpNext },
  location
}: BlogPostTemplateProps) => {
  const post = {
    id: md?.id || wpPost?.id,
    title: md?.frontmatter.title || wpPost?.title,
    content: md?.html || wpPost?.content,
    excerpt: removeHtmlTags(md?.excerpt || wpPost?.excerpt),
    slug: md?.fields.slug.replace(/^\//, "").replace(/\/$/, "")
      || "/" + wpPost?.slug,
    date: md?.frontmatter.date || wpPost?.date,
    dateModified: md?.frontmatter.dateModified || wpPost?.modified,
    description: md?.frontmatter.description,
    altText: wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: wpPost?.featuredImage?.node.gatsbyImage || getImage(allFile.edges[0]?.node.childImageSharp),
    category: md?.frontmatter.category || wpPost?.categories?.nodes[0]?.name,
    tags: md?.frontmatter.tags || wpPost?.tags?.nodes.map(t => t.name),
  }
  const previous = {
    id: mdPrevious?.id || wpPrevious?.id,
    title: mdPrevious?.frontmatter.title || wpPrevious?.title,
    slug: mdPrevious?.fields.slug.replace(/^\//, "").replace(/\/$/, "") || wpPrevious?.slug,
    category: mdPrevious?.frontmatter.category || wpPrevious?.categories.nodes[0].name
  }
  const next = {
    id: mdNext?.id || wpNext?.id,
    title: mdNext?.frontmatter.title || wpNext?.title,
    slug: mdNext?.fields.slug.replace(/^\//, "").replace(/\/$/, "") || wpNext?.slug,
    category: mdNext?.frontmatter.category || wpNext?.categories?.nodes[0]?.name
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
          <dd><Link to={`/category/${convertCategory(post.category)}`}>{post.category}</Link></dd>
        </Dl>
        <Dl>
          <dt>タグ</dt>
          {post.tags.map((tag, index) => {
            return <dd key={`tag${index}`}><Link to={`/tag/${tag}/`}>{tag}</Link></dd>
          })}
        </Dl>

        <BlogEntry>
          <section itemProp="articleBody">
            {parse(post.content, {replace: replaceCode})}
          </section>
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
            {previous.slug && (
              <Link to={`/${convertCategory(previous.category)}/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next.slug && (
              <Link to={`/${convertCategory(next.category)}/${next.slug}`} rel="next">
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
      }
    }
    mdNext: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
      }
    }
    wpPost(id: { eq: $id }) {
      id
      title
      content
      excerpt
      slug
      date(formatString: "YYYY/MM/DD")
      modified(formatString: "YYYY/MM/DD")
      featuredImage{
        node{
          altText
          gatsbyImage(height: 320)
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
      categories{
        nodes{
          name
        }
      }
    }
    wpNext: wpPost(id: { eq: $nextPostId }) {
      title
      slug
      categories{
        nodes{
          name
        }
      }
    }
  }
`

export const Head = ({
                       data: { allFile, markdownRemark, wpPost },
                       location
                     }: BlogPostTemplateProps) => {
  const post = mergePost(markdownRemark, wpPost, allFile)
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

const replaceCode = (node: any) => {
  if(!node) return node;
  if (node.name === 'pre') {
    const dom = domToReact(getCode(node))
    let result = "";
    switch (typeof dom) {
      case 'string':
        result = dom as string
        break;
      case 'object':
        if(Array.isArray(dom)) {
          // React.JSX.Element[]
          const elmArr = dom as React.JSX.Element[];
          elmArr.map(elm => {
            if (elm.props && elm.props.children) {
              result += (elm.props.children as string);
            }
          })
        } else {
          // React.JSX.Element
          const elm = dom as React.JSX.Element;
          if (elm.props && elm.props.children) {
            result = (elm.props.children as string);
          }
        }
        break;
    }

    return node.children.length > 0 &&
      <SyntaxHighlight language={getLanguage(node)}>
        {result}
      </SyntaxHighlight>;
  }
};

const SyntaxHighlight = ({language, children }: { language: string, children: string }) => (
  <SyntaxHighlighter style={ghcolors} language={language} showLineNumbers={true}>
    {children}
  </SyntaxHighlighter>
);

const getLanguage = (node: any) => {
  if (node.attribs.class && node.attribs.class !== "wp-block-code") {
    return (node.attribs.class as string).replace("language-", "");
  } else if (node.children[0]?.attribs?.class) {
    return (node.children[0].attribs.class as string).replace("language-", "");
  }
  return "java"; // default
};

const getCode = (node: any) => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children;
  } else {
    return node.children;
  }
};

const Article = styled.article`
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

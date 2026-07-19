import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { mergePosts } from "../utilFunction"
import { ContentsOrderedListWrapper } from "../style"
import Pagination from "../components/pagination"
import PostList from "../components/post-list"

type BlogIndexProps = {
  data: {
    allBlogMarkdownRemark: AllMarkdownRemark
    allOldBlogMarkdownRemark: AllMarkdownOldRemark
    blogImages: AllFile
    oldBlogImages: AllFile
  }
  location: Location
}

const BlogIndex = ({ data, location }: BlogIndexProps) => {
  const posts = mergePosts(
    data.allBlogMarkdownRemark,
    data.allOldBlogMarkdownRemark,
    data.blogImages,
    data.oldBlogImages
  )

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const POST_PER_PAGE = 12
  const maxPage = Math.ceil(posts.length / POST_PER_PAGE)

  return (
    <Layout location={location}>
      <ContentsOrderedListWrapper>
        <PostList posts={posts.slice(0, POST_PER_PAGE)} />
      </ContentsOrderedListWrapper>
      <Pagination maxPage={maxPage} current={1} />
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ location }: BlogIndexProps) => (
  <Seo title="" location={location} />
)

export const pageQuery = graphql`
  {
    blogImages: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      ...ThumbnailImages
    }
    oldBlogImages: allFile(
      filter: {
        sourceInstanceName: { eq: "old-blog" }
        extension: { in: ["jpg", "jpeg", "png", "webp"] }
      }
    ) {
      ...ThumbnailImages
    }
    allBlogMarkdownRemark: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY/MM/DD")
          dateModified(formatString: "YYYY/MM/DD")
          description
          featuredImagePath
          category
        }
      }
    }
    allOldBlogMarkdownRemark: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "old-blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY/MM/DD")
          coverImage
          categories
          tags
        }
        parent {
          ... on File {
            relativePath
          }
        }
      }
    }
  }
`

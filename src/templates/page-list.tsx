import * as React from "react"

import { graphql } from "gatsby"
import { PageContext } from "gatsby/internal"
import { mergePosts } from "../utilFunction"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import Pagination from "../components/pagination"
import PostList from "../components/post-list"

const PageList = ({
  pageContext,
  data,
  location,
}: {
  pageContext: PageContext
  data: PostListQueryResult
  location: Location
}) => {
  const posts = mergePosts(
    data.allBlogMarkdownRemark,
    data.allOldBlogMarkdownRemark,
    data.blogImages,
    data.oldBlogImages
  )
  const title = `記事一覧`

  return (
    <Layout location={location}>
      <ContentsListHeader>
        <h1>{title}</h1>
      </ContentsListHeader>
      <ContentsOrderedListWrapper>
        <PostList posts={posts} />
      </ContentsOrderedListWrapper>
      <Pagination maxPage={pageContext.maxPage} current={pageContext.current} />
    </Layout>
  )
}

export default PageList

export const Head = ({
  pageContext,
  location,
}: {
  pageContext: PageContext
  location: Location
}) => {
  const current = pageContext.current as number
  const title = current > 1 ? `記事一覧 ${current}ページ目` : `記事一覧`
  return (
    <Seo
      title={title}
      description={`全記事の一覧です(${current}/${pageContext.maxPage}ページ)`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    allBlogMarkdownRemark: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { date: DESC } }
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
          description
          featuredImagePath
          category
        }
      }
    }
    allOldBlogMarkdownRemark: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { frontmatter: { date: DESC } }
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
  }
`

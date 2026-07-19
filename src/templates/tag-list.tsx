import * as React from "react"

import { graphql } from "gatsby"
import { PageContext } from "gatsby/internal"
import { mergePosts } from "../utilFunction"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import PostList from "../components/post-list"

const TagList = ({
  pageContext,
  data,
  location,
}: {
  pageContext: PageContext
  data: PostListQueryResult
  location: Location
}) => {
  const tagName = pageContext.tag as string
  const posts = mergePosts(data.allBlogMarkdownRemark, data.allOldBlogMarkdownRemark, data.blogImages, data.oldBlogImages)
  const title = `【${tagName}】タグ 一覧`

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>そのタグの記事はありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <ContentsListHeader>
        <h1>{title}</h1>
        <p>{posts.length} 記事あります</p>
      </ContentsListHeader>
      <ContentsOrderedListWrapper>
        <PostList posts={posts} />
      </ContentsOrderedListWrapper>
    </Layout>
  )
}

export default TagList

export const Head = ({
  pageContext,
  location,
}: {
  pageContext: PageContext
  location: Location
}) => {
  return (
    <Seo
      title={`【${pageContext.tag}】タグ 一覧`}
      description={`【${pageContext.tag}】タグの記事一覧です`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query ($tag: String) {
    allBlogMarkdownRemark: allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { fields: { slug: ASC } }]
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { sourceInstanceName: { eq: "blog" } } }
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
      sort: [{ frontmatter: { date: DESC } }, { fields: { slug: ASC } }]
      filter: { frontmatter: { tags: { in: [$tag] } }, fields: { sourceInstanceName: { eq: "old-blog" } } }
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
    blogImages: allFile(
      sort: { relativePath: ASC }
      filter: { sourceInstanceName: { eq: "images" } }
    ) {
      ...ThumbnailImages
    }
    oldBlogImages: allFile(
      sort: { relativePath: ASC }
      filter: {
        sourceInstanceName: { eq: "old-blog" }
        extension: { in: ["jpg", "jpeg", "png", "webp"] }
      }
    ) {
      ...ThumbnailImages
    }
  }
`

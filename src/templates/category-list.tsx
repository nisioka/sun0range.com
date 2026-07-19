import * as React from "react"

import { graphql } from "gatsby"
import { PageContext } from "gatsby/internal"
import { convertCategoryJp, mergePosts } from "../utilFunction"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import PostList from "../components/post-list"

const CategoryList = ({
  pageContext,
  data,
  location,
}: {
  pageContext: PageContext
  data: PostListQueryResult
  location: Location
}) => {
  const categoryName = pageContext.category as string
  const posts = mergePosts(
    data.allBlogMarkdownRemark,
    data.allOldBlogMarkdownRemark,
    data.blogImages,
    data.oldBlogImages
  )
  const title = `【${convertCategoryJp(categoryName)}】カテゴリー 一覧`

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>そのカテゴリーの記事はありません。</p>
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

export default CategoryList

export const Head = ({
  pageContext,
  location,
}: {
  pageContext: PageContext
  location: Location
}) => {
  return (
    <Seo
      title={`【${convertCategoryJp(pageContext.category)}】カテゴリー 一覧`}
      description={`【${convertCategoryJp(
        pageContext.category
      )}】カテゴリーの記事一覧です`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query ($category: String) {
    allBlogMarkdownRemark: allMarkdownRemark(
      sort: { fields: { slug: ASC } }
      filter: {
        frontmatter: { category: { eq: $category } }
        fields: { sourceInstanceName: { eq: "blog" } }
      }
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
        }
      }
    }
    allOldBlogMarkdownRemark: allMarkdownRemark(
      sort: { fields: { slug: ASC } }
      filter: {
        frontmatter: { categories: { in: [$category] } }
        fields: { sourceInstanceName: { eq: "old-blog" } }
      }
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

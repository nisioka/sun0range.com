import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { mergePosts } from "../utilFunction"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import PostList from "./post-list"

type RelatedListProps = {
  slug: string
  category: string
  tags: string[]
}
const RelatedList = ({ slug, category, tags }: RelatedListProps) => {
  const {
    allBlogMarkdownRemark,
    allOldBlogMarkdownRemark,
    blogImages,
    oldBlogImages,
  }: {
    allBlogMarkdownRemark: AllMarkdownRemark
    allOldBlogMarkdownRemark: AllMarkdownOldRemark
    blogImages: AllFile
    oldBlogImages: AllFile
  } = useStaticQuery(
    graphql`
      query {
        allBlogMarkdownRemark: allMarkdownRemark(
          sort: { fields: { slug: ASC } }
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
              tags
            }
          }
        }
        allOldBlogMarkdownRemark: allMarkdownRemark(
          sort: { fields: { slug: ASC } }
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
  )

  // 関連度計算。
  const posts = mergePosts(
    allBlogMarkdownRemark,
    allOldBlogMarkdownRemark,
    blogImages,
    oldBlogImages
  )
    .map(post => {
      let point = 0
      if (post.slug !== slug) {
        // カテゴリの一致出力
        if (post.category === category) point++
        // タグの一致出力。記事のタグの中に一致するものがあればtrueを返す。
        for (const tag of tags) {
          if (post.tags.includes(tag)) point += 2
        }
      }
      return { post: post, relevance: point }
    })
    .filter(r => r.relevance >= 2)
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime() ||
        a.post.slug.localeCompare(b.post.slug)
    )
    .slice(0, 6)
    .map(r => r.post)

  if (posts.length === 0) return <></>

  return (
    <>
      <ContentsListHeader>
        <h2>関連記事</h2>
      </ContentsListHeader>
      <ContentsOrderedListWrapper>
        <PostList posts={posts} />
      </ContentsOrderedListWrapper>
    </>
  )
}

export default RelatedList

import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { mergePosts } from "../utilFunction"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import PostList from "../components/post-list"

const Search = ({
  data,
  location,
}: {
  data: PostListQueryResult
  location: Location
}) => {
  const posts = mergePosts(
    data.allBlogMarkdownRemark,
    data.allOldBlogMarkdownRemark,
    data.blogImages,
    data.oldBlogImages
  )

  const initQuery = decodeURI(
    location.href?.split("?q=")[1] || ""
  ).toLowerCase()
  const [query, setQuery] = useState(initQuery)
  const [filteredData, setFilteredData] = useState(() =>
    filterByQuery(initQuery.split(/\s+/))
  )

  function filterByQuery(queryWords: string[]) {
    return posts.filter(post => {
      for (const word of queryWords) {
        if (
          !post.title.toLowerCase().includes(word) &&
          !post.description?.toLowerCase().includes(word)
        ) {
          return false
        }
      }
      return true
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value.toLowerCase())
  }

  // 入力が落ち着いてから絞り込む(全記事走査を毎キー入力で行わない)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredData(filterByQuery(query.split(/\s+/)))
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    // ユーザーの入力があるたびにURLのクエリパラメータを更新
    const params = new URLSearchParams()
    if (query) {
      params.append("q", query)
    } else {
      params.delete("q")
    }
    window.history.replaceState(
      "",
      "",
      location.href.split("?")[0] +
        (params.size > 0 ? "?" + params.toString() : "")
    )
  }, [query])

  return (
    <Layout location={location}>
      <input
        type="text"
        aria-label="Search"
        placeholder="検索ワードを入力..."
        onChange={handleInputChange}
        value={query}
      />
      <div className="result-inner__res">
        {query !== ""
          ? query + " の検索結果: " + filteredData.length + "件"
          : filteredData.length + "件の記事があります"}
      </div>
      <ContentsListHeader>
        <h1>サイト内検索</h1>
        <p>{filteredData.length} 記事あります</p>
      </ContentsListHeader>
      <ContentsOrderedListWrapper>
        <PostList posts={filteredData} />
      </ContentsOrderedListWrapper>
    </Layout>
  )
}

export default Search

export const Head = ({ location }: { location: Location }) => (
  <Seo
    title="サイト内検索"
    description="サイト内の記事をキーワードで検索できます"
    location={location}
  />
)

export const pageQuery = graphql`
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
          featuredImagePath
          category
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

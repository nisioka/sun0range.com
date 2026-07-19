import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
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
      <ContentsListHeader>
        <h1>サイト内検索</h1>
      </ContentsListHeader>
      <SearchBox>
        <input
          type="text"
          aria-label="Search"
          placeholder="検索ワードを入力..."
          onChange={handleInputChange}
          value={query}
        />
        <div className="result-count">
          {query !== ""
            ? query + " の検索結果: " + filteredData.length + "件"
            : filteredData.length + "件の記事があります"}
        </div>
      </SearchBox>
      <ContentsOrderedListWrapper>
        <PostList posts={filteredData} />
      </ContentsOrderedListWrapper>
    </Layout>
  )
}

export default Search

const SearchBox = styled.div`
  margin: var(--spacing-4) auto var(--spacing-6);
  text-align: center;

  input {
    width: 100%;
    max-width: 480px;
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--fontSize-1);
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &::placeholder {
      color: var(--color-text-light);
    }

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--color-accent) 25%, transparent);
    }
  }

  .result-count {
    margin-top: var(--spacing-2);
    color: var(--color-text-light);
    font-size: var(--fontSize-0);
  }
`

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

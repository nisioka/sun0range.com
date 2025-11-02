import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { convertCategory, mergePosts } from "../utilFunction"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"
import { GatsbyImage } from "gatsby-plugin-image"

const Search = ({ data, location }: { data: any; location: Location }) => {
  const posts = mergePosts(
    data.allBlogMarkdownRemark,
    data.allOldBlogMarkdownRemark,
    data.blogImages,
    data.oldBlogImages
  )

  const initQuery = decodeURI(
    location.href?.split("?q=")[1] || ""
  ).toLowerCase()
  const [state, setState] = useState({
    filteredData: filterByQuery(initQuery.split(/\s+/)),
    query: initQuery,
  })

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
    const queryWords = event.target.value.toLowerCase().split(/\s+/)

    setState(prevState => ({
      ...prevState,
      filteredData: filterByQuery(queryWords),
      query: queryWords.join(" "),
    }))
  }

  const { filteredData, query } = state
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
  }, [state.query])

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
        {filteredData.map(post => {
          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemType="http://schema.org/Article"
              >
                <Link to={`/${convertCategory(post.category)}/${post.slug}`}>
                  <h2>
                    <span>{post.title}</span>
                  </h2>
                  <section>
                    <div>
                      <small>
                        <time>{post.date}</time>
                      </small>
                    </div>
                    <div className="thumbnail">
                      {typeof post.gatsbyImage === "undefined" || (
                        <GatsbyImage
                          alt={post.altText}
                          image={post.gatsbyImage}
                          className="thumbnail"
                        />
                      )}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </section>
                </Link>
              </article>
            </li>
          )
        })}
      </ContentsOrderedListWrapper>
    </Layout>
  )
}

export default Search

export const pageQuery = graphql`
  query {
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
    blogImages: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
    oldBlogImages: allFile(
      filter: {
        sourceInstanceName: { eq: "old-blog" }
        extension: { in: ["jpg", "jpeg", "png", "webp"] }
      }
    ) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`

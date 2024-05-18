import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { mergePosts } from "../utilFunction"
import { GatsbyImage } from "gatsby-plugin-image"
import { ContentsListHeader, ContentsOrderedListWrapper } from "../style"

type RelatedListProps = {
  slug: string
  category: string
  tags: string[]
}
const RelatedList = ({ slug, category, tags }: RelatedListProps) => {
  const { allMdx, allWpPost, allFile }: {allMdx: AllMdx, allWpPost: AllWpPost, allFile: AllFile} = useStaticQuery(
    graphql`
      query {
        allMdx(
          sort: { frontmatter: { date: DESC } }
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
              tags
            }
          }
        }
        allWpPost(
          sort: { date: DESC }
        ) {
          nodes {
            title
            excerpt
            slug
            date(formatString: "YYYY/MM/DD")
            featuredImage{
              node{
                altText
                gatsbyImage(
                  width: 100,
                  height: 100
                  formats: [AUTO, WEBP, AVIF]
                  placeholder: BLURRED
                )
              }
            }
            categories {
              nodes {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
        allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
          }
        ) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(
                  width: 100,
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
  )
  const shuffle = (array: CommonPost[]) => array.sort(() => Math.random() - 0.5);
  const posts = shuffle(mergePosts(allMdx, allWpPost, allFile).filter(post => {
    if (post.slug !== slug) {
      // カテゴリの一致出力
      if (post.category === category) return true
      // タグの一致出力。記事のタグの中に一致するものがあればtrueを返す。
      for (const tag of tags) {
        if (post.tags.includes(tag)) return true
      }
    }
    return false
  })).slice(0, 6).sort((a, b) => a.date < b.date ? 1 : -1)

  if (!posts) return <></>

  return (
    <>
      <ContentsListHeader>
        <h2>関連記事</h2>
      </ContentsListHeader>
      <ContentsOrderedListWrapper>
        {posts.map((post, index) => {
          return (
            <li key={post.slug}>
              <article>
                <Link to={post.slug}>
                  <h2>
                    <span>{post.title}</span>
                  </h2>
                  <section>
                    <div><small>
                      <time>{post.date}</time>
                    </small></div>
                    <div className="thumbnail">
                      {typeof post.gatsbyImage === "undefined" ||
                        <GatsbyImage alt={post.altText} image={post.gatsbyImage} className="thumbnail" />
                      }
                    </div>
                    <p
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </section>
                </Link>
              </article>
            </li>
          )
        })}
      </ContentsOrderedListWrapper>
    </>
  )
}

export default RelatedList

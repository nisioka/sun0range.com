import * as React from "react"

import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { convertCategory } from "../utilFunction"

const PostList = ({ posts }: { posts: CommonPost[] }) => (
  <>
    {posts.map(post => (
      <li key={post.slug}>
        <article
          className="post-list-item"
          itemScope
          itemType="https://schema.org/Article"
        >
          <Link
            to={`/${convertCategory(post.category)}/${post.slug}`}
            itemProp="url"
          >
            <div className="thumbnail">
              {typeof post.gatsbyImage === "undefined" || (
                <GatsbyImage alt={post.altText} image={post.gatsbyImage} />
              )}
            </div>
            <section className="card-body">
              <h2>
                <span itemProp="headline">{post.title}</span>
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                itemProp="description"
              />
              <div className="card-date">
                <small>
                  <time>{post.dateModified}</time>
                </small>
              </div>
            </section>
          </Link>
        </article>
      </li>
    ))}
  </>
)

export default PostList

// 一覧サムネイル用の共通クエリフラグメント
export const thumbnailImagesFragment = graphql`
  fragment ThumbnailImages on FileConnection {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(
            width: 480
            aspectRatio: 1.7778
            formats: [AUTO, WEBP, AVIF]
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

import * as React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const TagCloud = () => {
  const {
    allBlogMarkdownRemark,
    allOldBlogMarkdownRemark,
  }: { allBlogMarkdownRemark: AllMarkdownRemark; allOldBlogMarkdownRemark: AllMarkdownOldRemark } =
    useStaticQuery(
      graphql`
      query {
        allBlogMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "blog" } } }
        ) {
          nodes {
            frontmatter {
              tags
            }
          }
        }
        allOldBlogMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "old-blog" } } }
        ) {
          nodes {
            frontmatter {
              tags
            }
          }
        }
      }
    `
    )

  const postTags = allBlogMarkdownRemark.nodes
    .map(post => post.frontmatter.tags)
    .concat(allOldBlogMarkdownRemark.nodes.map(post => post.frontmatter.tags))

  const tagsBase = postTags
    .reduce((tagCount, tags) => {
      tags?.forEach(item => {
        const found = tagCount.find(i => i.name === item)
        if (found) {
          found.count++
        } else {
          tagCount.push({ name: item, count: 1 })
        }
      })
      return tagCount
    }, [] as { name: string; count: number }[])
    .filter(t => t.count > 1)
    .sort((a, b) => b.count - a.count)

  if (tagsBase.length === 0) return <></>

  const largeBoundary =
    tagsBase[Math.min(Math.ceil(tagsBase.length / 3), tagsBase.length - 1)]
      .count
  const smallBoundary =
    tagsBase[
      Math.min(Math.floor((tagsBase.length * 2) / 3), tagsBase.length - 1)
    ].count
  const tagsView = tagsBase.sort(() => Math.random() - 0.5)

  return (
    <TagCloudList>
      <h5>タグクラウド</h5>
      {tagsView.map(tag => {
        let size
        if (tag.count > largeBoundary) {
          size = "tagLarge"
        } else if (tag.count <= smallBoundary) {
          size = "tagSmall"
        } else {
          size = "tagMiddle"
        }
        return (
          <li key={tag.name} className={size}>
            <Link to={`/tag/${tag.name}`}>{tag.name}</Link>
          </li>
        )
      })}
    </TagCloudList>
  )
}

export default TagCloud

const TagCloudList = styled.ul`
  list-style: none;
  background-color: #fff;

  li {
    display: inline-block;
    padding: 3px 6px;
  }

  .tagSmall {
    font-size: var(--fontSize-0);
  }
  .tagMiddle {
    font-size: var(--fontSize-2);
  }
  .tagLarge {
    font-size: var(--fontSize-4);
  }

  a {
    line-height: 1;
    display: block;
    text-decoration: none;

    &:hover {
      color: var(--orange);
      text-decoration: underline;
    }
  }
`

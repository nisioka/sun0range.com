import * as React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const TagCloud = () => {
  const {
    allBlogMarkdownRemark,
    allOldBlogMarkdownRemark,
  }: {
    allBlogMarkdownRemark: AllMarkdownRemark
    allOldBlogMarkdownRemark: AllMarkdownOldRemark
  } = useStaticQuery(
    graphql`
      query {
        allBlogMarkdownRemark: allMarkdownRemark(
          sort: { fields: { slug: ASC } }
          filter: { fields: { sourceInstanceName: { eq: "blog" } } }
        ) {
          nodes {
            frontmatter {
              tags
            }
          }
        }
        allOldBlogMarkdownRemark: allMarkdownRemark(
          sort: { fields: { slug: ASC } }
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
  // タグ名のハッシュ順に並べる。ランダム風の散らばりを保ちつつ、
  // ビルドごとに順序が変わらない(ビルド成果物の差分と画面差分検出を安定させる)
  const hashCode = (s: string) => {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
    return h
  }
  const tagsView = tagsBase
    .slice()
    .sort((a, b) => hashCode(a.name) - hashCode(b.name))

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
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--spacing-4);
  margin: 0;

  h5 {
    margin: 0 0 var(--spacing-3);
    font-size: var(--fontSize-1);
    color: var(--color-heading);
    padding-left: var(--spacing-2);
    border-left: 3px solid var(--color-accent);
  }

  li {
    display: inline-block;
    padding: 3px 6px;
    margin: 0;
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
    line-height: 1.2;
    display: block;
    text-decoration: none;
    color: var(--color-text-light);
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-accent-strong);
    }
  }
`

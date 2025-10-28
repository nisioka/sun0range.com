/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from "path"
import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { convertCategory } from "./src/utilFunction"
import { AllMarkdownOldRemark, AllMarkdownRemark } from "./src/@types/global"

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
const pageList = path.resolve(`./src/templates/page-list.tsx`)
const categoryList = path.resolve(`./src/templates/category-list.tsx`)
const tagList = path.resolve(`./src/templates/tag-list.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  type AllPost = {
    allBlogMarkdownRemark: AllMarkdownRemark
    allOldBlogMarkdownRemark: AllMarkdownOldRemark
  }

  const result = await graphql<AllPost>(`
    {
      allBlogMarkdownRemark: allMarkdownRemark(
        filter: { fields: { sourceInstanceName: { eq: "blog" } } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
          frontmatter {
            featuredImagePath
            nodeType
            category
            tags
            description
            dateModified
          }
        }
      }
      allOldBlogMarkdownRemark: allMarkdownRemark(
        filter: { fields: { sourceInstanceName: { eq: "old-blog" } } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
          frontmatter {
            title
            date
            categories
            tags
            coverImage
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  type Post = {
    id: string
    slug: string
    component: string
    featuredImagePath: string | null
    category: string
    tags: string[]
    description: string
    dateModified: string | null
    nodeType: string
    internal: {
      contentFilePath: string
    }
  }

  const posts = result.data?.allBlogMarkdownRemark.nodes
    .map(post => {
      let slug = post.fields.slug.replace(/^\//, "").replace(/\/$/, "")
      console.log(`NewBlog= slug:${slug}, blogPost:${blogPost}, ?__contentFilePath=${post.internal.contentFilePath}, featuredImagePath:${post.frontmatter.featuredImagePath}`)
      return {
        id: post.id,
        slug: slug,
        component: `${blogPost}`,
        featuredImagePath: post.frontmatter.featuredImagePath,
        category: post.frontmatter.category,
        tags: post.frontmatter.tags,
        description: post.frontmatter.description,
        dateModified: post.frontmatter.dateModified,
        nodeType: "blog",
      } as Post
    })
    .concat(
      result.data.allOldBlogMarkdownRemark.nodes.map(post => {
        // old-blog の記事の場合、slug から 'old-blog/posts/' などのプレフィックスを削除する
        let slug = post.fields.slug.replace(/^\//, "").replace(/\/$/, "").replace(/^posts\//, "").replace(/^custom\//, "").replace(/^pages\//, "")

        console.log(`OldBlog= slug:${slug}, blogPost:${blogPost}, ?__contentFilePath=${post.internal.contentFilePath}, featuredImagePath:${post.frontmatter.coverImage}`)
        return {
          id: post.id,
          slug: slug,
          component: `${blogPost}`,
          featuredImagePath: post.frontmatter.coverImage ? "images/" + post.frontmatter.coverImage : null,
          category: post.frontmatter.categories ? post.frontmatter.categories[0] : null,
          tags: post.frontmatter.tags || [],
          description: post.frontmatter.title,
          dateModified: post.frontmatter.date || null,
          nodeType: "old-blog",
        } as Post
      })
    )

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts && posts.length > 0) {
    posts.forEach((post, index) => {
      if (!post.category) {
        reporter.warn(
          `Post with slug "${post.slug}" has no category. Skipping page creation.`
        )
        return
      }

      const categoryPath = convertCategory(post.category)

      if (!categoryPath) {
        reporter.warn(
          `Could not find a valid category path for "${post.category}" in post with slug "${post.slug}". Skipping page creation.`
        )
        return
      }

      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `/${categoryPath}/${post.slug}`,
        component: post.component,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          imagePath: post.featuredImagePath,
        },
      })
    })

    // 記事一覧追加
    const POST_PER_PAGE = 12
    const maxPage = Math.ceil(posts.length / POST_PER_PAGE)
    for (let pageNumber = 1; pageNumber < maxPage + 1; pageNumber++) {
      createPage({
        path: `/page/${pageNumber}`,
        component: pageList,
        context: {
          limit: POST_PER_PAGE,
          skip: (pageNumber - 1) * POST_PER_PAGE,
          current: pageNumber,
          maxPage: maxPage,
        },
      })
    }

    // カテゴリ一覧追加
    let categories = posts.reduce((categories, post) => {
      return post.category && !categories.includes(post.category)
        ? categories.concat(post.category)
        : categories
    }, [] as string[])
    // カテゴリ分ページを作成
    categories.forEach(category => {
      createPage({
        path: `/category/${convertCategory(category)}`,
        component: categoryList,
        context: {
          category,
        },
      })
    })

    // tag一覧追加
    let tags = posts.reduce((tags, post) => {
      post.tags.forEach(tag => {
        tags = tag && !tags.includes(tag) ? tags.concat(tag) : tags
      })
      return tags
    }, [] as string[])
    // tag分ページを作成
    tags.forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: tagList,
        context: {
          tag,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    const parent = getNode(node.parent)
    if (parent && parent.sourceInstanceName) {
      const sourceName = parent.sourceInstanceName as string;
      createNodeField({
        name: `sourceInstanceName`,
        node,
        value: sourceName,
      })
    }
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      sourceInstanceName: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      dateModified: Date @dateformat
      nodeType: String
      category: String
      categories: [String]
      tags: [String]
      featuredImagePath: String
      coverImage: String
    }

    type Fields {
      slug: String
      sourceInstanceName: String
    }
  `)
  }

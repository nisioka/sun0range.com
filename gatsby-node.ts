/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from "path"
import { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  type AllPost = {
    allMdx: {
      nodes: {
        id: string
        fields: {
          slug: string
        }
        internal: {
          contentFilePath: string
        }
        frontmatter: {
          featuredImagePath: string
          nodeType: string
        }
      }[]
    }
    allWpPost: {
      nodes: {
        id: string
        slug: string
      }[]
    }
  }

  // Get all markdown blog posts sorted by date
  const result = await graphql<AllPost>(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
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
          }
        }
      }
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          slug
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
  }

  const posts = result.data?.allMdx.nodes.map(post => {
    const mdx: Post = {
      id: post.id,
      slug: post.fields.slug,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      featuredImagePath: post.frontmatter.featuredImagePath,
    }
    return mdx
  }).concat(result.data?.allWpPost.nodes.map(post => {
    return {
      id: post.id,
      slug: post.slug,
      component: blogPost,
      featuredImagePath: null,
    }
  }));

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts && posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.slug,
        component: post.component,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          imagePath: post.featuredImagePath,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      nodeType: String
      category: String
      tags: [String]
      featuredImagePath: String
    }

    type Fields {
      slug: String
    }
  `)
}

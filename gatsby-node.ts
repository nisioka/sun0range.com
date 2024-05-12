/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import * as path from "node:path"
import { createFilePath } from "gatsby-source-filesystem"
import type { GatsbyNode } from "gatsby"

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  // Get all markdown blog posts sorted by date
  type AllPostNode = {
    allMdx: {
      nodes: Array<{
        id: string
        excerpt: string
        body: string
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
      }>
    }
    allWpPost: {
      nodes: Array<{
        id: string
        title: string
        content: string
        excerpt: string
        slug: string
        date: string
        featuredImage: {
          node: {
            altText: string
            gatsbyImage: any
          }
        }
        categories: {
          nodes: Array<{
            name: string
          }>
        }
        tags: {
          nodes: Array<{
            name: string
          }>
        }
      }>
    }
    AllFile: {
      edges: Array<{
        node: {
          childImageSharp: {
            gatsbyImageData: any
          }
        }
      }>
    }
  }
  const result = await graphql<AllPostNode>(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          excerpt
          body
          fields {
            slug
          }
          internal {
            contentFilePath
          }
          frontmatter {
            featuredImagePath
            nodeType
            title
            date(formatString: "YYYY/MM/DD")
            description
            category
            tags
          }
        }
      }
      allWpPost(sort: { date: DESC }) {
        nodes {
          id
          title
          content
          excerpt
          slug
          date(formatString: "YYYY/MM/DD")
          featuredImage{
            node{
              altText
              gatsbyImage(width: 960)
            }
          }
          categories{
            nodes{
              name
            }
          }
          tags{
            nodes{
              name
            }
          }
        }
      }
      allFile(filter: {sourceInstanceName: {eq: "images"}})
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                width: 960
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
              )
            }
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
  }
  const posts = result.data?.allMdx.nodes.map(mdx => {
    return {
      id: mdx.id,
      slug: mdx.fields.slug,
      component: `${blogPost}?__contentFilePath=${mdx.internal.contentFilePath}`,
      featuredImagePath: mdx.frontmatter.featuredImagePath,
    } as Post
  }).concat(result.data.allWpPost.nodes.map(wp => {
    return {
      id: wp.id,
      slug: wp.slug,
      component: blogPost,
      featuredImagePath: null,
    }
  }));

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.ts)
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
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
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
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.ts

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
      excerpt: String
      body: String
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

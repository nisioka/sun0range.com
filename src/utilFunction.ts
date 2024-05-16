import { getImage, IGatsbyImageData } from "gatsby-plugin-image"

function mergePosts(allMdx: AllMdx, allWpPost: AllWpPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile && allFile.edges.forEach(node => {
    allFeaturedImages[node.node.relativePath] = node.node.childImageSharp.gatsbyImageData
  })
  const mdxPosts = allMdx.nodes
  const wpPosts = allWpPost.nodes
  const posts = mdxPosts.map(post => {
    const mdx: CommonPost = {
      title: post.frontmatter.title,
      excerpt: post.excerpt,
      slug: post.fields.slug,
      date: post.frontmatter.date,
      description: post.frontmatter.description,
      altText: post.frontmatter.featuredImagePath,
      gatsbyImage: getImage(allFeaturedImages[post.frontmatter.featuredImagePath || "featured/defaultThumbnail.png"])
    }
    return mdx
  }).concat(wpPosts.map(post => {
    return {
      title: post.title,
      excerpt: post.excerpt,
      slug: "/" + post.slug,
      date: post.date,
      altText: post.featuredImage?.node.altText || "",
      gatsbyImage: post.featuredImage?.node.gatsbyImage || getImage(allFeaturedImages["featured/defaultThumbnail.png"])
    }
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as CommonPost[]

  return posts
}

export default mergePosts
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"

export function mergePosts(allMdx: AllMdx, allWpPost: AllWpPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile && allFile.edges.forEach(node => {
    allFeaturedImages[node.node.relativePath] = node.node.childImageSharp.gatsbyImageData
  })
  const mdxPosts = allMdx.nodes
  const wpPosts = allWpPost.nodes
  return mdxPosts.map(post => {
    const mdx: CommonPost = {
      title: post.frontmatter.title,
      excerpt: post.excerpt,
      slug: post.fields.slug,
      date: post.frontmatter.date,
      description: post.frontmatter.description,
      altText: post.frontmatter.featuredImagePath,
      gatsbyImage: getImage(allFeaturedImages[post.frontmatter.featuredImagePath || "featured/defaultThumbnail.png"]),
      category: post.frontmatter.category || "",
      tags: post.frontmatter.tags || []
    }
    return mdx
  }).concat(wpPosts.map(post => {
    return {
      title: post.title,
      excerpt: post.excerpt,
      slug: "/" + post.slug,
      date: post.date,
      altText: post.featuredImage?.node.altText || "",
      gatsbyImage: post.featuredImage?.node.gatsbyImage || getImage(allFeaturedImages["featured/defaultThumbnail.png"]),
      category: post.categories?.nodes[0]?.name || "",
      tags: post.tags?.nodes.map(t => t.name) || []
    }
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as CommonPost[]
}

export function mergePost(mdx?: MdxPost, wpPost?: WpPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile && allFile.edges.forEach(node => {
    allFeaturedImages[node.node.relativePath] = node.node.childImageSharp.gatsbyImageData
  })
  return {
    title: mdx?.frontmatter.title || wpPost?.title,
    excerpt: mdx?.excerpt || wpPost?.excerpt,
    slug: mdx?.fields.slug || "/" + wpPost?.slug,
    date: mdx?.frontmatter.date || wpPost?.date,
    description: mdx?.frontmatter.description || "",
    altText: mdx?.frontmatter.featuredImagePath || wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: getImage(allFeaturedImages[mdx?.frontmatter.featuredImagePath || "featured/defaultThumbnail.webp"])
      || wpPost?.featuredImage?.node.gatsbyImage
      || getImage(allFeaturedImages["featured/defaultThumbnail.webp"])
  } as CommonPost
}

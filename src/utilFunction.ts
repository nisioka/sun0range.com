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
      excerpt: removeHtmlTags(post.excerpt),
      slug: post.fields.slug.replace(/^\//, "").replace(/\/$/, ""),
      date: post.frontmatter.date,
      dateModified: post.frontmatter.dateModified,
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
      excerpt: removeHtmlTags(post.excerpt),
      slug: post.slug,
      date: post.date,
      dateModified: post.modified,
      description: post.content,
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
    excerpt: removeHtmlTags(mdx?.excerpt || wpPost?.excerpt),
    slug: mdx?.fields.slug || wpPost?.slug,
    date: mdx?.frontmatter.date || wpPost?.date,
    dateModified: mdx?.frontmatter.dateModified || wpPost?.modified,
    description: mdx?.frontmatter.description || wpPost?.content,
    altText: mdx?.frontmatter.featuredImagePath || wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: getImage(allFeaturedImages[mdx?.frontmatter.featuredImagePath || "featured/defaultThumbnail.webp"])
      || wpPost?.featuredImage?.node.gatsbyImage
      || getImage(allFeaturedImages["featured/defaultThumbnail.webp"])
  } as CommonPost
}

const categoryNames: { eng: string, jp: string }[] = [
  { eng: "information-technology", jp: "技術" },
  { eng: "life", jp: "生活" },
  { eng: "event-report", jp: "イベントレポート" },
  { eng: "book-report", jp: "書評" },
  { eng: "business-efficiency", jp: "業務効率化" },
  { eng: "glossary", jp: "用語集" },
]

export function convertCategory(japanese: string) {
  return categoryNames.find(c => c.jp === japanese.replace("/", ""))?.eng || ""
}

export function removeHtmlTags(str: string | undefined) {
  if(!str) return "";
  return str.replace(/<[^a-zA-Z]*\/?>/g, "")
}
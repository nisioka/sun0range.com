import { getImage, IGatsbyImageData } from "gatsby-plugin-image"

export function mergePosts(allMarkdownRemark: AllMarkdownRemark, allWpPost: AllWpPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile && allFile.edges.forEach(node => {
    allFeaturedImages[node.node.relativePath] = node.node.childImageSharp.gatsbyImageData
  })
  const mdPosts = allMarkdownRemark.nodes
  const wpPosts = allWpPost.nodes
  return mdPosts.map(post => {
    return {
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
    } as CommonPost
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

export function mergePost(md?: MdPost, wpPost?: WpPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile && allFile.edges.forEach(node => {
    allFeaturedImages[node.node.relativePath] = node.node.childImageSharp.gatsbyImageData
  })
  return {
    title: md?.frontmatter.title || wpPost?.title,
    excerpt: removeHtmlTags(md?.excerpt || wpPost?.excerpt),
    slug: md?.fields.slug || wpPost?.slug,
    date: md?.frontmatter.date || wpPost?.date,
    dateModified: md?.frontmatter.dateModified || wpPost?.modified,
    description: md?.frontmatter.description || wpPost?.content,
    altText: md?.frontmatter.featuredImagePath || wpPost?.featuredImage?.node.altText || "",
    gatsbyImage: getImage(allFeaturedImages[md?.frontmatter.featuredImagePath || "featured/defaultThumbnail.webp"])
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
  if(!japanese) return undefined
  return categoryNames.find(c => c.jp === japanese.replace("/", ""))?.eng || ""
}

export function removeHtmlTags(str: string | undefined) {
  if(!str) return "";
  return str.replace(/<[^a-zA-Z]*\/?>/g, "")
}
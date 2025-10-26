import { getImage, IGatsbyImageData } from "gatsby-plugin-image"

export function mergePosts(
  allBlogMarkdownRemark: AllMarkdownRemark,
  allOldBlogMarkdownRemark: AllMarkdownOldRemark,
  allFile?: AllFile
) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile &&
    allFile.edges.forEach(node => {
      allFeaturedImages[node.node.relativePath] =
        node.node.childImageSharp.gatsbyImageData
    })
  const blogMdPosts = allBlogMarkdownRemark.nodes
  const oldBlogMdPosts = allOldBlogMarkdownRemark.nodes
  return blogMdPosts
    .map(post => {
      return {
        title: post.frontmatter.title,
        excerpt: removeHtmlTags(post.excerpt),
        slug: post.fields.slug.replace(/^\//, "").replace(/\/$/, ""),
        date: post.frontmatter.date,
        dateModified: post.frontmatter.dateModified,
        description: post.frontmatter.description,
        altText: post.frontmatter.featuredImagePath || "",
        gatsbyImage: getImage(
          allFeaturedImages[
            post.frontmatter.featuredImagePath ||
              "featured/defaultThumbnail.png"
          ]
        ),
        category: post.frontmatter.category || "",
        tags: post.frontmatter.tags || [],
      } as CommonPost
    })
    .concat(
      oldBlogMdPosts.map(post => {
        // old-blog の記事の場合、slug から 'old-blog/posts/' などのプレフィックスを削除する
        let slug = post.fields.slug.replace(/^\//, "").replace(/\/$/, "")
        if (post.internal.contentFilePath.includes("content/old-blog/posts/")) {
          slug = slug.replace(/^old-blog\/posts\//, "")
        } else if (post.internal.contentFilePath.includes("content/old-blog/custom/")) {
          slug = slug.replace(/^old-blog\/custom\//, "")
        } else if (post.internal.contentFilePath.includes("content/old-blog/pages/")) {
          slug = slug.replace(/^old-blog\/pages\//, "")
        }
        return {
          title: post.frontmatter.title,
          excerpt: removeHtmlTags(post.excerpt),
          slug: slug,
          date: post.frontmatter.date,
          dateModified: post.frontmatter.date || null,
          description: post.frontmatter.title,
          altText: post.frontmatter.coverImage || "",
          gatsbyImage: getImage(
            allFeaturedImages[
              "images/" + post.frontmatter.coverImage || "featured/defaultThumbnail.png"
            ]
          ),
          category: post.frontmatter.categories ? post.frontmatter.categories[0] : "",
          tags: post.frontmatter.tags || [],
        } as CommonPost
      })
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ) as CommonPost[]
}

export function mergePost(md?: MdPost, allFile?: AllFile) {
  let allFeaturedImages: { [key: string]: IGatsbyImageData } = {}
  allFile &&
    allFile.edges.forEach(node => {
      allFeaturedImages[node.node.relativePath] =
        node.node.childImageSharp.gatsbyImageData
    })
  return {
    title: md?.frontmatter.title,
    excerpt: removeHtmlTags(md?.excerpt),
    slug: md?.fields.slug,
    date: md?.frontmatter.date,
    dateModified: md?.frontmatter.dateModified,
    description: md?.frontmatter.description,
    altText: md?.frontmatter.featuredImagePath || "",
    gatsbyImage:
      getImage(
        allFeaturedImages[
          md?.frontmatter.featuredImagePath || "featured/defaultThumbnail.webp"
        ]
      ),
  } as CommonPost
}

const categoryNames: { id: number; eng: string; jp: string }[] = [
  { id: 1, eng: "information-technology", jp: "技術" },
  { id: 2, eng: "event-report", jp: "イベントレポート" },
  { id: 3, eng: "life", jp: "生活" },
  { id: 4, eng: "glossary", jp: "用語集" },
  { id: 5, eng: "book-report", jp: "書評" },
  { id: 6, eng: "business-efficiency", jp: "業務効率化" },
]

export const categoryAll = categoryNames.sort(c => c.id).map(c => c.jp)

export function convertCategory(japanese: string) {
  if (!japanese) return undefined
  return categoryNames.find(c => c.jp === japanese.replace("/", ""))?.eng || ""
}

export function removeHtmlTags(str: string | undefined) {
  if (!str) return ""
  return str.replace(/<[^a-zA-Z]*\/?>/g, "")
}

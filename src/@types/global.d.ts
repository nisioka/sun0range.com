declare const __PATH_PREFIX__: string

type SiteMetadata = {
  title: string
  author: {
    name: string
    summary: string
    avatarImagePath: string
  }
  description: string
  siteUrl: string
  social: {
    github: string
    twitter: string
  }
}

type AllMarkdownRemark = {
  nodes: MdPost[]
}

type AllMarkdownOldRemark = {
  nodes: MdOldPost[]
}

type AllFile = {
  edges: {
    node: {
      relativePath: string
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }[]
}

// 記事一覧系ページの pageQuery 結果
type PostListQueryResult = {
  allBlogMarkdownRemark: AllMarkdownRemark
  allOldBlogMarkdownRemark: AllMarkdownOldRemark
  blogImages: AllFile
  oldBlogImages: AllFile
}

type CommonPost = {
  title: string
  excerpt: string
  slug: string
  date: string
  dateModified: string
  description?: string
  altText: string
  gatsbyImage: import("gatsby-plugin-image").IGatsbyImageData | undefined
  category: string
  tags: string[]
}

type MdPost = {
  id: string
  excerpt: string
  html: string
  internal: {
    contentFilePath: string
  }
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
    dateModified: string
    description: string
    featuredImagePath: string
    category: string
    // old-blog の記事は categories(配列)を持つ
    categories?: string[]
    tags: string[]
  }
}

type MdOldPost = {
  id: string
  excerpt: string
  html: string
  internal: {
    contentFilePath: string
  }
  fields: {
    slug: string
  }
  parent: {
    relativePath: string
  }
  frontmatter: {
    title: string
    date: string
    coverImage: string
    categories: string[]
    tags: string[]
  }
}

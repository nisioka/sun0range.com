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

type AllWpPost = {
  nodes: WpPost[]
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

type CommonPost = {
  title: string
  excerpt: string
  slug: string
  date: string
  dateModified: string
  description?: string
  altText: string
  gatsbyImage: IGatsbyImageData | undefined
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
    tags: string[]
  }
}

type WpPost = {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  modified: string
  featuredImage: {
    node: {
      altText: string
      gatsbyImage: any
    }
  }
  categories: {
    nodes: {
      name: string
    }[]
  }
  tags: {
    nodes: {
      name: string
    }[]
  }
}

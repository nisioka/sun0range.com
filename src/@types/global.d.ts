declare const __PATH_PREFIX__: string;

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
};

type AllMdx = {
  totalCount?: number
  nodes: {
    excerpt: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
      description: string
      featuredImagePath: string
    }
  }[]
}

type AllWpPost = {
  totalCount?: number
  nodes: {
    title: string
    excerpt: string
    slug: string
    date: string
    featuredImage: {
      node: {
        altText: string
        gatsbyImage: IGatsbyImageData | null
      }
    }
  }[]
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
  description?: string
  altText: string
  gatsbyImage: IGatsbyImageData | undefined
}
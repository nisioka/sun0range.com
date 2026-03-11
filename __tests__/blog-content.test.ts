import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const BLOG_DIR = path.join(__dirname, "..", "content", "blog")

const VALID_CATEGORIES = [
  "技術",
  "イベントレポート",
  "生活",
  "用語集",
  "書評",
  "業務効率化",
  "information-technology",
  "event-report",
  "life",
  "glossary",
  "book-report",
  "business-efficiency",
]

const REQUIRED_FRONTMATTER_FIELDS = [
  "title",
  "date",
  "description",
  "nodeType",
  "category",
  "tags",
]

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const frontmatter: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()
    frontmatter[key] = value.replace(/^["']|["']$/g, "")
  }
  return frontmatter
}

function getBlogPosts(): { name: string; content: string }[] {
  const dirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
  return dirs
    .filter(d => d.isDirectory())
    .map(d => {
      const indexPath = path.join(BLOG_DIR, d.name, "index.md")
      if (!fs.existsSync(indexPath)) return null
      return { name: d.name, content: fs.readFileSync(indexPath, "utf-8") }
    })
    .filter((p): p is { name: string; content: string } => p !== null)
}

describe("ブログ記事のフロントマター検証", () => {
  const posts = getBlogPosts()

  it("ブログ記事が1つ以上存在すること", () => {
    expect(posts.length).toBeGreaterThan(0)
  })

  for (const post of posts) {
    describe(`${post.name}`, () => {
      const frontmatter = parseFrontmatter(post.content)

      it("フロントマターが存在すること", () => {
        expect(Object.keys(frontmatter).length).toBeGreaterThan(0)
      })

      for (const field of REQUIRED_FRONTMATTER_FIELDS) {
        it(`必須フィールド "${field}" が存在すること`, () => {
          expect(frontmatter[field]).toBeDefined()
          expect(frontmatter[field].length).toBeGreaterThan(0)
        })
      }

      it("category が有効な値であること", () => {
        expect(VALID_CATEGORIES).toContain(frontmatter.category)
      })

      it("date が有効な日付形式 (YYYY-MM-DD) であること", () => {
        expect(frontmatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      })

      it("nodeType が blog であること", () => {
        expect(frontmatter.nodeType).toBe("blog")
      })

      it("tags が配列形式であること", () => {
        expect(frontmatter.tags).toMatch(/^\[.*\]$/)
      })
    })
  }
})

describe("ws-command-tmux-workspace 記事の内容検証", () => {
  const wsPost = getBlogPosts().find(
    p => p.name === "ws-command-tmux-workspace"
  )

  it("ws-command-tmux-workspace 記事が存在すること", () => {
    expect(wsPost).toBeDefined()
  })

  it("tmux に関する説明が含まれていること", () => {
    expect(wsPost!.content).toContain("tmux")
  })

  it("ws コマンドのサブコマンドが説明されていること", () => {
    expect(wsPost!.content).toContain("ws add")
    expect(wsPost!.content).toContain("ws rm")
    expect(wsPost!.content).toContain("ws list")
    expect(wsPost!.content).toContain("ws dash")
  })

  it("ソースコードへのリンクが含まれていること", () => {
    expect(wsPost!.content).toContain(
      "https://github.com/nisioka/myTools/blob/main/shell/ws"
    )
  })

  it("コードブロックが含まれていること", () => {
    expect(wsPost!.content).toContain("```bash")
  })
})

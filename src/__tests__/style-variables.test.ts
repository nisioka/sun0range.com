import * as fs from "fs"
import * as path from "path"

describe("style.css CSS variables and blog post spacing", () => {
  const cssContent = fs.readFileSync(
    path.resolve(__dirname, "../style.css"),
    "utf-8"
  )

  describe("container padding variables", () => {
    it("has horizontal padding of at least 16px", () => {
      const match = cssContent.match(/--paddingBaseLeft:\s*(\d+)px/)
      expect(match).not.toBeNull()
      const value = parseInt(match![1], 10)
      expect(value).toBeGreaterThanOrEqual(16)
    })

    it("has vertical padding of at least 12px", () => {
      const match = cssContent.match(/--paddingBaseTop:\s*(\d+)px/)
      expect(match).not.toBeNull()
      const value = parseInt(match![1], 10)
      expect(value).toBeGreaterThanOrEqual(12)
    })
  })

  describe("blog post heading spacing", () => {
    it("has h2 margin-top of at least 1.5em in blog-post section", () => {
      const blogPostH2 = cssContent.match(
        /\.blog-post\s+section\s+h2\s*\{[^}]*margin-top:\s*([\d.]+)em/
      )
      expect(blogPostH2).not.toBeNull()
      const value = parseFloat(blogPostH2![1])
      expect(value).toBeGreaterThanOrEqual(1.5)
    })

    it("has h3 margin-top of at least 1em in blog-post section", () => {
      const blogPostH3 = cssContent.match(
        /\.blog-post\s+section\s+h3\s*\{[^}]*margin-top:\s*([\d.]+)em/
      )
      expect(blogPostH3).not.toBeNull()
      const value = parseFloat(blogPostH3![1])
      expect(value).toBeGreaterThanOrEqual(1)
    })
  })

  describe("container class", () => {
    it("uses paddingBaseVertical and paddingBaseHorizontal variables", () => {
      expect(cssContent).toContain(
        "padding: var(--paddingBaseVertical) var(--paddingBaseHorizontal)"
      )
    })
  })
})

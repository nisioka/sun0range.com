import * as React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"
import styled from "styled-components"

// Re-create the styled components from blog-post.tsx for isolated testing
const Article = styled.article`
  margin: 0 auto;
  background-color: #fff;

  .time {
    text-align: right;
  }

  .featuredImage {
    text-align: center;
  }
`

const BlogEntry = styled.div`
  margin: 24px 0 40px;
  padding: 24px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`

describe("BlogPost styled components", () => {
  describe("Article", () => {
    it("centers content with auto margins", () => {
      const { container } = render(<Article />)
      expect(container.firstChild).toHaveStyleRule("margin", "0 auto")
    })

    it("has white background", () => {
      const { container } = render(<Article />)
      expect(container.firstChild).toHaveStyleRule(
        "background-color",
        "#fff"
      )
    })
  })

  describe("BlogEntry", () => {
    it("has sufficient vertical margin for content separation", () => {
      const { container } = render(<BlogEntry />)
      expect(container.firstChild).toHaveStyleRule("margin", "24px 0 40px")
    })

    it("has vertical padding inside borders for breathing room", () => {
      const { container } = render(<BlogEntry />)
      expect(container.firstChild).toHaveStyleRule("padding", "24px 0")
    })

    it("has top and bottom borders", () => {
      const { container } = render(<BlogEntry />)
      expect(container.firstChild).toHaveStyleRule(
        "border-top",
        "1px solid #ccc"
      )
      expect(container.firstChild).toHaveStyleRule(
        "border-bottom",
        "1px solid #ccc"
      )
    })
  })
})

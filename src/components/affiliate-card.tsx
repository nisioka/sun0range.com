import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import { findAffiliate, type AffiliateProgram } from "../data/affiliates"

/** カード右上に出す提携先の表示名。景表法(ステマ規制)の出所明示を兼ねる */
const PROGRAM_LABEL: Record<AffiliateProgram, string> = {
  moshimo: "もしもアフィリエイト",
  a8: "A8.net",
  valuecommerce: "バリューコマース",
  afb: "afb",
  amazon: "Amazonアソシエイト",
  rakuten: "楽天アフィリエイト",
}

type AffiliateCardProps = {
  id: string
}

/**
 * 記事本文中の `<affiliate-card id="..." />` を差し替えて描画するカード。
 *
 * - 案件データは `src/data/affiliates.ts` が唯一の出所
 * - 未定義ID・提携前(enabled: false)は何も描画しない(記事側の編集は不要)
 * - 「PR」表記は常に描画される。呼び出し側で消せない
 */
const AffiliateCard = ({ id }: AffiliateCardProps) => {
  const { allFile }: { allFile: AllFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "affiliates" }
        }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(width: 240, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)

  const affiliate = findAffiliate(id)
  if (!affiliate) return null

  const imageNode = affiliate.imagePath
    ? allFile.edges.find(
        edge => edge.node.relativePath === `affiliates/${affiliate.imagePath}`
      )?.node
    : undefined
  const image = imageNode ? getImage(imageNode.childImageSharp) : undefined

  return (
    <Card>
      <CardHeader>
        <PrBadge>PR</PrBadge>
        <ProgramName>{PROGRAM_LABEL[affiliate.program]}</ProgramName>
      </CardHeader>
      <CardBody>
        <Thumbnail>
          {image && <GatsbyImage image={image} alt={affiliate.name} />}
        </Thumbnail>
        <CardText>
          <ProductName>{affiliate.name}</ProductName>
          <Description>{affiliate.description}</Description>
          <Cta
            href={affiliate.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
          >
            {affiliate.ctaLabel ?? "詳細を見る"}
          </Cta>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default AffiliateCard

const Card = styled.aside`
  margin: var(--spacing-8) 0;
  padding: var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-3);
`

const PrBadge = styled.span`
  flex-shrink: 0;
  padding: var(--spacing-px) var(--spacing-2);
  border-radius: 4px;
  background: var(--color-accent);
  color: var(--color-accent-contrast);
  font-size: var(--fontSize-0);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-normal);
`

const ProgramName = styled.span`
  color: var(--color-text-light);
  font-size: var(--fontSize-0);
`

const CardBody = styled.div`
  display: flex;
  gap: var(--spacing-4);

  @media (max-width: 511px) {
    flex-direction: column;
  }
`

/* 画像の有無でカードの高さが変わらないよう、枠のサイズは固定する(CLS対策) */
const Thumbnail = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 4px;
  background: var(--color-surface-2);
  overflow: hidden;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: contain;
  }

  @media (max-width: 511px) {
    width: 100%;
    height: 160px;
  }
`

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
`

const ProductName = styled.p`
  margin: 0;
  color: var(--color-heading);
  font-size: var(--fontSize-2);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-tight);
`

const Description = styled.p`
  margin: 0;
  color: var(--color-text);
  font-size: var(--fontSize-1);
  line-height: var(--lineHeight-relaxed);
`

const Cta = styled.a`
  margin-top: auto;
  padding: var(--spacing-2) var(--spacing-6);
  border-radius: 4px;
  background: var(--color-accent);
  color: var(--color-accent-contrast);
  font-weight: var(--fontWeight-bold);
  text-decoration: none;

  &:hover {
    background: var(--color-accent-strong);
    color: var(--color-accent-contrast);
    text-decoration: none;
  }

  @media (max-width: 511px) {
    align-self: stretch;
    text-align: center;
  }
`

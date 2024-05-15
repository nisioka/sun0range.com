import * as React from "react"

import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import Age from "../../../components/age"
import Bio from "../../../components/bio"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGolang, faJava, faPython, faReact } from "@fortawesome/free-brands-svg-icons"

const HowAboutThisBlog = ({ location }: { location: Location }) => {

  return (
    <Layout location={location}>
      <h1>このブログについて</h1>

      <h2>本ブログの目的</h2>
      <p>
        「誰にでも分かりやすい」をモットーに、IT技術に関連するテーマを扱います。ITに詳しくない人にも理解できるよう、分かりやすく伝えることを目指します。
      </p>

      <h2>著者紹介</h2>
      <Bio></Bio>
      <p>
        IT会社でシステムエンジニアとして、主にJavaを用いたアプリ開発に携わっています。<br />
        <Age birthday={"1988/05/05"} />歳で二児(<Age birthday={"2020/11/07"} />歳、<Age birthday={"2024/01/11"} />歳)の父親でもあります。
      </p>
      <p>
        様々な背景を持つ人たちとの交流を通じ、「伝えること」の大切さと難しさを実感しています。その経験を活かし、IT技術に関する情報を分かりやすく伝えることを目指しています。
        常に学ぶ姿勢を持ち、最先端技術の理解を深めていくことを心掛けています。
      </p>

      <h3>主な使用言語</h3>
      <ul>
        <li>Java<FontAwesomeIcon icon={faJava}/>：業務レベル</li>
        <li>SQL：業務レベル</li>
        <li>C/C#：趣味レベル(学生時代に使用していた)</li>
        <li>Go<FontAwesomeIcon icon={faGolang}/>：趣味レベル(趣味でWebアプリケーションを実装。業務でも少し読むレベル)</li>
        <li>Python<FontAwesomeIcon icon={faPython}/>：趣味レベル(趣味で簡単なツールを書いたり)</li>
        <li>HTML/CSS/JavaScript：趣味レベル(Webアプリ実装経験があるためそれなりに。リッチなデザインについてはノータッチ)</li>
        <li>React<FontAwesomeIcon icon={faReact}/>：趣味レベル(趣味でWebアプリケーションを実装。業務でも少し読むレベル)</li>
        <li>Ruby：趣味レベル(Ruby on Railsのチュートリアルをやった)</li>
      </ul>

      <h3>主な資格</h3>
      <ul>
        <li>DBスペシャリスト</li>
        <li>セキュリティスペシャリスト</li>
        <li>応用情報技術者</li>
        <li>英検3級</li>
        <li>漢検2級</li>
      </ul>

      <h3>略歴</h3>
      <ul>
        <li><p>
          2011年3月：千葉大学 工学部 画像科学科 卒業。
        </p></li>
        <li><p>
          2013年3月：千葉大学 大学院融合科学研究科(修士課程) 卒業。
        </p></li>
        <li><p>
          2013年4月：独立系SIer(システムインテグレータ)会社に就職。主に金融・カード関連のWebアプリケーション開発(Java)案件に従事。社内新人研修講師を担当したりも。
        </p></li>
        <li><p>
          2017年4月：会計系の会社に転職。Java + ExtJSを使ってバック+フロント共にWebアプリケーション開発に従事。
        </p></li>
        <li><p>
          2019年5月：Alpaca
          Japan株式会社というAI技術を用いた金融サービス系の会社に転職。Alpaca証券という証券サービスのWebアプリケーション開発案件で、開発者やQA(クオリティアシュアランス:品質保証)、SRE(サイトリライアビリティエンジニア)として従事。
        </p></li>
        <li><p>
          2020年11月：育休を取得して育児に参加。
        </p></li>
        <li><p>
          2021年4月：育休から職場復帰。
        </p></li>
        <li><p>
          2024年1月：第二子誕生。再度育休を取得。
        </p></li>
      </ul>

      <h3>ポートフォリオ</h3>
      <h4>アンガーログ</h4>
      <p>
        Angularで実装した、怒りをコントロールするために記録をつけるWebアプリ。
        <Link to="https://nisioka.github.io/anger-log"
              target="_blank"
              rel="noopener">
          https://nisioka.github.io/anger-log</Link>
      </p>

      <h4>DroidJump</h4>
      <p>
        簡単アクションゲーム（Android用アプリケーション）
        <Link to="https://play.google.com/store/apps/details?id=com.nisioka.droidjump"
              target="_blank"
              rel="noopener">
          DroidJump</Link>
      </p>

      <h4>割り勘-Warikan-</h4>
      <p>
        割り勘計算ツール（Android用アプリケーション）
        <Link to="https://play.google.com/store/apps/details?id=com.dmp.warikan.www"
              target="_blank"
              rel="noopener">
          -Warikan-</Link>
      </p>
    </Layout>
  )
}

export const Head = () => <Seo title={"このブログについて"} />

export default HowAboutThisBlog

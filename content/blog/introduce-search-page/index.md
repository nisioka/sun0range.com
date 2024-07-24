---
title: 静的サイトでの動的なサイト内検索機能の実装を紹介
date: "2024-06-26"
dateModified: "2024-06-26"
description: "GatsbyJSを用いた静的サイトにおけるサイト内検索のReact実装を紹介"
featuredImagePath: "featured/search.webp"
nodeType: blog
category: 技術
tags: ["GatsbyJS", "React"]
---

## はじめに

本ブログは GatsbyJS を使用して静的サイトとして運用しています。

ただ、それでもサイト内検索などの動的な機能が必要であると考え、実装しました。
非常に軽快で満足できる実装になりました。ぜひこちらの<a href="/search" target="_brank">検索ページ</a>をご覧いただき、お試しください。

実際のコードが見たい場合は、<a href="https://github.com/nisioka/sun0range.com/blob/master/src/pages/search.tsx" target="_blank">こちら</a>をご覧ください。

## 全体仕様

- このページは、検索機能を提供します。API コールを行わず、ブラウザの JavaScript で動作します。
  - モバイル環境でも軽快に動作しますが、検索対象の増加によって性能が低下する可能性があります。
- 検索文字列の入力 1 文字ごとにインタラクティブに検索結果を表示します。
- URL のクエリパラメータに検索文字列が含まれ、入力フォームと同期しているため、リロードしても同じ表示が行われ、検索結果の URL で共有もできます。
- 検索対象は全ての記事であり、タイトルか記事内容に文字列が含まれるかどうかで判定します。複数ワード検索はスペースで区切って行えます。大文字と小文字は区別しません。
- 検索結果には、ヒット件数と記事のタイトルと説明文が表示されます。

## 詳細説明

必要最小限のコードを抜粋しています。これに基づいて後述します。

```typescript
import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import { convertCategory, mergePosts } from "../utilFunction"

const Search = ({ data, location }: { data: any; location: Location }) => {
  const posts = mergePosts(data.allMarkdownRemark, data.allWpPost, data.allFile)
  const initQuery = decodeURI(
    location.href?.split("?q=")[1] || ""
  ).toLowerCase()
  const [state, setState] = useState({
    filteredData: filterByQuery(initQuery.split(/\s+/)),
    query: initQuery,
  })
  const { filteredData, query } = state

  function filterByQuery(queryWords: string[]) {
    return posts.filter(post => {
      for (const word of queryWords) {
        if (
          !post.title.toLowerCase().includes(word) &&
          !post.description?.toLowerCase().includes(word)
        ) {
          return false
        }
      }
      return true
    })
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const queryWords = event.target.value.toLowerCase().split(/\s+/)

    setState(prevState => ({
      ...prevState,
      filteredData: filterByQuery(queryWords),
      query: queryWords.join(" "),
    }))
  }

  useEffect(() => {
    // ユーザーの入力があるたびにURLのクエリパラメータを更新
    const params = new URLSearchParams()
    if (query) {
      params.append("q", query)
    } else {
      params.delete("q")
    }
    window.history.replaceState(
      "",
      "",
      location.href.split("?")[0] +
        (params.size > 0 ? "?" + params.toString() : "")
    )
  }, [state.query])

  return (
    <>
      <input
        type="text"
        aria-label="Search"
        placeholder="検索ワードを入力..."
        onChange={handleInputChange}
        value={query}
      />
      <div className="result-inner__res">
        {query !== ""
          ? query + " の検索結果: " + filteredData.length + "件"
          : filteredData.length + "件の記事があります"}
      </div>
      <h1>サイト内検索</h1>
      <p>{filteredData.length} 記事あります</p>
      {filteredData.map(post => {
        return (
          <li key={post.slug}>
            <Link to={`/${convertCategory(post.category)}/${post.slug}`}>
              <h2>
                <span>{post.title}</span>
              </h2>
              <section>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </section>
            </Link>
          </li>
        )
      })}
    </>
  )
}
```

1. 検索対象となる全記事データを取得します。これはほぼ GatsbyJS の機能を利用しています。"mergePosts"関数は単に`pageQuery`で取得した data を使いやすい形に整形しているだけです。
2. "useState"フックを使用して、フィルタリングされたデータとクエリを保持する"state"と"setState"を定義します。初期値として、URL のクエリパラメータに基づいて設定します。
3. "filterByQuery"関数を定義しています。この関数は、クエリワードに基づいて記事をフィルタリングします。各記事のタイトルと説明をクエリワードと比較し、一致する記事のみを返します。
4. "handleInputChange"関数も定義しています。ユーザーの入力に応じてクエリを更新し、フィルタリングされたデータを更新します。
5. "useEffect"フックは、コンポーネントのレンダリング後に実行されます。ユーザーが入力したクエリで URL のクエリパラメータを更新します。つまり、同期させます。
6. 最後に、レイアウトと検索結果を表示する JSX が返されます。入力欄、検索結果の表示、およびフィルタリングされた記事のリストが表示されます。

## おわりに

以上です。少ない記述でやりたいことができるので、ぜひ参考にしてみてください。  
React の強力さを感じました。

---

<div class="booklink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="booklink-image" style="float:left;margin:0 15px 10px 0;"><a href="" target="_blank" rel="nofollow" ><img src="https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9546/9784844379546.jpg?_ex=200x200" style="border: none;" /></a></div><div class="booklink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="booklink-name" style="margin-bottom:10px;line-height:120%"><a href="" target="_blank" rel="nofollow" >【POD】React & Gatsby開発入門</a><div class="booklink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail" style="margin-bottom:5px;">竹本 雄貴 インプレスR&D 2021年04月02日頃    </div><div class="booklink-link2" style="margin-top:10px;"><div class="shoplinkamazon" style="margin:5px 0"><a href="//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4844379542" target="_blank" rel="nofollow" >Amazon</a></div><div class="shoplinkkindle" style="margin:5px 0"><a href="//af.moshimo.com/af/c/click?a_id=1041250&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fkeywords%3D%25E3%2580%2590POD%25E3%2580%2591React%2520%2526%2520Gatsby%25E9%2596%258B%25E7%2599%25BA%25E5%2585%25A5%25E9%2596%2580%26__mk_ja_JP%3D%2583J%2583%255E%2583J%2583i%26url%3Dnode%253D2275256051" target="_blank" rel="nofollow" >Kindle</a></div>                               	   	   	  	  <div class="shoplinktoshokan" style="margin:5px 0"><a href="http://calil.jp/book/4844379542" target="_blank" rel="nofollow" >図書館</a></div>	</div></div><div class="booklink-footer" style="clear: left"></div></div>

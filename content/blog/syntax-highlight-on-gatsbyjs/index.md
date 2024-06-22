---
title: MarkdownでもWordPressでも使えるGatsbyJSでの構文ハイライト
date: "2024-06-10"
dateModified: "2024-06-10"
description: "WordPressは非常に強力なCMSですが、動的サイトであるため、サーバーの保守やセキュリティ対策が必要です。一方、静的サイトジェネレーターであるGatsbyJSを使用すると、高速で安全なサイトを構築できます。本記事では、AWSにデプロイしていたWordPressサイトをGatsbyJSとGitHub Pagesを使用した静的サイトへ移行する手順を紹介します。"
featuredImagePath: "featured/pc.webp"
nodeType: blog
category: 技術
tags: ["GatsbyJS", "React", "syntax highlight"]
---

## 概要

GatsbyJSでの汎用的な構文ハイライト(syntax highlight)の実装方法を紹介します。  
本ブログはMarkdownファイルとWordPressの両方のコンテンツをGatsbyで表示していて、その場合に使えるやり方です。もちろん何れかの場合でもOKです。  
`react-syntax-highlighter`というプラグインを使って、それに上手くコンテンツデータを渡すということをやってます。

## 依存関係のインストール

ご存知のように、GatsbyでWordPressのコンテンツを読み込むことは、単に `dangerouslySetInnerHtml={{__html=content}}` を使用することです。つまり、コンテンツ自体に構文ハイライトを追加できれば、準備完了です。

この問題の1つの解決策は、html-react-parserのようなHTMLからReactへのパーサーを使用することです。

HTMLをReactコンポーネントにパースする場合、構文ハイライトを行うコンポーネントが必要です。いくつかのライブラリがありますが、ここではreact-syntax-highlighterを使用します。このプラグインは最も完全なソリューションを提供しているようです。

```bash
npm install --save html-react-parser react-syntax-highlighter
```

ラッパーコンポーネントの作成
構文ハイライターを使用するために、<PostCode/> コンポーネントを作成します。このコンポーネントは構文ハイライターをラップし、言語と子要素（実際のコード）を渡します。

さらに、構文ハイライトのテーマをインポートするために使用できます：

```javascript
import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {ghcolors} from 'react-syntax-highlighter/dist/esm/styles/prism';

export const PostCode = ({language, children}) => (
  <SyntaxHighlighter
    style={ghcolors}
    language={language}>
    {children}
  </SyntaxHighlighter>
);
```
このコンポーネントでは、Prism.jsを使用しています。Prismはhighlight.jsよりも多くの言語をサポートしているようです。highlight.jsを使用したい場合は、次のコンポーネントを使用できます：

```javascript
import React from 'react';
import {SyntaxHighlighter} from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const PostCode = ({language, children}) => (
  <SyntaxHighlighter
    style={github}
    language={language}>
    {children}
  </SyntaxHighlighter>
);
```
ここでの良い点は、非常に似た方法で動作することです。唯一の違いは、異なるスタイルプロパティを選択し、異なる場所からSyntaxHighlighterをインポートする必要があることです。

Reactパーサーの使用
次に行うべきステップは、コンテンツ内のすべての <pre/> 要素を新しい <PostCode/> コンポーネントに置き換えることです。元々、次のコードを使用してGatsbyページテンプレートにコンテンツを挿入していました：

```javascript
<div dangerouslySetInnerHtml={{__html: content}}/>
```
react-html-parserを使用するには、次のように置き換えます：

```javascript
<div>{parse(content, {replace: replaceCode})}</div>
```
ただし、これを機能させるには、次のインポートを追加する必要があります：

```javascript
import parse, {domToReact} from 'html-react-parser';
```
最後のステップは、replaceCode() 関数を定義することです。この関数内で、ノードの名前が <pre/> に一致する場合、 <PostCode/> コンポーネントを返します：

```javascript
const replaceCode = node => {
  if (node.name === 'pre') {
    return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
  }
};
```
言語を渡すために、元のマークアップから何らかの方法で取得する必要があります。私のWordPressサイトでは、言語をクラス名として定義し、構文ハイライターがそれをピックアップしていました。

つまり、属性から言語を取得できます：

```javascript
const getLanguage = node => {
  if (node.attribs.class != null) {
    return node.attribs.class;
  }
  return null;
};
```
highlight.jsを使用してlang:プレフィックスを使用している場合は、ここでこのプレフィックスをフィルタリングします。

さらに、実際のコードもマークアップから取得する必要があります。私のブログでは、すべてのコードを <code/> 要素内にラップしていました。つまり、 <PostCode/> コンポーネントに送信する前にコードをアンラップする必要があります：

```javascript
const getCode = node => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children;
  } else {
    return node.children;
  }
};
```
Gutenbergエディターの使用
WordPressのGutenbergエディターを使用して新しいブログ投稿を書くとき、適切なクラスをコードブロックに追加することで、使用する言語を選択できます。

まず、投稿にコードブロックを追加します：

WordPressにコードブロックを追加するスクリーンショット

ブログ投稿に追加するコードを入力した後、コードブロックを選択し、ブログの右側のパネルにある「詳細」セクションを開きます。

このセクション内で、「追加CSSクラス」フィールドを見つけることができ、ここに希望する言語を追加します。react-syntax-highlighterをPrism.jsと共に使用する場合のサポートされている言語のリストはここで確認できます。

ブロックペイン内の詳細セクションのスクリーンショット

これで、Gatsbyアプリケーションを実行し、構文ハイライトされたコードを確認できるはずです。

構文ハイライトされたコードのスクリーンショット

これで、WordPressとGatsbyで構文ハイライトを実装しました。完全な例に興味がある場合は、このブログのソースコードをGitHubで確認できます。
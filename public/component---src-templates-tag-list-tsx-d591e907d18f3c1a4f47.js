"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[225],{4666:function(e,t,n){var a=n(9216),l=n(758),r=n(778);t.A=e=>{let{title:t,description:n,location:i,imagePath:c,post:o,children:m}=e;const{siteMetadata:p}=r.A,s="/"===i.pathname,d=n||p.description,u=s?p.title:`${t} | ${p.title}`,g=p.siteUrl+i.pathname.replace(/\/page\/([0-9])+\//,""),h=`${p.siteUrl}${c||"/favicon.webp"}`;let E=function(){const e=[{"@type":"Person",name:p.author.name,description:p.author.summary,url:p.siteUrl,sameAs:[p.social.twitter,p.social.github]}],n={"@type":"Organization",name:p.title,description:p.description,logo:{"@type":"ImageObject",url:`${p.siteUrl}/favicon.webp`,width:512,height:512}};let l=[{"@context":"http://schema.org","@type":s?"webSite":"webPage",inLanguage:"ja",url:g,name:t,author:e,publisher:n,image:h,description:d}];if(o){const t={"@context":"http://schema.org","@type":"BlogPosting",url:g,name:o.title,headline:o.title,image:{"@type":"ImageObject",url:h},description:o.excerpt,datePublished:new Date(o.date),dateModified:new Date(o.dateModified),mainEntityOfPage:{"@type":"WebPage","@id":g},author:e,publisher:n};l=[].concat((0,a.A)(l),[t])}return JSON.stringify(l)}();return l.createElement(l.Fragment,null,l.createElement("html",{lang:"ja"}),l.createElement("title",null,u),l.createElement("link",{rel:"canonical",href:g}),l.createElement("script",{type:"application/ld+json"},E),l.createElement("meta",{name:"description",content:d}),c&&l.createElement(l.Fragment,null,l.createElement("meta",{property:"og:image",content:h}),l.createElement("meta",{property:"og:url",content:h}),l.createElement("meta",{property:"twitter:image",content:h})),l.createElement("meta",{property:"og:title",content:u}),l.createElement("meta",{property:"og:description",content:d}),l.createElement("meta",{property:"og:type",content:""+(s?"website":"webpage")}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:p.social.twitter}),l.createElement("meta",{name:"twitter:title",content:u}),l.createElement("meta",{name:"twitter:description",content:d}),m)}},5453:function(e,t,n){n.r(t),n.d(t,{Head:function(){return p}});var a=n(758),l=n(9307),r=n(252),i=n(6256),c=n(4666),o=n(812),m=n(6477);t.default=e=>{let{pageContext:t,data:n,location:p}=e;const s=t.tag,d=(0,r.u5)(n.allMarkdownRemark,n.allWpPost,n.allFile),u=`【${s}】タグ 一覧`;return 0===d.length?a.createElement(i.A,{location:p},a.createElement(c.A,{title:u,location:p}),a.createElement("p",null,"そのタグの記事はありません。")):a.createElement(i.A,{location:p},a.createElement(m.yH,null,a.createElement("h1",null,u),a.createElement("p",null,d.length," 記事あります")),a.createElement(m.N1,null,d.map((e=>a.createElement("li",{key:e.slug},a.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},a.createElement(l.Link,{to:`/${(0,r.Ed)(e.category)}/${e.slug}`},a.createElement("h2",null,a.createElement("span",null,e.title)),a.createElement("section",null,a.createElement("div",null,a.createElement("small",null,a.createElement("time",null,e.date))),a.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||a.createElement(o.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))))};const p=e=>{let{pageContext:t,location:n}=e;return a.createElement(c.A,{title:`【${t.tag}】タグ 一覧`,description:`【${t.tag}】タグの記事一覧です`,location:n})}},6477:function(e,t,n){n.d(t,{N1:function(){return r},yH:function(){return l}});var a=n(832);const l=a.Ay.header`
  text-align: center;

  h1,
  h2 {
    &:after {
      margin: 0 auto;
      content: "";
      display: block;
      width: 98%;
      height: 3px;
      background: var(--orange);
    }
  }
`,r=a.Ay.ol`
  column-count: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  li {
    padding: 5px;
    margin: var(--spacing-1);
    box-sizing: border-box;
    border: 1px solid var(--black);
    border-radius: 5px;
    background-color: #fff;

    a {
      color: var(--black);
      text-decoration: none;
    }

    h2 {
      font-size: var(--fontSize-2);
    }
  }
  .thumbnail {
    float: left;
  }

  @media screen and (min-width: calc(512px + 160px)) {
    column-count: 2;

    li {
      padding: 15px;
      width: 48%;

      h2 {
        font-size: var(--fontSize-3);
      }

      a {
        &:hover h2 {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (min-width: calc(768px + 330px)) {
    column-count: 3;

    li {
      width: 32%;
    }
  }
`;a.Ay.div`
  background-color: #fff;
`}}]);
//# sourceMappingURL=component---src-templates-tag-list-tsx-d591e907d18f3c1a4f47.js.map
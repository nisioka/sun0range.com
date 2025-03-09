"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[794],{4134:function(e,t,n){var a=n(7913),l=n(758),r=n(9942);t.A=e=>{let{title:t,description:n,location:i,imagePath:o,post:c,children:m}=e;const{siteMetadata:p}=r.A,s="/"===i.pathname,g=n||p.description,u=s?p.title:`${t} | ${p.title}`,d=p.siteUrl+i.pathname.replace(/\/page\/([0-9])+\//,""),E=`${p.siteUrl}${o||"/favicon.webp"}`;let y=function(){const e=[{"@type":"Person",name:p.author.name,description:p.author.summary,url:p.siteUrl,sameAs:[p.social.twitter,p.social.github]}],n={"@type":"Organization",name:p.title,description:p.description,logo:{"@type":"ImageObject",url:`${p.siteUrl}/favicon.webp`,width:512,height:512}};let l=[{"@context":"http://schema.org","@type":s?"webSite":"webPage",inLanguage:"ja",url:d,name:t,author:e,publisher:n,image:E,description:g}];if(c){const t={"@context":"http://schema.org","@type":"BlogPosting",url:d,name:c.title,headline:c.title,image:{"@type":"ImageObject",url:E},description:c.excerpt,datePublished:new Date(c.date),dateModified:new Date(c.dateModified),mainEntityOfPage:{"@type":"WebPage","@id":d},author:e,publisher:n};l=[].concat((0,a.A)(l),[t])}return JSON.stringify(l)}();return l.createElement(l.Fragment,null,l.createElement("html",{lang:"ja"}),l.createElement("title",null,u),l.createElement("link",{rel:"canonical",href:d}),l.createElement("script",{type:"application/ld+json"},y),l.createElement("meta",{name:"description",content:g}),o&&l.createElement(l.Fragment,null,l.createElement("meta",{property:"og:image",content:E}),l.createElement("meta",{property:"og:url",content:E}),l.createElement("meta",{property:"twitter:image",content:E})),l.createElement("meta",{property:"og:title",content:u}),l.createElement("meta",{property:"og:description",content:g}),l.createElement("meta",{property:"og:type",content:""+(s?"website":"webpage")}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:p.social.twitter}),l.createElement("meta",{name:"twitter:title",content:u}),l.createElement("meta",{name:"twitter:description",content:g}),m)}},5965:function(e,t,n){var a=n(9301),l=n(758),r=n(5910);t.A=e=>{let t,n,r,o,{maxPage:c,current:m,type:p=""}=e;return t=1===m?l.createElement("li",{className:"not-work",key:"pagination0"},l.createElement("span",null,"最新")):l.createElement("li",{key:"pagination0"},l.createElement(a.Link,{to:`/${p}${p?"/":""}`},"最新")),n=1===m?l.createElement("li",{className:"not-work",key:"pagination1"},l.createElement("span",null,"前へ")):2===m?l.createElement("li",{key:"pagination1"},l.createElement(a.Link,{to:`/${p}${p?"/":""}`},"前へ")):l.createElement("li",{key:"pagination1"},l.createElement(a.Link,{to:`/${p}${p?"/":""}page/${m-1}/`},"前へ")),r=m===c?l.createElement("li",{className:"not-work",key:"pagination3"},l.createElement("span",null,"次へ")):l.createElement("li",{key:"pagination3"},l.createElement(a.Link,{to:`/${p}${p?"/":""}page/${m+1}/`},"次へ")),o=m===c?l.createElement("li",{className:"not-work",key:"paginatio4"},l.createElement("span",null,"最後")):l.createElement("li",{key:"pagination4"},l.createElement(a.Link,{to:`/${p}${p?"/":""}page/${c}/`},"最後")),c>1?l.createElement(i,null,l.createElement("ul",null,t,n,l.createElement("li",{key:"pagination2"},"page ",m,"/",c),r,o)):l.createElement(l.Fragment,null)};const i=r.Ay.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: center;

    li {
      padding: 0 10px;

      &.not-work span {
        text-decoration: none;
        background: var(--orange);
        color: #fff;
        opacity: 0.5;
      }

      span,
      a {
        text-decoration: underline;
        display: flex;
        align-items: center;
        font-weight: 700;
        color: var(--orange);
        border-radius: 5px;
        border: 1px solid var(--orange);
        padding: 0 10px;
      }
    }
  }
`},9680:function(e,t,n){n.r(t),n.d(t,{Head:function(){return s}});var a=n(758),l=n(9301),r=n(1608),i=n(8676),o=n(4134),c=n(7194),m=n(9817),p=n(5965);t.default=e=>{let{pageContext:t,data:n,location:o}=e;const s=(0,r.u5)(n.allMarkdownRemark,n.allWpPost,n.allFile);return a.createElement(i.A,{location:o},a.createElement(m.yH,null,a.createElement("h1",null,"記事一覧")),a.createElement(m.N1,null,s.map((e=>a.createElement("li",{key:e.slug},a.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},a.createElement(l.Link,{to:`/${(0,r.Ed)(e.category)}/${e.slug}`},a.createElement("h2",null,a.createElement("span",null,e.title)),a.createElement("section",null,a.createElement("div",null,a.createElement("small",null,a.createElement("time",null,e.date))),a.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||a.createElement(c.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))),a.createElement(p.A,{maxPage:t.maxPage,current:t.current}))};const s=e=>{let{location:t}=e;return a.createElement(o.A,{title:"記事一覧",location:t})}},9817:function(e,t,n){n.d(t,{N1:function(){return r},yH:function(){return l}});var a=n(5910);const l=a.Ay.header`
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
//# sourceMappingURL=component---src-templates-page-list-tsx-a3f445688f81b1485dd8.js.map
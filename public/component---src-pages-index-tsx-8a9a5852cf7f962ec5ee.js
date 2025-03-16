"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[245],{571:function(e,t,n){n.r(t),n.d(t,{Head:function(){return p}});var a=n(758),l=n(107),r=n(8676),i=n(4134),o=n(6285),c=n(1608),m=n(9817),s=n(5965);t.default=e=>{let{data:t,location:n}=e;const i=(0,c.u5)(t.allMarkdownRemark,t.allWpPost,t.allFile);if(0===i.length)return a.createElement(r.A,{location:n},a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'));const p=Math.ceil(i.length/12);return a.createElement(r.A,{location:n},a.createElement(m.N1,null,i.slice(0,12).map((e=>a.createElement("li",{key:e.slug},a.createElement("article",{className:"post-list-item",itemType:"https://schema.org/Article"},a.createElement(l.Link,{to:`/${(0,c.Ed)(e.category)}/${e.slug}`,itemProp:"url"},a.createElement("h2",null,a.createElement("span",{itemProp:"headline"},e.title)),a.createElement("section",null,a.createElement("div",{style:{textAlign:"right"}},a.createElement("small",null,a.createElement("time",null,e.dateModified))),a.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||a.createElement(o.G,{alt:e.altText,image:e.gatsbyImage})),a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt},itemProp:"description"})))))))),a.createElement(s.A,{maxPage:p,current:1}))};const p=e=>{let{location:t}=e;return a.createElement(i.A,{title:"",location:t})}},4134:function(e,t,n){var a=n(4439),l=n(758),r=n(9942);t.A=e=>{let{title:t,description:n,location:i,imagePath:o,post:c,children:m}=e;const{siteMetadata:s}=r.A,p="/"===i.pathname,g=n||s.description,d=p?s.title:`${t} | ${s.title}`,u=s.siteUrl+i.pathname.replace(/\/page\/([0-9])+\//,""),E=`${s.siteUrl}${o||"/favicon.webp"}`;let y=function(){const e=[{"@type":"Person",name:s.author.name,description:s.author.summary,url:s.siteUrl,sameAs:[s.social.twitter,s.social.github]}],n={"@type":"Organization",name:s.title,description:s.description,logo:{"@type":"ImageObject",url:`${s.siteUrl}/favicon.webp`,width:512,height:512}};let l=[{"@context":"http://schema.org","@type":p?"webSite":"webPage",inLanguage:"ja",url:u,name:t,author:e,publisher:n,image:E,description:g}];if(c){const t={"@context":"http://schema.org","@type":"BlogPosting",url:u,name:c.title,headline:c.title,image:{"@type":"ImageObject",url:E},description:c.excerpt,datePublished:new Date(c.date),dateModified:new Date(c.dateModified),mainEntityOfPage:{"@type":"WebPage","@id":u},author:e,publisher:n};l=[].concat((0,a.A)(l),[t])}return JSON.stringify(l)}();return l.createElement(l.Fragment,null,l.createElement("html",{lang:"ja"}),l.createElement("title",null,d),l.createElement("link",{rel:"canonical",href:u}),l.createElement("script",{type:"application/ld+json"},y),l.createElement("meta",{name:"description",content:g}),o&&l.createElement(l.Fragment,null,l.createElement("meta",{property:"og:image",content:E}),l.createElement("meta",{property:"og:url",content:E}),l.createElement("meta",{property:"twitter:image",content:E})),l.createElement("meta",{property:"og:title",content:d}),l.createElement("meta",{property:"og:description",content:g}),l.createElement("meta",{property:"og:type",content:""+(p?"website":"webpage")}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:s.social.twitter}),l.createElement("meta",{name:"twitter:title",content:d}),l.createElement("meta",{name:"twitter:description",content:g}),m)}},5965:function(e,t,n){var a=n(107),l=n(758),r=n(5910);t.A=e=>{let t,n,r,o,{maxPage:c,current:m,type:s=""}=e;return t=1===m?l.createElement("li",{className:"not-work",key:"pagination0"},l.createElement("span",null,"最新")):l.createElement("li",{key:"pagination0"},l.createElement(a.Link,{to:`/${s}${s?"/":""}`},"最新")),n=1===m?l.createElement("li",{className:"not-work",key:"pagination1"},l.createElement("span",null,"前へ")):2===m?l.createElement("li",{key:"pagination1"},l.createElement(a.Link,{to:`/${s}${s?"/":""}`},"前へ")):l.createElement("li",{key:"pagination1"},l.createElement(a.Link,{to:`/${s}${s?"/":""}page/${m-1}/`},"前へ")),r=m===c?l.createElement("li",{className:"not-work",key:"pagination3"},l.createElement("span",null,"次へ")):l.createElement("li",{key:"pagination3"},l.createElement(a.Link,{to:`/${s}${s?"/":""}page/${m+1}/`},"次へ")),o=m===c?l.createElement("li",{className:"not-work",key:"paginatio4"},l.createElement("span",null,"最後")):l.createElement("li",{key:"pagination4"},l.createElement(a.Link,{to:`/${s}${s?"/":""}page/${c}/`},"最後")),c>1?l.createElement(i,null,l.createElement("ul",null,t,n,l.createElement("li",{key:"pagination2"},"page ",m,"/",c),r,o)):l.createElement(l.Fragment,null)};const i=r.Ay.nav`
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
`},9817:function(e,t,n){n.d(t,{N1:function(){return r},yH:function(){return l}});var a=n(5910);const l=a.Ay.header`
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
//# sourceMappingURL=component---src-pages-index-tsx-8a9a5852cf7f962ec5ee.js.map
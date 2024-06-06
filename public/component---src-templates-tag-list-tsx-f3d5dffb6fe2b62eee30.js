"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[225],{1042:function(e,t,a){var n=a(4506),l=a(6540),r=a(2738);t.A=e=>{let{title:t,description:a,location:i,imagePath:c,post:o,children:m}=e;const{siteMetadata:p}=r.A,s="/"===i.pathname,d=a||p.description,u=s?p.title:`${t} | ${p.title}`,g=p.siteUrl+i.pathname.replace(/\/page\/([0-9])+\//,""),h=`${p.siteUrl}${c||"/favicon.webp"}`;let E=function(){const e=[{"@type":"Person",name:p.author.name,description:p.author.summary,url:p.siteUrl,sameAs:[p.social.twitter,p.social.github]}],a={"@type":"Organization",name:p.title,description:p.description,logo:{"@type":"ImageObject",url:`${p.siteUrl}/favicon.webp`,width:512,height:512}};let l=[{"@context":"http://schema.org","@type":s?"webSite":"webPage",inLanguage:"ja",url:g,name:t,author:e,publisher:a,image:h,description:d}];if(o){const t={"@context":"http://schema.org","@type":"BlogPosting",url:g,name:o.title,headline:o.title,image:{"@type":"ImageObject",url:h},description:o.excerpt,datePublished:new Date(o.date),dateModified:new Date(o.dateModified),mainEntityOfPage:{"@type":"WebPage","@id":g},author:e,publisher:a};l=[].concat((0,n.A)(l),[t])}return JSON.stringify(l)}();return l.createElement(l.Fragment,null,l.createElement("html",{lang:"ja"}),l.createElement("title",null,u),l.createElement("link",{rel:"canonical",href:g}),l.createElement("script",{type:"application/ld+json"},E),l.createElement("meta",{name:"description",content:d}),c&&l.createElement(l.Fragment,null,l.createElement("meta",{property:"og:image",content:h}),l.createElement("meta",{property:"og:url",content:h}),l.createElement("meta",{property:"twitter:image",content:h})),l.createElement("meta",{property:"og:title",content:u}),l.createElement("meta",{property:"og:description",content:d}),l.createElement("meta",{property:"og:type",content:""+(s?"website":"webpage")}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:p.social.twitter}),l.createElement("meta",{name:"twitter:title",content:u}),l.createElement("meta",{name:"twitter:description",content:d}),m)}},1877:function(e,t,a){a.d(t,{N1:function(){return r},yH:function(){return l}});var n=a(7581);const l=n.Ay.header`
  text-align: center;

  h1, h2 {
    &:after {
      margin: 0 auto;
      content: '';
      display: block;
      width: 98%;
      height: 3px;
      background: var(--orange);
    }
  }
`,r=n.Ay.ol`
  column-count: 1;
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
  width: var(--maxWidth-full);

  li {
    padding: 5px;
    margin: var(--spacing-1) ;
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
`;n.Ay.div`
  background-color: #fff;
`},3330:function(e,t,a){a.r(t),a.d(t,{Head:function(){return p}});var n=a(6540),l=a(4794),r=a(500),i=a(5776),c=a(1042),o=a(2532),m=a(1877);t.default=e=>{let{pageContext:t,data:a,location:p}=e;const s=t.tag,d=(0,r.u5)(a.allMarkdownRemark,a.allWpPost,a.allFile),u=`【${s}】タグ 一覧`;return 0===d.length?n.createElement(i.A,{location:p},n.createElement(c.A,{title:u,location:p}),n.createElement("p",null,"そのタグの記事はありません。")):n.createElement(i.A,{location:p},n.createElement(m.yH,null,n.createElement("h1",null,u),n.createElement("p",null,d.length," 記事あります")),n.createElement(m.N1,null,d.map((e=>n.createElement("li",{key:e.slug},n.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},n.createElement(l.Link,{to:`/${(0,r.Ed)(e.category)}/${e.slug}`},n.createElement("h2",null,n.createElement("span",null,e.title)),n.createElement("section",null,n.createElement("div",null,n.createElement("small",null,n.createElement("time",null,e.date))),n.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||n.createElement(o.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),n.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))))};const p=e=>{let{pageContext:t,location:a}=e;return n.createElement(c.A,{title:`【${t.tag}】タグ 一覧`,description:`【${t.tag}】タグの記事一覧です`,location:a})}}}]);
//# sourceMappingURL=component---src-templates-tag-list-tsx-f3d5dffb6fe2b62eee30.js.map
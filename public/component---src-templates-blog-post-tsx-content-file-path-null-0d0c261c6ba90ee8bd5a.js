"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[316],{8884:function(e,t,l){l.r(t),l.d(t,{Head:function(){return f}});var a=l(6540),n=l(4794),r=l(5776),i=l(1042),o=l(2532),d=l(7581),c=l(500),s=l(9531),u=l(7326),g=l(900),m=l(695),p=l(9849),v=l(2738);t.default=e=>{var t,l,i,d,u,m,f,E;let{data:{allFile:h,markdownRemark:b,mdPrevious:A,mdNext:I,wpPost:N,wpPrevious:P,wpNext:L},location:j}=e;const{siteMetadata:C}=v.A,_={id:(null==b?void 0:b.id)||(null==N?void 0:N.id),title:(null==b?void 0:b.frontmatter.title)||(null==N?void 0:N.title),content:(null==b?void 0:b.html)||(null==N?void 0:N.content),excerpt:(0,c.VE)((null==b?void 0:b.excerpt)||(null==N?void 0:N.excerpt)),slug:(null==b?void 0:b.fields.slug.replace(/^\//,"").replace(/\/$/,""))||"/"+(null==N?void 0:N.slug),date:(null==b?void 0:b.frontmatter.date)||(null==N?void 0:N.date),dateModified:(null==b?void 0:b.frontmatter.dateModified)||(null==N?void 0:N.modified),description:null==b?void 0:b.frontmatter.description,altText:(null==N||null===(t=N.featuredImage)||void 0===t?void 0:t.node.altText)||"",gatsbyImage:(null==N||null===(l=N.featuredImage)||void 0===l?void 0:l.node.gatsbyImage)||(0,o.c)(null===(i=h.edges[0])||void 0===i?void 0:i.node.childImageSharp),category:(null==b?void 0:b.frontmatter.category)||(null==N||null===(d=N.categories)||void 0===d||null===(u=d.nodes[0])||void 0===u?void 0:u.name),tags:(null==b?void 0:b.frontmatter.tags)||(null==N||null===(m=N.tags)||void 0===m?void 0:m.nodes.map((e=>e.name)))},M={id:(null==A?void 0:A.id)||(null==P?void 0:P.id),title:(null==A?void 0:A.frontmatter.title)||(null==P?void 0:P.title),slug:(null==A?void 0:A.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==P?void 0:P.slug),category:(null==A?void 0:A.frontmatter.category)||(null==P?void 0:P.categories.nodes[0].name)},S={id:(null==I?void 0:I.id)||(null==L?void 0:L.id),title:(null==I?void 0:I.frontmatter.title)||(null==L?void 0:L.title),slug:(null==I?void 0:I.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==L?void 0:L.slug),category:(null==I?void 0:I.frontmatter.category)||(null==L||null===(f=L.categories)||void 0===f||null===(E=f.nodes[0])||void 0===E?void 0:E.name)};return a.createElement(r.A,{location:j},a.createElement(x,{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},_.title),a.createElement("p",null,a.createElement("div",{className:"time"},a.createElement("small",null,a.createElement("time",null,_.date))))),a.createElement("div",{className:"featuredImage"},a.createElement(o.G,{image:_.gatsbyImage,alt:_.title})),a.createElement($,null,a.createElement("dt",null,"カテゴリ"),a.createElement("dd",null,a.createElement(n.Link,{to:`/category/${(0,c.Ed)(_.category)}`},_.category))),a.createElement($,null,a.createElement("dt",null,"タグ"),_.tags.map(((e,t)=>a.createElement("dd",{key:`tag${t}`},a.createElement(n.Link,{to:`/tag/${e}/`},e))))),a.createElement(k,null,a.createElement("section",{itemProp:"articleBody"},(0,g.Ay)(_.content,{replace:y}))),a.createElement("hr",null)),a.createElement(w,{className:"blog-post-nav"},a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.createElement("li",null,M.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(M.category)}/${M.slug}`,rel:"prev"},"← ",M.title)),a.createElement("li",null,S.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(S.category)}/${S.slug}`,rel:"next"},S.title," →")))),a.createElement(p.E8,{config:{url:`${C.siteUrl}/${(0,c.Ed)(S.category)}/${S.slug}`,identifier:`/${(0,c.Ed)(S.category)}/${S.slug}`,title:_.title}}),a.createElement(s.A,{slug:_.slug,category:_.category,tags:_.tags}))};const f=e=>{var t;let{data:{allFile:l,markdownRemark:n,wpPost:r},location:o}=e;const d=(0,c.du)(n,r,l);return a.createElement(i.A,{title:d.title,description:d.excerpt,location:o,imagePath:d.gatsbyImage?null===(t=d.gatsbyImage.images.fallback)||void 0===t?void 0:t.src:null,post:d})},y=e=>{if(!e)return e;if("pre"===e.name){const t=(0,g.zd)(b(e));let l="";switch(typeof t){case"string":l=t;break;case"object":if(Array.isArray(t)){t.map((e=>{e.props&&e.props.children&&(l+=e.props.children)}))}else{const e=t;e.props&&e.props.children&&(l=e.props.children)}}return e.children.length>0&&a.createElement(E,{language:h(e)},l)}},E=e=>{let{language:t,children:l}=e;return a.createElement(u.A,{style:m.C7,language:t,showLineNumbers:!0},l)},h=e=>{var t,l;return e.attribs.class&&"wp-block-code"!==e.attribs.class?e.attribs.class.replace("language-",""):null!==(t=e.children[0])&&void 0!==t&&null!==(l=t.attribs)&&void 0!==l&&l.class?e.children[0].attribs.class.replace("language-",""):"java"},b=e=>e.children.length>0&&"code"===e.children[0].name?e.children[0].children:e.children,x=d.Ay.article`
  margin: 0 auto;
  background-color: #fff;

  .time {
    text-align: right;
  }

  .featuredImage {
    text-align: center;
  }
`,k=d.Ay.div`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`,w=d.Ay.nav`
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`,$=d.Ay.dl`
  display: flex;
  margin: 0;

  dt {
    width: 80px;
    font-weight: 700;
  }

  dd {
    font-size: 14px;
    margin-left: 0;
    padding-left: 0;

    & + dd {
      margin-left: 15px;
      margin-bottom: 5px;
    }

    a {
      text-decoration: none;
      border-radius: 3px;
      color: #fff;
      background: var(--orange);
      padding: 2px 5px;

      &:hover {
        opacity: 0.5;
      }
    }
  }
`}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-content-file-path-null-0d0c261c6ba90ee8bd5a.js.map
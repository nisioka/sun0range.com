"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[455],{8733:function(e,t,l){l.r(t),l.d(t,{Head:function(){return v}});var a=l(6540),n=l(4794),r=l(5776),i=l(1042),o=l(2532),d=l(7581),c=l(500),s=l(9531),u=l(7326),g=l(900),m=l(695),p=l(9849);t.default=e=>{var t,l,i,d,u,m,v,y;let{data:{allFile:E,markdownRemark:h,mdPrevious:$,mdNext:A,wpPost:I,wpPrevious:N,wpNext:P},location:L}=e;const j={id:(null==h?void 0:h.id)||(null==I?void 0:I.id),title:(null==h?void 0:h.frontmatter.title)||(null==I?void 0:I.title),content:(null==h?void 0:h.html)||(null==I?void 0:I.content),excerpt:(0,c.VE)((null==h?void 0:h.excerpt)||(null==I?void 0:I.excerpt)),slug:(null==h?void 0:h.fields.slug.replace(/^\//,"").replace(/\/$/,""))||"/"+(null==I?void 0:I.slug),date:(null==h?void 0:h.frontmatter.date)||(null==I?void 0:I.date),dateModified:(null==h?void 0:h.frontmatter.dateModified)||(null==I?void 0:I.modified),description:null==h?void 0:h.frontmatter.description,altText:(null==I||null===(t=I.featuredImage)||void 0===t?void 0:t.node.altText)||"",gatsbyImage:(null==I||null===(l=I.featuredImage)||void 0===l?void 0:l.node.gatsbyImage)||(0,o.c)(null===(i=E.edges[0])||void 0===i?void 0:i.node.childImageSharp),category:(null==h?void 0:h.frontmatter.category)||(null==I||null===(d=I.categories)||void 0===d||null===(u=d.nodes[0])||void 0===u?void 0:u.name),tags:(null==h?void 0:h.frontmatter.tags)||(null==I||null===(m=I.tags)||void 0===m?void 0:m.nodes.map((e=>e.name)))},C={id:(null==$?void 0:$.id)||(null==N?void 0:N.id),title:(null==$?void 0:$.frontmatter.title)||(null==N?void 0:N.title),slug:(null==$?void 0:$.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==N?void 0:N.slug),category:(null==$?void 0:$.frontmatter.category)||(null==N?void 0:N.categories.nodes[0].name)},_={id:(null==A?void 0:A.id)||(null==P?void 0:P.id),title:(null==A?void 0:A.frontmatter.title)||(null==P?void 0:P.title),slug:(null==A?void 0:A.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==P?void 0:P.slug),category:(null==A?void 0:A.frontmatter.category)||(null==P||null===(v=P.categories)||void 0===v||null===(y=v.nodes[0])||void 0===y?void 0:y.name)};return a.createElement(r.A,{location:L},a.createElement(b,{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},j.title),a.createElement("p",null,a.createElement("div",{className:"time"},a.createElement("small",null,a.createElement("time",null,j.date))))),a.createElement("div",{className:"featuredImage"},a.createElement(o.G,{image:j.gatsbyImage,alt:j.title})),a.createElement(w,null,a.createElement("dt",null,"カテゴリ"),a.createElement("dd",null,a.createElement(n.Link,{to:`/category/${(0,c.Ed)(j.category)}`},j.category))),a.createElement(w,null,a.createElement("dt",null,"タグ"),j.tags.map(((e,t)=>a.createElement("dd",{key:`tag${t}`},a.createElement(n.Link,{to:`/tag/${e}/`},e))))),a.createElement(x,null,a.createElement("section",{itemProp:"articleBody"},(0,g.Ay)(j.content,{replace:f}))),a.createElement("hr",null)),a.createElement(k,{className:"blog-post-nav"},a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.createElement("li",null,C.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(C.category)}/${C.slug}`,rel:"prev"},"← ",C.title)),a.createElement("li",null,_.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(_.category)}/${_.slug}`,rel:"next"},_.title," →")))),a.createElement(p.E8,{config:{url:`/${(0,c.Ed)(_.category)}/${_.slug}`,identifier:`/${(0,c.Ed)(_.category)}/${_.slug}`,title:j.title}}),a.createElement(s.A,{slug:j.slug,category:j.category,tags:j.tags}))};const v=e=>{var t;let{data:{allFile:l,markdownRemark:n,wpPost:r},location:o}=e;const d=(0,c.du)(n,r,l);return a.createElement(i.A,{title:d.title,description:d.excerpt,location:o,imagePath:d.gatsbyImage?null===(t=d.gatsbyImage.images.fallback)||void 0===t?void 0:t.src:null,post:d})},f=e=>{if(!e)return e;if("pre"===e.name){const t=(0,g.zd)(h(e));let l="";switch(typeof t){case"string":l=t;break;case"object":if(Array.isArray(t)){t.map((e=>{e.props&&e.props.children&&(l+=e.props.children)}))}else{const e=t;e.props&&e.props.children&&(l=e.props.children)}}return e.children.length>0&&a.createElement(y,{language:E(e)},l)}},y=e=>{let{language:t,children:l}=e;return a.createElement(u.A,{style:m.C7,language:t,showLineNumbers:!0},l)},E=e=>{var t,l;return e.attribs.class&&"wp-block-code"!==e.attribs.class?e.attribs.class.replace("language-",""):null!==(t=e.children[0])&&void 0!==t&&null!==(l=t.attribs)&&void 0!==l&&l.class?e.children[0].attribs.class.replace("language-",""):"java"},h=e=>e.children.length>0&&"code"===e.children[0].name?e.children[0].children:e.children,b=d.Ay.article`
  margin: 0 auto;
  background-color: #fff;

  .time {
    text-align: right;
  }

  .featuredImage {
    text-align: center;
  }
`,x=d.Ay.div`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`,k=d.Ay.nav`
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`,w=d.Ay.dl`
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
//# sourceMappingURL=component---src-templates-blog-post-tsx-046fe2e1a0044670e35f.js.map
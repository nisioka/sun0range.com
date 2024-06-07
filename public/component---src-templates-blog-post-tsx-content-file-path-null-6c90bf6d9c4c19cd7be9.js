"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[316],{8884:function(e,t,l){l.r(t),l.d(t,{Head:function(){return p}});var a=l(6540),n=l(4794),r=l(5776),i=l(1042),o=l(2532),d=l(7581),c=l(500),s=l(9531),u=l(7326),g=l(900),m=l(695);t.default=e=>{var t,l,i,d,u,m,p,f;let{data:{allFile:y,markdownRemark:E,mdPrevious:w,mdNext:A,wpPost:I,wpPrevious:$,wpNext:N},location:P}=e;const L={id:(null==E?void 0:E.id)||(null==I?void 0:I.id),title:(null==E?void 0:E.frontmatter.title)||(null==I?void 0:I.title),content:(null==E?void 0:E.html)||(null==I?void 0:I.content),excerpt:(0,c.VE)((null==E?void 0:E.excerpt)||(null==I?void 0:I.excerpt)),slug:(null==E?void 0:E.fields.slug.replace(/^\//,"").replace(/\/$/,""))||"/"+(null==I?void 0:I.slug),date:(null==E?void 0:E.frontmatter.date)||(null==I?void 0:I.date),dateModified:(null==E?void 0:E.frontmatter.dateModified)||(null==I?void 0:I.modified),description:null==E?void 0:E.frontmatter.description,altText:(null==I||null===(t=I.featuredImage)||void 0===t?void 0:t.node.altText)||"",gatsbyImage:(null==I||null===(l=I.featuredImage)||void 0===l?void 0:l.node.gatsbyImage)||(0,o.c)(null===(i=y.edges[0])||void 0===i?void 0:i.node.childImageSharp),category:(null==E?void 0:E.frontmatter.category)||(null==I||null===(d=I.categories)||void 0===d||null===(u=d.nodes[0])||void 0===u?void 0:u.name),tags:(null==E?void 0:E.frontmatter.tags)||(null==I||null===(m=I.tags)||void 0===m?void 0:m.nodes.map((e=>e.name)))},j={id:(null==w?void 0:w.id)||(null==$?void 0:$.id),title:(null==w?void 0:w.frontmatter.title)||(null==$?void 0:$.title),slug:(null==w?void 0:w.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==$?void 0:$.slug),category:(null==w?void 0:w.frontmatter.category)||(null==$?void 0:$.categories.nodes[0].name)},C={id:(null==A?void 0:A.id)||(null==N?void 0:N.id),title:(null==A?void 0:A.frontmatter.title)||(null==N?void 0:N.title),slug:(null==A?void 0:A.fields.slug.replace(/^\//,"").replace(/\/$/,""))||(null==N?void 0:N.slug),category:(null==A?void 0:A.frontmatter.category)||(null==N||null===(p=N.categories)||void 0===p||null===(f=p.nodes[0])||void 0===f?void 0:f.name)};return a.createElement(r.A,{location:P},a.createElement(h,{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},L.title),a.createElement("p",null,a.createElement("div",{className:"time"},a.createElement("small",null,a.createElement("time",null,L.date))))),a.createElement("div",{className:"featuredImage"},a.createElement(o.G,{image:L.gatsbyImage,alt:L.title})),a.createElement(k,null,a.createElement("dt",null,"カテゴリ"),a.createElement("dd",null,a.createElement(n.Link,{to:`/category/${(0,c.Ed)(L.category)}`},L.category))),a.createElement(k,null,a.createElement("dt",null,"タグ"),L.tags.map(((e,t)=>a.createElement("dd",{key:`tag${t}`},a.createElement(n.Link,{to:`/tag/${e}/`},e))))),a.createElement(b,null,a.createElement("section",{itemProp:"articleBody"},(0,g.Ay)(L.content,{replace:v}))),a.createElement("hr",null),a.createElement("footer",null)),a.createElement(x,{className:"blog-post-nav"},a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.createElement("li",null,j.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(j.category)}/${j.slug}`,rel:"prev"},"← ",j.title)),a.createElement("li",null,C.slug&&a.createElement(n.Link,{to:`/${(0,c.Ed)(C.category)}/${C.slug}`,rel:"next"},C.title," →")))),a.createElement(s.A,{slug:L.slug,category:L.category,tags:L.tags}))};const p=e=>{var t;let{data:{allFile:l,markdownRemark:n,wpPost:r},location:o}=e;const d=(0,c.du)(n,r,l);return a.createElement(i.A,{title:d.title,description:d.excerpt,location:o,imagePath:d.gatsbyImage?null===(t=d.gatsbyImage.images.fallback)||void 0===t?void 0:t.src:null,post:d})},v=e=>{if(!e)return e;if("pre"===e.name){const t=(0,g.zd)(E(e));let l="";switch(typeof t){case"string":l=t;break;case"object":if(Array.isArray(t)){t.map((e=>{e.props&&e.props.children&&(l+=e.props.children)}))}else{const e=t;e.props&&e.props.children&&(l=e.props.children)}}return e.children.length>0&&a.createElement(f,{language:y(e)},l)}},f=e=>{let{language:t,children:l}=e;return a.createElement(u.A,{style:m.C7,language:t,showLineNumbers:!0},l)},y=e=>{var t,l;return e.attribs.class&&"wp-block-code"!==e.attribs.class?e.attribs.class.replace("language-",""):null!==(t=e.children[0])&&void 0!==t&&null!==(l=t.attribs)&&void 0!==l&&l.class?e.children[0].attribs.class.replace("language-",""):"java"},E=e=>e.children.length>0&&"code"===e.children[0].name?e.children[0].children:e.children,h=d.Ay.article`
  margin: 0 auto;
  background-color: #fff;

  .time {
    text-align: right;
  }

  .featuredImage {
    text-align: center;
  }
`,b=d.Ay.div`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`,x=d.Ay.nav`
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`,k=d.Ay.dl`
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
//# sourceMappingURL=component---src-templates-blog-post-tsx-content-file-path-null-6c90bf6d9c4c19cd7be9.js.map
"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[245],{7449:function(e,n,t){var a,l=t(5276),r=t(4794),i=t(6540),o=t(4715);n.A=e=>{let n,t,a,l,{maxPage:o,current:m,type:s=""}=e;return n=1===m?i.createElement("li",{className:"not-work",key:"pagination0"},i.createElement("span",null,"最新")):i.createElement("li",{key:"pagination0"},i.createElement(r.Link,{to:"/"+s+(s?"/":"")},"最新")),t=1===m?i.createElement("li",{className:"not-work",key:"pagination1"},i.createElement("span",null,"前へ")):2===m?i.createElement("li",{key:"pagination1"},i.createElement(r.Link,{to:"/"+s+(s?"/":"")},"前へ")):i.createElement("li",{key:"pagination1"},i.createElement(r.Link,{to:"/"+s+(s?"/":"")+"page/"+(m-1)+"/"},"前へ")),a=m===o?i.createElement("li",{className:"not-work",key:"pagination3"},i.createElement("span",null,"次へ")):i.createElement("li",{key:"pagination3"},i.createElement(r.Link,{to:"/"+s+(s?"/":"")+"page/"+(m+1)+"/"},"次へ")),l=m===o?i.createElement("li",{className:"not-work",key:"paginatio4"},i.createElement("span",null,"最後")):i.createElement("li",{key:"pagination4"},i.createElement(r.Link,{to:"/"+s+(s?"/":"")+"page/"+o+"/"},"最後")),o>1?i.createElement(c,null,i.createElement("ul",null,n,t,i.createElement("li",{key:"pagination2"},"page ",m,"/",o),a,l)):i.createElement(i.Fragment,null)};const c=o.Ay.nav(a||(a=(0,l.A)(["\n  ul {\n    display: flex;\n    list-style: none;\n    justify-content: center;\n\n    li {\n      padding: 0 10px;\n\n      &.not-work span {\n        text-decoration: none;\n        background: var(--orange);\n        color: #fff;\n        opacity: 0.5;\n      }\n\n      span, a {\n        text-decoration: underline;\n        display: flex;\n        align-items: center;\n        font-weight: 700;\n        color: var(--orange);\n        border-radius: 5px;\n        border: 1px solid var(--orange);\n        padding: 0 10px;\n      }\n    }\n  }\n"])))},2783:function(e,n,t){t.r(n),t.d(n,{Head:function(){return d}});var a=t(6540),l=t(4794),r=t(1911),i=t(1042),o=t(2532),c=t(500),m=t(1877),s=t(7449);n.default=e=>{let{data:n,location:t}=e;const i=(0,c.A)(n.allMdx,n.allWpPost,n.allFile);if(0===i.length)return a.createElement(r.A,{location:t},a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'));const d=Math.ceil(i.length/12);return a.createElement(r.A,{location:t},a.createElement(m.N,null,i.slice(0,12).map((e=>a.createElement("li",{key:e.slug},a.createElement("article",{className:"post-list-item",itemType:"https://schema.org/Article"},a.createElement(l.Link,{to:e.slug,itemProp:"url"},a.createElement("h2",null,a.createElement("span",{itemProp:"headline"},e.title)),a.createElement("section",null,a.createElement("div",{style:{textAlign:"right"}},a.createElement("small",null,a.createElement("time",null,e.date))),a.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||a.createElement(o.G,{alt:e.altText,image:e.gatsbyImage})),a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt},itemProp:"description"})))))))),a.createElement(s.A,{maxPage:d,current:1}))};const d=()=>a.createElement(i.A,{title:"All posts"})},1877:function(e,n,t){t.d(n,{N:function(){return c},y:function(){return o}});var a,l,r=t(5276),i=t(4715);const o=i.Ay.header(a||(a=(0,r.A)(["\n  text-align: center;\n\n  h1 {\n    &:after {\n      margin: 0 auto;\n      content: '';\n      display: block;\n      width: 98%;\n      height: 3px;\n      background: var(--orange);\n    }\n  }\n"]))),c=i.Ay.ol(l||(l=(0,r.A)(["\n  column-count: 1;\n  list-style: none;\n  padding: 0;\n  margin: 0 -15px;\n  display: flex;\n  flex-wrap: wrap;\n  width: var(--maxWidth-full);\n\n  li {\n    padding: 5px;\n    margin: var(--spacing-1) ;\n    box-sizing: border-box;\n    border: 1px solid var(--black);\n    border-radius: 5px;\n\n    a {\n      color: var(--black);\n      text-decoration: none;\n    }\n\n    h2 {\n      font-size: var(--fontSize-2);\n    }\n  }\n  .thumbnail {\n    float: left;\n  }\n\n  @media screen and (min-width: 512px) {\n    column-count: 2;\n\n    li {\n      padding: 15px;\n      width: 48%;\n\n      h2 {\n        font-size: var(--fontSize-3);\n      }\n\n      a {\n        &:hover h2 {\n          text-decoration: underline;\n        }\n      }\n    }\n  }\n  @media screen and (min-width: 768px) {\n    column-count: 3;\n\n    li {\n      width: 32%;\n    }\n  }\n"])))},500:function(e,n,t){var a=t(2532);n.A=function(e,n,t){let l={};t&&t.edges.forEach((e=>{l[e.node.relativePath]=e.node.childImageSharp.gatsbyImageData}));const r=e.nodes,i=n.nodes;return r.map((e=>({title:e.frontmatter.title,excerpt:e.excerpt,slug:e.fields.slug,date:e.frontmatter.date,description:e.frontmatter.description,altText:e.frontmatter.featuredImagePath,gatsbyImage:(0,a.c)(l[e.frontmatter.featuredImagePath||"featured/defaultThumbnail.png"])}))).concat(i.map((e=>{var n,t;return{title:e.title,excerpt:e.excerpt,slug:"/"+e.slug,date:e.date,altText:(null===(n=e.featuredImage)||void 0===n?void 0:n.node.altText)||"",gatsbyImage:(null===(t=e.featuredImage)||void 0===t?void 0:t.node.gatsbyImage)||(0,a.c)(l["featured/defaultThumbnail.png"])}}))).sort(((e,n)=>new Date(n.date).getTime()-new Date(e.date).getTime()))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-b83dfd970018bfe07ea1.js.map
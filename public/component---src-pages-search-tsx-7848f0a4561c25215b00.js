"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[911],{8991:function(e,t,a){a.r(t);var l=a(6540),n=a(4794),r=a(5776),i=a(500),o=a(1877),c=a(2532);t.default=e=>{let{data:t,location:a}=e;const s=(0,i.u5)(t.allMarkdownRemark,t.allWpPost,t.allFile);function u(e){return s.filter((t=>{for(const l of e){var a;if(!(t.title.toLowerCase().includes(l)||null!==(a=t.description)&&void 0!==a&&a.toLowerCase().includes(l)))return!1}return!0}))}const d=decodeURI(a.href.split("?q=")[1]||"").toLowerCase(),{0:m,1:p}=(0,l.useState)({filteredData:u(d.split(/\s+/)),query:d}),{filteredData:h,query:f}=m;return(0,l.useEffect)((()=>{const e=new URLSearchParams;f?e.append("q",f):e.delete("q"),window.history.replaceState("","",a.href.split("?")[0]+(e.size>0?"?"+e.toString():""))}),[m.query]),l.createElement(r.A,{location:a},l.createElement("input",{type:"text","aria-label":"Search",placeholder:"検索ワードを入力...",onChange:function(e){const t=e.target.value.toLowerCase().split(/\s+/);p({filteredData:u(t),query:t.join(" ")})},value:f}),l.createElement("div",{className:"result-inner__res"},""!==f?f+" の検索結果: "+h.length+"件":h.length+"件の記事があります"),l.createElement(o.yH,null,l.createElement("h1",null,"サイト内検索"),l.createElement("p",null,h.length," 記事あります")),l.createElement(o.N1,null,h.map((e=>l.createElement("li",{key:e.slug},l.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},l.createElement(n.Link,{to:`/${(0,i.Ed)(e.category)}/${e.slug}`},l.createElement("h2",null,l.createElement("span",null,e.title)),l.createElement("section",null,l.createElement("div",null,l.createElement("small",null,l.createElement("time",null,e.date))),l.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||l.createElement(c.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),l.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))))}},1877:function(e,t,a){a.d(t,{N1:function(){return r},yH:function(){return n}});var l=a(7581);const n=l.Ay.header`
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
`,r=l.Ay.ol`
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
`;l.Ay.div`
  background-color: #fff;
`}}]);
//# sourceMappingURL=component---src-pages-search-tsx-7848f0a4561c25215b00.js.map
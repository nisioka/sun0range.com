"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[911],{6643:function(e,t,a){a.r(t);var l=a(758),n=a(107),r=a(8676),i=a(1608),o=a(9817),c=a(6285);t.default=e=>{var t;let{data:a,location:s}=e;const u=(0,i.u5)(a.allMarkdownRemark,a.allWpPost,a.allFile),d=decodeURI((null===(t=s.href)||void 0===t?void 0:t.split("?q=")[1])||"").toLowerCase(),{0:m,1:p}=(0,l.useState)({filteredData:h(d.split(/\s+/)),query:d});function h(e){return u.filter((t=>{for(const l of e){var a;if(!(t.title.toLowerCase().includes(l)||null!==(a=t.description)&&void 0!==a&&a.toLowerCase().includes(l)))return!1}return!0}))}const{filteredData:f,query:g}=m;return(0,l.useEffect)((()=>{const e=new URLSearchParams;g?e.append("q",g):e.delete("q"),window.history.replaceState("","",s.href.split("?")[0]+(e.size>0?"?"+e.toString():""))}),[m.query]),l.createElement(r.A,{location:s},l.createElement("input",{type:"text","aria-label":"Search",placeholder:"検索ワードを入力...",onChange:function(e){const t=e.target.value.toLowerCase().split(/\s+/);p((e=>({...e,filteredData:h(t),query:t.join(" ")})))},value:g}),l.createElement("div",{className:"result-inner__res"},""!==g?g+" の検索結果: "+f.length+"件":f.length+"件の記事があります"),l.createElement(o.yH,null,l.createElement("h1",null,"サイト内検索"),l.createElement("p",null,f.length," 記事あります")),l.createElement(o.N1,null,f.map((e=>l.createElement("li",{key:e.slug},l.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},l.createElement(n.Link,{to:`/${(0,i.Ed)(e.category)}/${e.slug}`},l.createElement("h2",null,l.createElement("span",null,e.title)),l.createElement("section",null,l.createElement("div",null,l.createElement("small",null,l.createElement("time",null,e.date))),l.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||l.createElement(c.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),l.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))))}},9817:function(e,t,a){a.d(t,{N1:function(){return r},yH:function(){return n}});var l=a(5910);const n=l.Ay.header`
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
//# sourceMappingURL=component---src-pages-search-tsx-114b7623b2a898acad61.js.map
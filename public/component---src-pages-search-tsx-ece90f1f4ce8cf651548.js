"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[911],{8991:function(e,t,l){l.r(t);var a=l(6540),n=l(4794),r=l(2080),c=l(500),s=l(1877),i=l(2532);t.default=e=>{let{data:t,location:l}=e;const u=(0,c.u5)(t.allMdx,t.allWpPost,t.allFile),{0:m,1:o}=(0,a.useState)({filteredData:[],query:""});const{filteredData:E,query:g}=m;return a.createElement(r.A,{location:l},a.createElement("input",{type:"text","aria-label":"Search",placeholder:"検索ワードを入力...",onChange:function(e){const t=e.target.value.toLowerCase().split(/\s+/),l=u.filter((e=>{for(const a of t){var l;if(!(e.title.toLowerCase().includes(a)||null!==(l=e.description)&&void 0!==l&&l.toLowerCase().includes(a)))return!1}return!0}));o({filteredData:l,query:t.join(" ")})}}),a.createElement("div",{className:"result-inner__res"},""!==g?g+" の検索結果: "+E.length+"件":E.length+"件の記事があります"),a.createElement(s.yH,null,a.createElement("h1",null,"サイト内検索"),a.createElement("p",null,u.length," 記事あります")),a.createElement(s.N1,null,E.map((e=>a.createElement("li",{key:e.slug},a.createElement("article",{className:"post-list-item",itemType:"http://schema.org/Article"},a.createElement(n.Link,{to:"/"+(0,c.Ed)(e.category)+"/"+e.slug},a.createElement("h2",null,a.createElement("span",null,e.title)),a.createElement("section",null,a.createElement("div",null,a.createElement("small",null,a.createElement("time",null,e.date))),a.createElement("div",{className:"thumbnail"},void 0===e.gatsbyImage||a.createElement(i.G,{alt:e.altText,image:e.gatsbyImage,className:"thumbnail"})),a.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt}})))))))))}}}]);
//# sourceMappingURL=component---src-pages-search-tsx-ece90f1f4ce8cf651548.js.map
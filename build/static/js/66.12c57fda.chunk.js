(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[66],{697:function(e,t,n){"use strict";var i=n(5),a=n(0),l=n(123),c=n(639),o=n(826),r=n(827),d=n(641),s=n(19),u=n(35),j=n(2),b=function(e){var t=e.children,n=e.background,l=e.className,c=e.overlap,o=e.navType,r=Object(a.useState)(0),d=Object(i.a)(r,2),s=d[0],b=d[1],v=Object(a.useRef)(null);Object(a.useEffect)((function(){if(o===u.d){var e=window.innerWidth,t=v.current.offsetWidth;b((e-t)/2)}}),[o]);return Object(j.jsx)("div",{ref:v,className:"page-header-alt ".concat(l||""," ").concat(c&&"overlap"),style:function(){var e={backgroundImage:n?"url(".concat(n,")"):"none"};return o===u.d&&(e.marginRight=-s,e.marginLeft=-s,e.paddingLeft=0,e.paddingRight=0),e}(),children:o===u.d?Object(j.jsx)("div",{className:"container",children:t}):Object(j.jsx)(j.Fragment,{children:t})})},v=(Object(s.b)((function(e){return{navType:e.theme.navType}}),{})(b),n(38)),m=n(114),p=n(698);function h(e){var t=e.thumbnail,n=e.containerType,s=e.name,u=e.positionName,h=e.loading,O=e.size,x=e.extra,f=e.lookup,g=e.description,y=Object(a.useState)((function(){return"cyan"})),N=Object(i.a)(y,2),k=N[0];N[1];function w(){var n,i;return Object(j.jsxs)(l.a,{className:"py-2",mobileFlex:!1,justifyContent:"between",alignItems:"center",children:[Object(j.jsxs)(l.a,{className:null!==f&&void 0!==f&&f.thumbnail?"py-2":"py-4",mobileFlex:!1,justifyContent:"start",alignItems:"center",children:[(null===f||void 0===f?void 0:f.thumbnail)&&Object(j.jsx)("div",{className:["mk-w-[80px] mk-h-[80px] mk-rounded-full mk-overflow-hidden mk-flex mk-items-center mk-justify-center",t?"":"mk-bg-cyan-500"].join(" "),children:Object(j.jsx)(c.a,{loading:h,style:{background:"transparent"},size:null!==O&&void 0!==O?O:50,src:t?Object(j.jsx)(o.a,{preview:null!==(n=null===e||void 0===e?void 0:e.isPreview)&&void 0!==n&&n,width:null!==O&&void 0!==O?O:50,height:null!==O&&void 0!==O?O:50,style:{objectFit:"cover"},fallback:v.c.defaultImage,src:t}):null,children:t?null:v.c.getNameInitial(null!==s&&void 0!==s?s:"-")})}),Object(j.jsxs)("div",{className:null!==f&&void 0!==f&&f.thumbnail?"mx-4":"",children:[Object(j.jsx)(r.a.Title,{level:3,style:{lineHeight:1},className:"m-0 mb-2",children:s}),"boolean"!==typeof g&&""!==g&&null!==g&&Object(j.jsx)("div",{className:"mb-2",children:Object(j.jsx)(r.a.Text,{children:g})}),(null===f||void 0===f?void 0:f.positionName)&&(u&&"string"===typeof u?Object(j.jsx)(d.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:k,children:null!==u&&void 0!==u?u:"-"}):Array.isArray(u)&&u.length>0?Object(j.jsx)(l.a,{alignItems:"center",children:u.map((function(t,n){var i;return"string"===typeof t?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(d.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:k,children:null!==t&&void 0!==t?t:"-"}),n<u.length-1&&Object(j.jsx)("div",{style:{width:"7px",height:"7px",borderRadius:"4px",margin:"0 10px 0 -2px",background:"#939393",opacity:.5}})]}):""}))}):null)]})]}),x&&x]})}return Object(j.jsx)(b,{className:"border-bottom",overlap:!0,children:function(e){switch(e){case"antd":case"primary":return Object(j.jsx)(p.a,{children:Object(j.jsx)(w,{})});default:return Object(j.jsx)(m.a,{children:Object(j.jsx)(w,{})})}}(n)})}h.defaultProps={containerType:"tailwind",lookup:{thumbnail:!0,positionName:!0},description:!1,name:null,positionName:null,loading:null,extra:null};t.a=h},698:function(e,t,n){"use strict";n(0);var i=n(2);t.a=function(e){return Object(i.jsx)("div",{className:"".concat(["mk-mx-auto mk-max-w-screen-xl",null===e||void 0===e?void 0:e.className].join(" ")),children:e.children})}},843:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),l=n(19),c=n(697),o=n(114),r=n(9),d=n(1),s=n(5),u=n(663),j=n(640),b=n(656),v=n(57),m=n(53),p=n(2);var h=Object(l.b)((function(e){return{}}))((function(e){var t=Object(i.useState)([]),n=Object(s.a)(t,2),a=n[0],l=n[1],c=Object(i.useState)(!1),o=Object(s.a)(c,2),h=o[0],O=o[1],x=Object(i.useState)({page:1,limit:10,total_items:0}),f=Object(s.a)(x,2),g=f[0],y=f[1],N=Object(i.useState)({page:1,limit:10}),k=Object(s.a)(N,2),w=k[0];k[1],Object(i.useEffect)((function(){O(!0),new v.a({url:"/api/v1/audio/language",config:{params:Object(d.a)({},w)}}).get().then((function(e){l(Object(r.a)(null===e||void 0===e?void 0:e.data)),y(Object(d.a)(Object(d.a)(Object(d.a)({},g),null===e||void 0===e?void 0:e.pagination),null===e||void 0===e?void 0:e.paginate)),O(!1)})).catch((function(e){O(!1),l([])}))}),[w]);var I=[{dataIndex:"id",title:"No",render:function(e,t,n){return n+1}},{dataIndex:"identifier",title:"Slug"},{dataIndex:["data","name"],title:"Display Name",render:function(e,t){var n,i,a,l;return Object(p.jsx)(u.a,{color:null!==(n=null===t||void 0===t||null===(i=t.data)||void 0===i?void 0:i.color)&&void 0!==n?n:m.d,text:null!==(a=null!==e&&void 0!==e?e:null===t||void 0===t||null===(l=t.data)||void 0===l?void 0:l.display_name)&&void 0!==a?a:"-"})}},{dataIndex:"type",title:"Type"}];return Object(p.jsx)(j.a,{bordered:!1,children:Object(p.jsx)(b.a,{columns:null!==I&&void 0!==I?I:[],loading:null!==h&&void 0!==h&&h,dataSource:null!==a&&void 0!==a?a:[]})})}));function O(e){return Object(p.jsxs)(a.a.Fragment,{children:[Object(p.jsx)(c.a,{name:"Overview",positionName:["Master Data","Master Audio","Language"],thumbnail:null}),Object(p.jsx)("div",{style:{marginTop:90},children:Object(p.jsx)(o.a,{children:Object(p.jsx)(h,{})})})]})}O.defaultProps={};t.default=Object(l.b)((function(e){return{list:e.MasterData.thin_client.list}}),{})(a.a.memo(O))}}]);
//# sourceMappingURL=66.12c57fda.chunk.js.map
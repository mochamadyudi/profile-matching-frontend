(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[67],{697:function(e,t,n){"use strict";var i=n(5),a=n(0),l=n(123),c=n(639),r=n(826),o=n(827),s=n(641),d=n(19),u=n(35),j=n(2),b=function(e){var t=e.children,n=e.background,l=e.className,c=e.overlap,r=e.navType,o=Object(a.useState)(0),s=Object(i.a)(o,2),d=s[0],b=s[1],m=Object(a.useRef)(null);Object(a.useEffect)((function(){if(r===u.d){var e=window.innerWidth,t=m.current.offsetWidth;b((e-t)/2)}}),[r]);return Object(j.jsx)("div",{ref:m,className:"page-header-alt ".concat(l||""," ").concat(c&&"overlap"),style:function(){var e={backgroundImage:n?"url(".concat(n,")"):"none"};return r===u.d&&(e.marginRight=-d,e.marginLeft=-d,e.paddingLeft=0,e.paddingRight=0),e}(),children:r===u.d?Object(j.jsx)("div",{className:"container",children:t}):Object(j.jsx)(j.Fragment,{children:t})})},m=(Object(d.b)((function(e){return{navType:e.theme.navType}}),{})(b),n(38)),v=n(114),p=n(698);function h(e){var t=e.thumbnail,n=e.containerType,d=e.name,u=e.positionName,h=e.loading,O=e.size,x=e.extra,f=e.lookup,g=e.description,y=Object(a.useState)((function(){return"cyan"})),N=Object(i.a)(y,2),k=N[0];N[1];function w(){var n,i;return Object(j.jsxs)(l.a,{className:"py-2",mobileFlex:!1,justifyContent:"between",alignItems:"center",children:[Object(j.jsxs)(l.a,{className:null!==f&&void 0!==f&&f.thumbnail?"py-2":"py-4",mobileFlex:!1,justifyContent:"start",alignItems:"center",children:[(null===f||void 0===f?void 0:f.thumbnail)&&Object(j.jsx)("div",{className:["mk-w-[80px] mk-h-[80px] mk-rounded-full mk-overflow-hidden mk-flex mk-items-center mk-justify-center",t?"":"mk-bg-cyan-500"].join(" "),children:Object(j.jsx)(c.a,{loading:h,style:{background:"transparent"},size:null!==O&&void 0!==O?O:50,src:t?Object(j.jsx)(r.a,{preview:null!==(n=null===e||void 0===e?void 0:e.isPreview)&&void 0!==n&&n,width:null!==O&&void 0!==O?O:50,height:null!==O&&void 0!==O?O:50,style:{objectFit:"cover"},fallback:m.c.defaultImage,src:t}):null,children:t?null:m.c.getNameInitial(null!==d&&void 0!==d?d:"-")})}),Object(j.jsxs)("div",{className:null!==f&&void 0!==f&&f.thumbnail?"mx-4":"",children:[Object(j.jsx)(o.a.Title,{level:3,style:{lineHeight:1},className:"m-0 mb-2",children:d}),"boolean"!==typeof g&&""!==g&&null!==g&&Object(j.jsx)("div",{className:"mb-2",children:Object(j.jsx)(o.a.Text,{children:g})}),(null===f||void 0===f?void 0:f.positionName)&&(u&&"string"===typeof u?Object(j.jsx)(s.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:k,children:null!==u&&void 0!==u?u:"-"}):Array.isArray(u)&&u.length>0?Object(j.jsx)(l.a,{alignItems:"center",children:u.map((function(t,n){var i;return"string"===typeof t?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(s.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:k,children:null!==t&&void 0!==t?t:"-"}),n<u.length-1&&Object(j.jsx)("div",{style:{width:"7px",height:"7px",borderRadius:"4px",margin:"0 10px 0 -2px",background:"#939393",opacity:.5}})]}):""}))}):null)]})]}),x&&x]})}return Object(j.jsx)(b,{className:"border-bottom",overlap:!0,children:function(e){switch(e){case"antd":case"primary":return Object(j.jsx)(p.a,{children:Object(j.jsx)(w,{})});default:return Object(j.jsx)(v.a,{children:Object(j.jsx)(w,{})})}}(n)})}h.defaultProps={containerType:"tailwind",lookup:{thumbnail:!0,positionName:!0},description:!1,name:null,positionName:null,loading:null,extra:null};t.a=h},698:function(e,t,n){"use strict";n(0);var i=n(2);t.a=function(e){return Object(i.jsx)("div",{className:"".concat(["mk-mx-auto mk-max-w-screen-xl",null===e||void 0===e?void 0:e.className].join(" ")),children:e.children})}},842:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),l=n(19),c=n(697),r=n(114),o=n(9),s=n(1),d=n(5),u=n(663),j=n(640),b=n(656),m=n(57),v=n(2);var p=Object(l.b)((function(e){return{}}))((function(e){var t=Object(i.useState)([]),n=Object(d.a)(t,2),a=n[0],l=n[1],c=Object(i.useState)(!1),r=Object(d.a)(c,2),p=r[0],h=r[1],O=Object(i.useState)({page:1,limit:10,total_items:0}),x=Object(d.a)(O,2),f=x[0],g=x[1],y=Object(i.useState)({page:1,limit:10}),N=Object(d.a)(y,2),k=N[0];N[1],Object(i.useEffect)((function(){h(!0),new m.a({url:"/api/v1/audio/type",config:{params:Object(s.a)({},k)}}).get().then((function(e){l(Object(o.a)(null===e||void 0===e?void 0:e.data)),g(Object(s.a)(Object(s.a)(Object(s.a)({},f),null===e||void 0===e?void 0:e.pagination),null===e||void 0===e?void 0:e.paginate)),h(!1)})).catch((function(e){h(!1),l([])}))}),[k]);var w=[{dataIndex:"id",title:"No",render:function(e,t,n){return n+1}},{dataIndex:"identifier",title:"Slug"},{dataIndex:["data","name"],title:"Display Name",render:function(e,t,n){var i,a;return Object(v.jsx)(u.a,{color:null!==(i=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.color)&&void 0!==i?i:"#bdbdbd",text:e})}},{dataIndex:"type",title:"Type"}];return Object(v.jsx)(j.a,{bordered:!1,children:Object(v.jsx)(b.a,{columns:null!==w&&void 0!==w?w:[],loading:null!==p&&void 0!==p&&p,dataSource:null!==a&&void 0!==a?a:[]})})}));function h(e){return Object(v.jsxs)(a.a.Fragment,{children:[Object(v.jsx)(c.a,{name:"Overview",positionName:["Master Data","Master Audio","Type"],thumbnail:null}),Object(v.jsx)("div",{style:{marginTop:90},children:Object(v.jsx)(r.a,{children:Object(v.jsx)(p,{})})})]})}h.defaultProps={};t.default=Object(l.b)((function(e){return{list:e.MasterData.thin_client.list}}),{})(a.a.memo(h))}}]);
//# sourceMappingURL=67.6e3849da.chunk.js.map
(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[47],{697:function(e,n,i){"use strict";var t=i(5),l=i(0),a=i(123),c=i(639),o=i(826),r=i(827),s=i(641),d=i(19),u=i(35),b=i(2),j=function(e){var n=e.children,i=e.background,a=e.className,c=e.overlap,o=e.navType,r=Object(l.useState)(0),s=Object(t.a)(r,2),d=s[0],j=s[1],v=Object(l.useRef)(null);Object(l.useEffect)((function(){if(o===u.d){var e=window.innerWidth,n=v.current.offsetWidth;j((e-n)/2)}}),[o]);return Object(b.jsx)("div",{ref:v,className:"page-header-alt ".concat(a||""," ").concat(c&&"overlap"),style:function(){var e={backgroundImage:i?"url(".concat(i,")"):"none"};return o===u.d&&(e.marginRight=-d,e.marginLeft=-d,e.paddingLeft=0,e.paddingRight=0),e}(),children:o===u.d?Object(b.jsx)("div",{className:"container",children:n}):Object(b.jsx)(b.Fragment,{children:n})})},v=(Object(d.b)((function(e){return{navType:e.theme.navType}}),{})(j),i(38)),m=i(114),h=i(698);function p(e){var n=e.thumbnail,i=e.containerType,d=e.name,u=e.positionName,p=e.loading,f=e.size,g=e.extra,O=e.lookup,x=e.description,y=Object(l.useState)((function(){return"cyan"})),k=Object(t.a)(y,2),w=k[0];k[1];function N(){var i,t;return Object(b.jsxs)(a.a,{className:"py-2",mobileFlex:!1,justifyContent:"between",alignItems:"center",children:[Object(b.jsxs)(a.a,{className:null!==O&&void 0!==O&&O.thumbnail?"py-2":"py-4",mobileFlex:!1,justifyContent:"start",alignItems:"center",children:[(null===O||void 0===O?void 0:O.thumbnail)&&Object(b.jsx)("div",{className:["mk-w-[80px] mk-h-[80px] mk-rounded-full mk-overflow-hidden mk-flex mk-items-center mk-justify-center",n?"":"mk-bg-cyan-500"].join(" "),children:Object(b.jsx)(c.a,{loading:p,style:{background:"transparent"},size:null!==f&&void 0!==f?f:50,src:n?Object(b.jsx)(o.a,{preview:null!==(i=null===e||void 0===e?void 0:e.isPreview)&&void 0!==i&&i,width:null!==f&&void 0!==f?f:50,height:null!==f&&void 0!==f?f:50,style:{objectFit:"cover"},fallback:v.c.defaultImage,src:n}):null,children:n?null:v.c.getNameInitial(null!==d&&void 0!==d?d:"-")})}),Object(b.jsxs)("div",{className:null!==O&&void 0!==O&&O.thumbnail?"mx-4":"",children:[Object(b.jsx)(r.a.Title,{level:3,style:{lineHeight:1},className:"m-0 mb-2",children:d}),"boolean"!==typeof x&&""!==x&&null!==x&&Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)(r.a.Text,{children:x})}),(null===O||void 0===O?void 0:O.positionName)&&(u&&"string"===typeof u?Object(b.jsx)(s.a,{color:null!==(t=null===e||void 0===e?void 0:e.positionColor)&&void 0!==t?t:w,children:null!==u&&void 0!==u?u:"-"}):Array.isArray(u)&&u.length>0?Object(b.jsx)(a.a,{alignItems:"center",children:u.map((function(n,i){var t;return"string"===typeof n?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(s.a,{color:null!==(t=null===e||void 0===e?void 0:e.positionColor)&&void 0!==t?t:w,children:null!==n&&void 0!==n?n:"-"}),i<u.length-1&&Object(b.jsx)("div",{style:{width:"7px",height:"7px",borderRadius:"4px",margin:"0 10px 0 -2px",background:"#939393",opacity:.5}})]}):""}))}):null)]})]}),g&&g]})}return Object(b.jsx)(j,{className:"border-bottom",overlap:!0,children:function(e){switch(e){case"antd":case"primary":return Object(b.jsx)(h.a,{children:Object(b.jsx)(N,{})});default:return Object(b.jsx)(m.a,{children:Object(b.jsx)(N,{})})}}(i)})}p.defaultProps={containerType:"tailwind",lookup:{thumbnail:!0,positionName:!0},description:!1,name:null,positionName:null,loading:null,extra:null};n.a=p},698:function(e,n,i){"use strict";i(0);var t=i(2);n.a=function(e){return Object(t.jsx)("div",{className:"".concat(["mk-mx-auto mk-max-w-screen-xl",null===e||void 0===e?void 0:e.className].join(" ")),children:e.children})}},699:function(e,n,i){"use strict";var t=i(1),l=i(0),a=i.n(l),c=i(19),o=i(700),r=i(89),s=i(409),d=i(2);function u(e){var n,i=e.visible,l=e.config;return i?Object(d.jsx)(r.a,Object(t.a)(Object(t.a)({},l),{},{className:"btn-master",children:null!==(n=null===e||void 0===e?void 0:e.children)&&void 0!==n?n:null})):null}function b(e){var n,i,l,a=e.theme,c=e.config;switch(null===a||void 0===a?void 0:a.type){case"visible":return Object(d.jsx)(u,{visible:!0,config:Object(t.a)({},c),children:null!==(n=null===e||void 0===e?void 0:e.children)&&void 0!==n?n:null});case"disabled":return Object(d.jsx)(u,{visible:!0,config:Object(t.a)(Object(t.a)({},c),{},{disabled:!0}),children:null!==(i=null===e||void 0===e?void 0:e.children)&&void 0!==i?i:null});case"notification":return Object(d.jsx)(u,{visible:!0,config:Object(t.a)(Object(t.a)({},c),{},{onClick:function(){var n,i,t,l,a,c,o,r,d;s.a.open({message:null!==(n=null===e||void 0===e||null===(i=e.theme)||void 0===i||null===(t=i.property)||void 0===t?void 0:t.message)&&void 0!==n?n:"Access Denied",description:null!==(l=null===e||void 0===e||null===(a=e.theme)||void 0===a||null===(c=a.property)||void 0===c?void 0:c.description)&&void 0!==l?l:"Anda Tidak dapat Melakukan aksi",duration:null!==(o=null===e||void 0===e||null===(r=e.theme)||void 0===r||null===(d=r.property)||void 0===d?void 0:d.duration)&&void 0!==o?o:0})}}),children:null!==(l=null===e||void 0===e?void 0:e.children)&&void 0!==l?l:null});default:return null}}function j(e){var n,i,l=e.permission,a=e.role,c=e.config,o=e.theme;return l?"string"===typeof l&&l===a?Object(d.jsx)(u,{visible:!0,config:c,children:null!==(n=null===e||void 0===e?void 0:e.children)&&void 0!==n?n:null}):Array.isArray(l)&&l.filter((function(e){return e===a})).length>0?Object(d.jsx)(u,{visible:!0,config:c,children:null!==(i=null===e||void 0===e?void 0:e.children)&&void 0!==i?i:null}):Object(d.jsx)(b,Object(t.a)(Object(t.a)({},e),{},{theme:o})):Object(d.jsx)(b,Object(t.a)(Object(t.a)({},e),{},{theme:o}))}j.defaultProps={role:"admin",theme:{type:"element",property:{}},permission:o.a,config:{block:!1,danger:!1,disabled:!1,ghost:!1,href:null,icon:null,loading:!1,shape:"default",size:"large",target:null,type:"default",onClick:function(){}}},n.a=Object(c.b)((function(){return{}}),{})(a.a.memo(j))},700:function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));var t=["admin","operator","public","guest"]},710:function(e,n,i){"use strict";var t=i(3),l=i(0),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},c=i(23),o=function(e,n){return l.createElement(c.a,Object(t.a)({},e,{ref:n,icon:a}))};n.a=l.forwardRef(o)},790:function(e,n,i){"use strict";i.r(n);var t=i(5),l=i(0),a=i(19),c=i(697),o=i(699),r=i(710),s=i(114),d=i(657),u=i(408),b=i(134),j=i(86),v=i(640),m=i(402),h=i(57),p=i(2);n.default=Object(a.b)((function(e){return{}}))((function(){var e=Object(l.useState)(!1),n=Object(t.a)(e,2),i=n[0],a=n[1],f=d.a.useForm(),g=Object(t.a)(f,1)[0];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(c.a,{loading:!1,name:"Create Announcement Category",positionName:["General","Announcement","Category"],thumbnail:null,positionColor:"cyan",extra:Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(o.a,{permission:["admin"],theme:{type:"notification",property:{message:"Access Denied",description:"Anda tidak dapat menyimpan ke database "}},config:{icon:Object(p.jsx)(r.a,{}),type:"primary",danger:!1,loading:null!==i&&void 0!==i&&i,ghost:!0,size:"small",onClick:function(){a(!0),g.validateFields().then((function(e){new h.a({url:"/api/v1/announcement/categories",body:e}).post().then((function(e){var n,i;null!==e&&void 0!==e&&e.success?u.b.success(null!==(n=null===e||void 0===e?void 0:e.message)&&void 0!==n?n:"Successfully: created"):u.b.info(null!==(i=null===e||void 0===e?void 0:e.message)&&void 0!==i?i:"-"),a(!1)})).catch((function(e){var n;u.b.error(null!==(n=null===e||void 0===e?void 0:e.message)&&void 0!==n?n:"-"),a(!1)}))})).catch((function(e){a(!1)}))}},children:Object(p.jsx)("span",{children:"Save"})})})}),Object(p.jsx)("div",{style:{marginTop:90},children:Object(p.jsx)(s.a,{children:Object(p.jsx)(d.a,{form:g,layout:"vertical",children:Object(p.jsx)(b.a,{gutter:24,children:Object(p.jsx)(j.a,{xs:{span:24,order:1},lg:{span:14,order:1},children:Object(p.jsxs)(v.a,{bordered:!1,children:[Object(p.jsx)(d.a.Item,{hasFeedback:!0,name:"name",label:"Name",rules:[{required:!0,message:"Can't be empty!"}],children:Object(p.jsx)(m.a,{})}),Object(p.jsx)(d.a.Item,{hasFeedback:!0,name:"description",label:"Description",rules:[{required:!1,message:"Can't be empty!"}],children:Object(p.jsx)(m.a.TextArea,{allowClear:!0,showCount:!0,autoSize:{minRows:4,maxRows:6},size:"small"})})]})})})})})})]})}))}}]);
//# sourceMappingURL=47.2ae95581.chunk.js.map
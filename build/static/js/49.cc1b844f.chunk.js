(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[49],{697:function(e,t,n){"use strict";var i=n(5),a=n(0),l=n(123),c=n(639),r=n(826),o=n(827),s=n(641),d=n(19),u=n(35),j=n(2),b=function(e){var t=e.children,n=e.background,l=e.className,c=e.overlap,r=e.navType,o=Object(a.useState)(0),s=Object(i.a)(o,2),d=s[0],b=s[1],v=Object(a.useRef)(null);Object(a.useEffect)((function(){if(r===u.d){var e=window.innerWidth,t=v.current.offsetWidth;b((e-t)/2)}}),[r]);return Object(j.jsx)("div",{ref:v,className:"page-header-alt ".concat(l||""," ").concat(c&&"overlap"),style:function(){var e={backgroundImage:n?"url(".concat(n,")"):"none"};return r===u.d&&(e.marginRight=-d,e.marginLeft=-d,e.paddingLeft=0,e.paddingRight=0),e}(),children:r===u.d?Object(j.jsx)("div",{className:"container",children:t}):Object(j.jsx)(j.Fragment,{children:t})})},v=(Object(d.b)((function(e){return{navType:e.theme.navType}}),{})(b),n(38)),m=n(114),f=n(698);function h(e){var t=e.thumbnail,n=e.containerType,d=e.name,u=e.positionName,h=e.loading,O=e.size,p=e.extra,x=e.lookup,g=e.description,y=Object(a.useState)((function(){return"cyan"})),k=Object(i.a)(y,2),N=k[0];k[1];function w(){var n,i;return Object(j.jsxs)(l.a,{className:"py-2",mobileFlex:!1,justifyContent:"between",alignItems:"center",children:[Object(j.jsxs)(l.a,{className:null!==x&&void 0!==x&&x.thumbnail?"py-2":"py-4",mobileFlex:!1,justifyContent:"start",alignItems:"center",children:[(null===x||void 0===x?void 0:x.thumbnail)&&Object(j.jsx)("div",{className:["mk-w-[80px] mk-h-[80px] mk-rounded-full mk-overflow-hidden mk-flex mk-items-center mk-justify-center",t?"":"mk-bg-cyan-500"].join(" "),children:Object(j.jsx)(c.a,{loading:h,style:{background:"transparent"},size:null!==O&&void 0!==O?O:50,src:t?Object(j.jsx)(r.a,{preview:null!==(n=null===e||void 0===e?void 0:e.isPreview)&&void 0!==n&&n,width:null!==O&&void 0!==O?O:50,height:null!==O&&void 0!==O?O:50,style:{objectFit:"cover"},fallback:v.c.defaultImage,src:t}):null,children:t?null:v.c.getNameInitial(null!==d&&void 0!==d?d:"-")})}),Object(j.jsxs)("div",{className:null!==x&&void 0!==x&&x.thumbnail?"mx-4":"",children:[Object(j.jsx)(o.a.Title,{level:3,style:{lineHeight:1},className:"m-0 mb-2",children:d}),"boolean"!==typeof g&&""!==g&&null!==g&&Object(j.jsx)("div",{className:"mb-2",children:Object(j.jsx)(o.a.Text,{children:g})}),(null===x||void 0===x?void 0:x.positionName)&&(u&&"string"===typeof u?Object(j.jsx)(s.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:N,children:null!==u&&void 0!==u?u:"-"}):Array.isArray(u)&&u.length>0?Object(j.jsx)(l.a,{alignItems:"center",children:u.map((function(t,n){var i;return"string"===typeof t?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(s.a,{color:null!==(i=null===e||void 0===e?void 0:e.positionColor)&&void 0!==i?i:N,children:null!==t&&void 0!==t?t:"-"}),n<u.length-1&&Object(j.jsx)("div",{style:{width:"7px",height:"7px",borderRadius:"4px",margin:"0 10px 0 -2px",background:"#939393",opacity:.5}})]}):""}))}):null)]})]}),p&&p]})}return Object(j.jsx)(b,{className:"border-bottom",overlap:!0,children:function(e){switch(e){case"antd":case"primary":return Object(j.jsx)(f.a,{children:Object(j.jsx)(w,{})});default:return Object(j.jsx)(m.a,{children:Object(j.jsx)(w,{})})}}(n)})}h.defaultProps={containerType:"tailwind",lookup:{thumbnail:!0,positionName:!0},description:!1,name:null,positionName:null,loading:null,extra:null};t.a=h},698:function(e,t,n){"use strict";n(0);var i=n(2);t.a=function(e){return Object(i.jsx)("div",{className:"".concat(["mk-mx-auto mk-max-w-screen-xl",null===e||void 0===e?void 0:e.className].join(" ")),children:e.children})}},701:function(e,t,n){"use strict";t.a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"}},707:function(e,t,n){"use strict";var i=n(3),a=n(0),l=n(701),c=n(23),r=function(e,t){return a.createElement(c.a,Object(i.a)({},e,{ref:t,icon:l.a}))};t.a=a.forwardRef(r)},711:function(e,t,n){"use strict";var i=n(3),a=n(0),l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},c=n(23),r=function(e,t){return a.createElement(c.a,Object(i.a)({},e,{ref:t,icon:l}))};t.a=a.forwardRef(r)},783:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n(9),l=n(5),c=n(0),r=n.n(c),o=n(19),s=n(697),d=n(114),u=n(89),j=n(657),b=n(408),v=n(662),m=n(132),f=n(651),h=n(638),O=n(402),p=n(640),x=n(656),g=n(652),y=n(707),k=n(711),N=n(674),w=n(644),S=n(58),C=n(57),I=n(2);t.default=Object(o.b)((function(e){return{}}))((function(){var e,t,n,o=[{visible:!0,key:"no",title:"No",dataIndex:"id",width:70,render:function(e,t,n){return n+1+(null===M||void 0===M?void 0:M.limit)*((null===M||void 0===M?void 0:M.page)-1)}},{visible:!0,key:"Name",dataIndex:["data","name"],title:"Name",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"Type media",dataIndex:["data","name"],title:"Type Ads",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"Thin Client",dataIndex:["data","name"],title:"Thin Client",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"Start Time",dataIndex:["data","name"],title:"Start Time",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"End Time",dataIndex:["data","name"],title:"End Time",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"Status",dataIndex:["data","name"],title:"Status",render:function(e){return null!==e&&void 0!==e?e:"-"}},{visible:!0,key:"action",width:120,dataIndex:"id",render:function(e,t,n){var i;return Object(I.jsxs)("div",{className:"text-right d-flex !mk-gap-2",children:[Object(I.jsx)(u.a,{size:"small",type:"primary",ghost:!0,icon:Object(I.jsx)(g.a,{}),onClick:function(){return function(e,t){le(!ae),se(e)}(t)}}),Object(I.jsx)(u.a,{size:"small",type:"primary",danger:!0,ghost:!0,onClick:function(){!function(e,t){be(t,!0),new C.a({url:"/api/v1/master-data/airline-type/".concat(e)}).delete().then((function(n){var i,l;null!==n&&void 0!==n&&n.success?(G&&"undefined"!==typeof G[t]&&(G[t].isDeleted=!0,K(Object(a.a)(G)),be(t,!1)),b.b.success(null!==(i=null===n||void 0===n?void 0:n.message)&&void 0!==i?i:"Successfully deleted"),setTimeout((function(){K(Object(a.a)(G.filter((function(t){return t.id!==e}))))}),2e3)):(be(t,!1),b.b.error(null!==(l=null===n||void 0===n?void 0:n.message)&&void 0!==l?l:"Error: delete by id "+e))})).catch((function(e){be(t,!1)}))}(e,n)},loading:null!==(i=X[n])&&void 0!==i&&i,icon:Object(I.jsx)(y.a,{})})]})}}],T=Object(c.useState)((function(){return o.map((function(e){return{key:null===e||void 0===e?void 0:e.key}}))})),E=Object(l.a)(T,2),z=E[0],F=(E[1],Object(S.g)()),A=Object(c.useState)(!0),R=Object(l.a)(A,2),H=R[0],J=R[1],q=Object(c.useState)({page:1,limit:20}),D=Object(l.a)(q,2),M=D[0],B=D[1],L=Object(c.useState)({page:1,limit:10}),P=Object(l.a)(L,2),V=P[0],W=(P[1],Object(c.useState)([])),_=Object(l.a)(W,2),G=_[0],K=_[1],Q=Object(c.useState)([]),U=Object(l.a)(Q,2),X=U[0],Y=U[1],Z=Object(c.useState)(!1),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(!1),ie=Object(l.a)(ne,2),ae=ie[0],le=ie[1],ce=Object(c.useState)(null),re=Object(l.a)(ce,2),oe=re[0],se=re[1],de=j.a.useForm(),ue=Object(l.a)(de,1)[0];function je(){J(!0),new C.a({url:"/api/v1/advertise"}).get().then((function(e){K(Object(a.a)(null===e||void 0===e?void 0:e.data)),J(!1)})).catch((function(e){K([]),J(!1)}))}Object(c.useEffect)((function(){je()}),[M]);var be=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Y((function(n){return n[e]=t,null!==n&&void 0!==n?n:[]}))};Object(c.useEffect)((function(){ue.resetFields()}),[ae]);var ve=Object(c.useState)(null!==o&&void 0!==o?o:[]),me=Object(l.a)(ve,2),fe=(me[0],me[1]),he=function(e){te(null!==e&&void 0!==e&&e)};function Oe(){return Object(I.jsxs)("div",{className:"d-flex align-items-center mk-gap-2",children:[Object(I.jsx)(u.a,{icon:Object(I.jsx)(k.a,{}),ghost:!0,type:"primary",onClick:je,loading:H}),Object(I.jsx)(u.a,{icon:Object(I.jsx)(N.a,{}),ghost:!0,type:"primary",onClick:function(){return he(!0)},loading:H})]})}return Object(I.jsxs)(r.a.Fragment,{children:[Object(I.jsx)(v.a,{title:"Filter",placement:"right",closable:!0,onClose:function(){return he(!1)},visible:ee,children:Object(I.jsxs)("div",{className:"w-100",children:[Object(I.jsx)("h5",{children:"Table Column"}),Object(I.jsx)(m.a,{onChange:function(e){fe((function(){return o.filter((function(t){return e.includes(t.key)}))}))},mode:"tags",className:"w-100",placeholder:"Select Columns Active",defaultValue:null!==(e=o.map((function(e){return null===e||void 0===e?void 0:e.key})))&&void 0!==e?e:[],children:o.map((function(e){return Object(I.jsx)(m.a.Option,{value:e.key,children:"".concat(e.key).replace(/_/g," ")},e.key)}))}),Object(I.jsx)(f.a,{})]})}),Object(I.jsxs)(h.a,{style:{width:"520px !important"},title:"Edit",visible:ae,onOk:function(){ue.validateFields().then((function(e){new C.a({body:e,url:"/api/v1/advertise"}).post().then((function(e){var t;b.b.success({content:null!==(t=null===e||void 0===e?void 0:e.message)&&void 0!==t?t:"Successfully created",key:"create-city",duration:2}),J(!1)})).catch((function(e){var t;b.b.info(JSON.stringify(e)),b.b.error({content:null!==(t=null===e||void 0===e?void 0:e.message)&&void 0!==t?t:"Error: Some Error",key:"create-city",duration:2}),J(!1)}))})).catch((function(e){}))},onCancel:function(){le(!1),se(null)},children:[Object(I.jsx)("pre",{children:JSON.stringify(oe,null,2)}),Object(I.jsxs)(j.a,{form:ue,initialValues:Object(i.a)({},oe),layout:"vertical",children:[Object(I.jsx)(j.a.Item,{name:"identifier",hidden:!0,label:"Identifier",rules:[{required:!0,message:"Can't be empty!"}],children:Object(I.jsx)(O.a,{})}),Object(I.jsx)(j.a.Item,{name:["data","code"],label:"Code",rules:[{required:!0,message:"Can't be empty!"}],children:Object(I.jsx)(O.a,{})}),Object(I.jsx)(j.a.Item,{name:["data","name"],label:"Display Name",rules:[{required:!0,message:"Can't be empty!"}],children:Object(I.jsx)(O.a,{})})]})]}),Object(I.jsx)(s.a,{loading:!1,name:"Overview",positionName:["General","Advertise"],thumbnail:"/overview.png",extra:Object(I.jsx)("div",{className:"text-right mk-gap-4 d-flex",children:Object(I.jsx)(u.a,{type:"primary",size:"small",ghost:!0,icon:Object(I.jsx)(w.a,{}),onClick:function(){F.push("/dashboard/general/advertise/create")},children:"Add New"})})}),Object(I.jsx)("div",{style:{marginTop:90},children:Object(I.jsx)(d.a,{children:Object(I.jsx)(p.a,{bordered:!1,extra:Object(I.jsx)(Oe,{}),children:Object(I.jsx)(x.a,{loading:H,rowClassName:function(e,t){return null!==e&&void 0!==e&&e.isDeleted?"!mk-bg-red-500 !mk-bg-opacity-20":""},dataSource:G,columns:null!==(t=o.filter((function(e){return z.filter((function(t){return(null===t||void 0===t?void 0:t.key)===e.key})).length>0})))&&void 0!==t?t:[],pagination:{pageSize:null===M||void 0===M?void 0:M.limit,current:null===M||void 0===M?void 0:M.page,total:null!==(n=null===V||void 0===V?void 0:V.total_items)&&void 0!==n?n:0,onChange:function(e,t){B(Object(i.a)(Object(i.a)({},M),{},{page:e,limit:t}))}}})})})})]})}))}}]);
//# sourceMappingURL=49.cc1b844f.chunk.js.map
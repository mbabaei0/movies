import{a as F,c as M,d as S,e as D,f as x,i as N,k as O,l as _}from"./chunk-S2OHBIRS.js";import{$ as c,Aa as f,Nb as b,R as p,Ra as g,T as h,Ta as y,Va as v,Xa as A,Xb as P,Ya as C,Z as m,ca as u,fc as E,tb as w,ub as I,vb as R}from"./chunk-7ICQMSWM.js";import"./chunk-4RCH4JJG.js";var T=[{path:"movies",loadChildren:()=>import("./chunk-FLSVIDTE.js").then(i=>i.MOVIES_ROUTES)},{path:"",redirectTo:"movies",pathMatch:"full"}];var L="@",Y=(()=>{let e=class e{constructor(r,o,n,s,a){this.doc=r,this.delegate=o,this.zone=n,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=m(y,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-YVG76PBW.js").then(o=>o)).catch(o=>{throw new p(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:n})=>{this._engine=o(this.animationType,this.doc);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(r,o){let n=this.delegate.createRenderer(r,o);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new l(n);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let j=a.createRenderer(r,o);s.use(j),this.scheduler?.notify(9)}).catch(a=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){g()},e.\u0275prov=h({token:e,factory:e.\u0275fac});let i=e;return i})(),l=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,o){this.delegate.insertBefore(e,t,r,o)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,o){this.delegate.setAttribute(e,t,r,o)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,o){this.delegate.setStyle(e,t,r,o)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(L)}};function k(i="animations"){return A("NgAsyncAnimations"),u([{provide:v,useFactory:(e,t,r)=>new Y(e,t,r,i),deps:[E,D,C]},{provide:f,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var d={API_KEY:"8ea39b15",API_URL:"https://www.omdbapi.com"};function K(i,e){let t=i.params?i.params:new F;t=t.set("apiKey",d.API_KEY);let r=i.clone({url:`${d.API_URL}/${i.url}`,params:t});return e(r)}var U={providers:[P({eventCoalescing:!0}),O(T,_()),k(),M(S([K]))]};var V=(()=>{let e=class e{constructor(){this.title="movie-app"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["app-root"]],standalone:!0,features:[b],decls:2,vars:0,consts:[[1,"layout"]],template:function(o,n){o&1&&(w(0,"div",0),R(1,"router-outlet"),I())},dependencies:[N],styles:[".layout[_ngcontent-%COMP%]{background:#f8f8ff;min-height:100vh}"]});let i=e;return i})();x(V,U).catch(i=>console.error(i));

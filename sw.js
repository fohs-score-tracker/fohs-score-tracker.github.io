if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,n)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const t={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return t;default:return e(s)}}))).then((e=>{const s=n(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ac8ffed3"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.65c99daa.css",revision:"c873838b853d9734229417413e12f3a0"},{url:"assets/index.6abd964e.js",revision:"0259570922e27e5cbe620cf44f2999c4"},{url:"assets/vendor.f10fa35b.js",revision:"0b75aff9e5f7b971c38a6e43c96e7de4"},{url:"index.html",revision:"c86343b4384398a9a630356a4af4e6a8"},{url:"pwaicon.png",revision:"a6475389a13c352a02b05c64ca578ff5"},{url:"manifest.webmanifest",revision:"937cf3f34e6709cd01698705c7b44d32"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map

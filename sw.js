if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,c,i)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const n={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return r;case"module":return n;default:return e(s)}}))).then((e=>{const s=i(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ac8ffed3"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.2ffab723.js",revision:"0c294e9b1d3500f6f0527cfcb776e1d2"},{url:"assets/index.494a4c69.css",revision:"517592781c9bf9a7970deb3c1c0f644f"},{url:"assets/vendor.f2e03639.js",revision:"cc8bbac5fdec96c4387e3aca7319a091"},{url:"index.html",revision:"c8fc0cb62a585937ce15b3f169fcef93"},{url:"pwaicon.png",revision:"a6475389a13c352a02b05c64ca578ff5"},{url:"manifest.webmanifest",revision:"937cf3f34e6709cd01698705c7b44d32"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map

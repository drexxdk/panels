"use strict";function onloadCSS(e,t){var n;function i(){!n&&t&&(n=!0,t.call(e))}e.addEventListener&&e.addEventListener("load",i),e.attachEvent&&e.attachEvent("onload",i),"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(i)}!function(r){var e=function(e,t,n){var i,o=r.document,a=o.createElement("link");if(t)i=t;else{var s=(o.body||o.getElementsByTagName("head")[0]).childNodes;i=s[s.length-1]}var d=o.styleSheets;function l(){a.addEventListener&&a.removeEventListener("load",l),a.media=n||"all"}return a.rel="stylesheet",a.href=e,a.media="only x",function e(t){if(o.body)return t();setTimeout(function(){e(t)})}(function(){i.parentNode.insertBefore(a,t?i:i.nextSibling)}),a.addEventListener&&a.addEventListener("load",l),(a.onloadcssdefined=function e(t){for(var n=a.href,i=d.length;i--;)if(d[i].href===n)return t();setTimeout(function(){e(t)})})(l),a};"undefined"!=typeof exports?exports.loadCSS=e:r.loadCSS=e}("undefined"!=typeof window?window:void 0);var app=app||{};String.prototype.endsWith=function(e){return-1!==this.indexOf(e,this.length-e.length)};var l=window.location,segmentCount=l.origin.endsWith("github.io")?1:0;app.host=l.protocol+"//"+l.hostname+(l.port?":"+l.port:"")+l.pathname.split("/").slice(0,1+segmentCount).join("/")+"/",app.settings=JSON.parse(localStorage.getItem("settings")),null===app.settings&&(app.settings=[]);var theme="light";app.settings.forEach(function(e){"theme"===e.name&&(theme=e.id.substring(e.id.indexOf("-")+1))});var stylesheet=loadCSS(app.host+"dist/css/theme/"+theme+".css");onloadCSS(stylesheet,function(){var e=document.body,t=setInterval(function(){"hidden"!==window.getComputedStyle(e,null).getPropertyValue("visibility")&&(clearInterval(t),app.cssLoaded=!0)})});
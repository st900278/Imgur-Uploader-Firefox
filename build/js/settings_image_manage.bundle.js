!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=8)}([function(e,t){e.exports=class{constructor(){browser.storage.local.get("firefox-uploader-imgur").then(e=>{0==Object.getOwnPropertyNames(e).length&&(console.log("test"),browser.storage.local.set({"firefox-uploader-imgur":[]}))})}add(e){return new Promise((t,r)=>{browser.storage.local.get("firefox-uploader-imgur").then(r=>{var o=r["firefox-uploader-imgur"];e.viewable=!0,o.push(e),console.log(o),browser.storage.local.set({"firefox-uploader-imgur":o}).then(()=>{t("test")})})})}remove(e){browser.storage.local.get("firefox-uploader-imgur").then(t=>{var r=[];for(let o of t["firefox-uploader-imgur"])o.id!=e&&r.push(o);browser.storage.local.set({"firefox-uploader-imgur":r})})}change(e,t){!e instanceof Array&&(e=[e]);browser.storage.local.get("firefox-uploader-imgur").then(r=>{var o=[];for(let a of r["firefox-uploader-imgur"])if(e.indexOf(a.id)>=0){for(var n in console.log(e),console.log(t),t)t.hasOwnProperty(n)&&(a[n]=t[n]);console.log(a),o.push(a)}else o.push(a);browser.storage.local.set({"firefox-uploader-imgur":o})})}removeAll(){browser.storage.local.set({"firefox-uploader-imgur":[]})}}},function(e,t,r){var o=r(2);e.exports=class{constructor(){browser.storage.local.get("firefox-uploader-client-id").then(e=>{var t=["a6bebdd6a51f656","f752792c52f4cdf","474d8a50e7e752d","9089d7837e30269","6c6fa522da181b8","bbf63f907ae5614","480391db79e87b6","ea76f402e22007a"];void 0!==e["firefox-uploader-client-id"]?(this.clientID=e["firefox-uploader-client-id"],console.log(e["firefox-uploader-client-id"])):this.clientID=t[Math.floor(Math.random()*t.length)],console.log(this.clientID)})}update(){browser.storage.local.get("firefox-uploader-client-id").then(e=>{var t=["a6bebdd6a51f656","f752792c52f4cdf","474d8a50e7e752d","9089d7837e30269","6c6fa522da181b8","bbf63f907ae5614","480391db79e87b6","ea76f402e22007a"];void 0!==e["firefox-uploader-client-id"]?(this.clientID=e["firefox-uploader-client-id"],console.log(e["firefox-uploader-client-id"])):this.clientID=t[Math.floor(Math.random()*t.length)],console.log(this.clientID)})}uuid(){var e=Date.now();return"undefined"!=typeof performance&&"function"==typeof performance.now&&(e+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?r:3&r|8).toString(16)}))}imageReader(e){let t=new FileReader;return new Promise((r,o)=>{t.onload=e=>{r(e.target.result.split("base64,")[1])},t.onerror=()=>o(this),t.readAsDataURL(e)})}uploadToImgur(e){var t=this;return new Promise((r,n)=>{console.log(this),console.log(t.uuid());var a={url:"https://api.imgur.com/3/image",headers:{authorization:"Client-ID "+t.clientID},json:{image:e}};console.log(a),o.post(a,(function(e,t,o){console.log(o.data),o.data.error?n(o.data):r(o.data)}))})}uploader(e){return this.imageReader(e).then(this.uploadToImgur.bind(this))}remove(e){var t=this;return new Promise((r,n)=>{var a={method:"delete",url:"https://api.imgur.com/3/image/"+e,headers:{authorization:"Client-ID "+t.clientID}};console.log(a),o(a,(function(e,t,o){var a=JSON.parse(o);a.data?r(a):n(a)}))})}}},function(e,t,r){var o,n,a;n=[],void 0===(a="function"==typeof(o=function(){var e=XMLHttpRequest;if(!e)throw new Error("missing XMLHttpRequest");function t(a,i){if("function"!=typeof i)throw new Error("Bad callback given: "+i);if(!a)throw new Error("No options given");var l=a.onResponse;if((a="string"==typeof a?{uri:a}:JSON.parse(JSON.stringify(a))).onResponse=l,a.verbose&&(t.log=function(){var e,t,r={},a=["trace","debug","info","warn","error"];for(t=0;t<a.length;t++)r[e=a[t]]=o,"undefined"!=typeof console&&console&&console[e]&&(r[e]=n(console,e));return r}()),a.url&&(a.uri=a.url,delete a.url),!a.uri&&""!==a.uri)throw new Error("options.uri is a required argument");if("string"!=typeof a.uri)throw new Error("options.uri must be a string");for(var s=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],d=0;d<s.length;d++)if(a[s[d]])throw new Error("options."+s[d]+" is not supported");if(a.callback=i,a.method=a.method||"GET",a.headers=a.headers||{},a.body=a.body||null,a.timeout=a.timeout||t.DEFAULT_TIMEOUT,a.headers.host)throw new Error("Options.headers.host is not supported");a.json&&(a.headers.accept=a.headers.accept||"application/json","GET"!==a.method&&(a.headers["content-type"]="application/json"),"boolean"!=typeof a.json?a.body=JSON.stringify(a.json):"string"!=typeof a.body&&(a.body=JSON.stringify(a.body)));var u=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t.join("&")};if(a.qs){var c="string"==typeof a.qs?a.qs:u(a.qs);-1!==a.uri.indexOf("?")?a.uri=a.uri+"&"+c:a.uri=a.uri+"?"+c}if(a.form){if("string"==typeof a.form)throw"form name unsupported";if("POST"===a.method){var f=(a.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(a.headers["content-type"]=f,f){case"application/x-www-form-urlencoded":a.body=u(a.form).replace(/%20/g,"+");break;case"multipart/form-data":var g=function(e){var t={};t.boundry="-------------------------------"+Math.floor(1e9*Math.random());var r=[];for(var o in e)e.hasOwnProperty(o)&&r.push("--"+t.boundry+'\nContent-Disposition: form-data; name="'+o+'"\n\n'+e[o]+"\n");return r.push("--"+t.boundry+"--"),t.body=r.join(""),t.length=t.body.length,t.type="multipart/form-data; boundary="+t.boundry,t}(a.form);a.body=g.body,a.headers["content-type"]=g.type;break;default:throw new Error("unsupported encoding:"+f)}}}return a.onResponse=a.onResponse||o,!0===a.onResponse&&(a.onResponse=i,a.callback=o),!a.headers.authorization&&a.auth&&(a.headers.authorization="Basic "+function(e){var t,r,o,n,a,i,l,s,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=0,c=0,f="",g=[];if(!e)return e;do{t=e.charCodeAt(u++),r=e.charCodeAt(u++),o=e.charCodeAt(u++),n=(s=t<<16|r<<8|o)>>18&63,a=s>>12&63,i=s>>6&63,l=63&s,g[c++]=d.charAt(n)+d.charAt(a)+d.charAt(i)+d.charAt(l)}while(u<e.length);switch(f=g.join(""),e.length%3){case 1:f=f.slice(0,-2)+"==";break;case 2:f=f.slice(0,-1)+"="}return f}(a.auth.username+":"+a.auth.password)),function(o){var n=new e,a=!1,i=function(e){var t,r=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{t=location.href}catch(e){(t=document.createElement("a")).href="",t=t.href}var o=r.exec(t.toLowerCase())||[],n=r.exec(e.toLowerCase());return!(!n||n[1]==o[1]&&n[2]==o[2]&&(n[3]||("http:"===n[1]?80:443))==(o[3]||("http:"===o[1]?80:443)))}(o.uri),l="withCredentials"in n;if(r+=1,n.seq_id=r,n.id=r+": "+o.method+" "+o.uri,n._id=n.id,i&&!l){var s=new Error("Browser does not support cross-origin request: "+o.uri);return s.cors="unsupported",o.callback(s,n)}n.timeoutTimer=setTimeout((function(){a=!0;var e=new Error("ETIMEDOUT");return e.code="ETIMEDOUT",e.duration=o.timeout,t.log.error("Timeout",{id:n._id,milliseconds:o.timeout}),o.callback(e,n)}),o.timeout);var d={response:!1,loading:!1,end:!1};return n.onreadystatechange=function(r){if(a)return t.log.debug("Ignoring timed out state change",{state:n.readyState,id:n.id});if(t.log.debug("State change",{state:n.readyState,id:n.id,timed_out:a}),n.readyState===e.OPENED)for(var i in t.log.debug("Request started",{id:n.id}),o.headers)n.setRequestHeader(i,o.headers[i]);else n.readyState===e.HEADERS_RECEIVED?u():n.readyState===e.LOADING?(u(),c()):n.readyState===e.DONE&&(u(),c(),function(){if(d.end)return;if(d.end=!0,t.log.debug("Request done",{id:n.id}),n.body=n.responseText,o.json)try{n.body=JSON.parse(n.responseText)}catch(e){return o.callback(e,n)}o.callback(null,n,n.body)}())},n.open(o.method,o.uri,!0),i&&(n.withCredentials=!!o.withCredentials),n.send(o.body),n;function u(){if(!d.response){if(d.response=!0,t.log.debug("Got response",{id:n.id,status:n.status}),clearTimeout(n.timeoutTimer),n.statusCode=n.status,i&&0==n.statusCode){var e=new Error("CORS request rejected: "+o.uri);return e.cors="rejected",d.loading=!0,d.end=!0,o.callback(e,n)}o.onResponse(null,n)}}function c(){d.loading||(d.loading=!0,t.log.debug("Response body loading",{id:n.id}))}}(a)}t.log={trace:o,debug:o,info:o,warn:o,error:o};var r=0;function o(){}function n(e,t){return function(r,o){return"object"==typeof o&&(r+=" "+JSON.stringify(o)),e[t].call(e,r)}}return t.withCredentials=!1,t.DEFAULT_TIMEOUT=18e4,t.defaults=function(e,r){var o=function(t){return function(r,o){for(var n in r="string"==typeof r?{uri:r}:JSON.parse(JSON.stringify(r)),e)void 0===r[n]&&(r[n]=e[n]);return t(r,o)}},n=o(t);return n.get=o(t.get),n.post=o(t.post),n.put=o(t.put),n.head=o(t.head),n},["get","put","post","head"].forEach((function(e){var r=e.toUpperCase();t[e.toLowerCase()]=function(e){"string"==typeof e?e={method:r,uri:e}:(e=JSON.parse(JSON.stringify(e))).method=r;var o=[e].concat(Array.prototype.slice.apply(arguments,[1]));return t.apply(this,o)}})),t.couch=function(e,r){return"string"==typeof e&&(e={uri:e}),e.json=!0,e.body&&(e.json=e.body),delete e.body,r=r||o,t(e,(function(e,t,o){if(e)return r(e,t,o);if((t.statusCode<200||t.statusCode>299)&&o.error){for(var n in e=new Error("CouchDB error: "+(o.error.reason||o.error.error)),o)e[n]=o[n];return r(e,t,o)}return r(e,t,o)}))},t})?o.apply(t,n):o)||(e.exports=a)},,,,,,function(e,t,r){$(document).foundation();var o=r(1),n=r(0),a=new o,i=new n,l=(location.hash||"#1").slice(1),s=0,d=!1;function u(e,t){return e.className.split(" ").indexOf(t)>-1}function c(){document.getElementById("image-list").innerHTML="",document.getElementById("image-page").innerHTML="",browser.storage.local.get("firefox-uploader-imgur").then(e=>{console.log(e);let t=e["firefox-uploader-imgur"].reverse(),r=Math.ceil(t.length/15);if(r>0){if(r>7){let e=l<=4?1:l+3>r?r-6:l-3,t=e+6;for(let r=e;r<=t;r++)$(document.getElementById("image-page")).append('<li><a class="page-href"  attr-page="'+r+'"  aria-label="Page '+r+'">'+r+"</a></li>")}else for(let e=1;e<=r;e++)$(document.getElementById("image-page")).append('<li><a class="page-href"  attr-page="'+e+'"  aria-label="Page '+e+'">'+e+"</a></li>");$(document.querySelector("[aria-label='Page "+l+"']")).parent().addClass("current");for(let t of e["firefox-uploader-imgur"].slice(15*(l-1),15*l))console.log(t),null!=t&&null!=t.link&&$(document.getElementById("image-list")).append('                    <div class="cell">                      <div class="card">                        <img src="'+t.link+'">                        <div class="card-section">                            <h6>'+t.link+'</h6>                            <button type="button" class="alert button delete float-right" data-id="'+t.id+'" data-delete="'+t.deletehash+'">Delete From Imgur</button>                        </div>                      </div>                    </div>                ')}})}function f(){document.getElementById("image-list").innerHTML="",document.getElementById("image-page").innerHTML="",browser.storage.local.get("firefox-uploader-auth").then(e=>{console.log(e);var t=e["firefox-uploader-auth"].access_token;console.log(t),$.ajax({url:"https://api.imgur.com/3/account/me/images",headers:{Authorization:"Bearer "+t}}).done(e=>{var t=e.data;let r=Math.ceil(t.length/15);if(r>0){if(console.log("test"),r>7){let e=l<=4?1:l+3>r?r-6:l-3,t=e+6;for(let r=e;r<=t;r++)$(document.getElementById("image-page")).append('<li><a class="page-href"  attr-page="'+r+'" aria-label="Page '+r+'">'+r+"</a></li>")}else for(let e=1;e<=r;e++)$(document.getElementById("image-page")).append('<li><a class="page-href" attr-page="'+e+'" aria-label="Page '+e+'">'+e+"</a></li>");$(document.querySelector("[aria-label='Page "+l+"']")).parent().addClass("current");for(let e of t.slice(15*(l-1),15*l))console.log(e),null!=e&&null!=e.link&&$(document.getElementById("image-list")).append('                        <div class="cell">                          <div class="card">                            <img src="'+e.link+'">                            <div class="card-section">                                <h6>'+e.link+'</h6>                                <button type="button" class="alert button delete float-right" data-id="'+e.id+'" data-delete="'+e.deletehash+'">Delete From Imgur</button>                            </div>                          </div>                        </div>                    ')}})})}browser.storage.local.get("firefox-uploader-client-id").then(e=>{void 0!==e["firefox-uploader-client-id"]&&(document.querySelector("#client-id").value=e["firefox-uploader-client-id"])}),browser.storage.local.get("firefox-uploader-auth").then(e=>{console.log(e),e["firefox-uploader-auth"].access_token?d=!0:(console.log("out"),$("#account-image").css({color:"grey",cursor:"default"}))}),c(),document.getElementById("local-image").addEventListener("click",(function(){l=1,s=0,c()})),document.getElementById("account-image").addEventListener("click",(function(){1==d&&(l=1,s=1,f())})),document.addEventListener("click",(function(e){u(e.target,"delete")?a.remove(e.target.getAttribute("data-delete")).then(t=>{t.success&&(i.remove(e.target.getAttribute("data-id")),e.target.parentNode.parentNode.parentNode.style.display="none")}):u(e.target,"page-href")&&(l=parseInt(e.target.getAttribute("attr-page")),console.log(s),console.log(l),0==s?c():f(),console.log(e.target))}),!1)}]);
//# sourceMappingURL=settings_image_manage.bundle.js.map
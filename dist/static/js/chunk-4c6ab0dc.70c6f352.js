(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c6ab0dc"],{"0839":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"finish-sec scroll",on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit.apply(null,arguments)}}},[r("div",{staticClass:"finish-col"},[r("div",{staticClass:"finish-left"},[r("p",{staticClass:"text1"},[t._v(" "+t._s(t.$t("safe_storage_tips"))+" ")]),r("ul",{staticClass:"ml-2"},[r("li",{staticClass:"text list-item-with-disc"},[t._v(t._s(t.$t("save_backups")))]),r("li",{staticClass:"text list-item-with-disc"},[t._v(t._s(t.$t("do_not_share_mnemonics_with_anyone")))]),r("li",{staticClass:"text list-item-with-disc"},[t._v(t._s(t.$t("phishing_warning")))]),r("li",{staticClass:"text list-item-with-disc"},[t._v(t._s(t.$t("if_you_need_to_backup_your_mnemonics_again_you_can")))])]),r("div",{staticClass:"checkbox"},[r("Checkbox",{model:{value:t.marked,callback:function(e){t.marked=e},expression:"marked"}},[r("span",{staticClass:"checkbox-label"},[t._v(" "+t._s(t.$t("i_accept"))+" "),r("a",{attrs:{href:"#/terms"}},[t._v(t._s(t.$t("terms_and_conditions")))]),t._v(" & "),r("a",{attrs:{href:"#/privacy"}},[t._v(t._s(t.$t("privacy_policy")))]),t._v(". ")])])],1),r("div",{staticClass:"buttons clear"},[r("div",{staticClass:"float-right"},[r("button",{staticClass:"solid-button button-style create-account-style",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v(" "+t._s(t.$t("back"))+" ")]),r("button",{staticClass:"inverted-button button-style create-account-style",attrs:{type:"submit",disabled:t.isLoading||!t.marked},on:{click:t.submit}},[t._v(" "+t._s(t.$t("finish"))+" ")])])]),t.isLoading?r("Spin",{staticClass:"absolute",attrs:{size:"large",fix:""}}):t._e()],1)])])},o=[],i=r("9ab4"),c=r("60a3"),a=r("2f62"),s=r("843e"),u=r("5a03");function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function l(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */l=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(L){a=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),c=new j(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var c=r.delegate;if(c){var a=x(c,r);if(a){if(a===h)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===h)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,c),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(L){return{type:"throw",arg:L}}}t.wrap=s;var h={};function p(){}function d(){}function y(){}var v={};a(v,o,(function(){return this}));var b=Object.getPrototypeOf,m=b&&b(b(E([])));m&&m!==e&&r.call(m,o)&&(v=m);var w=y.prototype=p.prototype=Object.create(v);function g(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function n(o,i,c,a){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==f(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,c,a)}),(function(t){n("throw",t,c,a)})):e.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,a)}))}a(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator["return"]&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return d.prototype=y,a(w,"constructor",y),a(y,"constructor",d),d.displayName=a(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,a(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},g(_.prototype),a(_.prototype,i,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var c=new _(s(e,r,n,o),i);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},g(w),a(w,c,"Generator"),a(w,o,(function(){return this})),a(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(a&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,e,r){return e&&p(t.prototype,e),r&&p(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function y(t,e,r){function n(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){return!1}}return e=m(e),v(t,n()?Reflect.construct(e,r||[],m(t).constructor):e.apply(t,r))}function v(t,e){if(e&&("object"===f(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return b(t)}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}function w(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&g(t,e)}function g(t,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},g(t,e)}var _=function(t){function e(){var t;return h(this,e),t=y(this,e,arguments),t.isLoading=!1,t.marked=!1,t.modalVisibility={termsAndConditions:!1,privacyAndPolicy:!1},t.accountService=new s["a"],t.profileService=new u["a"],t}return w(e,t),d(e,[{key:"submit",value:function(){return Object(i["b"])(this,void 0,void 0,l().mark((function t(){var e;return l().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,e=this.accountService.getDefaultAccount(this.currentProfile,this.currentMnemonic,this.currentPassword,this.currentProfile.networkType),this.accountService.saveAccount(e),this.profileService.updateProfileTermsAndConditionsStatus(this.currentProfile,!0),t.next=6,this.$store.dispatch("profile/ADD_ACCOUNT",e);case 6:return t.next=8,this.$store.dispatch("account/SET_CURRENT_ACCOUNT",e);case 8:return t.next=10,this.$store.dispatch("account/SET_KNOWN_ACCOUNTS",[e.id]);case 10:return t.next=12,this.$store.dispatch("temporary/RESET_STATE");case 12:return t.abrupt("return",this.$router.push({name:"dashboard"}));case 13:case"end":return t.stop()}}),t,this)})))}},{key:"displayModal",value:function(t){c["c"].set(this.modalVisibility,t,!0)}},{key:"closeModal",value:function(t){c["c"].set(this.modalVisibility,t,!1)}}])}(c["c"]);_=Object(i["c"])([Object(c["a"])({computed:Object.assign({},Object(a["b"])({networkType:"network/networkType",currentProfile:"profile/currentProfile",currentPassword:"temporary/password",currentMnemonic:"temporary/mnemonic"}))})],_);var x=_;function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function j(t,e,r){return e&&k(t.prototype,e),r&&k(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function E(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function P(t,e,r){function n(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){return!1}}return e=C(e),L(t,n()?Reflect.construct(e,r||[],C(t).constructor):e.apply(t,r))}function L(t,e){if(e&&("object"===O(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return S(t)}function S(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}function T(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&$(t,e)}function $(t,e){return $=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},$(t,e)}var R=function(t){function e(){return E(this,e),P(this,e,arguments)}return T(e,t),j(e)}(x),N=R,A=(r("f390"),r("2877")),G=Object(A["a"])(N,n,o,!1,null,"52d1c5c0",null);e["default"]=G.exports},"3fd3":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".finish-sec[data-v-52d1c5c0]{max-height:calc(100% - 1.4rem)}.finish-sec .finish-col[data-v-52d1c5c0]{display:flex}.finish-sec .finish-col .finish-left[data-v-52d1c5c0]{width:9rem;position:relative}.finish-sec .finish-right img[data-v-52d1c5c0]{width:3rem}.finish-sec .set-title-tips[data-v-52d1c5c0]{margin:.2rem 0}.finish-sec .text[data-v-52d1c5c0]{padding-bottom:.1rem}.finish-sec .text1[data-v-52d1c5c0]{padding-top:.3rem}.list-item-with-disc[data-v-52d1c5c0]{list-style-type:disc}.buttons[data-v-52d1c5c0]{margin-top:.6rem}.checkbox-label[data-v-52d1c5c0]{margin-left:.04rem;font-size:.18rem;color:#26c3f2}.checkbox-label a[data-v-52d1c5c0]{color:#0b7392;font-size:.18rem}.checkbox-label a[data-v-52d1c5c0]:hover{color:#024458}.checkbox[data-v-52d1c5c0]{margin-top:.4rem}",""]),t.exports=e},af53:function(t,e,r){var n=r("3fd3");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("66b22a1f",n,!0,{sourceMap:!1,shadowMode:!1})},f390:function(t,e,r){"use strict";r("af53")}}]);
//# sourceMappingURL=chunk-4c6ab0dc.70c6f352.js.map
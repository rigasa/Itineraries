(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{v4tM:function(e,o,r){"use strict";r.r(o),r.d(o,"iosTransitionAnimation",function(){return m});var t=500,n="cubic-bezier(0.36,0.66,0.04,1)",a="opacity",d="transform",l="translateX",i="0%",c=.8;function m(e,o,r){var m="rtl"===document.dir,f=m?"-99.5%":"99.5%",s=m?"33%":"-33%",u=r.enteringEl,b=r.leavingEl,y=new e;if(y.addElement(u).duration(r.duration||t).easing(r.easing||n).beforeRemoveClass("hide-page"),b&&o){var S=new e;S.addElement(o).duringAddClass("show-decor"),y.add(S)}var T="back"===r.direction;if(u){var p=u.querySelector(":scope > ion-content"),v=u.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),w=u.querySelector(":scope > ion-header > ion-toolbar"),E=new e;if(p||w||0!==v.length?(E.addElement(p),E.addElement(v)):E.addElement(u.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")),y.add(E),T?E.beforeClearStyles([a]).fromTo(l,s,i,!0).fromTo(a,c,1,!0):E.beforeClearStyles([a]).fromTo(l,f,i,!0),w){var q=new e;q.addElement(w),y.add(q);var g=new e;g.addElement(w.querySelector("ion-title"));var C=new e;C.addElement(w.querySelectorAll("ion-buttons,[menuToggle]"));var k=new e;k.addElement(w.querySelector(".toolbar-background"));var h=new e;if(h.addElement(w.querySelector("ion-back-button")),q.add(g).add(C).add(k).add(h),g.fromTo(a,.01,1,!0),C.fromTo(a,.01,1,!0),T)g.fromTo(l,s,i,!0),h.fromTo(a,.01,1,!0);else{g.fromTo(l,f,i,!0),k.beforeClearStyles([a]).fromTo(a,.01,1,!0),h.fromTo(a,.01,1,!0);var x=new e;x.addElement(w.querySelector("ion-back-button .button-text")).fromTo(l,m?"-100px":"100px","0px"),q.add(x)}}}if(b){var A=new e;A.addElement(b.querySelector(":scope > ion-content")),A.addElement(b.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),y.add(A),T?A.beforeClearStyles([a]).fromTo(l,i,m?"-100%":"100%"):A.fromTo(l,i,s,!0).fromTo(a,1,c,!0);var J=b.querySelector(":scope > ion-header > ion-toolbar");if(J){var z=new e;z.addElement(J);var M=new e;M.addElement(J.querySelector("ion-title"));var P=new e;P.addElement(J.querySelectorAll("ion-buttons,[menuToggle]"));var R=new e;if(R.addElement(J.querySelector(".toolbar-background")),(E=new e).addElement(J.querySelector("ion-back-button")),z.add(M).add(P).add(E).add(R),y.add(z),E.fromTo(a,.99,0,!0),M.fromTo(a,.99,0,!0),P.fromTo(a,.99,0,!0),T){M.fromTo(l,i,m?"-100%":"100%"),R.beforeClearStyles([a]).fromTo(a,1,.01,!0);var X=new e;X.addElement(J.querySelector("ion-back-button .button-text")),X.fromTo(l,i,(m?-124:124)+"px"),z.add(X)}else M.fromTo(l,i,s).afterClearStyles([d]),E.afterClearStyles([a]),M.afterClearStyles([a]),P.afterClearStyles([a])}}return Promise.resolve(y)}}}]);
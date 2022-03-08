// ==UserScript==
// @name        Gmail Inbox Narrower
// @description Limits the size of inbox to 1200px
// @version     1.2
// @author      icetbr

// @include       https://mail.google.com/*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Gmail_Inbox_Narrower.meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Gmail_Inbox_Narrower.user.js
// ==/UserScript==
/* jshint esversion: 6 */

function GM_addStyle_from_string(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
}
GM_addStyle_from_string(`
  .nH.ar4.z {
    width: 1200px !important;
    margin: 0 auto;
  }
`);


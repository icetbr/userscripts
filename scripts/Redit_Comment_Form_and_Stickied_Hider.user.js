// ==UserScript==
// @name        Redit Comment Form and Stickied Hider
// @description Hides Reddit's comment form and stickied comments
// @version     1.2
// @author      icetbr

// @include       http*://www.reddit.com/**

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Redit_Comment_Form_and_Stickied_Hider.meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Redit_Comment_Form_and_Stickied_Hider.user.js

// ==/UserScript==
/* jshint esversion: 6 */

function GM_addStyle_from_string(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

GM_addStyle_from_string(`
      .commentarea > .usertext, .stickied {
        display: none;
      }
    `);


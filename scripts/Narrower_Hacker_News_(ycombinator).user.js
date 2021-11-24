// ==UserScript==
// @name        Narrower Hacker News (ycombinator)
// @description Forcing width to 30%
// @version     1.1
// @author      icetbr

// @include       https://news.ycombinator.com/*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Narrower_Hacker_News_(ycombinator).meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Narrower_Hacker_News_(ycombinator).user.js
// ==/UserScript==
/* jshint esversion: 6 */

document.getElementById('hnmain').style.width = '30%';
document.getElementById('hnmain').style.minWidth = '0px';


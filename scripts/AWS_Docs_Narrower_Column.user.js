// ==UserScript==
// @name        AWS Docs Narrower Column
// @description Makes text easier to read by not using 100% width
// @version     1.1
// @author      icetbr

// @include       https://docs.aws.amazon.com/*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/AWS_Docs_Narrower_Column.meta.js
// @downloadURL https://openuserjs.org/install/icetbr/AWS_Docs_Narrower_Column.user.js
// ==/UserScript==
/* jshint esversion: 6 */

GM_addStyle_from_string(`
    	#main-column {
    		max-width: 650px !important;
    		margin: auto !important;
    	}
    `);

function GM_addStyle_from_string(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}


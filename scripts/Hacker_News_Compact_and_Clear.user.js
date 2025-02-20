// ==UserScript==
// @name        Hacker News Compact and Clear
// @description Whiter background, narrower, declutered
// @version     1.0.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=news.ycombinator.com
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Hacker_News_Compact_and_Clear.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Hacker_News_Compact_and_Clear.user.js
// @match       https://news.ycombinator.com/*
// @grant       none
// ==/UserScript==
const el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => el('style', { type: 'text/css', textContent: styles }),

    addStyle = styles => document.body.append(style(styles));

addStyle(`
    /* White background and narrower: essential for readability */
    table#hnmain {
        background-color: #ffffff;
        min-width: 700px;
        max-width: 700px;
    }
    td.default {
        width: 600px !important;
    }
    /* accounting for the change in contrast, same color as Medium  */
    .c00 {
        color: #292929;
    }

    /* focus on important stuff: user name to the right, hiding nav commands and reply date */
    td.default span.age, span.navs, a.togg.clicky {
        display: none;
    }
    td[bgcolor="#ff6600"] {
        opacity: 0.2;
    }
    table#hnmain {
        position: relative;
    }
    span.comhead {
        position: absolute;
        display: inline-block;
        left: 700px;
        width: 300px;
    }
    table.fatitem td.title {
        font-weight: 600;
    }

    /* reworked comments spacing */
    td.votelinks {
        padding-top: 3px;
    }
    td.default p {
        margin-top: 12px;
    }
    .c00 {
        line-height: 1.4285714285714286em;
    }
    table.fatitem {
        margin-bottom: -30px;
        position: relative;
    }
    tr.athing.comtr > td > table {
        margin-bottom: -12px;
    }
    div.comment {
        margin-top: -5px;
        margin-bottom: 5px;
    }

    /* less indentation: relying on the vote arrow to differentiate replies */
    td.ind { display: inline-block; }
    td.ind[indent="1"] { width: 15px; }
    td.ind[indent="2"] { width: 30px; }
    td.ind[indent="3"] { width: 45px; }
    td.ind[indent="4"] { width: 60px; }
    td.ind[indent="5"] { width: 75px; }
    td.ind[indent="6"] { width: 90px; }
    td.ind[indent="7"] { width: 105px; }
    td.ind[indent="8"] { width: 120px; }
    td.ind[indent="9"] { width: 135px; }
    td.ind[indent="10"] { width: 150px; }
    td.ind[indent="11"] { width: 165px; }
    td.ind[indent="12"] { width: 180px; }
    td.ind[indent="13"] { width: 195px; }
    td.ind[indent="14"] { width: 210px; }
    td.ind[indent="15"] { width: 225px; }
    /* vertical guide helps identifying indentation level */
    table.comment-tree { border-left: 1px solid #efefef; }
`);

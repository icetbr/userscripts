// ==UserScript==
// @name        Google Cleaner
// @description Moves the top bar (All, Videos, News...) to sidebar, hides "rich search content", old style links
// @version     3.7
// @author      icetbr

// @include       https://www.google.*/search*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Google_Cleaner.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Google_Cleaner.user.js
// ==/UserScript==
/* jshint esversion: 6 */

var head = document.getElementsByTagName('head')[0];

function init() {
    toggleNavBar();
    toggleFiltersBar();
    addLinks();
    cleanGoogle();
    jsCleanGoogle();
}

var isBarVisible = false;
var hideNavBarStyle = style("#top_nav, #appbar {display:none;}");
function toggleNavBar() {
    if (isBarVisible) {
        head.removeChild(hideNavBarStyle);
    } else {
        head.appendChild(hideNavBarStyle);
    }

    isBarVisible = !isBarVisible;
}
function ensureNavBar() {
    if (!isBarVisible) return;
    head.removeChild(hideNavBarStyle);
    isBarVisible = !isBarVisible;
}

var isFiltersBarVisible = false;
var hideFiltersBarStyle = style("#filtersBar {display:none;}");
function toggleFiltersBar() {
    if (isFiltersBarVisible) {
        head.removeChild(hideFiltersBarStyle);
    } else {
        head.appendChild(hideFiltersBarStyle);
    }

    isFiltersBarVisible = !isFiltersBarVisible;
}

function addLinks() {
    var parent = document.getElementById('rcnt');

    createLink({ id: 'bartoggle', style: 'font-size: 11px; top: 95px; left: 23px; position: absolute; z-index: 999', textContent: 'Toggle topbar' }, toggleNavBar, parent);

    createLink({ style: 'font-size: 11px; top: 119px; left: 12px; position: absolute; z-index: 999', textContent: 'Toggle english only' }, toggleEnglishOnly, parent);
    createLink({ style: 'font-size: 11px; top: 140px; left: 33px; position: absolute; z-index: 999', textContent: 'Past year' }, showPastYearPosts, parent);
    createLink({ style: 'font-size: 11px; top: 161px; left: 53px; position: absolute; z-index: 999', textContent: '+' }, toggleFiltersBar, parent);

    var filtersBar = createLink({ id: 'filtersBar', style: 'font-size: 11px; top: 178px; left: 34px; position: absolute; line-height: 18px; z-index: 999' }, null, parent);

    createLink({ textContent: 'Past year' }, showPastYearPosts, filtersBar);
    createLink({ textContent: 'Any time' }, showAnyTimePosts, filtersBar);
    createLink({ textContent: 'Past hour' }, showPastHourPosts, filtersBar);
    createLink({ textContent: 'Past 24 hours' }, showPast24HoursPosts, filtersBar);
    createLink({ textContent: 'Past week' }, showPastWeekPosts, filtersBar);
    createLink({ textContent: 'Past month' }, showPastMonthPosts, filtersBar);
    createLink({ textContent: 'Custom range' }, showCustomRangePosts, filtersBar);
}

function toggleEnglishOnly() {
    const params = new window.URLSearchParams(window.location.search);
    params.has('gl') ? params.delete('gl') : params.set('gl', 'us');
    document.location.href = `?${params.toString()}`;
}

function showPastYearPosts() { doLink("qdr:y"); }
function showAnyTimePosts() { doLink("qdr:"); }
function showPastHourPosts() { doLink("qdr:h"); }
function showPast24HoursPosts() { doLink("qdr:d"); }
function showPastWeekPosts() { doLink("qdr:w"); }
function showPastMonthPosts() { doLink("qdr:m"); }

// this keeps breaking, maybe use parent with jsowner=ow86?
function showCustomRangePosts() {
    ensureNavBar();
    document.querySelectorAll('[jsaction="EEGHee"]')[0].click();
    //document.getElementsByClassName('n5Ug4b')[0].style.display = 'block';

}

function doLink(tbsParam) {
    const params = new window.URLSearchParams(window.location.search);
    params.set('tbs', tbsParam);
    document.location.href = `?${params.toString()}`;
}

function createLink(attrs, onclick, parent) {
    if (!parent) return null;
    var link = div(attrs);
    link.addEventListener("click", onclick, false);
    parent.appendChild(link);
    return link;
}

function div(attrs) {
    return Object.assign(document.createElement('div'), attrs)
}

function style(styles) {
    return Object.assign(document.createElement('style'), { type: 'text/css' }, { textContent: styles });
}

function cleanGoogle() {
    //.XqFnDf class for bar with Overview, Songs, Albuns, etc
    document.body.appendChild(style(`
        /*.ULSxyf,                  Videos and People also Ask sessions */
        .csDOgf, .eFM0qc {        /* tree dots for more info */
           display: none;
        }

        .g {                      /* spacing between search results */
          margin-top: -15px;
        }

        .hlcw0c {                           /* space after hidden sections */
          margin-bottom: 0px !important;
        }

        /* LINKS/TITLE */

        .FxLDp {                  /* sometimes the first entry has an undesired pad */
          padding-left: 0px;
        }

        h3.LC20lb.MBeuO.DKV0Md {  /* force (some) links from side to bellow title */
          display: block;
        }

        .yuRUbf > a {
            position: relative;
            top: -10px;
        }

        .iUh30.tjvcx {
          color: green
        }

        .TbwUpd.NJjxre {
          padding-top: 0px;
          position: inherit;
        }
    `));
}

function jsCleanGoogle() {
    const bres = document.getElementById('bres');
    if (bres.innerText.indexOf('Related searches') > -1) bres.style.display = 'none';

    let blocks = document.getElementsByClassName('cLjAic TzHB6b');
    if (!blocks.length) blocks = document.getElementsByClassName('ULSxyf');

    for (const block of blocks) {
        if (block.innerText.indexOf('Images') === 0) block.style.display = 'none'; // More images?
        else if (block.innerText.indexOf('Videos') === 0) block.style.display = 'none';
        else if (block.innerText.indexOf('People also ask') === 0) block.style.display = 'none';
        else if (block.innerText.indexOf('Twitter Results') === 0) block.style.display = 'none';
        else if (block.innerText.indexOf('Top stories') === 0) block.style.display = 'none';
        else if (block.innerText.indexOf('Related searches') === 0) block.style.display = 'none';
        else {
            //if (block.innerText !== '<empty string>') cleaned = true
            // console.log(block.innerText)
            // console.log('****************************')
        }
    }
}

init();


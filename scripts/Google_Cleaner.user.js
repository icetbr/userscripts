// ==UserScript==
// @name        Google Cleaner
// @description Moves the top bar (All, Videos, News...) to sidebar, hides "rich search content", old style links
// @version     3.7.2
// @author      icetbr

// @include     https://www.google.*/search*
// @icon        https://www.google.com/s2/favicons?domain=google.com

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Google_Cleaner.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Google_Cleaner.user.js
// ==/UserScript==
/* jshint esversion: 6 */

const head = document.querySelectorAll('head')[0];
const { assign } = Object;

const style = styles => assign(document.createElement('style'), { type: 'text/css', textContent: styles });
const div = attrs => assign(document.createElement('div'), attrs);

const createLink = (attrs, onclick, parent) => {
    if (!parent) return null;

    const link = div(attrs);
    link.addEventListener('click', onclick, false);
    parent.append(link);
    return link;
};

const doLink = tbsParameter => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.set('tbs', tbsParameter);
    document.location.href = `?${parameters.toString()}`;
};

let isBarVisible = false;
const hideNavBarStyle = style('#top_nav, #appbar {display:none;}');
const toggleNavBar = () => {
    if (isBarVisible) {
        hideNavBarStyle.remove();
    } else {
        head.append(hideNavBarStyle);
    }

    isBarVisible = !isBarVisible;
};

let isFiltersBarVisible = false;
const hideFiltersBarStyle = style('#filtersBar {display:none;}');
const toggleFiltersBar = () => {
    if (isFiltersBarVisible) {
        hideFiltersBarStyle.remove();
    } else {
        head.append(hideFiltersBarStyle);
    }

    isFiltersBarVisible = !isFiltersBarVisible;
};

const toggleEnglishOnly = () => {
    const parameters = new window.URLSearchParams(window.location.search);
    parameters.has('gl') ? parameters.delete('gl') : parameters.set('gl', 'us');
    document.location.href = `?${parameters.toString()}`;
};

const showPastYearPosts         = () => doLink('qdr:y');
const showAnyTimePosts          = () => doLink('qdr:');
const showPastHourPosts         = () => doLink('qdr:h');
const showPast24HoursPosts      = () => doLink('qdr:d');
const showPastWeekPosts         = () => doLink('qdr:w');
const showPastMonthPosts        = () => doLink('qdr:m');

const ensureNavBar = () => {
    if (!isBarVisible) return;

    hideNavBarStyle.remove();
    isBarVisible = !isBarVisible;
};

// This keeps breaking, maybe use parent with jsowner=ow86?
const showCustomRangePosts = () => {
    ensureNavBar();
    document.querySelectorAll('[jsaction="EEGHee"]')[0].click();
    // Document.getElementsByClassName('n5Ug4b')[0].style.display = 'block';
};

const cleanGoogle = () => {
    document.body.append(style(`
        /*.ULSxyf,                          Videos and People also Ask sessions */
        .csDOgf, .eFM0qc {                  /* tree dots for more info */
           display: none;
        }

        .g {                                /* spacing between search results */
          margin-top: -20px;
        }

        .hlcw0c {                           /* space after hidden sections */
          margin-bottom: 0px !important;
        }

        /* LINKS/TITLE */

        .FxLDp {                             /* sometimes the first entry has an undesired pad */
          padding-left: 0px;
        }

        h3.LC20lb.MBeuO.DKV0Md {            /* force (some) links from side to bellow title */
          display: block;
        }

        .yuRUbf > a {
            position: relative;
            top: -10px;
        }

        .qLRx3b.tjvcx {
          color: green
        }

        .TbwUpd.NJjxre {
          padding-top: 0px;
          position: inherit;
        }
    `));
};

const needsHiding = text =>
    text.startsWith('Images') ||
    text.startsWith('Videos') ||
    text.startsWith('People also ask') ||
    text.startsWith('Twitter results') ||
    text.startsWith('Top stories') ||
    text.startsWith('Related searches') ||
    text.trim().split('\n')[0].endsWith(' - YouTube');

let hiddenSections;
const hideUndesiredSections = section => {
    if (!needsHiding(section.innerText)) return;

    hiddenSections.push(section);
    section.style.display = 'none';
};

const jsCleanGoogle = () => {
    hiddenSections = [];
    const bres = document.querySelector('#bres');
    if (bres.innerText.includes('Related searches')) {
        bres.style.display = 'none';
    }

    document.querySelectorAll('.cLjAic.TzHB6b').forEach(hideUndesiredSections);
    document.querySelectorAll('.ULSxyf').forEach(hideUndesiredSections);
};

const addLinks = () => {
    const parent = document.querySelector('#rcnt');

    createLink({ id: 'bartoggle', style: 'font-size: 11px; top: 95px; left: 23px; position: absolute; z-index: 999', textContent: 'Toggle topbar' }, toggleNavBar, parent);

    createLink({ style: 'font-size: 11px; top: 119px; left: 12px; position: absolute; z-index: 999', textContent: 'Toggle english only' }, toggleEnglishOnly, parent);
    createLink({ style: 'font-size: 11px; top: 140px; left: 33px; position: absolute; z-index: 999', textContent: 'Past year' }, showPastYearPosts, parent);
    createLink({ style: 'font-size: 11px; top: 161px; left: 53px; position: absolute; z-index: 999', textContent: '+' }, toggleFiltersBar, parent);

    const filtersBar = createLink({ id: 'filtersBar', style: 'font-size: 11px; top: 178px; left: 34px; position: absolute; line-height: 18px; z-index: 999' }, null, parent);

    createLink({ textContent: 'Past year' }, showPastYearPosts, filtersBar);
    createLink({ textContent: 'Any time' }, showAnyTimePosts, filtersBar);
    createLink({ textContent: 'Past hour' }, showPastHourPosts, filtersBar);
    createLink({ textContent: 'Past 24 hours' }, showPast24HoursPosts, filtersBar);
    createLink({ textContent: 'Past week' }, showPastWeekPosts, filtersBar);
    createLink({ textContent: 'Past month' }, showPastMonthPosts, filtersBar);
    createLink({ textContent: 'Custom range' }, showCustomRangePosts, filtersBar);
};

const init = () => {
    toggleNavBar();
    toggleFiltersBar();
    cleanGoogle();
    jsCleanGoogle();
    addLinks();
};

init();

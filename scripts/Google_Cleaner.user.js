// ==UserScript==
// @name        Google Cleaner
// @description Declutter, focus on most used actions, collapses seldom used ones, easier title scanning.
// @version     3.10.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=google.com
// @include     https://www.google.*/search*
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Google_Cleaner.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Google_Cleaner.user.js
// @match       <all_urls>
// @grant       none
// ==/UserScript==
var style1 = /*css*/`

h3.LC20lb.MBeuO.DKV0Md      { margin-top: -15px;                  } /* spacing between search results */

div[id^='eob_']             { display: none;                      } /* People also search for */
.hlcw0c                     { margin-bottom: 0px !important;      } /* space after hidden sections */
.logo                       { left: -193px;                       } /* align logo with sidebar */

/* LINKS/TITLE */
.FxLDp                      { padding-left: 0;                    } /* sometimes the first entry has an undesired pad */
h3.LC20lb.MBeuO.DKV0Md      { display: block;                     } /* force (some) links from side to bellow title */
.yuRUbf > a                 { position: relative; top: -13px;     }
.tjvcx                      { color: green; font-size: 14px;    } /* link */
.TbwUpd.NJjxre              { margin-top: -2px; padding-top: 0;
                              position: inherit;                  } /* link bellow title */
.H9lube, .VuuXrf            { display: none;                      } /* hide icon and title */
[jscontroller="exgaYe"]     { display: none;                      } /* 3 dots actions hide icon and title */
.Z26q7c.UK95Uc.jGGQ5e       { margin-bottom: -4px;                }



`;

const el = (name, attrs) => {
        var $e = document.createElement(name);

        for (let prop in attrs) {
            $e.setAttribute(prop, attrs[prop]);
        }

        return $e;
    },

    el3 = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => Object.assign(el('style', { type: 'text/css' }), { textContent: styles }),

    addStyle = styles => document.body.append(style(styles));

const head = document.querySelectorAll('head')[0];

const createLink = (attrs, onclick, parent) => {
    if (!parent) return null;

    const link = el3('div', attrs);
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
const hideNavBarStyle = style('#top_nav, #appbar, .rfiSsc {display:none;}');
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

const showCustomRangePosts = () => {
    ensureNavBar();
    document.querySelectorAll('[jsaction="EEGHee"]')[0].click();

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
    document.querySelectorAll('.cUnQKe').forEach(hideUndesiredSections);
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
    addStyle(style1);
    jsCleanGoogle();
    addLinks();
};

init();

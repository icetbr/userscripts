// ==UserScript==
// @name        Clearer EffectiveAltruism.org Forum
// @description More familiar, clean and compact forum UX, with an improved topics organization
// @version     0.8.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=effectivealtruism.org
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Clearer_EffectiveAltruism.org_Forum.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Clearer_EffectiveAltruism.org_Forum.user.js
// @match       https://forum.effectivealtruism.org/*
// @grant       none
// ==/UserScript==
var style$1 = /*css*/`

.Layout-main, body                { background-color: #fff; }
.NavigationStandalone-sidebar     { padding-top: 0; }
.Layout-main                      { margin-top: -140px; z-index: 2000; }
.Header-appBar, .PostsList2-posts { box-shadow: unset; }
.PostsItem2-bottomBorder          { border-bottom: unset; line-height: 1.4rem; }
.PostsTitle-root                  { font-size: 1.0rem; line-height: 1.0rem; word-break: break-all; }
.PostsItem2-postsItem             { padding-top: 0; padding-bottom: 2px; }
.PostsItem2-author                { margin-right: 0; max-width: 100px; }
.PostsItem2MetaInfo-metaInfo      { font-size: 0.8rem; }
.PostsItem2-title                 { overflow: visible; padding-bottom: 6px; }
.PostsItemIcons-iconSet           { position: absolute; left: -60px; }
.LWPopper-default                 { display: none; }

.PostsItem2-postsItem { padding-bottom: 0px; margin-bottom: -2px }
.PostsTitle-root { font-size: 12px; color: rgb(34, 34, 34); font-family: verdana, arial, helvetica, sans-serif; }

`;

const el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => el('style', { type: 'text/css', textContent: styles }),

    addStyle = styles => document.body.append(style(styles));

addStyle(style$1);

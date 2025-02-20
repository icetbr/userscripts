// ==UserScript==
// @name        Clearer EffectiveAltruism.org Forum
// @description More familiar, clean and compact forum UX, with an improved topics organization
// @version     0.8.4
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
.Layout-main                      { margin-top: -140px; z-index: 1301; }
.Header-appBar, .PostsList2-posts { box-shadow: unset; }
.PostsItem2-bottomBorder          { border-bottom: unset; line-height: 1.4rem; }
.PostsTitle-root                  { font-size: 1.0rem; line-height: 1.0rem; word-break: break-all; display: contents; }
.PostsItem2-postsItem             { padding-top: 0; padding-bottom: 2px; }
.PostsItem2-author                { margin-right: 0; max-width: 100px; }
.PostsItem2MetaInfo-metaInfo      { font-size: 0.8rem; }
.PostsItem2-title                 { overflow: visible; padding-bottom: 6px; }
.PostsItemIcons-iconSet           { position: absolute; left: -60px; }
.LWPopper-default.LWPopper-noMouseEvents                 { display: none; }
/* .Header-headroom .headroom        { z-index: unset; } */

.PostsItem2-postsItem { padding-bottom: 0px; margin-bottom: -2px }
.PostsTitle-root { font-size: 12px; color: rgb(34, 34, 34); font-family: verdana, arial, helvetica, sans-serif; display: contents;}

/* Individual Posts */
.ToCColumn-header, .PostsPagePostHeader-header {
  z-index: 1301;
}

.MuiModal-root {
  z-index: 1310
}

.PostsPagePostFooter-footerSection {
  display: none;
}
.PingbacksList-list, .PingbacksList-loadMore {
  display:none;
}

.PingbacksList-title:hover ~ .PingbacksList-list,
.PingbacksList-title:hover ~ .PingbacksList-loadMore {
   display:block;
}

.CommentsNewForm-root { display: none }

.CommentsListSection-newCommentLabel:hover ~ .CommentsNewForm-root {
   display:block;
}

.CommentsNewForm-root:hover, .CommentsNewForm-root:focus-within {
  display: block;
}

PostsPagePostFooter-footerTagList {
  margin-bottom: 0;
}

.CommentsListSection-newComment, .CommentFrame-node {
  border: unset;
}
/* .CommentsItem-body .CommentsListSection-root */
.ContentStyles-commentBody * {
  font-family: verdana, arial, helvetica, sans-serif !important;
  line-height: 20px;
/*   font-size: 14px; */
  width: 600px;
  hyphens: auto;
/*   font-weight: 400px; */
/*   line-height: 17.15px; */
}

.comments-node-even {
  background-color: white;
}

`;

const el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => el('style', { type: 'text/css', textContent: styles }),

    addStyle = styles => document.body.append(style(styles));

addStyle(style$1);

// ==UserScript==
// @name        Gmail Persistent Sidebar
// @description Keeps email, chat and spaces sidebar always visible.
// @version     1.0.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=gmail.com
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/GmailPersistentSidebar.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/GmailPersistentSidebar.user.js
// @match       https://mail.google.com/*
// @grant       none
// ==/UserScript==
var style$1 = /*css*/`

div[role=navigation]:before {
  background-color: unset;
}

div[role=navigation] {
  background-color: unset !important;
  top: -25px;
  position: absolute;
}

div[jscontroller=F3Q5Qb] div[role=heading] {
  display: none;
}

div[jscontroller=FZ9aJ],
div[jscontroller=m50PKc],
div[jscontroller=m3Afm] {
  display: none;
}

.nH.aqk.aql.bkL {
  display: grid;
  grid-template-columns: 0 250px auto 0;
  grid-template-rows: 75px 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  /*! overflow: hidden; */
}

div[role=navigation] { grid-area: 1 / 1 / 4 / 2; }
div[jscontroller=nwtiKd] { grid-area: 1 / 2 / 2 / 3; }
div[jscontroller=Px22Mb] { grid-area: 2 / 2 / 3 / 3; }
div[jscontroller=RhNKdd] { grid-area: 3 / 2 / 4 / 3; }
.nH.bkK { grid-area: 1 / 3 / 4 / 4; }
.nH.aUx { grid-area: 1 / 4 / 4 / 5; }


/* chat/space/email buttons */
div[jsname=Sz79uf], div[jscontroller=eIu7Db] {
  height: 39px  !important;
  background-color: transparent !important;
  font-weight: bold  !important;
}

.aic {
  height: 40px;
}

/* email don't know what */
.nM > :first-child {
  display: none;
}

`;

const $  = (selector, parent = document) => parent.querySelector(selector),

    el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => el('style', { type: 'text/css', textContent: styles }),

    addStyle = styles => document.body.append(style(styles)),

    waitForEl = selector => new Promise(resolve => {
        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver(() => {
            if (!$(selector)) return;

            resolve($(selector));
            observer.disconnect();
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return observer;
    });

addStyle(style$1);

var keepVisible = el => () => !el.classList.contains('apV') && el.classList.add('apV');
var observe = el => new MutationObserver(keepVisible(el)).observe(el, { attributes: true });

waitForEl('div[jscontroller=nwtiKd]').then(observe);
waitForEl('div[jscontroller=Px22Mb]').then(observe);
waitForEl('div[jscontroller=RhNKdd]').then(observe);

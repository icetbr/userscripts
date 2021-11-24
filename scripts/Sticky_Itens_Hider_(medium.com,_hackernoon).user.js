// ==UserScript==
// @name        Sticky Itens Hider (medium.com, hackernoon)
// @description Hides medium.com and hackernoon.com footer, header, sidebar and letterbox
// @version     2.3
// @author      icetbr

// @match       https://medium.com/*
// @match       https://hackernoon.com*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Sticky_Itens_Hider_(medium.com,_hackernoon).meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Sticky_Itens_Hider_(medium.com,_hackernoon).user.js
// ==/UserScript==
/* jshint esversion: 6 */

const hackernoonFixedItens = '.Header__Layout-le0go0-0';
const mediumFixedItens = '.branch-journeys-top'

const fixedItens = document.querySelectorAll(`${hackernoonFixedItens},${mediumFixedItens}`);
const hackernoonNewsletterBox = [].filter.call(document.querySelectorAll('figure'), elem => elem.querySelector('.iframeContainer'));

const itensToHide = hackernoonNewsletterBox.concat([...fixedItens]);
itensToHide.forEach(itemToHide => itemToHide.style.display = 'none');


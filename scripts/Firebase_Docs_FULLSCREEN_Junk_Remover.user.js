// ==UserScript==
// @name        Firebase Docs FULLSCREEN Junk Remover
// @description Makes it easier for smallscreens to read it by hiding the site header, footer and rearranging other elements like some navigation bars
// @version     1.1
// @author      icetbr

// @include       https://firebase.google.com/docs/**
// @include       https://cloud.google.com/**

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Firebase_Docs_FULLSCREEN_Junk_Remover.meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Firebase_Docs_FULLSCREEN_Junk_Remover.user.js
// ==/UserScript==
/* jshint esversion: 6 */

document.getElementsByClassName('devsite-top-section')[0].style.display = 'none';
document.getElementsByClassName('devsite-footer-linkboxes')[0].style.display = 'none';
document.getElementsByClassName('devsite-utility-footer')[0].style.display = 'none';

const nav1 = document.getElementsByClassName('devsite-section-nav')[0];
reparent(nav1);

const nav2 = document.getElementsByClassName('devsite-page-nav')[0];
nav2.style.right = '0';
reparent(nav2);


const article = document.getElementsByClassName('devsite-article')[0];
reparent(article);


function reparent(element) {
  element.style.position = 'absolute';
  element.style.top = '0';
  element.style.maxHeight = '999999px';
  document.body.appendChild(element);

  var new_element = document.createElement('id'),
    old_attributes = element.attributes,
    new_attributes = new_element.attributes;

  // copy attributes
  for (var i = 0, len = old_attributes.length; i < len; i++) {
    new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
  }

  // copy child nodes
  do {
    new_element.appendChild(element.firstChild);
  }
  while (element.firstChild);

  // replace element
  element.parentNode.replaceChild(new_element, element);
}


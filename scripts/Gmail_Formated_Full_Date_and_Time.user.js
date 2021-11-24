// ==UserScript==
// @name        Gmail Formated Full Date and Time
// @description Shows the full date and time on the mail list instead of only short date. Useful if you need to create a report and you base on your activity and it's timing. Or when you look at mails and want to find one visually by looking on
// @version     1.0
// @author      icetbr

// @include       https://mail.google.com/mail/*

// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Gmail_Formated_Full_Date_and_Time.meta.js
// @downloadURL https://openuserjs.org/install/icetbr/Gmail_Formated_Full_Date_and_Time.user.js
// ==/UserScript==
/* jshint esversion: 6 */

var formatDate = function (dateString) {
    var dateTime = new Date(dateString);
    var date = dateTime.toISOString().split('T')[0];
    var time = dateTime.toTimeString().substr(0, 5);
    return `${date} ${time}`;
};

(function () {
    window.setInterval(function () {
        var date_titles_main = Array.from(document.getElementsByClassName("xW xY"));
        var date_titles_thread = Array.from(document.getElementsByClassName("g3"));
        date_titles_main.forEach(function (element, index, array) {
            var elements = element.childNodes;
            var title = elements.length > 0 ? elements[0].title : false;
            if (title) {
                title = formatDate(title);
            }
            if (title && elements[0].innerHTML != title) { elements[0].innerHTML = title; }
        });
        date_titles_thread.forEach(function (element, index, array) {
            if (element.title && element.innerHTML != element.title) { element.innerHTML = formatDate(element.title); }
        });
        Array.from(document.getElementsByClassName("xX")).forEach(function (element, index, array) {
            element.style.width = '20ex';
        });
    }, 2000);
})();


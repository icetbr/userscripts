// ==UserScript==
// @name        Google Cleaner
// @description Old style search results for easier title scanning and faster access to common search filters.
// @version     4.0.0
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

const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => p.querySelectorAll(s), toggle = (el) => el.style.display = el.style.display === 'none' ? '' : 'none', append = (el, html) => el.insertAdjacentHTML('beforeend', html), prepend = (el, html) => el.insertAdjacentHTML('afterbegin', html), addCss = (css) => append(document.body, `<style>${css}</style>`); // needs to be body to ovewrite page's style

const
    css = `
        #gc-links                   { display: flex; flex-direction: column; gap: 8px; align-items: center; font-size: 11px; position: absolute; top: 95px; left: 37px; z-index: 999 }
        #gc-links > *               { all: unset; cursor: pointer; }
        #gc-filtersbar              { display: flex; flex-direction: column; gap: 6px; margin-left: 18px; }
        #gc-filtersbar > *          { all: unset; cursor: pointer; }
        #gc-toggleTopbar            { padding-bottom: 4px; }

        .logo                       { left: -193px;                       } /* align logo with sidebar */
        .zLSRge                     { border: none !important;            } /* grey line bellow navigation bar */
        #taw                        { position: relative; z-index: 1;     } /* prevents "did you mean" from being cropped */


        .MjjYud                     { margin-top: -30px;                  } /* spacing between search results */
        .yuRUbf                     { line-height: 0.58;                  }

        .B6fmyf.Mg1HEd              { display: none;                      } /* three dots menu in each link */
        a[jsname='UWckNb'] > div    { position: inherit;                  } /* link bellow title */

        .tjvcx                      { color: green; font-size: 14px;      } /* link */
        .H9lube, .VuuXrf, .DDKf1c   { display: none;                      } /* hide link icon and title */
    `,

    toggleTopbar = () => $$('#top_nav, #appbar, .rfiSsc, .caNvfd').forEach(toggle),

    toggleFiltersbar = () => toggle($('#gc-filtersbar')),

    addLinks = () => {
        const
            toggleEnglishOnly = () => {
                const p = new URLSearchParams(location.search);
                p.has('gl') ? p.delete('gl') : p.set('gl', 'us');
                return `?${p}`
            },
            doLink = tbsParameter => {
                const p = new URLSearchParams(location.search);
                p.set('tbs', tbsParameter);
                return `?${p}`
            },
            showPast3YearsPosts = () => {
                const d = new Date();
                let minDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2}`;
                return doLink(`cdr:1,cd_min:${minDate},cd_max:`)
            },
            prependLink = qParameter => {
                const p = new URLSearchParams(location.search);
                const query =
                    p.get('q')
                    .replace(/\s*site:.*\s*/, '')
                    .concat(' ' + qParameter);

                p.set('q', query);
                return `?${p}`
            };

        prepend(document.body, `
            <div id='gc-links'>
                <button id="gc-toggleTopbar">Toggle topbar</button>
                <a href="${toggleEnglishOnly()}">Toggle english only</a>
                <a href="${doLink('qdr:y')}">Past year</a>
                <a href="${showPast3YearsPosts()}">Past 3 years</a>
                <a href="${prependLink('site:news.ycombinator.com')}">Hackernews</a>
                <a href="${prependLink('site:reddit.com')}">Reddit</a>
                <button id="gc-toggleFiltersbar">+</button>

                <div id='gc-filtersbar'>
                    <a href="${doLink('qdr:')}">Any time</a>
                    <a href="${doLink('qdr:h')}">Past hour</a>
                    <a href="${doLink('qdr:d')}">Past 24 hours</a>
                    <a href="${doLink('qdr:w')}">Past week</a>
                    <a href="${doLink('qdr:m')}">Past month</a>
                </div>
            </div>
        `);
        $('#gc-toggleTopbar').addEventListener('click', toggleTopbar);
        $('#gc-toggleFiltersbar').addEventListener('click', toggleFiltersbar);
    },

    showRealUrls = () => {
        $$('cite').forEach(e => {
            const url = (e.innerHTML.startsWith('http') ? e.innerHTML : e.closest('a')?.href || '').replace('https://', '').replace('www.', '');
            if (!url) return;
            const breadcrumb = `<span class="ylgVCe ob9lvb" role="text"> › ${e.innerHTML}</span>`;

            e.innerHTML =
                e.innerHTML.startsWith('http')      ? url :
                url.startsWith('reddit.com')        ? url.substring(0, url.indexOf('/comments')) + breadcrumb :
                url.startsWith('youtube.com')       ? 'youtube.com' + breadcrumb :
                url.startsWith('stackoverflow.com') ? 'stackoverflow.com' + breadcrumb :
                                                      url + breadcrumb;
        });
    };

if (!document.title.includes('Google Shopping')) {
    addCss(css);
    addLinks();
    toggleTopbar();
    toggleFiltersbar();
    showRealUrls();
}

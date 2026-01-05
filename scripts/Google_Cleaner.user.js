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



const assign = Object.assign,
    isPlainObject = (o) => o?.constructor === Object;

const $ = (s, p = document) => p.querySelector(s),
    $$ = (s, p = document) => p.querySelectorAll(s),
    toggle = (el) => (el.style.display = el.style.display === "none" ? "" : "none"),
    h = new Proxy(
        {},
        {
            get:
                (_, tag) =>
                (propsOrChild, ...children) => {
                    const isProps = isPlainObject(propsOrChild);
                    const el = assign(document.createElement(tag), isProps ? propsOrChild : {});
                    el.append(...(isProps ? children : [propsOrChild, ...children]));
                    return el;
                },
        },
    ),
    //@ts-expect-error
    addCss = (css) => document.body.append(h.style(css)); // needs to be body to ovewrite page's style
// const { div, a } = h;
// const myDiv = div({ id: 'main' }, a('Click me'));
// const noProps = div('Just text')

const { div, button, a, span } = h;

const css = `
        #gc-links                   { display: flex; flex-direction: column; gap: 8px; align-items: center; font-size: 11px; position: absolute; top: 95px; left: 37px; z-index: 999 }
        #gc-links :is(a, button)    { all: unset; cursor: pointer; &:hover { text-decoration: underline }}
        #gc-links > :first-child    { padding-bottom: 4px; }
        #gc-filtersbar              { display: flex; flex-direction: column; gap: 6px; margin-left: 18px; }

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
    toggleTopbar = () => $$("#top_nav, #appbar, .rfiSsc, .caNvfd").forEach(toggle),
    toggleFiltersbar = () => toggle($("#gc-filtersbar")),
    addLinks = () => {
        const toggleEnglishOnly = () => {
                const p = new URLSearchParams(location.search);
                p.has("gl") ? p.delete("gl") : p.set("gl", "us");
                return `?${p}`;
            },
            doLink = (tbsParameter) => {
                const p = new URLSearchParams(location.search);
                p.set("tbs", tbsParameter);
                return `?${p}`;
            },
            showPast3YearsPosts = () => {
                const d = new Date();
                let minDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2}`;
                return doLink(`cdr:1,cd_min:${minDate},cd_max:`);
            },
            prependLink = (qParameter) => {
                const p = new URLSearchParams(location.search);
                const query = p
                    .get("q")
                    .replace(/\s*site:.*\s*/, "")
                    .concat(" " + qParameter);

                p.set("q", query);
                return `?${p}`;
            };

        document.body.append(
            div(
                { id: "gc-links" },
                button({ onclick: toggleTopbar }, "Toggle topbar"),
                a({ href: toggleEnglishOnly() }, "Toggle english only"),
                a({ href: doLink("qdr:y") }, "Past year"),
                a({ href: showPast3YearsPosts() }, "Past 3 years"),
                a({ href: prependLink("site:news.ycombinator.com") }, "Hackernews"),
                a({ href: prependLink("site:reddit.com") }, "Reddit"),
                button({ onclick: toggleFiltersbar }, "+"),

                div(
                    { id: "gc-filtersbar" },
                    a({ href: doLink("qdr:") }, "Any time"),
                    a({ href: doLink("qdr:h") }, "Past hour"),
                    a({ href: doLink("qdr:d") }, "Past 24 hours"),
                    a({ href: doLink("qdr:w") }, "Past week"),
                    a({ href: doLink("qdr:m") }, "Past month"),
                ),
            ),
        );
    },
    showRealUrls = () => {
        $$("cite").forEach((e) => {
            const url = (e.textContent.startsWith("http") ? e.textContent : e.closest("a")?.href || "")
                .replace("https://", "")
                .replace("www.", "");
            if (!url) return;
            const breadcrumb = span({ className: "ylgVCe ob9lvb", role: "text" }, ` › ${e.textContent}`);

            const newNodes =
                e.textContent.startsWith("http") ? [url]
                : url.startsWith("reddit.com") ? [url.split("/comments")[0], breadcrumb]
                : url.startsWith("youtube.com") ? ["youtube.com", breadcrumb]
                : url.startsWith("stackoverflow.com") ? ["stackoverflow.com", breadcrumb]
                : [url, breadcrumb];
            e.textContent = "";
            newNodes.forEach((n) => e.append(n)); // needs to append one at a time because otherwise the DomNode is casted to a string
        });
    };

if (!document.title.includes("Google Shopping")) {
    addCss(css);
    addLinks();
    toggleTopbar();
    toggleFiltersbar();
    showRealUrls();
}

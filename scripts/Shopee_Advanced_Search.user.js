// ==UserScript==
// @name        Shopee Advanced Search
// @description Filter search results containing ALL specified words, supporting word exclusion
// @version     1.0.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=shopee.com.br
// @include     https://shopee.*/*
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Google_Cleaner.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Google_Cleaner.user.js
// @grant       none
// ==/UserScript==
const $ = document.querySelector.bind(document),

    $$ = document.querySelectorAll.bind(document),

    el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    toBase64 = svg => `data:image/svg+xml;base64,${window.btoa(svg)}`,

    toSearcheable = string => string
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, ""),

    waitForElm = selector => new Promise(resolve => {
        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver(() => {
            if (!$(selector)) return;

            resolve($(selector));
            observer.disconnect();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }),

    onFetch = (fn, url = 'any') => {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.initiatorType === "fetch" && (url === 'any' || url === entry.name)) {

                    fn();
                    return;
                }
            }
        });

        observer.observe({ entryTypes: ["resource"] });
    };

const split = value => value ? value.split(' ') : [];

const filterIconSvg = `
    <svg width="26px" height="26px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor">
            <path d="m4.5 7.5h12"/>
            <path d="m6.5 10.5h8"/>
            <path d="m8.5 13.5h4"/>
        </g>
    </svg>`;

const filter = ($searchedWordsInput, $excludedWordsInput) => () => {
    const $products = Array.from($$('.shopee-search-item-result__item'));
    const searchedWords = split(toSearcheable($searchedWordsInput.value));
    const excludedWords = split(toSearcheable($excludedWordsInput.value));

    const lacksAllSearchedWords = element => !searchedWords.every(w => element.dataset.searcheableText.includes(w));
    const hasAnyExcludedWords = element => excludedWords.some(w => element.dataset.searcheableText.includes(w));

    const withSearcheableText = el => (el.dataset.searcheableText = toSearcheable(el.textContent), el);

    const toggleHidden = (count, el) => {
        if (lacksAllSearchedWords(el) || hasAnyExcludedWords(el)) {
            el.style.display = 'none';
            count++;
        } else {
            el.style.display = 'block';
        }
        return count;
    };

    const $loadedProducts = $products.filter(p => p.textContent);
    const hiddenCount = $loadedProducts
        .map(withSearcheableText)
        .reduce(toggleHidden, 0);

    const excludedMsg = excludedWords.length ? ` -'${excludedWords.join(' ')}'` : '';
    console.log(`${$products.length} products, ${$loadedProducts.length} loaded, ${hiddenCount} hidden for '${searchedWords.join(' ')}'${excludedMsg}`);
};

const enable = ($searchbar) => {
    console.log('shopee filter enabled');

    const $searchedWordsInput = $('.shopee-searchbar-input__input');
    const $excludedWordsInput = el('input', { placeholder: 'excluir palavras', onkeyup: function(e) { if (e.key === 'Enter') filterProducts(); }  });
    const filterProducts = filter($searchedWordsInput, $excludedWordsInput);

    const $filterButton = el('button', {
        type: 'button',
        onclick: filterProducts,
        style: `
            background: no-repeat url(${toBase64(filterIconSvg)});
            padding: 13px;
            margin-top: 3px;
            border: none;
        `
    });

    onFetch(filterProducts, 'https://shopee.com.br/__t__');

    $searchbar.appendChild($excludedWordsInput);
    $searchbar.appendChild($filterButton);
    $searchbar.appendChild($turnOffButton);
};

waitForElm('.shopee-searchbar-input').then(enable);

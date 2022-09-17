// ==UserScript==
// @name        Shopee Advanced Search
// @description Filter search results containing ALL specified words, supporting word exclusion
// @version     1.0.1
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=shopee.com.br
// @include     https://shopee.*/*
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Shopee_Advanced_Search.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Shopee_Advanced_Search.user.js
// @grant       none
// ==/UserScript==
const
    $  = (selector, parent = document) => parent.querySelector(selector),

    $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

    el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    toBase64 = svg => `data:image/svg+xml;base64,${window.btoa(svg)}`,

    toSearcheable = string => string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, ''),

    isBrazil = () => window.location.hostname.endsWith('.br');

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
    const $products = $$('.shopee-search-item-result__item');
    const searchedWords = split(toSearcheable($searchedWordsInput.value));
    const excludedWords = split(toSearcheable($excludedWordsInput.value));

    const lacksAllSearchedWords = element => !searchedWords.every(w => element.dataset.searcheableText.includes(w));
    const hasAnyExcludedWords = element => excludedWords.some(w => element.dataset.searcheableText.includes(w));

    const withSearcheableText = el => {
        el.dataset.searcheableText = toSearcheable(el.querySelector('.Cve6sh')?.textContent ?? '');
        return el;
    };

    const toggleHidden = (count, el) => {
        if (lacksAllSearchedWords(el) || hasAnyExcludedWords(el)) {
            el.style.display = 'none';
            count++;
        } else {
            el.style.display = 'block';
        }
        return count;
    };

    const $loadedProducts = $products
        .map(withSearcheableText)
        .filter(p => p.dataset.searcheableText);

    const hiddenCount = $loadedProducts.reduce(toggleHidden, 0);

    const excludedMsg = excludedWords.length ? ` -'${excludedWords.join(' ')}'` : '';
    console.log(`${$products.length} products, ${$loadedProducts.length} loaded, ${hiddenCount} hidden for '${searchedWords.join(' ')}'${excludedMsg}`);
};

let filterProducts;
const enable = () => {
    const $searchBar = $('.shopee-searchbar-input');
    if (!$searchBar || $searchBar.querySelector('#excludedWords')) return;

    console.log('shopee filter enabled');

    const $searchedWordsInput = $('.shopee-searchbar-input__input');
    const $excludedWordsInput = el('input', { id: 'excludedWords', placeholder: isBrazil() ? 'excluir palavras' : 'exclude words', onkeyup: function(e) { if (e.key === 'Enter') filterProducts(); } });
    filterProducts = filter($searchedWordsInput, $excludedWordsInput);

    const $filterButton = el('button', {
        type: 'button',
        onclick: filterProducts,
        style: `
            background: no-repeat url(${toBase64(filterIconSvg)});
            padding: 13px;
            margin-top: 3px;
            border: none;
        `,
    });

    $searchBar.appendChild($excludedWordsInput);
    $searchBar.appendChild($filterButton);
};

const observer = new MutationObserver(() => {
    enable();
    filterProducts && filterProducts();
});
observer.observe(document.body, { childList: true, subtree: true });

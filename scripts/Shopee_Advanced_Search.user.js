// ==UserScript==
// @name        Shopee Advanced Search
// @description Filter search results containing ALL specified words, supporting word exclusion and minimum sold.
// @version     1.1.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=shopee.com.br
// @include     https://shopee.*/*
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/Shopee_Advanced_Search.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/Shopee_Advanced_Search.user.js
// @match       <all_urls>
// @grant       none
// ==/UserScript==
const $  = (selector, parent = document) => parent.querySelector(selector),

    $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

    el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    toBase64 = svg => `data:image/svg+xml;base64,${window.btoa(svg)}`,

    toSearchable = string => string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, ''),

    isBrazil = () => window.location.hostname.endsWith('.br'),

    onMutation = fn => new MutationObserver(fn)
        .observe(document.body, { childList: true, subtree: true });

const split = value => value ? value.split(' ') : [];

const filterIconSvg = `
    <svg width="26px" height="26px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor">
            <path d="m4.5 7.5h12"/>
            <path d="m6.5 10.5h8"/>
            <path d="m8.5 13.5h4"/>
        </g>
    </svg>`;

    const filter = ($searchedWordsInput, $excludedWordsInput, $minimumSoldInput) => () => {
        const $products = $$('.shopee-search-item-result__item');
        const searchedWords = split(toSearchable($searchedWordsInput.value));
        const excludedWords = split(toSearchable($excludedWordsInput.value));
        const minimumSold = parseInt($minimumSoldInput.value);

        const lacksAllSearchedWords = element => !searchedWords.every(w => element.dataset.searchableText.includes(w));
        const hasAnyExcludedWords = element => excludedWords.some(w => element.dataset.searchableText.includes(w));
        const hasSoldLessThan = element => element.dataset.soldCount < minimumSold;

        const withSearchableText = el => {
            el.dataset.searchableText = toSearchable($('.Cve6sh', el)?.textContent ?? '');
            return el;
        };

        const withSoldCount = el => {
            const soldCountText = $('.r6HknA.uEPGHT', el)?.textContent;
            el.dataset.soldCount = soldCountText?.includes('mil') ? 1000 : parseInt(soldCountText);
            return el;
        };

        const toggleHidden = (counts, el) => {
            if (lacksAllSearchedWords(el) || hasAnyExcludedWords(el)) {
                el.style.display = 'none';
                counts[0]++;
            } else if (!isNaN(minimumSold) && hasSoldLessThan(el)){
                el.style.display = 'none';
                counts[1]++;
            } else {
                el.style.display = 'block';
            }
            return counts;
        };

        let $loadedProducts = $products
            .map(withSearchableText)
            .filter(p => p.dataset.searchableText);
        if (!isNaN(minimumSold)) {
            $loadedProducts.map(withSoldCount);
        }

        const hiddenCounts = $loadedProducts.reduce(toggleHidden, [0, 0]);

        const excludedMsg = excludedWords.length ? ` -'${excludedWords.join(' ')}'` : '';
        console.log(
            $products.length + ' products, ' +
            $loadedProducts.length + ' loaded, ' +
            `${hiddenCounts[0]} hidden for '${searchedWords.join(' ')}'${excludedMsg},` +
            `${hiddenCounts[1]} hidden for less than ${minimumSold} sold`
        );
    };

    let filterProducts;
    const init = () => {
        filterProducts && filterProducts();

        const $searchBar = $('.shopee-searchbar-input');
        if (!$searchBar || $searchBar.querySelector('#excludedWords')) return;

        console.log('shopee filter enabled');

        const $searchedWordsInput = $('.shopee-searchbar-input__input');
        const $minimumSoldInput = el('input', { id: 'minimumSold', style: 'width: 70px;', placeholder: isBrazil() ? 'vendido X+' : 'sold X+', onkeyup: function(e) { if (e.key === 'Enter') filterProducts(); } });
        const $excludedWordsInput = el('input', { id: 'excludedWords', placeholder: isBrazil() ? 'excluir palavras' : 'exclude words', onkeyup: function(e) { if (e.key === 'Enter') filterProducts(); } });
        filterProducts = filter($searchedWordsInput, $excludedWordsInput, $minimumSoldInput);

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

        $searchBar.appendChild($minimumSoldInput);
        $searchBar.appendChild($excludedWordsInput);
        $searchBar.appendChild($filterButton);
    };

    onMutation(init);

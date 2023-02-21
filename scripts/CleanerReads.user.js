// ==UserScript==
// @name        CleanerReads - A Goodreads Theme
// @description Nothing removed, just muted or moved out of the way.
// @version     1.1.1
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/CleanerReads.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/CleanerReads.user.js
// @match       https://www.goodreads.com/*
// @grant       none
// ==/UserScript==
var style$1 = /*css*/`

/*****************/
/*    SIDEBAR    */
/*****************/
.BookPage__leftColumn           { grid-column-start: 10; grid-column-end: 13; }                   /* move to the right */
.BookPage__leftColumn .Sticky   { position: relative !important; top: 15px !important; z-index: unset } /* z-index needed to prevent being in front of profile menu */
.BookPage__rightColumn          { grid-column-start: 3; grid-column-end: 10; grid-row-start: 1; } /* make non sticky */
.BookPage__rightColumn          { overflow: unset }                                               /* allows moving content to it */
.BookActions > .BookRatingStars { display: none }                                                 /* hide Community Rating (duplicated) */

.BookPageMetadataSection__ratingStats { position: absolute; right: -314px; top: 344px; }          /* move to the sidebar */
.RatingStatistics                     { flex-flow: column wrap; align-items: center; }

/*[Want to read], [Buy o nAmazon]*/
.BookActions                     { position: absolute; top: 407px; left: 72px; color: var(--color-text-subdued); }
.BookActions__editActivityButton { display: none; }

/* pencil icon */
.Button.Button--secondary.Button--medium.Button--block                  { margin-left: -4px; }
.PencilIcon .Button.Button--secondary.Button--medium.Button--block span:first-child { display: none;}

/* top  sticky header as a sidebar */
.SiteHeaderBanner__topFullImageContainer,
.siteHeader__topFullImageContainer /* selector for old goodreads design */
 { position: absolute; transform-origin: top right; right: 0; top: 1140px; transform: rotate(90deg); }

.ResponsiveImage { max-height: 330px; } /* resizes large covers to prevent overlap */


 /*****************/
/*     TOPBAR     */
/*****************/
/* nearly invisible top navbar */
.Header                         { position: unset; box-shadow: unset; background: unset; color: #00000021; }
input::placeholder              { color: #0000005c; }
.Header__siteHeaderBanner       { height: unset; }
.PageFrame                      { padding-top: unset; }
.HeaderSearch__input            { border: 0.1rem solid #0000; }
.Icon.ShareIcon svg             { fill: #00000021; }  /* share icon */
.HeaderSearch__button           { opacity: 0.3; }
.Text__title3                   { font-size: 1.5rem; }  /* Book Series title */
.HeaderSecondaryNav             { right: 43px; }        /* align second nav icons with cover */


/*****************/
/*  MAIN         */
/*****************/

/* Book Details */
.ChoiceAwardBadge                                           { margin-top: 10px; }
.BookPageMetadataSection__contributor                       { display: none; }         /* hides Author (duplicated) */
.BookPage__mainContent .TruncatedContent__text--large       { max-height: unset; }     /* book description always expanded */
.BookPageMetadataSection__genrePlainText                    { display: none; }         /* hides "genre" word */

.BookPageMetadataSection__genres                            { margin-bottom: -4px; }
.WorkDetails                                                { margin-top: 3.2rem; }    /*  Literary awards */
/* .BookDetails .Button__container                          { top: -4px; left: 376px; }  messes up the More Editions arrows*/
[aria-label="Book details and editions"]                    { top: -4px; left: 386px; position: relative; }
.BookDetails .FeaturedDetails                               { margin-bottom: -3rem; overflow: clip; display: flex; } /* flex brings pages count and publish date close together */
.BookDetails + hr.Divider                                   { display: none }
.FeaturedDetails p + p::before                              { content: ',\\00a0'; }     /* spacing in 352 pages, January 19, 2023 */
.BookDetails__list                                          { margin-top: 35px; }      /* "This Edition" overlaping when fewer details displayed. Ex: https://www.goodreads.com/book/show/60741407-a-christmas-memory */


/* 1,004 reading · 11.4k want to read */
.AvatarGroup                          { display: none; }
.SocialSignalsSection                 { color: var(--color-text-body-light); }
.SocialSignalCard__caption            { margin-left: unset; }
.SocialSignalCard                     { min-height: unset; }
.SocialSignalsSection__container      { display: unset; }
.SocialSignalsSection__signal         { margin-right: unset; display: inline-block; }


/* About Author */
.PageSection__title                                         { display: none; }
.PageSection                                                { margin-top: 20px; width: 550px;}
.PageSection .DetailsLayoutRightParagraph__widthConstrained { grid-column: span 10; }


/*****************/
/*  REVIEWS      */
/*****************/

/* My Review */
.ReviewsSection__header                                               { display: none; }
.WriteReviewCTA .Avatar                                               { display: none; }
.WriteReviewCTA__hero                                                 { display: none; }                    /* What do you Think title */
#SocialReviews .Text__title3                                          { display: none; }
.MyReviewCard                                                         { left: -193px; width: 730px;}        /* center align review */
.MyReviewCardCarousel .DynamicCarousel__itemsArea                     { overflow: unset; }

.Alert--informational                                                 { background-color: unset; }
.Alert                                                                { padding: unset; color: #00000021; text-align: center; }
.WriteReviewCTA                                                       { padding: unset; width: 600px;}
.ReviewsList__listHeader                                              { margin: unset; }

/* Reviews */
.BookPage__reviewsSection                                             { width: 550px; }
.ReviewsSectionStatistics__histogram                                  { width: unset; }
.ReviewFilters__filterControl                                         { width: unset; }
#CommunityReviews                                                     { display: none }                     /* hide title */
.ReviewsSectionStatistics .ReviewsSectionStatistics__ratingStatistics { display: none; }                    /* hide starts count, already shown on sidebar */

/* user reviews gravatar to the left, content centered */
#ReviewsSection .ReviewCard                                           { left: -190px; width: 720px;}

.FeaturedPerson__info                                                 { width: 515px; }

.TruncatedContent__text--large                                        { max-height: 48rem; }
.TruncatedContent__text--expanded                                     { max-height: none; overflow-y: visible; }

/* user's reviews */
.SocialFooter                                                         { display: flex }
.SocialFooter .Button                                                 { font-weight: 400; }
.ReviewCard .Text__title4                                             { font-weight: 400; }
div[data-testid="actions"]                                            { margin-left: 15px; margin-top: -1px; }


/*****************/
/*    COMMON     */
/*****************/
.Formatted {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

hr.Divider { width: 532px }

/*****************/
/*    BUTTONS    */
/*****************/
.BookActions .Button                        { border-radius: unset; font-weight: unset; }
.BookActions__button                        { margin: unset; width: 100%;}
.Button--medium                             { padding: 5px; padding-right: 12px; height: 2.5rem; }
.Button--wtr                                { background-color: unset; color: unset; }
.Button--wtr:hover                          { background-color: unset; box-shadow: inset 0 -3px 0 0 var(--color-background-wtr-hover); }
.Button                                     { transition: unset; border: 0; } /* border-radius: unset; font-weight: unset; */
.Button--buy                                { color: unset; }
.Button--buy:hover                          { background-color: unset; box-shadow: inset 0 -3px 0 0 var(--color-text-button-transparent-base); }
.Button--medium.Button--rounded             { width: 3em; }
.Button--rounded                            { border-radius: unset; }

.Button--small { height: unset; padding: unset; }
.Button--large { height: unset; padding: unset; }
.Button--block { width: unset; }

.Button--primary:hover {
  box-shadow: inset 0 -2px 0 0 var(--color-background-primary-base);
  background-color: unset;
}

.Button--primary {
  background-color: unset;
  color: var(--color-background-primary-base);
  border-radius: unset;
}

.Button--buy:active, .Button--buy:focus, .Button--inline.Button--active:active, .Button--inline.Button--active:focus, .Button--inline:active, .Button--inline:focus, .Button--primary:active, .Button--primary:focus, .Button--secondary.Button--active:active, .Button--secondary.Button--active:focus, .Button--secondary:active, .Button--secondary:focus, .Button--signinwithamazon:active, .Button--signinwithamazon:focus, .Button--signinwithapple:active, .Button--signinwithapple:focus, .Button--signinwithfacebook:active, .Button--signinwithfacebook:focus, .Button--tag-inline:active, .Button--tag-inline:focus, .Button--tag-selector:active, .Button--tag-selector:focus, .Button--transparent:active, .Button--transparent:focus, .Button--wtr:active, .Button--wtr:focus {
  box-shadow: unset;
}

.ButtonGroup .Button__container:not(:first-child) .Button:active, .ButtonGroup .Button__container:not(:first-child) .Button:focus {
  box-shadow: inset 0 -3px 0 0 var(--color-background-wtr-hover);
}

.ButtonGroup .Button__container:not(:first-child) .Button:active, .ButtonGroup .Button__container:not(:first-child) .Button--wtr:focus {
  box-shadow: inset 0 -3px 0 0 var(--color-background-wtr-hover);
}
.ButtonGroup .Button__container:not(:first-child) .Button:active, .ButtonGroup .Button__container:not(:first-child) .Button--buy:focus {
  box-shadow: inset 0 -3px 0 0 var(--color-text-button-transparent-base);
}

`;

var muteTopbar = /*css*/`

/* OLD TOPBAR */
.siteHeader__topLine       { position: unset; box-shadow: unset; background: unset }
.siteHeader .siteHeader__topLevelLink, .siteHeader .primaryNavMenu__trigger {  color: #00000021; }
.siteHeader input          { border: 0.1rem solid #0000; }
.siteHeader .searchBox__icon--magnifyingGlass { opacity: 0.3; }
.siteHeader input::placeholder              { color: #0000005c !important; }

`;

const $  = (selector, parent = document) => parent.querySelector(selector),

    el = (name, attrs) => {
        var $e = document.createElement(name);

        for (let prop in attrs) {
            $e.setAttribute(prop, attrs[prop]);
        }

        return $e;
    },

    style = styles => Object.assign(el('style', { type: 'text/css' }), { textContent: styles }),

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

var init = () => {
    const isHomePage = location.href === 'https://www.goodreads.com/' || location.href.startsWith('https://www.goodreads.com/?');
    if (!isHomePage) addStyle(muteTopbar);

    const isBookPage = location.href.includes('/book/show/');
    if (!isBookPage) return;

    const pagesRegex = /(.*pages).*/;
    const $pagesFormat = $('p[data-testid="pagesFormat"]');

    if ($pagesFormat) $pagesFormat.innerText = $pagesFormat.innerText.replace(pagesRegex, '$1');

    const dateRegex = /.*((January|February|March|April|May|June|July|August|September|October|November|December).*)/;
    const $publicationInfo = $('p[data-testid="publicationInfo"]');

    if ($publicationInfo) $publicationInfo.innerText = $publicationInfo.innerText.replace(dateRegex, '$1');

    waitForEl('div[data-testid="currentlyReadingSignal"]').then(el => {
        el.innerText = el.innerText.replace(' people are currently reading', ' reading ·');
    });

    waitForEl('div[data-testid="toReadSignal"]').then(el => {
        el.innerText = el.innerText.replace(' people', '');
    });

    $('.AuthorPreview .ContributorLink').replaceWith($('.ContributorLinksList'));
};

addStyle(style$1);
init();

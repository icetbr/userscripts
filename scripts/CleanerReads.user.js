// ==UserScript==
// @name        CleanerReads - A Goodreads Theme
// @description Muting and moving some UI elements in favor of text. Nothing changed, just rearranged.
// @version     1.4.0
// @author      icetbr
// @icon        https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @license     MIT
// @namespace   https://github.com/icetbr/userscripts
// @updateURL   https://openuserjs.org/meta/icetbr/CleanerReads.meta.js
// @downloadURL https://openuserjs.org/src/scripts/icetbr/CleanerReads.user.js
// @match       https://www.goodreads.com/*
// @grant       none
// ==/UserScript==

var style = /*css*/`

/*****************/
/*    SIDEBAR    */
/*****************/
/* LEFT */
.BookPage__leftColumn .Sticky   { position: relative !important; top: 15px !important; z-index: unset } /* z-index needed to prevent being in front of profile menu */
.BookPage__rightColumn          { overflow: unset }                                                     /* allows moving content to it */
.BookActions > .BookRatingStars { display: none }                                                       /* hide Community Rating (duplicated) */

.RatingStatistics                     { flex-flow: column wrap; align-items: center; }

/*[Want to read], [Buy on Amazon]*/
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
.NotificationsTray { z-index: 1}  /* prevent being behing content */

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
.HeaderNavDropdown              { z-index: 9999 }       /* .Header position uset made this go to the back */

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


/* 1,004 reading Â· 11.4k want to read */
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
.PageSection .Divider,
.lazyload-wrapper .Divider    { width: 693px; }


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

#ReviewsSection > .Divider                                              { width: 693px;}

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

/* hr.Divider { width: 693px } */

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

.BookPage__bookCover { margin-bottom: 200px !important } /* needed for content moved to the sidebar */

/* .BookPageMetadataSection__genreButton { padding: 0 4px 0px 0; } */
.BookPageMetadataSection__genreButton a { height: 30px; }
.Button--tag:after, .Button--tag:before { bottom: 3px }

/*****************/
/* Conditionals  */
/*****************/

/* coverOnLeft */
body.coverOnLeft .BookPageMetadataSection__ratingStats          { position: absolute; left: -334px; top: 344px; }                /* move to the sidebar */
body.coverOnLeft .BookPage__rightColumn                         { grid-column-start: 4; grid-column-end: 11; grid-row-start: 1; }       /* make non sticky */
body.coverOnLeft .BookPage__leftColumn                          { margin-left: -44px; }
body.coverOnLeft .DetailsLayoutRightParagraph__widthConstrained { grid-column: span 8; }

/* coverOnRight */
body.coverOnRight .BookPageMetadataSection__ratingStats { position: absolute; right: -314px; top: 344px; }                /* move to the sidebar */
body.coverOnRight .BookPage__leftColumn           { grid-column-start: 10; grid-column-end: 13; }                         /* move to the right */
body.coverOnRight .BookPage__rightColumn          { grid-column-start: 3; grid-column-end: 10; grid-row-start: 1; }       /* make non sticky */


/* authorToTheSidebar */
/* when loading, the author section is called PageSection, after loading it is .lazyload-wrapper */
body.authorToTheSidebar .BookPage__leftColumn .PageSection,
body.authorToTheSidebar .BookPage__leftColumn .lazyload-wrapper             { font-size: 14px; width: 320px; }
body.authorToTheSidebar .BookPage__leftColumn .PageSection .Divider,
body.authorToTheSidebar .BookPage__leftColumn .lazyload-wrapper .Divider    { width: 305px; }
body.authorToTheSidebar .AuthorPreview .FeaturedPerson__infoPrimary         { width: 250px; }
body.authorToTheSidebar .ContributorLinksList { font-size: 1.2rem; }
body.authorToTheSidebar .ContributorLink__role { font-size: 1.0rem; }
/* body.authorToTheSidebar .FeaturedPerson__profile { overflow: scroll } */
body.authorToTheSidebar .DetailsLayoutRightParagraph__widthConstrained {  grid-column: span 10;  }


/* muteTopbar */
/* OLD TOPBAR */
body.muteTopbar .siteHeader__topLine       { position: unset; box-shadow: unset; background: unset }
body.muteTopbar .siteHeader .siteHeader__topLevelLink, .siteHeader .primaryNavMenu__trigger {  color: #00000021; }
body.muteTopbar .siteHeader input          { border: 0.1rem solid #0000; }
body.muteTopbar .siteHeader .searchBox__icon--magnifyingGlass { opacity: 0.3; }
body.muteTopbar .siteHeader input::placeholder              { color: #0000005c !important; }
body.muteTopbar .siteHeader { position: unset; }
body.muteTopbar .siteHeaderBottomSpacer { display: none }

/* widerText */
body.widerText .BookPageMetadataSection__description .DetailsLayoutRightParagraph__widthConstrained { width: 690px; }  /* book description */
body.widerText .BookPage__mainContent .TruncatedContent:nth-child(3) { width: 700px; }                                 /* author description */
body.widerText .MyReviewCard__content { width: 700px; }
body.widerText .ReviewCard__content { width: 700px; }
body.widerText .BookPageMetadataSection__description .TruncatedContent__text { overflow: visible !important; }

/* readersEnjoyedToTheSidebar */
body.readersEnjoyedToTheSidebar .BookPage__relatedTopContent .DynamicCarousel__item { margin-right: 0px; }
body.readersEnjoyedToTheSidebar .BookPage__relatedTopContent  .BookCard__content  { display: none }
body.readersEnjoyedToTheSidebar .BookPage__relatedTopContent  .Divider  { display: none }

body.coverOnLeft.authorToTheSidebar.readersEnjoyedToTheSidebar .MyReviewCard__profile > .ReviewerProfile {    margin-left: 950px;    position: absolute; }

/* sharpCorners */
body.sharpCorners .BookCover__image { border-radius: unset }

body.hide-CurrentlyReading section:has([data-react-class="ReactComponents.CurrentlyReading"]),
body.hide-ReadingChallenge section:has([data-react-class="ReactComponents.ReadingChallenge"]),
body.hide-ShelfDisplay section:has([data-react-class="ReactComponents.ShelfDisplay"]),
body.hide-UserShelvesBookCounts section:has([data-react-class="ReactComponents.UserShelvesBookCounts"]),
body.hide-EditorialBlogThumbnail section:has([data-react-class="ReactComponents.EditorialBlogThumbnail"]),
body.hide-RecommendationsWidget section:has([data-react-class="ReactComponents.RecommendationsWidget"]),
body.hide-ChoiceWidget section:has([data-react-class="ReactComponents.ChoiceWidget"]),
body.hide-Footer [data-react-class="ReactComponents.Footer"],
body.hide-SiteAnnouncement [data-react-class="ReactComponents.SiteAnnouncement"],
body.hide-GoogleBannerAd .Ad,
body.hide-ColoredTopBar .SiteHeaderBanner__topFullImageContainer,
body.hide-ColoredTopBar .siteHeader__topFullImageContainer
{
    display: none !important;
}

`;

const assign = Object.assign,
    isPlainObject = (o) => o?.constructor === Object;

const $ = (s, p = document) => p.querySelector(s),

    h = new Proxy({} , {
        get: (_, tag) => (propsOrChild, ...children) => {
            const isProps = isPlainObject(propsOrChild);
            const el = assign(document.createElement(tag), isProps ? propsOrChild : {});
            el.append(...(isProps ? children : [propsOrChild, ...children]));
            if (isProps && propsOrChild.popovertarget) el.setAttribute('popovertarget', propsOrChild.popovertarget);
            return el
        }
    }),

    waitForEl = (selector) => new Promise(resolve => {
        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver(() => {
            if (!$(selector)) return;

            resolve($(selector));
            observer.disconnect();
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
        return observer;
    }),

    switchStyle = (nameA, nameB, isAOn) => {
        document.body.classList.toggle(nameA, isAOn);
        document.body.classList.toggle(nameB, !isAOn);
    },

    toggleStyle = (name, isOn) => document.body.classList.toggle(name, isOn),

    addStyle = (css) => document.body.appendChild(document.createElement("style")).append(css); // needs to be body to ovewrite page's style; don't want to use h helper because I usually use this alone

const
    addOptionsMenu = (options, savedOptions) => {
        const { label, input, p, b, div, button, style } = h;

        const save = (id) => (e) => {
            options[id][1](e.target.checked);
            savedOptions[id] = e.target.checked;
            localStorage.setItem('options', JSON.stringify(savedOptions));
        };

        const $options = div({id: 'optionsMenu', popover: ''});

        for(const id in options) {
            if (id === 'CurrentlyReading') $options.append(p(b("Hide from Home page")));

            $options.append(
                label(input({ type: 'checkbox', id, checked: !!savedOptions[id], onchange: save(id) }), options[id][0])
            );
        }

        const $optionsBtn = button({id: 'optionsBtn', popovertarget: 'optionsMenu'}, '⚙');
        const $style = style(`
            #optionsMenu { border: 1px solid #d7d7db; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.2); margin-right: 5px; margin-top: 40px; }
            #optionsMenu > * { display: block; }
            #optionsBtn {
                background: none; border: none; padding: 5px; cursor: pointer; /* Reset button styles*/
                position: fixed; top: 5px; right: 5px; z-index: 9999;
                font-size: 26px; opacity: 0.4; transition: opacity 0.2s, transform 0.2s;
            }
            #optionsBtn:hover { opacity: 1; transform: scale(1.1); }
        `);

        const $host = div({id: 'options'});
        const shadow = $host.attachShadow({ mode: 'open' });
        shadow.append($style, $optionsBtn, $options);
        document.body.append($host);
    },

    styleBookPages = () => {
        toggleStyle('coverOnRight', true);

        // 352 pages, Kindle Edition
        const $pagesFormat = $('p[data-testid="pagesFormat"]');
        if ($pagesFormat) $pagesFormat.innerText = $pagesFormat.innerText.replace(/(.*pages).*/, '$1');

        // Expected publication January 19, 2023
        const dateRegex = /.*((January|February|March|April|May|June|July|August|September|October|November|December).*)/;
        const $publicationInfo = $('p[data-testid="publicationInfo"]');
        if ($publicationInfo) $publicationInfo.innerText = $publicationInfo.innerText.replace(dateRegex, '$1');

        // 263 people are currently reading
        waitForEl('div[data-testid="currentlyReadingSignal"]').then(el => el.innerText = el.innerText.replace(' people are currently reading', ' reading ·'));

        // 11.4k people want to read
        waitForEl('div[data-testid="toReadSignal"]').then(el => el.innerText = el.innerText.replace(' people', ''));

        // moves authors to the bio section
        waitForEl('.AuthorPreview .ContributorLink').then(el => el.replaceWith($('.ContributorLinksList')));

        // the author is removed by the end of the page load, this realocates the translator that was added in the previous step
        // document.addEventListener('readystatechange', _ => {
        //     if (document.readyState === "complete") {
        //         waitForEl('.AuthorPreview .ContributorLink').then(el => el.replaceWith($('.ContributorLinksList')))
        //     }
        // })
    },

    styleOptionals = async () => {
        const
            /* when loading, the author section is called PageSection, after loading it is .lazyload-wrapper */
            toggleAboutTheAuthorToTheSidebar = isOn => {
                toggleStyle('authorToTheSidebar', isOn);
                waitForEl('.PageSection').then(el =>
                    waitForEl(isOn ? '.BookPage__leftColumn .Sticky .BookActions' : '.SocialSignalsSection ~.Divider').then(p => p.insertAdjacentElement('afterend', el))
                );
                // toggleStyle('authorToTheSidebar', isOn)
                // if (isOn) {
                //     if (document.readyState === "complete") {
                //         // $('.BookPage__leftColumn .Sticky').append($('.AuthorPreview').parentElement)
                //         $('.BookPage__leftColumn .Sticky .BookActions').insertAdjacentElement('afterend', $('.AuthorPreview').parentElement)
                //     } else {
                //         waitForEl('.BookPageMetadataSection .PageSection').then(el => {
                //             $('.BookPage__leftColumn  .Sticky').append(el)
                //         })
                //     }
                // } else {
                //     $('.SocialSignalsSection ~.Divider').insertAdjacentElement('afterend', $('.AuthorPreview').parentElement)
                // }
            },

            toggleReadersEnjoyedSidebar = isOn => {
                toggleStyle('readersEnjoyedToTheSidebar', isOn);
                waitForEl('.BookPage__relatedTopContent').then(el =>
                    isOn
                       ? $('.BookPage__leftColumn .Sticky').append(el)
                       : $('.BookPage__mainContent').insertAdjacentElement('afterend', el));
            },

            options = {
                moveAboutTheAuthorToTheSidebar:         ["Move About the Author to the sidebar",               isOn => toggleAboutTheAuthorToTheSidebar(isOn)],
                moveReadersAlsoEnjoyedToTheSidebar:     ["Move Readers Also Enjoyed to the sidebar",           isOn => toggleReadersEnjoyedSidebar(isOn)],
                showCoverOnTheLeft:                     ["Show cover on the left",                             isOn => switchStyle('coverOnLeft', 'coverOnRight', isOn)],
                removeBookCoverRoundedCorners:          ["Remove book cover rounded corners",                  isOn => toggleStyle('sharpCorners', isOn)],
                makeTextWider:                          ["Make text wider",                                    isOn => toggleStyle('widerText', isOn)],
                GoogleBannerAd:                         ["Hide Google Ads (AdBlock is better)",                isOn => toggleStyle('hide-GoogleBannerAd', isOn)],
                ColoredTopBar:                          ["Hide Colored side banner",                           isOn => toggleStyle('hide-ColoredTopBar', isOn)],
                CurrentlyReading:                       ["Currently Reading",                                  isOn => toggleStyle('hide-CurrentlyReading', isOn)],
                ReadingChallenge:                       ["Reading Challenge",                                  isOn => toggleStyle('hide-ReadingChallenge', isOn)],
                ShelfDisplay:                           ["Want to Read",                                       isOn => toggleStyle('hide-ShelfDisplay', isOn)],
                UserShelvesBookCounts:                  ["Bookshelves",                                        isOn => toggleStyle('hide-UserShelvesBookCounts', isOn)],
                EditorialBlogThumbnail:                 ["News & Interviews",                                  isOn => toggleStyle('hide-EditorialBlogThumbnail', isOn)],
                RecommendationsWidget:                  ["Recommendations",                                    isOn => toggleStyle('hide-RecommendationsWidget', isOn)],
                ChoiceWidget:                           ["Goodreads Choice Awards",                            isOn => toggleStyle('hide-ChoiceWidget', isOn)],
                Footer:                                 ["Company / Work With Us / Connect",                   isOn => toggleStyle('hide-Footer', isOn)],
                SiteAnnouncement:                       ["Site Announcements (top of middle column)",          isOn => toggleStyle('hide-SiteAnnouncement', isOn)],
            },

            savedOptions = JSON.parse(localStorage.getItem('options') || '{}');

        await waitForEl(isHomePage ? '[data-react-class="ReactComponents.UserShelvesBookCounts"]' : '.BookCover__image');

        addOptionsMenu(options, savedOptions);
        for (const i in savedOptions) options[i][1](savedOptions[i]);

        // the author is removed by the end of the page load, this reaplies the style
        // document.addEventListener('readystatechange', _ => {
        //     if (document.readyState === "complete") {
        //         if (options.moveAboutTheAuthorToTheSidebar) {
        //             $('.BookPage__leftColumn  .Sticky').append($('.AuthorPreview').parentElement)
        //         }
        //     }
        // })
    },

    isHomePage = location.href === 'https://www.goodreads.com/' || location.href.startsWith('https://www.goodreads.com/?'),
    isBookPage = location.href.includes('/book/show/'),

    init = async () => {
        console.log('[cleanerreads]', 'adding styles');

        addStyle(style);
        if (!isHomePage) toggleStyle('muteTopbar', true);
        if (isBookPage) styleBookPages();
        await styleOptionals();
    };

await waitForEl('body').then(init);

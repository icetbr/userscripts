// ==UserScript==
// @name        CleanerReads - A goodreads.com Theme
// @description Nothing removed, just muted or moved out of the way.
// @version     1.0.1
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
.Sticky                         { position: relative !important; top: 15px !important; }
.BookPage__rightColumn          { grid-column-start: 3; grid-column-end: 10; grid-row-start: 1; } /* make non sticky */
.BookPage__rightColumn          { overflow: unset }                                               /* allows moving content to it */
.BookActions > .BookRatingStars { display: none }                                                 /* hide Community Rating (duplicated) */

.BookPageMetadataSection__ratingStats { position: absolute; right: -314px; top: 344px; }          /* move to the sidebar */
.RatingStatistics                     { flex-flow: column wrap; align-items: center; }

/*Want to read and Buy*/
.BookActions                    { position: absolute; top: 407px; left: 72px; color: var(--color-text-subdued); }
.BookActions__editActivityButton { display: none; }

/* pencil icon */
.Button.Button--secondary.Button--medium.Button--block {  margin-left: -4px; }
.Button.Button--secondary.Button--medium.Button--block span:first-child {  display: none;}

/* top  sticky header as a sidebar */
.SiteHeaderBanner__topFullImageContainer,
.siteHeader__topFullImageContainer /* selector for old goodreads design */
 { position: absolute; transform-origin: top right; right: 0; top: 55vw; transform: rotate(90deg); }

 .BookCover__image { width: 187px; } /* resizes large covers to prevent overlap */
 .ResponsiveImage { max-height: 330px; }

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
/*  BOOK DETAILS */
/*****************/
.ChoiceAwardBadge                                           { margin-top: 10px; }
.BookPageMetadataSection__contributor                       { display: none; }     /* hides Author (duplicated) */
.BookPage__mainContent .TruncatedContent__text--large       { max-height: unset; } /* book description always expanded */
.BookPageMetadataSection__genrePlainText                    { display: none; }     /* hides "genre" word */

.BookPageMetadataSection__genres { margin-bottom: -4px; }
.WorkDetails { margin-top: 3.2rem; }                        /*  Literary awards */
.BookDetails .Button__container { top: -4px; left: 376px; }
.BookDetails .FeaturedDetails { margin-bottom: -3rem; overflow: clip; }

/* pages count and publish date close together */
.FeaturedDetails p[data-testid="pagesFormat"] {
  display: inline-block;
  width: 70px;
  overflow: clip;
  white-space: nowrap;
  background: white;
}

/* pages count and publish date close together */
.FeaturedDetails p[data-testid="publicationInfo"] {
  display: inline-block;
  margin-left: -93px;
  white-space: nowrap;
  overflow: clip;
  z-index: -1;
  position: relative;
}


/*****************/
/* Social Signal */
/*****************/

/* People reading */
div[data-testid="currentlyReadingSignal"] {
  display: inline-block;
  width: 81px;
  overflow: clip;
  white-space: nowrap;
  position: relative;
}

div[data-testid="currentlyReadingSignal"]::after {
  content: 'reading \\B7  ';
  position: absolute;
  left: 35px;
  background: #fff;
}

div[data-testid="toReadSignal"] {
  overflow: clip;
  white-space: nowrap;
  position: relative;
}

div[data-testid="toReadSignal"]::before {
  position: absolute;
  content: 'want to read\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0\\00A0';
  right: -30px;
  background: #fff;
}

hr.Divider:nth-child(7) { display: none; }
hr.Divider:nth-child(2) { width: 80%; }
hr.Divider:nth-child(9) { width: 80%; }


.AvatarGroup                          { display: none; }
.SocialSignalsSection                 { color: var(--color-text-body-light); }
.SocialSignalCard__caption            { margin-left: unset; }
.SocialSignalCard                     { min-height: unset; }
.SocialSignalsSection__container      { display: unset; }
.SocialSignalsSection__signal         { margin-right: unset; display: inline-block; }


/*****************/
/* Others */
/*****************/

.BookPage__reviewsSection { width: 550px; }
.ReviewsSectionStatistics__histogram { width: unset; }
.ReviewFilters__filterControl { width: unset; }

/* About Author */
.PageSection__title { display: none; }
.PageSection        { margin-top: 20px; width: 550px;}
.PageSection .DetailsLayoutRightParagraph__widthConstrained {
   grid-column: span 10;
}

/* My Review */
.ReviewsSection__header { display: none; }
.WriteReviewCTA .Avatar { display: none; }
.WriteReviewCTA__hero { display: none; } /* What do you Think title */
#SocialReviews .Text__title3 { display: none; }
.MyReviewCard { left: -193px; width: 730px;} /* center align review */

.Alert--informational { background-color: unset; }
.Alert { padding: unset; color: #00000021; text-align: center; }
.WriteReviewCTA { padding: unset; /*! grid-column-end: 7; */width: 600px;}
.ReviewsList__listHeader { margin: unset; }

/* Community Reviews */
#CommunityReviews { display: none } /* hide title */
.ReviewsSectionStatistics .ReviewsSectionStatistics__ratingStatistics { display: none; } /* hide starts count, already shown on sidebar */

/* rating statistics */
/* .ReviewsSectionStatistics {
  position: absolute;
  left: 715px;
  width: 600px;
}

.ReviewFilters {
  position: absolute;
  left: 715px;
  width: 600px;
  top: 1000px;
}
 */
div.ReviewsList:nth-child(1) > div:nth-child(2) {
  position: relative;
  left: -190px;
}

/* more lines of text before Show More button */
.TruncatedContent__text--large { max-height: 48rem; }
.TruncatedContent__text--expanded { max-height: none; overflow-y: visible; }

/* user's reviews */
.SocialFooter { display: flex }
.SocialFooter .Button { font-weight: 400; }
.ReviewCard .Text__title4 { font-weight: 400; }
div[data-testid="actions"] { margin-left: 15px; margin-top: -1px; }


/*****************/
/*    COMMON     */
/*****************/

.Formatted {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/*****************/
/*    BUTTONS    */
/*****************/
.BookActions .Button                        { border-radius: unset; font-weight: unset; }
.BookActions__button                        { margin: unset; width: 100%;}
.Button--medium                             { padding: unset; height: 2.5rem; /*! width: 100%; */}
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


.FeaturedPerson__info {
  width: 515px;
}

.ReviewsSectionStatistics__histogram {
  width: unset;
}

.ReviewFilters__filterControl {
  width: unset;
}

.WriteReviewCTA {
  width: 600px;
}

.PageSection {
  width: 550px;
}

div.ReviewsList:nth-child(1) > div:nth-child(2) {
  left: -190px;
}

  .BookPage__reviewsSection {
  width: 550px;
}

  div.ReviewsList:nth-child(1) {
  width: 720px;
}

`;

const el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    style = styles => el('style', { type: 'text/css', textContent: styles }),

    addStyle = styles => document.body.append(style(styles));

addStyle(style$1);
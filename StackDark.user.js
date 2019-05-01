// ==UserScript==
// @name         StackDark
// @author       Siguza
// @version      1.6.5
// @description  Dark style for StackExchange
// @namespace    siguza.stackdark
// @homepage     https://github.com/Siguza/StackScripts
// @run-at       document-start
// @grant        none
// @include      /^https?:\/\/(.*\.)?stackoverflow\.com/.*$/
// @include      /^https?:\/\/(.*\.)?serverfault\.com/.*$/
// @include      /^https?:\/\/(.*\.)?superuser\.com/.*$/
// @include      /^https?:\/\/(.*\.)?stackexchange\.com/.*$/
// @include      /^https?:\/\/(.*\.)?askubuntu\.com/.*$/
// @include      /^https?:\/\/(.*\.)?mathoverflow\.net/.*$/
// @include      /^https?:\/\/discuss\.area51\.stackexchange\.com/.*$/
// @include      /^https?:\/\/stackapps\.com/.*$/
// ==/UserScript==
/*jshint multistr: true */

function f(a, l)
{
    var s = '';
    for(var k in a)
    {
        if(l.match(k) !== null)
        {
            s += a[k];
        }
    }
    return s;
}

var l =
[
    '#edit-interesting',
    '#sidebar .community-bulletin .bulletin-item-content a.question-hyperlink',
    '#sidebar a#addInterestingTag',
    '#sidebar #chat-feature a',
    '#sidebar .sidebar-linked .spacer.more a',
    '#newsletter-preview-container a',
    '#hot-network-questions a',
    '#permalink a',
    '#feed-link a',
    '#leagueRank a',
    '#users-legend a',
    '.container #system-message a',
    '.answer-hyperlink',
    '.question-hyperlink',
    '.comments-link',
    '.comment-user',
    '.additional-links a',
    '.help-tab',
    '.show-more',
    '.discard-question',
    '.discard-answer',
    '.revision .user-details a',
    '.owner-revision .user-details a',
    '.vote-revision .revcell3 > a',
    '.page-description form a',
    '.post-text a:not(.post-tag)',
    '.question-status a:not(.badge-tag)',
    '.wmd-preview a:not(.post-tag)',
    '.panel-activity a',
    '.comment-copy a',
    '.user-action-time a',
    '.top a',
    '.topic-details a',
    '.excerpt a',
    '.started a:not(.started-link)',
    '.started .mod-flair',
    '.user-details a',
    '.user-panel-footer a',
    '.recently-deleted a',
    '.bottom-share-links a',
    '.bottom-notice a:not(.post-tag)',
    '.section-content a',
    '.cv-list a',
    '.post-timeline a',
    '.doctag-card .card-top a:first-child',
    '.popup-breadcrumbs a',
    '.action-list a',
    '.popup .post-link a',
    'h3.title-section a',
    'article.post.full-post .entry a',
    'div.clc-jobs-multi>.middle>ul>li .title',
    'div.clc-jobs-multi>.bottom a',
    'a.site-hyperlink',
    'a.doc-topic-link',
    'a.doc-example-link',
];
var links = l.reduce(function(p, c)
{
    p.push(c + ':not(:visited):not(:hover):not(:active)');
    return p;
}, []).join(',');
var hover = l.reduce(function(p, c)
{
    p.push(c + ':hover');
    p.push(c + ':active');
    return p;
}, ['.started a:hover', '.started a:active']).join(',');
var visited = l.filter(function(e)
{
    return ['.comment-user', '.user-details a'].indexOf(e) == -1;
}).reduce(function(p, c)
{
    p.push(c + ':visited:not(:hover):not(:active)');
    return p;
}, []).join(',');

document.head.appendChild(document.createElement('style')).innerHTML = `
html
{
    background-color: #000;
    color: #CCC;
}
body, .popup, .review-bar-container .review-bar, .cv-list, .message.message-config
{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEUaGhohISElJSUh9lebAAAB20lEQVRIx4XWuZXDMAwE0C0SAQtggIIYoAAEU+aKOHhYojTrYP2+QfOW/5QIJOih/q8HwF/pb3EX+UPIveYcQGgEHiu9hI+ihEc5Jz5KBIlRRRaJ1JtoSAl5Hw96hLB1/up1tnIXOck5jZQy+3iU2hAOKSH1JvwxHsp+5TLF5MOl1/MQXsVs1miXc+KDbYydyMeUgpPQreZ7fWidbNhkXNJSeAhc6qHmHD8AYovunYyEACWEbyIhNeB9fRrH3hFi0bGPLuEW7xCNaohw1vAlS805nfsrTspclB/hVdoqusg53eH7FWot+wjYpOViX8KbFFKTwlnzvj65P9H/vD0/hibYBGhPwlPO8TmxRsaxsNnrUmUXpNhirlJMPr6Hqq9k5Xn/8iYQHYIuQsWFC6Z87IOxLxHphSY4SpuiU87xJnJr5axfeRd+lnMExXpEWPpuZ1v7qZdNBOjiHzDREHX5fs5Zz9p6X0vVKbKKchlSl5rv+3p//FJ/PYvoKryI8vs+2G9lzRmnEKkh+BU8yDk515jDj/HAswu7CCz6U/Mxb/PnC9N41ndpU4hUU7JGk/C9PmP/M2xZYdvBW2PObyf1IUiIzoHmHW9yTncliYs9A9tVNppdShfgQaTLMf+j3X723tLeHgAAAABJRU5ErkJggg==) !important;
}
.so-header, .top-bar
{
    background: #000 !important;
}
.top-bar .-logo
{
    -webkit-filter: invert(100%) hue-rotate(180deg) brightness(1.5) !important;
    filter: invert(100%) hue-rotate(180deg) brightness(1.5) !important;
}
.so-header .navigation .-item._current .-link:not(:hover), .top-bar .navigation .-item._current .-link:not(:hover), .close-as-duplicate-pane .original-display .navi-container, .close-as-duplicate-pane .original-display .list-originals .list .item .body-summary,
.s-btn__muted.s-btn__outlined, .s-btn__muted.s-btn__outlined:focus
{
    color: #CCC !important;
}
.cv-list, .cv-list hr
{
    border-color: #AAA !important;
}
.popup-close a
{
    border: dotted 1px #999 !important;
    padding: 3px 6px 2px 6px !important;
}
.popup-close a:hover
{
    color: #777 !important;
}
.message.message-config
{
    border: solid 1px #CCC !important;
    color: #999 !important;
}
#main-content, #sideBar > *, #content, #chat .messages, #chat-body #sidebar, #chat-body a.signature .flair, #sidebar h4, .popup, .message.message-config h1, .message.message-config h2, .message.message-config h3, .message.message-config h4, .post-timeline-v2 .post-timeline th, .post-timeline-v2 .post-timeline td
{
    color: #CCC !important;
}
.container, #content, .tag-container, table.doctag-cards .doctag-card.proposal-card .card-bottom .progress-bar .bar, .expanded:hover, .s-sidebarwidget--header
{
    background: none !important;
}
._background-light, .privileges-page .privilege-table-row:hover, .close-as-duplicate-pane .original-display .list-originals .list .item.hover
{
    background: rgba(255, 255, 255, .05) !important;
}
#content
{
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    border-bottom: none !important;
    padding: 15px !important;
}
.flush-left
{
    margin-left: -15px !important;
}
#footer, #chat-body #input-area
{
    background: #333 !important;
}
#chat-body #sound, #chat-body .button, #chat-body .stars:not(.user-star) .img.vote, .bounty-link, .module.community-bulletin .bulletin-title, .module.question-stats, .votes-cast-stats, .user-stats, .comment-up-on, .comment-up-off, .comment-flag, .openid-icon, .p-highlights .-graph
{
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;
    filter: invert(100%) hue-rotate(180deg) !important;
}
.vote div[style="color:maroon"]
{
    color: #F66 !important;
}
#chat .messages
{
    background: none !important;
    border: dotted 1px rgba(255, 255, 255, 0.3);
}
#chat-body #roomname
{
    text-shadow: none !important;
}
#chat-body a .username.owner
{
    color: #BB0 !important;
}
#chat-body a:hover .username.owner
{
    color: #FF0 !important;
}
#chat-body a .username.moderator
{
    color: #900 !important;
}
#chat-body a:hover .username.moderator
{
    color: #C00 !important;
}
#chat-body .catchup-marker
{
    border-top: none !important;
}
#chat div.message:hover, #chat .timestamp:hover + div.message
{
    border: solid 1px rgba(0, 0, 0, 0) !important;
    background: rgba(255, 255, 255, 0.1) !important;
}
#chat div.message .meta
{
    background: #333 !important;
}
#chat-body a.signature
{
    color: #08F !important;
}
#chat-body a.signature:hover
{
    color: #4AF !important;
}
#chat .timestamp
{
    background: none !important;
    color: #FFF !important;
}
.tagged-interesting, #chat .mine .messages
{
    background: rgba(0, 255, 0, 0.1) !important;
}
#chat .mention
{
    background: rgba(0, 255, 0, 0.2) !important;
    padding: 1px 3px !important;
    margin: -1px -3px !important;
    border-radius: 8px !important;
}
#chat .reply-parent, #chat .reply-child
{
    background: rgba(255, 255, 0, 0.2) !important;
}
#chat-feature
{
    border: solid 1px rgba(255, 255, 255, .15) !important;
    border-radius: 5px !important;
    background: rgba(255, 255, 255, .05) !important;
}
#chat-feature h4
{
    margin: 0 !important;
    padding: 12px 10px 4px 10px !important;
}
#chat-feature .ad502-room
{
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    padding-top: 2px !important;
    padding-bottom: 0 !important;
}
#chat-feature .ad502-room:last-child
{
    padding-bottom: 5px !important;
}
#chat-feature .ad502-room::before
{
    content: " " !important;
    display: block !important;
    height: 1px !important;
    background: rgba(255, 255, 255, .15) !important;
    margin-bottom: 5px !important;
}
#newsletter-ad
{
    background: rgba(0,255,255,.08) !important;
    border: solid 1px rgba(255,255,255,.25) !important;
    padding: 0 14px 0 14px !important;
}
#newsletter-ad::before
{
    content: "Love this site?" !important;
    font-weight: bold !important;
    font-size: 30px !important;
    display: block !important;
    margin-top: 23px !important;
    color: #FFF !important;
}
#newsletter-ad-header
{
    margin-top: 20px !important;
}
.title-box
{
    background: rgba(255,255,255,.05) !important;
    color: #CCC !important;
}
.title-box > .title
{
    color: #FFF !important;
}
.spoiler
{
    color: rgba(0,0,0,0) !important;
}
.spoiler:hover
{
    color: #FFF9E3 !important;
}
.snippet-code
{
    border: none !important;
    padding: 0 !important;
}
.full-diff .skip
{
    background: rgba(255, 255, 255, .2) !important;
}
.full-diff td
{
    border-color: rgba(0, 0, 0, 0) !important;
}
.full-diff td.content
{
    color: #666 !important;
}
.full-diff td.content.deleted, .full-diff td.content.inserted
{
    color: inherit !important;
}
.full-diff .deleted > div, .post-timeline-v2 .post-timeline tr.deleted-event td, .post-timeline-v2 .post-timeline tr.deleted-event-details td
{
    background: rgba(255, 0, 0, .15) !important;
}
.full-diff .inserted > div
{
    background: rgba(0, 255, 0, .075) !important;
}
span.diff-delete
{
    background: rgba(255, 0, 0, .4) !important;
    color: #FAA !important;
}
span.diff-add
{
    background: rgba(0, 255, 0, .2) !important;
    color: #AFA !important;
}
.post-text img
{
    background: #FFF;
}
.question-summary, .flagged-post, .comment > td
{
    border-bottom: solid 1px rgba(255, 255, 255, 0.1) !important;
}
.comments
{
    border-top: solid 1px rgba(255, 255, 255, 0.2) !important;
}
ul.comments-list .comment>*
{
    border-bottom: solid 1px rgba(255, 255, 255, 0.2) !important;
}
.history-table .comments
{
    border-top: none !important;
}
.question-summary .status.unanswered, .question-summary .status.unanswered *
{
    color: #777 !important;
}
.question-summary .status.answered, .question-summary .status.answered-accepted
{
    background: rgba(255, 255, 255, 0.2) !important;
}
.question-summary .status.answered, .question-summary .status.answered-accepted, .question-summary .status.answered .mini-counts, .question-summary .status.answered-accepted .mini-counts
{
    font-weight: bold !important;
}
.question-summary .status.answered, .question-summary .status.answered .mini-counts, .post-timeline-v2 .filters .event-count
{
    color: #FFF !important;
}
.question-summary .status.answered-accepted, .question-summary .status.answered-accepted .mini-counts
{
    color: #FF0 !important;
}
.votes-cast-stats td
{
    color: #333 !important;
}
.user-page .mini-counts, .item-multiplier-count, .badgecount, .show-votes .sidebar-linked .spacer>a:first-child .answer-votes, .show-votes .sidebar-related .spacer>a:first-child .answer-votes
{
    color: #AAA !important;
    background: none !important;
}
.question-summary .status
{
    border: none !important;
}
.answer-votes
{
    color: #BBB !important;
}
.user-page .mini-counts.answered-accepted, .rep-up.special-rep, .show-votes .sidebar-linked .spacer>a:first-child .answer-votes.answered-accepted, .show-votes .sidebar-related .spacer>a:first-child .answer-votes.answered-accepted
{
    color: #CCC !important;
    background: rgba(0, 255, 0, 0.15) !important;
}
.user-show-new .user-rep-full .rep-table-row>td
{
    border-bottom: dotted 1px rgba(255, 255, 255, 0.2) !important;
}
.user-show-new .answer-summary
{
    border-bottom: solid 1px rgba(255, 255, 255, 0.2) !important;
}
.user-show-new .history-table>tbody>tr:not(:first-child):not(.loaded-body)
{
    border-top: solid 1px rgba(255, 255, 255, 0.1) !important;
}
.user-page .count-cell > .mini-counts, .user-rep .rep-up, .show-votes .sidebar-linked .spacer>a:first-child .answer-votes, .show-votes .sidebar-related .spacer>a:first-child .answer-votes
{
    border: solid 1px rgba(255, 255, 255, .5) !important;
}
.badge
{
    background: #404040 !important;
}
.badge:hover
{
    background: #555 !important;
}
#top-cards .card, .tag-container .col, .post-signature:last-child, #herobox, .review-stats-current-user, .review-stats-count-current-user
{
    border: solid 1px rgba(255, 255, 255, 0.1) !important;
}
#top-cards .card, .tag-container .col, .post-signature:last-child, #herobox, #hero-content, .review-stats-current-user, .review-stats-count-current-user
{
    background: rgba(255, 255, 255, 0.05) !important;
}
.review-stats-current-user
{
    border-right: none !important;
}
.review-stats-count-current-user
{
    border-left: none !important;
}
#herobox-mini
{
    background: none !important;
}
#hero-content
{
    border: none !important;
}
.container.dashboard .top-cards .card, table.doctag-cards .doctag-card, table.doctag-cards .doctag-card .card-top, table.doctag-cards .doctag-card .card-bottom
{
    background: none !important;
    border-color: rgba(255, 255, 255, .25) !important;
}
.panels .panel-empty, .panel-full .panel-empty
{
    background: none !important;
}
.question-status, .module.community-bulletin, .module.newuser, div.clc-jobs-multi, .realtime-post-deleted-notification p
{
    border: solid 1px rgba(255, 255, 255, 0.15) !important;
}
.deleted-answer .comments .comment:hover
{
    background: none !important;
}
.comments .comment[style]
{
    background-color: transparent !important;
}
div.clc-jobs-multi.orange
{
    background: rgba(283, 96, 20, .125) !important;
}
div.clc-jobs-multi.blue
{
    background: rgba(0, 119, 204, .15) !important;
}
div.clc-jobs-multi>.middle>ul>li
{
    border-top: none !important;
}
div.clc-jobs-multi>.middle>ul>li:first-child
{
    padding-top: 0 !important;
}
div.clc-jobs-multi>.middle>ul>li::before, div.clc-jobs-multi>.bottom::before
{
    content: " " !important;
    display: block !important;
    height: 1px !important;
    background: rgba(255, 255, 255, 0.2) !important;
    margin-bottom: 10px !important;
}
.module.community-bulletin, .module.newuser, .realtime-post-deleted-notification p, .deleted-answer, .s-sidebarwidget__yellow
{
    background: rgba(255, 0, 0, .075) !important;
}
div.clc-jobs-multi>.middle, div.clc-jobs-multi>.bottom
{
    background: none !important;
}
.module.community-bulletin
{
    color: #888 !important;
}
.question-status
{
    background: rgba(0, 100, 255, 0.2) !important;
}
.s-sidebarwidget, .s-sidebarwidget--header, .s-sidebarwidget--content
{
    border-color: rgba(255, 255, 255, 0.2) !important;
}
.s-sidebarwidget--header
{
    border-top: 0 !important;
}
.s-sidebarwidget::before, .s-sidebarwidget::after
{
    display: none !important;
}
.post-tag, .moderator-tag, .required-tag, .disliked-tag, .favorite-tag, .company-tag, .geo-tag, .geo-tag, .container .chosen-choices .search-choice, .container .chosen-container-multi .chosen-choices li.search-choice
{
    border-radius: 0 !important;
}
.post-tag, .ob-post-tag, #room-tags .tag, .postTag, ._tag
{
    background: rgba(255, 255, 255, 0.1) !important;
    color: #999 !important;
}
.post-tag:hover, .ob-post-tag:hover, #room-tags .tag:hover, .postTag:hover, ._tag:hover
{
    background: rgba(255, 255, 255, 0.2) !important;
}
.post-tag, .ob-post-tag, #room-tags .tag, .find-newest, .add-tab, .page-numbers:not(.desc):not(.dots), .postTag, ._tag
{
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    -webkit-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;
    -moz-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;
    -ms-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;
    -o-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;
    transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;
}
.p-top-tags .-tag-group
{
    background: none !important;
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    padding: 7px !important;
}
.p-highlights .-card
{
    background: none !important;
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
}
.p-highlights .-graph
{
    background-color: #CCC !important;
}
.p-highlights .-reputation .-rep
{
    color: #CCC !important;
}
.add-tab
{
    color: #888 !important;
    border: solid 1px rgba(255, 255, 255, 0.4) !important;
}
.required-tag
{
    border-color: rgba(255, 255, 255, 0.5) !important;
}
.required-tag:hover
{
    border-color: rgba(255, 255, 255, 0.75) !important;
}
.moderator-tag
{
    border-color: rgba(255, 255, 255, 0.3) !important;
    background: rgba(255, 0, 0, 0.15) !important;
}
.moderator-tag:hover
{
    border-color: rgba(255, 255, 255, 0.3) !important;
    background: rgba(255, 0, 0, 0.3) !important;
}
.page-numbers.current, .page-numbers:not(.desc):not(.dots):hover, .review-instructions-reason, .action-selected
{
    background: rgba(255, 255, 255, 0.1) !important;
    color: #FFF;
}
.page-numbers.desc, .page-numbers.dots
{
    color: #888 !important;
}
.find-newest, .add-tab
{
    border-radius: 0 !important;
}
.find-newest:hover, .add-tab:hover
{
    color: #AAA !important;
    border-color: #AAA !important;
}
hr
{
    background: rgba(255, 255, 255, 0.2) !important;
}
.user-show-new .user-rep-full .rep-recent-row, .user-show-new .highlight-row
{
    background: rgba(0,100,200,0.15) !important;
}
#question-header {
    background: none !important;
}
#question-header, .subheader, .answer, .help-category-box h3
{
    border-bottom: solid 1px rgba(255, 255, 255, 0.2) !important;
}
#question-header h1 a, .subheader h1, .subheader h2, div.user-card .user-card-name, #chat .system-message-container .system-message, #chat-body .msg-small, #chat-body .room-info, .docs-subheader.subheader .doctag-title a:not(.button), .topic-header .doc-topic-link, .topic-title-header .doc-topic-link
{
    color: #FFF !important;
}
.container #system-message
{
    color: #FFF !important;
    background: rgba(255, 255, 255, .1) !important;
    border: none !important;
    width: 1095px !important;
    border-radius: 0 !important;
}
.flagged-post .deleted-answer
{
    background: rgba(255, 0, 0, 0.1) !important;
}
.revision-comment
{
    color: inherit !important;
}
.revision td, .owner-revision td, .vote-revision td
{
    background: rgba(255, 255, 255, .1) !important;
}
.user-info .user-action-time, .reputation-score, .excerpt, .post-menu > a, .post-menu > span > a
{
    color: #999 !important;
}
.post-menu > a:hover, .post-menu > a:active, .post-menu > span > a:hover
{
    color: #CCC !important;
}
code
{
    background: #444 !important;
}
pre > code
{
    background: none !important;
}
#content pre
{
    background: #2F2F2F !important;
}
#query-options label
{
    color: #FFF !important;
}
.slick-row
{
    background: #fdfdfd !important;
}
code .pln, code .pun, code .ident
{
    color: #CCC !important;
}
code .kwd, code .tag, code .dec
{
    color: #C0C !important;
}
code .str, code .atv
{
    color: #0AF !important;
}
code .lit
{
    color: #900 !important;
}
code .typ, code .atn
{
    color: #0C0 !important;
}
code .com
{
    color: #080 !important;
}
.has-changed, .rollback, .version-line
{
    background: rgba(255, 255, 255, .05) !important;
    border: solid 1px rgba(255, 255, 255, .2) !important;
}
.user-page .card.impact-card .number a, .user-show-new .card.impact-card .number a
{
    color: #777 !important;
    text-decoration: none !important;
    transition: color .15s ease-in-out;
}
.user-page .card.impact-card .number a:hover, .user-show-new .card.impact-card .number a:hover
{
    color: #AAA !important;
}
.user-page .card.rep-card .rep, .user-show-new .card.rep-card .rep, .user-page .subheader.reloaded .mini-avatar .name, .avatar-card .reputation
{
    color: #DDD !important;
}
.avatar-card
{
    box-shadow: none !important;
    background: rgba(255,255,255,.05) !important;
}
.rep-increase
{
    background: green !important;
}
.progress-bar .label, .progress-bar-large .label
{
    color: #CCC !important;
}
.rep-card .progress-bar .percent, .progress-bar.green .percent, .rep-card .progress-bar-large .percent, .progress-bar-large.green .percent
{
    background: rgba(0,255,0,.15) !important;
}
.rep-card .progress-bar .bar:hover .percent, .progress-bar.green .bar:hover .percent, .rep-card .progress-bar-large .bar:hover .percent, .progress-bar-large.green .bar:hover .percent
{
    background: rgba(0,255,0,.25) !important;
}
.badges-card .progress-bar.badge-1 .bar .percent, .all-badge-progress .progress-bar.badge-1 .bar .percent, .badges-card .progress-bar-large.badge-1 .bar .percent, .all-badge-progress .progress-bar-large.badge-1 .bar .percent
{
    background: rgba(255, 204, 0, 0.25) !important;
}
.badges-card .progress-bar.badge-1 .bar:hover .percent, .all-badge-progress .progress-bar.badge-1 .bar:hover .percent, .badges-card .progress-bar-large.badge-1 .bar:hover .percent, .all-badge-progress .progress-bar-large.badge-1 .bar:hover .percent
{
    background: rgba(255, 204, 0, 0.35) !important;
}
.badges-card .progress-bar.badge-2 .bar .percent, .all-badge-progress .progress-bar.badge-2 .bar .percent, .badges-card .progress-bar-large.badge-2 .bar .percent, .all-badge-progress .progress-bar-large.badge-2 .bar .percent
{
    background: rgba(197,197,197,0.25) !important;
}
.badges-card .progress-bar.badge-2 .bar:hover .percent, .all-badge-progress .progress-bar.badge-2 .bar:hover .percent, .badges-card .progress-bar-large.badge-2 .bar:hover .percent, .all-badge-progress .progress-bar-large.badge-2 .bar:hover .percent
{
    background: rgba(197,197,197,0.35) !important;
}
.badges-card .progress-bar.badge-3 .bar .percent, .all-badge-progress .progress-bar.badge-3 .bar .percent, .badges-card .progress-bar-large.badge-3 .bar .percent, .all-badge-progress .progress-bar-large.badge-3 .bar .percent
{
    background: rgba(204,153,102,0.25) !important;
}
.badges-card .progress-bar.badge-3 .bar:hover .percent, .all-badge-progress .progress-bar.badge-3 .bar:hover .percent, .badges-card .progress-bar-large.badge-3 .bar:hover .percent, .all-badge-progress .progress-bar-large.badge-3 .bar:hover .percent
{
    background: rgba(204,153,102,0.35) !important;
}
.popup-badges .all-badge-progress .badge-progress .badge-description
{
    color: #CCC !important;
}
.popup-badges .all-badge-progress .badge-progress:hover
{
    background: rgba(255,255,255,.1) !important;
}
.new-post-activity, #new-answer-activity
{
    background: none !important;
    border: dotted 1px #FFF !important;
}
blockquote
{
    background: rgba(255, 255, 255, 0.1) !important;
    border-left-color: #FFF !important;
}
.review-bar-container .review-bar
{
    border: dotted 1px #CCC !important;
    box-shadow: none !important;
}
#tabs a, .tabs a, .newnav .tabs-list-container .tabs-list .intellitab a, .subtabs a, .filter a
{
    background: none !important;
    color: #999 !important;
    border-top-width: 0 !important;
    border-left-width: 0 !important;
    border-right-width: 0 !important;
    border-bottom-width: 2px !important;
    border-bottom-color: #999 !important;
}
#tabs a.youarehere, .tabs a.youarehere, .newnav .tabs-list-container .tabs-list .intellitab a.youarehere, .subtabs a.youarehere, .filter a.youarehere, #tabs a:hover, .tabs a:hover, .newnav .tabs-list-container .tabs-list .intellitab a:hover, .subtabs a:hover, .filter a:hover
{
    color: #FFF !important;
    border-bottom-color: #FFF !important;
}
#tabs a.youarehere:before, .tabs a.youarehere:before, .newnav .tabs-list-container .tabs-list .intellitab a.youarehere:before
{
    background: none !important;
}
.newnav .tabs-list-container .tabs-list .intellitab:after
{
    display: none !important;
}
.menu-switcher
{
    background-color: #333 !important;
    box-shadow: none !important;
}
.result-highlight
{
    color: #FFF !important;
}
.newnav div.welovestackoverflow
{
    margin-top: 10px !important;
    background-color: rgba(255,255,255,0.05) !important;
    color: #CCC !important;
}
/*.new_comment
{
    background: none !important;
    -webkit-animation: commentFadeIn 1.5s ease-in 1;
    -moz-animation: commentFadeIn 1.5s ease-in 1;
    animation: commentFadeIn 1.5s ease-in 1;
}
@-webkit-keyframes commentFadeIn
{
    0% { background: rgba(0, 255, 0, .1); }
    100% { background: rgba(0, 255, 0, 0); }
}
.answer-hyperlink:visited, .question-hyperlink:visited, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink:visited, #hot-network-questions ul a:visited, .post-text a:not(.post-tag):visited, .wmd-preview a:not(.post-tag):visited, .section-content a:not(.post-tag):visited, article.post.full-post .entry a:not(.post-tag):visited
{
    color: #777 !important;
}*/
` + visited + `
{
    color: #777 !important;
}
` + f({
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?((stackoverflow|superuser|(apple|docs-beta|skeptics)\\.stackexchange)\\.com|mathoverflow\\.net)$': `
#hlogo, #footer-logo, .header-logo
{
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;
    filter: invert(100%) hue-rotate(180deg) !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^meta\\.': `
.comment-user.owner
{
    background: rgba(0, 100, 255, 0.15) !important;
}
.comment-user.owner
{
    border: solid 1px rgba(0, 100, 255, 0.6) !important;
}
.user-page .mini-counts.answered-accepted, .rep-up.special-rep, .show-votes .sidebar-linked .spacer>a:first-child .answer-votes.answered-accepted, .show-votes .sidebar-related .spacer>a:first-child .answer-votes.answered-accepted
{
    background: rgba(255, 255, 0, 0.2) !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^stackoverflow\\.com$': `
.comment-user.owner
{
    background: rgba(0, 100, 255, 0.15) !important;
}
.comment-user.owner
{
    border: solid 1px rgba(0, 100, 255, 0.6) !important;
}
#footer .footerwrap #copyright, #footer .footerwrap #additional-notices, #footer .footerwrap #svnrev
{
    color: #888 !important;
}
#footer .footerwrap #copyright a, #footer .footerwrap #additional-notices a, #footer .footerwrap #svnrev a
{
    color: #aaa !important;
}
.container._full #content
{
    width: 1088px !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(meta\\.)?stackoverflow\\.com$': `
.vote
{
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;
    filter: invert(100%) hue-rotate(180deg) !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(((blog|chat)\\.)?stackoverflow|docs-beta\\.stackexchange)\\.com$': `
`+links+`
{
    color: #29F !important;
    text-decoration: none important;
}
`+hover+`
{
    color: #6BF !important;
    text-decoration: none important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^meta\\.(stackoverflow|superuser)\\.com': `
.comment-user.owner
{
    background: rgba(255, 0, 0, 0.15) !important;
}
.comment-user.owner
{
    border: solid 1px rgba(255, 0, 0, 0.6) !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^meta\\.stackoverflow\\.com$': `
`+links+`
{
    color: #BE1E2D !important;
}
`+hover+`
{
    color: #E64958 !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^chat.stackoverflow\\.com$': `
#chat a:not(.tag):not(.button), #sidebar a:not(.tag):not(.button)
{
    color: #08F;
}
#chat a:not(.tag):not(.button):hover, #sidebar a:not(.tag):not(.button):hover
{
    color: #4AF;
    text-decoration: none !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^blog.stackoverflow\\.com$': `
article.post.full-post .entry
{
    color: #CCC !important;
}
article.post.full-post .entry .metadata
{
    color: #888 !important;
}
#disqus_thread
{
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;
    filter: invert(100%) hue-rotate(180deg) !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?apple\\.stackexchange\\.com$': `
.question-summary .status
{
    border-radius: 4px !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?askubuntu\\.com$': `
#custom-header, .footerwrap
{
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;
    filter: invert(100%) hue-rotate(180deg) !important;
}
#custom-header > .nav-global
{
    box-shadow: none !important;
}
`+links+`
{
    color: #dd4814 !important;
}
`+hover+`
{
    color: #ff6d3a !important;
    text-decoration: none !important;
}
`+visited+`
{
    color: #962d0c !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?reverseengineering\\.stackexchange\\.com$': `
#header
{
    -webkit-filter: invert(100%) hue-rotate(180deg) brightness(1.5) !important;
    filter: invert(100%) hue-rotate(180deg) brightness(1.5) !important;
}
.container
{
    box-shadow: rgba(235,242,245,.1) 0 120px 0 inset !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?codereview\\.stackexchange\\.com$': `
#mainbar, #mainbar-full, .mainbar-full, #logout-page, #sidebar .module:not(.community-bulletin)
{
    background: none !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?skeptics\\.stackexchange\\.com$': `
`+links+`
{
    color: #157fad !important;
}
`+hover+`
{
    color: #1aa1db !important;
    text-decoration: none !important;
}
#hmenus .nav ul li:before
{
    mix-blend-mode: normal !important;
}
#hmenus .nav ul li a
{
    color: #DDD !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'api\\.stackexchange\\.com$': `
code
{
    color: #FFF !important;
    padding: 1px 5px !important;
    font-family: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif !important;
}
`,
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
}, location.hostname);
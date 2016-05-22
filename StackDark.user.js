// ==UserScript==
// @name         StackDark
// @author       Siguza
// @version      1.2
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
    '.container #system-message a',
    '.answer-hyperlink',
    '.question-hyperlink',
    '.comments-link',
    '.comment-user',
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
    '.wmd-preview a',
    '.comment-copy a',
    '.user-action-time a',
    '.excerpt a',
    '.started a:not(.started-link)',
    '.started .mod-flair',
    '.user-details a',
    '.bottom-share-links a',
    '.bottom-notice a:not(.post-tag)',
    '.section-content a',
    '.cv-list a',
    'article.post.full-post .entry a',
    'div.clc-jobs-multi>.middle>ul>li .title',
    'div.clc-jobs-multi>.bottom a',
];
var links = l.join(',');
var hover = l.reduce(function(p, c)
{
    p.push(c + ':hover');
    p.push(c + ':active');
    return p;
}, ['.started a:hover', '.started a:active']).join(',');


document.head.appendChild(document.createElement('style')).innerHTML = '\
body, .popup, .review-bar-container .review-bar, .cv-list\
{\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEUaGhohISElJSUh9lebAAAB20lEQVRIx4XWuZXDMAwE0C0SAQtggIIYoAAEU+aKOHhYojTrYP2+QfOW/5QIJOih/q8HwF/pb3EX+UPIveYcQGgEHiu9hI+ihEc5Jz5KBIlRRRaJ1JtoSAl5Hw96hLB1/up1tnIXOck5jZQy+3iU2hAOKSH1JvwxHsp+5TLF5MOl1/MQXsVs1miXc+KDbYydyMeUgpPQreZ7fWidbNhkXNJSeAhc6qHmHD8AYovunYyEACWEbyIhNeB9fRrH3hFi0bGPLuEW7xCNaohw1vAlS805nfsrTspclB/hVdoqusg53eH7FWot+wjYpOViX8KbFFKTwlnzvj65P9H/vD0/hibYBGhPwlPO8TmxRsaxsNnrUmUXpNhirlJMPr6Hqq9k5Xn/8iYQHYIuQsWFC6Z87IOxLxHphSY4SpuiU87xJnJr5axfeRd+lnMExXpEWPpuZ1v7qZdNBOjiHzDREHX5fs5Zz9p6X0vVKbKKchlSl5rv+3p//FJ/PYvoKryI8vs+2G9lzRmnEKkh+BU8yDk515jDj/HAswu7CCz6U/Mxb/PnC9N41ndpU4hUU7JGk/C9PmP/M2xZYdvBW2PObyf1IUiIzoHmHW9yTncliYs9A9tVNppdShfgQaTLMf+j3X723tLeHgAAAABJRU5ErkJggg==) !important;\
}\
.cv-list, .cv-list hr\
{\
    border-color: #AAA !important;\
}\
.popup-close a\
{\
    border: dotted 1px #999 !important;\
    padding: 3px 6px 2px 6px !important;\
}\
.popup-close a:hover\
{\
    color: #777 !important;\
}\
.container, #content, .tag-container\
{\
    background: none !important;\
}\
#main-content\
{\
    color: #CCC !important;\
}\
._background-light\
{\
    background: rgba(255, 255, 255, .05) !important;\
}\
#content, #chat .messages, #chat-body #sidebar, #chat-body a.signature .flair, #sidebar h4, .popup\
{\
    color: #CCC !important;\
}\
#content\
{\
    border: solid 1px rgba(255, 255, 255, 0.2) !important;\
    border-bottom: none !important;\
}\
#footer, #chat-body #input-area\
{\
    background: #333 !important;\
}\
#chat-body #sound, #chat-body .button, #chat-body .stars:not(.user-star) .img.vote, .bounty-link, .module.community-bulletin .bulletin-title, .module.question-stats, .votes-cast-stats, .user-stats, .comment-up-on, .comment-up-off, .comment-flag, .openid-icon\
{\
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;\
    filter: invert(100%) hue-rotate(180deg) !important;\
}\
#chat .messages\
{\
    background: none !important;\
    border: dotted 1px rgba(255, 255, 255, 0.3);\
}\
#chat-body #roomname\
{\
    text-shadow: none !important;\
}\
#chat-body a .username.owner\
{\
    color: #BB0 !important;\
}\
#chat-body a:hover .username.owner\
{\
    color: #FF0 !important;\
}\
#chat-body a .username.moderator\
{\
    color: #900 !important;\
}\
#chat-body a:hover .username.moderator\
{\
    color: #C00 !important;\
}\
#chat-body .catchup-marker\
{\
    border-top: none !important;\
}\
#chat div.message:hover, #chat .timestamp:hover + div.message\
{\
    border: solid 1px rgba(0, 0, 0, 0) !important;\
    background: rgba(255, 255, 255, 0.1) !important;\
}\
#chat div.message .meta\
{\
    background: #333 !important;\
}\
#chat-body a.signature\
{\
    color: #08F !important;\
}\
#chat-body a.signature:hover\
{\
    color: #4AF !important;\
}\
#chat .timestamp\
{\
    background: none !important;\
    color: #FFF !important;\
}\
.tagged-interesting, #chat .mine .messages\
{\
    background: rgba(0, 255, 0, 0.1) !important;\
}\
#chat .mention\
{\
    background: rgba(0, 255, 0, 0.2) !important;\
    padding: 1px 3px !important;\
    margin: -1px -3px !important;\
    border-radius: 8px !important;\
}\
#chat .reply-parent, #chat .reply-child\
{\
    background: rgba(255, 255, 0, 0.2) !important;\
}\
#chat-feature\
{\
    border: solid 1px rgba(255, 255, 255, .15) !important;\
    border-radius: 5px !important;\
    background: rgba(255, 255, 255, .05) !important;\
}\
#chat-feature h4\
{\
    margin: 0 !important;\
    padding: 12px 10px 4px 10px !important;\
}\
#chat-feature .ad502-room\
{\
    background: none !important;\
    border: none !important;\
    border-radius: 0 !important;\
    padding-left: 10px !important;\
    padding-right: 10px !important;\
    -webkit-box-shadow: none !important;\
    box-shadow: none !important;\
    padding-top: 2px !important;\
    padding-bottom: 0 !important;\
}\
#chat-feature .ad502-room:last-child\
{\
    padding-bottom: 5px !important;\
}\
#chat-feature .ad502-room::before\
{\
    content: " " !important;\
    display: block !important;\
    height: 1px !important;\
    background: rgba(255, 255, 255, .15) !important;\
    margin-bottom: 5px !important;\
}\
#newsletter-ad\
{\
    background: rgba(0,255,255,.08) !important;\
    border: solid 1px rgba(255,255,255,.25) !important;\
    padding: 0 14px 0 14px !important;\
}\
#newsletter-ad::before\
{\
    content: "Love this site?" !important;\
    font-weight: bold !important;\
    font-size: 30px !important;\
    display: block !important;\
    margin-top: 23px !important;\
    color: #FFF !important;\
}\
#newsletter-ad-header\
{\
    margin-top: 20px !important;\
}\
.suggested-edit .body-diffs .full-diff .skip\
{\
    background: rgba(255, 255, 255, .2) !important;\
}\
.suggested-edit .body-diffs .full-diff td\
{\
    border-color: rgba(0, 0, 0, 0) !important;\
}\
.suggested-edit .body-diffs .full-diff td.content\
{\
    color: #666 !important;\
}\
.suggested-edit .body-diffs .full-diff td.content.deleted, .suggested-edit .body-diffs .full-diff td.content.inserted\
{\
    color: inherit !important;\
}\
.suggested-edit .body-diffs .full-diff .deleted > div\
{\
    background: rgba(255, 0, 0, .1) !important;\
}\
.suggested-edit .body-diffs .full-diff .inserted > div\
{\
    background: rgba(0, 255, 0, .05) !important;\
}\
span.diff-delete\
{\
    background: rgba(255, 0, 0, .4) !important;\
    color: #FAA !important;\
}\
span.diff-add\
{\
    background: rgba(0, 255, 0, .2) !important;\
    color: #AFA !important;\
}\
.post-text img\
{\
    background: #FFF;\
}\
.question-summary, .flagged-post, .comment > td\
{\
    border-bottom: solid 1px rgba(255, 255, 255, 0.1) !important;\
}\
.comments\
{\
    border-top: solid 1px rgba(255, 255, 255, 0.2) !important;\
}\
.question-summary .status.unanswered, .question-summary .status.unanswered *\
{\
    color: #777 !important;\
}\
.question-summary .status.answered, .question-summary .status.answered-accepted\
{\
    background: rgba(255, 255, 255, 0.2) !important;\
}\
.question-summary .status.answered, .question-summary .status.answered-accepted, .question-summary .status.answered .mini-counts, .question-summary .status.answered-accepted .mini-counts\
{\
    font-weight: bold !important;\
}\
.question-summary .status.answered, .question-summary .status.answered .mini-counts\
{\
    color: #FFF !important;\
}\
.question-summary .status.answered-accepted, .question-summary .status.answered-accepted .mini-counts\
{\
    color: #FF0 !important;\
}\
.mini-counts.answered-accepted, .rep-up.special-rep\
{\
    background: rgba(0, 255, 0, 0.1) !important;\
    color: #CCC !important;\
    border-color: #AAA !important;\
}\
#top-cards .card, .tag-container .col, .post-signature:last-child, #herobox, .review-stats-current-user, .review-stats-count-current-user\
{\
    border: solid 1px rgba(255, 255, 255, 0.1) !important;\
}\
#top-cards .card, .tag-container .col, .post-signature:last-child, #herobox, #hero-content, .review-stats-current-user, .review-stats-count-current-user\
{\
    background: rgba(255, 255, 255, 0.05) !important;\
}\
.review-stats-current-user\
{\
    border-right: none !important;\
}\
.review-stats-count-current-user\
{\
    border-left: none !important;\
}\
#herobox-mini\
{\
    background: none !important;\
}\
#hero-content\
{\
    border: none !important;\
}\
.question-status, .module.community-bulletin, .module.newuser, div.clc-jobs-multi\
{\
    border: solid 1px rgba(255, 255, 255, 0.15) !important;\
}\
div.clc-jobs-multi.orange\
{\
    background: rgba(283, 96, 20, .125) !important;\
}\
div.clc-jobs-multi.blue\
{\
    background: rgba(0, 119, 204, .15) !important;\
}\
div.clc-jobs-multi>.middle>ul>li\
{\
    border-top: none !important;\
}\
div.clc-jobs-multi>.middle>ul>li:first-child\
{\
    padding-top: 0 !important;\
}\
div.clc-jobs-multi>.middle>ul>li::before, div.clc-jobs-multi>.bottom::before\
{\
    content: " " !important;\
    display: block !important;\
    height: 1px !important;\
    background: rgba(255, 255, 255, 0.2) !important;\
    margin-bottom: 10px !important;\
}\
.module.community-bulletin, .module.newuser\
{\
    background: rgba(255, 0, 0, .075) !important;\
}\
div.clc-jobs-multi>.middle, div.clc-jobs-multi>.bottom\
{\
    background: none !important;\
}\
.module.community-bulletin\
{\
    color: #888 !important;\
}\
.question-status\
{\
    background: rgba(0, 100, 255, 0.2) !important;\
}\
.post-tag, .ob-post-tag, #room-tags .tag, .postTag, ._tag\
{\
    background: rgba(255, 255, 255, 0.1) !important;\
    color: #999 !important;\
}\
.post-tag:hover, .ob-post-tag:hover, #room-tags .tag:hover, .postTag:hover, ._tag:hover\
{\
    background: rgba(255, 255, 255, 0.2) !important;\
}\
.post-tag, .ob-post-tag, #room-tags .tag, .find-newest, .add-tab, .page-numbers:not(.desc):not(.dots), .postTag, ._tag\
{\
    border: solid 1px rgba(255, 255, 255, 0.2) !important;\
    -webkit-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;\
    -moz-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;\
    -ms-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;\
    -o-transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;\
    transition: color 0.15s ease, background 0.15s ease, border 0.15s ease;\
}\
.required-tag\
{\
    border-color: rgba(255, 255, 255, 0.5) !important;\
}\
.required-tag:hover\
{\
    border-color: rgba(255, 255, 255, 0.75) !important;\
}\
.moderator-tag\
{\
    border-color: rgba(255, 255, 255, 0.3) !important;\
    background: rgba(255, 0, 0, 0.15) !important;\
}\
.moderator-tag:hover\
{\
    border-color: rgba(255, 255, 255, 0.3) !important;\
    background: rgba(255, 0, 0, 0.3) !important;\
}\
.page-numbers.current, .page-numbers:not(.desc):not(.dots):hover, .review-instructions-reason, .action-selected\
{\
    background: rgba(255, 255, 255, 0.1) !important;\
    color: #FFF;\
}\
.page-numbers.desc, .page-numbers.dots\
{\
    color: #888 !important;\
}\
.find-newest, .add-tab\
{\
    border-radius: 0 !important;\
}\
.find-newest:hover, .add-tab:hover\
{\
    color: #AAA !important;\
    border-color: #AAA !important;\
}\
hr\
{\
    background: rgba(255, 255, 255, 0.2) !important;\
}\
.user-show-new .user-rep-full .rep-recent-row, .user-show-new .highlight-row\
{\
    background: rgba(0,100,200,0.15) !important;\
}\
#question-header {\
    background: none !important;\
}\
#question-header, .subheader, .answer, .help-category-box h3\
{\
    border-bottom: solid 1px rgba(255, 255, 255, 0.2) !important;\
}\
#question-header h1 a, .subheader h1, .subheader h2, div.user-card .user-card-name, #chat .system-message-container .system-message, #chat-body .msg-small, #chat-body .room-info\
{\
    color: #FFF !important;\
}\
.container #system-message\
{\
    color: #FFF !important;\
    background: rgba(255, 255, 255, .1) !important;\
    border: none !important;\
    width: 1095px !important;\
    border-radius: 0 !important;\
}\
.flagged-post .deleted-answer\
{\
    background: rgba(255, 0, 0, 0.15) !important;\
}\
.revision-comment\
{\
    color: inherit !important;\
}\
.revision td, .owner-revision td, .vote-revision td\
{\
    background: rgba(255, 255, 255, .1) !important;\
}\
.user-info .user-action-time, .reputation-score, .excerpt, .post-menu > a, .post-menu > span > a\
{\
    color: #999 !important;\
}\
.post-menu > a:hover, .post-menu > a:active, .post-menu > span > a:hover\
{\
    color: #CCC !important;\
}\
code\
{\
    background: #444 !important;\
}\
pre > code\
{\
    background: none !important;\
}\
pre\
{\
    background: #2F2F2F !important;\
}\
code .pln, code .pun\
{\
    color: #CCC !important;\
}\
code .kwd, code .tag, code .dec\
{\
    color: #C0C !important;\
}\
code .str, code .atv\
{\
    color: #0AF !important;\
}\
code .lit\
{\
    color: #900 !important;\
}\
code .typ, code .atn\
{\
    color: #0C0 !important;\
}\
code .com\
{\
    color: #080 !important;\
}\
.new-post-activity, #new-answer-activity\
{\
    background: none !important;\
    border: dotted 1px #FFF !important;\
}\
blockquote\
{\
    background: rgba(255, 255, 255, 0.1) !important;\
    border-left-color: #FFF !important;\
}\
.review-bar-container .review-bar\
{\
    border: dotted 1px #CCC !important;\
    box-shadow: none !important;\
}\
#tabs a, .tabs a, .newnav .tabs-list-container .tabs-list .intellitab a, .subtabs a, .filter a\
{\
    background: none !important;\
    color: #999 !important;\
    border-top-width: 0 !important;\
    border-left-width: 0 !important;\
    border-right-width: 0 !important;\
    border-bottom-width: 2px !important;\
    border-bottom-color: #999 !important;\
}\
#tabs a.youarehere, .tabs a.youarehere, .newnav .tabs-list-container .tabs-list .intellitab a.youarehere, .subtabs a.youarehere, .filter a.youarehere, #tabs a:hover, .tabs a:hover, .newnav .tabs-list-container .tabs-list .intellitab a:hover, .subtabs a:hover, .filter a:hover\
{\
    color: #FFF !important;\
    border-bottom-color: #FFF !important;\
}\
.newnav .tabs-list-container .tabs-list .intellitab:after\
{\
    display: none !important;\
}\
.menu-switcher\
{\
    background-color: #333 !important;\
    box-shadow: none !important;\
}\
.result-highlight\
{\
    color: #FFF !important;\
}\
.newnav div.welovestackoverflow\
{\
    margin-top: 10px !important;\
    background-color: rgba(255,255,255,0.05) !important;\
    color: #CCC !important;\
}\
/*.new_comment\
{\
    background: none !important;\
    -webkit-animation: commentFadeIn 1.5s ease-in 1;\
    -moz-animation: commentFadeIn 1.5s ease-in 1;\
    animation: commentFadeIn 1.5s ease-in 1;\
}\
@-webkit-keyframes commentFadeIn\
{\
    0% { background: rgba(0, 255, 0, .1); }\
    100% { background: rgba(0, 255, 0, 0); }\
}*/\
.answer-hyperlink:visited, .question-hyperlink:visited, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink:visited, #hot-network-questions ul a:visited, .post-text a:visited, .wmd-preview a:visited, .section-content a:visited, article.post.full-post .entry a:visited\
{\
    color: #777 !important;\
}\
' + f({
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?((stackoverflow|superuser|(apple|docs-beta)\\.stackexchange)\\.com|mathoverflow\\.net)$': '\
#hlogo, #footer-logo, .header-logo\
{\
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;\
    filter: invert(100%) hue-rotate(180deg) !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^meta\\.': '\
.comment-user.owner\
{\
    background: rgba(0, 100, 255, 0.15) !important;\
}\
.comment-user.owner\
{\
    border: solid 1px rgba(0, 100, 255, 0.6) !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^stackoverflow\\.com$': '\
.comment-user.owner\
{\
    background: rgba(0, 100, 255, 0.15) !important;\
}\
.comment-user.owner\
{\
    border: solid 1px rgba(0, 100, 255, 0.6) !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(((blog|chat)\\.)?stackoverflow|docs-beta\\.stackexchange)\\.com$': '\
'+links+'\
{\
    color: #29F !important;\
    text-decoration: none important;\
}\
'+hover+'\
{\
    color: #6BF !important;\
    text-decoration: none important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^meta.stackoverflow\\.com$': '\
.comment-user.owner\
{\
    background: rgba(255, 0, 0, 0.15) !important;\
}\
.comment-user.owner\
{\
    border: solid 1px rgba(255, 0, 0, 0.6) !important;\
}\
'+links+'\
{\
    color: #BE1E2D !important;\
}\
'+hover+'\
{\
    color: #E64958 !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^chat.stackoverflow\\.com$': '\
#chat a:not(.tag):not(.button), #sidebar a:not(.tag):not(.button)\
{\
    color: #08F;\
}\
#chat a:not(.tag):not(.button):hover, #sidebar a:not(.tag):not(.button):hover\
{\
    color: #4AF;\
    text-decoration: none !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^blog.stackoverflow\\.com$': '\
article.post.full-post .entry\
{\
    color: #CCC !important;\
}\
article.post.full-post .entry .metadata\
{\
    color: #888 !important;\
}\
#disqus_thread\
{\
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;\
    filter: invert(100%) hue-rotate(180deg) !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?apple\\.stackexchange\\.com$': '\
.question-summary .status\
{\
    border-radius: 4px !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
'^(.*\\.)?askubuntu\\.com$': '\
#custom-header, .footerwrap\
{\
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;\
    filter: invert(100%) hue-rotate(180deg) !important;\
}\
#custom-header > .nav-global\
{\
    box-shadow: none !important;\
}\
',
// -------------------- -------------------- -------------------- -------------------- -------------------- -------------------- --------------------
}, location.hostname);
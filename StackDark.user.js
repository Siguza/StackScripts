// ==UserScript==
// @name         StackDark
// @author       Siguza
// @version      1.0
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

document.head.appendChild(document.createElement('style')).innerHTML = '\
body, .popup, .review-bar-container .review-bar\
{\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAACVBMVEUaGhohISElJSUh9lebAAAB20lEQVRIx4XWuZXDMAwE0C0SAQtggIIYoAAEU+aKOHhYojTrYP2+QfOW/5QIJOih/q8HwF/pb3EX+UPIveYcQGgEHiu9hI+ihEc5Jz5KBIlRRRaJ1JtoSAl5Hw96hLB1/up1tnIXOck5jZQy+3iU2hAOKSH1JvwxHsp+5TLF5MOl1/MQXsVs1miXc+KDbYydyMeUgpPQreZ7fWidbNhkXNJSeAhc6qHmHD8AYovunYyEACWEbyIhNeB9fRrH3hFi0bGPLuEW7xCNaohw1vAlS805nfsrTspclB/hVdoqusg53eH7FWot+wjYpOViX8KbFFKTwlnzvj65P9H/vD0/hibYBGhPwlPO8TmxRsaxsNnrUmUXpNhirlJMPr6Hqq9k5Xn/8iYQHYIuQsWFC6Z87IOxLxHphSY4SpuiU87xJnJr5axfeRd+lnMExXpEWPpuZ1v7qZdNBOjiHzDREHX5fs5Zz9p6X0vVKbKKchlSl5rv+3p//FJ/PYvoKryI8vs+2G9lzRmnEKkh+BU8yDk515jDj/HAswu7CCz6U/Mxb/PnC9N41ndpU4hUU7JGk/C9PmP/M2xZYdvBW2PObyf1IUiIzoHmHW9yTncliYs9A9tVNppdShfgQaTLMf+j3X723tLeHgAAAABJRU5ErkJggg==) !important;\
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
#chat-body #sound, #chat-body .button, #chat-body .stars:not(.user-star) .img.vote, .bounty-link, .module.community-bulletin .bulletin-title, .module.question-stats, .votes-cast-stats, .user-stats\
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
#chat-body .catchup-marker\
{\
    border-top: none !important;\
}\
#chat div.message:hover, #chat .timestamp:hover + div.message\
{\
    border: solid 1px rgba(0, 0, 0, 0) !important;\
    background: rgba(255, 255, 255, 0.05) !important;\
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
.question-status, .module.community-bulletin, .module.newuser\
{\
    border: solid 1px rgba(255, 255, 255, 0.1) !important;\
}\
.module.community-bulletin, .module.newuser\
{\
    background: rgba(255, 0, 0, 0.05) !important;\
}\
.module.community-bulletin\
{\
    color: #888 !important;\
}\
.question-status\
{\
    background: rgba(0, 100, 255, 0.15) !important;\
}\
.post-tag, .ob-post-tag, #room-tags .tag, .postTag\
{\
    background: rgba(255, 255, 255, 0.1) !important;\
    color: #999 !important;\
}\
.post-tag:hover, .ob-post-tag:hover, #room-tags .tag:hover, .postTag:hover\
{\
    background: rgba(255, 255, 255, 0.2) !important;\
}\
.post-tag, .ob-post-tag, #room-tags .tag, .find-newest, .add-tab, .page-numbers:not(.desc):not(.dots), .postTag\
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
.flagged-post .deleted-answer\
{\
    background: rgba(255, 0, 0, 0.15) !important;\
}\
.revision-comment\
{\
    color: inherit !important;\
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
' + f({
// --------------------
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
// --------------------
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
// --------------------
'^meta.stackoverflow\\.com$': '\
.comment-user.owner\
{\
    background: rgba(255, 0, 0, 0.15) !important;\
}\
.comment-user.owner\
{\
    border: solid 1px rgba(255, 0, 0, 0.6) !important;\
}\
.answer-hyperlink, .question-hyperlink, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink\
{\
    color: #BE1E2D !important;\
}\
.answer-hyperlink:visited, .question-hyperlink:visited, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink:visited\
{\
    color: #777 !important;\
}\
.answer-hyperlink:hover, .question-hyperlink:hover, .answer-hyperlink:active, .question-hyperlink:active, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink:hover, #sidebar .community-bulletin .bulletin-item-content a.question-hyperlink:active\
{\
    color: #E64958 !important;\
}\
',
// --------------------
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
// --------------------
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
// --------------------
'^(.*\\.)?((stackoverflow|superuser|apple\\.stackexchange)\\.com|mathoverflow\\.net)$': '\
#hlogo, #footer-logo\
{\
    -webkit-filter: invert(100%) hue-rotate(180deg) !important;\
    filter: invert(100%) hue-rotate(180deg) !important;\
}\
',
// --------------------
'^(.*\\.)?apple\\.stackexchange\\.com$': '\
.question-summary .status\
{\
    border-radius: 4px !important;\
}\
',
// --------------------
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
// --------------------
}, location.hostname);
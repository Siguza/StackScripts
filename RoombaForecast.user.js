// ==UserScript==
// @name         RoombaForecast
// @author       Siguza
// @version      1.2.0
// @description  Is the roomba gonna pick up a question or not?
// @namespace    siguza.roombaforecast
// @homepage     https://github.com/Siguza/StackScripts
// @run-at       document-start
// @grant        none
// @include      /^https?:\/\/(.*\.)?stackoverflow\.com/questions/.*$/
// @include      /^https?:\/\/(.*\.)?serverfault\.com/questions/.*$/
// @include      /^https?:\/\/(.*\.)?superuser\.com/questions/.*$/
// @include      /^https?:\/\/(.*\.)?stackexchange\.com/questions/.*$/
// @include      /^https?:\/\/(.*\.)?askubuntu\.com/questions/.*$/
// @include      /^https?:\/\/(.*\.)?mathoverflow\.net/questions/.*$/
// @include      /^https?:\/\/discuss\.area51\.stackexchange\.com/questions/.*$/
// @include      /^https?:\/\/stackapps\.com/questions/.*$/
// ==/UserScript==

const f = () =>
{
    if(!document.getElementById('question'))
        return;

    /* Filter fields:
     *
     * .backoff
     * .error_message
     * .items
     * .quota_remaining
     * question.locked_date
     * question.closed_reason
     * question.closed_date
     * question.last_edit_date
     * question.creation_date
     * question.reopen_vote_count
     * question.answer_count
     * question.score
    **/
    const FILTER_ID = '!42e*0nBzm.8kK9gfB62buMzeatPvqK.zA';

    const XHR = (type, url, data, cb) =>
    {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.addEventListener('load', ev => cb(ev.target.response));
        xhr.addEventListener('error', ev => console.error(ev));
        xhr.send(data);
    }
    const getQuestionId = () => document.getElementById('question').dataset.questionid;
    const addRoombaField = () =>
    {
        let container = document.getElementById('question-header').nextElementSibling;
        if(container.id != '')
        {
            throw "Can't find right container element";
        }
        let parent = container.appendChild(document.createElement('div')),
            label  = parent.appendChild(document.createElement('span')),
            _      = parent.appendChild(document.createTextNode(' ')),
            ret    = parent.appendChild(document.createTextNode(''));
        parent.className = parent.previousElementSibling.className;
        label.className = parent.previousElementSibling.firstElementChild.className;
        parent.style.marginLeft = '20px';

        label.textContent = 'roomba';
        ret.textContent = '...';
        return ret;
    }

    let roombaField = addRoombaField();

    XHR('GET', 'https://api.stackexchange.com/2.3/questions/' + getQuestionId() + '?site=' + location.hostname + '&filter=' + FILTER_ID, null, res =>
    {
        let data = JSON.parse(res),
            q = data.items[0],
            reasons = [];

        //console.log(data.quota_remaining);

        if(q === undefined)
        {
            roombaField.textContent = 'already deleted';
            return;
        }

        /* Most up-to-date roomba criteria: https://meta.stackexchange.com/q/419988
         *
         * If the question was closed more than 9 days ago, and ...
         * - not closed as a duplicate
         * - has a score of 0 or less
         * - is not locked
         * - has no non-deleted answers
         * - has no pending reopen votes
         * - has not been edited in the past 14 days
        **/
        let days = Math.floor((Math.max((q.closed_date || 0) + 10 * 86400, (q.last_edit_date || q.creation_date) + 15 * 86400) - Date.now() / 1000) / 86400);

        if('locked_date' in q)
            reasons.push('locked');
        if(q.closed_reason && q.closed_reason.startsWith('Duplicate'))
            reasons.push('duplicate');
        if(!('closed_date' in q))
            reasons.push('not closed');
        if(q.reopen_vote_count > 0)
            reasons.push('reopen votes');
        if(q.answer_count > 0)
            reasons.push('non-deleted answers');
        if(q.score > 0)
            reasons.push('positive score');
        if(days < 0)
            reasons.push('untouched for too long');

        if(reasons.length > 0)
        {
            roombaField.textContent = reasons.join(', ');
        }
        else
        {
            roombaField.textContent = days === 0 ? '< 24h' : (days + ' day' + (days === 1 ? '' : 's'));
        }
    });
};

if(document.readyState == 'loading')
{
    window.addEventListener('DOMContentLoaded', f);
}
else
{
    f();
}

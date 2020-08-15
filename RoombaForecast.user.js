// ==UserScript==
// @name         RoombaForecast
// @author       Siguza
// @version      1.1.4
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

window.addEventListener('DOMContentLoaded', function()
{
    if(!document.getElementById('question'))
        return;

    const FILTER_ID = '!)IMJFnSTdupIEnngEcvB24U1Dk97gjd1_UVZ';

    function XHR(type, url, data, cb)
    {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.addEventListener('load', function(ev)
        {
            cb(ev.target.response);
        });
        xhr.addEventListener('error', function(ev)
        {
            console.error(ev);
        });
        xhr.send(data);
    }
    function getQuestionId()
    {
        return document.getElementById('question').dataset.questionid;
    }
    function addRoombaField()
    {
        /*let row = document.getElementById('qinfo').insertRow(),
            labelCell = row.insertCell(),
            label = labelCell.appendChild(document.createElement('p')),
            valueCell = row.insertCell(),
            value = valueCell.appendChild(document.createElement('p')),
            ret = value.appendChild(document.createElement('b'));
        label.className = value.className = 'label-key';
        labelCell.style.verticalAlign = 'top';
        valueCell.style.paddingLeft = '10px';*/

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

    XHR('GET', 'https://api.stackexchange.com/2.2/questions/' + getQuestionId() + '?site=' + location.hostname + '&filter=' + FILTER_ID, null, function(res)
    {
        let data = JSON.parse(res),
            q = data.items[0],
            a = 0,
            reasons = [];

        //console.log(data.quota_remaining);

        if(q === undefined)
        {
            roombaField.textContent = 'already deleted';
            return;
        }

        if('answers' in q)
        {
            a = q.answers.filter(function(e)
            {
                return e.score > 0;
            }).length;
        }

        if('locked_date' in q)
            reasons.push('locked');
        if(q.closed_reason && q.closed_reason.startsWith('Duplicate of')) //if(q.closed_reason == 'duplicate')
            reasons.push('duplicate');
        if(!('closed_date' in q))
            reasons.push('not closed');
        if(q.reopen_vote_count > 0)
            reasons.push('reopen votes');
        if('accepted_answer_id' in q)
            reasons.push('accepted answer');
        if(a > 0)
            reasons.push('positive-scoring answers');
        if(q.score > 0)
            reasons.push('positive score');

        if(reasons.length > 0)
        {
            //roombaField.innerHTML = reasons.join('<br>');
            roombaField.textContent = reasons.join(', ');
        }
        else
        {
            let days = Math.max(Math.floor(Math.max(q.closed_date || 0, q.last_edit_date || 0) / 86400) - Math.floor(Date.now() / 1000 / 86400) + 10, 0);
            roombaField.textContent = days === 0 ? '< 24h' : (days + ' day' + (days === 1 ? '' : 's'));
        }
    });
});
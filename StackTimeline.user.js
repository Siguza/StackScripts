// ==UserScript==
// @name         StackTimeline
// @author       Siguza
// @version      1.0.0
// @description  Add a timeline link to every post
// @namespace    siguza.stacktimeline
// @homepage     https://github.com/Siguza/StackScripts
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

// Question
(function(q)
{
    var m = q.querySelector('.post-menu'),
        s = document.createElement('span'),
        l = document.createElement('a');
    s.className = 'lsep';
    s.textContent = '|';
    l.href = location.origin + '/posts/' + q.dataset.questionid + '/timeline';
    l.textContent = 'timeline';
    m.appendChild(s);
    m.appendChild(l);
})(document.querySelector('.question'));

// Existing answers
Array.prototype.forEach.call(document.querySelectorAll('.answer'), function(a)
{
    var m = a.querySelector('.post-menu'),
        s = document.createElement('span'),
        l = document.createElement('a');
    s.className = 'lsep';
    s.textContent = '|';
    l.href = location.origin + '/posts/' + a.dataset.answerid + '/timeline';
    l.textContent = 'timeline';
    m.appendChild(s);
    m.appendChild(l);
});

// Future answers
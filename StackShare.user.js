// ==UserScript==
// @name         StackShare
// @author       Siguza
// @version      1.0.1
// @description  Make the share link HTTPS and remove userid
// @namespace    siguza.stackshare
// @homepage     https://github.com/Siguza/StackScripts
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

var m = new MutationObserver(function(r)
{
    r.forEach(function(e)
    {
        for(var i = 0, n = e.addedNodes, len = n.length; i < len; i++)
        {
            var c = n[i];
            if(c.nodeType === 1 && c.classList.contains('share-tip'))
            {
                var l = c.getElementsByTagName('input')[0];
                l.value = 'https://' + /^https?:\/\/([^\/]+\.[^\/]+\/(?:q|a)\/\d+)(?:\/|\/\d+\/?)?$/.exec(l.value)[1];
                l.select();
            }
        }
    });
});
m.observe(document.body,
{
    childList: true,
    subtree: true,
});

// ==UserScript==
// @name         StackImgurByLink
// @author       Siguza
// @version      1.0.2
// @description  Always shows the "Link from the web" box for images
// @namespace    siguza.stackimglink
// @homepage     https://github.com/Siguza/StackScripts
// @grant        none
// @include      /^https?:\/\/(.*\.)?stackoverflow\.com/.*$/
// @include      /^https?:\/\/(.*\.)?serverfault\.com/.*$/
// @include      /^https?:\/\/(.*\.)?superuser\.com/.*$/
// @include      /^https?:\/\/(.*\.)?stackexchange\.com/.*$/
// @include      /^https?:\/\/(.*\.)?askubuntu\.com/.*$/
// @include      /^https?:\/\/(.*\.)?mathoverflow\.com/.*$/
// @include      /^https?:\/\/discuss\.area51\.stackexchange\.com/.*$/
// @include      /^https?:\/\/stackapps\.com/.*$/
// ==/UserScript==

var header = document.getElementById('header');
if (header)
{
    new MutationObserver(function(records)
    {
        records.forEach(function(r)
        {
            Array.prototype.forEach.call(r.addedNodes, function(n)
            {
                if (n.classList.contains('image-upload'))
                {
                    new MutationObserver(function(records, self)
                    {
                        var link = n.querySelector('.modal-options-default.tab-page a');
                        if(link)
                        {
                            link.click();
                            self.disconnect();
                        }
                    }).observe(n, {childList: true});
                }
            });
        });
    }).observe(header, {childList: true});
}

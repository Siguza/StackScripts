// ==UserScript==
// @name         StackNoFollow
// @author       Siguza
// @version      1.0.3
// @description  Makes nofollow links purple
// @namespace    siguza.stacknofollow
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

var s = document.createElement('style');
s.innerHTML = 'a[rel="nofollow"],.post-text a[rel="nofollow"]{color:#C0C !important}a[rel="nofollow"]:hover,.post-text a[rel="nofollow"]:hover,a[rel="nofollow"]:visited:hover,.post-text a[rel="nofollow"]:visited:hover{color:#F0F !important}a[rel="nofollow"]:visited,.post-text a[rel="nofollow"]:visited{color:#909 !important}';
document.head.appendChild(s);

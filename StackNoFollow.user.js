// ==UserScript==
// @name         StackNoFollow
// @author       Siguza
// @version      1.0.1
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
s.innerHTML = 'a[rel="nofollow"]{color:#C0C !important}a[rel="nofollow"]:visited{color:#909 !important}a[rel="nofollow"]:hover{color:#F0F !important}';
document.head.appendChild(s);

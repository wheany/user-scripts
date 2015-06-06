// ==UserScript==
// @name        Youtube channel RSS link
// @namespace   wheany
// @description Adds RSS links to channel pages
// @include     https://www.youtube.com/channel/*
// @include     https://www.youtube.com/user/*
// @match     https://www.youtube.com/channel/*
// @match     https://www.youtube.com/user/*
// @version     1
// @grant       none
// ==/UserScript==

var channelResult = /\/channel\/([^/]+)\//.exec(window.location.pathname);
var userResult = /\/user\/([^/]+)\//.exec(window.location.pathname);
var linkURL = '';

if(channelResult) {
	linkURL = "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelResult[1];
}
if(userResult) {
	linkURL = "https://www.youtube.com/feeds/videos.xml?user=" + userResult[1];
}
if (linkURL) {
	var link = document.createElement('link');
	link.rel = "alternate";
	link.type = "application/rss+xml";
	link.href = linkURL;

	document.head.appendChild(link);
}

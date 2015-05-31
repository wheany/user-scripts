// ==UserScript==
// @name         Animate gifs in viewport only
// @version      0.1
// @description  removes gifs that are outside the browser's screen so they don't animate. Once they would enter the screen, they are re-inserted
// @author       wheany
// @match        *
// @grant        none
// ==/UserScript==
(function () {
// adapted from http://stackoverflow.com/q/123999
function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
	 // debug border around the edges of the screen.
	 // Increase value to see gifs replaced with pink placeholders when they get near the window's edge.
	var BORDER = 0;

    return (
        rect.top <= (window.innerHeight - BORDER) &&
        rect.bottom >= BORDER &&
        rect.left <= (window.innerWidth - BORDER) &&
        rect.right >= BORDER
    );
}

function checkVisibility (img, callback) {
    var placeholder = document.createElement('span');
    placeholder.style.display='inline-block';
    placeholder.style.background='pink'; // debug coloring

    var parent = img.parentElement;

    var hideImage = function () {
        var bounds = img.getBoundingClientRect();
        placeholder.style.height = bounds.height + 'px';
        placeholder.style.width = bounds.width + 'px';
        parent.replaceChild(placeholder, img);
    };
    var showImage = function () {
        parent.replaceChild(img, placeholder);
    };

    var currentlyVisible = true;
    return function () {
        var newlyVisible;

        if (currentlyVisible) {
            newlyVisible = isElementInViewport(img);
        } else {
            newlyVisible = isElementInViewport(placeholder);
        }

        if(newlyVisible !== currentlyVisible) {
            if (currentlyVisible) {
                hideImage();
            } else {
                showImage();
            }
            currentlyVisible = newlyVisible;
        }
    };
}

Array.prototype.forEach.call(document.querySelectorAll('img'), function (img) {
    if (/\.gif\b/.test(img.src)) {
        var handler = checkVisibility(img);
        window.addEventListener('load', handler, false);
        window.addEventListener('scroll', handler, false);
        window.addEventListener('resize', handler, false);
    }
});
}());
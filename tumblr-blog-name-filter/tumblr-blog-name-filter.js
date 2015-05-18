// ==UserScript==
// @name        Tumblr filter tags by blog name
// @namespace   wheany
// @description Filters tags by blog name. Maybe you don't want to see your own posts about a subject. Maybe someone else's.
// @include     https://www.tumblr.com/tagged/*
// @match       https://www.tumblr.com/tagged/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

(function () {
	var HIDING_CLASS_NAME = 'blog-name-filter-hidden';
	var filterText = GM_getValue('blogNameFilter', '');
	var doFilter = GM_getValue('filterPostsByName', true);

	var blogNamesToFilter = [];

	var removeClass = function (elem, clazz) {
		elem.className = elem.className.replace(new RegExp('\\b' + clazz + '\\b', 'g'), '').replace(/\s\s+/g, ' ');
	};

	var addClass = function (elem, clazz) {
		if (new RegExp('\\b' + clazz + '\\b').test(elem.className)) {
			return;
		}
		elem.className += ' ' + clazz;
	};

	var filterPostList = function () {
		Array.prototype.forEach.call(document.querySelectorAll('#posts li .post'), function (post) {
			if (doFilter && blogNamesToFilter.some(function (name) {return post.dataset.tumblelogName === name;})) {
				addClass(post.parentElement, HIDING_CLASS_NAME);
			} else {
				removeClass(post.parentElement, HIDING_CLASS_NAME);
			}
		});
	};

	var updateblogNames = function () {
		blogNamesToFilter = filterText.split(',').map(function (filter) {
			return filter.replace(/^\s+|\s+$/g, '');
		}).filter(function (filter) {
			return !!filter;
		});
	};
	var updateFilterText = function () {
		filterText = this.value;
		GM_setValue('blogNameFilter', filterText);
		updateblogNames();
		filterPostList();
	};
	var updateDoFilter = function () {
		doFilter = this.checked;
		GM_setValue('filterPostsByName', doFilter);
		filterPostList();
	};

	updateblogNames();
	filterPostList();

	var init = function () {
		var wrapper = document.createElement('span');

		wrapper.style.fontSize='smaller';
		wrapper.style.fontWeight='normal';

		wrapper.innerHTML = '<label>Filter posts: <input type="checkbox" id="blog-name-filter-dofilter" value="dofilter"></label><br><label>Hide these blogs (comma separated):<input type="text" id="blog-name-filter-filter-text"></label>';

		document.querySelector('#right_column .tag_controls').appendChild(wrapper);

		wrapper.querySelector('#blog-name-filter-filter-text').value = filterText;
		wrapper.querySelector('#blog-name-filter-filter-text').addEventListener('input', updateFilterText, false);
		wrapper.querySelector('#blog-name-filter-dofilter').checked = doFilter;
		wrapper.querySelector('#blog-name-filter-dofilter').addEventListener('change', updateDoFilter, false);

		var style = document.createElement('style');
		style.textContent = '.' + HIDING_CLASS_NAME + '{display:none;}';
		document.head.appendChild(style);
	};

	init();

	var mutationTarget = document.querySelector('#posts');
	var mutationConfig = { attributes: false, childList: true, characterData: false, subtree: false };

	var observer = new MutationObserver(function(mutations) {
		filterPostList();
	});

	observer.observe(mutationTarget, mutationConfig);
}());

# user-scripts
Some user scripts (Greasemonkey/Tampermonkey) I've written that I think might be useful for others. Usually just tiny tweaks to web pages.

## tumblr-blog-name-filter
Hides results from tag search results according to blog name.
Maybe some blog dominates the search results for a tag.
Maybe you don't want to see your own posts.

Adds a text field and a checkbox to the right side of the tag search results, below the tag heading.
See screenshot below

![](https://raw.githubusercontent.com/wheany/user-scripts/master/tumblr-blog-name-filter/screenshot.png)

Uncheck the checkbox to see the posts being hidden by the script.

Type blog names you want to hide into the text field. To hide multiple blogs, separate their names with commas.

## animate-gifs-in-viewport-only
Replaces gif files that are outside the browser's window with static placeholders.

This is an attempt at a workaround for some browsers choking on pages that have many animated gifs on them

Only really works on "traditional" static web pages. If images are added using JavaScript, this script won't work.

Packaging Font Awesome for [Meteor.js](http://meteor.com), the most popular full-stack JavaScript
framework on GitHub.

# Meteor

If you're new to Meteor, here's what the excitement is all about -
[watch the first two minutes](https://www.youtube.com/watch?v=fsi0aJ9yr2o); you'll be hooked by 1:28.

That screencast is from 2012. In the meantime, Meteor has become a mature JavaScript-everywhere web
development framework with numerous [advantages](http://www.meteorpedia.com/read/Why_Meteor) over all
other single-page application frameworks.


# Issues

If you encounter an issue while using this package, please CC @dandv when you file it in this repo.


# DONE

* No need for CSS override files - Meteor will automatically "convert relative URLs to absolute URLs
when merging CSS files" [since v0.8.1](https://github.com/meteor/meteor/blob/b96c5d7962a9e59b9efaeb93eb81020e0548e378/History.md#v081)
so CSS `@font-face src url('../fonts/...')` will be resolved to the correct `/packages/.../fonts/...` path
* Tests that font(s) are downloadable
* Visual check


# TODO

* [Read the `src/test.html` file into the test directly](http://stackoverflow.com/questions/27180892/pull-an-html-file-into-a-tinytest) instead of via rawgit - how to do this with TinyTest?
* Add the [woff2 font before woff](http://stackoverflow.com/questions/11002820/why-should-we-include-ttf-eot-woff-svg-in-a-font-face/26945264#26945264) when it becomes available

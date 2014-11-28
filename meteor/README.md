Packaging Font Awesome for [Meteor.js](http://meteor.com), the most popular full-stack JavaScript
framework on GitHub.

[This package](https://atmospherejs.com/fortawesome/fontawesome) efficiently only loads the `woff`
font file, which is the only requirement for modern browsers. All wrapper packages you might still
find on Atmosphere bloat the client with unnecessary font files (SVG, EOT, TTF).

If you need those files for compatibility with old browsers that still somehow run Meteor
(IE8, iOS < 5 or Android < 4.4), please see the
[fontawesome-compat](https://atmospherejs.com/fortawesome/fontawesome-compat) package.


# Meteor

If you're new to Meteor, here's what the excitement is all about -
[watch the first two minutes](https://www.youtube.com/watch?v=fsi0aJ9yr2o); you'll be hooked by 1:28.

That screencast is from 2012. In the meantime, Meteor has become a mature JavaScript-everywhere web
development framework with numerous [advantages](http://www.meteorpedia.com/read/Why_Meteor) over all
other single-page application frameworks.


# Issues

If you encounter an issue while using this package, please CC @dandv when you file it in this repo.


# DONE

* Tests that font(s) are downloadable
* Visual check


# TODO

* [Read the `src/test.html` file into the test directly](http://stackoverflow.com/questions/27180892/pull-an-html-file-into-a-tinytest) instead of via rawgit - how to do this with TinyTest?
* Explain the magic behind how Meteor resolves CSS `@font-face src url('../fonts/...')` to the correct `/packages/.../fonts/...` path
* Add the [woff2 font before woff](http://stackoverflow.com/questions/11002820/why-should-we-include-ttf-eot-woff-svg-in-a-font-face/26945264#26945264) when it becomes available

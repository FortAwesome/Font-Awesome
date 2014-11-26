Packaging Font Awesome for Meteor.js, the most popular
full-stack JavaScript framework on GitHub (http://meteor.com).

# DONE

* Tests that fonts are downloadable
* Visual check

# TODO

* Figure out exactly what font files are needed and trim unnecessary ones (woff, eot, svg) - perhaps in specialized packages
* Read the `src/test.html` file into the test directly instead of via rawgit - how to do this with TinyTest?
* Explain the magic behind how Meteor resolves CSS `@font-face src url('../fonts/...')` to the correct `/packages/.../fonts/...` path

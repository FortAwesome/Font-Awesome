# Contributing to Font Awesome

Looking to contribute something to Font Awesome? **Here's how you can help.**



## Requesting new icons

New icons mostly start as requests by the [Font Awesome community on GitHub](../../issues). Want to request a new icon? Here are some things to keep in mind:

1. Please be nice. Font Awesome is a happy place.
2. Please [search](../../search?type=Issues) to see if your icon request already exists. If a request is found, please +1 that one.
3. Please make requests for single icons, unless you are requesting a couple of strictly related icons (e.g., thumbs-up/thumbs-down).
4. Please and thank you if you include the following:
  - Title your [new issue](../../issues/new?title=Icon%20Request:%20icon-) `Icon request: icon-name` (e.g., `Icon request: icon-car`).
  - Include a few use cases for your requested icon. How do you plan on using it?
  - Attach a single color image or two that represent the idea you're going for.
  - Request concrete objects: it's harder to make an icon to represent happiness, it's easier to make a smiley face. ☺



## Reporting issues

We only accept issues that are icon requests, bug reports, or feature requests. Bugs must be isolated and reproducible problems that we can fix within the Font Awesome core. Please read the following guidelines to ensure you are the paragon of bug reporting.

1. **Search for existing issues.** We get a lot of duplicate issues, and you'd help us out a lot by first checking if someone else has reported the same issue. Moreover, the issue may have already been resolved with a fix available.
2. **Create an isolated and reproducible test case.** Be sure the problem exists in Font Awesome's code with a [reduced test case](http://css-tricks.com/reduced-test-cases/) that should be included in each bug report.
3. **Include a live example.** Make use of jsFiddle, jsBin, or Codepen to share your isolated test cases.
4. **Share as much information as possible.** Include operating system and version, browser and version, version of Font Awesome, etc. where appropriate. Also include steps to reproduce the bug.



## Key branches

- `master` is the latest, deployed version (not to be used for pull requests)
- `gh-pages` is the hosted docs (not to be used for pull requests)
- `*-wip` branches are the official work in progress branches for the next releases. All pull requests should be submitted against the appropriate branch



## Notes on the repo

As of v3.2.0, Font Awesome's CSS, LESS, SCSS, and documentation are all powered by Jekyll templates and built before each commit and release.
- `_config.yml` - much of the site is driven off variables from this file, including Font Awesome and Bootstrap versions
- `src/` - All edits to documentation, LESS, SCSS, and CSS should be made to files and templates in this directory
- `src/icons.yml` - all LESS, SCSS, and CSS icon definitions are driven off this single file



## Pull requests

- At the moment we are not accepting pull requests containing icons
- Submit all pull requests against the appropriate `*-wip` branch for easier merging
- Any changes to the docs must be made to the Liquid templates in the `src` directory
- Any changes to the styles must be made to the .less and .scss files in the `src` directory
- If modifying the .less and .scss files, always recompile and commit the compiled files
- Try not to pollute your pull request with unintended changes--keep them simple and small
- Try to share which browsers your code has been tested in before submitting a pull request



## Coding standards: HTML

- Two spaces for indentation, never tabs
- Double quotes only, never single quotes
- Always use proper indentation
- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags)



## Coding standards: CSS

- Adhere to the [Recess CSS property order](http://markdotto.com/2011/11/29/css-property-order/)
- Multiple-line approach (one property and value per line)
- Always a space after a property's colon (.e.g, `display: block;` and not `display:block;`)
- End all lines with a semi-colon
- For multiple, comma-separated selectors, place each selector on its own line
- Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes, for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks)



## License

By contributing your code, you agree to license your contribution under the terms of the MIT License:
- http://opensource.org/licenses/mit-license.html



## Thanks

Thanks to Bootstrap for their wonderful CONTRIBUTING.MD doc. It was modified to create this one.

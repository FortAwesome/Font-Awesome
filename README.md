#[Font Awesome v3.2.1](http://fontawesome.io)
###the iconic font designed for Bootstrap

Font Awesome is a full suite of 361 pictographic icons for easy scalable vector graphics on websites, created and
maintained by [Dave Gandy](http://twitter.com/byscuits). Stay up to date [@fontawesome](http://twitter.com/fontawesome).

Get started at http://fontawesome.io!

##License
- The Font Awesome font is licensed under the SIL OFL 1.1:
  - http://scripts.sil.org/OFL
- Font Awesome CSS, LESS, and SASS files are licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html
- The Font Awesome documentation is licensed under the CC BY 3.0 License:
  - http://creativecommons.org/licenses/by/3.0/
- Attribution is no longer required as of Font Awesome 3.0, but much appreciated:
  - `Font Awesome by Dave Gandy - http://fontawesome.io`
- Full details: http://fontawesome.io/license

##Changelog
- v3.0.0 - all icons redesigned from scratch, optimized for Bootstrap's 14px default
- v3.0.1 - much improved rendering in webkit, various bug fixes
- v3.0.2 - much improved rendering and alignment in IE7
- v3.1.0 - Added 54 icons, icon stacking styles, flipping and rotating icons, removed SASS support
- [v3.1.1 GitHub milestones](https://github.com/FortAwesome/Font-Awesome/issues?milestone=4&page=1&state=closed)
- [v3.2.0 GitHub milestones](https://github.com/FortAwesome/Font-Awesome/issues?milestone=3&page=1&state=closed)
- [v3.2.1 GitHub milestones](https://github.com/FortAwesome/Font-Awesome/issues?milestone=5&page=1&state=closed)

##Versioning

Font Awesome will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit http://semver.org.

##Author
- Email: dave@fontawesome.io
- Twitter: http://twitter.com/byscuits
- GitHub: https://github.com/davegandy
- Work: Lead Product Designer @ http://kyru.us

## Hacking on Font Awesome

From the root of the repository, install the tools used to develop.

    $ bundle install
    $ npm install

Build the project and documentation:

    $ bundle exec jekyll build

Or serve it on a local server on http://localhost:7998/Font-Awesome/:

    $ bundle exec jekyll serve

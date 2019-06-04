# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

**Note that references to the Font-Awesome-Pro repository refer to a GitHub
repository that is by invitation only. You will get a 404 - Not Found if you do
not have access**

## [5.9.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.9.0) - 2019-06-04

**Minor version upgrade notice: there are some backward-incompatible changes to this release. See the
[UPGRADING.md guide](https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/UPGRADING.md) for more
information.**

### Added
* An assortment of voted icons, updated icons, and new icons
* New icons and updates to the text editor category
* A flipped version of the phone and phone-alt icon

### Changed
* Removed the nintendo-switch icon by request of Nintendo
* Sorted out the sort icons FortAwesome/Font-Awesome#9464 FortAwesome/Font-Awesome#9419 FortAwesome/Font-Awesome-Pro#915
* De-crevassed the brain icons

### Fixed
* Proportions corrected on facebook-messenger brand icon

---

## [5.8.2](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.8.2) - 2019-05-07

### Added
* New brand icon stackpath

### Changed
* Updated redhat, mailchimp brand icons
* Updated Facebook brand icons in accordance with https://facebookbrand.com (facebook, facebook-f, facebook-square)
* Updated Git brand icons (git, git-square, git-alt)
* Removing the "at" character to prevent overlap with the at icon

### Fixed
* Missing version for the route icon FortAwesome/Font-Awesome#13804
* Corrected the orientation of radiation and radiation-alt icons
* Alignment fixed for check-double
* Moved the notch into the correct location for sim-card
* Allow the role attribute to be specified FortAwesome/Font-Awesome#14791
* Prevent IE11 CSS selector error from crashing SVG with JS execution

---

## [5.8.1](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.8.1) - 2019-03-21

### Fixed
* Correct the baseline alignment of the linkedin-in brand icon

---

## [5.8.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.8.0) - 2019-03-20

**Minor version upgrade notice: there are some backward-incompatible changes to this release. See the
[UPGRADING.md guide](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md) for more
information.**

### Added
* New sponsored icon wave-square
* Adding new mutateApproach configuration which can force SVG with JS to render synchronously
* Adding a round of top requested brand icons

### Changed
* Updating search terms and adding new categories
* Removing descender-based CSS from the .fa-icon Sass mixin
* Removed title elements from SVG sprites

### Fixed
* Fixing several icons such as spinner-third that had incorrect widths
* Allow Sass setting for `font-display` to be changed
* Missing dots in the flower icons
* Support strict math compatibility for Less
* Support fa-flip-both in the SVG with JS version

---

## [5.7.2](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.7.2) - 2019-02-12

### Fixed
* Vertical alignment issues using OTF and TTF files in desktop applications that differ from previous
  Font Awesome versions (< 5.7.0)

---

## [5.7.1](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.7.1) - 2019-02-01

### Fixed
* The @fortawesome/fontawesome-pro package had a corrupted SVG webfont file for the solid style
* IE11 error reporting Promise as undefined or finally() not a function
* The cheese has been moved on top of the patty for cheeseburger

---

## [5.7.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.7.0) - 2019-01-28

**Minor version upgrade notice: there are some backward-incompatible changes to this release. See the
[UPGRADING.md guide](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md) for more
information.**

### Added
* New Food category
* More Medical icons
* More icons from the leaderboard
* Added tasks-alt
* New CSS class fa-flip-both that applies fa-flip-horizontal and fa-flip-vertical together
* CSS now defaults to font-display: auto
* Sass and Less files contain a variable that can be changed to alter the font-display value

### Changed
* Updated slack brand icon
* Reverted calendar-alt to previous design before 5.6.0

### Fixed
* Safari fails to process pseudo elements if the font-weight is "normal"
* Renamed internal method to keep from confusing rJS FortAwesome/Font-Awesome#14461
* Corrected font weights in TTF files FortAwesome/Font-Awesome#13320
* XCode now correctly displays different styles when using TTF files
* Support for Turbolinks without modifying the dom.watch() call FortAwesome/Font-Awesome#12709
* Add focusable=false for SVG elements to prevent IE11 double-focus bug FortAwesome/Font-Awesome#13155

---

## [5.6.3](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.6.3) - 2018-12-20

### Changed
* Revising fire icon and adding alternative fire icon
* Updating fedora brand icon

---

## [5.6.1](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.6.1) - 2018-12-12

### Fixed
* NPM JavaScript icon packages no longer include ES6 expressions in non-ES6 files
  FortAwesome/Font-Awesome#14382, FortAwesome/Font-Awesome#14380, FortAwesome/Font-Awesome-Pro#1286
* Removed extra point in the light style of exclamation-triangle
* Correct a typo in the license files

---

## [5.6.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.6.0) - 2018-12-07

**Minor version upgrade notice: there are some backward-incompatible changes to this release. See the
[UPGRADING.md guide](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md) for more
information.**

### Added
* Holiday category
* Winter category
* A nice selection of the top requested icons from the Font Awesome Leaderboard
* Sponsored icon horse-head
* Brand icons adobe, artstation, atlassian, centos, confluence, dhl, diaspora,
  fedex, fedora, figma, intercom, invision, jira, mendeley, raspberry-pi,
  redhat, sketch, sourcetree, suse, ubuntu, ups, usps, and yarn
* The Canadian Maple Leaf (Aboot time, eh. You hosers.)

### Changed
* Added more icons to Buildings, Hands, Spinners, Users & People, and Vehicles categories
* Added indicators whether an icon was added to Font Awesome through community voting

### Fixed
* Missing metadata for holly-berry

---

## [5.5.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.5.0)  - 2018-11-02

### Added
* Politics category
* Weather category (volume 1 and 2)
* Brand icon reacteurope
* Sponsorship of briefcase by WorkRails

### Fixed
* Alignment centered for larger icons when using the CSS stacks feature

---

## [5.4.2](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.4.2)  - 2018-10-25

### Added
* Brand icon think-peaks

### Changed
* Updated rocketchat brand icon
* Adding vr-cardboard and d-and-d-beyond to Free version
* Replacing rendact with wpressr brand icon
* Changing the version 4 shim for commenting icon to solid style to better match version 4

### Fixed
* Path issues with tombstone-alt icon in Regular and Light styles

---

## [5.4.1](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.4.1)  - 2018-10-10

### Fixed
* Separate wand and wand-magic into unique icons
* Corrected the alignment of linkedin-in
* Renamed categories "Holiday" to "Halloween" and "Seasonal" to "Autumn"

---

## [5.4.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.4.0)  - 2018-10-08

### Added
* New Tabletop Gaming, Holiday, Seasonal category
* 7 tabletop gaming brands (acquisitions-incorporated, critical-role, d-and-d, d-and-d-beyond, fantasy-flight-games, penny-arcade, wizards-of-the-coast)
* 25 new animals (and all of them are real you Disbelievers)
* Sponsorship of volume-mute by Pulse-Eight
* creative-commons-zero added to Free version
* DEV brand icon
* Search terms "positive" and "negative" added to applicable icons
* Sponsorship of chess-knight by Inspira bvba
* Sponsorship of blender-phone by Joe Emison
* Icons chair, chair-office, file-csv, hammer, head-side, head-vr, house-damage, hryvnia, network-wired, running, slash, user-injured, and vr-cardboard

### Changed
* Using masks with SVG and JavaScript now use nanoid generated IDs instead of a simple counter
* Updated speakap brand icon
* Revised menorah icon and added hanukiah

### Fixed
* Slight distortion in book-heart
* Bad search terms for folder icon
* Set license for @fortawesome/free-brands-svg-icons NPM package

---

## [5.3.1](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.3.1)  - 2018-08-28

### Changed
* Updating icons in the Status category

### Fixed
* sponsors.yml listed icon prayer instead of pray
* Removed Pro icons that accidentally made it into Free

---

## [5.3.0](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.3.0)  - 2018-08-27

### Added
* New Religion, and Marketing category
* New icons in the Mathematics, and Business category
* New stats for signal, volume, and wifi icons
* New brand icon for the-red-yeti and alipay

### Changed
* Adding ethereum to Currency category
* Adding bitcoin and btc to Payments & Shopping

### Fixed
* Incorrect name for layer-minus and layer-plus in sponsors.yml
* Reversing route-highway and route-interstate
* Correct version identifier in OTF and web font files
* CSS keyframe names are not minified (and renamed) to prevent conflict with user or app specific names
* Sass placeholder selector added for %fa-icon to fix CSS precendence issue with font-weight

---

## [5.2.0](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.2.0)  - 2018-07-23

### Added
* New education and automotive categories
* More icons in the medical and maps categories
* Top requested brands ello, hackerrank, kaggle, markdown, neos, and zhihu

---

## [5.1.1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.1.1)  - 2018-07-17

### Added
* Additional search terms for various icons FortAwesome/Font-Awesome#13429

### Changed
* Marked the font-awesome-logo-full as a "private" icon
* Consistently named and minified CSS and JS files in the CDN, npm packages, and zip files

### Fixed
* Removed "fa-" prefix from Less and Sass style bundles filenames
* Unable to use brand icons with pseudo-elements and SVG with JS
* Adding icons explicitly using the library were not available when using pseudo-elements and SVG with JS
* smile-plus search terms in icons.yml incorrectly formatted
* kiss and grin-wink icons having incorrect weight / style FortAwesome/Font-Awesome#13361 FortAwesome/Font-Awesome#13363
* Missing underscore in filenames in the less/v4-shims.less FortAwesome/Font-Awesome#13415
* Light style for code-commit
* Including rev brand icon in the Font Awesome Free version

---

## [5.1.0](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.1.0)  - 2018-06-20

**Minor version upgrade notice: there are some backward-incompatible changes to this release. See the
[UPGRADING.md guide](https://github.com/FortAwesome/Font-Awesome/blob/master/UPGRADING.md) for more
information.**

### Added
* New Emoji, Design, and Travel category pack
* Another group of requested and commissioned icons
* Version 4 shim for Web Fonts with CSS
* New simplified download and NPM packages
* @fortawesome/fontawesome-free and @fortawesome/fontawesome-pro NPM packages that match what's available in the CDN and .ZIP files
* Brand icons rev, nimblr, megaport, mailchimp, hornbill, wix, weebly, themeco, squarespace, aws, shopware
* API method toHtml() for converting abstract objects to HTML
* API method counter() to generate Layers Counters
* API method watch() to configure MutationObserver and watch DOM for icon changes and additions

### Changed
* Relocating sponsor data to a separate sponsors.yml
* Updated teamspeak brand icon
* No more default exports in the CommonJS/ES packages (anything installed from NPM)
* Greatly improved performance and rendering of CSS pseudo-elements with SVG and JavaScript
* Configuration of SVG with JavaScript can now be done with attributes on the script tag
* SVG with JavaScript pseudo-elements now match syntax (font-family, font-weight) of Web Fonts with CSS

### Fixed
* Tree shaking of all NPM packages by default
* Alignment of the book-open and dice-six icon
* Correcting creative-commons
* Incorrect license on the fontawesome-common-types package
* Improve ligatures that share a base name with another ligature
* Correcting solid style of the digital-tachograph icon
* Prevent duplicating classes in some scenarios with SVG with JavaScript
* Duplicate insertion of CSS when insertCss() method was called
* Missing TypeScript definitions for the free-brands-svg-icons package

---

## [5.0.13](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.13)  - 2018-05-10

### Added
* 68 icons to Free and 165 to Pro of the most requested icons in Font Awesome

---

## [5.0.12](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.12)  - 2018-05-03

### Added
* A long time ago in a galaxy far, far away some icons were added

### Fixed
* Renamed the r brand to r-project to prevent ligature collision with the "r" glyph

---

## [5.0.11](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.11)  - 2018-05-01

### Added
* 16 new user icons
* Full set of Creative Commons symbols
* Regular style comment-dots used for v4 comment-alt in shim
* Top 6 brand icons: r, ebay, mastodon, researchgate, keybase, teamspeak

### Changed
* Revised slider icons FortAwesome/Font-Awesome#11872
* Make desktop typeface easier to find in apps that support ligature previews

### Fixed
* Remove errant XML entity from the lastfm-square icon FortAwesome/Font-Awesome#12847
* Correcting paths in cloud icons FortAwesome/Font-Awesome-Pro#920

---

## [5.0.10](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.10)  - 2018-04-10

### Added
* New java brand icon FortAwesome/Font-Awesome#386

### Changed
* Updating depth of dna icon
* Updating pied-piper, adding pied-piper-hat

### Fixed
* Correcting path errors on readme icon FortAwesome/Font-Awesome#12754
* Light style of lamp icon FortAwesome/Font-Awesome#12725

---

## [5.0.9](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.9)  - 2018-03-27

### Added
* New Chat icon pack and category
* New Charity icon pack and category
* New Moving icon pack and category
* New icons hands and hand-holding

### Changed
* Updated flipboard, readme, and houzz brand icon
* Making all solid icons in the medical icon pack free
* Updated hand-holding-box and hand-receiving in the Light style

### Fixed
* Missing box-sizing CSS property for fa-layers-counter

---

## [5.0.8](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.8)  - 2018-03-01

### Fixed
* OTF font files missing ligatures for Pro styles FortAwesome/Font-Awesome#12486 FortAwesome/Font-Awesome-Pro#1034

---

## [5.0.7](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.7)  - 2018-02-26

### Added
* New Logistics category
* New Medical category
* Individual SVG files available from the Font Awesome CDN
* Additional search terms

### Changed
* Apple brand icon update FortAwesome/Font-Awesome#12337
* Disable mutation observers with fontawesome.noAuto() is called
* License information now references https URL scheme

### Fixed
* Missing TypeScript names FortAwesome/react-fontawesome#83
* Adding categories metadata FortAwesome/Font-Awesome#12034
* TypeScript improvement for fontawesome.layer()
* Correcting a melting, wobbling, weird-looking whistle

---

## [5.0.6](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.0.6)  - 2018-01-25

### Fixed
* @fortawesome/fontawesome-pro-light missing submodules

---

## [5.0.5](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.5)  - 2018-01-25

### Added
* New Sports category
* New Chess category
* Added brand icons for flipboard, php, quinscape, and hips

### Fixed
* Sass and Less mixin fa-icon() now uses ems instead of percentage
* Corrected misspelling of "Alternate" in category labels
* Improved TypeScript definitions for @fortawesome/fontawesome
* Server-side rendering was failing due to DOM-specific object access
* SVG attributes "data-fa-processed" renamed to "data-fa-i2svg", only applies if rendered with i2svg() method

---

## [5.0.4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.4)  - 2018-01-10

### Changed
* Updating all NPM package READMEs

### Fixed
* Improving TypeScript exports and fixing some incorrect definitions
* TypeScript error when importing entire style Fort-Awesome/Font-Awesome#12072
* Pseudo-elements erasing text contents in parent container Fort-Awesome/Font-Awesome-Pro#11995
* fa-layers-text misalignment when using Bootstrap Fort-Awesome/Font-Awesome#11871

---

## [5.0.3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.3)  - 2018-01-08

### Added
* Adding elementor, youtube-square brand icons
* Adding window-minimize to the Free subset
* TypeScript support for all NPM packages

### Fixed
* Corrected uneven spacing in university, address-book, address-card, id-badge, id-card, mouse-pointer, phone-volume, portrait, user-alt, user-circle, user-md, user-plus, user-times, user , users
* Corrected uneven spacing in brand icons behance-square, dashcube, discourse, ember, erlang, fort-awesome, js-square, laravel, mix, patreon, palfed, phoenix-framework, node-js, skyatlas, stack-exchange, stripe, viber, weixin, yahoo , yoast

---

## [5.0.2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.2)  - 2017-12-19

### Added
* Adding amazon-pay, cc-amazon-pay, korvue, ethereum brand icons
* Adding stopwatch to Free version

### Changed
* Ligatures now support capital case, all caps, and title case

### Fixed
* NPM packages now behave the same way as CDN and browser-specific packages FortAwesome/Font-Awesome-Pro#727 FortAwesome/Font-Awesome-Pro#896 FortAwesome/Font-Awesome-Pro#891
* Icon doesn't change when pseudo-element content changes FortAwesome/Font-Awesome-Pro#839
* Invalid XML in sprites FortAwesome/Font-Awesome-Pro#927
* Incorrect version in Sass and Less variable files

---

## [5.0.1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.1)  - 2017-12-08

### Added
* Adding font-awesome-flag, lock-open, redo-alt, sync-alt, undo-alt to the Free version
* New NPM packages `fontawesome-free-webfonts` and `fontawesome-pro-webfonts`
* Adding old icon names to search terms for renamed icons
* Extensive metadata added to the `advanced-options` directory
* Adding stripe-s brand icon
* Adding typo3 brand icon

### Changed
* Updated dropbox brand icon to match new branding guidelines
* Updated firefox brand icon
* Updated strava brand icon
* OTF font file now include a space character

### Fixed
* OTF font file now supports different styles in Windows
* OTF font file "j" character now has correct space on the right
* Modifying the `class` attribute on an existing `<svg>` allows you to change the icon

---

## [5.0.0](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0)  - 2017-12-01

### Added
* License information

### Changed
* CSS vertical-align now "em"-based instead of percentage making it more consistent
* fa-ul width now closer to default browser size

---

## [5.0.0-rc5](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-rc5)  - 2017-11-28

**This release includes breaking changes**

### Added
* Brand icons: gitter, cc-stripe, stripe, hooli, aviato, strava, ember, angular, font-awesome-flag
* Icons compress-alt and expand-alt
* Adding calendar to Font Awesome 5 Free
* SASS function that makes it easier to use variables FortAwesome/Font-Awesome-Pro#824

### Changed
* BREAKING Renamed icon composition to mask ("data-fa-compose" becomes "data-fa-mask")
* BREAKING Re-organized directory structure to match upcoming documentation
* BREAKING Font Awesome styles inserted into the `<head>` will now precede other link and style definitions
* BREAKING `fontawesome.text` and `fontawesome.icon` now use `styles` param instead of `style`
* Updated sizing for twitter, discord, youtube
* Class fa-li now respects line-height and has new recommended markup (see included docs)

### Fixed
* Duplicate `style` tags being added in the head FortAwesome/Font-Awesome-Pro#858
* Error with icon composition/masking that caused a confusing error message
* An error when using pseudo elements and the element is empty (Array.reduce error)
* Icons not being replaced with SVG if the text content is not empty

---

## [5.0.0-rc4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-rc4)  - 2017-10-27

### Added
* Ligature support in the OTF font
* Vue.js brand icon
* Sass and Less brand icons
* Autoprefixer brand icon
* Individual icon imports in icon packages FortAwesome/Font-Awesome-Pro#808

### Changed
* Better poo eyes
* Renamed HTML status classes to `fontawesome-i2svg-active`, `fontawesome-i2svg-pending`, `fontawesome-i2svg-complete`
* HTML status class for active is added only after the first batch of icon replacements occur
* Added mention of newer versions of iOS in documentation FortAwesome/Font-Awesome-Pro#810

### Fixed
* Performance and missing features with mutation observer (should fix FortAwesome/Font-Awesome-Pro#813)
* Incorrect handling of icon class and style attributes when using autoReplace = 'nest' FortAwesome/Font-Awesome-Pro#809
* Pseudo elements not added or removed when class mutations occur FortAwesome/Font-Awesome-Pro#821

---

## [5.0.0-rc3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-rc3)  - 2017-10-13

### Added
* Node.js brand icon FortAwesome/Font-Awesome-Pro#779
* React brand icon FortAwesome/Font-Awesome-Pro#780
* OSI brand icon FortAwesome/Font-Awesome-Pro#748
* Add a class to the html element when icon replacement is complete FortAwesome/Font-Awesome-Pro#778
* Add support for symbols in API including ability to name the symbol
* Use CSS pseudo elements (:before and :after) to make trigger SVG replacements

### Changed
* Switched the locations of fork and knife in utensils-alt FortAwesome/Font-Awesome-Pro#466
* Updated the AWS brand icon FortAwesome/Font-Awesome-Pro#735
* Updated Apple App Store icon FortAwesome/Font-Awesome-Pro#728

### Fixed
* Do not throw an error if icon is missing when calling icon() method in API
* Ensure that unicode values do not change between releases
* Version field is missing in fontawesome-pro-brands/package.json FortAwesome/Font-Awesome-Pro#781
* Repeated commenting out of fa-layers when i2svg is called FortAwesome/Font-Awesome-Pro#788
* Title not showing up correctly for SVG FortAwesome/Font-Awesome-Pro#786

---

## [5.0.0-rc2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-rc2)  - 2017-09-22

### Added
* Brand icons: accusoft, ns8, uniregistry

### Fixed
* Link to the npm package in the docs FortAwesome/Font-Awesome-Pro#729
* Incorrect reference to fontawesome-pro.js in docs

---

## [5.0.0-rc1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-rc1)  - 2017-09-15

### Changed
* New Bitbucket logo FortAwesome/Font-Awesome-Pro#720
* Modifed the star icons to match use case better FortAwesome/Font-Awesome-Pro#710
* Switched names of css3 and css3-alt to reflect correct branding

### Fixed
* Correct whitespace with the Visa logo FortAwesome/Font-Awesome-Pro#719
* Improve OTF support by passing through FontForge FortAwesome/Font-Awesome-Pro#565
* Fonts with "undefined" name FortAwesome/Font-Awesome-Pro#711
* Shims will only function if using old prefix of "fa" FortAwesome/Font-Awesome-Pro#692
* Added missing "youtube" icon to categories

---

## [5.0.0-beta7](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta7)  - 2017-09-11

### Added
* Ability to nest the `<svg>` tag within the `<i>` FortAwesome/Font-Awesome-Pro#624
* Define icons as symbols and leverage SVG sprites FortAwesome/Font-Awesome-Pro#629
* Added alternative CSS3 logo FortAwesome/Font-Awesome-Pro#682

### Changed
* Power Transforms now execute inside the SVG instead of on the root element
* Filenames have changed to reflect a better division between Font Awesome Free and Pro

### Fixed
* More improvements to the version 4 shim FortAwesome/Font-Awesome-Pro#673 FortAwesome/Font-Awesome-Pro#678 FortAwesome/Font-Awesome-Pro#686 FortAwesome/Font-Awesome-Pro#687 FortAwesome/Font-Awesome-Pro#692
* Animation support for inline SVG now works as expected FortAwesome/Font-Awesome-Pro#662

---

## [5.0.0-beta6](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta6)  - 2017-09-01

### Added
* Ability to flip horizontal and vertical with CSS classes fa-flip-horizontal and fa-flip-vertical
* New film-alt icon that allows for layering other icons
* Microsoft brand

### Changed
* New YouTube branding FortAwesome/Font-Awesome-Pro#646

### Fixed
* Fixed a bunch of shim-related issues
* Cogs off center FortAwesome/Font-Awesome-Pro#663
* Corrected icons/categories.yml with canonical names

---

## [5.0.0-beta5](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta5)  - 2017-08-25

### Added
* Full parity with Font Awesome 4! 616 total core icons in each style
* 297 total brand and logo icons
* Separate CSS file to accompany the SVG Framework FortAwesome/Font-Awesome-Pro#627
* Alternative to the dots icon FortAwesome/Font-Awesome-Pro#608
* Made window icons consistent FortAwesome/Font-Awesome-Pro#611

### Fixed
* Production builds not correctly being detected FortAwesome/Font-Awesome-Pro#631

---

## [5.0.0-beta4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta4)  - 2017-08-18

### Added
* 590 total core icons in each style
* 291 total brand and logo icons

### Fixed
* Reduced the size of JS file from 66 to 22 kb
* Regression caused by with web font alignment FortAwesome/Font-Awesome-Pro#460

---

## [5.0.0-beta3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta3)  - 2017-08-15

### Added
* 583 total core icons in each style

### Fixed
* Documentation improvements and fixes FortAwesome/Font-Awesome-Pro#586
* Vertical alignment of TTF and OTF fonts FortAwesome/Font-Awesome-Pro#460
* The "fa_500px" icon should be named "fa500px" FortAwesome/Font-Awesome-Pro#578

---

## [5.0.0-beta2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta2)  - 2017-08-11

### Added
* 570 total core icons in each style
* 291 total brand and logo icons
* NPM (ES6, CommonJS, AMD) packages for use with other JavaScript libraries and tools FortAwesome/Font-Awesome-Pro#574
* Added a guide to choosing which implementation is best for you FortAwesome/Font-Awesome-Pro#532

### Changed
* Showing a missing icon is now configurable FortAwesome/Font-Awesome-Pro#569

### Fixed
* Composition framework now works in browsers that do not support transform-origin FortAwesome/Font-Awesome-Pro#564

---

## [5.0.0-beta1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta1)  - 2017-08-04

### Added
* 524 total core icons in each style
* 289 total brand and logo icons
* New composition framework FortAwesome/Font-Awesome-Pro#537
* Animated indicator if you use an icon that does not exist

### Changed
* Basic linting for Sass and Less files
* Add JavaScript guard block to prevent leaking errors
* Add support for automatic accessibility to SVG Framework Layers

### Fixed
* Regression where stacks and pulled and bordered were not working in SVG Framework
* SVG sprite example had confusing inline styles FortAwesome/Font-Awesome-Pro#549
* Make getting started page more consistent between examples FortAwesome/Font-Awesome-Pro#544
* Added missing sizes fa-[6-10], xs, sm FortAwesome/Font-Awesome-Pro#546
* Title tag missing in SVG sprites FortAwesome/Font-Awesome-Pro#536

---

## [5.0.0-alpha7](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha7)  - 2017-07-28

### Added
* 451 total core icons in each style
* 281 total brand and logo icons
* Less support is back!
* OpenType (.otf) file formats for web fonts

### Changed
* Changes the fa-spin animation to go from 0deg to 360deg to eliminate hitch FortAwesome/Font-Awesome-Pro#522
* Improved mutation handling FortAwesome/Font-Awesome-Pro#517

### Fixed
* fa-fw now works correctly with the SVG framework FortAwesome/Font-Awesome-Pro#530
* Removed execute bit on some icon files FortAwesome/Font-Awesome-Pro#520

---

## [5.0.0-alpha6](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha6)  - 2017-07-21

### Added
* 410 total core icons in each style
* 270 total brand and logo icons
* All new Font Awesome 4 shim file
* Beginnings of a public JS API FortAwesome/Font-Awesome-Pro#512

### Changed
* Added Firefox ESR and Chrome for Businesses to browser compatibility FortAwesome/Font-Awesome-Pro#506

### Fixed
* Ensure that SVG title attributes are unique
* Fixed incorrect viewBox sizes FortAwesome/Font-Awesome-Pro#492
* Fix chart-area alignment in the solid style FortAwesome/Font-Awesome-Pro#508
* Add missing xmlns attributes in some SVGs FortAwesome/Font-Awesome-Pro#509

---

## [5.0.0-alpha5](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha5)  - 2017-07-14

### Added
* 228 total brand and logo icons
* New transform framework for sizing, moving, rotating, and flipping icons
* New icon counters
* New layers framework
* New text overlays
* Auto-comments with the original source icons alongside SVG replacements

### Changed
* Autoprefixer to correctly add browser prefixes for supported browsers
* Removed browser-specific CSS properties in Sass source files (now relies on autoprefixer)

### Fixed
* The rotation on checkmark icons
* Other icon feedback from previous weeks
* Correct fixed width settings to 1.25em (based on the new 16px grid)
* Icons displaying as block instead of inline-block in IE and older Safari

---

## [5.0.0-alpha4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha4)  - 2017-07-07

### Added
* 93 brand icons

---

## [5.0.0-alpha3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha3)  - 2017-06-30

### Added
* 95 additional icons; including file types, directional, and some existing and new brand icons

### Fixed
* Wrong content type in generated CSS FortAwesome/Font-Awesome-Pro#458
* Removal of query string from static resources FortAwesome/Font-Awesome-Pro#458
* SVG font ID's are incorrect in webfont implementation FortAwesome/Font-Awesome-Pro#474

---

## [5.0.0-alpha2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha2)  - 2017-06-27

### Added
* How/When to upgrade from FA4 to FA5 FortAwesome/Font-Awesome-Pro#454

### Fixed
* Links to SVG files broken in the example files FortAwesome/Font-Awesome-Pro#456
* Misnamed icon names in examples FortAwesome/Font-Awesome-Pro#445
* Mangled HTML in the Getting Started example FortAwesome/Font-Awesome-Pro#442
* Bad grammar and typos FortAwesome/Font-Awesome-Pro#443
* fas-arrow-to-top is identical to fas-arrow-to-right FortAwesome/Font-Awesome-Pro#423
* Vertical alignment issues with webfont implementation FortAwesome/Font-Awesome-Pro#444
* Add browser compatibility tables to demo FortAwesome/Font-Awesome-Pro#435
* Remove MAC OS feces from builds FortAwesome/Font-Awesome-Pro#437
* TTF naming issues that prevent correct usage/installation FortAwesome/Font-Awesome-Pro#450
* Correct CSS for SVG framework stacking, was reversed from normal FortAwesome/Font-Awesome-Pro#452

---

## [5.0.0-alpha1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha1)  - 2017-06-23

### Added
* 300+ more icons
* Brands pack
* New JavaScript based SVG Framework
* New SVG Sprites based framework
* Source SVGs
* Documentation with a convenient build-in web server

### Changed
* New directory structure

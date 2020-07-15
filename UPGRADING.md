# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/Font-Awesome/issues/new) that you run into with this guide or with these upgrades to us.

---

## 5.12.x/5.13.x to 5.14.0

In version 5.12.0 and 5.13.0 some of the icons were assigned unicode values
that were outside the Private Unicode Area (PUA). This caused problems with
some desktop software and caused the icons to show up as Chinese, Japanese, or
Korean (CJK) ideographs.

The unicode values have been re-assigned to values within the PUA range.

If you were using any of the following icons with pseudo-elements you will need
to change the CSS `content` value to the new unicode value.

| Icon name              | Old  | New  |
| ---------------------- | ---- | ---- |
| bacteria               | f959 | e059 |
| bacterium              | f95a | e05a |
| box-tissue             | f95b | e05b |
| caravan                | f8ff | f8ff |
| caravan-alt            | f900 | e000 |
| cat-space              | f901 | e001 |
| coffee-pot             | f902 | e002 |
| coffin-cross           | f951 | e051 |
| comet                  | f903 | e003 |
| dailymotion            | f952 | e052 |
| deezer                 | f977 | e077 |
| edge-legacy            | f978 | e078 |
| fan-table              | f904 | e004 |
| faucet                 | f905 | e005 |
| faucet-drip            | f906 | e006 |
| firefox-browser        | f907 | e007 |
| folder-download        | f953 | e053 |
| folder-upload          | f954 | e054 |
| galaxy                 | f908 | e008 |
| garage                 | f909 | e009 |
| garage-car             | f90a | e00a |
| garage-open            | f90b | e00b |
| google-pay             | f979 | e079 |
| hand-holding-medical   | f95c | e05c |
| hand-sparkles          | f95d | e05d |
| hands-wash             | f95e | e05e |
| handshake-alt-slash    | f95f | e05f |
| handshake-slash        | f960 | e060 |
| head-side-cough        | f961 | e061 |
| head-side-cough-slash  | f962 | e062 |
| head-side-mask         | f963 | e063 |
| head-side-virus        | f964 | e064 |
| heat                   | f90c | e00c |
| house                  | f90d | e00d |
| house-day              | f90e | e00e |
| house-leave            | f90f | e00f |
| house-night            | f910 | e010 |
| house-return           | f911 | e011 |
| house-signal           | f912 | e012 |
| house-user             | f965 | e065 |
| ideal                  | f913 | e013 |
| instagram-square       | f955 | e055 |
| lamp-desk              | f914 | e014 |
| lamp-floor             | f915 | e015 |
| laptop-house           | f966 | e066 |
| light-ceiling          | f916 | e016 |
| light-switch           | f917 | e017 |
| light-switch-off       | f918 | e018 |
| light-switch-on        | f919 | e019 |
| lungs-virus            | f967 | e067 |
| microblog              | f91a | e01a |
| microwave              | f91b | e01b |
| mixer                  | f956 | e056 |
| outlet                 | f91c | e01c |
| oven                   | f91d | e01d |
| people-arrows          | f968 | e068 |
| pied-piper-square      | f91e | e01e |
| plane-slash            | f969 | e069 |
| planet-moon            | f91f | e01f |
| planet-ringed          | f920 | e020 |
| police-box             | f921 | e021 |
| portal-enter           | f922 | e022 |
| portal-exit            | f923 | e023 |
| pump-medical           | f96a | e06a |
| pump-soap              | f96b | e06b |
| radar                  | f924 | e024 |
| raygun                 | f925 | e025 |
| refrigerator           | f926 | e026 |
| rocket-launch          | f927 | e027 |
| rust                   | f97a | e07a |
| sensor                 | f928 | e028 |
| sensor-alert           | f929 | e029 |
| sensor-fire            | f92a | e02a |
| sensor-on              | f92b | e02b |
| sensor-smoke           | f92c | e02c |
| shield-virus           | f96c | e06c |
| shopify                | f957 | e057 |
| sink                   | f96d | e06d |
| siren                  | f92d | e02d |
| siren-on               | f92e | e02e |
| soap                   | f96e | e06e |
| solar-system           | f92f | e02f |
| sort-circle            | f930 | e030 |
| sort-circle-down       | f931 | e031 |
| sort-circle-up         | f932 | e032 |
| space-station-moon     | f933 | e033 |
| space-station-moon-alt | f934 | e034 |
| sprinkler              | f935 | e035 |
| star-shooting          | f936 | e036 |
| starfighter            | f937 | e037 |
| starfighter-alt        | f938 | e038 |
| starship               | f939 | e039 |
| starship-freighter     | f93a | e03a |
| stopwatch-20           | f96f | e06f |
| store-alt-slash        | f970 | e070 |
| store-slash            | f971 | e071 |
| sword-laser            | f93b | e03b |
| sword-laser-alt        | f93c | e03c |
| swords-laser           | f93d | e03d |
| telescope              | f93e | e03e |
| temperature-down       | f93f | e03f |
| temperature-up         | f940 | e040 |
| tiktok                 | f97b | e07b |
| toilet-paper-slash     | f972 | e072 |
| trailer                | f941 | e041 |
| transporter            | f942 | e042 |
| transporter-1          | f943 | e043 |
| transporter-2          | f944 | e044 |
| transporter-3          | f945 | e045 |
| transporter-empty      | f946 | e046 |
| ufo                    | f947 | e047 |
| ufo-beam               | f948 | e048 |
| unity                  | f949 | e049 |
| unsplash               | f97c | e07c |
| user-alien             | f94a | e04a |
| user-robot             | f94b | e04b |
| user-unlock            | f958 | e058 |
| user-visor             | f94c | e04c |
| users-slash            | f973 | e073 |
| vacuum                 | f94d | e04d |
| vacuum-robot           | f94e | e04e |
| virus                  | f974 | e074 |
| virus-slash            | f975 | e075 |
| viruses                | f976 | e076 |
| window-frame           | f94f | e04f |
| window-frame-open      | f950 | e050 |

---

## 5.13.0 to 5.13.1

There are no breaking changes in this version upgrade.

---

## 5.12.1 to 5.13.0

There are no breaking changes in this version upgrade.

---

## 5.12.0 to 5.12.1

There are no breaking changes in this version upgrade.

---

## 5.11.2 to 5.12.0

The 9-pointed icon named "haykal" was renamed to "bahai" to better match the
symbol. If you were previously using the misnamed icon rename to "bahai" when
upgrading.

---

## 5.11.1 to 5.11.2

The scanner-image icon was previously using the same unicode value as the scanner icon.

This has now been fixed and the scanner-image icon has a unique unicode value.

The film-canister icon was misspelled as "film-cannister". This has been fixed.

---

## 5.11.0 to 5.11.1

There are no breaking changes in this version upgrade.

---

## 5.10.2 to 5.11.0

There are no breaking changes in this version upgrade.

---

## 5.10.1 to 5.10.2

There are no breaking changes in this version upgrade.

---

## 5.10.0 to 5.10.1

The Sass function `fa-content-secondary` which was part of the `duotone.scss`
file has been removed due to its inconsistent behavior in different versions of
Sass pre-processors. Specifically [`node-sass`](https://github.com/sass/node-sass) and
[`sass`](https://github.com/sass/dart-sass) didn't produce the same output.

---

## 5.9.0 to 5.10.0

The following icon shims have been changed to better match the original version 4 icon:

* sort-alpha-desc
* sort-amount-desc
* sort-numeric-desc

---

## 5.8.2 to 5.9.0

The nintendo-switch icon has been removed by legal request of Nintendo of America Inc.

Font Awesome is no longer able to provide icons related to Nintendo, their
gaming consoles, accessories, or games.

---

## 5.8.1 to 5.8.2

There are no breaking changes in this version upgrade.

---

## 5.8.0 to 5.8.1

There are no breaking changes in this version upgrade.

---

## 5.7.x to 5.8.0

### Removing title elements from SVG sprites

Since the initial release of version 5, all the way back to 5.0.0 actually,
we've included `<title>` elements in the SVG sprites.

In https://github.com/FortAwesome/Font-Awesome/issues/14595 a discussion
outlines that this practice actually prevents normal efforts to make these
sprites accessible according to web accessibility standards.

If you are using sprites please refer to [our documentation on accessibility with Font Awesome](https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility).

### Removing vertical-align from the .fa-icon Sass mixin

Font Awesome has supported Sass and Less CSS pre-processors for a long time.

The version 5 `.fa-icon` mixin which is present in `scss/_mixins.scss`
previously included `vertical-align` which was incorrectly shifting icons.

If you have used this mixin in your own Sass files you will need to check the
alignment of those icons after upgrading to 5.8.0.

---

## 5.7.1 to 5.7.2

There are no breaking changes in this version upgrade.

---

## 5.7.0 to 5.7.1

The cheeseburger icon incorrectly placed the cheese _under_ the patty. This is unacceptable and we've fixed it.

---

## 5.6.x to 5.7.0

### OTF and TTF files

The PostScript name has been changed from `FontAwesome5ProSolid` to `FontAwesome5Pro-Solid`. This was done to be more compatible with tooling such as XCode.

We've also update the `Version` specifier. Font files only support a MAJOR and MINOR version number so we have modifed our schema. For example, version 5.7.0 of Font Awesome is reflected as 329.472 in the individual font files.

### Icon changes

The calendar-alt icon has been reverted back to the previous design in versions <= 5.6.0.

---

## 5.6.x to 5.6.3

The fire icon has been reverted back to the previous design in versions <= 5.5.0.

We have moved the redesigned icon to fire-alt.

---

## 5.6.0 to 5.6.1

There are no breaking changes in this version upgrade.

---

## 5.5.0 to 5.6.0

In this release we've taken time to re-organize the directory structure to
prevent redundancy and improve findability.

### Directory structure changes

| Old path                          | New path    |
|-----------------------------------|-------------|
| advanced-options/metadata         | metadata    |
| advanced-options/raw-svg          | svgs        |
| advanced-options/svg-sprites      | sprites     |
| advanced-options/use-with-node-js | js-packages |
| svg-with-js/js                    | js          |
| svg-with-js/css                   | css         |
| use-on-desktop                    | otfs        |
| web-fonts-with-css/css            | css         |
| web-fonts-with-css/less           | less        |
| web-fonts-with-css/scss           | scss        |
| web-fonts-with-css/webfonts       | webfonts    |

---

## 5.4.x to 5.5.0

There are no breaking changes in this version upgrade.

---

## 5.4.0 to 5.4.1

Categories were renamed from:

* Holiday to Halloween
* Seasonal to Autumn

The "wand" icon in version 5.4.0 matched the "wand-magic" icon. The magical
sparkles have been removed for "wand". If you were relying on this decoration
in your design switch to "wand-magic" to bring the magic back.

---

## 5.3.x to 5.4.0

There are no breaking changes in this version upgrade.

---

## 5.3.0 to 5.3.1

The following Pro-only icons were removed from Font Awesome Free as of 5.3.1:

* abacus
* calculator-alt
* empty-set
* function
* integral
* intersection
* lambda
* omega
* pi
* sigma
* signal-alt
* signal-alt-slash
* signal-slash
* square-root
* tally
* theta
* tilde
* union
* value-absolute
* volume
* volume-down
* volume-slash
* wifi-slash

These icons were unintentionally included in 5.3.0.

---

## 5.x.x to 5.3.0

Sass mixin syntax has been updated to address a bug.

Use `@extend %fa-icon` to correctly maintain CSS order in output files.

~~Old way:~~

```
.twitter {
  @include fa-icon; /* incorrect */
  @extend .fab;

  &:before {
    content: fa-content($fa-var-twitter);
  }
}
```

New way:

```
.twitter {
  @extend %fa-icon; /* correct */
  @extend .fab;

  &:before {
    content: fa-content($fa-var-twitter);
  }
}
```

---

## 5.1.x to 5.2.x

There are no breaking changes in this version upgrade.

---

## 5.1.0 to 5.1.1

Less and Sass files incorrectly contained the "fa-" prefix for style files.
These files have been renamed to be consistent with other files in the
packages.

If you are using the Less or Sass file styles individually you will need to
correct the names in your builds.

| Old filename                | New filename             |
| --------------------------- | ------------------------ |
| less/fa-solid.less          | less/solid.less          |
| less/fa-regular.less        | less/regular.less        |
| less/fa-light.less          | less/light.less          |
| less/fa-brands.less         | less/brands.less         |
| scss/fa-solid.scss          | scss/solid.scss          |
| scss/fa-regular.scss        | scss/regular.scss        |
| scss/fa-light.scss          | scss/light.scss          |
| scss/fa-brands.scss         | scss/brands.scss         |

---

## 5.0.x to 5.1.0

### New packages available for browser-only integration

**If you were previously using @fortawesome/fontawesome you need to switch to one of the new packages.**

Our Free and Pro CDN provide access to JS, CSS, sprites, and separate SVG files.

We've now made these files conveniently available through NPM.

* [@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
* @fortawesome/fontawesome-pro (private package, requires Pro subscription)

If you are familiar with the paths and options available with the CDN these
packages should be familiar.

Information about [Font Awesome Pro subscriptions](https://fontawesome.com/pro)
can be found in your [Font Awesome awesome
account](https://fontawesome.com/account/services).

### Renamed packages

The following packages have been renamed as part of 5.1.0 of Font Awesome.

_All packages are in the [@fortawesome NPM scope](https://www.npmjs.com/search?q=scope:fortawesome&ranking=optimal)_

| Old package(1)            | New package            |
|---------------------------|------------------------|
| fontawesome-free-webfonts | fontawesome-free       |
| fontawesome-pro-webfonts  | fontawesome-pro        |
| fontawesome-free-solid    | free-solid-svg-icons   |
| fontawesome-free-regular  | free-regular-svg-icons |
| fontawesome-free-brands   | free-brands-svg-icons  |
| fontawesome-pro-solid     | pro-solid-svg-icons    |
| fontawesome-pro-regular   | pro-regular-svg-icons  |
| fontawesome-pro-light     | pro-light-svg-icons    |

(1) Old packages have now been deprecated. They are still available but will only receive high priority patch release fixes.

**You'll need to update your package.json file with the renamed packages and new versions.**

### No more default imports

Recently we spent a good deal of time supporting TypeScript to enable us to
create the Angular Font Awesome component. During that adventure we
[were](https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html)
[convinced](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
that we were going to remove default exports from all of our components,
libraries, and packages. This is complete with the umbrella release of `5.1.0` of Font Awesome.

What does that mean?

~~Old way:~~

```javascript
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

library.add(solid, faTwitter)
```

New way:

```javascript
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faTwitter)

// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch()
```

This is also a valid way to import icons that works if your tool does not support tree shaking:

```javascript
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
```

### Improved support for tree shaking

Tree shaking is now functional by default and no additional configuration is required to make it work.

The `shakable.es.js` module has been removed and is no longer needed.

If you've previously configured tree shaking by modifying your webpack or rollup you can safely remove these.

**We recommend that you check your bundle size after upgrading an ensure that file sizes are as you would expect.**

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js'
    }
  }
}
```

```javascript
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      '@fortawesome/fontawesome-free-solid': 'node_modules/@fortawesome/fontawesome-free-solid/shakable.es.js'
    })
  ]
})
```

---

## 5.0.11 to 5.0.12

Due to a collision with the "r" glyph the R Project brand icon has been renamed to `r-project`.

---

## 5.0.x to 5.0.6

### SVG Attribute was changed from data-fa-processed to data-fa-i2svg

As part of a bug fix for the release of 5.0.6 we renamed an attribute that was found on `<svg>` elements from
`data-fa-processed` to `data-fa-i2svg`. We feel this more accurately reflects the intent and purpose.

This attribute is added to any icon that has been generated using `fontawesome.dom.i2svg()`.

Be aware that `data-fa-i2svg` (or `data-fa-processed`) will no longer be present on icons that are created using
`fontawesome.icon()`.

If you've written and DOM queries that rely on `data-fa-processed` you should get things working again by doing a
simple find and replace.

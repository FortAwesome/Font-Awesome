# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/Font-Awesome/issues/new) that you run into with this guide or with these upgrades to us.

## 5.0.11 to 5.0.12

Due to a collision with the "r" glyph the R Project brand icon has been renamed to `r-project`.

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

_All packages are in the [@fortawesome NPM scope](https://www.npmjs.com/search?q=scope:fortawesome&page=1&ranking=optimal)_

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

## 5.0.x to 5.0.6

### SVG Attribute was changed from data-fa-processed to data-fa-i2svg

As part of a bug fix for the release of 5.0.6 we renamed an attribute that was found on `<svg>` elements from
`data-fa-processed` to `data-fa-i2svg`. We feel this more accurately reflects the intent and purpose.

This attribute is added to any icon that has been generated using `fontawesome.dom.i2svg()`.

Be aware that `data-fa-i2svg` (or `data-fa-processed`) will no longer be present on icons that are created using
`fontawesome.icon()`.

If you've written and DOM queries that rely on `data-fa-processed` you should get things working again by doing a
simple find and replace.

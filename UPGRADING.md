# Upgrading Guide

See the [CHANGELOG.md](./CHANGELOG.md) for detailed information about what has changed between versions.

This guide is useful to figure out what you need to do between breaking changes.

As always, [submit issues](https://github.com/FortAwesome/Font-Awesome/issues/new) that you run into with this guide or with these upgrades to us.

## 5.0.x to 5.0.6

### SVG Attribute was changed from data-fa-processed to data-fa-i2svg

As part of a bug fix for the release of 5.0.6 we renamed an attribute that was found on `<svg>` elements from
`data-fa-processed` to `data-fa-i2svg`. We feel this more accurately reflects the intent and purpose.

This attribute is added to any icon that has been generated using `fontawesome.dom.i2svg()`.

Be aware that `data-fa-i2svg` (or `data-fa-processed`) will no longer be present on icons that are created using
`fontawesome.icon()`.

If you've written and DOM queries that rely on `data-fa-processed` you should get things working again by doing a
simple find and replace.

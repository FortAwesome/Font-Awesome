// package metadata file for Meteor.js

var packageName = 'fortawesome:fontawesome';  // http://atmospherejs.com/fortawesome/fontawesome
var where = 'client';  // where to install: 'client', 'server', or ['client', 'server']

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Font Awesome (official): 470+ scalable vector icons, customizable via CSS, Retina friendly',
  version: packageJson.version + '_2',
  git: 'https://github.com/FortAwesome/Font-Awesome.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.2.1');
  api.addFiles([
    // we bundle all font files, but the client will request only one of them via the CSS @font-face rule
    'fonts/fontawesome-webfont.eot',  // IE8 or older only understands EOT. IE9+ will read it too because it loads the first occurrence of `src`
    'fonts/fontawesome-webfont.svg',  // SVG fallback for iOS < 5 - http://caniuse.com/#feat=svg-fonts, http://stackoverflow.com/a/11002874/1269037
    'fonts/fontawesome-webfont.ttf',  // Android Browers 4.1, 4.3 - http://caniuse.com/#feat=ttf
    'fonts/fontawesome-webfont.woff', // Most modern browsers

    'css/font-awesome.css'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  // TODO we should just bring in src/test.html - but how to do that with TinyTest?
  api.addFiles('meteor/test.js', where);
});

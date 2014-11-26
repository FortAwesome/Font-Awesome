// package metadata file for Meteor.js

var packageName = 'fortawesome:fontawesome';  // http://atmospherejs.com/fortawesome:fontawesome
var where = 'client';  // where to install: 'client', 'server', or ['client', 'server']

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Font Awesome (official): 470+ scalable vector icons, customizable via CSS, Retina friendly',
  version: packageJson.version,
  git: 'https://github.com/FortAwesome/Font-Awesome/'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.2.1');
  api.addFiles([
    'fonts/FontAwesome.otf',          // TODO What exactly does this file do? Can we get rid of it?
    'fonts/fontawesome-webfont.eot',  // TODO What exactly does this file do? Can we get rid of it?
    'fonts/fontawesome-webfont.svg',  // TODO What exactly does this file do? Can we get rid of it?
    'fonts/fontawesome-webfont.ttf',  // This provides the actual font in Chrome
    'fonts/fontawesome-webfont.woff', // TODO What exactly does this file do? Can we get rid of it?

    'css/font-awesome.css'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  // TODO we should just bring in src/test.html - but how to do that with TinyTest?
  api.addFiles('meteor/test.js', where);
});

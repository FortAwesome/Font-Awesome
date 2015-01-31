// package metadata file for Meteor.js

Package.describe({
  name: 'fortawesome:fontawesome',  // http://atmospherejs.com/fortawesome/fontawesome
  summary: 'Font Awesome (official): The iconic font and CSS framework',
  version: '5.0.0',
  git: 'https://github.com/FortAwesome/Font-Awesome.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles([
    'fonts/fontawesome-webfont.eot',
    'fonts/fontawesome-webfont.svg',
    'fonts/fontawesome-webfont.ttf',
    'fonts/fontawesome-webfont.woff',
    'fonts/fontawesome-webfont.woff2',
    'css/font-awesome.css'
  ], 'client');
});

'use strict';

// Check that the font files are downloadable. Meteor places assets at /packages/<packageName>/.
// Only the TTF actually does anything in Chrome.
['eot', 'svg', 'ttf', 'woff'].forEach(function (font) {
  Tinytest.addAsync(font + ' fonts are shipped', function (test, done) {

    HTTP.get('/packages/fortawesome_fontawesome/fonts/fontawesome-webfont.' + font, function callback(error, result) {
      if (error) {
        test.fail({message: 'Font failed to load'});
      } else {
        test.isTrue(result.content.length > 10000, font + ' font could not be downloaded');
      }

      done();
    });
  });
});


// Visual check. Fonts are set by font-awesome.css in @font-face { src: url('../fonts/...') }.
// TODO How does Meteor find those occurrences in the source and resolve them to /packages/<packageName>/fonts/... ?
Tinytest.addAsync('Visual check', function (test, done) {
  var iconsDropZone = document.createElement('div');
  iconsDropZone.style.height = '10em';
  document.body.appendChild(iconsDropZone);


  // TODO ideally we'd get src/test HTML straight from this repo, but no idea how to do this from TinyTest
  HTTP.get('https://rawgit.com/FortAwesome/Font-Awesome/master/src/test.html', function callback(error, result) {
    if (error) {
      test.fail('Error getting the icons. Do we have an Internet connection to rawgit.com?');
    } else {
      // [^] matches across newlines. Exclude the Stacked Icons section and below, because they transclude some other HTML.
      iconsDropZone.innerHTML = result.content.match(/<section[^]+(?=<h3>Stacked)/);
      test.ok({message: 'Test passed if the icons look OK.'});
    }

    done();
  });

});

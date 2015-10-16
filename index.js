var path = require('path');
var entryPoint = require.resolve('font-awesome');

var faDir = path.dirname(entryPoint);

var sassDir = path.join(faDir, 'scss');
var lessDir = path.join(faDir, 'less');
var  cssDir = path.join(faDir, 'css');
var fontDir = path.join(faDir, 'fonts', '*');

function includePaths() {
  return {
    scss:  sassDir,
    less:  sassDir,
    css:   cssDir,
    fonts: fontDir
  }
}

module.exports = {

  scssPath: includePaths().scss,
  lessPath: includePaths().less,
  cssPath: includePaths().css,
  
  fontPath: includePaths().fonts,

};

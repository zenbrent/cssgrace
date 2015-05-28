// import node modules
var path    = require('path'),
    url     = require('url'),
    postcss = require('postcss');

var cssgraceRule = require('./cssgraceRule');

// PostCSS Processor
function cssprocess(css, opts) {
  css.eachRule(cssgraceRule({
    currentFilePath: path.dirname(opts.from)
  }));
}

var pack = function(css, opts) {
  console.log(path.dirname(opts.from));
  return postcss(cssprocess).process(css, opts).css;
}

exports.postcss = cssprocess
exports.pack = pack

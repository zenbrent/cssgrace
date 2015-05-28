var clearfixMixin = require('./rules/clearfixMixin'),
    ellipsisMixin = require('./rules/ellipsisMixin'),
    ieInlineBlockHack = require('./rules/ieInlineBlockHack'),
    ieOpacityHack = require('./rules/ieOpacityHack'),
    ieRgbaHack = require('./rules/ieRgbaHack'),
    imageSetMixin = require('./rules/imageSetMixin'),
    positionCenterMixin = require('./rules/positionCenterMixin'),
    removeColons = require('./rules/removeColons'),
    removeDisplay = require('./rules/removeDisplay'),
    removeFloat = require('./rules/removeFloat'),
    resizeMixin = require('./rules/resizeMixin');

module.exports = function cssgraceRule(config) {
  //当前处理文件的路径，可以通过处理函数的opts.from得到
  var currentFilePath = config.currentFilePath || '';
  
  return function (rule, i) {
  
    //1x或者默认图片的宽高
    var normalWidth = '',
        normalHeight = '';
  
    //遍历 selectors
    removeColons(rule, i);
  
    //遍历 decl
    //traverse declerations
    rule.eachDecl(function(decl, i) {
      removeDisplay(decl, i);
      ieInlineBlockHack(decl, i);
      ieOpacityHack(decl, i);
      ieRgbaHack(decl, i);
  
      ellipsisMixin(decl, i);
      resizeMixin(decl, i);
      imageSetMixin(decl, i, rule, currentFilePath);
    });
  
    rule.eachDecl(function(decl, i) {
      clearfixMixin(decl, i);
    });
  
    rule.eachDecl(function(decl, i) {
      positionCenterMixin(decl, i);
      removeFloat(decl, i);
      removeDisplay(decl, i);
    });
  }
}



var postcss = require('postcss');

/**
 * clearfix mixin
 * 新增 clear: fix 属性
 */
module.exports = function clearfixMixin(decl, i) {
  if (decl.prop == 'clear' && decl.value == 'fix') {
    decl.prop = '*zoom';
    decl.value = '1';

    var count = 0;

    //当存在这些属性的时候不生成伪元素
    decl.parent.eachDecl(function(decl) {
      if (
        (decl.prop == "overflow" && decl.value != 'visible') ||
        (decl.prop == "display" && decl.value == 'inline-block') ||
        (decl.prop == "position" && decl.value == 'absolute') ||
        (decl.prop == "position" && decl.value == 'fixed')
      ) {
        count++;
      }
    });

    if (count === 0) {
      var bothSelector = decl.parent.selector + ':before' + ',\n' + decl.parent.selector + ':after';
      var afterSelector = decl.parent.selector + ':after';

      var bothRule = postcss.rule({
        selector: bothSelector
      });

      var afterRule = postcss.rule({
        selector: afterSelector
      });

      decl.parent.parent.insertAfter(decl.parent, bothRule);
      decl.parent.parent.insertAfter(decl.parent, afterRule);

      bothRule.append({
        prop: 'content',
        value: "''"
      }).append({
        prop: 'display',
        value: 'table'
      });

      afterRule.append({
        prop: 'clear',
        value: 'both'
      });
    } else {
      if (decl.next() && decl.next().type == "comment") {
        decl.next().removeSelf();
      }
      decl.removeSelf();
    }
  }
}


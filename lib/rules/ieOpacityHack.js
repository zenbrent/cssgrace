var insertDecl = require('../insertDecl'),
    identifiers = require('../identifiers');

/**
 * IE opacity hack
 * 转换为 IE filter
 */
module.exports = function ieOpacityHack(decl, i) {
  //四舍五入
  var amount = Math.round(decl.value * 100);
  if (decl.prop == 'opacity') {

    var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')

    insertDecl(decl, i, {
      before: reBefore,
      prop: 'filter',
      value: 'alpha(opacity=' + amount + ')'
    });
  }
}


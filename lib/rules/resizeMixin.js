var insertDecl = require('../insertDecl'),
    identifiers = require('../identifiers');

/**
 * resize mixin
 * resize 只有在 overflow 不为 visible 时生效
 */
module.exports = function resizeMixin(decl, i) {
  if (decl.prop == 'resize' && decl.value !== 'none') {
    var count = 0;
    decl.parent.eachDecl(function(decl) {
      if (decl.prop == 'overflow')
        count++;
    });
    if (count === 0) {
      var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')

      insertDecl(decl, i, {
        before: reBefore,
        prop: 'overflow',
        value: 'auto'
      });
    }
  }

}


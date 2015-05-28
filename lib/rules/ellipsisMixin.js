var insertDecl = require('../insertDecl'),
    identifiers = require('../identifiers');

/**
 * ellipsis mixin
 * 保证可以显示省略号
 */
module.exports = function ellipsisMixin(decl, i) {
  // var decl = decl.parent.childs[i];
  if (decl.prop == 'text-overflow' && decl.value == 'ellipsis') {
    var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')
    var countOverflow = 0,
      countWhitespace = 0;

    decl.parent.eachDecl(function(decl) {
      // 如果存在 overflow 且不等于 hidden, 增加 white-space
      if (decl.prop == 'overflow') {
        decl.value = 'hidden';
        countOverflow++;
      }

      if (decl.prop == 'white-space') {
        decl.value = 'nowrap';
        countWhitespace++;
      }
    });

    if (countOverflow == 0 && countWhitespace == 0) {
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'overflow',
        value: 'hidden'
      });

      insertDecl(decl, i, {
        before: reBefore,
        prop: 'white-space',
        value: 'nowrap'
      });
    } else if (countOverflow == 0) {
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'overflow',
        value: 'hidden'
      });
    } else if (countWhitespace == 0) {
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'white-space',
        value: 'nowrap'
      });
    }
  }
}


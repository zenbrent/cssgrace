var insertDecl = require('../insertDecl'),
    identifiers = require('../identifiers');

// IE inline-block hack
module.exports = function ieInlineBlockHack(decl, i) {
  if (decl.prop == 'display' && decl.value == 'inline-block') {

    var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')

    insertDecl(decl, i, {
      before: reBefore,
      prop: '*zoom',
      value: 1
    });
    insertDecl(decl, i, {
      before: reBefore,
      prop: '*display',
      value: 'inline'
    });
  }
}


var insertDecl = require('../insertDecl'),
    identifiers = require('../identifiers');

// position: center mixin
module.exports = function positionCenterMixin(decl, i) {
  var hasPosition = decl.parent.some(function(i) {
    return i.prop == 'position' && i.value == 'center';
  });
  var hasWidth = decl.parent.some(function(i) {
    return i.prop == 'width';
  });
  var hasHeight = decl.parent.some(function(i) {
    return i.prop == 'height';
  });

  if (hasPosition && hasWidth && hasHeight) {
    var widthValue, heightValue;
    if (decl.prop == 'position') {
      decl.value = 'absolute';
      decl.parent.eachDecl(function(decl) {

        if (decl.prop == 'width') {
          matchWidth = decl.value.match(identifiers.reVALUE);
          if (matchWidth && matchWidth != null) {
            widthValue = (-matchWidth[1] / 2) + matchWidth[2];
          }

        }
        if (decl.prop == 'height') {
          matchHeight = decl.value.match(identifiers.reVALUE);
          if (matchHeight != null) {
            heightValue = (-matchHeight[1] / 2) + matchHeight[2];
          }
        }
      });

      //在后面插入计算的内容
      var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')

      insertDecl(decl, i, {
        before: reBefore,
        prop: 'margin-top',
        value: heightValue
      });
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'margin-left',
        value: widthValue
      });
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'top',
        value: '50%'
      });
      insertDecl(decl, i, {
        before: reBefore,
        prop: 'left',
        value: '50%'
      });
    }

  }
}



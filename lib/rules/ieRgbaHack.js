var postcss = require('postcss'),
    identifiers = require('../identifiers'),
    insertDecl = require('../insertDecl');

/**
 * IE rgba hack
 * background rgba 转换为 IE ARGB
 */
module.exports = function ieRgbaHack(decl, i) {
  //十六进制不足两位自动补 0
  function pad(str) {
    return str.length == 1 ? '0' + str : '' + str;
  }
  if ((decl.prop == 'background' || decl.prop == 'background-color') &&
    decl.value.match(identifiers.reRGBA)) {
    // rgba 转换为 AARRGGBB
    var colorR = pad(parseInt(RegExp.$1).toString(16));
    var colorG = pad(parseInt(RegExp.$2).toString(16));
    var colorB = pad(parseInt(RegExp.$3).toString(16));
    var colorA = pad(parseInt(RegExp.$4 * 255).toString(16));
    var ARGB   = "'" + "#" + colorA + colorR + colorG + colorB + "'";

    // 插入IE半透明滤镜
    var reBefore = decl.before.replace(identifiers.reBLANK_LINE, '$1')
    insertDecl(decl, i, {
      before: reBefore,
      prop: 'filter',
      value: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=' + ARGB + ', endColorstr=' + ARGB + ')'
    });

    // IE9 rgba 和滤镜都支持，插入 :root hack 去掉滤镜
    var newSelector = ':root ' + decl.parent.selector;

    var nextrule = postcss.rule({
      selector: newSelector
    });
    decl.parent.parent.insertAfter(decl.parent, nextrule);
    nextrule.append({
      prop: 'filter',
      value: 'none\\9'
    });
  }
}

